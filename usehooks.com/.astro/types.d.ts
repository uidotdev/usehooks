declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	interface Render {
		'.md': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	export { z } from 'astro/zod';
	export type CollectionEntry<C extends keyof AnyEntryMap> = AnyEntryMap[C][keyof AnyEntryMap[C]];

	// TODO: Remove this when having this fallback is no longer relevant. 2.3? 3.0? - erika, 2023-04-04
	/**
	 * @deprecated
	 * `astro:content` no longer provide `image()`.
	 *
	 * Please use it through `schema`, like such:
	 * ```ts
	 * import { defineCollection, z } from "astro:content";
	 *
	 * defineCollection({
	 *   schema: ({ image }) =>
	 *     z.object({
	 *       image: image(),
	 *     }),
	 * });
	 * ```
	 */
	export const image: never;

	// This needs to be in sync with ImageMetadata
	export type ImageFunction = () => import('astro/zod').ZodObject<{
		src: import('astro/zod').ZodString;
		width: import('astro/zod').ZodNumber;
		height: import('astro/zod').ZodNumber;
		format: import('astro/zod').ZodUnion<
			[
				import('astro/zod').ZodLiteral<'png'>,
				import('astro/zod').ZodLiteral<'jpg'>,
				import('astro/zod').ZodLiteral<'jpeg'>,
				import('astro/zod').ZodLiteral<'tiff'>,
				import('astro/zod').ZodLiteral<'webp'>,
				import('astro/zod').ZodLiteral<'gif'>,
				import('astro/zod').ZodLiteral<'svg'>
			]
		>;
	}>;

	type BaseSchemaWithoutEffects =
		| import('astro/zod').AnyZodObject
		| import('astro/zod').ZodUnion<import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodDiscriminatedUnion<string, import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodIntersection<
				import('astro/zod').AnyZodObject,
				import('astro/zod').AnyZodObject
		  >;

	type BaseSchema =
		| BaseSchemaWithoutEffects
		| import('astro/zod').ZodEffects<BaseSchemaWithoutEffects>;

	export type SchemaContext = { image: ImageFunction };

	type DataCollectionConfig<S extends BaseSchema> = {
		type: 'data';
		schema?: S | ((context: SchemaContext) => S);
	};

	type ContentCollectionConfig<S extends BaseSchema> = {
		type?: 'content';
		schema?: S | ((context: SchemaContext) => S);
	};

	type CollectionConfig<S> = ContentCollectionConfig<S> | DataCollectionConfig<S>;

	export function defineCollection<S extends BaseSchema>(
		input: CollectionConfig<S>
	): CollectionConfig<S>;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {})
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {})
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {})
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {})
	>(
		collection: C,
		slug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {})
	>(
		collection: C,
		id: E
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[]
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[]
	): Promise<CollectionEntry<C>[]>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
			  }
			: {
					collection: C;
					id: keyof DataEntryMap[C];
			  }
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"hooks": {
"useBattery.mdx": {
	id: "useBattery.mdx";
  slug: "usebattery";
  body: string;
  collection: "hooks";
  data: InferEntrySchema<"hooks">
} & { render(): Render[".mdx"] };
"useClickAway.mdx": {
	id: "useClickAway.mdx";
  slug: "useclickaway";
  body: string;
  collection: "hooks";
  data: InferEntrySchema<"hooks">
} & { render(): Render[".mdx"] };
"useContinuousRetry.mdx": {
	id: "useContinuousRetry.mdx";
  slug: "usecontinuousretry";
  body: string;
  collection: "hooks";
  data: InferEntrySchema<"hooks">
} & { render(): Render[".mdx"] };
"useCopyToClipboard.mdx": {
	id: "useCopyToClipboard.mdx";
  slug: "usecopytoclipboard";
  body: string;
  collection: "hooks";
  data: InferEntrySchema<"hooks">
} & { render(): Render[".mdx"] };
"useCountdown.mdx": {
	id: "useCountdown.mdx";
  slug: "usecountdown";
  body: string;
  collection: "hooks";
  data: InferEntrySchema<"hooks">
} & { render(): Render[".mdx"] };
"useCounter.mdx": {
	id: "useCounter.mdx";
  slug: "usecounter";
  body: string;
  collection: "hooks";
  data: InferEntrySchema<"hooks">
} & { render(): Render[".mdx"] };
"useDebounce.mdx": {
	id: "useDebounce.mdx";
  slug: "usedebounce";
  body: string;
  collection: "hooks";
  data: InferEntrySchema<"hooks">
} & { render(): Render[".mdx"] };
"useDefault.mdx": {
	id: "useDefault.mdx";
  slug: "usedefault";
  body: string;
  collection: "hooks";
  data: InferEntrySchema<"hooks">
} & { render(): Render[".mdx"] };
"useDocumentTitle.mdx": {
	id: "useDocumentTitle.mdx";
  slug: "usedocumenttitle";
  body: string;
  collection: "hooks";
  data: InferEntrySchema<"hooks">
} & { render(): Render[".mdx"] };
"useEventListener.mdx": {
	id: "useEventListener.mdx";
  slug: "useeventlistener";
  body: string;
  collection: "hooks";
  data: InferEntrySchema<"hooks">
} & { render(): Render[".mdx"] };
"useFavicon.mdx": {
	id: "useFavicon.mdx";
  slug: "usefavicon";
  body: string;
  collection: "hooks";
  data: InferEntrySchema<"hooks">
} & { render(): Render[".mdx"] };
"useFetch.mdx": {
	id: "useFetch.mdx";
  slug: "usefetch";
  body: string;
  collection: "hooks";
  data: InferEntrySchema<"hooks">
} & { render(): Render[".mdx"] };
"useGeolocation.mdx": {
	id: "useGeolocation.mdx";
  slug: "usegeolocation";
  body: string;
  collection: "hooks";
  data: InferEntrySchema<"hooks">
} & { render(): Render[".mdx"] };
"useHistoryState.mdx": {
	id: "useHistoryState.mdx";
  slug: "usehistorystate";
  body: string;
  collection: "hooks";
  data: InferEntrySchema<"hooks">
} & { render(): Render[".mdx"] };
"useHover.mdx": {
	id: "useHover.mdx";
  slug: "usehover";
  body: string;
  collection: "hooks";
  data: InferEntrySchema<"hooks">
} & { render(): Render[".mdx"] };
"useIdle.mdx": {
	id: "useIdle.mdx";
  slug: "useidle";
  body: string;
  collection: "hooks";
  data: InferEntrySchema<"hooks">
} & { render(): Render[".mdx"] };
"useIntersectionObserver.mdx": {
	id: "useIntersectionObserver.mdx";
  slug: "useintersectionobserver";
  body: string;
  collection: "hooks";
  data: InferEntrySchema<"hooks">
} & { render(): Render[".mdx"] };
"useInterval.mdx": {
	id: "useInterval.mdx";
  slug: "useinterval";
  body: string;
  collection: "hooks";
  data: InferEntrySchema<"hooks">
} & { render(): Render[".mdx"] };
"useIntervalWhen.mdx": {
	id: "useIntervalWhen.mdx";
  slug: "useintervalwhen";
  body: string;
  collection: "hooks";
  data: InferEntrySchema<"hooks">
} & { render(): Render[".mdx"] };
"useIsClient.mdx": {
	id: "useIsClient.mdx";
  slug: "useisclient";
  body: string;
  collection: "hooks";
  data: InferEntrySchema<"hooks">
} & { render(): Render[".mdx"] };
"useIsFirstRender.mdx": {
	id: "useIsFirstRender.mdx";
  slug: "useisfirstrender";
  body: string;
  collection: "hooks";
  data: InferEntrySchema<"hooks">
} & { render(): Render[".mdx"] };
"useKeyPress.mdx": {
	id: "useKeyPress.mdx";
  slug: "usekeypress";
  body: string;
  collection: "hooks";
  data: InferEntrySchema<"hooks">
} & { render(): Render[".mdx"] };
"useList.mdx": {
	id: "useList.mdx";
  slug: "uselist";
  body: string;
  collection: "hooks";
  data: InferEntrySchema<"hooks">
} & { render(): Render[".mdx"] };
"useLocalStorage.mdx": {
	id: "useLocalStorage.mdx";
  slug: "uselocalstorage";
  body: string;
  collection: "hooks";
  data: InferEntrySchema<"hooks">
} & { render(): Render[".mdx"] };
"useLockBodyScroll.mdx": {
	id: "useLockBodyScroll.mdx";
  slug: "uselockbodyscroll";
  body: string;
  collection: "hooks";
  data: InferEntrySchema<"hooks">
} & { render(): Render[".mdx"] };
"useLogger.mdx": {
	id: "useLogger.mdx";
  slug: "uselogger";
  body: string;
  collection: "hooks";
  data: InferEntrySchema<"hooks">
} & { render(): Render[".mdx"] };
"useLongPress.mdx": {
	id: "useLongPress.mdx";
  slug: "uselongpress";
  body: string;
  collection: "hooks";
  data: InferEntrySchema<"hooks">
} & { render(): Render[".mdx"] };
"useMap.mdx": {
	id: "useMap.mdx";
  slug: "usemap";
  body: string;
  collection: "hooks";
  data: InferEntrySchema<"hooks">
} & { render(): Render[".mdx"] };
"useMeasure.mdx": {
	id: "useMeasure.mdx";
  slug: "usemeasure";
  body: string;
  collection: "hooks";
  data: InferEntrySchema<"hooks">
} & { render(): Render[".mdx"] };
"useMediaQuery.mdx": {
	id: "useMediaQuery.mdx";
  slug: "usemediaquery";
  body: string;
  collection: "hooks";
  data: InferEntrySchema<"hooks">
} & { render(): Render[".mdx"] };
"useMouse.mdx": {
	id: "useMouse.mdx";
  slug: "usemouse";
  body: string;
  collection: "hooks";
  data: InferEntrySchema<"hooks">
} & { render(): Render[".mdx"] };
"useNetworkState.mdx": {
	id: "useNetworkState.mdx";
  slug: "usenetworkstate";
  body: string;
  collection: "hooks";
  data: InferEntrySchema<"hooks">
} & { render(): Render[".mdx"] };
"useObjectState.mdx": {
	id: "useObjectState.mdx";
  slug: "useobjectstate";
  body: string;
  collection: "hooks";
  data: InferEntrySchema<"hooks">
} & { render(): Render[".mdx"] };
"useOrientation.mdx": {
	id: "useOrientation.mdx";
  slug: "useorientation";
  body: string;
  collection: "hooks";
  data: InferEntrySchema<"hooks">
} & { render(): Render[".mdx"] };
"usePageLeave.mdx": {
	id: "usePageLeave.mdx";
  slug: "usepageleave";
  body: string;
  collection: "hooks";
  data: InferEntrySchema<"hooks">
} & { render(): Render[".mdx"] };
"usePreferredLanguage.mdx": {
	id: "usePreferredLanguage.mdx";
  slug: "usepreferredlanguage";
  body: string;
  collection: "hooks";
  data: InferEntrySchema<"hooks">
} & { render(): Render[".mdx"] };
"usePrevious.mdx": {
	id: "usePrevious.mdx";
  slug: "useprevious";
  body: string;
  collection: "hooks";
  data: InferEntrySchema<"hooks">
} & { render(): Render[".mdx"] };
"useQueue.mdx": {
	id: "useQueue.mdx";
  slug: "usequeue";
  body: string;
  collection: "hooks";
  data: InferEntrySchema<"hooks">
} & { render(): Render[".mdx"] };
"useRandomInterval.mdx": {
	id: "useRandomInterval.mdx";
  slug: "userandominterval";
  body: string;
  collection: "hooks";
  data: InferEntrySchema<"hooks">
} & { render(): Render[".mdx"] };
"useRenderCount.mdx": {
	id: "useRenderCount.mdx";
  slug: "userendercount";
  body: string;
  collection: "hooks";
  data: InferEntrySchema<"hooks">
} & { render(): Render[".mdx"] };
"useRenderInfo.mdx": {
	id: "useRenderInfo.mdx";
  slug: "userenderinfo";
  body: string;
  collection: "hooks";
  data: InferEntrySchema<"hooks">
} & { render(): Render[".mdx"] };
"useScript.mdx": {
	id: "useScript.mdx";
  slug: "usescript";
  body: string;
  collection: "hooks";
  data: InferEntrySchema<"hooks">
} & { render(): Render[".mdx"] };
"useSessionStorage.mdx": {
	id: "useSessionStorage.mdx";
  slug: "usesessionstorage";
  body: string;
  collection: "hooks";
  data: InferEntrySchema<"hooks">
} & { render(): Render[".mdx"] };
"useSet.mdx": {
	id: "useSet.mdx";
  slug: "useset";
  body: string;
  collection: "hooks";
  data: InferEntrySchema<"hooks">
} & { render(): Render[".mdx"] };
"useThrottle.mdx": {
	id: "useThrottle.mdx";
  slug: "usethrottle";
  body: string;
  collection: "hooks";
  data: InferEntrySchema<"hooks">
} & { render(): Render[".mdx"] };
"useTimeout.mdx": {
	id: "useTimeout.mdx";
  slug: "usetimeout";
  body: string;
  collection: "hooks";
  data: InferEntrySchema<"hooks">
} & { render(): Render[".mdx"] };
"useToggle.mdx": {
	id: "useToggle.mdx";
  slug: "usetoggle";
  body: string;
  collection: "hooks";
  data: InferEntrySchema<"hooks">
} & { render(): Render[".mdx"] };
"useVisibilityChange.mdx": {
	id: "useVisibilityChange.mdx";
  slug: "usevisibilitychange";
  body: string;
  collection: "hooks";
  data: InferEntrySchema<"hooks">
} & { render(): Render[".mdx"] };
"useWindowScroll.mdx": {
	id: "useWindowScroll.mdx";
  slug: "usewindowscroll";
  body: string;
  collection: "hooks";
  data: InferEntrySchema<"hooks">
} & { render(): Render[".mdx"] };
"useWindowSize.mdx": {
	id: "useWindowSize.mdx";
  slug: "usewindowsize";
  body: string;
  collection: "hooks";
  data: InferEntrySchema<"hooks">
} & { render(): Render[".mdx"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	type ContentConfig = typeof import("../src/content/config");
}
