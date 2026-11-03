import { b as require_react, n as require_jsx_runtime, w as __toESM } from "../index.js";
import { t as cn } from "./utils-ymay08E2.js";
import Link from "./link-Bfvg7QdF.js";
import { a as projectSectionDefinitions, n as imageCategoryLabel, o as projectsInSection, r as compareFinalArtwork, s as exhibitionDisplayInfo, t as imageCategories } from "./image-catalog-_cJHhi6C.js";
import { t as core_nyc_media_default } from "./core-nyc-media-DGq1C3_x.js";
import { n as projectCaptionServices, r as projectCaptionYear } from "./project-caption-BvX_Quum.js";
import { t as BrandText } from "./field-trip-name-BKqnzu5g.js";
import { t as ProjectTitle } from "./project-title-BIXMb8hQ.js";
import { a as useLayoutEffect2, d as MotionImage, f as ImageCredit, i as useId, l as createContextScope, n as useControllableState, o as composeEventHandlers, r as useCallbackRef, s as Primitive, t as cva, u as createLucideIcon } from "./dist-DfPmTwKc.js";
//#region app/project-collection.tsx
var import_jsx_runtime = require_jsx_runtime();
/** Native disclosure retains keyboard, touch and no-JavaScript access. Hidden stages pause through their existing viewport observers. */
function ProjectCollection({ className, prefix, group, expanded = false, collapsible = group.id === "featured-projects" || group.id === "archive", children }) {
	const headingId = `${prefix}-${group.id}-title`;
	const heading = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
		className: group.title ? "project-collection-title" : "sr-only",
		id: headingId,
		tabIndex: -1,
		"data-page-section": true,
		children: group.title ?? "Projects"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: `${className} ${className}--${group.id}`,
		"aria-labelledby": headingId,
		children: collapsible ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
			className: "project-collection-disclosure",
			open: expanded || void 0,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", { children: [heading, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "project-collection-indicator",
				"aria-hidden": "true"
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "project-collection-content",
				children
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [heading, children] })
	});
}
//#endregion
//#region app/work/project-card-images.ts
/** Genuine portrait photographs for static cards, with their original dimensions.
* Mixed carousels retain their existing opening views and fixed stage geometry. */
var portraitCardImages = {
	"hunt-for-paradise": {
		"src": "/project-galleries/hunt-for-paradise/07.webp",
		"width": 1092,
		"height": 1376
	},
	"david-bowie-residence": {
		"src": "/portfolio-carousel/david-bowie/03.webp",
		"width": 1018,
		"height": 1218
	},
	"intel-unknown": {
		"src": "/portfolio-carousel/intel/06.webp",
		"width": 481,
		"height": 731
	}
};
core_nyc_media_default.lead.src;
//#endregion
//#region components/ui/input.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function Input({ className, type, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		"data-slot": "input",
		className: cn("h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30", "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50", "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40", className),
		...props
	});
}
//#endregion
//#region lib/search-text.ts
function searchText(value) {
	return value.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/ß/g, "ss").replace(/[‘’]/g, "'").replace(/[‐‑–—]/g, "-").replace(/\s+/g, " ").trim();
}
/**
* @license lucide-react v1.31.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var ChevronDown = createLucideIcon("chevron-down", [["path", {
	d: "m6 9 6 6 6-6",
	key: "qrunsl"
}]]);
//#endregion
//#region components/ui/native-select.tsx
function NativeSelect({ className, size = "default", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "group/native-select relative w-fit has-[select:disabled]:opacity-50",
		"data-slot": "native-select-wrapper",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
			"data-slot": "native-select",
			"data-size": size,
			className: cn("h-9 w-full min-w-0 appearance-none rounded-md border border-input bg-transparent px-3 py-2 pr-9 text-sm shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed data-[size=sm]:h-8 data-[size=sm]:py-1 dark:bg-input/30 dark:hover:bg-input/50", "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50", "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40", className),
			...props
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
			className: "pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-muted-foreground opacity-50 select-none",
			"aria-hidden": "true",
			"data-slot": "native-select-icon"
		})]
	});
}
function NativeSelectOption({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
		"data-slot": "native-select-option",
		className: cn("bg-[Canvas] text-[CanvasText]", className),
		...props
	});
}
//#endregion
//#region ../fieldtrip-v574/node_modules/@radix-ui/react-collection/node_modules/@radix-ui/react-compose-refs/dist/index.mjs
var __defProp$8 = Object.defineProperty;
var __name$8 = (target, value) => __defProp$8(target, "name", {
	value,
	configurable: true
});
function setRef$1(ref, value) {
	if (typeof ref === "function") return ref(value);
	else if (ref !== null && ref !== void 0) ref.current = value;
}
__name$8(setRef$1, "setRef");
function composeRefs$1(...refs) {
	return (node) => {
		let hasCleanup = false;
		const cleanups = refs.map((ref) => {
			const cleanup = setRef$1(ref, node);
			if (!hasCleanup && typeof cleanup == "function") hasCleanup = true;
			return cleanup;
		});
		if (hasCleanup) return () => {
			for (let i = 0; i < cleanups.length; i++) {
				const cleanup = cleanups[i];
				if (typeof cleanup == "function") cleanup();
				else setRef$1(refs[i], null);
			}
		};
	};
}
__name$8(composeRefs$1, "composeRefs");
function useComposedRefs$1(...refs) {
	return import_react.useCallback(composeRefs$1(...refs), refs);
}
__name$8(useComposedRefs$1, "useComposedRefs");
//#endregion
//#region ../fieldtrip-v574/node_modules/@radix-ui/react-collection/node_modules/@radix-ui/react-slot/dist/index.mjs
var __defProp$7 = Object.defineProperty;
var __name$7 = (target, value) => __defProp$7(target, "name", {
	value,
	configurable: true
});
/* @__NO_SIDE_EFFECTS__ */
function createSlot(ownerName) {
	const Slot2 = import_react.forwardRef((props, forwardedRef) => {
		let { children, ...slotProps } = props;
		let slottableElement = null;
		let hasSlottable = false;
		const newChildren = [];
		if (isLazyComponent(children) && typeof use === "function") children = use(children._payload);
		import_react.Children.forEach(children, (maybeSlottable) => {
			if (isSlottable(maybeSlottable)) {
				hasSlottable = true;
				const slottable = maybeSlottable;
				let child = "child" in slottable.props ? slottable.props.child : slottable.props.children;
				if (isLazyComponent(child) && typeof use === "function") child = use(child._payload);
				slottableElement = getSlottableElementFromSlottable(slottable, child);
				newChildren.push(slottableElement?.props?.children);
			} else newChildren.push(maybeSlottable);
		});
		if (slottableElement) slottableElement = import_react.cloneElement(slottableElement, void 0, newChildren);
		else if (!hasSlottable && import_react.Children.count(children) === 1 && import_react.isValidElement(children)) slottableElement = children;
		const slottableElementRef = slottableElement ? getElementRef(slottableElement) : void 0;
		const composedRef = useComposedRefs$1(forwardedRef, slottableElementRef);
		if (!slottableElement) {
			if (children || children === 0) throw new Error(hasSlottable ? createSlottableError(ownerName) : createSlotError(ownerName));
			return children;
		}
		const mergedProps = mergeProps(slotProps, slottableElement.props ?? {});
		if (slottableElement.type !== import_react.Fragment) mergedProps.ref = forwardedRef ? composedRef : slottableElementRef;
		return import_react.cloneElement(slottableElement, mergedProps);
	});
	Slot2.displayName = `${ownerName}.Slot`;
	return Slot2;
}
__name$7(createSlot, "createSlot");
var SLOTTABLE_IDENTIFIER = Symbol.for("radix.slottable");
/* @__NO_SIDE_EFFECTS__ */
function createSlottable(ownerName) {
	const Slottable2 = /* @__PURE__ */ __name$7((props) => "child" in props ? props.children(props.child) : props.children, "Slottable");
	Slottable2.displayName = `${ownerName}.Slottable`;
	Slottable2.__radixId = SLOTTABLE_IDENTIFIER;
	return Slottable2;
}
__name$7(createSlottable, "createSlottable");
var getSlottableElementFromSlottable = /* @__PURE__ */ __name$7((slottable, child) => {
	if ("child" in slottable.props) {
		const child2 = slottable.props.child;
		if (!import_react.isValidElement(child2)) return null;
		return import_react.cloneElement(child2, void 0, slottable.props.children(child2.props.children));
	}
	return import_react.isValidElement(child) ? child : null;
}, "getSlottableElementFromSlottable");
function mergeProps(slotProps, childProps) {
	const overrideProps = { ...childProps };
	for (const propName in childProps) {
		const slotPropValue = slotProps[propName];
		const childPropValue = childProps[propName];
		if (/^on[A-Z]/.test(propName)) {
			if (slotPropValue && childPropValue) overrideProps[propName] = (...args) => {
				const result = childPropValue(...args);
				slotPropValue(...args);
				return result;
			};
			else if (slotPropValue) overrideProps[propName] = slotPropValue;
		} else if (propName === "style") overrideProps[propName] = {
			...slotPropValue,
			...childPropValue
		};
		else if (propName === "className") overrideProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(" ");
	}
	return {
		...slotProps,
		...overrideProps
	};
}
__name$7(mergeProps, "mergeProps");
function getElementRef(element) {
	let getter = Object.getOwnPropertyDescriptor(element.props, "ref")?.get;
	let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
	if (mayWarn) return element.ref;
	getter = Object.getOwnPropertyDescriptor(element, "ref")?.get;
	mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
	if (mayWarn) return element.props.ref;
	return element.props.ref || element.ref;
}
__name$7(getElementRef, "getElementRef");
function isSlottable(child) {
	return import_react.isValidElement(child) && typeof child.type === "function" && "__radixId" in child.type && child.type.__radixId === SLOTTABLE_IDENTIFIER;
}
__name$7(isSlottable, "isSlottable");
var REACT_LAZY_TYPE = Symbol.for("react.lazy");
function isLazyComponent(element) {
	return element != null && typeof element === "object" && "$$typeof" in element && element.$$typeof === REACT_LAZY_TYPE && "_payload" in element && isPromiseLike(element._payload);
}
__name$7(isLazyComponent, "isLazyComponent");
function isPromiseLike(value) {
	return typeof value === "object" && value !== null && "then" in value;
}
__name$7(isPromiseLike, "isPromiseLike");
var createSlotError = /* @__PURE__ */ __name$7((ownerName) => {
	return `${ownerName} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`;
}, "createSlotError");
var createSlottableError = /* @__PURE__ */ __name$7((ownerName) => {
	return `${ownerName} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`;
}, "createSlottableError");
var use = import_react[" use ".trim().toString()];
//#endregion
//#region ../fieldtrip-v574/node_modules/@radix-ui/react-collection/dist/index.mjs
var __defProp$6 = Object.defineProperty;
var __name$6 = (target, value) => __defProp$6(target, "name", {
	value,
	configurable: true
});
/* @__NO_SIDE_EFFECTS__ */
function createCollection(name) {
	const PROVIDER_NAME = name + "CollectionProvider";
	const [createCollectionContext, createCollectionScope] = createContextScope(PROVIDER_NAME);
	const [CollectionProviderImpl, useCollectionContext] = createCollectionContext(PROVIDER_NAME, {
		collectionRef: { current: null },
		itemMap: /* @__PURE__ */ new Map()
	});
	const CollectionProvider = /* @__PURE__ */ __name$6((props) => {
		const { scope, children } = props;
		const ref = import_react.useRef(null);
		const itemMap = import_react.useRef(/* @__PURE__ */ new Map()).current;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollectionProviderImpl, {
			scope,
			itemMap,
			collectionRef: ref,
			children
		});
	}, "CollectionProvider");
	CollectionProvider.displayName = PROVIDER_NAME;
	const COLLECTION_SLOT_NAME = name + "CollectionSlot";
	const CollectionSlotImpl = /* @__PURE__ */ createSlot(COLLECTION_SLOT_NAME);
	const CollectionSlot = import_react.forwardRef((props, forwardedRef) => {
		const { scope, children } = props;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollectionSlotImpl, {
			ref: useComposedRefs$1(forwardedRef, useCollectionContext(COLLECTION_SLOT_NAME, scope).collectionRef),
			children
		});
	});
	CollectionSlot.displayName = COLLECTION_SLOT_NAME;
	const ITEM_SLOT_NAME = name + "CollectionItemSlot";
	const ITEM_DATA_ATTR = "data-radix-collection-item";
	const CollectionItemSlotImpl = /* @__PURE__ */ createSlot(ITEM_SLOT_NAME);
	const CollectionItemSlot = import_react.forwardRef((props, forwardedRef) => {
		const { scope, children, ...itemData } = props;
		const ref = import_react.useRef(null);
		const composedRefs = useComposedRefs$1(forwardedRef, ref);
		const context = useCollectionContext(ITEM_SLOT_NAME, scope);
		import_react.useEffect(() => {
			context.itemMap.set(ref, {
				ref,
				...itemData
			});
			return () => void context.itemMap.delete(ref);
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollectionItemSlotImpl, {
			[ITEM_DATA_ATTR]: "",
			ref: composedRefs,
			children
		});
	});
	CollectionItemSlot.displayName = ITEM_SLOT_NAME;
	function useCollection(scope) {
		const context = useCollectionContext(name + "CollectionConsumer", scope);
		return import_react.useCallback(() => {
			const collectionNode = context.collectionRef.current;
			if (!collectionNode) return [];
			const orderedNodes = Array.from(collectionNode.querySelectorAll(`[${ITEM_DATA_ATTR}]`));
			return Array.from(context.itemMap.values()).sort((a, b) => orderedNodes.indexOf(a.ref.current) - orderedNodes.indexOf(b.ref.current));
		}, [context.collectionRef, context.itemMap]);
	}
	__name$6(useCollection, "useCollection");
	return [
		{
			Provider: CollectionProvider,
			Slot: CollectionSlot,
			ItemSlot: CollectionItemSlot
		},
		useCollection,
		createCollectionScope
	];
}
__name$6(createCollection, "createCollection");
var __instanciated = /* @__PURE__ */ new WeakMap();
var OrderedDict = class _OrderedDict extends Map {
	static {
		__name$6(this, "OrderedDict");
	}
	#keys;
	constructor(entries) {
		super(entries);
		this.#keys = [...super.keys()];
		__instanciated.set(this, true);
	}
	set(key, value) {
		if (__instanciated.get(this)) if (this.has(key)) this.#keys[this.#keys.indexOf(key)] = key;
		else this.#keys.push(key);
		super.set(key, value);
		return this;
	}
	insert(index, key, value) {
		const has = this.has(key);
		const length = this.#keys.length;
		const relativeIndex = toSafeInteger(index);
		let actualIndex = relativeIndex >= 0 ? relativeIndex : length + relativeIndex;
		const safeIndex = actualIndex < 0 || actualIndex >= length ? -1 : actualIndex;
		if (safeIndex === this.size || has && safeIndex === this.size - 1 || safeIndex === -1) {
			this.set(key, value);
			return this;
		}
		const size = this.size + (has ? 0 : 1);
		if (relativeIndex < 0) actualIndex++;
		const keys = [...this.#keys];
		let nextValue;
		let shouldSkip = false;
		for (let i = actualIndex; i < size; i++) if (actualIndex === i) {
			let nextKey = keys[i];
			if (keys[i] === key) nextKey = keys[i + 1];
			if (has) this.delete(key);
			nextValue = this.get(nextKey);
			this.set(key, value);
		} else {
			if (!shouldSkip && keys[i - 1] === key) shouldSkip = true;
			const currentKey = keys[shouldSkip ? i : i - 1];
			const currentValue = nextValue;
			nextValue = this.get(currentKey);
			this.delete(currentKey);
			this.set(currentKey, currentValue);
		}
		return this;
	}
	with(index, key, value) {
		const copy = new _OrderedDict(this);
		copy.insert(index, key, value);
		return copy;
	}
	before(key) {
		const index = this.#keys.indexOf(key) - 1;
		if (index < 0) return;
		return this.entryAt(index);
	}
	/**
	* Sets a new key-value pair at the position before the given key.
	*/
	setBefore(key, newKey, value) {
		const index = this.#keys.indexOf(key);
		if (index === -1) return this;
		return this.insert(index, newKey, value);
	}
	after(key) {
		let index = this.#keys.indexOf(key);
		index = index === -1 || index === this.size - 1 ? -1 : index + 1;
		if (index === -1) return;
		return this.entryAt(index);
	}
	/**
	* Sets a new key-value pair at the position after the given key.
	*/
	setAfter(key, newKey, value) {
		const index = this.#keys.indexOf(key);
		if (index === -1) return this;
		return this.insert(index + 1, newKey, value);
	}
	first() {
		return this.entryAt(0);
	}
	last() {
		return this.entryAt(-1);
	}
	clear() {
		this.#keys = [];
		return super.clear();
	}
	delete(key) {
		const deleted = super.delete(key);
		if (deleted) this.#keys.splice(this.#keys.indexOf(key), 1);
		return deleted;
	}
	deleteAt(index) {
		const key = this.keyAt(index);
		if (key !== void 0) return this.delete(key);
		return false;
	}
	at(index) {
		const key = at(this.#keys, index);
		if (key !== void 0) return this.get(key);
	}
	entryAt(index) {
		const key = at(this.#keys, index);
		if (key !== void 0) return [key, this.get(key)];
	}
	indexOf(key) {
		return this.#keys.indexOf(key);
	}
	keyAt(index) {
		return at(this.#keys, index);
	}
	from(key, offset) {
		const index = this.indexOf(key);
		if (index === -1) return;
		let dest = index + offset;
		if (dest < 0) dest = 0;
		if (dest >= this.size) dest = this.size - 1;
		return this.at(dest);
	}
	keyFrom(key, offset) {
		const index = this.indexOf(key);
		if (index === -1) return;
		let dest = index + offset;
		if (dest < 0) dest = 0;
		if (dest >= this.size) dest = this.size - 1;
		return this.keyAt(dest);
	}
	find(predicate, thisArg) {
		let index = 0;
		for (const entry of this) {
			if (Reflect.apply(predicate, thisArg, [
				entry,
				index,
				this
			])) return entry;
			index++;
		}
	}
	findIndex(predicate, thisArg) {
		let index = 0;
		for (const entry of this) {
			if (Reflect.apply(predicate, thisArg, [
				entry,
				index,
				this
			])) return index;
			index++;
		}
		return -1;
	}
	filter(predicate, thisArg) {
		const entries = [];
		let index = 0;
		for (const entry of this) {
			if (Reflect.apply(predicate, thisArg, [
				entry,
				index,
				this
			])) entries.push(entry);
			index++;
		}
		return new _OrderedDict(entries);
	}
	map(callbackfn, thisArg) {
		const entries = [];
		let index = 0;
		for (const entry of this) {
			entries.push([entry[0], Reflect.apply(callbackfn, thisArg, [
				entry,
				index,
				this
			])]);
			index++;
		}
		return new _OrderedDict(entries);
	}
	reduce(...args) {
		const [callbackfn, initialValue] = args;
		let index = 0;
		let accumulator = initialValue ?? this.at(0);
		for (const entry of this) {
			if (index === 0 && args.length === 1) accumulator = entry;
			else accumulator = Reflect.apply(callbackfn, this, [
				accumulator,
				entry,
				index,
				this
			]);
			index++;
		}
		return accumulator;
	}
	reduceRight(...args) {
		const [callbackfn, initialValue] = args;
		let accumulator = initialValue ?? this.at(-1);
		for (let index = this.size - 1; index >= 0; index--) {
			const entry = this.at(index);
			if (index === this.size - 1 && args.length === 1) accumulator = entry;
			else accumulator = Reflect.apply(callbackfn, this, [
				accumulator,
				entry,
				index,
				this
			]);
		}
		return accumulator;
	}
	toSorted(compareFn) {
		return new _OrderedDict([...this.entries()].sort(compareFn));
	}
	toReversed() {
		const reversed = new _OrderedDict();
		for (let index = this.size - 1; index >= 0; index--) {
			const key = this.keyAt(index);
			const element = this.get(key);
			reversed.set(key, element);
		}
		return reversed;
	}
	toSpliced(...args) {
		const entries = [...this.entries()];
		entries.splice(...args);
		return new _OrderedDict(entries);
	}
	slice(start, end) {
		const result = new _OrderedDict();
		let stop = this.size - 1;
		if (start === void 0) return result;
		if (start < 0) start = start + this.size;
		if (end !== void 0 && end > 0) stop = end - 1;
		for (let index = start; index <= stop; index++) {
			const key = this.keyAt(index);
			const element = this.get(key);
			result.set(key, element);
		}
		return result;
	}
	every(predicate, thisArg) {
		let index = 0;
		for (const entry of this) {
			if (!Reflect.apply(predicate, thisArg, [
				entry,
				index,
				this
			])) return false;
			index++;
		}
		return true;
	}
	some(predicate, thisArg) {
		let index = 0;
		for (const entry of this) {
			if (Reflect.apply(predicate, thisArg, [
				entry,
				index,
				this
			])) return true;
			index++;
		}
		return false;
	}
};
function at(array, index) {
	if ("at" in Array.prototype) return Array.prototype.at.call(array, index);
	const actualIndex = toSafeIndex(array, index);
	return actualIndex === -1 ? void 0 : array[actualIndex];
}
__name$6(at, "at");
function toSafeIndex(array, index) {
	const length = array.length;
	const relativeIndex = toSafeInteger(index);
	const actualIndex = relativeIndex >= 0 ? relativeIndex : length + relativeIndex;
	return actualIndex < 0 || actualIndex >= length ? -1 : actualIndex;
}
__name$6(toSafeIndex, "toSafeIndex");
function toSafeInteger(number) {
	return number !== number || number === 0 ? 0 : Math.trunc(number);
}
__name$6(toSafeInteger, "toSafeInteger");
/* @__NO_SIDE_EFFECTS__ */
function createCollection2(name) {
	const PROVIDER_NAME = name + "CollectionProvider";
	const [createCollectionContext, createCollectionScope] = createContextScope(PROVIDER_NAME);
	const [CollectionContextProvider, useCollectionContext] = createCollectionContext(PROVIDER_NAME, {
		collectionElement: null,
		collectionRef: { current: null },
		collectionRefObject: { current: null },
		itemMap: new OrderedDict(),
		setItemMap: /* @__PURE__ */ __name$6(() => void 0, "setItemMap")
	});
	const CollectionProvider = /* @__PURE__ */ __name$6(({ state, ...props }) => {
		return state ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollectionProviderImpl, {
			...props,
			state
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollectionInit, { ...props });
	}, "CollectionProvider");
	CollectionProvider.displayName = PROVIDER_NAME;
	const CollectionInit = /* @__PURE__ */ __name$6((props) => {
		const state = useInitCollection();
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollectionProviderImpl, {
			...props,
			state
		});
	}, "CollectionInit");
	CollectionInit.displayName = PROVIDER_NAME + "Init";
	const CollectionProviderImpl = /* @__PURE__ */ __name$6((props) => {
		const { scope, children, state } = props;
		const ref = import_react.useRef(null);
		const [collectionElement, setCollectionElement] = import_react.useState(null);
		const composeRefs = useComposedRefs$1(ref, setCollectionElement);
		const [itemMap, setItemMap] = state;
		import_react.useEffect(() => {
			if (!collectionElement) return;
			const observer = getChildListObserver(() => {});
			observer.observe(collectionElement, {
				childList: true,
				subtree: true
			});
			return () => {
				observer.disconnect();
			};
		}, [collectionElement]);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollectionContextProvider, {
			scope,
			itemMap,
			setItemMap,
			collectionRef: composeRefs,
			collectionRefObject: ref,
			collectionElement,
			children
		});
	}, "CollectionProviderImpl");
	CollectionProviderImpl.displayName = PROVIDER_NAME + "Impl";
	const COLLECTION_SLOT_NAME = name + "CollectionSlot";
	const CollectionSlotImpl = /* @__PURE__ */ createSlot(COLLECTION_SLOT_NAME);
	const CollectionSlot = import_react.forwardRef((props, forwardedRef) => {
		const { scope, children } = props;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollectionSlotImpl, {
			ref: useComposedRefs$1(forwardedRef, useCollectionContext(COLLECTION_SLOT_NAME, scope).collectionRef),
			children
		});
	});
	CollectionSlot.displayName = COLLECTION_SLOT_NAME;
	const ITEM_SLOT_NAME = name + "CollectionItemSlot";
	const ITEM_DATA_ATTR = "data-radix-collection-item";
	const CollectionItemSlotImpl = /* @__PURE__ */ createSlot(ITEM_SLOT_NAME);
	const CollectionItemSlot = import_react.forwardRef((props, forwardedRef) => {
		const { scope, children, ...itemData } = props;
		const ref = import_react.useRef(null);
		const [element, setElement] = import_react.useState(null);
		const composedRefs = useComposedRefs$1(forwardedRef, ref, setElement);
		const { setItemMap } = useCollectionContext(ITEM_SLOT_NAME, scope);
		const itemDataRef = import_react.useRef(itemData);
		if (!shallowEqual(itemDataRef.current, itemData)) itemDataRef.current = itemData;
		const memoizedItemData = itemDataRef.current;
		import_react.useEffect(() => {
			const itemData2 = memoizedItemData;
			setItemMap((map) => {
				if (!element) return map;
				if (!map.has(element)) {
					map.set(element, {
						...itemData2,
						element
					});
					return map.toSorted(sortByDocumentPosition);
				}
				return map.set(element, {
					...itemData2,
					element
				}).toSorted(sortByDocumentPosition);
			});
			return () => {
				setItemMap((map) => {
					if (!element || !map.has(element)) return map;
					map.delete(element);
					return new OrderedDict(map);
				});
			};
		}, [
			element,
			memoizedItemData,
			setItemMap
		]);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollectionItemSlotImpl, {
			[ITEM_DATA_ATTR]: "",
			ref: composedRefs,
			children
		});
	});
	CollectionItemSlot.displayName = ITEM_SLOT_NAME;
	function useInitCollection() {
		return import_react.useState(new OrderedDict());
	}
	__name$6(useInitCollection, "useInitCollection");
	function useCollection(scope) {
		const { itemMap } = useCollectionContext(name + "CollectionConsumer", scope);
		return itemMap;
	}
	__name$6(useCollection, "useCollection");
	return [{
		Provider: CollectionProvider,
		Slot: CollectionSlot,
		ItemSlot: CollectionItemSlot
	}, {
		createCollectionScope,
		useCollection,
		useInitCollection
	}];
}
__name$6(createCollection2, "createCollection");
function shallowEqual(a, b) {
	if (a === b) return true;
	if (typeof a !== "object" || typeof b !== "object") return false;
	if (a == null || b == null) return false;
	const keysA = Object.keys(a);
	const keysB = Object.keys(b);
	if (keysA.length !== keysB.length) return false;
	for (const key of keysA) {
		if (!Object.prototype.hasOwnProperty.call(b, key)) return false;
		if (a[key] !== b[key]) return false;
	}
	return true;
}
__name$6(shallowEqual, "shallowEqual");
function isElementPreceding(a, b) {
	return !!(b.compareDocumentPosition(a) & Node.DOCUMENT_POSITION_PRECEDING);
}
__name$6(isElementPreceding, "isElementPreceding");
function sortByDocumentPosition(a, b) {
	return !a[1].element || !b[1].element ? 0 : isElementPreceding(a[1].element, b[1].element) ? -1 : 1;
}
__name$6(sortByDocumentPosition, "sortByDocumentPosition");
function getChildListObserver(callback) {
	return new MutationObserver((mutationsList) => {
		for (const mutation of mutationsList) if (mutation.type === "childList") {
			callback();
			return;
		}
	});
}
__name$6(getChildListObserver, "getChildListObserver");
//#endregion
//#region ../fieldtrip-v574/node_modules/@radix-ui/react-roving-focus/node_modules/@radix-ui/react-compose-refs/dist/index.mjs
var __defProp$5 = Object.defineProperty;
var __name$5 = (target, value) => __defProp$5(target, "name", {
	value,
	configurable: true
});
function setRef(ref, value) {
	if (typeof ref === "function") return ref(value);
	else if (ref !== null && ref !== void 0) ref.current = value;
}
__name$5(setRef, "setRef");
function composeRefs(...refs) {
	return (node) => {
		let hasCleanup = false;
		const cleanups = refs.map((ref) => {
			const cleanup = setRef(ref, node);
			if (!hasCleanup && typeof cleanup == "function") hasCleanup = true;
			return cleanup;
		});
		if (hasCleanup) return () => {
			for (let i = 0; i < cleanups.length; i++) {
				const cleanup = cleanups[i];
				if (typeof cleanup == "function") cleanup();
				else setRef(refs[i], null);
			}
		};
	};
}
__name$5(composeRefs, "composeRefs");
function useComposedRefs(...refs) {
	return import_react.useCallback(composeRefs(...refs), refs);
}
__name$5(useComposedRefs, "useComposedRefs");
//#endregion
//#region ../fieldtrip-v574/node_modules/@radix-ui/react-direction/dist/index.mjs
var __defProp$4 = Object.defineProperty;
var __name$4 = (target, value) => __defProp$4(target, "name", {
	value,
	configurable: true
});
var DirectionContext = import_react.createContext(void 0);
function useDirection(localDir) {
	const globalDir = import_react.useContext(DirectionContext);
	return localDir || globalDir || "ltr";
}
__name$4(useDirection, "useDirection");
//#endregion
//#region ../fieldtrip-v574/node_modules/@radix-ui/react-use-is-hydrated/dist/index.mjs
var __defProp$3 = Object.defineProperty;
var __name$3 = (target, value) => __defProp$3(target, "name", {
	value,
	configurable: true
});
var _isHydrated = false;
function useIsHydrated() {
	const [isHydrated, setIsHydrated] = import_react.useState(_isHydrated);
	import_react.useEffect(() => {
		if (!_isHydrated) {
			_isHydrated = true;
			setIsHydrated(true);
		}
	}, []);
	return isHydrated;
}
__name$3(useIsHydrated, "useIsHydrated");
var useReactSyncExternalStore = import_react[" useSyncExternalStore ".trim().toString()];
function subscribe() {
	return () => {};
}
__name$3(subscribe, "subscribe");
function useIsHydratedModern() {
	return useReactSyncExternalStore(subscribe, () => true, () => false);
}
__name$3(useIsHydratedModern, "useIsHydratedModern");
var useIsHydrated2 = typeof useReactSyncExternalStore === "function" ? useIsHydratedModern : useIsHydrated;
//#endregion
//#region ../fieldtrip-v574/node_modules/@radix-ui/react-roving-focus/dist/index.mjs
var __defProp$2 = Object.defineProperty;
var __name$2 = (target, value) => __defProp$2(target, "name", {
	value,
	configurable: true
});
var ENTRY_FOCUS = "rovingFocusGroup.onEntryFocus";
var EVENT_OPTIONS = {
	bubbles: false,
	cancelable: true
};
var GROUP_NAME = "RovingFocusGroup";
var [Collection, useCollection, createCollectionScope] = /* @__PURE__ */ createCollection(GROUP_NAME);
var [createRovingFocusGroupContext, createRovingFocusGroupScope] = createContextScope(GROUP_NAME, [createCollectionScope]);
var [RovingFocusProvider, useRovingFocusContext] = createRovingFocusGroupContext(GROUP_NAME);
var RovingFocusGroup = /* @__PURE__ */ import_react.forwardRef(/* @__PURE__ */ __name$2(function RovingFocusGroup2(props, forwardedRef) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collection.Provider, {
		scope: props.__scopeRovingFocusGroup,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collection.Slot, {
			scope: props.__scopeRovingFocusGroup,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RovingFocusGroupImpl, {
				...props,
				ref: forwardedRef
			})
		})
	});
}, "RovingFocusGroup"));
var RovingFocusGroupImpl = /* @__PURE__ */ import_react.forwardRef(/* @__PURE__ */ __name$2(function RovingFocusGroupImpl2(props, forwardedRef) {
	const { __scopeRovingFocusGroup, orientation, loop = false, dir, currentTabStopId: currentTabStopIdProp, defaultCurrentTabStopId, onCurrentTabStopIdChange, onEntryFocus, preventScrollOnEntryFocus = false, ...groupProps } = props;
	const ref = import_react.useRef(null);
	const composedRefs = useComposedRefs(forwardedRef, ref);
	const direction = useDirection(dir);
	const [currentTabStopId, setCurrentTabStopId] = useControllableState({
		prop: currentTabStopIdProp,
		defaultProp: defaultCurrentTabStopId ?? null,
		onChange: onCurrentTabStopIdChange,
		caller: GROUP_NAME
	});
	const [isTabbingBackOut, setIsTabbingBackOut] = import_react.useState(false);
	const handleEntryFocus = useCallbackRef(onEntryFocus);
	const getItems = useCollection(__scopeRovingFocusGroup);
	const isClickFocusRef = import_react.useRef(false);
	const [focusableItemsCount, setFocusableItemsCount] = import_react.useState(0);
	import_react.useEffect(() => {
		const node = ref.current;
		if (node) {
			node.addEventListener(ENTRY_FOCUS, handleEntryFocus);
			return () => node.removeEventListener(ENTRY_FOCUS, handleEntryFocus);
		}
	}, [handleEntryFocus]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RovingFocusProvider, {
		scope: __scopeRovingFocusGroup,
		orientation,
		dir: direction,
		loop,
		currentTabStopId,
		onItemFocus: import_react.useCallback((tabStopId) => setCurrentTabStopId(tabStopId), [setCurrentTabStopId]),
		onItemShiftTab: import_react.useCallback(() => setIsTabbingBackOut(true), []),
		onFocusableItemAdd: import_react.useCallback(() => setFocusableItemsCount((prevCount) => prevCount + 1), []),
		onFocusableItemRemove: import_react.useCallback(() => setFocusableItemsCount((prevCount) => prevCount - 1), []),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
			tabIndex: isTabbingBackOut || focusableItemsCount === 0 ? -1 : 0,
			"data-orientation": orientation,
			...groupProps,
			ref: composedRefs,
			style: {
				outline: "none",
				...props.style
			},
			onMouseDown: composeEventHandlers(props.onMouseDown, () => {
				isClickFocusRef.current = true;
			}),
			onFocus: composeEventHandlers(props.onFocus, (event) => {
				const isKeyboardFocus = !isClickFocusRef.current;
				if (event.target === event.currentTarget && isKeyboardFocus && !isTabbingBackOut) {
					const entryFocusEvent = new CustomEvent(ENTRY_FOCUS, EVENT_OPTIONS);
					event.currentTarget.dispatchEvent(entryFocusEvent);
					if (!entryFocusEvent.defaultPrevented) {
						const items = getItems().filter((item) => item.focusable);
						focusFirst([
							items.find((item) => item.active),
							items.find((item) => item.id === currentTabStopId),
							...items
						].filter(Boolean).map((item) => item.ref.current), preventScrollOnEntryFocus);
					}
				}
				isClickFocusRef.current = false;
			}),
			onBlur: composeEventHandlers(props.onBlur, () => setIsTabbingBackOut(false))
		})
	});
}, "RovingFocusGroupImpl"));
var ITEM_NAME$1 = "RovingFocusGroupItem";
var RovingFocusGroupItem = /* @__PURE__ */ import_react.forwardRef(/* @__PURE__ */ __name$2(function RovingFocusGroupItem2(props, forwardedRef) {
	const { __scopeRovingFocusGroup, focusable = true, active = false, tabStopId, children, ...itemProps } = props;
	const autoId = useId();
	const id = tabStopId || autoId;
	const context = useRovingFocusContext(ITEM_NAME$1, __scopeRovingFocusGroup);
	const isCurrentTabStop = context.currentTabStopId === id;
	const getItems = useCollection(__scopeRovingFocusGroup);
	const { onFocusableItemAdd, onFocusableItemRemove, currentTabStopId } = context;
	const isHydrated = useIsHydrated2();
	useLayoutEffect2(() => {
		if (!isHydrated || !focusable) return;
		onFocusableItemAdd();
		return () => onFocusableItemRemove();
	}, [
		isHydrated,
		focusable,
		onFocusableItemAdd,
		onFocusableItemRemove
	]);
	import_react.useEffect(() => {
		if (isHydrated || !focusable) return;
		onFocusableItemAdd();
		return () => onFocusableItemRemove();
	}, [
		isHydrated,
		focusable,
		onFocusableItemAdd,
		onFocusableItemRemove
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collection.ItemSlot, {
		scope: __scopeRovingFocusGroup,
		id,
		focusable,
		active,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.span, {
			tabIndex: isCurrentTabStop ? 0 : -1,
			"data-orientation": context.orientation,
			...itemProps,
			ref: forwardedRef,
			onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
				if (!focusable) event.preventDefault();
				else context.onItemFocus(id);
			}),
			onFocus: composeEventHandlers(props.onFocus, () => context.onItemFocus(id)),
			onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
				if (event.key === "Tab" && event.shiftKey) {
					context.onItemShiftTab();
					return;
				}
				if (event.target !== event.currentTarget) return;
				const focusIntent = getFocusIntent(event, context.orientation, context.dir);
				if (focusIntent !== void 0) {
					if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
					event.preventDefault();
					let candidateNodes = getItems().filter((item) => item.focusable).map((item) => item.ref.current);
					if (focusIntent === "last") candidateNodes.reverse();
					else if (focusIntent === "prev" || focusIntent === "next") {
						if (focusIntent === "prev") candidateNodes.reverse();
						const currentIndex = candidateNodes.indexOf(event.currentTarget);
						candidateNodes = context.loop ? wrapArray(candidateNodes, currentIndex + 1) : candidateNodes.slice(currentIndex + 1);
					}
					setTimeout(() => focusFirst(candidateNodes));
				}
			}),
			children: typeof children === "function" ? children({
				isCurrentTabStop,
				hasTabStop: currentTabStopId != null
			}) : children
		})
	});
}, "RovingFocusGroupItem"));
var MAP_KEY_TO_FOCUS_INTENT = {
	ArrowLeft: "prev",
	ArrowUp: "prev",
	ArrowRight: "next",
	ArrowDown: "next",
	PageUp: "first",
	Home: "first",
	PageDown: "last",
	End: "last"
};
function getDirectionAwareKey(key, dir) {
	if (dir !== "rtl") return key;
	return key === "ArrowLeft" ? "ArrowRight" : key === "ArrowRight" ? "ArrowLeft" : key;
}
__name$2(getDirectionAwareKey, "getDirectionAwareKey");
function getFocusIntent(event, orientation, dir) {
	const key = getDirectionAwareKey(event.key, dir);
	if (orientation === "vertical" && ["ArrowLeft", "ArrowRight"].includes(key)) return void 0;
	if (orientation === "horizontal" && ["ArrowUp", "ArrowDown"].includes(key)) return void 0;
	return MAP_KEY_TO_FOCUS_INTENT[key];
}
__name$2(getFocusIntent, "getFocusIntent");
function focusFirst(candidates, preventScroll = false) {
	const PREVIOUSLY_FOCUSED_ELEMENT = document.activeElement;
	for (const candidate of candidates) {
		if (candidate === PREVIOUSLY_FOCUSED_ELEMENT) return;
		candidate.focus({ preventScroll });
		if (document.activeElement !== PREVIOUSLY_FOCUSED_ELEMENT) return;
	}
}
__name$2(focusFirst, "focusFirst");
function wrapArray(array, startIndex) {
	return array.map((_, index) => array[(startIndex + index) % array.length]);
}
__name$2(wrapArray, "wrapArray");
var Root = RovingFocusGroup;
var Item = RovingFocusGroupItem;
//#endregion
//#region ../fieldtrip-v574/node_modules/@radix-ui/react-toggle/dist/index.mjs
var __defProp$1 = Object.defineProperty;
var __name$1 = (target, value) => __defProp$1(target, "name", {
	value,
	configurable: true
});
var NAME = "Toggle";
var Toggle = /* @__PURE__ */ import_react.forwardRef(/* @__PURE__ */ __name$1(function Toggle2(props, forwardedRef) {
	const { pressed: pressedProp, defaultPressed, onPressedChange, ...buttonProps } = props;
	const [pressed, setPressed] = useControllableState({
		prop: pressedProp,
		onChange: onPressedChange,
		defaultProp: defaultPressed ?? false,
		caller: NAME
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.button, {
		type: "button",
		"aria-pressed": pressed,
		"data-state": pressed ? "on" : "off",
		"data-disabled": props.disabled ? "" : void 0,
		...buttonProps,
		ref: forwardedRef,
		onClick: composeEventHandlers(props.onClick, () => {
			if (!props.disabled) setPressed(!pressed);
		})
	});
}, "Toggle"));
//#endregion
//#region ../fieldtrip-v574/node_modules/@radix-ui/react-toggle-group/dist/index.mjs
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", {
	value,
	configurable: true
});
var TOGGLE_GROUP_NAME = "ToggleGroup";
var [createToggleGroupContext, createToggleGroupScope] = createContextScope(TOGGLE_GROUP_NAME, [createRovingFocusGroupScope]);
var useRovingFocusGroupScope = createRovingFocusGroupScope();
var ToggleGroup$1 = /* @__PURE__ */ import_react.forwardRef(/* @__PURE__ */ __name(function ToggleGroup2(props, forwardedRef) {
	const { type, ...toggleGroupProps } = props;
	if (type === "single") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleGroupImplSingle, {
		role: "radiogroup",
		...toggleGroupProps,
		ref: forwardedRef
	});
	if (type === "multiple") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleGroupImplMultiple, {
		role: "toolbar",
		...toggleGroupProps,
		ref: forwardedRef
	});
	throw new Error(`Missing prop \`type\` expected on \`${TOGGLE_GROUP_NAME}\``);
}, "ToggleGroup"));
var [ToggleGroupValueProvider, useToggleGroupValueContext] = createToggleGroupContext(TOGGLE_GROUP_NAME);
var ToggleGroupImplSingle = /* @__PURE__ */ import_react.forwardRef(/* @__PURE__ */ __name(function ToggleGroupImplSingle2(props, forwardedRef) {
	const { value: valueProp, defaultValue, onValueChange = /* @__PURE__ */ __name(() => {}, "onValueChange"), ...toggleGroupSingleProps } = props;
	const [value, setValue] = useControllableState({
		prop: valueProp,
		defaultProp: defaultValue ?? "",
		onChange: onValueChange,
		caller: TOGGLE_GROUP_NAME
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleGroupValueProvider, {
		scope: props.__scopeToggleGroup,
		type: "single",
		value: import_react.useMemo(() => value ? [value] : [], [value]),
		onItemActivate: setValue,
		onItemDeactivate: import_react.useCallback(() => setValue(""), [setValue]),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleGroupImpl, {
			...toggleGroupSingleProps,
			ref: forwardedRef
		})
	});
}, "ToggleGroupImplSingle"));
var ToggleGroupImplMultiple = /* @__PURE__ */ import_react.forwardRef(/* @__PURE__ */ __name(function ToggleGroupImplMultiple2(props, forwardedRef) {
	const { value: valueProp, defaultValue, onValueChange = /* @__PURE__ */ __name(() => {}, "onValueChange"), ...toggleGroupMultipleProps } = props;
	const [value, setValue] = useControllableState({
		prop: valueProp,
		defaultProp: defaultValue ?? [],
		onChange: onValueChange,
		caller: TOGGLE_GROUP_NAME
	});
	const handleButtonActivate = import_react.useCallback((itemValue) => setValue((prevValue = []) => [...prevValue, itemValue]), [setValue]);
	const handleButtonDeactivate = import_react.useCallback((itemValue) => setValue((prevValue = []) => prevValue.filter((value2) => value2 !== itemValue)), [setValue]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleGroupValueProvider, {
		scope: props.__scopeToggleGroup,
		type: "multiple",
		value,
		onItemActivate: handleButtonActivate,
		onItemDeactivate: handleButtonDeactivate,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleGroupImpl, {
			...toggleGroupMultipleProps,
			ref: forwardedRef
		})
	});
}, "ToggleGroupImplMultiple"));
var [ToggleGroupContext$1, useToggleGroupContext] = createToggleGroupContext(TOGGLE_GROUP_NAME);
var ToggleGroupImpl = /* @__PURE__ */ import_react.forwardRef(/* @__PURE__ */ __name(function ToggleGroupImpl2(props, forwardedRef) {
	const { __scopeToggleGroup, disabled = false, rovingFocus = true, orientation, dir, loop = true, ...toggleGroupProps } = props;
	const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeToggleGroup);
	const direction = useDirection(dir);
	const commonProps = {
		dir: direction,
		...toggleGroupProps
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleGroupContext$1, {
		scope: __scopeToggleGroup,
		rovingFocus,
		disabled,
		children: rovingFocus ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
			asChild: true,
			...rovingFocusGroupScope,
			orientation,
			dir: direction,
			loop,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
				...commonProps,
				ref: forwardedRef
			})
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
			...commonProps,
			ref: forwardedRef
		})
	});
}, "ToggleGroupImpl"));
var ITEM_NAME = "ToggleGroupItem";
var ToggleGroupItem$1 = /* @__PURE__ */ import_react.forwardRef(/* @__PURE__ */ __name(function ToggleGroupItem2(props, forwardedRef) {
	const valueContext = useToggleGroupValueContext(ITEM_NAME, props.__scopeToggleGroup);
	const context = useToggleGroupContext(ITEM_NAME, props.__scopeToggleGroup);
	const rovingFocusGroupScope = useRovingFocusGroupScope(props.__scopeToggleGroup);
	const pressed = valueContext.value.includes(props.value);
	const disabled = context.disabled || props.disabled;
	const commonProps = {
		...props,
		pressed,
		disabled
	};
	const ref = import_react.useRef(null);
	return context.rovingFocus ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
		asChild: true,
		...rovingFocusGroupScope,
		focusable: !disabled,
		active: pressed,
		ref,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleGroupItemImpl, {
			...commonProps,
			ref: forwardedRef
		})
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleGroupItemImpl, {
		...commonProps,
		ref: forwardedRef
	});
}, "ToggleGroupItem"));
var ToggleGroupItemImpl = /* @__PURE__ */ import_react.forwardRef(/* @__PURE__ */ __name(function ToggleGroupItemImpl2(props, forwardedRef) {
	const { __scopeToggleGroup, value, ...itemProps } = props;
	const valueContext = useToggleGroupValueContext(ITEM_NAME, __scopeToggleGroup);
	const singleProps = {
		role: "radio",
		"aria-checked": props.pressed,
		"aria-pressed": void 0
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
		...valueContext.type === "single" ? singleProps : void 0,
		...itemProps,
		ref: forwardedRef,
		onPressedChange: (pressed) => {
			if (pressed) valueContext.onItemActivate(value);
			else valueContext.onItemDeactivate(value);
		}
	});
}, "ToggleGroupItemImpl"));
//#endregion
//#region components/ui/toggle.tsx
var toggleVariants = cva("inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-[color,box-shadow] outline-none hover:bg-muted hover:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", {
	variants: {
		variant: {
			default: "bg-transparent",
			outline: "border border-input bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground"
		},
		size: {
			default: "h-9 min-w-9 px-2",
			sm: "h-8 min-w-8 px-1.5",
			lg: "h-10 min-w-10 px-2.5"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
//#endregion
//#region components/ui/toggle-group.tsx
var ToggleGroupContext = import_react.createContext({
	size: "default",
	variant: "default",
	spacing: 0
});
function ToggleGroup({ className, variant, size, spacing = 0, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleGroup$1, {
		"data-slot": "toggle-group",
		"data-variant": variant,
		"data-size": size,
		"data-spacing": spacing,
		style: { "--gap": spacing },
		className: cn("group/toggle-group flex w-fit items-center gap-[--spacing(var(--gap))] rounded-md data-[spacing=default]:data-[variant=outline]:shadow-xs", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleGroupContext.Provider, {
			value: {
				variant,
				size,
				spacing
			},
			children
		})
	});
}
function ToggleGroupItem({ className, children, variant, size, ...props }) {
	const context = import_react.useContext(ToggleGroupContext);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleGroupItem$1, {
		"data-slot": "toggle-group-item",
		"data-variant": context.variant || variant,
		"data-size": context.size || size,
		"data-spacing": context.spacing,
		className: cn(toggleVariants({
			variant: context.variant || variant,
			size: context.size || size
		}), "w-auto min-w-0 shrink-0 px-3 focus:z-10 focus-visible:z-10", "data-[spacing=0]:rounded-none data-[spacing=0]:shadow-none data-[spacing=0]:first:rounded-l-md data-[spacing=0]:last:rounded-r-md data-[spacing=0]:data-[variant=outline]:border-l-0 data-[spacing=0]:data-[variant=outline]:first:border-l", className),
		...props,
		children
	});
}
//#endregion
//#region app/work/documented-scope.ts
/** Public service categories; original project.scope values remain the credit record. */
var documentedScopes = [
	"design",
	"fabrication",
	"installation"
];
var documentedScopeLabels = {
	design: "Design",
	fabrication: "Fabrication",
	installation: "Installation"
};
function documentedScopeTags(scope) {
	const services = scope.toLowerCase().split(/\s*[/,]\s*/).map((label) => label.trim()).map((label) => label === "install" ? "installation" : label);
	return documentedScopes.filter((tag) => services.includes(tag));
}
//#endregion
//#region app/work/project-category.ts
var projectCategories = [
	"artist-works",
	"exhibitions",
	"residential",
	"brand-collaborations"
];
var projectCategoryLabels = {
	"artist-works": "Artist works",
	exhibitions: "Exhibitions",
	residential: "Residential",
	"brand-collaborations": "Brand collaborations"
};
//#endregion
//#region app/work/archive-state.ts
var archiveScopes = ["all", ...documentedScopes];
var archiveRecords = ["all", ...projectCategories];
var archiveOrders = [
	"archive",
	"newest",
	"oldest",
	"client"
];
function firstValue(value) {
	return Array.isArray(value) ? value[0] : value;
}
function allowed(value, options, fallback = "all") {
	return value && options.includes(value) ? value : fallback;
}
function parseArchiveState(search) {
	const value = (name) => search instanceof URLSearchParams ? search.get(name) ?? void 0 : firstValue(search[name]);
	return {
		scope: allowed(value("scope"), archiveScopes),
		record: allowed(value("record"), archiveRecords),
		query: (value("q") ?? "").trim().slice(0, 80),
		order: allowed(value("order"), archiveOrders, "archive")
	};
}
function serializeArchiveState(state) {
	const params = new URLSearchParams();
	if (state.scope !== "all" && archiveScopes.includes(state.scope)) params.set("scope", state.scope);
	if (state.record !== "all" && archiveRecords.includes(state.record)) params.set("record", state.record);
	if (state.query) params.set("q", state.query.slice(0, 80));
	if (state.order !== "archive" && archiveOrders.includes(state.order)) params.set("order", state.order);
	const query = params.toString();
	return query ? `/work?${query}` : "/work";
}
function projectHrefWithArchive(slug, archiveHref) {
	return archiveHref === "/work" ? `/work/${slug}` : `/work/${slug}?from=${encodeURIComponent(archiveHref)}`;
}
//#endregion
//#region app/work/archive-explorer.tsx
var filters = [{
	value: "all",
	label: "All work"
}, ...documentedScopes.map((value) => ({
	value,
	label: documentedScopeLabels[value]
}))];
var projectTypes = [{
	value: "all",
	label: "All projects"
}, ...projectCategories.map((value) => ({
	value,
	label: projectCategoryLabels[value]
}))];
var orders = [
	{
		value: "archive",
		label: "Archive order"
	},
	{
		value: "newest",
		label: "Newest first"
	},
	{
		value: "oldest",
		label: "Oldest first"
	},
	{
		value: "client",
		label: "Client A–Z"
	}
];
var projectYear = (date, order) => {
	const years = date.match(/\b(?:19|20)\d{2}\b/g)?.map(Number) ?? [];
	if (years.length === 0) return null;
	return order === "newest" ? Math.max(...years) : Math.min(...years);
};
function ArchiveExplorer({ projects, initialState, children, displayDate }) {
	const [filter, setFilter] = (0, import_react.useState)(initialState.scope);
	const [recordType, setRecordType] = (0, import_react.useState)(initialState.record);
	const [query, setQuery] = (0, import_react.useState)(initialState.query);
	const [order, setOrder] = (0, import_react.useState)(initialState.order);
	const normalizedQuery = searchText(query);
	const archiveHref = serializeArchiveState({
		scope: filter,
		record: recordType,
		query: query.trim(),
		order
	});
	const visibleProjects = (0, import_react.useMemo)(() => projects.filter((project) => {
		const matchesScope = filter === "all" || documentedScopeTags(project.scope).includes(filter);
		const matchesProjectType = recordType === "all" || project.categories.includes(recordType);
		const searchableRecord = searchText([
			project.title,
			project.client,
			project.date,
			project.scope,
			...project.categories.map((category) => projectCategoryLabels[category]),
			...imageCategories.filter((category) => project.imageCounts[category] > 0).map(imageCategoryLabel)
		].join(" "));
		return matchesScope && matchesProjectType && (!normalizedQuery || searchableRecord.includes(normalizedQuery));
	}).sort((a, b) => {
		const closingArtwork = compareFinalArtwork(a.slug, b.slug);
		if (closingArtwork) return closingArtwork;
		if (order === "client") return a.client.localeCompare(b.client, "en", { sensitivity: "base" }) || a.title.localeCompare(b.title, "en", { sensitivity: "base" }) || a.archiveNumber - b.archiveNumber;
		if (order === "newest" || order === "oldest") {
			const aYear = projectYear(a.date, order);
			const bYear = projectYear(b.date, order);
			if (aYear === null && bYear === null) return a.archiveNumber - b.archiveNumber;
			if (aYear === null) return 1;
			if (bYear === null) return -1;
			return (order === "newest" ? bYear - aYear : aYear - bYear) || a.archiveNumber - b.archiveNumber;
		}
		return a.archiveNumber - b.archiveNumber;
	}), [
		filter,
		normalizedQuery,
		order,
		projects,
		recordType
	]);
	(0, import_react.useEffect)(() => {
		setFilter(initialState.scope);
		setRecordType(initialState.record);
		setQuery(initialState.query);
		setOrder(initialState.order);
	}, [initialState]);
	(0, import_react.useEffect)(() => {
		const restoreArchiveState = () => {
			if (window.location.pathname !== "/work") return;
			const next = parseArchiveState(new URLSearchParams(window.location.search));
			setFilter(next.scope);
			setRecordType(next.record);
			setQuery(next.query);
			setOrder(next.order);
		};
		window.addEventListener("popstate", restoreArchiveState);
		return () => window.removeEventListener("popstate", restoreArchiveState);
	}, []);
	(0, import_react.useEffect)(() => {
		const next = new URL(window.location.href);
		if (next.pathname !== "/work") return;
		next.search = new URL(archiveHref, window.location.origin).search;
		window.history.replaceState(window.history.state, "", `${next.pathname}${next.search}${next.hash}`);
	}, [archiveHref]);
	const resetArchive = () => {
		setFilter("all");
		setRecordType("all");
		setQuery("");
		setOrder("archive");
	};
	const groups = projectSectionDefinitions.map((group) => ({
		...group,
		projects: projectsInSection(projects, group.id, displayDate)
	})).filter((group) => group.projects.length > 0);
	const hasSearch = filter !== "all" || recordType !== "all" || Boolean(normalizedQuery) || order !== "archive";
	const renderGroup = (group) => {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ProjectCollection, {
			className: "archive-collection",
			prefix: "work",
			group,
			collapsible: group.id !== "search-results",
			expanded: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "archive-gallery",
				children: group.projects.map((project, index) => {
					const services = projectCaptionServices(project.slug);
					const year = projectCaptionYear(project.date);
					const displayInfo = group.id === "latest-projects" ? exhibitionDisplayInfo(project.slug, displayDate) : null;
					const portrait = portraitCardImages[project.slug]?.src === project.cover ? portraitCardImages[project.slug] : void 0;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
						className: "archive-card archive-card--" + index % 6,
						id: group.id === "search-results" ? `${project.slug}-search-result` : group.id === "latest-projects" && project.slug === "core-nyc" ? "core-nyc-on-display" : project.slug,
						tabIndex: -1,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							className: "archive-card-link",
							href: projectHrefWithArchive(project.slug, group.id === "search-results" ? archiveHref : "/work"),
							children: [
								project.cover && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "archive-cover-wrap",
									"data-cover-project": project.slug,
									"data-portrait-cover": portrait ? "true" : void 0,
									style: portrait ? { "--portrait-card-ratio": `${portrait.width} / ${portrait.height}` } : void 0,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MotionImage, {
										alt: project.title + ", " + project.client,
										className: "archive-cover",
										loading: index < 4 ? "eager" : "lazy",
										src: project.cover,
										direction: index % 2 ? "right" : "left",
										width: portrait?.width,
										height: portrait?.height
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageCredit, {
									src: project.cover,
									linked: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "archive-meta",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: String(project.archiveNumber).padStart(2, "0") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											"data-content-key": `project.${project.slug}.title`,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectTitle, { title: project.title })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-content-key": `project.${project.slug}.client`,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandText, { children: project.client })
										}), year && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [" · ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: year })] })] }),
										services && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "archive-scope",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandText, { children: services })
										}),
										displayInfo && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "archive-display-note",
											"data-display-open": displayInfo.open,
											children: displayInfo.label
										})
									] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "archive-preview",
									"aria-hidden": "true",
									children: project.previews.map((src) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										alt: "",
										loading: "lazy",
										src
									}, src))
								})
							]
						})
					}, project.slug);
				})
			}), group.id === "latest-projects" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "on-display-text-record",
				id: "grants-tomb",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Grant’s Tomb" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "General Grant National Memorial · New York" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Design with South Side Design & Building." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Permanent interpretive exhibits · Check visitor center hours" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "https://www.nps.gov/gegr/planyourvisit/basicinfo.htm",
						target: "_blank",
						rel: "noopener noreferrer",
						children: "Visitor information"
					})
				]
			})]
		}, group.id);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			id: "featured-projects",
			tabIndex: -1,
			"data-page-section": true,
			children: groups.filter((group) => group.id === "featured-projects").map(renderGroup)
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			id: "project-collections",
			tabIndex: -1,
			"data-page-section": true,
			children: groups.filter((group) => group.id !== "featured-projects").map(renderGroup)
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
			id: "project-filters",
			tabIndex: -1,
			"data-page-section": true,
			className: "archive-controls",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: "Search and filter projects" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "archive-filter-panel",
				"aria-labelledby": "archive-filter-title",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "archive-filter-heading",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "section-kicker",
							id: "archive-filter-title",
							children: "Filter by service"
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							"aria-live": "polite",
							className: "sr-only",
							children: [
								visibleProjects.length,
								" matching ",
								visibleProjects.length === 1 ? "project" : "projects"
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "archive-search",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "archive-search-label",
							htmlFor: "archive-search-input",
							children: "Search projects"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "archive-search-fields",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "archive-search-control",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									autoComplete: "off",
									className: "archive-search-input",
									id: "archive-search-input",
									onChange: (event) => setQuery(event.target.value),
									placeholder: "Project, client, year, or scope",
									type: "search",
									value: query
								}), query && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "archive-search-clear",
									onClick: () => setQuery(""),
									type: "button",
									children: "Clear search"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "archive-order-control",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "archive-order",
									children: "Sort"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelect, {
									"aria-label": "Order the project archive",
									className: "archive-order-select",
									id: "archive-order",
									onChange: (event) => setOrder(event.target.value),
									value: order,
									children: orders.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelectOption, {
										value: item.value,
										children: item.label
									}, item.value))
								})]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleGroup, {
						"aria-label": "Filter projects by service",
						className: "archive-filter",
						onValueChange: (value) => value && setFilter(value),
						type: "single",
						value: filter,
						children: filters.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleGroupItem, {
							"aria-label": item.label,
							className: "archive-filter-button",
							value: item.value,
							children: item.label
						}, item.value))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "archive-provenance-heading",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "section-kicker",
							children: "Filter by project type"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleGroup, {
						"aria-label": "Filter the project archive by project type",
						className: "archive-filter archive-filter--provenance",
						onValueChange: (value) => value && setRecordType(value),
						type: "single",
						value: recordType,
						children: projectTypes.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleGroupItem, {
							"aria-label": item.label,
							className: "archive-filter-button",
							value: item.value,
							children: item.label
						}, item.value))
					})
				]
			})]
		}),
		hasSearch && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			id: "project-results",
			tabIndex: -1,
			"data-page-section": true,
			"aria-label": `${visibleProjects.length} matching field trip projects`,
			children: [visibleProjects.length > 0 && renderGroup({
				id: "search-results",
				title: "Search results",
				projects: visibleProjects
			}), visibleProjects.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "archive-empty",
				"aria-labelledby": "archive-empty-title",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					id: "archive-empty-title",
					children: "No projects match these filters."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: resetArchive,
					type: "button",
					children: "Clear filters"
				})]
			})]
		}),
		children
	] });
}
//#endregion
export { ArchiveExplorer };
