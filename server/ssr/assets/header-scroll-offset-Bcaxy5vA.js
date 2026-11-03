import { b as require_react, w as __toESM } from "../index.js";
//#region app/header-scroll-offset.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
/** Keep fragment links and keyboard scrolling clear of the full sticky masthead. */
function HeaderScrollOffset() {
	(0, import_react.useEffect)(() => {
		const header = document.querySelector(".section-header");
		if (!header) return;
		const root = document.documentElement;
		const updateHeight = () => {
			root.style.setProperty("--site-header-height", `${header.getBoundingClientRect().height}px`);
		};
		updateHeight();
		const observer = new ResizeObserver(updateHeight);
		observer.observe(header);
		return () => {
			observer.disconnect();
			root.style.removeProperty("--site-header-height");
		};
	}, []);
	return null;
}
//#endregion
export { HeaderScrollOffset };
