import { b as require_react, n as require_jsx_runtime, w as __toESM } from "../index.js";
//#region app/color-theme.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
/** A root attribute changes paint only; media components are never remounted. */
function ColorThemeToggle() {
	const [theme, setTheme] = (0, import_react.useState)("dark");
	(0, import_react.useEffect)(() => {
		const sync = () => setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
		sync();
		const changed = (event) => {
			if (event.key !== "fieldtrip-theme") return;
			document.documentElement.dataset.theme = event.newValue === "light" ? "light" : "dark";
			sync();
		};
		window.addEventListener("storage", changed);
		return () => window.removeEventListener("storage", changed);
	}, []);
	const chooseTheme = (next) => {
		document.documentElement.dataset.theme = next;
		setTheme(next);
		try {
			localStorage.setItem("fieldtrip-theme", next);
		} catch {}
		const url = new URL(window.location.href);
		if (url.searchParams.has("theme")) {
			url.searchParams.delete("theme");
			history.replaceState(history.state, "", url);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		className: "color-theme-toggle",
		type: "button",
		role: "switch",
		"aria-label": "White appearance",
		"aria-checked": theme === "light",
		onClick: () => chooseTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark"),
		onKeyDown: (event) => {
			if (event.key !== "ArrowUp" && event.key !== "ArrowDown") return;
			event.preventDefault();
			chooseTheme(event.key === "ArrowUp" ? "light" : "dark");
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "color-theme-rocker",
			"aria-hidden": "true",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "color-theme-thumb" })
		})
	});
}
//#endregion
export { ColorThemeToggle };
