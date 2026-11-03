import { b as require_react, n as require_jsx_runtime, w as __toESM } from "../index.js";
import { t as BrandText } from "./field-trip-name-BKqnzu5g.js";
//#region app/page-section-navigation.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
/** Real fragment links retain native URL/history behavior and work without JavaScript. */
function PageSectionNavigation({ title, sections, hideTitle = false }) {
	const followCurrentSection = (0, import_react.useRef)(null);
	const sectionIds = sections.map((section) => section.id).join(" ");
	(0, import_react.useEffect)(() => {
		let frame = 0;
		const follow = () => {
			let id;
			try {
				id = decodeURIComponent(window.location.hash.slice(1));
			} catch {
				return;
			}
			if (!sectionIds.split(" ").includes(id)) return;
			const target = document.getElementById(id);
			if (!target) return;
			const disclosure = target.closest("details");
			if (disclosure) disclosure.open = true;
			cancelAnimationFrame(frame);
			frame = requestAnimationFrame(() => {
				target.focus({ preventScroll: true });
				target.scrollIntoView({
					block: "start",
					behavior: "instant"
				});
			});
		};
		followCurrentSection.current = follow;
		follow();
		window.addEventListener("hashchange", follow);
		return () => {
			followCurrentSection.current = null;
			cancelAnimationFrame(frame);
			window.removeEventListener("hashchange", follow);
		};
	}, [sectionIds]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "page-section-navigation",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
			"aria-label": `${title}: on this page`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", { children: sections.map((section) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: `#${section.id}`,
				onClick: (event) => {
					if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
					if (window.location.hash === `#${section.id}`) followCurrentSection.current?.();
				},
				children: section.label
			}) }, section.id)) })
		}), !hideTitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandText, { children: title }) })]
	});
}
//#endregion
export { PageSectionNavigation };
