import { b as require_react, n as require_jsx_runtime, w as __toESM } from "../index.js";
import { t as ReelFullscreenButton } from "./reel-fullscreen-button-BatwXWGX.js";
import { t as photographerCredit } from "./image-credit-policy-DQO9Mk8-.js";
//#region app/home/on-display-carousel.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function OnDisplayCarousel({ slides }) {
	const root = (0, import_react.useRef)(null);
	const stage = (0, import_react.useRef)(null);
	const [index, setIndex] = (0, import_react.useState)(0);
	const [previous, setPrevious] = (0, import_react.useState)(null);
	const [paused, setPaused] = (0, import_react.useState)(false);
	const [focused, setFocused] = (0, import_react.useState)(false);
	const focusedLink = (0, import_react.useRef)(false);
	const [inView, setInView] = (0, import_react.useState)(false);
	const [visible, setVisible] = (0, import_react.useState)(true);
	const [reduced, setReduced] = (0, import_react.useState)(true);
	const [ready, setReady] = (0, import_react.useState)([]);
	const [failed, setFailed] = (0, import_react.useState)([]);
	const touchStart = (0, import_react.useRef)(null);
	const slide = slides[index];
	const credit = photographerCredit(slide.credit);
	const playing = !paused && !focused && !reduced && inView && visible;
	(0, import_react.useEffect)(() => {
		setReady(Array.from(root.current?.querySelectorAll(".on-display-photo") ?? []).flatMap((photo, position) => photo.complete && photo.naturalWidth > 0 ? [position] : []));
		const query = matchMedia("(prefers-reduced-motion: reduce)");
		const data = matchMedia("(prefers-reduced-data: reduce)");
		const connection = navigator.connection;
		const preferences = () => setReduced(query.matches || data.matches || !!connection?.saveData);
		const visibility = () => setVisible(!document.hidden);
		preferences();
		visibility();
		query.addEventListener("change", preferences);
		data.addEventListener("change", preferences);
		connection?.addEventListener("change", preferences);
		document.addEventListener("visibilitychange", visibility);
		const observer = new IntersectionObserver((entries) => {
			const entry = entries.at(-1);
			setInView(!!entry?.isIntersecting && entry.intersectionRatio > 0);
		}, { threshold: [0, .001] });
		if (stage.current) observer.observe(stage.current);
		return () => {
			observer.disconnect();
			query.removeEventListener("change", preferences);
			data.removeEventListener("change", preferences);
			connection?.removeEventListener("change", preferences);
			document.removeEventListener("visibilitychange", visibility);
		};
	}, []);
	const adjacent = (direction) => {
		for (let step = 1; step < slides.length; step++) {
			const candidate = (index + step * direction + slides.length) % slides.length;
			if (!failed.includes(candidate)) return candidate;
		}
		return index;
	};
	const next = adjacent(1);
	(0, import_react.useEffect)(() => {
		if (!playing || !ready.includes(next) || next === index) return;
		const timer = window.setTimeout(() => {
			if (focusedLink.current || document.hidden) return;
			setPrevious(index);
			setIndex(next);
		}, 4500);
		return () => window.clearTimeout(timer);
	}, [
		playing,
		next,
		index,
		ready
	]);
	const navigate = (direction) => {
		if (focusedLink.current) return;
		setPrevious(index);
		setIndex(adjacent(direction));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: root,
		className: "on-display-carousel",
		"data-reel-fullscreen": true,
		"data-playing": playing,
		"data-slide": slide.slug,
		role: "region",
		"aria-roledescription": "carousel",
		"aria-label": "Currently On Display projects",
		onFocusCapture: (event) => {
			const held = event.target instanceof HTMLElement && !!event.target.closest("a");
			focusedLink.current = held;
			setFocused(held);
		},
		onBlurCapture: (event) => {
			const target = event.relatedTarget;
			const held = target instanceof HTMLElement && event.currentTarget.contains(target) && !!target.closest("a");
			focusedLink.current = held;
			setFocused(held);
		},
		onKeyDown: (event) => {
			if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
				event.preventDefault();
				navigate(event.key === "ArrowLeft" ? -1 : 1);
			}
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			ref: stage,
			className: "on-display-stage",
			onTouchStart: (event) => {
				touchStart.current = event.touches[0]?.clientX ?? null;
			},
			onTouchEnd: (event) => {
				const start = touchStart.current;
				touchStart.current = null;
				const end = event.changedTouches[0]?.clientX;
				if (start !== null && end !== void 0 && Math.abs(end - start) > 60) navigate(end < start ? 1 : -1);
			},
			children: [slides.map((item, position) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				className: "on-display-photo",
				"data-active": position === index,
				"data-motion": position === index || position === previous,
				"data-direction": position % 2 === 0 ? "in" : "out",
				"data-focus": item.slug === "brooklyn-museum" ? "face" : void 0,
				"data-orientation": item.height > item.width ? "portrait" : "landscape",
				src: item.src,
				width: item.width,
				height: item.height,
				alt: position === index ? item.alt : "",
				"aria-hidden": position !== index,
				loading: "lazy",
				decoding: "async",
				draggable: false,
				onLoad: () => setReady((items) => items.includes(position) ? items : [...items, position]),
				onError: () => setFailed((items) => items.includes(position) ? items : [...items, position])
			}, item.slug)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				className: "on-display-image-link",
				href: `/work/${slide.slug}`,
				"aria-label": `View ${slide.title}`
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "on-display-bar",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "on-display-caption",
				"aria-live": playing ? "off" : "polite",
				"aria-atomic": "true",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "on-display-caption-current",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: `/work/${slide.slug}`,
							children: slide.title
						}) }),
						slide.captionNote && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: slide.captionNote }),
						credit && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							className: "on-display-credit",
							href: credit.href,
							target: "_blank",
							rel: "noopener noreferrer",
							children: credit.label
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "on-display-caption-reserve",
					"aria-hidden": "true",
					inert: true,
					children: slides.map((item) => {
						const reservedCredit = photographerCredit(item.credit);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: item.title }),
							item.captionNote && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: item.captionNote }),
							reservedCredit && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "on-display-credit",
								children: reservedCredit.label
							})
						] }, item.slug);
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "on-display-controls",
				role: "group",
				"aria-label": "Slideshow controls",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "on-display-count",
						children: [
							String(index + 1).padStart(2, "0"),
							" / ",
							String(slides.length).padStart(2, "0")
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => navigate(-1),
						"aria-label": "Previous project",
						children: "Previous"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "on-display-pause",
						"aria-label": paused || reduced ? "Play slideshow" : "Pause slideshow",
						"aria-pressed": paused || reduced,
						onClick: () => {
							const resume = paused || reduced;
							setPaused(!resume);
							if (resume) setReduced(false);
						},
						children: paused || reduced ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
							viewBox: "0 0 20 20",
							width: "16",
							height: "16",
							"aria-hidden": "true",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: "M5 2 17 10 5 18Z",
								fill: "currentColor"
							})
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
							viewBox: "0 0 20 20",
							width: "16",
							height: "16",
							"aria-hidden": "true",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: "M5 3h3v14H5zm7 0h3v14h-3z",
								fill: "currentColor"
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => navigate(1),
						"aria-label": "Next project",
						children: "Next"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReelFullscreenButton, {})
				]
			})]
		})]
	});
}
//#endregion
export { OnDisplayCarousel };
