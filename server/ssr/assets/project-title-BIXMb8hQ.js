import { n as require_jsx_runtime } from "../index.js";
import { t as BrandText } from "./field-trip-name-BKqnzu5g.js";
//#region app/project-title.tsx
var import_jsx_runtime = require_jsx_runtime();
/** Explicit catalogue split; do not split authentic names such as New York at Its Core. */
function ProjectTitle({ title }) {
	if (title === "TUMI at Tribeca Film Festival") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandText, { children: "TUMI" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "project-title-context",
		children: " at Tribeca Film Festival"
	})] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandText, { children: title });
}
//#endregion
export { ProjectTitle as t };
