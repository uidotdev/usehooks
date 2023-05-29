import {
  SandpackProvider,
  SandpackPreview,
  SandpackStack,
  SandpackFiles,
} from "@codesandbox/sandpack-react";
import cx from "classnames";

export type PreviewProps = {
  previewHeight?: string;
  files?: SandpackFiles | undefined;
};

export default function CodePreview({
  previewHeight = "250px",
  files,
}: PreviewProps) {
  const sandpackProviderProps = {
    files,
    initMode: "user-visible",
    autorun: false,
    logLevel: 0,
  };

  return (
    <div className="editor-wrapper code-preview border-solid border border-brand-coal rounded-[.5rem] overflow-hidden not-prose">
      <SandpackProvider
        template="react"
        theme={{
          colors: {
            surface1: "var(--coal)",
            surface2: "var(--coal)",
          },
        }}
        {...sandpackProviderProps}
      >
        <SandpackStack className="relative">
          <SandpackPreview
            showOpenInCodeSandbox={false}
            showRefreshButton={false}
            style={{ height: previewHeight }}
            className={cx("visible h-full")}
          />
        </SandpackStack>
      </SandpackProvider>
    </div>
  );
}
