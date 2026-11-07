import { b as require_react, n as require_jsx_runtime, w as __toESM } from "../index.js";
//#region app/theme-artwork.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var currentTheme = () => document.documentElement.dataset.theme === "dark";
var serverTheme = () => false;
function subscribe(notify) {
	const observer = new MutationObserver(notify);
	observer.observe(document.documentElement, {
		attributes: true,
		attributeFilter: ["data-theme"]
	});
	return () => observer.disconnect();
}
/** Load the artwork for the visitor's selected appearance; preserve the image box. */
function ThemeArtwork({ darkSrc, src, ...props }) {
	const dark = (0, import_react.useSyncExternalStore)(subscribe, currentTheme, serverTheme);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		...props,
		src: dark ? darkSrc : src
	});
}
//#endregion
export { ThemeArtwork };
