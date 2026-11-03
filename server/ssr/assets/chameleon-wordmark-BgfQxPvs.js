import { b as require_react, l as usePathname, n as require_jsx_runtime, w as __toESM } from "../index.js";
//#region app/digital-wordmark-artwork.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
/** Exact inner SVG from the approved static digital master; no path or transform edits. */
var DIGITAL_WORDMARK_ARTWORK = "<title>Field Trip - white FIELD and gray TRIP on black</title><rect width=\"2399\" height=\"1050\" fill=\"#000000\"/><g transform=\"translate(175.000,875.000) scale(1.000000,-1.000000)\"><g fill=\"#FFFFFF\"><g transform=\"scale(0.98,1) translate(-9,0)\"><path transform=\"translate(0,0)\" d=\"M13 699 178 700 183 695V583L181 579H108L104 575V440L107 437H169L174 433V304L170 299H107L104 296V3L102 0H13L9 5V692Z\"/><path transform=\"translate(218,0)\" d=\"M20 700H92L97 696V4L94 0H12L9 3V696Z\"/><path transform=\"translate(350,0)\" d=\"M15 700H182L187 696V582L184 579H107L104 577L103 475V450L107 437H181L184 432L183 301L181 299L104 297V128L187 127L191 123V6L187 0H12L9 4V695Z\"/><path transform=\"translate(576,0)\" d=\"M17 700H93L99 694L98 135L100 127L179 126L181 3L178 0H12L9 3V696Z\"/><path transform=\"translate(792,0)\" d=\"M18 700H136L159 695L173 687L192 668L210 636L222 601L233 556L241 492L247 410V257L239 155L225 91L203 42L194 29L175 11L146 0H13L9 4V695ZM100 581 98 578V123L100 119H113L122 123L135 140L144 188L146 240L145 473L141 528L135 560L122 578Z\"/></g></g><g class=\"brand-responsive-trip\" color-interpolation=\"sRGB\" fill=\"#888888\" transform=\"translate(1155,0)\"><g transform=\"translate(-22,0)\"><path transform=\"translate(0,0)\" d=\"M22 602V700H193L192 602H155L150 601L146 598L141 592L140 589V586V0H68V586L67 589L66 592L61 598L57 601L52 602Z\"/><path transform=\"translate(255,0)\" d=\"M22 700H156L171 697L184 689L197 675L209 651L216 631L224 595L227 549L226 440L221 409L213 381L205 365L191 346L189 343L188 339V335L189 331L192 328L206 313L213 300L221 274L225 251L226 30L229 0H162L155 59L154 228V232L147 254L146 258L143 261L129 273L125 275L121 276H100L96 275L92 273L89 269L84 259V256V0L22 1ZM100 603 96 602 92 600 88 597 86 593 84 589V586V407L87 394L88 391L91 387L95 385H99H122L128 386L138 391L142 395L150 404L152 409L159 433L162 467L159 550L154 575L151 581L140 595L137 598L134 600H131Z\"/><path transform=\"translate(547,0)\" d=\"M22 0V700H84V0Z\"/><path transform=\"translate(693,0)\" d=\"M22 0V699L152 700L176 692L193 676L205 653L215 621L221 581L223 549L222 424L215 365L200 312L186 283L168 263L148 255L102 252L98 251L95 249L92 246L91 243L90 239V0ZM101 603H97L94 601L91 599L89 595L88 592L85 574L86 380L87 376L89 372L91 369L95 367L98 366L117 365H122L125 367L141 378L144 381L146 384L155 413L158 438L157 541L153 565L152 569L142 589L130 599L127 601L123 602Z\"/></g></g></g>";
var LOGO_TRANSITION_MS = 2e3;
var LOGO_IDLE_GRAY = "#888888";
/** Prefer a photo touching the header; ties favor the photo nearest the logo.
* A 28px score margin prevents neighboring columns from trading places on jitter. */
function closestLogoPhoto(photos, headerBottom, logoCenter, activeSrc) {
	const choices = photos.filter((photo) => photo.bottom > headerBottom + 12 && photo.top < headerBottom + 140);
	const score = (photo) => Math.max(0, photo.top - headerBottom) + Math.min(80, Math.abs((photo.left + photo.right) / 2 - logoCenter) * .08);
	choices.sort((a, b) => score(a) - score(b));
	const best = choices[0];
	if (!best) return null;
	const active = choices.find((photo) => photo.src === activeSrc);
	return active && score(active) <= score(best) + 28 ? active : best;
}
function logoSourcePath(source, origin) {
	try {
		const url = new URL(source, origin);
		return url.origin === new URL(origin).origin ? decodeURIComponent(url.pathname) : null;
	} catch {
		return null;
	}
}
//#endregion
//#region app/logo-color-driver.ts
var LOGO_IDLE_STOPS = [
	[0, "#888888"],
	[5e3, "#888888"],
	[9e3, "#8c60da"],
	[13e3, "#4678dd"],
	[17e3, "#2eb1b7"],
	[21e3, "#7eb76f"],
	[25e3, "#d8b851"],
	[29e3, "#df8d51"],
	[33e3, "#d3678d"],
	[37e3, "#ac69cf"],
	[41e3, "#888888"]
];
var rgb = (hex) => [
	1,
	3,
	5
].map((i) => parseInt(hex.slice(i, i + 2), 16));
/** Solve the approved cubic-bezier(.37,0,.63,1), rather than approximating its time axis. */
function logoEase(x) {
	let lo = 0, hi = 1;
	for (let i = 0; i < 18; i++) {
		const t = (lo + hi) / 2, u = 1 - t;
		if (3 * u * u * t * .37 + 3 * u * t * t * .63 + t * t * t < x) lo = t;
		else hi = t;
	}
	const t = (lo + hi) / 2;
	return 3 * (1 - t) * t * t + t * t * t;
}
var mix = (a, b, p) => a.map((v, i) => v + (b[i] - v) * p);
/** Paint the four actual glyph paths. Do not depend on SVG inherited-fill animation or browser finish events. */
function createLogoColorDriver(svg, trip) {
	const colorScope = typeof svg.closest === "function" ? svg.closest(".section-shell") ?? svg.closest(".section-header") : null;
	const paths = [...trip.querySelectorAll("path")];
	let current = rgb(LOGO_IDLE_GRAY), frame = null, started = performance.now();
	let mode = "idle", from = current, to = current;
	let effect = null, pausedAt = null, disposed = false;
	const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
	const allowed = () => !document.hidden && !reduced.matches;
	const paint = (color) => {
		current = color;
		const fill = `rgb(${color.map((v) => Math.round(v)).join(", ")})`;
		colorScope?.style.setProperty("--trip-live-color", fill);
		trip.style.fill = fill;
		for (const path of paths) path.style.fill = fill;
	};
	const queue = () => {
		if (!disposed && pausedAt === null && allowed() && frame === null && mode !== "hold") frame = requestAnimationFrame(tick);
	};
	function tick(now) {
		frame = null;
		if (disposed || pausedAt !== null || !allowed()) return;
		const elapsed = Math.max(0, now - started);
		if (mode === "idle") {
			const phase = elapsed % 41e3;
			const end = LOGO_IDLE_STOPS.findIndex(([at]) => at > phase);
			const [startTime, a] = LOGO_IDLE_STOPS[end - 1], [endTime, b] = LOGO_IDLE_STOPS[end];
			paint(mix(rgb(a), rgb(b), logoEase((phase - startTime) / (endTime - startTime))));
		} else if (mode === "transition") {
			const fraction = Math.min(1, elapsed / LOGO_TRANSITION_MS);
			paint(mix(from, to, logoEase(fraction)));
			if (fraction === 1) {
				paint(to);
				mode = "hold";
				const finished = effect;
				effect = null;
				finished?.onfinish?.();
			}
		}
		queue();
	}
	const cancelFrame = () => {
		if (frame !== null) cancelAnimationFrame(frame);
		frame = null;
	};
	const pause = () => {
		pausedAt ??= performance.now();
		cancelFrame();
	};
	const play = () => {
		if (pausedAt !== null) {
			started += performance.now() - pausedAt;
			pausedAt = null;
		}
		queue();
	};
	const idle = () => {
		effect = null;
		mode = "idle";
		started = performance.now();
		pausedAt = allowed() ? null : started;
		paint(rgb(LOGO_IDLE_GRAY));
		queue();
	};
	svg.dataset.colorDriver = "paths";
	idle();
	return {
		idle,
		pause,
		play,
		animate(color) {
			from = current;
			to = rgb(color);
			mode = "transition";
			started = performance.now();
			pausedAt = null;
			const next = {
				onfinish: null,
				oncancel: null,
				pause,
				play,
				cancel() {
					if (effect !== next) return;
					effect = null;
					mode = "hold";
					cancelFrame();
					next.oncancel?.();
				}
			};
			effect = next;
			queue();
			return next;
		},
		dispose() {
			colorScope?.style.removeProperty("--trip-live-color");
			disposed = true;
			effect = null;
			cancelFrame();
			trip.style.removeProperty("fill");
			for (const path of paths) path.style.removeProperty("fill");
			delete svg.dataset.colorDriver;
		}
	};
}
//#endregion
//#region app/image-responsive-logo.ts
var MEDIA_FRAME = ".opening-photo-stage, .home-photo-reel .landing-reel-stage, .home-image-stage, .custom-reel-stage, .brooklyn-case-stage, .dedicated-film-stage, .wheat-thins-stage, .project-intro, .portfolio-carousel-home-image, .project-hero-image-wrap, .major-image-frame";
/** Observe existing page images; never fetch/decode photographs or sample canvas at runtime. */
function installImageResponsiveLogo(svg, accents) {
	const header = svg.closest(".section-header");
	const trip = svg.querySelector(".brand-responsive-trip");
	if (!header || !trip || typeof IntersectionObserver === "undefined" || typeof MutationObserver === "undefined") return () => {};
	const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
	const observed = /* @__PURE__ */ new Set();
	const visible = /* @__PURE__ */ new Set();
	const sampled = /* @__PURE__ */ new Set();
	let frame = null;
	let deadlineTimer = null;
	let scrollTimer = null;
	let scrolling = false;
	let resample = true;
	let settled = false;
	let revealTimer = null;
	let activeSrc = null;
	let pendingSrc = null;
	let pendingSince = 0;
	let gapSince = null;
	let animation = null;
	const colorDriver = createLogoColorDriver(svg, trip);
	let stopped = false;
	const cancelDeadline = () => {
		if (deadlineTimer !== null) clearTimeout(deadlineTimer);
		deadlineTimer = null;
	};
	const cancelAnimation = () => {
		const previous = animation;
		animation = null;
		previous?.cancel();
	};
	const reset = () => {
		cancelAnimation();
		cancelDeadline();
		activeSrc = null;
		pendingSrc = null;
		gapSince = null;
		colorDriver.idle();
		delete svg.dataset.reactive;
		delete svg.dataset.nearImage;
		svg.dataset.colorMode = "idle";
	};
	const animateTo = (color, complete) => {
		svg.dataset.reactive = "true";
		cancelAnimation();
		const effect = colorDriver.animate(color);
		animation = effect;
		const commitColor = () => {
			if (stopped || animation !== effect) return;
			animation = null;
			effect.cancel();
			complete?.();
		};
		effect.onfinish = commitColor;
		effect.oncancel = commitColor;
	};
	const settle = (photo) => {
		activeSrc = photo.src;
		pendingSrc = null;
		gapSince = null;
		cancelDeadline();
		svg.dataset.nearImage = photo.src;
		svg.dataset.colorMode = "matching";
		animateTo(photo.color, () => {
			svg.dataset.colorMode = "matched";
		});
	};
	const idle = () => {
		activeSrc = null;
		pendingSrc = null;
		gapSince = null;
		cancelDeadline();
		svg.dataset.colorMode = "returning";
		animateTo(LOGO_IDLE_GRAY, () => {
			colorDriver.idle();
			delete svg.dataset.reactive;
			delete svg.dataset.nearImage;
			svg.dataset.colorMode = "idle";
		});
	};
	const schedule = () => {
		if (stopped || document.hidden || frame !== null) return;
		frame = requestAnimationFrame(evaluate);
	};
	const wakeAt = (delay) => {
		cancelDeadline();
		deadlineTimer = setTimeout(() => {
			deadlineTimer = null;
			schedule();
		}, Math.max(1, delay));
	};
	const sampleHeaderBand = (boundary, center) => {
		sampled.clear();
		if (typeof document.elementsFromPoint !== "function") return;
		const surfaces = /* @__PURE__ */ new Set();
		const xs = new Set([
			Math.max(1, Math.min(window.innerWidth - 1, center)),
			window.innerWidth * .5,
			window.innerWidth * .85
		]);
		const ys = new Set([
			16,
			70,
			139
		].map((offset) => Math.min(window.innerHeight - 1, boundary + offset)));
		for (const x of xs) for (const y of ys) for (const element of document.elementsFromPoint(x, y)) {
			if (!element.closest("main")) continue;
			if (element instanceof HTMLImageElement) {
				sampled.add(element);
				continue;
			}
			const surface = element.closest(MEDIA_FRAME + ", figure, button, a");
			if (!surface || surfaces.has(surface)) continue;
			surfaces.add(surface);
			const images = surface.querySelectorAll("img");
			if (images.length <= 8) for (const image of images) sampled.add(image);
		}
	};
	function evaluate() {
		frame = null;
		if (stopped || document.hidden) return;
		if (reduced.matches) {
			reset();
			return;
		}
		colorDriver.play();
		const boundary = header.getBoundingClientRect().bottom;
		const logoRect = svg.getBoundingClientRect();
		const center = (logoRect.left + logoRect.right) / 2;
		if (resample) {
			resample = false;
			sampleHeaderBand(boundary, center);
		}
		const immediate = scrolling || settled;
		settled = false;
		const photos = [];
		const frameRects = /* @__PURE__ */ new Map();
		for (const image of new Set([...visible, ...sampled])) {
			if (!image.isConnected || !image.closest("main") || !image.complete || !image.naturalWidth || image.closest("[hidden], details:not([open])") || image.matches(".home-reel-image[aria-hidden=\"true\"], .custom-reel-image[aria-hidden=\"true\"], .landing-reel-photo[aria-hidden=\"true\"]")) continue;
			const src = logoSourcePath(image.currentSrc || image.src, window.location.origin);
			if (!src || !accents[src]) continue;
			const rect = image.getBoundingClientRect();
			const stage = image.closest(MEDIA_FRAME);
			let clipped = rect;
			if (stage) {
				let frameRect = frameRects.get(stage);
				if (!frameRect) {
					frameRect = stage.getBoundingClientRect();
					frameRects.set(stage, frameRect);
				}
				clipped = {
					top: Math.max(rect.top, frameRect.top),
					bottom: Math.min(rect.bottom, frameRect.bottom),
					left: Math.max(rect.left, frameRect.left),
					right: Math.min(rect.right, frameRect.right)
				};
			}
			if (clipped.bottom <= clipped.top || clipped.right <= clipped.left) continue;
			if (rect.width < 120 || rect.height < 64 || clipped.right <= 0 || clipped.left >= window.innerWidth) continue;
			const style = getComputedStyle(image);
			if (!(image.hasAttribute("data-logo-poster") && !!stage?.querySelector("video, iframe")) && style.visibility === "hidden" || style.display === "none" || Number(style.opacity || 1) < .15) continue;
			photos.push({
				src,
				color: accents[src],
				top: clipped.top,
				bottom: clipped.bottom,
				left: clipped.left,
				right: clipped.right
			});
		}
		const target = closestLogoPhoto(photos, boundary, center, activeSrc);
		const now = performance.now();
		if (!target) {
			pendingSrc = null;
			if (activeSrc === null) {
				cancelDeadline();
				return;
			}
			gapSince ??= now;
			if (now - gapSince >= 500) idle();
			else wakeAt(500 - (now - gapSince));
			return;
		}
		gapSince = null;
		if (target.src === activeSrc) {
			pendingSrc = null;
			cancelDeadline();
			return;
		}
		if (target.src !== pendingSrc) {
			pendingSrc = target.src;
			pendingSince = now;
		}
		if (immediate || now - pendingSince >= 180) settle(target);
		else wakeAt(180 - (now - pendingSince));
	}
	const intersection = new IntersectionObserver((entries) => {
		for (const entry of entries) {
			const image = entry.target;
			if (entry.isIntersecting) visible.add(image);
			else visible.delete(image);
		}
		schedule();
	}, { threshold: 0 });
	const posterVisibility = new MutationObserver(schedule);
	const collect = () => {
		for (const image of observed) if (!image.isConnected || !image.closest("main")) {
			intersection.unobserve(image);
			observed.delete(image);
			visible.delete(image);
			sampled.delete(image);
		}
		for (const image of document.querySelectorAll("main img")) if (!observed.has(image)) {
			observed.add(image);
			intersection.observe(image);
		}
		posterVisibility.disconnect();
		for (const image of observed) if (image.style.visibility) posterVisibility.observe(image, {
			attributes: true,
			attributeFilter: ["style"]
		});
		schedule();
	};
	const changed = new MutationObserver((records) => {
		const hiddenChanged = records.some((record) => record.type === "attributes" && record.attributeName === "hidden" && record.target instanceof Element && record.target.closest("main"));
		if (!(hiddenChanged || records.some((record) => record.type === "attributes" ? record.target instanceof HTMLImageElement : [...record.addedNodes, ...record.removedNodes].some((node) => node instanceof Element && (node.matches("img") || node.querySelector("img")))))) return;
		if (hiddenChanged) resample = true;
		collect();
		if (revealTimer !== null) clearTimeout(revealTimer);
		revealTimer = setTimeout(() => {
			revealTimer = null;
			schedule();
		}, 350);
	});
	const finishScroll = () => {
		if (scrollTimer !== null) clearTimeout(scrollTimer);
		scrollTimer = null;
		scrolling = false;
		resample = true;
		settled = true;
		schedule();
	};
	const onScroll = () => {
		scrolling = true;
		settled = false;
		if (scrollTimer !== null) clearTimeout(scrollTimer);
		scrollTimer = setTimeout(finishScroll, 120);
		schedule();
	};
	const onResize = () => {
		resample = true;
		schedule();
	};
	const onDisclosureToggle = (event) => {
		if (!(event.target instanceof Element) || !event.target.matches("details") || !event.target.closest("main")) return;
		resample = true;
		schedule();
	};
	const viewport = window.visualViewport;
	const visibility = () => {
		if (document.hidden) {
			if (frame !== null) cancelAnimationFrame(frame);
			frame = null;
			colorDriver.pause();
		} else {
			colorDriver.play();
			resample = true;
			schedule();
		}
	};
	collect();
	changed.observe(document.body, {
		subtree: true,
		childList: true,
		attributes: true,
		attributeFilter: [
			"src",
			"srcset",
			"aria-hidden",
			"hidden"
		]
	});
	window.addEventListener("scroll", onScroll, { passive: true });
	window.addEventListener("scrollend", finishScroll);
	window.addEventListener("resize", onResize, { passive: true });
	viewport?.addEventListener("scroll", onScroll, { passive: true });
	viewport?.addEventListener("resize", onResize, { passive: true });
	document.addEventListener("load", schedule, true);
	document.addEventListener("toggle", onDisclosureToggle, true);
	document.addEventListener("visibilitychange", visibility);
	reduced.addEventListener("change", schedule);
	const headerResize = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(onResize);
	headerResize?.observe(header);
	return () => {
		stopped = true;
		if (frame !== null) cancelAnimationFrame(frame);
		if (revealTimer !== null) clearTimeout(revealTimer);
		if (scrollTimer !== null) clearTimeout(scrollTimer);
		reset();
		colorDriver.dispose();
		intersection.disconnect();
		changed.disconnect();
		posterVisibility.disconnect();
		headerResize?.disconnect();
		observed.clear();
		visible.clear();
		sampled.clear();
		window.removeEventListener("scroll", onScroll);
		window.removeEventListener("scrollend", finishScroll);
		window.removeEventListener("resize", onResize);
		viewport?.removeEventListener("scroll", onScroll);
		viewport?.removeEventListener("resize", onResize);
		document.removeEventListener("load", schedule, true);
		document.removeEventListener("toggle", onDisclosureToggle, true);
		document.removeEventListener("visibilitychange", visibility);
		reduced.removeEventListener("change", schedule);
	};
}
//#endregion
//#region app/image-accents.json
var image_accents_default = {
	"/people/adam-thabo-headshot.png": "#AE7461",
	"/portfolio-carousel/adam-fuss/01.webp": "#93887B",
	"/portfolio-carousel/adam-fuss/02.webp": "#968878",
	"/portfolio-carousel/adam-fuss/03.webp": "#999476",
	"/portfolio-carousel/adam-fuss/04.webp": "#AA9F8B",
	"/portfolio-carousel/adam-fuss/05.webp": "#A18A6D",
	"/portfolio-carousel/adam-fuss/06.webp": "#9B8973",
	"/portfolio-carousel/adam-fuss/07.webp": "#9B8C73",
	"/portfolio-carousel/adam-fuss/08.webp": "#948F7A",
	"/portfolio-carousel/adam-fuss/09.webp": "#958879",
	"/portfolio-carousel/brooklyn-museum/01.webp": "#71859D",
	"/portfolio-carousel/brooklyn-museum/02.webp": "#968B78",
	"/portfolio-carousel/brooklyn-museum/03.webp": "#A79280",
	"/portfolio-carousel/brooklyn-museum/05.webp": "#9C8672",
	"/portfolio-carousel/brooklyn-museum/06.webp": "#71859D",
	"/portfolio-carousel/brooklyn-museum/07.webp": "#A79381",
	"/portfolio-carousel/brooklyn-museum/08.webp": "#9B8873",
	"/portfolio-carousel/brooklyn-museum/09.webp": "#6E8FA0",
	"/portfolio-carousel/carnegie/01.webp": "#7EB25C",
	"/portfolio-carousel/carnegie/02.webp": "#5C81BC",
	"/portfolio-carousel/carnegie/03.webp": "#80A7CB",
	"/portfolio-carousel/carnegie/05.webp": "#9EA965",
	"/portfolio-carousel/carnegie/06.webp": "#A97C65",
	"/portfolio-carousel/carnegie/07.webp": "#AB8C63",
	"/portfolio-carousel/carnegie/08.webp": "#B5A67B",
	"/portfolio-carousel/cooper-hewitt/01.webp": "#9D8371",
	"/portfolio-carousel/cooper-hewitt/02.webp": "#A0856E",
	"/portfolio-carousel/cooper-hewitt/03.webp": "#9D8971",
	"/portfolio-carousel/cooper-hewitt/04.webp": "#A78367",
	"/portfolio-carousel/cooper-hewitt/05.webp": "#A0816F",
	"/portfolio-carousel/cooper-hewitt/06.webp": "#9D8971",
	"/portfolio-carousel/cooper-hewitt/07.webp": "#A3846B",
	"/portfolio-carousel/cooper-hewitt/08.webp": "#A78368",
	"/portfolio-carousel/cooper-hewitt/09.webp": "#AE9780",
	"/portfolio-carousel/david-bowie/01.webp": "#A58669",
	"/portfolio-carousel/david-bowie/02.webp": "#AA7E65",
	"/portfolio-carousel/david-bowie/03.webp": "#A2826C",
	"/portfolio-carousel/delta/01.webp": "#777EA5",
	"/portfolio-carousel/delta/02.webp": "#727FA6",
	"/portfolio-carousel/delta/03.webp": "#73809F",
	"/portfolio-carousel/delta/05.webp": "#777FA0",
	"/portfolio-carousel/delta/06.webp": "#7C7E9A",
	"/portfolio-carousel/delta/07.webp": "#787EA5",
	"/portfolio-carousel/delta/09.webp": "#777EA4",
	"/portfolio-carousel/delta/10.webp": "#72809F",
	"/portfolio-carousel/delta/12.webp": "#767F9F",
	"/portfolio-carousel/delta/13.webp": "#7C7E99",
	"/portfolio-carousel/delta/14.webp": "#7180A5",
	"/portfolio-carousel/dia-beacon/01.webp": "#9B8A74",
	"/portfolio-carousel/dia-beacon/02.webp": "#958A79",
	"/portfolio-carousel/dia-beacon/03.webp": "#988976",
	"/portfolio-carousel/dia-beacon/04.webp": "#9B8A74",
	"/portfolio-carousel/dia-beacon/05.webp": "#958B79",
	"/portfolio-carousel/dia-beacon/06.webp": "#988A76",
	"/portfolio-carousel/droog/01.webp": "#B19677",
	"/portfolio-carousel/intel/01.webp": "#758599",
	"/portfolio-carousel/intel/02.webp": "#6786A8",
	"/portfolio-carousel/intel/03.webp": "#558DB9",
	"/portfolio-carousel/intel/04.webp": "#8498CD",
	"/portfolio-carousel/intel/05.webp": "#5585B9",
	"/portfolio-carousel/intel/06.webp": "#9C8C72",
	"/portfolio-carousel/katrin-sigurdardottir/01.webp": "#988776",
	"/portfolio-carousel/katrin-sigurdardottir/02.webp": "#9C8272",
	"/portfolio-carousel/katrin-sigurdardottir/03.webp": "#939393",
	"/portfolio-carousel/liberty-science-center/01.webp": "#9F6AC2",
	"/portfolio-carousel/liberty-science-center/02.webp": "#8574C6",
	"/portfolio-carousel/liberty-science-center/03.webp": "#AE63BF",
	"/portfolio-carousel/liberty-science-center/05.webp": "#B161BE",
	"/portfolio-carousel/museum-city-new-york/01.webp": "#A5896A",
	"/portfolio-carousel/museum-city-new-york/02.webp": "#A99666",
	"/portfolio-carousel/museum-city-new-york/03.webp": "#AB8664",
	"/portfolio-carousel/museum-city-new-york/04.webp": "#9F896F",
	"/portfolio-carousel/museum-city-new-york/05.webp": "#9C8472",
	"/portfolio-carousel/museum-city-new-york/06.webp": "#AA8865",
	"/portfolio-carousel/museum-city-new-york/07.webp": "#B0845E",
	"/portfolio-carousel/museum-city-new-york/08.webp": "#B19A5D",
	"/portfolio-carousel/museum-city-new-york/09.webp": "#A2886C",
	"/portfolio-carousel/museum-city-new-york/10.webp": "#9E8370",
	"/portfolio-carousel/nabisco/01.webp": "#B27F5D",
	"/portfolio-carousel/nabisco/02.webp": "#7C79BE",
	"/portfolio-carousel/nabisco/03.webp": "#B99D55",
	"/portfolio-carousel/nabisco/04.webp": "#B0925E",
	"/portfolio-carousel/nabisco/05.webp": "#B9A055",
	"/portfolio-carousel/nabisco/06.webp": "#BB9C58",
	"/portfolio-carousel/nabisco/07.webp": "#B9A355",
	"/portfolio-carousel/nabisco/08.webp": "#B9A155",
	"/portfolio-carousel/nabisco/09.webp": "#7C79BD",
	"/portfolio-carousel/nabisco/10.webp": "#B9A455",
	"/portfolio-carousel/nabisco/11.webp": "#B9A755",
	"/portfolio-carousel/nabisco/12.webp": "#BA9C57",
	"/portfolio-carousel/nabisco/13.webp": "#B0925E",
	"/portfolio-carousel/nabisco/14.webp": "#AF935F",
	"/portfolio-carousel/new-museum/01.webp": "#988376",
	"/portfolio-carousel/new-museum/02.webp": "#939393",
	"/portfolio-carousel/new-museum/03.webp": "#939393",
	"/portfolio-carousel/new-museum/04.webp": "#817E96",
	"/portfolio-carousel/new-museum/05.webp": "#697EBE",
	"/portfolio-carousel/new-museum/06.webp": "#7C7CAC",
	"/portfolio-carousel/new-museum/07.webp": "#787BBA",
	"/portfolio-carousel/new-museum/08.webp": "#6C7FB0",
	"/portfolio-carousel/new-museum/09.webp": "#8498CD",
	"/portfolio-carousel/new-museum/10.webp": "#6786A8",
	"/portfolio-carousel/new-museum/11.webp": "#5584B9",
	"/portfolio-carousel/new-museum/12.webp": "#758599",
	"/portfolio-carousel/new-museum/13.webp": "#687EC1",
	"/portfolio-carousel/new-museum/14.webp": "#6383AB",
	"/portfolio-carousel/new-museum/15.webp": "#5F80BD",
	"/portfolio-carousel/new-museum/16.webp": "#8498CD",
	"/portfolio-carousel/new-museum/17.webp": "#697EBE",
	"/portfolio-carousel/new-museum/18.webp": "#817E96",
	"/portfolio-carousel/new-museum/19.webp": "#988376",
	"/portfolio-carousel/nike/01.webp": "#9B8273",
	"/portfolio-carousel/nike/02.webp": "#5D81BD",
	"/portfolio-carousel/nike/03.webp": "#8475C6",
	"/portfolio-carousel/nike/04.webp": "#6082AF",
	"/portfolio-carousel/nike/06.webp": "#9B8273",
	"/portfolio-carousel/nike/07.webp": "#7B8393",
	"/portfolio-carousel/nike/08.webp": "#788596",
	"/portfolio-carousel/nike/09.webp": "#6E7CC4",
	"/portfolio-carousel/nike/10.webp": "#777CB6",
	"/portfolio-carousel/nike/11.webp": "#6F7CBE",
	"/portfolio-carousel/nike/14.webp": "#6E7CC3",
	"/portfolio-carousel/nike/15.webp": "#9B8273",
	"/portfolio-carousel/nike/16.webp": "#798596",
	"/portfolio-carousel/nike/17.webp": "#707EB5",
	"/portfolio-carousel/nike/18.webp": "#777CB5",
	"/portfolio-carousel/nike/19.webp": "#5FAFA1",
	"/portfolio-carousel/nike/20.webp": "#7B8393",
	"/portfolio-carousel/nike/21.webp": "#61AD68",
	"/portfolio-carousel/nike/22.webp": "#55B993",
	"/portfolio-carousel/nike/23.webp": "#8375C6",
	"/portfolio-carousel/nike/24.webp": "#5E81BD",
	"/portfolio-carousel/noguchi-museum/01.webp": "#A58769",
	"/portfolio-carousel/noguchi-museum/02.webp": "#9F8570",
	"/portfolio-carousel/noguchi-museum/03.webp": "#9F836F",
	"/portfolio-carousel/noguchi-museum/04.webp": "#A68A68",
	"/portfolio-carousel/noguchi-museum/05.webp": "#9F836F",
	"/portfolio-carousel/noguchi-museum/06.webp": "#9C8573",
	"/portfolio-carousel/noguchi-museum/07.webp": "#A88F67",
	"/portfolio-carousel/noguchi-museum/08.webp": "#A98B65",
	"/portfolio-carousel/noguchi-museum/09.webp": "#A1886D",
	"/portfolio-carousel/noguchi-museum/10.webp": "#9D8771",
	"/portfolio-carousel/noguchi-museum/11.webp": "#A1856E",
	"/portfolio-carousel/saul-melman-jadu-beta/01.webp": "#558FBA",
	"/portfolio-carousel/saul-melman-jadu-beta/02.webp": "#6288AD",
	"/portfolio-carousel/saul-melman-jadu-beta/03.webp": "#988B77",
	"/portfolio-carousel/saul-melman-jadu-beta/04.webp": "#558BB9",
	"/portfolio-carousel/saul-melman-jadu-beta/05.webp": "#B98555",
	"/portfolio-carousel/saul-melman-jadu-beta/06.webp": "#A9A08F",
	"/portfolio-carousel/saul-melman-jadu-beta/07.webp": "#558FBA",
	"/portfolio-carousel/saul-melman-jadu-beta/08.webp": "#A9A08F",
	"/portfolio-carousel/saul-melman-jadu-beta/09.webp": "#558BB9",
	"/portfolio-carousel/saul-melman-jadu-beta/10.webp": "#6388AC",
	"/portfolio-carousel/saul-melman-jadu-beta/11.webp": "#988B77",
	"/portfolio-carousel/socrates-sculpture-park/01.webp": "#9C8E73",
	"/portfolio-carousel/socrates-sculpture-park/02.webp": "#6D7EB6",
	"/portfolio-carousel/socrates-sculpture-park/03.webp": "#869975",
	"/portfolio-carousel/socrates-sculpture-park/04.webp": "#A1846D",
	"/portfolio-carousel/socrates-sculpture-park/05.webp": "#99AD61",
	"/portfolio-carousel/socrates-sculpture-park/06.webp": "#91A965",
	"/portfolio-carousel/socrates-sculpture-park/07.webp": "#97B25C",
	"/portfolio-carousel/socrates-sculpture-park/08.webp": "#8DA669",
	"/portfolio-carousel/socrates-sculpture-park/09.webp": "#9B9373",
	"/portfolio-carousel/socrates-sculpture-park/10.webp": "#998C75",
	"/portfolio-carousel/socrates-sculpture-park/11.webp": "#6B80AE",
	"/portfolio-carousel/socrates-sculpture-park/12.webp": "#A1856E",
	"/portfolio-carousel/socrates-sculpture-park/13.webp": "#8DA668",
	"/portfolio-carousel/socrates-sculpture-park/14.webp": "#869976",
	"/portfolio-carousel/sonos-janelle-monae/01.webp": "#8574C6",
	"/portfolio-carousel/sonos-janelle-monae/02.webp": "#939393",
	"/portfolio-carousel/sonos-janelle-monae/03.webp": "#6C7CC3",
	"/portfolio-carousel/sonos-janelle-monae/04.webp": "#B16994",
	"/portfolio-carousel/sonos-janelle-monae/05.webp": "#BE6097",
	"/portfolio-carousel/sonos-janelle-monae/06.webp": "#978377",
	"/portfolio-carousel/sonos-janelle-monae/07.webp": "#939393",
	"/portfolio-carousel/sonos-janelle-monae/08.webp": "#6E7EB9",
	"/portfolio-carousel/sonos-janelle-monae/09.webp": "#8575C0",
	"/project-film-posters/core-nyc-reel.jpg": "#9C8672",
	"/project-film-posters/heart-bot-reel.jpg": "#787BBA",
	"/project-galleries/2012-us-olympics/01.webp": "#6D97B1",
	"/project-galleries/2012-us-olympics/02.webp": "#7586AC",
	"/project-galleries/2012-us-olympics/03.webp": "#70829F",
	"/project-galleries/2012-us-olympics/04.webp": "#658BA9",
	"/project-galleries/2012-us-olympics/05.webp": "#A07E6E",
	"/project-galleries/archive/01.webp": "#AE8560",
	"/project-galleries/archive/02.webp": "#B2975D",
	"/project-galleries/archive/03.webp": "#767EA6",
	"/project-galleries/archive/04.webp": "#939393",
	"/project-galleries/archive/05.webp": "#B9A855",
	"/project-galleries/archive/06.webp": "#6483AA",
	"/project-galleries/archive/07.webp": "#A2886C",
	"/project-galleries/archive/08.webp": "#B97E55",
	"/project-galleries/archive/09.webp": "#A5846A",
	"/project-galleries/archive/10.webp": "#8375C4",
	"/project-galleries/archive/11.webp": "#7D77C4",
	"/project-galleries/archive/12.webp": "#848DCD",
	"/project-galleries/archive/13.webp": "#5F80BD",
	"/project-galleries/archive/14.webp": "#65A9A1",
	"/project-galleries/archive/15.webp": "#97AC63",
	"/project-galleries/archive/16.webp": "#6C7FB0",
	"/project-galleries/archive/17.webp": "#598EBB",
	"/project-galleries/archive/18.webp": "#AB8A76",
	"/project-galleries/archive/19.webp": "#7395B5",
	"/project-galleries/archive/20.webp": "#7EB25C",
	"/project-galleries/archive/21.webp": "#958679",
	"/project-galleries/archive/22.webp": "#939393",
	"/project-galleries/archive/23.webp": "#668BA8",
	"/project-galleries/archive/24.webp": "#998076",
	"/project-galleries/archive/25.webp": "#9B8C73",
	"/project-galleries/archive/26.webp": "#B19677",
	"/project-galleries/ascend/02.webp": "#777EA4",
	"/project-galleries/ascend/03.webp": "#72809F",
	"/project-galleries/ascend/05.webp": "#767F9F",
	"/project-galleries/ascend/06.webp": "#7C7E99",
	"/project-galleries/ascend/07.webp": "#7180A5",
	"/project-galleries/beat-repeat/01.webp": "#968B78",
	"/project-galleries/beat-repeat/02.webp": "#939393",
	"/project-galleries/beat-repeat/03.webp": "#AF8360",
	"/project-galleries/beat-repeat/04.webp": "#939393",
	"/project-galleries/beat-repeat/05.webp": "#A88C78",
	"/project-galleries/beat-repeat/overview-original.jpg": "#A28B7B",
	"/project-galleries/best-of-all-possible-worlds/01.webp": "#998C75",
	"/project-galleries/best-of-all-possible-worlds/02.webp": "#6B80AE",
	"/project-galleries/best-of-all-possible-worlds/03.webp": "#A1856D",
	"/project-galleries/best-of-all-possible-worlds/04.webp": "#8DA668",
	"/project-galleries/best-of-all-possible-worlds/05.webp": "#869976",
	"/project-galleries/bldg-92/01.webp": "#B5785A",
	"/project-galleries/bldg-92/02.webp": "#A2806C",
	"/project-galleries/bldg-92/03.webp": "#AF795F",
	"/project-galleries/bldg-92/04.webp": "#AF7F5F",
	"/project-galleries/bldg-92/05.webp": "#AC7C62",
	"/project-galleries/bronx-science-holocaust-museum/01.png": "#A1886D",
	"/project-galleries/brooklyn-museum/01.webp": "#71859D",
	"/project-galleries/brooklyn-museum/02.webp": "#A79381",
	"/project-galleries/brooklyn-museum/03.webp": "#9B8773",
	"/project-galleries/brooklyn-museum/04.webp": "#6E8EA0",
	"/project-galleries/china-institute/completed-gallery-front.jpg": "#B69D8B",
	"/project-galleries/china-institute/completed-gallery-panorama.jpg": "#9A8975",
	"/project-galleries/china-institute/completed-gallery-wall.jpg": "#988576",
	"/project-galleries/china-institute/finished-exterior.jpg": "#AA977A",
	"/project-galleries/china-institute/finished-main-gallery.jpg": "#A28D79",
	"/project-galleries/coney-island-carousel-museum/01.png": "#A3846B",
	"/project-galleries/cooper-hewitt/01.webp": "#A0816F",
	"/project-galleries/cooper-hewitt/02.webp": "#9D8971",
	"/project-galleries/cooper-hewitt/03.webp": "#A3836B",
	"/project-galleries/cooper-hewitt/04.webp": "#9D8971",
	"/project-galleries/cooper-hewitt/05.webp": "#A78368",
	"/project-galleries/cooper-hewitt/06.webp": "#AE967F",
	"/project-galleries/core-nyc/01.webp": "#AA8865",
	"/project-galleries/core-nyc/02.webp": "#B0845E",
	"/project-galleries/core-nyc/03.webp": "#B1995D",
	"/project-galleries/core-nyc/04.webp": "#A2886C",
	"/project-galleries/core-nyc/05.webp": "#9E8370",
	"/project-galleries/dia-beacon/01.webp": "#9B8A74",
	"/project-galleries/dia-beacon/02.webp": "#958A79",
	"/project-galleries/dia-beacon/03.webp": "#988976",
	"/project-galleries/dream-machine/01.webp": "#9F6AC2",
	"/project-galleries/dream-machine/02.webp": "#8574C6",
	"/project-galleries/dream-machine/03.webp": "#AE63BF",
	"/project-galleries/dream-machine/05.webp": "#B161BE",
	"/project-galleries/electric-jukebox/01.webp": "#939393",
	"/project-galleries/electric-jukebox/02.webp": "#6E7DBA",
	"/project-galleries/electric-jukebox/03.webp": "#8575C0",
	"/project-galleries/heart-bot/01.webp": "#687EC1",
	"/project-galleries/heart-bot/02.webp": "#6382AC",
	"/project-galleries/heart-bot/03.webp": "#5F80BD",
	"/project-galleries/heart-bot/04.webp": "#8498CD",
	"/project-galleries/heart-bot/05.webp": "#697EBE",
	"/project-galleries/heart-bot/06.webp": "#817E96",
	"/project-galleries/heart-bot/07.webp": "#988376",
	"/project-galleries/heliogram-series/01.jpg": "#939393",
	"/project-galleries/heliogram-series/02.jpg": "#BF6384",
	"/project-galleries/heliogram-series/03.jpg": "#B2845C",
	"/project-galleries/holocaust-by-bullets/01.webp": "#6885A9",
	"/project-galleries/holocaust-by-bullets/02.webp": "#6E8CA0",
	"/project-galleries/holocaust-by-bullets/03.webp": "#798695",
	"/project-galleries/holocaust-by-bullets/04.webp": "#6E83A0",
	"/project-galleries/hyatt-photo-booth/01.webp": "#A0806E",
	"/project-galleries/hyatt-photo-booth/02.webp": "#A37C6B",
	"/project-galleries/hyatt-photo-booth/03.webp": "#A3816B",
	"/project-galleries/hyatt-photo-booth/04.webp": "#7CA9AB",
	"/project-galleries/hyatt-photo-booth/05.webp": "#AE8860",
	"/project-galleries/hyatt-photo-booth/06.webp": "#9D8071",
	"/project-galleries/jadu-beta/01.webp": "#558FBA",
	"/project-galleries/jadu-beta/02.webp": "#A9A08F",
	"/project-galleries/jadu-beta/03.webp": "#558BB9",
	"/project-galleries/jadu-beta/04.webp": "#6288AC",
	"/project-galleries/jadu-beta/05.webp": "#988B77",
	"/project-galleries/klaus-biesenbach-residence/01.webp": "#939393",
	"/project-galleries/m-is-for-museum/01.webp": "#B5A67B",
	"/project-galleries/m-is-for-museum/02.webp": "#5C81BC",
	"/project-galleries/m-is-for-museum/03.webp": "#80A7CB",
	"/project-galleries/m-is-for-museum/05.webp": "#9EA965",
	"/project-galleries/m-is-for-museum/06.webp": "#A97C65",
	"/project-galleries/m-is-for-museum/07.webp": "#AB8C63",
	"/project-galleries/nike-free-hyperfeel/03.webp": "#6E7CC4",
	"/project-galleries/nike-free-hyperfeel/04.webp": "#9B8373",
	"/project-galleries/nike-free-hyperfeel/05.webp": "#788596",
	"/project-galleries/nike-free-hyperfeel/06.webp": "#707EB5",
	"/project-galleries/nike-free-hyperfeel/07.webp": "#777CB6",
	"/project-galleries/nike-free-hyperfeel/08.webp": "#5FAFA2",
	"/project-galleries/nike-free-hyperfeel/09.webp": "#7B8393",
	"/project-galleries/nike-free-hyperfeel/10.webp": "#61AD68",
	"/project-galleries/nike-free-hyperfeel/11.webp": "#6083AE",
	"/project-galleries/nike-free-hyperfeel/12.webp": "#8475C6",
	"/project-galleries/nike-free-hyperfeel/13.webp": "#5D81BD",
	"/project-galleries/on-becoming-an-artist/01.webp": "#A98A65",
	"/project-galleries/on-becoming-an-artist/02.webp": "#A1886D",
	"/project-galleries/on-becoming-an-artist/03.webp": "#9D8771",
	"/project-galleries/on-becoming-an-artist/04.webp": "#A1856E",
	"/project-galleries/sacred-splendor/01.jpg": "#A2886D",
	"/project-galleries/sacred-splendor/02.jpg": "#9C8D72",
	"/project-galleries/sacred-splendor/03.jpg": "#9B8C73",
	"/project-galleries/touro-loeb-visitors-center/01.png": "#B58659",
	"/project-galleries/touro-loeb-visitors-center/02.png": "#A0886F",
	"/project-galleries/tumi/01.webp": "#8375C4",
	"/project-galleries/tumi/02.webp": "#5D82B7",
	"/project-galleries/tumi/03.webp": "#8475C6",
	"/project-galleries/tumi/04.webp": "#968A79",
	"/project-galleries/wheat-thins-popped/01.webp": "#B9A155",
	"/project-galleries/wheat-thins-popped/02.webp": "#7C79BE",
	"/project-galleries/wheat-thins-popped/03.webp": "#B9A355",
	"/project-galleries/wheat-thins-popped/04.webp": "#B9A755",
	"/project-galleries/wheat-thins-popped/05.webp": "#BB9C57",
	"/project-galleries/wheat-thins-popped/06.webp": "#B0925E",
	"/project-galleries/wheat-thins-popped/07.webp": "#B0935F",
	"/projects/2012-us-olympics.webp": "#6D94B2",
	"/projects/archive.webp": "#B2965C",
	"/projects/beat-repeat.webp": "#A0816F",
	"/projects/best-of-all-possible-worlds.webp": "#9C8E73",
	"/projects/bldg-92.webp": "#B97C55",
	"/projects/brooklyn-museum.webp": "#71859D",
	"/projects/cooper-hewitt.webp": "#A0816F",
	"/projects/core-nyc.webp": "#AA8765",
	"/projects/dia-beacon.webp": "#9B8973",
	"/projects/electric-jukebox.webp": "#939393",
	"/projects/heart-bot.webp": "#6282AC",
	"/projects/holocaust-by-bullets.webp": "#988776",
	"/projects/hyatt-photo-booth.webp": "#A1806E",
	"/projects/jadu-beta.webp": "#558FBA",
	"/projects/nike-free-hyperfeel.webp": "#9B8273",
	"/projects/on-becoming-an-artist.webp": "#AA9064",
	"/projects/tumi.webp": "#8475C5",
	"/projects/wheat-thins-popped.webp": "#BBA358",
	"/studio-archive/acrylic-case-blue-and-rose-reflections.webp": "#7E96B1",
	"/studio-archive/cedar-pencil-meets-drafting-lines.webp": "#A77D68",
	"/studio-archive/coiled-cables-after-the-test.webp": "#A08B6F",
	"/studio-archive/daylight-electronics-prototyping-bench.webp": "#939393",
	"/studio-archive/full-scale-test-bay-in-natural-light.webp": "#998475",
	"/studio-archive/gallery-installation-kit-ready-to-roll.webp": "#A89781",
	"/studio-archive/late-night-projection-test-bench.webp": "#668AA9",
	"/studio-archive/museum-corridor-with-staged-installation-gear.webp": "#9E8870",
	"/studio-archive/predawn-raster-light-in-empty-gallery.webp": "#728CA0",
	"/studio-archive/prismatic-pixels-on-acrylic.webp": "#5A81BC",
	"/studio-archive/projector-standby-in-an-empty-gallery.webp": "#78819C",
	"/studio-archive/quiet-architecture-studio-after-critique.webp": "#988676",
	"/studio-archive/quiet-electronics-bench-after-midnight.webp": "#AF8E5F",
	"/studio-archive/quiet-studio-dawn-with-pixel-light.webp": "#939393",
	"/studio-archive/quiet-trace-table-after-hours.webp": "#939393",
	"/studio-archive/raster-light-across-an-empty-gallery.webp": "#768898",
	"/studio-archive/warm-light-beneath-the-plinth.webp": "#9A8574",
	"/project-galleries/central-governor/01.png": "#BFA36B",
	"/project-galleries/central-governor/02.png": "#BFA36B"
};
//#endregion
//#region app/chameleon-wordmark.tsx
var import_jsx_runtime = require_jsx_runtime();
var WORDMARK_MARKUP = { __html: DIGITAL_WORDMARK_ARTWORK };
function ChameleonWordmark({ sharedClock = false }) {
	const artwork = (0, import_react.useRef)(null);
	const pathname = usePathname();
	(0, import_react.useEffect)(() => {
		if (!artwork.current || sharedClock) return;
		return installImageResponsiveLogo(artwork.current, image_accents_default);
	}, [pathname, sharedClock]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		ref: artwork,
		className: "brand-mark-art brand-mark-screen",
		width: 2399,
		height: 1050,
		viewBox: "0 0 2399 1050",
		xmlns: "http://www.w3.org/2000/svg",
		"aria-hidden": "true",
		focusable: "false",
		dangerouslySetInnerHTML: WORDMARK_MARKUP
	}, pathname);
}
//#endregion
export { ChameleonWordmark };
