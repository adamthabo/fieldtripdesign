import { b as require_react, l as usePathname, n as require_jsx_runtime, w as __toESM } from "../index.js";
//#region app/project-photo-movement.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
/** Eight-second out / eight-second return camera move, without changing layout boxes. */
function projectPhotoMovement(elapsedMs, src, lowResolution = false) {
	const progress = (1 - Math.cos(Math.max(0, elapsedMs) / 8e3 * Math.PI)) / 2;
	const direction = [...src].reduce((sum, char) => sum + char.charCodeAt(0), 0) % 2 ? 1 : -1;
	const brooklyn = src.includes("/brooklyn-museum/");
	if (src === "/project-galleries/brooklyn-museum/02.webp") {
		const scale = 1.02 - progress * .02;
		return {
			scale,
			x: 0,
			y: 0,
			transform: `translate3d(0%, 0%, 0) scale(${scale.toFixed(5)})`
		};
	}
	if (src === "/project-galleries/brooklyn-museum/01.webp") {
		const scale = 1.08 + progress * .47, x = -2 - progress * 21, y = -1 - progress * 13;
		return {
			scale,
			x,
			y,
			transform: `translate3d(${x.toFixed(4)}%, ${y.toFixed(4)}%, 0) scale(${scale.toFixed(5)})`
		};
	}
	const scale = 1.025 + progress * (lowResolution ? .045 : .075);
	const x = brooklyn ? .5 - progress * (lowResolution ? 1.6 : 2.5) : direction * (-.6 + progress * (lowResolution ? 1.6 : 2.4));
	const y = -progress * (lowResolution ? .2 : .45);
	return {
		scale,
		x,
		y,
		transform: `translate3d(${x.toFixed(4)}%, ${y.toFixed(4)}%, 0) scale(${scale.toFixed(5)})`
	};
}
/** Keep a moving, unframed photograph inside its original painted rectangle. */
function photoMotionInsets({ scale, x, y }) {
	const edge = (scale - 1) * 50 / scale;
	return [
		edge - y / scale,
		edge + x / scale,
		edge + y / scale,
		edge - x / scale
	];
}
//#endregion
//#region app/project-photo-motion.tsx
var import_jsx_runtime = require_jsx_runtime();
/** Progressive enhancement for static project photographs only. Existing reels and films own their motion. */
function ProjectPhotoMotion({ enabled = true, showControl = true, pauseAtFooter = true }) {
	const pathname = usePathname();
	const [paused, setPaused] = (0, import_react.useState)(false);
	const [available, setAvailable] = (0, import_react.useState)(false);
	const pausedRef = (0, import_react.useRef)(false);
	const refreshMotion = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		pausedRef.current = paused;
		refreshMotion.current?.();
	}, [paused]);
	(0, import_react.useEffect)(() => {
		if (!enabled) {
			setAvailable(false);
			return;
		}
		const root = document.querySelector("main");
		if (!root) return;
		const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
		const reducedData = matchMedia("(prefers-reduced-data: reduce)");
		const connection = navigator.connection;
		const permitted = () => !reducedMotion.matches && !reducedData.matches && !connection?.saveData;
		const records = /* @__PURE__ */ new Map();
		const footer = document.querySelector(".section-footer");
		let footerVisible = false;
		let request = 0, previous = 0;
		const shouldRun = () => permitted() && (!pauseAtFooter || !footerVisible) && !pausedRef.current && !document.hidden && [...records.values()].some((record) => record.visible);
		const schedule = () => {
			if (shouldRun()) {
				if (!request) request = requestAnimationFrame(tick);
			} else {
				if (request) cancelAnimationFrame(request);
				request = 0;
				previous = 0;
			}
		};
		refreshMotion.current = schedule;
		const selector = "img.archive-cover, .archive-preview img, .news-project-image .major-image-frame > img, .project-sequence-item .major-image-frame > img, .project-pagination-card img, .project-connection-card img, img[data-photo-motion]";
		const excluded = /drawing|rendering|illustration|logo|portrait|floor.plan|\.gif(?:$|\?)/i;
		const updateAvailable = () => {
			setAvailable(permitted() && !footerVisible && [...records.values()].some((record) => record.visible));
			schedule();
		};
		const observer = new IntersectionObserver((entries) => {
			for (const entry of entries) {
				if (entry.target === footer) {
					footerVisible = entry.isIntersecting;
					continue;
				}
				const record = records.get(entry.target);
				if (record) record.visible = entry.isIntersecting;
			}
			updateAvailable();
		}, { threshold: .1 });
		if (footer) observer.observe(footer);
		const scan = () => {
			for (const [image, record] of records) if (!root.contains(image)) {
				observer.unobserve(image);
				if (record.style === null) image.removeAttribute("style");
				else image.setAttribute("style", record.style);
				image.removeAttribute("data-static-photo-motion");
				records.delete(image);
			}
			root.querySelectorAll(selector).forEach((image) => {
				const galleryPhoto = !!image.closest(".project-sequence-item");
				const excludedImage = image.getAttribute("data-photo-motion") !== null ? false : galleryPhoto ? /architectural (?:drawing|rendering)|floor.?plan|illustration|\brendering\b|\.gif(?:$|\?)/i.test(`${image.alt} ${image.getAttribute("src")}`) : excluded.test(`${image.alt} ${image.getAttribute("src")}`);
				if (records.has(image) || excludedImage || image.getAttribute("src") === "/project-galleries/hunt-for-paradise/07.webp" || image.closest(".landing-reel,.home-photo-reel,.project-intro-group")) return;
				records.set(image, {
					visible: false,
					elapsed: 0,
					style: image.getAttribute("style"),
					framed: !!image.closest(".major-image-frame,.archive-cover-wrap,.contact-location-photo,.about-founder-portrait,.brooklyn-composition-frame,.brooklyn-photo-panel,.atlantic-photo-frame,.academic-image-frame"),
					baseTransform: image.style.getPropertyValue?.("transform") ?? ""
				});
				image.setAttribute("data-static-photo-motion", "");
				image.style.setProperty("animation", "none", "important");
				image.style.setProperty("transition", "none", "important");
				observer.observe(image);
			});
			updateAvailable();
		};
		const preference = () => {
			updateAvailable();
			if (!permitted()) records.forEach((record, image) => {
				record.elapsed = 0;
				image.style.setProperty("transform", record.baseTransform || "none", "important");
				image.style.setProperty("clip-path", "none", "important");
			});
		};
		scan();
		const mutations = new MutationObserver(scan);
		mutations.observe(root, {
			childList: true,
			subtree: true
		});
		reducedMotion.addEventListener("change", preference);
		reducedData.addEventListener("change", preference);
		connection?.addEventListener("change", preference);
		document.addEventListener("visibilitychange", schedule);
		function tick(time) {
			request = 0;
			if (!shouldRun()) {
				previous = 0;
				return;
			}
			const delta = previous ? Math.min(time - previous, 80) : 0;
			previous = time;
			if (!Array.from(document.querySelectorAll("[role=\"dialog\"]:not([hidden])")).some((dialog) => dialog.getClientRects().length > 0)) records.forEach((record, image) => {
				if (!record.visible || !image.complete || !image.naturalWidth) return;
				if (image.closest("a,button")?.matches(":focus-visible")) return;
				record.elapsed += delta;
				const move = projectPhotoMovement(record.elapsed, image.getAttribute("src") ?? "", image.naturalWidth < 700);
				image.style.setProperty("transform", `${move.transform}${record.baseTransform ? ` ${record.baseTransform}` : ""}`, "important");
				if (record.framed) image.style.setProperty("clip-path", "none", "important");
				else image.style.setProperty("clip-path", `inset(${photoMotionInsets(move).map((value) => `${value.toFixed(5)}%`).join(" ")})`, "important");
			});
			schedule();
		}
		schedule();
		return () => {
			cancelAnimationFrame(request);
			observer.disconnect();
			mutations.disconnect();
			if (refreshMotion.current === schedule) refreshMotion.current = null;
			document.removeEventListener("visibilitychange", schedule);
			reducedMotion.removeEventListener("change", preference);
			reducedData.removeEventListener("change", preference);
			connection?.removeEventListener("change", preference);
			records.forEach((record, image) => {
				if (record.style === null) image.removeAttribute("style");
				else image.setAttribute("style", record.style);
				image.removeAttribute("data-static-photo-motion");
			});
		};
	}, [
		enabled,
		pathname,
		pauseAtFooter
	]);
	return enabled && showControl && available ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		className: "project-photo-motion-toggle",
		"aria-pressed": paused,
		onClick: () => setPaused((value) => !value),
		children: paused ? "Resume photo motion" : "Pause photo motion"
	}) : null;
}
//#endregion
export { ProjectPhotoMotion };
