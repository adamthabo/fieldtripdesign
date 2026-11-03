import { b as require_react, l as usePathname, w as __toESM } from "../index.js";
//#region app/complementary-color-palette.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
/** Two complementary pairs keep adjacent labels and two-column grids distinct. */
var COLOR_CYCLE_MS = 48e3;
var COLOR_TONES = [
	"a",
	"b",
	"c",
	"d"
];
var HUE_OFFSETS = [
	0,
	180,
	270,
	90
];
/** Five complementary pairs progress around the field without repeated grid columns. */
var LIST_COLOR_TONES = [
	"a",
	"b",
	"c",
	"d",
	"e",
	"f",
	"g",
	"h",
	"i",
	"j"
];
var LIST_HUE_OFFSETS = [
	0,
	180,
	288,
	108,
	216,
	36,
	144,
	324,
	72,
	252
];
var TEXT_CONTRAST = 4.8;
var DISPLAY_CONTRAST = 3.25;
var WORDMARK_CONTRAST = 5.8;
function hueAt(elapsed, field = 0) {
	const offset = HUE_OFFSETS[(field % HUE_OFFSETS.length + HUE_OFFSETS.length) % HUE_OFFSETS.length];
	return ((elapsed / COLOR_CYCLE_MS * 360 + offset) % 360 + 360) % 360;
}
function listHueAt(elapsed, field = 0) {
	const offset = LIST_HUE_OFFSETS[(field % LIST_HUE_OFFSETS.length + LIST_HUE_OFFSETS.length) % LIST_HUE_OFFSETS.length];
	return ((elapsed / COLOR_CYCLE_MS * 360 + offset) % 360 + 360) % 360;
}
/** Keep each collection on a pair boundary without repeating the prior last hue. */
function listCollectionOffsets(lengths) {
	let nextField = 0;
	return lengths.map((length) => {
		const offset = nextField;
		nextField += Math.ceil(length / 2) * 2;
		return offset;
	});
}
/** Saturation is always 100%; only luminance changes for legibility. */
function saturatedRgb(hue, lightness) {
	const h = (hue % 360 + 360) % 360 / 30;
	const a = Math.min(lightness, 1 - lightness);
	const channel = (n) => {
		const k = (n + h) % 12;
		return lightness - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
	};
	return [
		channel(0),
		channel(8),
		channel(4)
	];
}
function luminance(rgb) {
	const linear = rgb.map((value) => value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4);
	return .2126 * linear[0] + .7152 * linear[1] + .0722 * linear[2];
}
function contrastOn(rgb, surface) {
	const foreground = luminance(rgb);
	const background = surface === "light" ? 1 : luminance([
		8 / 255,
		8 / 255,
		8 / 255
	]);
	return (Math.max(foreground, background) + .05) / (Math.min(foreground, background) + .05);
}
function readableColor(hue, surface, display = false, wordmark = false) {
	const target = wordmark ? WORDMARK_CONTRAST : display && surface === "light" ? DISPLAY_CONTRAST : TEXT_CONTRAST;
	let low = surface === "dark" ? wordmark ? .6 : .58 : 0;
	let high = surface === "dark" ? 1 : .5;
	if (surface === "dark" && contrastOn(saturatedRgb(hue, low), surface) >= target) return saturatedRgb(hue, low);
	for (let step = 0; step < 15; step++) {
		const middle = (low + high) / 2;
		if (contrastOn(saturatedRgb(hue, middle), surface) >= target === (surface === "light")) low = middle;
		else high = middle;
	}
	return saturatedRgb(hue, surface === "dark" ? high : low);
}
function gradientSamples(hue, surface, display = false, wordmark = false) {
	return Array.from({ length: 17 }, (_, index) => readableColor(hue - 15 + 30 * index / 16, surface, display, wordmark));
}
var cssColor = (rgb) => `rgb(${rgb.map((value) => (value * 255).toFixed(2)).join(" ")})`;
function colorVariables(elapsed) {
	const variables = {};
	for (const surface of ["light", "dark"]) {
		for (const [field, tone] of COLOR_TONES.entries()) {
			const hue = hueAt(elapsed, field);
			variables[`--ft-${surface}-${tone}-color`] = cssColor(readableColor(hue, surface));
			for (const display of [false, true]) {
				const stops = gradientSamples(hue, surface, display).map((rgb, index) => `${cssColor(rgb)} ${(100 * index / 16).toFixed(2)}%`);
				variables[`--ft-${surface}-${tone}-${display ? "display" : "text"}`] = `linear-gradient(100deg, ${stops.join(", ")})`;
			}
		}
		for (const [field, tone] of LIST_COLOR_TONES.entries()) {
			const hue = listHueAt(elapsed, field);
			variables[`--ft-list-${surface}-${tone}-color`] = cssColor(readableColor(hue, surface));
			const stops = gradientSamples(hue, surface).map((rgb, index) => `${cssColor(rgb)} ${(100 * index / 16).toFixed(2)}%`);
			variables[`--ft-list-${surface}-${tone}-gradient`] = `linear-gradient(100deg, ${stops.join(", ")})`;
		}
	}
	for (const [field, tone] of COLOR_TONES.entries()) {
		const hue = hueAt(elapsed, field);
		variables[`--ft-wordmark-${tone}-color`] = cssColor(readableColor(hue, "dark", true, true));
		const stops = gradientSamples(hue, "dark", true, true).map((rgb, index) => `${cssColor(rgb)} ${(100 * index / 16).toFixed(2)}%`);
		variables[`--ft-wordmark-${tone}-gradient`] = `linear-gradient(100deg, ${stops.join(", ")})`;
	}
	variables["--fieldtrip-title-color"] = variables["--ft-dark-a-color"];
	return variables;
}
//#endregion
//#region app/complementary-colors.tsx
var fields = [
	".section-shell .brand-lowercase em",
	".section-shell main :is(h1,h2,h3,h4,h5,h6):not(.sr-only):not(.home-specialism):not(.home-experience-heading):not(.location-title-selective):not(.announcement-title-selective):not(#about-founder-title)",
	".section-shell main :is(.home-accent-word,.home-experience-accent,.home-service-lead,.founder-surname,.about-founder-intro,.announcement-accent,.capability-service-label,.project-title-static,.project-detail-title,.compact-project-caption-title,.contact-location-title,.projects-link)",
	".section-shell main .location-title-selective > span",
	".section-shell main .contact-email > strong",
	".section-shell main .client-index-list [data-content-key^=\"project.\"][data-content-key$=\".title\"]",
	".project-lightbox .compact-project-caption-title"
].join(",");
var listCollections = [
	".client-index-list",
	".news-project-grid",
	".news-earlier-grid",
	".news-page .media-year > div",
	".news-page .news-award-list",
	".news-page .news-event-list"
].join(",");
/** Paint selected text without changing layout, logo artwork or media elements. */
function ComplementaryColors() {
	const pathname = usePathname();
	(0, import_react.useEffect)(() => {
		const root = document.documentElement;
		const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
		let frame = 0, lastPaint = -Infinity, previous = performance.now(), elapsed = 0;
		const paint = (time) => {
			for (const [name, value] of Object.entries(colorVariables(time))) root.style.setProperty(name, value);
		};
		const tick = (now) => {
			elapsed += Math.max(0, now - previous);
			previous = now;
			if (now - lastPaint >= 50) {
				paint(elapsed);
				lastPaint = now;
			}
			frame = requestAnimationFrame(tick);
		};
		const syncMotion = () => {
			cancelAnimationFrame(frame);
			previous = performance.now();
			if (reduced.matches) {
				paint(0);
				return;
			}
			if (!document.hidden) frame = requestAnimationFrame(tick);
		};
		paint(0);
		syncMotion();
		reduced.addEventListener("change", syncMotion);
		document.addEventListener("visibilitychange", syncMotion);
		return () => {
			cancelAnimationFrame(frame);
			reduced.removeEventListener("change", syncMotion);
			document.removeEventListener("visibilitychange", syncMotion);
		};
	}, []);
	(0, import_react.useEffect)(() => {
		let pending = 0, disposed = false;
		const assigned = /* @__PURE__ */ new Set();
		const register = () => {
			pending = 0;
			const candidates = Array.from(document.querySelectorAll(fields)).filter((element) => !element.closest("[hidden], [aria-hidden=\"true\"], .home-experience-copy, .home-service-introduction h2, .project-title-context") && !element.querySelector("img, picture, svg, video, canvas") && element.textContent?.trim() && element.getClientRects().length > 0);
			const candidateSet = new Set(candidates);
			const active = candidates.filter((element) => {
				let parent = element.parentElement;
				while (parent) {
					if (candidateSet.has(parent)) return false;
					parent = parent.parentElement;
				}
				return true;
			});
			const activeSet = new Set(active);
			for (const element of assigned) {
				if (activeSet.has(element)) continue;
				delete element.dataset.colorField;
				delete element.dataset.colorTone;
				delete element.dataset.colorSize;
				delete element.dataset.colorCollection;
				element.style.removeProperty("--ft-accent-width");
				element.style.removeProperty("--ft-ink");
				element.style.removeProperty("--ft-gradient");
				assigned.delete(element);
			}
			const collections = /* @__PURE__ */ new Map();
			for (const element of active) {
				const collection = element.closest(listCollections);
				if (!collection) continue;
				const sequence = collections.get(collection) ?? {
					offset: 0,
					count: 0
				};
				sequence.count++;
				collections.set(collection, sequence);
			}
			const offsets = listCollectionOffsets([...collections.values()].map((sequence) => sequence.count));
			[...collections.values()].forEach((sequence, index) => {
				sequence.offset = offsets[index];
				sequence.count = 0;
			});
			active.forEach((element, index) => {
				const style = getComputedStyle(element);
				const size = parseFloat(style.fontSize);
				element.dataset.colorField = String(index);
				element.dataset.colorTone = COLOR_TONES[index % COLOR_TONES.length];
				element.dataset.colorSize = size >= 24 || size >= 18.67 && parseInt(style.fontWeight) >= 700 ? "display" : "text";
				const collection = element.closest(listCollections);
				if (collection) {
					const sequence = collections.get(collection);
					const tone = LIST_COLOR_TONES[(sequence.offset + sequence.count++) % LIST_COLOR_TONES.length];
					element.dataset.colorCollection = "list";
					element.dataset.colorTone = tone;
					element.style.setProperty("--ft-ink", `var(--ft-list-page-${tone}-color, var(--ft-page-a-color))`);
					element.style.setProperty("--ft-gradient", `var(--ft-list-page-${tone}-gradient, var(--ft-page-a-text))`);
				} else {
					delete element.dataset.colorCollection;
					element.style.removeProperty("--ft-ink");
					element.style.removeProperty("--ft-gradient");
				}
				const range = document.createRange();
				range.selectNodeContents(element);
				const width = Math.min(range.getBoundingClientRect().width, element.getBoundingClientRect().width);
				if (width > 0) element.style.setProperty("--ft-accent-width", `${Math.ceil(width) + 2}px`);
				assigned.add(element);
			});
		};
		const schedule = () => {
			if (!disposed && !pending) pending = requestAnimationFrame(register);
		};
		register();
		const observer = new MutationObserver(schedule);
		observer.observe(document.body, {
			childList: true,
			characterData: true,
			subtree: true,
			attributes: true,
			attributeFilter: [
				"hidden",
				"aria-hidden",
				"data-reel-expanded",
				"open"
			]
		});
		window.addEventListener("resize", schedule, { passive: true });
		document.addEventListener("toggle", schedule, true);
		document.fonts.ready.then(schedule);
		return () => {
			disposed = true;
			cancelAnimationFrame(pending);
			observer.disconnect();
			window.removeEventListener("resize", schedule);
			document.removeEventListener("toggle", schedule, true);
		};
	}, [pathname]);
	return null;
}
//#endregion
export { ComplementaryColors };
