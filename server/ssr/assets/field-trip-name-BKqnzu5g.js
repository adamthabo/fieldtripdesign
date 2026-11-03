import { b as require_react, n as require_jsx_runtime, w as __toESM } from "../index.js";
//#region app/field-trip-name.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
/** Inline emphasis follows the surrounding text; the header owns the wordmark. */
function FieldTripName() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "field-trip-name",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "field" }),
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "trip" })
		]
	});
}
/** Emphasize the name while retaining the surrounding typeface and copy. */
function BrandText({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: children.split(/(\bfield trip\b)/gi).map((part, index) => /^field trip$/i.test(part) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldTripName, {}, index) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Fragment, { children: part }, index)) });
}
//#endregion
export { BrandText as t };
