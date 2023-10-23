import * as React from "react";

export type BatteryManager = {
  supported: boolean;
  loading: boolean;
  level: number | null;
  charging: boolean | null;
  chargingTime: number | null;
  dischargingTime: number | null;
};

export type GeolocationState = {
  loading: boolean;
  accuracy: number | null;
  altitude: number | null;
  altitudeAccuracy: number | null;
  heading: number | null;
  latitude: number | null;
  longitude: number | null;
  speed: number | null;
  timestamp: number | null;
  error: GeolocationPositionError | null;
};

export type HistoryState<T> = {
  state: T;
  set: (newPresent: T) => void;
  undo: () => void;
  redo: () => void;
  clear: () => void;
  canUndo: boolean;
  canRedo: boolean;
};

export type LongPressOptions = {
  threshold?: number;
  onStart?: (e: Event) => void;
  onFinish?: (e: Event) => void;
  onCancel?: (e: Event) => void;
};

export type LongPressFns = {
  onMouseDown: (e: React.MouseEvent) => void;
  onMouseUp: (e: React.MouseEvent) => void;
  onMouseLeave: (e: React.MouseEvent) => void;
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchEnd: (e: React.TouchEvent) => void;
};

export type MousePosition = {
  x: number;
  y: number;
  elementX: number;
  elementY: number;
  elementPositionX: number;
  elementPositionY: number;
};

export type NetworkState = {
  online: boolean;
  downlink: number | null;
  downlinkMax: number | null;
  effectiveType: string | null;
  rtt: number | null;
  saveData: boolean | null;
  type: string | null;
};

export type CustomList<T> = {
  set: (l: T[]) => void;
  push: (element: T) => void;
  removeAt: (index: number) => void;
  insertAt: (index: number, element: T) => void;
  updateAt: (index: number, element: T) => void;
  clear: () => void;
};

export type CustomQueue<T> = {
  add: (element: T) => void;
  remove: () => T | undefined;
  clear: () => void;
  first: T | undefined;
  last: T | undefined;
  size: number;
  queue: T[];
};

export type RenderInfo = {
  name: string;
  renders: number;
  sinceLastRender: number;
  timestamp: number;
};

export type SpeechOptions = {
  lang?: string;
  voice?: {
    lang?: string;
    name?: string;
  };
  rate?: number;
  pitch?: number;
  volume?: number;
};

export type SpeechState = {
  isPlaying: boolean;
  status: "init" | "play" | "pause" | "stop";
  lang: string;
  voiceInfo: {
    lang: string;
    name: string;
  };
  rate: number;
  pitch: number;
  volume: number;
};

declare module "@uidotdev/usehooks" {
  export function useBattery(): BatteryManager;

  export function useClickAway<T extends Element>(
    cb: (e: Event) => void
  ): React.MutableRefObject<T>;

  export function useCopyToClipboard(): [
    string | null,
    (value: string) => Promise<void>
  ];

  export function useCounter(
    startingValue?: number,
    options?: {
      min?: number;
      max?: number;
    }
  ): [
    number,
    {
      increment: () => void;
      decrement: () => void;
      set: (nextCount: number) => void;
      reset: () => void;
    }
  ];

  export function useDebounce<T>(value: T, delay: number): T;

  export function useDefault<T>(
    initialValue: T,
    defaultValue: T
  ): [T, React.Dispatch<React.SetStateAction<T>>];

  export function useDocumentTitle(title: string): void;

  export function useFavicon(url: string): void;

  export function useGeolocation(options?: PositionOptions): GeolocationState;

  export function useHistoryState<T>(initialPresent?: T): HistoryState<T>;

  export function useHover<T extends Element>(): [
    React.RefCallback<T>,
    boolean
  ];

  export function useIdle(ms?: number): boolean;

  export function useIntersectionObserver<T extends Element>(
    options?: IntersectionObserverInit
  ): [React.RefCallback<T>, IntersectionObserverEntry | null];

  export function useIsClient(): boolean;

  export function useIsFirstRender(): boolean;

  export function useList<T>(defaultList?: T[]): [T[], CustomList<T>];

  export function useLocalStorage<T>(
    key: string,
    initialValue?: T
  ): [T, React.Dispatch<React.SetStateAction<T>>];

  export function useLockBodyScroll(): void;

  export function useLongPress(
    callback: (e: Event) => void,
    options?: LongPressOptions
  ): LongPressFns;

  export function useMap<T>(initialState?: T): Map<T, any>;

  export function useMeasure<T extends Element>(): [
    React.RefCallback<T>,
    {
      width: number | null;
      height: number | null;
    }
  ];

  export function useMediaQuery(query: string): boolean;

  export function useMouse<T extends Element>(): [
    MousePosition,
    React.MutableRefObject<T>
  ];

  export function useNetworkState(): NetworkState;

  export function useObjectState<T>(initialValue: T): [T, (arg: T) => void];

  export function useOrientation(): {
    angle: number;
    type: string;
  };

  export function usePreferredLanguage(): string;

  export function usePrevious<T>(newValue: T): T;

  export function useQueue<T>(initialValue?: T[]): CustomQueue<T>;

  export function useRenderCount(): number;

  export function useRenderInfo(name?: string): RenderInfo | undefined;

  export function useScript(
    src: string,
    options?: {
      removeOnUnmount?: boolean;
    }
  ): "unknown" | "loading" | "ready" | "error";

  export function useSessionStorage<T>(
    key: string,
    initialValue: T
  ): [T, React.Dispatch<React.SetStateAction<T>>];

  export function useSet<T>(values?: T[]): Set<T>;

  export function useSpeech(text: string, options?: SpeechOptions): SpeechState;

  export function useThrottle<T>(value: T, delay: number): T;

  export function useToggle(
    initialValue?: boolean
  ): [boolean, (newValue?: boolean) => void];

  export function useVisibilityChange(): boolean;

  export function useWindowScroll(): [
    {
      x: number | null;
      y: number | null;
    },
    (args: unknown) => void
  ];

  export function useWindowSize(): {
    width: number | null;
    height: number | null;
  };
}
