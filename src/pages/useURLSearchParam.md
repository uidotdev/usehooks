---
templateKey: post
title: useURLSearchParam
date: "2021-11-14"
gist: https://gist.github.com/uchihamalolan/9069e17dc241a400a376711b9b5db806
# sandbox: https://codesandbox.io/s/recursing-cori-ckw8p
isMultilingual: true
---

This hooks help to use URL Search Params as a state within a React Component, much like how there's hook to use localstorage as a state variable.
It takes query key (of type string) as 1st parameter and optionally a default value as 2nd parameter.
It also supports passing value type as TS generics for type checkings
It's useful when you want to read / write URL search params within components, and re-render consuming components when URL search param value changes.

PS: Currently it assumes your app has `react-router-dom`, which is goto library to handle client side routing.


```tsx
import { useEffect, useCallback, useMemo, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

export type SearchKey = string;
export type PrimitiveSearchValue = string | number | boolean;
export type SearchValue = PrimitiveSearchValue | Array<PrimitiveSearchValue>;

/**
 * To search value returned by URLSearchParam will always be a string
 * We need to transform it into it's respective JS type:
 * Eg: "123" => 123, "1,2,3" => [1,2,3], "false" => false etc...
*/
function marshallSearchParamValue(value: string): SearchValue {
  if (value && !isNaN(Number(value))) {
    return Number(value);
  }
  if (value && value === 'false') {
    return false;
  }
  if (value && value === 'true') {
    return true;
  }
  if (typeof value === 'string') {
    const stringValuesArray = value.split(',');

    if (stringValuesArray.length === 1) {
      return value;
    }

    return stringValuesArray.map((value) =>
      marshallSearchParamValue(value)
    ) as Array<PrimitiveSearchValue>;
  }

  return value;
}

/**
 *
 * @param value search param's value in string
 * @returns search param's value marshalled into JS type
 */
function getMarshalledSearchParamValue(value: string | null) {
  return value ? marshallSearchParamValue(value) : value;
}

export function useURLSearchParam<T extends SearchValue>(searchKey: SearchKey, searchValue?: T) {
  const { search } = useLocation();
  const history = useHistory();
  const searchValueRef = useRef(searchValue);

  // using window.location.search instead of useLocation's search to avoid unnecessary deps for useEffect
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);

    if (
      searchValueRef.current !== null &&
      searchValueRef.current !== undefined &&
      !searchParams.has(searchKey)
    ) {
      searchParams.set(searchKey, searchValueRef.current.toString());
    }

    history.replace({ pathname: window.location.pathname, search: `?${searchParams.toString()}` });
  }, [history, searchKey]);

  // using useLocation's search to enable re-render on updated search param value
  const queryValue = useMemo(() => {
    const searchParams = new URLSearchParams(search);

    return getMarshalledSearchParamValue(searchParams.get(searchKey)) as T | null;
  }, [search, searchKey]);

  // using window.location.search instead of useLocation's search to avoid infinitie re-render from updating URL
  const setQueryValue = useCallback(
    (searchParamValue?: T) => {
      const searchParams = new URLSearchParams(window.location.search);

      if (searchParamValue === null || searchParamValue === undefined) {
        searchParams.delete(searchKey);
      } else {
        searchParams.set(searchKey, searchParamValue.toString());
      }

      history.replace({
        pathname: window.location.pathname,
        search: `?${searchParams.toString()}`,
      });
    },
    [history, searchKey]
  );

  return [queryValue, setQueryValue] as [typeof queryValue, typeof setQueryValue];
}
```
