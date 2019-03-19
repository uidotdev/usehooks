const { CLIEngine } = require('eslint');
const { join } = require('path');
const {
  readFileSync,
  readdirSync,
  realpathSync,
  writeFileSync,
} = require('fs');
const matter = require('gray-matter');

const fix = process.argv[2] === '--fix';
const engine = new CLIEngine({ fix });

const pagesPath = `${__dirname}/../../src/pages`;

// Find each markdown file in the pages directory.
const pages = readdirSync(pagesPath)
  .filter(filename => filename.endsWith('.md'))
  .sort()
  // Convert the filename to a full path.
  .map(filename => join(pagesPath, filename));

// Pass each file through gray-matter to reformat it.
const rewriteResults = pages
  .map(path => {
    const source = readFileSync(path, 'utf8');
    const { data, content } = matter(source);

    return {
      path: realpathSync(path),
      original: source,
      expected: matter.stringify(content, data, { lineWidth: 120 }),
    };
  })
  .filter(result => result.original !== result.expected);

// Run ESLint on all of the pages.
const lintResults = pages
  .map(path => {
    const { data } = matter.read(path);

    // We need code to lint.
    if (!data.code) {
      console.warn(`Can't find code for ${path}`);
      return null;
    }

    return engine.executeOnText(data.code, path);
  })
  // Only use valid reports.
  .filter(report => report !== null)
  // Merge all of the results.
  .reduce((results, report) => [...results, ...report.results], [])
  .map(({ filePath, ...result }) => ({
    ...result,
    filePath: realpathSync(filePath),
  }));

if (fix) {
  rewriteResults
    // Don't rewrite any files which are being rewritten by the linter.
    .filter(
      result =>
        !lintResults.some(
          lintResult =>
            lintResult.output && lintResult.filePath === result.path,
        ),
    )
    .forEach(result => writeFileSync(result.path, result.expected));

  // Fix any results which have an output attribute (i.e. they are fixable).
  lintResults
    .filter(result => result.output)
    .forEach(({ filePath, output }) => {
      const { data, content } = matter.read(filePath);

      // Re-generate the YAML header.
      const updatedContent = matter.stringify(
        content,
        {
          ...data,
          code: output,
        },
        { lineWidth: 120 },
      );

      writeFileSync(filePath, updatedContent);
    });
}

if (!fix && rewriteResults.length > 0) {
  const message =
    'Some files need formatting:\n' +
    rewriteResults.map(result => ` - ${result.path}`).join('\n') +
    '\nThese can be fixed using the `--fix` option.'

  console.error(message);
}

if (lintResults.length > 0) {
  const formatter = engine.getFormatter();

  console.error(formatter(lintResults));
}

if (rewriteResults.length > 0 || lintResults.length > 0) {
  process.exit(1);
} else {
  console.log('No errors');
}
