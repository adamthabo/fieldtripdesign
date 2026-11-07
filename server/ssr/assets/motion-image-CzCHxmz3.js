import { b as require_react, n as require_jsx_runtime, w as __toESM } from "../index.js";
import { t as verified_image_credits_default } from "./verified-image-credits-CtFeqEE_.js";
import { t as photographerCredit } from "./image-credit-policy-C0re5pSB.js";
//#region app/image-credit.tsx
var import_jsx_runtime = require_jsx_runtime();
function imageCredit(src) {
	return photographerCredit(src ? verified_image_credits_default[src] : void 0);
}
/** Public image credits contain only verified photographer names. */
function ImageCredit({ src, linked = true }) {
	const credit = imageCredit(src);
	if (!credit) return null;
	return linked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
		className: "project-image-credit",
		href: credit.href,
		target: "_blank",
		rel: "noopener noreferrer",
		children: credit.label
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "project-image-credit",
		children: credit.label
	});
}
//#endregion
//#region app/motion-image.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
/** A gentle alternating camera move while visible. Never alters source pixels. */
function MotionImage({ src, alt, className, loading = "lazy", direction = "left", priority = false, width, height }) {
	const frame = (0, import_react.useRef)(null);
	const [visible, setVisible] = (0, import_react.useState)(false);
	const [allowed, setAllowed] = (0, import_react.useState)(false);
	const [loaded, setLoaded] = (0, import_react.useState)(false);
	const [gentle, setGentle] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		const motion = matchMedia("(prefers-reduced-motion: reduce)");
		const data = matchMedia("(prefers-reduced-data: reduce)");
		const connection = navigator.connection;
		const preference = () => setAllowed(!motion.matches && !data.matches && !connection?.saveData && !document.hidden);
		const observer = new IntersectionObserver((entries) => setVisible(entries[0].isIntersecting), { threshold: .15 });
		if (frame.current) observer.observe(frame.current);
		const image = frame.current?.querySelector("img");
		if (image?.complete && image.naturalWidth > 0) {
			setGentle(image.naturalWidth < 1e3);
			setLoaded(true);
		}
		preference();
		motion.addEventListener("change", preference);
		data.addEventListener("change", preference);
		connection?.addEventListener("change", preference);
		document.addEventListener("visibilitychange", preference);
		return () => {
			observer.disconnect();
			motion.removeEventListener("change", preference);
			data.removeEventListener("change", preference);
			connection?.removeEventListener("change", preference);
			document.removeEventListener("visibilitychange", preference);
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		ref: frame,
		className: `major-image-frame${visible && allowed && loaded ? " is-moving" : ""}`,
		"data-motion-duration": "8",
		style: {
			...width && height ? { aspectRatio: `${width} / ${height}` } : {},
			"--image-scale": gentle ? 1.05 : 1.1,
			"--image-x": `${(direction === "left" ? 1 : -1) * (gentle ? 1.2 : 3)}%`
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			className,
			width,
			height,
			src,
			alt,
			loading,
			fetchPriority: priority ? "high" : "auto",
			onLoad: (e) => {
				setGentle(e.currentTarget.naturalWidth < 1e3);
				setLoaded(true);
			}
		})
	});
}
//#endregion
export { ImageCredit as n, imageCredit as r, MotionImage as t };
