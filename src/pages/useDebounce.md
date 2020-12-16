---
templateKey: post
title: useDebounce
date: "2018-11-09"
gist: https://gist.github.com/gragland/e50346f02e7edf4f81cc0bda33d3cae6
sandbox: https://codesandbox.io/s/711r1zmq50
isMultilingual: true
---

This hook allows you to debounce any fast changing value. The debounced value will only reflect the latest value when the useDebounce hook has not been called for the specified time period. When used in conjunction with useEffect, as we do in the recipe below, you can easily ensure that expensive operations like API calls are not executed too frequently. The example below allows you to search the Marvel Comic API and uses useDebounce to prevent API calls from being fired on every keystroke. Be sure to check out the [CodeSandbox demo](https://codesandbox.io/s/711r1zmq50) for this one. Hook code and inspiration from [github.com/xnimorz/use-debounce](https://github.com/xnimorz/use-debounce).

```jsx
import { useState, useEffect, useRef } from "react";

// Usage
function App() {
  // State and setters for ...
  // Search term
  const [searchTerm, setSearchTerm] = useState("");
  // API search results
  const [results, setResults] = useState([]);
  // Searching status (whether there is pending API request)
  const [isSearching, setIsSearching] = useState(false);
  // Debounce search term so that it only gives us latest value ...
  // ... if searchTerm has not been updated within last 500ms.
  // The goal is to only have the API call fire when user stops typing ...
  // ... so that we aren't hitting our API rapidly.
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Effect for API call
  useEffect(
    () => {
      if (debouncedSearchTerm) {
        setIsSearching(true);
        searchCharacters(debouncedSearchTerm).then((results) => {
          setIsSearching(false);
          setResults(results);
        });
      } else {
        setResults([]);
        setIsSearching(false);
      }
    },
    [debouncedSearchTerm] // Only call effect if debounced search term changes
  );

  return (
    <div>
      <input
        placeholder="Search Marvel Comics"
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {isSearching && <div>Searching ...</div>}

      {results.map((result) => (
        <div key={result.id}>
          <h4>{result.title}</h4>
          <img
            src={`${result.thumbnail.path}/portrait_incredible.${result.thumbnail.extension}`}
          />
        </div>
      ))}
    </div>
  );
}

// API search function
function searchCharacters(search) {
  const apiKey = "f9dfb1e8d466d36c27850bedd2047687";
  return fetch(
    `https://gateway.marvel.com/v1/public/comics?apikey=${apiKey}&titleStartsWith=${search}`,
    {
      method: "GET",
    }
  )
    .then((r) => r.json())
    .then((r) => r.data.results)
    .catch((error) => {
      console.error(error);
      return [];
    });
}

// Hook
function useDebounce(value, delay) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );

  return debouncedValue;
}
```

```typescript
import { useState, useEffect, useRef } from "react";

// Usage
function App() {
  // State and setters for ...
  // Search term
  const [searchTerm, setSearchTerm] = useState<string>("");
  // API search results
  const [results, setResults] = useState<any[]>([]);
  // Searching status (whether there is pending API request)
  const [isSearching, setIsSearching] = useState<boolean>(false);
  // Debounce search term so that it only gives us latest value ...
  // ... if searchTerm has not been updated within last 500ms.
  // The goal is to only have the API call fire when user stops typing ...
  // ... so that we aren't hitting our API rapidly.
  // We pass generic type, this case string
  const debouncedSearchTerm: string = useDebounce<string>(searchTerm, 500);

  // Effect for API call
  useEffect(
    () => {
      if (debouncedSearchTerm) {
        setIsSearching(true);
        searchCharacters(debouncedSearchTerm).then((results) => {
          setIsSearching(false);
          setResults(results);
        });
      } else {
        setResults([]);
      }
    },
    [debouncedSearchTerm] // Only call effect if debounced search term changes
  );

  return (
    <div>
      <input
        placeholder="Search Marvel Comics"
        onChange={(e: React.FormEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
      />

      {isSearching && <div>Searching ...</div>}

      {results.map((result) => (
        <div key={result.id}>
          <h4>{result.title}</h4>
          <img
            src={`${result.thumbnail.path}/portrait_incredible.${result.thumbnail.extension}`}
          />
        </div>
      ))}
    </div>
  );
}

// API search function
function searchCharacters(search: string): Promise<any[]> {
  const apiKey:string = "f9dfb1e8d466d36c27850bedd2047687";
  return fetch(
    `https://gateway.marvel.com/v1/public/comics?apikey=${apiKey}&titleStartsWith=${search}`,
    {
      method: "GET",
    }
  )
    .then((r) => r.json())
    .then((r) => r.data.results)
    .catch((error) => {
      console.error(error);
      return [];
    });
}

// Hook
// T is a generic type for value parameter, our case this will be string
function useDebounce<T>(value: T, delay: number): T {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );

  return debouncedValue;
}
```
