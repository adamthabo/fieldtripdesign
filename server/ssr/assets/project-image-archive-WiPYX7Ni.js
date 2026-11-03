import { b as require_react, n as require_jsx_runtime, t as require_react_dom, w as __toESM } from "../index.js";
import { t as cn } from "./utils-ymay08E2.js";
import { a as projectFilms, i as NativeFilm, n as archiveVimeoFilms, t as ArchiveVimeo } from "./archive-vimeo-D6Ct3jdd.js";
import { r as projectCaptionYear, t as imageCaptionDetails } from "./project-caption-BvX_Quum.js";
import { t as ReelFullscreenButton } from "./reel-fullscreen-button-BatwXWGX.js";
import { t as BrandText } from "./field-trip-name-BKqnzu5g.js";
import { t as photographerCredit } from "./image-credit-policy-DQO9Mk8-.js";
import { t as ProjectTitle } from "./project-title-BIXMb8hQ.js";
import { a as useLayoutEffect2, c as dispatchDiscreteCustomEvent, d as MotionImage, i as useId, l as createContextScope, n as useControllableState, o as composeEventHandlers, p as imageCredit, r as useCallbackRef$1, s as Primitive, t as cva, u as createLucideIcon } from "./dist-DfPmTwKc.js";
//#region app/project-caption-view.tsx
var import_jsx_runtime = require_jsx_runtime();
function ProjectCaption({ title, venue, date, services }) {
	const year = projectCaptionYear(date);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "compact-project-caption",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "compact-project-caption-title",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectTitle, { title })
			}),
			(venue || year) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "compact-project-caption-meta",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandText, { children: [venue, year].filter(Boolean).join(" · ") })
			}),
			services && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "compact-project-caption-services",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandText, { children: services })
			})
		]
	});
}
//#endregion
//#region app/work/project-image-credit.tsx
function ProjectImageCredit({ image }) {
	const credit = photographerCredit(image.sourceCredit) ?? imageCredit(image.src);
	if (!credit) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
		className: "project-image-credit",
		href: credit.href,
		target: "_blank",
		rel: "noopener noreferrer",
		children: credit.label
	});
}
//#endregion
//#region app/home/viewport-playback.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
/** Start as media enters the viewport; never keep playing in a hidden document. */
function useViewportPlayback() {
	const stageRef = (0, import_react.useRef)(null);
	const [visible, setVisible] = (0, import_react.useState)(false);
	const [automatic, setAutomatic] = (0, import_react.useState)(false);
	const [preferenceReady, setPreferenceReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const motion = matchMedia("(prefers-reduced-motion: reduce)");
		const data = matchMedia("(prefers-reduced-data: reduce)");
		const connection = navigator.connection;
		let intersecting = false;
		const visibility = () => setVisible(intersecting && !document.hidden);
		const preference = () => {
			setAutomatic(!motion.matches && !data.matches && !connection?.saveData);
			setPreferenceReady(true);
		};
		const observer = typeof IntersectionObserver === "undefined" ? null : new IntersectionObserver((entries) => {
			const entry = entries[entries.length - 1];
			intersecting = entry.isIntersecting && entry.intersectionRatio > 0;
			visibility();
		}, { threshold: [0, .001] });
		const fallback = () => {
			const rect = stageRef.current?.getBoundingClientRect();
			intersecting = !!rect && rect.bottom > 0 && rect.top < innerHeight && rect.right > 0 && rect.left < innerWidth;
			visibility();
		};
		if (observer && stageRef.current) observer.observe(stageRef.current);
		else {
			fallback();
			window.addEventListener("scroll", fallback, { passive: true });
			window.addEventListener("resize", fallback);
		}
		preference();
		motion.addEventListener("change", preference);
		data.addEventListener("change", preference);
		connection?.addEventListener("change", preference);
		document.addEventListener("visibilitychange", visibility);
		return () => {
			observer?.disconnect();
			window.removeEventListener("scroll", fallback);
			window.removeEventListener("resize", fallback);
			motion.removeEventListener("change", preference);
			data.removeEventListener("change", preference);
			connection?.removeEventListener("change", preference);
			document.removeEventListener("visibilitychange", visibility);
		};
	}, []);
	return {
		stageRef,
		visible,
		automatic,
		preferenceReady
	};
}
//#endregion
//#region app/work/project-photo-reel.tsx
/** Lead presentation with an optional ordered gallery below. */
function ProjectPhotoReel({ entries, projectTitle, galleryCount, suspended, captionDetails = {}, suppressCaptionText = false }) {
	const { stageRef, visible, automatic, preferenceReady } = useViewportPlayback();
	const [position, setPosition] = (0, import_react.useState)(0);
	const [requested, setRequested] = (0, import_react.useState)(null);
	const [imageRevision, setImageRevision] = (0, import_react.useState)(0);
	const [paused, setPaused] = (0, import_react.useState)(false);
	const [focused, setFocused] = (0, import_react.useState)(false);
	const focusedLink = (0, import_react.useRef)(false);
	const pointerStopped = (0, import_react.useRef)(null);
	const [ready, setReady] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(false);
	const entry = entries[position];
	const stopped = paused || error;
	const playing = automatic && visible && !suspended && !stopped && !focused;
	(0, import_react.useEffect)(() => {
		if (requested === null || focused) return;
		let cancelled = false;
		const image = new Image();
		const fail = () => {
			if (!cancelled) {
				setError(true);
				setRequested(null);
			}
		};
		image.onload = () => {
			image.decode().then(() => {
				if (cancelled || focusedLink.current) return;
				if (requested === position) setImageRevision((value) => value + 1);
				setPosition(requested);
				setReady(true);
				setError(false);
				setRequested(null);
			}, fail);
		};
		image.onerror = fail;
		image.src = entries[requested].image.src;
		return () => {
			cancelled = true;
			image.onload = null;
			image.onerror = null;
		};
	}, [
		requested,
		entries,
		focused,
		position
	]);
	(0, import_react.useEffect)(() => {
		if (!playing || !ready || requested !== null || entries.length < 2) return;
		let cancelled = false;
		let image = null;
		const timer = window.setTimeout(() => {
			if (document.hidden || focusedLink.current) return;
			const next = (position + 1) % entries.length;
			image = new Image();
			const fail = () => {
				if (!cancelled) setError(true);
			};
			image.onload = () => {
				image.decode().then(() => {
					if (cancelled || document.hidden || focusedLink.current) return;
					setPosition(next);
					setError(false);
				}, fail);
			};
			image.onerror = fail;
			image.src = entries[next].image.src;
		}, 8e3);
		return () => {
			cancelled = true;
			window.clearTimeout(timer);
			if (image) {
				image.onload = null;
				image.onerror = null;
			}
		};
	}, [
		playing,
		ready,
		requested,
		position,
		entries
	]);
	if (!entry) return null;
	function navigate(offset) {
		setRequested((position + offset + entries.length) % entries.length);
	}
	const caption = (item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
			String(item.imageIndex + 1).padStart(2, "0"),
			" / ",
			String(galleryCount).padStart(2, "0")
		] }),
		!suppressCaptionText && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectCaption, {
			title: projectTitle,
			...imageCaptionDetails(item.image, captionDetails)
		}),
		!suppressCaptionText && item.image.caption && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "project-image-writeup",
			children: item.image.caption
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectImageCredit, { image: item.image })
	] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"data-reel-fullscreen": "",
		className: "project-photo-reel",
		"data-project": entries[0].image.projectSlug,
		"aria-label": `${projectTitle} ${entries.length > 1 ? "photograph slideshow" : "photograph"}`,
		"aria-roledescription": entries.length > 1 ? "carousel" : void 0,
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
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				ref: (node) => {
					stageRef.current = node;
				},
				className: "project-photo-reel-frame",
				"data-still": !automatic,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: entry.image.src,
					"data-motion-focus": entry.image.src === "/project-galleries/brooklyn-museum/02.webp" ? "face" : entry.image.src === "/project-galleries/brooklyn-museum/01.webp" ? "case" : entry.image.projectSlug === "brooklyn-museum" ? "right" : "balanced",
					alt: entry.image.caption || `${projectTitle}, archive view ${entry.imageIndex + 1}`,
					loading: suspended ? "lazy" : "eager",
					fetchPriority: !suspended && position === 0 ? "high" : "auto",
					ref: (node) => {
						if (!node?.complete) return;
						if (node.naturalWidth > 0) setReady(true);
						else {
							setReady(false);
							setError(true);
						}
					},
					onLoad: () => setReady(true),
					onError: () => {
						setReady(false);
						setError(true);
					},
					className: ready && automatic ? "project-photo-reel-moving" : void 0,
					style: { animationPlayState: playing && ready ? "running" : "paused" }
				}, `${entry.image.id}:${imageRevision}`), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "project-photo-reel-image-trigger",
					"data-gallery-open": true,
					"data-gallery-index": entry.imageIndex,
					"aria-label": `Enlarge ${projectTitle}, photograph ${entry.imageIndex + 1} of ${galleryCount}`
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", {
				"aria-live": playing ? "off" : "polite",
				"aria-atomic": "true",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "project-photo-reel-caption-current",
					children: caption(entry)
				}), entries.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "project-photo-reel-caption-reserve",
					"aria-hidden": "true",
					inert: true,
					children: entries.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: caption(item) }, item.image.id))
				})]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "project-photo-reel-controls",
				role: "group",
				"aria-label": "Photograph slideshow controls",
				children: [
					entries.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						disabled: requested !== null,
						onClick: () => navigate(-1),
						children: "← Previous"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						disabled: !automatic,
						onPointerDown: () => {
							pointerStopped.current = stopped;
						},
						onClick: (event) => {
							const wasStopped = event.detail > 0 ? pointerStopped.current ?? stopped : stopped;
							pointerStopped.current = null;
							if (wasStopped) {
								setPaused(false);
								if (error && !ready) setRequested(position);
								else setError(false);
							} else setPaused(true);
						},
						children: stopped ? "Play" : "Pause"
					}),
					entries.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						disabled: requested !== null,
						onClick: () => navigate(1),
						children: "Next →"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReelFullscreenButton, {})
				]
			}),
			(preferenceReady && !automatic || entries.length > 1) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: preferenceReady && !automatic ? "project-photo-reel-note" : "sr-only",
				children: preferenceReady && !automatic ? "Automatic playback is off for your motion or data preference." : "Photographs change about every eight seconds. All images remain below."
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "status",
				children: entries.length === 1 ? "This photograph could not load. Reload the page to try again." : ready ? "This photograph could not load. The previous image is still shown; try Next again." : "This photograph could not load. Try Next or use the complete image archive below."
			})
		]
	});
}
//#endregion
//#region app/work/intro-config.ts
var approvedIntroSlugs = [];
function hasProjectIntro(slug) {
	return approvedIntroSlugs.includes(slug) || [
		"heart-bot",
		"beat-repeat",
		"nike-free-hyperfeel",
		"dream-machine",
		"core-nyc",
		"ascend"
	].includes(slug);
}
function projectIntroPoster(slug, fallback) {
	if (slug === "nike-free-hyperfeel") return "/project-galleries/nike-free-hyperfeel/04.webp";
	if (slug === "dream-machine") return "/project-galleries/dream-machine/03.webp";
	return slug === "heart-bot" ? "/project-film-posters/heart-bot-reel.jpg" : fallback;
}
//#endregion
//#region app/work/project-intro.tsx
function ProjectIntro({ slug, title, poster, detail = false, sourceLink = true }) {
	const { stageRef, visible, automatic } = useViewportPlayback();
	const [paused, setPaused] = (0, import_react.useState)(false), [manual, setManual] = (0, import_react.useState)(false), [playing, setPlaying] = (0, import_react.useState)(false), [hasFrame, setHasFrame] = (0, import_react.useState)(false), [blocked, setBlocked] = (0, import_react.useState)(false), [playRequest, setPlayRequest] = (0, import_react.useState)(0);
	const film = archiveVimeoFilms[slug];
	const mediaLabel = slug === "core-nyc" ? "reel" : "film";
	const nativeFilm = projectFilms.find((source) => source.href === `/work/${slug}`);
	const [full, setFull] = (0, import_react.useState)(false), [nativeControls, setNativeControls] = (0, import_react.useState)(false);
	const playFromGestureRef = (0, import_react.useRef)(null);
	const [muted, setMuted] = (0, import_react.useState)(true);
	const soundFromGestureRef = (0, import_react.useRef)(null);
	const toggleSound = () => {
		const nextMuted = !muted;
		setMuted(nextMuted);
		soundFromGestureRef.current?.(nextMuted);
	};
	const active = visible && !paused && (automatic || manual || nativeControls);
	const filmPoster = nativeFilm?.poster ?? projectIntroPoster(slug, poster);
	const toggle = () => {
		if (playing) setPaused(true);
		else {
			setPaused(false);
			setManual(true);
			setPlayRequest((value) => value + 1);
			playFromGestureRef.current?.();
		}
	};
	const playback = {
		active,
		playRequest,
		muted,
		soundFromGestureRef,
		onMutedChange: setMuted,
		nativeControls,
		onPlayingChange: setPlaying,
		onFrameChange: setHasFrame,
		onBlockedChange: setBlocked
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-reel-fullscreen": "",
		"aria-label": `${title} ${mediaLabel}`,
		className: `project-intro-group${detail ? " is-detail" : ""}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				ref: (node) => {
					stageRef.current = node;
				},
				className: "project-intro",
				"data-intro-project": slug,
				"data-intro-active": active,
				"data-native-controls": nativeControls,
				onPointerEnter: (event) => {
					if (event.pointerType !== "mouse" || event.buttons || !active || !automatic || playing || !muted) return;
					setBlocked(false);
					setPlayRequest((value) => value + 1);
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						"data-logo-poster": "true",
						style: { opacity: hasFrame ? 0 : 1 },
						src: filmPoster,
						alt: title,
						decoding: "async",
						loading: detail ? "eager" : "lazy"
					}),
					nativeFilm && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeFilm, {
						playFromGestureRef,
						film: nativeFilm,
						full,
						...playback
					}),
					film && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArchiveVimeo, {
						playFromGestureRef,
						revealOnPlayback: true,
						film,
						title,
						...playback
					}),
					detail && !nativeControls && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "project-intro-toggle",
						"aria-label": `${playing ? "Pause" : "Play"} ${title} ${mediaLabel}`,
						"aria-pressed": playing,
						onClick: toggle,
						children: (blocked || !automatic && !manual) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "film-play-prompt",
							children: "Play video"
						})
					})
				]
			}),
			detail && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "project-intro-playback-controls",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": `${playing ? "Pause" : "Play"} ${title} ${mediaLabel}`,
						"aria-pressed": playing,
						onClick: toggle,
						children: playing ? "Pause" : "Play"
					}),
					!nativeControls && nativeFilm?.hasAudio !== false && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "film-sound-toggle",
						"aria-label": muted ? `Turn ${mediaLabel} sound on` : `Mute ${mediaLabel} sound`,
						"aria-pressed": !muted,
						onClick: toggleSound,
						children: muted ? "Sound off" : "Sound on"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReelFullscreenButton, {})
				]
			}),
			detail && film && blocked && manual && !nativeControls && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "project-film-source",
				onClick: () => setNativeControls(true),
				children: "Use video controls"
			}),
			detail && (sourceLink || blocked) && film && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
				className: "project-film-source",
				href: `https://vimeo.com/${film.id}`,
				target: "_blank",
				rel: "noreferrer",
				children: [
					"Watch full ",
					mediaLabel,
					" on Vimeo"
				]
			}),
			detail && sourceLink && nativeFilm && "end" in nativeFilm && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "project-film-source",
				"aria-pressed": full,
				onClick: () => {
					setFull((value) => !value);
					setPaused(false);
					setManual(true);
				},
				children: full ? "Watch short reel" : `Watch full ${mediaLabel}`
			})
		]
	});
}
//#endregion
//#region app/work/project-image-dimensions.json
var project_image_dimensions_default = {
	"/portfolio-carousel/adam-fuss/01.webp": {
		"width": 1500,
		"height": 931
	},
	"/portfolio-carousel/adam-fuss/02.webp": {
		"width": 1500,
		"height": 992
	},
	"/portfolio-carousel/adam-fuss/03.webp": {
		"width": 1500,
		"height": 993
	},
	"/portfolio-carousel/adam-fuss/04.webp": {
		"width": 1500,
		"height": 1004
	},
	"/portfolio-carousel/adam-fuss/05.webp": {
		"width": 1500,
		"height": 992
	},
	"/portfolio-carousel/adam-fuss/06.webp": {
		"width": 1500,
		"height": 1006
	},
	"/portfolio-carousel/adam-fuss/07.webp": {
		"width": 1500,
		"height": 1008
	},
	"/portfolio-carousel/adam-fuss/08.webp": {
		"width": 1500,
		"height": 998
	},
	"/portfolio-carousel/brooklyn-museum/05.webp": {
		"width": 1440,
		"height": 1920
	},
	"/portfolio-carousel/cooper-hewitt/04.webp": {
		"width": 1012,
		"height": 990
	},
	"/portfolio-carousel/david-bowie/01.webp": {
		"width": 1920,
		"height": 1080
	},
	"/portfolio-carousel/david-bowie/02.webp": {
		"width": 1010,
		"height": 1218
	},
	"/portfolio-carousel/david-bowie/03.webp": {
		"width": 1018,
		"height": 1218
	},
	"/portfolio-carousel/droog/01.webp": {
		"width": 300,
		"height": 234
	},
	"/portfolio-carousel/intel/06.webp": {
		"width": 481,
		"height": 731
	},
	"/portfolio-carousel/katrin-sigurdardottir/01.webp": {
		"width": 1414,
		"height": 934
	},
	"/portfolio-carousel/katrin-sigurdardottir/02.webp": {
		"width": 1440,
		"height": 1920
	},
	"/portfolio-carousel/katrin-sigurdardottir/03.webp": {
		"width": 951,
		"height": 714
	},
	"/portfolio-carousel/museum-city-new-york/04.webp": {
		"width": 1488,
		"height": 994
	},
	"/portfolio-carousel/nabisco/03.webp": {
		"width": 713,
		"height": 522
	},
	"/portfolio-carousel/new-museum/02.webp": {
		"width": 1401,
		"height": 776
	},
	"/portfolio-carousel/new-museum/03.webp": {
		"width": 1667,
		"height": 935
	},
	"/portfolio-carousel/new-museum/06.webp": {
		"width": 898,
		"height": 897
	},
	"/portfolio-carousel/new-museum/07.webp": {
		"width": 1672,
		"height": 928
	},
	"/portfolio-carousel/new-museum/08.webp": {
		"width": 1166,
		"height": 774
	},
	"/portfolio-carousel/new-museum/10.webp": {
		"width": 1033,
		"height": 774
	},
	"/portfolio-carousel/new-museum/11.webp": {
		"width": 478,
		"height": 594
	},
	"/portfolio-carousel/new-museum/12.webp": {
		"width": 1920,
		"height": 1280
	},
	"/portfolio-carousel/noguchi-museum/04.webp": {
		"width": 640,
		"height": 300
	},
	"/portfolio-carousel/noguchi-museum/05.webp": {
		"width": 661,
		"height": 482
	},
	"/portfolio-carousel/noguchi-museum/06.webp": {
		"width": 908,
		"height": 654
	},
	"/portfolio-carousel/noguchi-museum/07.webp": {
		"width": 1338,
		"height": 990
	},
	"/portfolio-carousel/saul-melman-jadu-beta/05.webp": {
		"width": 713,
		"height": 474
	},
	"/portfolio-carousel/socrates-sculpture-park/01.webp": {
		"width": 1400,
		"height": 934
	},
	"/portfolio-carousel/socrates-sculpture-park/02.webp": {
		"width": 678,
		"height": 465
	},
	"/portfolio-carousel/socrates-sculpture-park/05.webp": {
		"width": 711,
		"height": 534
	},
	"/portfolio-carousel/socrates-sculpture-park/06.webp": {
		"width": 716,
		"height": 534
	},
	"/portfolio-carousel/socrates-sculpture-park/07.webp": {
		"width": 715,
		"height": 533
	},
	"/portfolio-carousel/sonos-janelle-monae/01.webp": {
		"width": 905,
		"height": 902
	},
	"/portfolio-carousel/sonos-janelle-monae/03.webp": {
		"width": 897,
		"height": 894
	},
	"/portfolio-carousel/sonos-janelle-monae/04.webp": {
		"width": 1204,
		"height": 836
	},
	"/portfolio-carousel/sonos-janelle-monae/05.webp": {
		"width": 679,
		"height": 894
	},
	"/portfolio-carousel/sonos-janelle-monae/06.webp": {
		"width": 594,
		"height": 396
	},
	"/project-galleries/2012-us-olympics/01.webp": {
		"width": 849,
		"height": 565
	},
	"/project-galleries/2012-us-olympics/02.webp": {
		"width": 925,
		"height": 568
	},
	"/project-galleries/2012-us-olympics/03.webp": {
		"width": 840,
		"height": 568
	},
	"/project-galleries/2012-us-olympics/04.webp": {
		"width": 790,
		"height": 563
	},
	"/project-galleries/2012-us-olympics/05.webp": {
		"width": 914,
		"height": 559
	},
	"/project-galleries/archive/06.webp": {
		"width": 300,
		"height": 200
	},
	"/project-galleries/archive/07.webp": {
		"width": 300,
		"height": 198
	},
	"/project-galleries/archive/08.webp": {
		"width": 300,
		"height": 198
	},
	"/project-galleries/archive/09.webp": {
		"width": 300,
		"height": 300
	},
	"/project-galleries/archive/13.webp": {
		"width": 215,
		"height": 213
	},
	"/project-galleries/archive/16.webp": {
		"width": 300,
		"height": 199
	},
	"/project-galleries/archive/18.webp": {
		"width": 300,
		"height": 210
	},
	"/project-galleries/archive/19.webp": {
		"width": 300,
		"height": 182
	},
	"/project-galleries/archive/20.webp": {
		"width": 300,
		"height": 200
	},
	"/project-galleries/archive/21.webp": {
		"width": 300,
		"height": 190
	},
	"/project-galleries/archive/22.webp": {
		"width": 300,
		"height": 199
	},
	"/project-galleries/archive/23.webp": {
		"width": 300,
		"height": 225
	},
	"/project-galleries/archive/24.webp": {
		"width": 300,
		"height": 203
	},
	"/project-galleries/archive/25.webp": {
		"width": 300,
		"height": 460
	},
	"/project-galleries/archive/26.webp": {
		"width": 300,
		"height": 234
	},
	"/project-galleries/ascend/02.webp": {
		"width": 1400,
		"height": 929
	},
	"/project-galleries/ascend/03.webp": {
		"width": 1400,
		"height": 791
	},
	"/project-galleries/ascend/03-color-20261101.webp": {
		"width": 1400,
		"height": 791
	},
	"/project-galleries/ascend/05.webp": {
		"width": 1400,
		"height": 780
	},
	"/project-galleries/ascend/05-color-20261101.webp": {
		"width": 1400,
		"height": 780
	},
	"/project-galleries/ascend/06.webp": {
		"width": 1170,
		"height": 1172
	},
	"/project-galleries/ascend/06-color-20261101.webp": {
		"width": 1170,
		"height": 1172
	},
	"/project-galleries/ascend/07.webp": {
		"width": 1400,
		"height": 791
	},
	"/project-galleries/beat-repeat/01.webp": {
		"width": 295,
		"height": 166
	},
	"/project-galleries/beat-repeat/02.webp": {
		"width": 1400,
		"height": 789
	},
	"/project-galleries/beat-repeat/03.webp": {
		"width": 1400,
		"height": 784
	},
	"/project-galleries/beat-repeat/04.webp": {
		"width": 1400,
		"height": 785
	},
	"/project-galleries/beat-repeat/05.webp": {
		"width": 1400,
		"height": 782
	},
	"/project-galleries/best-of-all-possible-worlds/02.webp": {
		"width": 776,
		"height": 611
	},
	"/project-galleries/best-of-all-possible-worlds/03.webp": {
		"width": 925,
		"height": 689
	},
	"/project-galleries/best-of-all-possible-worlds/04.webp": {
		"width": 714,
		"height": 477
	},
	"/project-galleries/best-of-all-possible-worlds/05.webp": {
		"width": 716,
		"height": 533
	},
	"/project-galleries/best-of-all-possible-worlds/decordova-2018.jpg": {
		"width": 1400,
		"height": 1029
	},
	"/project-galleries/best-of-all-possible-worlds/decordova-detail-2018.jpg": {
		"width": 1056,
		"height": 792
	},
	"/project-galleries/bldg-92/01.webp": {
		"width": 964,
		"height": 587
	},
	"/project-galleries/bldg-92/02.webp": {
		"width": 706,
		"height": 483
	},
	"/project-galleries/bldg-92/03.webp": {
		"width": 807,
		"height": 584
	},
	"/project-galleries/bldg-92/04.webp": {
		"width": 878,
		"height": 586
	},
	"/project-galleries/bldg-92/05.webp": {
		"width": 879,
		"height": 582
	},
	"/project-galleries/bronx-science-holocaust-museum/01.png": {
		"width": 800,
		"height": 533
	},
	"/project-galleries/brooklyn-museum/01.webp": {
		"width": 1400,
		"height": 934
	},
	"/project-galleries/brooklyn-museum/02.webp": {
		"width": 2500,
		"height": 3333
	},
	"/project-galleries/brooklyn-museum/03.webp": {
		"width": 1109,
		"height": 1400
	},
	"/project-galleries/brooklyn-museum/04.webp": {
		"width": 2500,
		"height": 3333
	},
	"/project-galleries/central-governor/01.png": {
		"width": 1448,
		"height": 1086
	},
	"/project-galleries/central-governor/02.png": {
		"width": 1086,
		"height": 1448
	},
	"/project-galleries/central-governor/performance-2010.jpg": {
		"width": 1056,
		"height": 703
	},
	"/project-galleries/china-institute/completed-gallery-front.jpg": {
		"width": 2e3,
		"height": 1125
	},
	"/project-galleries/china-institute/completed-gallery-panorama.jpg": {
		"width": 2e3,
		"height": 804
	},
	"/project-galleries/china-institute/completed-gallery-wall.jpg": {
		"width": 2e3,
		"height": 1333
	},
	"/project-galleries/china-institute/finished-exterior.jpg": {
		"width": 2e3,
		"height": 1250
	},
	"/project-galleries/china-institute/finished-main-gallery.jpg": {
		"width": 2e3,
		"height": 1125
	},
	"/project-galleries/coney-island-carousel-museum/01.png": {
		"width": 800,
		"height": 533
	},
	"/project-galleries/cooper-hewitt/01.webp": {
		"width": 1400,
		"height": 933
	},
	"/project-galleries/cooper-hewitt/02.webp": {
		"width": 1400,
		"height": 929
	},
	"/project-galleries/cooper-hewitt/03.webp": {
		"width": 1400,
		"height": 933
	},
	"/project-galleries/cooper-hewitt/06.webp": {
		"width": 518,
		"height": 516
	},
	"/project-galleries/cooper-hewitt/07.webp": {
		"width": 504,
		"height": 514
	},
	"/project-galleries/cooper-hewitt/08.webp": {
		"width": 518,
		"height": 520
	},
	"/project-galleries/core-nyc/01.webp": {
		"width": 1400,
		"height": 933
	},
	"/project-galleries/core-nyc/02.webp": {
		"width": 1400,
		"height": 933
	},
	"/project-galleries/core-nyc/03.webp": {
		"width": 1400,
		"height": 933
	},
	"/project-galleries/core-nyc/05.webp": {
		"width": 1400,
		"height": 933
	},
	"/project-galleries/dia-beacon/01.webp": {
		"width": 1400,
		"height": 852
	},
	"/project-galleries/dia-beacon/02.webp": {
		"width": 1396,
		"height": 972
	},
	"/project-galleries/dia-beacon/03.webp": {
		"width": 1400,
		"height": 871
	},
	"/project-galleries/dream-machine/01.webp": {
		"width": 1920,
		"height": 1274
	},
	"/project-galleries/dream-machine/02.webp": {
		"width": 1920,
		"height": 1075
	},
	"/project-galleries/dream-machine/03.webp": {
		"width": 1920,
		"height": 1282
	},
	"/project-galleries/dream-machine/04.webp": {
		"width": 1920,
		"height": 1069
	},
	"/project-galleries/dream-machine/05.webp": {
		"width": 1920,
		"height": 1241
	},
	"/project-galleries/electric-jukebox/01.webp": {
		"width": 1400,
		"height": 867
	},
	"/project-galleries/electric-jukebox/02.webp": {
		"width": 662,
		"height": 452
	},
	"/project-galleries/fox-studios-titanic/01.webp": {
		"width": 1592,
		"height": 990
	},
	"/project-galleries/fox-studios-titanic/02.webp": {
		"width": 1396,
		"height": 998
	},
	"/project-galleries/fox-studios-titanic/03.webp": {
		"width": 1800,
		"height": 1066
	},
	"/project-galleries/fox-studios-titanic/04.webp": {
		"width": 1694,
		"height": 986
	},
	"/project-galleries/fox-studios-titanic/05.webp": {
		"width": 812,
		"height": 998
	},
	"/project-galleries/fox-studios-titanic/06.webp": {
		"width": 1800,
		"height": 724
	},
	"/project-galleries/heart-bot/01.webp": {
		"width": 640,
		"height": 360
	},
	"/project-galleries/heart-bot/02.webp": {
		"width": 1124,
		"height": 741
	},
	"/project-galleries/heart-bot/03.webp": {
		"width": 614,
		"height": 594
	},
	"/project-galleries/heart-bot/04.webp": {
		"width": 1003,
		"height": 840
	},
	"/project-galleries/heart-bot/05.webp": {
		"width": 1400,
		"height": 807
	},
	"/project-galleries/heart-bot/06.webp": {
		"width": 1400,
		"height": 796
	},
	"/project-galleries/heart-bot/07.webp": {
		"width": 1400,
		"height": 788
	},
	"/project-galleries/heliogram-series/01.jpg": {
		"width": 1056,
		"height": 1583
	},
	"/project-galleries/heliogram-series/02.jpg": {
		"width": 854,
		"height": 1280
	},
	"/project-galleries/heliogram-series/03.jpg": {
		"width": 1280,
		"height": 854
	},
	"/project-galleries/holocaust-by-bullets/01.webp": {
		"width": 667,
		"height": 406
	},
	"/project-galleries/holocaust-by-bullets/02.webp": {
		"width": 617,
		"height": 407
	},
	"/project-galleries/holocaust-by-bullets/03.webp": {
		"width": 665,
		"height": 431
	},
	"/project-galleries/holocaust-by-bullets/04.webp": {
		"width": 621,
		"height": 427
	},
	"/project-galleries/hunt-for-paradise/01.webp": {
		"width": 2062,
		"height": 1376
	},
	"/project-galleries/hunt-for-paradise/02.webp": {
		"width": 2102,
		"height": 1370
	},
	"/project-galleries/hunt-for-paradise/03.webp": {
		"width": 1960,
		"height": 1378
	},
	"/project-galleries/hunt-for-paradise/04.webp": {
		"width": 2262,
		"height": 1382
	},
	"/project-galleries/hunt-for-paradise/05.webp": {
		"width": 2302,
		"height": 1328
	},
	"/project-galleries/hunt-for-paradise/06.webp": {
		"width": 908,
		"height": 1382
	},
	"/project-galleries/hunt-for-paradise/07.webp": {
		"width": 1092,
		"height": 1376
	},
	"/project-galleries/hunt-for-paradise/08.webp": {
		"width": 2076,
		"height": 1380
	},
	"/project-galleries/hunt-for-paradise/09.webp": {
		"width": 1924,
		"height": 1382
	},
	"/project-galleries/hunt-for-paradise/10.webp": {
		"width": 2296,
		"height": 1234
	},
	"/project-galleries/hyatt-photo-booth/01.webp": {
		"width": 1400,
		"height": 827
	},
	"/project-galleries/hyatt-photo-booth/02.webp": {
		"width": 1400,
		"height": 777
	},
	"/project-galleries/hyatt-photo-booth/03.webp": {
		"width": 1400,
		"height": 778
	},
	"/project-galleries/hyatt-photo-booth/04.webp": {
		"width": 1400,
		"height": 789
	},
	"/project-galleries/hyatt-photo-booth/05.webp": {
		"width": 1400,
		"height": 769
	},
	"/project-galleries/hyatt-photo-booth/06.webp": {
		"width": 1286,
		"height": 784
	},
	"/project-galleries/jadu-beta/01.webp": {
		"width": 714,
		"height": 493
	},
	"/project-galleries/jadu-beta/02.webp": {
		"width": 715,
		"height": 534
	},
	"/project-galleries/jadu-beta/03.webp": {
		"width": 715,
		"height": 509
	},
	"/project-galleries/jadu-beta/04.webp": {
		"width": 713,
		"height": 574
	},
	"/project-galleries/jadu-beta/05.webp": {
		"width": 714,
		"height": 830
	},
	"/project-galleries/klaus-biesenbach-residence/01.webp": {
		"width": 1592,
		"height": 1056
	},
	"/project-galleries/m-is-for-museum/01.webp": {
		"width": 1125,
		"height": 840
	},
	"/project-galleries/m-is-for-museum/02.webp": {
		"width": 1536,
		"height": 1024
	},
	"/project-galleries/m-is-for-museum/03.webp": {
		"width": 352,
		"height": 630
	},
	"/project-galleries/m-is-for-museum/04.webp": {
		"width": 552,
		"height": 558
	},
	"/project-galleries/m-is-for-museum/05.webp": {
		"width": 1732,
		"height": 1218
	},
	"/project-galleries/m-is-for-museum/06.webp": {
		"width": 956,
		"height": 808
	},
	"/project-galleries/m-is-for-museum/07.webp": {
		"width": 1394,
		"height": 726
	},
	"/project-galleries/modigliani-beyond-the-myth/01.jpg": {
		"width": 1100,
		"height": 700
	},
	"/project-galleries/new-bamboo/01.webp": {
		"width": 1800,
		"height": 846
	},
	"/project-galleries/new-bamboo/02.webp": {
		"width": 1800,
		"height": 732
	},
	"/project-galleries/new-bamboo/03.webp": {
		"width": 1800,
		"height": 1179
	},
	"/project-galleries/new-bamboo/04.webp": {
		"width": 1800,
		"height": 1117
	},
	"/project-galleries/new-bamboo/05.webp": {
		"width": 1800,
		"height": 1064
	},
	"/project-galleries/new-bamboo/06.webp": {
		"width": 1800,
		"height": 1195
	},
	"/project-galleries/nike-free-hyperfeel/01.webp": {
		"width": 1400,
		"height": 792
	},
	"/project-galleries/nike-free-hyperfeel/02.webp": {
		"width": 900,
		"height": 600
	},
	"/project-galleries/nike-free-hyperfeel/03.webp": {
		"width": 900,
		"height": 600
	},
	"/project-galleries/nike-free-hyperfeel/04.webp": {
		"width": 900,
		"height": 600
	},
	"/project-galleries/nike-free-hyperfeel/05.webp": {
		"width": 467,
		"height": 700
	},
	"/project-galleries/nike-free-hyperfeel/06.webp": {
		"width": 1104,
		"height": 645
	},
	"/project-galleries/nike-free-hyperfeel/07.webp": {
		"width": 900,
		"height": 600
	},
	"/project-galleries/nike-free-hyperfeel/08.webp": {
		"width": 633,
		"height": 646
	},
	"/project-galleries/nike-free-hyperfeel/09.webp": {
		"width": 467,
		"height": 700
	},
	"/project-galleries/nike-free-hyperfeel/10.webp": {
		"width": 663,
		"height": 441
	},
	"/project-galleries/nike-free-hyperfeel/11.webp": {
		"width": 600,
		"height": 900
	},
	"/project-galleries/nike-free-hyperfeel/12.webp": {
		"width": 600,
		"height": 900
	},
	"/project-galleries/nike-free-hyperfeel/13.webp": {
		"width": 900,
		"height": 600
	},
	"/project-galleries/on-becoming-an-artist/02.webp": {
		"width": 516,
		"height": 385
	},
	"/project-galleries/on-becoming-an-artist/04.webp": {
		"width": 519,
		"height": 387
	},
	"/project-galleries/sacred-splendor/01.jpg": {
		"width": 1200,
		"height": 800
	},
	"/project-galleries/sacred-splendor/02.jpg": {
		"width": 720,
		"height": 514
	},
	"/project-galleries/sacred-splendor/03.jpg": {
		"width": 720,
		"height": 514
	},
	"/project-galleries/touro-loeb-visitors-center/01.png": {
		"width": 800,
		"height": 533
	},
	"/project-galleries/touro-loeb-visitors-center/02.png": {
		"width": 800,
		"height": 521
	},
	"/project-galleries/tumi/01.webp": {
		"width": 800,
		"height": 800
	},
	"/project-galleries/tumi/02.webp": {
		"width": 600,
		"height": 804
	},
	"/project-galleries/tumi/03.webp": {
		"width": 800,
		"height": 764
	},
	"/project-galleries/tumi/04.webp": {
		"width": 600,
		"height": 603
	},
	"/project-galleries/wheat-thins-popped/01.webp": {
		"width": 607,
		"height": 607
	},
	"/project-galleries/wheat-thins-popped/02.webp": {
		"width": 516,
		"height": 538
	},
	"/project-galleries/wheat-thins-popped/03.webp": {
		"width": 937,
		"height": 809
	},
	"/project-galleries/wheat-thins-popped/04.webp": {
		"width": 666,
		"height": 654
	},
	"/project-galleries/wheat-thins-popped/05.webp": {
		"width": 804,
		"height": 580
	},
	"/project-galleries/wheat-thins-popped/06.webp": {
		"width": 534,
		"height": 580
	},
	"/project-galleries/wheat-thins-popped/07.webp": {
		"width": 922,
		"height": 609
	},
	"/project-galleries/women-who-rock/01.webp": {
		"width": 977,
		"height": 640
	},
	"/project-galleries/women-who-rock/02.webp": {
		"width": 1123,
		"height": 638
	},
	"/project-galleries/women-who-rock/03.webp": {
		"width": 822,
		"height": 819
	},
	"/project-galleries/women-who-rock/04.webp": {
		"width": 502,
		"height": 329
	},
	"/project-galleries/women-who-rock/05.webp": {
		"width": 665,
		"height": 411
	},
	"/project-galleries/women-who-rock/06.webp": {
		"width": 722,
		"height": 301
	},
	"/project-research-images/ascend/source-214.webp": {
		"width": 640,
		"height": 360
	},
	"/project-research-images/ascend/source-215.webp": {
		"width": 640,
		"height": 360
	},
	"/project-research-images/ascend/source-215-clean-20261101.webp": {
		"width": 640,
		"height": 360
	},
	"/project-research-images/ascend/source-216.webp": {
		"width": 640,
		"height": 360
	},
	"/project-research-images/ascend/source-217.webp": {
		"width": 640,
		"height": 360
	},
	"/project-research-images/beat-repeat/source-081.webp": {
		"width": 849,
		"height": 440
	},
	"/project-research-images/beat-repeat/source-082.webp": {
		"width": 1500,
		"height": 992
	},
	"/project-research-images/beat-repeat/source-083.webp": {
		"width": 1500,
		"height": 1003
	},
	"/project-research-images/beat-repeat/source-202.webp": {
		"width": 1920,
		"height": 1080
	},
	"/project-research-images/beat-repeat/source-203.webp": {
		"width": 1920,
		"height": 1080
	},
	"/project-research-images/beat-repeat/source-205.webp": {
		"width": 1920,
		"height": 1080
	},
	"/project-research-images/beat-repeat/source-206.webp": {
		"width": 1920,
		"height": 1080
	},
	"/project-research-images/beat-repeat/source-207.webp": {
		"width": 1920,
		"height": 1080
	},
	"/project-research-images/beat-repeat/source-208.webp": {
		"width": 1920,
		"height": 1080
	},
	"/project-research-images/beat-repeat/source-209.webp": {
		"width": 1920,
		"height": 1080
	},
	"/project-research-images/beat-repeat/source-210.webp": {
		"width": 1920,
		"height": 1080
	},
	"/project-research-images/beat-repeat/source-211.webp": {
		"width": 1920,
		"height": 1080
	},
	"/project-research-images/beat-repeat/source-212.webp": {
		"width": 1920,
		"height": 1080
	},
	"/project-research-images/core-nyc/source-003.webp": {
		"width": 1500,
		"height": 1e3
	},
	"/project-research-images/core-nyc/source-004.webp": {
		"width": 1500,
		"height": 1e3
	},
	"/project-research-images/core-nyc/source-005.webp": {
		"width": 1500,
		"height": 1e3
	},
	"/project-research-images/core-nyc/source-006.webp": {
		"width": 1500,
		"height": 1e3
	},
	"/project-research-images/core-nyc/source-007.webp": {
		"width": 1500,
		"height": 1e3
	},
	"/project-research-images/core-nyc/source-008.webp": {
		"width": 1500,
		"height": 1e3
	},
	"/project-research-images/core-nyc/source-009.webp": {
		"width": 1500,
		"height": 2250
	},
	"/project-research-images/core-nyc/source-010.webp": {
		"width": 1500,
		"height": 1e3
	},
	"/project-research-images/holocaust-by-bullets/source-036.webp": {
		"width": 1500,
		"height": 997
	},
	"/project-research-images/holocaust-by-bullets/source-037.webp": {
		"width": 1500,
		"height": 997
	},
	"/project-research-images/hyatt-photo-booth/source-120.webp": {
		"width": 1500,
		"height": 822
	},
	"/project-research-images/hyatt-photo-booth/source-121.webp": {
		"width": 1301,
		"height": 848
	},
	"/project-research-images/wheat-thins-popped/source-218.webp": {
		"width": 1e3,
		"height": 687
	},
	"/project-research-images/wheat-thins-popped/source-219.webp": {
		"width": 1e3,
		"height": 687
	},
	"/project-research-images/wheat-thins-popped/source-220.webp": {
		"width": 1e3,
		"height": 687
	},
	"/project-research-images/wheat-thins-popped/source-221.webp": {
		"width": 1e3,
		"height": 687
	}
};
/**
* @license lucide-react v1.31.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var X = createLucideIcon("x", [["path", {
	d: "M18 6 6 18",
	key: "1bl5f8"
}], ["path", {
	d: "m6 6 12 12",
	key: "d8bk6v"
}]]);
//#endregion
//#region ../fieldtrip-v574/node_modules/@radix-ui/react-dialog/node_modules/@radix-ui/react-compose-refs/dist/index.mjs
var __defProp$9 = Object.defineProperty;
var __name$9 = (target, value) => __defProp$9(target, "name", {
	value,
	configurable: true
});
function setRef$3(ref, value) {
	if (typeof ref === "function") return ref(value);
	else if (ref !== null && ref !== void 0) ref.current = value;
}
__name$9(setRef$3, "setRef");
function composeRefs$2(...refs) {
	return (node) => {
		let hasCleanup = false;
		const cleanups = refs.map((ref) => {
			const cleanup = setRef$3(ref, node);
			if (!hasCleanup && typeof cleanup == "function") hasCleanup = true;
			return cleanup;
		});
		if (hasCleanup) return () => {
			for (let i = 0; i < cleanups.length; i++) {
				const cleanup = cleanups[i];
				if (typeof cleanup == "function") cleanup();
				else setRef$3(refs[i], null);
			}
		};
	};
}
__name$9(composeRefs$2, "composeRefs");
function useComposedRefs$2(...refs) {
	return import_react.useCallback(composeRefs$2(...refs), refs);
}
__name$9(useComposedRefs$2, "useComposedRefs");
//#endregion
//#region ../fieldtrip-v574/node_modules/@radix-ui/react-dismissable-layer/node_modules/@radix-ui/react-compose-refs/dist/index.mjs
var __defProp$8 = Object.defineProperty;
var __name$8 = (target, value) => __defProp$8(target, "name", {
	value,
	configurable: true
});
function setRef$2(ref, value) {
	if (typeof ref === "function") return ref(value);
	else if (ref !== null && ref !== void 0) ref.current = value;
}
__name$8(setRef$2, "setRef");
function composeRefs$1(...refs) {
	return (node) => {
		let hasCleanup = false;
		const cleanups = refs.map((ref) => {
			const cleanup = setRef$2(ref, node);
			if (!hasCleanup && typeof cleanup == "function") hasCleanup = true;
			return cleanup;
		});
		if (hasCleanup) return () => {
			for (let i = 0; i < cleanups.length; i++) {
				const cleanup = cleanups[i];
				if (typeof cleanup == "function") cleanup();
				else setRef$2(refs[i], null);
			}
		};
	};
}
__name$8(composeRefs$1, "composeRefs");
function useComposedRefs$1(...refs) {
	return import_react.useCallback(composeRefs$1(...refs), refs);
}
__name$8(useComposedRefs$1, "useComposedRefs");
//#endregion
//#region ../fieldtrip-v574/node_modules/@radix-ui/react-dismissable-layer/dist/index.mjs
var __defProp$7 = Object.defineProperty;
var __name$7 = (target, value) => __defProp$7(target, "name", {
	value,
	configurable: true
});
var CONTEXT_UPDATE = "dismissableLayer.update";
var POINTER_DOWN_OUTSIDE = "dismissableLayer.pointerDownOutside";
var FOCUS_OUTSIDE = "dismissableLayer.focusOutside";
var originalBodyPointerEvents;
var DismissableLayerContext = import_react.createContext({
	layers: /* @__PURE__ */ new Set(),
	layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
	branches: /* @__PURE__ */ new Set(),
	dismissableSurfaces: /* @__PURE__ */ new Set()
});
var DismissableLayer = /* @__PURE__ */ import_react.forwardRef(/* @__PURE__ */ __name$7(function DismissableLayer2(props, forwardedRef) {
	const { disableOutsidePointerEvents = false, deferPointerDownOutside = false, onEscapeKeyDown, onPointerDownOutside, onFocusOutside, onInteractOutside, onDismiss, ...layerProps } = props;
	const context = import_react.useContext(DismissableLayerContext);
	const [node, setNode] = import_react.useState(null);
	const ownerDocument = node?.ownerDocument ?? globalThis?.document;
	const [, force] = import_react.useState({});
	const composedRefs = useComposedRefs$1(forwardedRef, setNode);
	const layers = Array.from(context.layers);
	const [highestLayerWithOutsidePointerEventsDisabled] = [...context.layersWithOutsidePointerEventsDisabled].slice(-1);
	const highestLayerWithOutsidePointerEventsDisabledIndex = highestLayerWithOutsidePointerEventsDisabled ? layers.indexOf(highestLayerWithOutsidePointerEventsDisabled) : -1;
	const index = node ? layers.indexOf(node) : -1;
	const isBodyPointerEventsDisabled = context.layersWithOutsidePointerEventsDisabled.size > 0;
	const isPointerEventsEnabled = index >= highestLayerWithOutsidePointerEventsDisabledIndex;
	const isDeferredPointerDownOutsideRef = import_react.useRef(false);
	const pointerDownOutside = usePointerDownOutside((event) => {
		onPointerDownOutside?.(event);
		onInteractOutside?.(event);
		if (!event.defaultPrevented) onDismiss?.();
	}, {
		ownerDocument,
		deferPointerDownOutside,
		isDeferredPointerDownOutsideRef,
		dismissableSurfaces: context.dismissableSurfaces,
		shouldHandlePointerDownOutside: import_react.useCallback((target) => {
			if (!(target instanceof Node)) return false;
			const isPointerDownOnBranch = [...context.branches].some((branch) => branch.contains(target));
			return isPointerEventsEnabled && !isPointerDownOnBranch;
		}, [context.branches, isPointerEventsEnabled])
	});
	const focusOutside = useFocusOutside((event) => {
		if (deferPointerDownOutside && isDeferredPointerDownOutsideRef.current) return;
		const target = event.target;
		if ([...context.branches].some((branch) => branch.contains(target))) return;
		onFocusOutside?.(event);
		onInteractOutside?.(event);
		if (!event.defaultPrevented) onDismiss?.();
	}, ownerDocument);
	const isHighestLayer = node ? index === layers.length - 1 : false;
	const handleKeyDown = useCallbackRef$1((event) => {
		if (event.key !== "Escape") return;
		onEscapeKeyDown?.(event);
		if (!event.defaultPrevented && onDismiss) {
			event.preventDefault();
			onDismiss();
		}
	});
	import_react.useEffect(() => {
		if (!isHighestLayer) return;
		ownerDocument.addEventListener("keydown", handleKeyDown, { capture: true });
		return () => ownerDocument.removeEventListener("keydown", handleKeyDown, { capture: true });
	}, [
		ownerDocument,
		isHighestLayer,
		handleKeyDown
	]);
	import_react.useEffect(() => {
		if (!node) return;
		if (disableOutsidePointerEvents) {
			if (context.layersWithOutsidePointerEventsDisabled.size === 0) {
				originalBodyPointerEvents = ownerDocument.body.style.pointerEvents;
				ownerDocument.body.style.pointerEvents = "none";
			}
			context.layersWithOutsidePointerEventsDisabled.add(node);
		}
		context.layers.add(node);
		dispatchUpdate();
		return () => {
			if (disableOutsidePointerEvents) {
				context.layersWithOutsidePointerEventsDisabled.delete(node);
				if (context.layersWithOutsidePointerEventsDisabled.size === 0) ownerDocument.body.style.pointerEvents = originalBodyPointerEvents;
			}
		};
	}, [
		node,
		ownerDocument,
		disableOutsidePointerEvents,
		context
	]);
	import_react.useEffect(() => {
		return () => {
			if (!node) return;
			context.layers.delete(node);
			context.layersWithOutsidePointerEventsDisabled.delete(node);
			dispatchUpdate();
		};
	}, [node, context]);
	import_react.useEffect(() => {
		const handleUpdate = /* @__PURE__ */ __name$7(() => force({}), "handleUpdate");
		document.addEventListener(CONTEXT_UPDATE, handleUpdate);
		return () => document.removeEventListener(CONTEXT_UPDATE, handleUpdate);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
		...layerProps,
		ref: composedRefs,
		style: {
			pointerEvents: isBodyPointerEventsDisabled ? isPointerEventsEnabled ? "auto" : "none" : void 0,
			...props.style
		},
		onFocusCapture: composeEventHandlers(props.onFocusCapture, focusOutside.onFocusCapture),
		onBlurCapture: composeEventHandlers(props.onBlurCapture, focusOutside.onBlurCapture),
		onPointerDownCapture: composeEventHandlers(props.onPointerDownCapture, pointerDownOutside.onPointerDownCapture)
	});
}, "DismissableLayer"));
function useDismissableLayerSurface() {
	const context = import_react.useContext(DismissableLayerContext);
	const [node, setNode] = import_react.useState(null);
	import_react.useEffect(() => {
		if (!node) return;
		context.dismissableSurfaces.add(node);
		return () => {
			context.dismissableSurfaces.delete(node);
		};
	}, [node, context.dismissableSurfaces]);
	return setNode;
}
__name$7(useDismissableLayerSurface, "useDismissableLayerSurface");
var IS_TRUE = /* @__PURE__ */ __name$7(() => true, "IS_TRUE");
function usePointerDownOutside(onPointerDownOutside, args) {
	const { ownerDocument = globalThis?.document, deferPointerDownOutside = false, isDeferredPointerDownOutsideRef, dismissableSurfaces, shouldHandlePointerDownOutside = IS_TRUE } = args;
	const handlePointerDownOutside = useCallbackRef$1(onPointerDownOutside);
	const isPointerInsideReactTreeRef = import_react.useRef(false);
	const isPointerDownOutsideRef = import_react.useRef(false);
	const interceptedOutsideInteractionEventsRef = import_react.useRef(/* @__PURE__ */ new Map());
	const handleClickRef = import_react.useRef(() => {});
	import_react.useEffect(() => {
		function resetOutsideInteraction() {
			isPointerDownOutsideRef.current = false;
			isDeferredPointerDownOutsideRef.current = false;
			interceptedOutsideInteractionEventsRef.current.clear();
		}
		__name$7(resetOutsideInteraction, "resetOutsideInteraction");
		function isOutsideInteractionIntercepted() {
			return Array.from(interceptedOutsideInteractionEventsRef.current.values()).some(Boolean);
		}
		__name$7(isOutsideInteractionIntercepted, "isOutsideInteractionIntercepted");
		function handleInteractionCapture(event) {
			if (!isPointerDownOutsideRef.current) return;
			const target = event.target;
			if (!(target instanceof Node && [...dismissableSurfaces].some((surface) => surface.contains(target)))) interceptedOutsideInteractionEventsRef.current.set(event.type, true);
			if (event.type === "click") window.setTimeout(() => {
				if (isPointerDownOutsideRef.current) handleClickRef.current();
			}, 0);
		}
		__name$7(handleInteractionCapture, "handleInteractionCapture");
		function handleInteractionBubble(event) {
			if (isPointerDownOutsideRef.current) interceptedOutsideInteractionEventsRef.current.set(event.type, false);
		}
		__name$7(handleInteractionBubble, "handleInteractionBubble");
		const handlePointerDown = /* @__PURE__ */ __name$7((event) => {
			if (event.target && !isPointerInsideReactTreeRef.current) {
				let handleAndDispatchPointerDownOutsideEvent2 = function() {
					ownerDocument.removeEventListener("click", handleClickRef.current);
					const wasOutsideInteractionIntercepted = isOutsideInteractionIntercepted();
					resetOutsideInteraction();
					if (!wasOutsideInteractionIntercepted) handleAndDispatchCustomEvent(POINTER_DOWN_OUTSIDE, handlePointerDownOutside, eventDetail, { discrete: true });
				};
				__name$7(handleAndDispatchPointerDownOutsideEvent2, "handleAndDispatchPointerDownOutsideEvent");
				if (!shouldHandlePointerDownOutside(event.target)) {
					ownerDocument.removeEventListener("click", handleClickRef.current);
					resetOutsideInteraction();
					isPointerInsideReactTreeRef.current = false;
					return;
				}
				const eventDetail = { originalEvent: event };
				isPointerDownOutsideRef.current = true;
				isDeferredPointerDownOutsideRef.current = deferPointerDownOutside && event.button === 0;
				interceptedOutsideInteractionEventsRef.current.clear();
				if (!deferPointerDownOutside || event.button !== 0) handleAndDispatchPointerDownOutsideEvent2();
				else {
					ownerDocument.removeEventListener("click", handleClickRef.current);
					handleClickRef.current = handleAndDispatchPointerDownOutsideEvent2;
					ownerDocument.addEventListener("click", handleClickRef.current, { once: true });
				}
			} else {
				ownerDocument.removeEventListener("click", handleClickRef.current);
				resetOutsideInteraction();
			}
			isPointerInsideReactTreeRef.current = false;
		}, "handlePointerDown");
		const outsideInteractionEvents = [
			"pointerup",
			"mousedown",
			"mouseup",
			"touchstart",
			"touchend",
			"click"
		];
		for (const eventName of outsideInteractionEvents) {
			ownerDocument.addEventListener(eventName, handleInteractionCapture, true);
			ownerDocument.addEventListener(eventName, handleInteractionBubble);
		}
		const timerId = window.setTimeout(() => {
			ownerDocument.addEventListener("pointerdown", handlePointerDown);
		}, 0);
		return () => {
			window.clearTimeout(timerId);
			ownerDocument.removeEventListener("pointerdown", handlePointerDown);
			ownerDocument.removeEventListener("click", handleClickRef.current);
			for (const eventName of outsideInteractionEvents) {
				ownerDocument.removeEventListener(eventName, handleInteractionCapture, true);
				ownerDocument.removeEventListener(eventName, handleInteractionBubble);
			}
		};
	}, [
		ownerDocument,
		handlePointerDownOutside,
		deferPointerDownOutside,
		isDeferredPointerDownOutsideRef,
		dismissableSurfaces,
		shouldHandlePointerDownOutside
	]);
	return { onPointerDownCapture: /* @__PURE__ */ __name$7(() => isPointerInsideReactTreeRef.current = true, "onPointerDownCapture") };
}
__name$7(usePointerDownOutside, "usePointerDownOutside");
function useFocusOutside(onFocusOutside, ownerDocument = globalThis?.document) {
	const handleFocusOutside = useCallbackRef$1(onFocusOutside);
	const isFocusInsideReactTreeRef = import_react.useRef(false);
	import_react.useEffect(() => {
		const handleFocus = /* @__PURE__ */ __name$7((event) => {
			if (event.target && !isFocusInsideReactTreeRef.current) handleAndDispatchCustomEvent(FOCUS_OUTSIDE, handleFocusOutside, { originalEvent: event }, { discrete: false });
		}, "handleFocus");
		ownerDocument.addEventListener("focusin", handleFocus);
		return () => ownerDocument.removeEventListener("focusin", handleFocus);
	}, [ownerDocument, handleFocusOutside]);
	return {
		onFocusCapture: /* @__PURE__ */ __name$7(() => isFocusInsideReactTreeRef.current = true, "onFocusCapture"),
		onBlurCapture: /* @__PURE__ */ __name$7(() => isFocusInsideReactTreeRef.current = false, "onBlurCapture")
	};
}
__name$7(useFocusOutside, "useFocusOutside");
function dispatchUpdate() {
	const event = new CustomEvent(CONTEXT_UPDATE);
	document.dispatchEvent(event);
}
__name$7(dispatchUpdate, "dispatchUpdate");
function handleAndDispatchCustomEvent(name, handler, detail, { discrete }) {
	const target = detail.originalEvent.target;
	const event = new CustomEvent(name, {
		bubbles: false,
		cancelable: true,
		detail
	});
	if (handler) target.addEventListener(name, handler, { once: true });
	if (discrete) dispatchDiscreteCustomEvent(target, event);
	else target.dispatchEvent(event);
}
__name$7(handleAndDispatchCustomEvent, "handleAndDispatchCustomEvent");
//#endregion
//#region ../fieldtrip-v574/node_modules/@radix-ui/react-focus-scope/node_modules/@radix-ui/react-compose-refs/dist/index.mjs
var __defProp$6 = Object.defineProperty;
var __name$6 = (target, value) => __defProp$6(target, "name", {
	value,
	configurable: true
});
function setRef$1(ref, value) {
	if (typeof ref === "function") return ref(value);
	else if (ref !== null && ref !== void 0) ref.current = value;
}
__name$6(setRef$1, "setRef");
function composeRefs(...refs) {
	return (node) => {
		let hasCleanup = false;
		const cleanups = refs.map((ref) => {
			const cleanup = setRef$1(ref, node);
			if (!hasCleanup && typeof cleanup == "function") hasCleanup = true;
			return cleanup;
		});
		if (hasCleanup) return () => {
			for (let i = 0; i < cleanups.length; i++) {
				const cleanup = cleanups[i];
				if (typeof cleanup == "function") cleanup();
				else setRef$1(refs[i], null);
			}
		};
	};
}
__name$6(composeRefs, "composeRefs");
function useComposedRefs(...refs) {
	return import_react.useCallback(composeRefs(...refs), refs);
}
__name$6(useComposedRefs, "useComposedRefs");
//#endregion
//#region ../fieldtrip-v574/node_modules/@radix-ui/react-focus-scope/dist/index.mjs
var __defProp$5 = Object.defineProperty;
var __name$5 = (target, value) => __defProp$5(target, "name", {
	value,
	configurable: true
});
var AUTOFOCUS_ON_MOUNT = "focusScope.autoFocusOnMount";
var AUTOFOCUS_ON_UNMOUNT = "focusScope.autoFocusOnUnmount";
var EVENT_OPTIONS = {
	bubbles: false,
	cancelable: true
};
var FocusScope = /* @__PURE__ */ import_react.forwardRef(/* @__PURE__ */ __name$5(function FocusScope2(props, forwardedRef) {
	const { loop = false, trapped = false, onMountAutoFocus: onMountAutoFocusProp, onUnmountAutoFocus: onUnmountAutoFocusProp, ...scopeProps } = props;
	const [container, setContainer] = import_react.useState(null);
	const onMountAutoFocus = useCallbackRef$1(onMountAutoFocusProp);
	const onUnmountAutoFocus = useCallbackRef$1(onUnmountAutoFocusProp);
	const lastFocusedElementRef = import_react.useRef(null);
	const composedRefs = useComposedRefs(forwardedRef, setContainer);
	const focusScope = import_react.useRef({
		paused: false,
		pause() {
			this.paused = true;
		},
		resume() {
			this.paused = false;
		}
	}).current;
	import_react.useEffect(() => {
		if (trapped) {
			let handleFocusIn2 = function(event) {
				if (focusScope.paused || !container) return;
				const target = event.target;
				if (container.contains(target)) lastFocusedElementRef.current = target;
				else focus(lastFocusedElementRef.current, { select: true });
			}, handleFocusOut2 = function(event) {
				if (focusScope.paused || !container) return;
				const relatedTarget = event.relatedTarget;
				if (relatedTarget === null) return;
				if (!container.contains(relatedTarget)) focus(lastFocusedElementRef.current, { select: true });
			}, handleMutations2 = function(mutations) {
				if (document.activeElement !== document.body) return;
				for (const mutation of mutations) if (mutation.removedNodes.length > 0) focus(container);
			};
			__name$5(handleFocusIn2, "handleFocusIn");
			__name$5(handleFocusOut2, "handleFocusOut");
			__name$5(handleMutations2, "handleMutations");
			document.addEventListener("focusin", handleFocusIn2);
			document.addEventListener("focusout", handleFocusOut2);
			const mutationObserver = new MutationObserver(handleMutations2);
			if (container) mutationObserver.observe(container, {
				childList: true,
				subtree: true
			});
			return () => {
				document.removeEventListener("focusin", handleFocusIn2);
				document.removeEventListener("focusout", handleFocusOut2);
				mutationObserver.disconnect();
			};
		}
	}, [
		trapped,
		container,
		focusScope.paused
	]);
	import_react.useEffect(() => {
		if (container) {
			focusScopesStack.add(focusScope);
			const previouslyFocusedElement = document.activeElement;
			if (!container.contains(previouslyFocusedElement)) {
				const mountEvent = new CustomEvent(AUTOFOCUS_ON_MOUNT, EVENT_OPTIONS);
				container.addEventListener(AUTOFOCUS_ON_MOUNT, onMountAutoFocus);
				container.dispatchEvent(mountEvent);
				if (!mountEvent.defaultPrevented) {
					focusFirst(removeLinks(getTabbableCandidates(container)), { select: true });
					if (document.activeElement === previouslyFocusedElement) focus(container);
				}
			}
			return () => {
				container.removeEventListener(AUTOFOCUS_ON_MOUNT, onMountAutoFocus);
				setTimeout(() => {
					const unmountEvent = new CustomEvent(AUTOFOCUS_ON_UNMOUNT, EVENT_OPTIONS);
					container.addEventListener(AUTOFOCUS_ON_UNMOUNT, onUnmountAutoFocus);
					container.dispatchEvent(unmountEvent);
					if (!unmountEvent.defaultPrevented) focus(previouslyFocusedElement ?? document.body, { select: true });
					container.removeEventListener(AUTOFOCUS_ON_UNMOUNT, onUnmountAutoFocus);
					focusScopesStack.remove(focusScope);
				}, 0);
			};
		}
	}, [
		container,
		onMountAutoFocus,
		onUnmountAutoFocus,
		focusScope
	]);
	const handleKeyDown = import_react.useCallback((event) => {
		if (!loop && !trapped) return;
		if (focusScope.paused) return;
		const isTabKey = event.key === "Tab" && !event.altKey && !event.ctrlKey && !event.metaKey;
		const focusedElement = document.activeElement;
		if (isTabKey && focusedElement) {
			const container2 = event.currentTarget;
			const [first, last] = getTabbableEdges(container2);
			if (!(first && last)) {
				if (focusedElement === container2) event.preventDefault();
			} else if (!event.shiftKey && focusedElement === last) {
				event.preventDefault();
				if (loop) focus(first, { select: true });
			} else if (event.shiftKey && focusedElement === first) {
				event.preventDefault();
				if (loop) focus(last, { select: true });
			}
		}
	}, [
		loop,
		trapped,
		focusScope.paused
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
		tabIndex: -1,
		...scopeProps,
		ref: composedRefs,
		onKeyDown: handleKeyDown
	});
}, "FocusScope"));
function focusFirst(candidates, { select = false } = {}) {
	const previouslyFocusedElement = document.activeElement;
	for (const candidate of candidates) {
		focus(candidate, { select });
		if (document.activeElement !== previouslyFocusedElement) return;
	}
}
__name$5(focusFirst, "focusFirst");
function getTabbableEdges(container) {
	const candidates = getTabbableCandidates(container);
	return [findVisible(candidates, container), findVisible(candidates.reverse(), container)];
}
__name$5(getTabbableEdges, "getTabbableEdges");
function getTabbableCandidates(container) {
	const nodes = [];
	const walker = document.createTreeWalker(container, NodeFilter.SHOW_ELEMENT, { acceptNode: /* @__PURE__ */ __name$5((node) => {
		const isHiddenInput = node.tagName === "INPUT" && node.type === "hidden";
		if (node.disabled || node.hidden || isHiddenInput) return NodeFilter.FILTER_SKIP;
		return node.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
	}, "acceptNode") });
	while (walker.nextNode()) nodes.push(walker.currentNode);
	return nodes;
}
__name$5(getTabbableCandidates, "getTabbableCandidates");
function findVisible(elements, container) {
	const canUseCheckVisibility = typeof container.checkVisibility === "function" && container.checkVisibility({ checkVisibilityCSS: true });
	for (const element of elements) if (!(canUseCheckVisibility ? !element.checkVisibility({ checkVisibilityCSS: true }) : isHidden(element, { upTo: container }))) return element;
}
__name$5(findVisible, "findVisible");
function isHidden(node, { upTo }) {
	if (getComputedStyle(node).visibility === "hidden") return true;
	while (node) {
		if (upTo !== void 0 && node === upTo) return false;
		if (getComputedStyle(node).display === "none") return true;
		node = node.parentElement;
	}
	return false;
}
__name$5(isHidden, "isHidden");
function isSelectableInput(element) {
	return element instanceof HTMLInputElement && "select" in element;
}
__name$5(isSelectableInput, "isSelectableInput");
function focus(element, { select = false } = {}) {
	if (element && element.focus) {
		const previouslyFocusedElement = document.activeElement;
		element.focus({ preventScroll: true });
		if (element !== previouslyFocusedElement && isSelectableInput(element) && select) element.select();
	}
}
__name$5(focus, "focus");
var focusScopesStack = createFocusScopesStack();
function createFocusScopesStack() {
	let stack = [];
	return {
		add(focusScope) {
			const activeFocusScope = stack[0];
			if (focusScope !== activeFocusScope) activeFocusScope?.pause();
			stack = arrayRemove(stack, focusScope);
			stack.unshift(focusScope);
		},
		remove(focusScope) {
			stack = arrayRemove(stack, focusScope);
			stack[0]?.resume();
		}
	};
}
__name$5(createFocusScopesStack, "createFocusScopesStack");
function arrayRemove(array, item) {
	const updatedArray = [...array];
	const index = updatedArray.indexOf(item);
	if (index !== -1) updatedArray.splice(index, 1);
	return updatedArray;
}
__name$5(arrayRemove, "arrayRemove");
function removeLinks(items) {
	return items.filter((item) => item.tagName !== "A");
}
__name$5(removeLinks, "removeLinks");
//#endregion
//#region ../fieldtrip-v574/node_modules/@radix-ui/react-portal/dist/index.mjs
var import_react_dom = /* @__PURE__ */ __toESM(require_react_dom(), 1);
var __defProp$4 = Object.defineProperty;
var __name$4 = (target, value) => __defProp$4(target, "name", {
	value,
	configurable: true
});
var Portal = /* @__PURE__ */ import_react.forwardRef(/* @__PURE__ */ __name$4(function Portal2(props, forwardedRef) {
	const { container: containerProp, ...portalProps } = props;
	const [mounted, setMounted] = import_react.useState(false);
	useLayoutEffect2(() => setMounted(true), []);
	const container = containerProp || mounted && globalThis?.document?.body;
	return container ? import_react_dom.createPortal(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
		...portalProps,
		ref: forwardedRef
	}), container) : null;
}, "Portal"));
//#endregion
//#region ../fieldtrip-v574/node_modules/@radix-ui/react-presence/dist/index.mjs
var __defProp$3 = Object.defineProperty;
var __name$3 = (target, value) => __defProp$3(target, "name", {
	value,
	configurable: true
});
function useStateMachine(initialState, machine) {
	return import_react.useReducer((state, event) => {
		return machine[state][event] ?? state;
	}, initialState);
}
__name$3(useStateMachine, "useStateMachine");
var Presence = /* @__PURE__ */ __name$3((props) => {
	const { present, children } = props;
	const presence = usePresence(present);
	const child = typeof children === "function" ? children({ present: presence.isPresent }) : import_react.Children.only(children);
	const ref = useStableComposedRefs(presence.ref, getElementRef$1(child));
	return typeof children === "function" || presence.isPresent ? import_react.cloneElement(child, { ref }) : null;
}, "Presence");
function usePresence(present) {
	const [node, setNode] = import_react.useState();
	const stylesRef = import_react.useRef(null);
	const prevPresentRef = import_react.useRef(present);
	const prevAnimationNameRef = import_react.useRef("none");
	const mountAnimationNameRef = import_react.useRef(void 0);
	const [state, send] = useStateMachine(present ? "mounted" : "unmounted", {
		mounted: {
			UNMOUNT: "unmounted",
			ANIMATION_OUT: "unmountSuspended"
		},
		unmountSuspended: {
			MOUNT: "mounted",
			ANIMATION_END: "unmounted"
		},
		unmounted: { MOUNT: "mounted" }
	});
	import_react.useEffect(() => {
		if (state === "mounted") {
			prevAnimationNameRef.current = mountAnimationNameRef.current ?? getAnimationName(stylesRef.current);
			mountAnimationNameRef.current = void 0;
		} else prevAnimationNameRef.current = "none";
	}, [state]);
	useLayoutEffect2(() => {
		const styles = stylesRef.current;
		const wasPresent = prevPresentRef.current;
		if (wasPresent !== present) {
			const prevAnimationName = prevAnimationNameRef.current;
			const currentAnimationName = getAnimationName(styles);
			if (present) {
				mountAnimationNameRef.current = currentAnimationName;
				send("MOUNT");
			} else if (currentAnimationName === "none" || styles?.display === "none") send("UNMOUNT");
			else if (wasPresent && prevAnimationName !== currentAnimationName) send("ANIMATION_OUT");
			else send("UNMOUNT");
			prevPresentRef.current = present;
		}
	}, [present, send]);
	useLayoutEffect2(() => {
		if (node) {
			let timeoutId;
			const ownerWindow = node.ownerDocument.defaultView ?? window;
			const handleAnimationEnd = /* @__PURE__ */ __name$3((event) => {
				const isCurrentAnimation = getAnimationName(stylesRef.current).includes(CSS.escape(event.animationName));
				if (event.target === node && isCurrentAnimation) {
					send("ANIMATION_END");
					if (!prevPresentRef.current) {
						const currentFillMode = node.style.animationFillMode;
						node.style.animationFillMode = "forwards";
						timeoutId = ownerWindow.setTimeout(() => {
							if (node.style.animationFillMode === "forwards") node.style.animationFillMode = currentFillMode;
						});
					}
				}
			}, "handleAnimationEnd");
			const handleAnimationStart = /* @__PURE__ */ __name$3((event) => {
				if (event.target === node) prevAnimationNameRef.current = getAnimationName(stylesRef.current);
			}, "handleAnimationStart");
			node.addEventListener("animationstart", handleAnimationStart);
			node.addEventListener("animationcancel", handleAnimationEnd);
			node.addEventListener("animationend", handleAnimationEnd);
			return () => {
				ownerWindow.clearTimeout(timeoutId);
				node.removeEventListener("animationstart", handleAnimationStart);
				node.removeEventListener("animationcancel", handleAnimationEnd);
				node.removeEventListener("animationend", handleAnimationEnd);
			};
		} else send("ANIMATION_END");
	}, [node, send]);
	return {
		isPresent: ["mounted", "unmountSuspended"].includes(state),
		ref: import_react.useCallback((node2) => {
			if (node2) {
				const styles = getComputedStyle(node2);
				stylesRef.current = styles;
				mountAnimationNameRef.current = getAnimationName(styles);
			} else stylesRef.current = null;
			setNode(node2);
		}, [])
	};
}
__name$3(usePresence, "usePresence");
function setRef(ref, value) {
	if (typeof ref === "function") return ref(value);
	else if (ref !== null && ref !== void 0) ref.current = value;
}
__name$3(setRef, "setRef");
function useStableComposedRefs(...refs) {
	const refsRef = import_react.useRef(refs);
	refsRef.current = refs;
	return import_react.useCallback((node) => {
		const currentRefs = refsRef.current;
		let hasCleanup = false;
		const cleanups = currentRefs.map((ref) => {
			const cleanup = setRef(ref, node);
			if (!hasCleanup && typeof cleanup === "function") hasCleanup = true;
			return cleanup;
		});
		if (hasCleanup) return () => {
			for (let i = 0; i < cleanups.length; i++) {
				const cleanup = cleanups[i];
				if (typeof cleanup === "function") cleanup();
				else setRef(currentRefs[i], null);
			}
		};
	}, []);
}
__name$3(useStableComposedRefs, "useStableComposedRefs");
function getAnimationName(styles) {
	return styles?.animationName || "none";
}
__name$3(getAnimationName, "getAnimationName");
function getElementRef$1(element) {
	let getter = Object.getOwnPropertyDescriptor(element.props, "ref")?.get;
	let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
	if (mayWarn) return element.ref;
	getter = Object.getOwnPropertyDescriptor(element, "ref")?.get;
	mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
	if (mayWarn) return element.props.ref;
	return element.props.ref || element.ref;
}
__name$3(getElementRef$1, "getElementRef");
//#endregion
//#region ../fieldtrip-v574/node_modules/@radix-ui/react-focus-guards/dist/index.mjs
var __defProp$2 = Object.defineProperty;
var __name$2 = (target, value) => __defProp$2(target, "name", {
	value,
	configurable: true
});
var count = 0;
var guards = null;
function FocusGuards(props) {
	useFocusGuards();
	return props.children;
}
__name$2(FocusGuards, "FocusGuards");
function useFocusGuards() {
	import_react.useEffect(() => {
		if (!guards) guards = {
			start: createFocusGuard(),
			end: createFocusGuard()
		};
		const { start, end } = guards;
		if (document.body.firstElementChild !== start) document.body.insertAdjacentElement("afterbegin", start);
		if (document.body.lastElementChild !== end) document.body.insertAdjacentElement("beforeend", end);
		count++;
		return () => {
			if (count === 1) {
				guards?.start.remove();
				guards?.end.remove();
				guards = null;
			}
			count = Math.max(0, count - 1);
		};
	}, []);
}
__name$2(useFocusGuards, "useFocusGuards");
function createFocusGuard() {
	const element = document.createElement("span");
	element.setAttribute("data-radix-focus-guard", "");
	element.tabIndex = 0;
	element.style.outline = "none";
	element.style.opacity = "0";
	element.style.position = "fixed";
	element.style.pointerEvents = "none";
	return element;
}
__name$2(createFocusGuard, "createFocusGuard");
//#endregion
//#region ../fieldtrip-v574/node_modules/tslib/tslib.es6.mjs
var __assign = function() {
	__assign = Object.assign || function __assign(t) {
		for (var s, i = 1, n = arguments.length; i < n; i++) {
			s = arguments[i];
			for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
		}
		return t;
	};
	return __assign.apply(this, arguments);
};
function __rest(s, e) {
	var t = {};
	for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
	if (s != null && typeof Object.getOwnPropertySymbols === "function") {
		for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
	}
	return t;
}
function __spreadArray(to, from, pack) {
	if (pack || arguments.length === 2) {
		for (var i = 0, l = from.length, ar; i < l; i++) if (ar || !(i in from)) {
			if (!ar) ar = Array.prototype.slice.call(from, 0, i);
			ar[i] = from[i];
		}
	}
	return to.concat(ar || Array.prototype.slice.call(from));
}
//#endregion
//#region ../fieldtrip-v574/node_modules/react-remove-scroll-bar/dist/es2015/constants.js
var zeroRightClassName = "right-scroll-bar-position";
var fullWidthClassName = "width-before-scroll-bar";
var noScrollbarsClassName = "with-scroll-bars-hidden";
/**
* Name of a CSS variable containing the amount of "hidden" scrollbar
* ! might be undefined ! use will fallback!
*/
var removedBarSizeVariable = "--removed-body-scroll-bar-size";
//#endregion
//#region ../fieldtrip-v574/node_modules/use-callback-ref/dist/es2015/assignRef.js
/**
* Assigns a value for a given ref, no matter of the ref format
* @param {RefObject} ref - a callback function or ref object
* @param value - a new value
*
* @see https://github.com/theKashey/use-callback-ref#assignref
* @example
* const refObject = useRef();
* const refFn = (ref) => {....}
*
* assignRef(refObject, "refValue");
* assignRef(refFn, "refValue");
*/
function assignRef(ref, value) {
	if (typeof ref === "function") ref(value);
	else if (ref) ref.current = value;
	return ref;
}
//#endregion
//#region ../fieldtrip-v574/node_modules/use-callback-ref/dist/es2015/useRef.js
/**
* creates a MutableRef with ref change callback
* @param initialValue - initial ref value
* @param {Function} callback - a callback to run when value changes
*
* @example
* const ref = useCallbackRef(0, (newValue, oldValue) => console.log(oldValue, '->', newValue);
* ref.current = 1;
* // prints 0 -> 1
*
* @see https://reactjs.org/docs/hooks-reference.html#useref
* @see https://github.com/theKashey/use-callback-ref#usecallbackref---to-replace-reactuseref
* @returns {MutableRefObject}
*/
function useCallbackRef(initialValue, callback) {
	var ref = (0, import_react.useState)(function() {
		return {
			value: initialValue,
			callback,
			facade: {
				get current() {
					return ref.value;
				},
				set current(value) {
					var last = ref.value;
					if (last !== value) {
						ref.value = value;
						ref.callback(value, last);
					}
				}
			}
		};
	})[0];
	ref.callback = callback;
	return ref.facade;
}
//#endregion
//#region ../fieldtrip-v574/node_modules/use-callback-ref/dist/es2015/useMergeRef.js
var useIsomorphicLayoutEffect = typeof window !== "undefined" ? import_react.useLayoutEffect : import_react.useEffect;
var currentValues = /* @__PURE__ */ new WeakMap();
/**
* Merges two or more refs together providing a single interface to set their value
* @param {RefObject|Ref} refs
* @returns {MutableRefObject} - a new ref, which translates all changes to {refs}
*
* @see {@link mergeRefs} a version without buit-in memoization
* @see https://github.com/theKashey/use-callback-ref#usemergerefs
* @example
* const Component = React.forwardRef((props, ref) => {
*   const ownRef = useRef();
*   const domRef = useMergeRefs([ref, ownRef]); // 👈 merge together
*   return <div ref={domRef}>...</div>
* }
*/
function useMergeRefs(refs, defaultValue) {
	var callbackRef = useCallbackRef(defaultValue || null, function(newValue) {
		return refs.forEach(function(ref) {
			return assignRef(ref, newValue);
		});
	});
	useIsomorphicLayoutEffect(function() {
		var oldValue = currentValues.get(callbackRef);
		if (oldValue) {
			var prevRefs_1 = new Set(oldValue);
			var nextRefs_1 = new Set(refs);
			var current_1 = callbackRef.current;
			prevRefs_1.forEach(function(ref) {
				if (!nextRefs_1.has(ref)) assignRef(ref, null);
			});
			nextRefs_1.forEach(function(ref) {
				if (!prevRefs_1.has(ref)) assignRef(ref, current_1);
			});
		}
		currentValues.set(callbackRef, refs);
	}, [refs]);
	return callbackRef;
}
//#endregion
//#region ../fieldtrip-v574/node_modules/use-sidecar/dist/es2015/medium.js
function ItoI(a) {
	return a;
}
function innerCreateMedium(defaults, middleware) {
	if (middleware === void 0) middleware = ItoI;
	var buffer = [];
	var assigned = false;
	return {
		read: function() {
			if (assigned) throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
			if (buffer.length) return buffer[buffer.length - 1];
			return defaults;
		},
		useMedium: function(data) {
			var item = middleware(data, assigned);
			buffer.push(item);
			return function() {
				buffer = buffer.filter(function(x) {
					return x !== item;
				});
			};
		},
		assignSyncMedium: function(cb) {
			assigned = true;
			while (buffer.length) {
				var cbs = buffer;
				buffer = [];
				cbs.forEach(cb);
			}
			buffer = {
				push: function(x) {
					return cb(x);
				},
				filter: function() {
					return buffer;
				}
			};
		},
		assignMedium: function(cb) {
			assigned = true;
			var pendingQueue = [];
			if (buffer.length) {
				var cbs = buffer;
				buffer = [];
				cbs.forEach(cb);
				pendingQueue = buffer;
			}
			var executeQueue = function() {
				var cbs = pendingQueue;
				pendingQueue = [];
				cbs.forEach(cb);
			};
			var cycle = function() {
				return Promise.resolve().then(executeQueue);
			};
			cycle();
			buffer = {
				push: function(x) {
					pendingQueue.push(x);
					cycle();
				},
				filter: function(filter) {
					pendingQueue = pendingQueue.filter(filter);
					return buffer;
				}
			};
		}
	};
}
function createSidecarMedium(options) {
	if (options === void 0) options = {};
	var medium = innerCreateMedium(null);
	medium.options = __assign({
		async: true,
		ssr: false
	}, options);
	return medium;
}
//#endregion
//#region ../fieldtrip-v574/node_modules/use-sidecar/dist/es2015/exports.js
var SideCar = function(_a) {
	var sideCar = _a.sideCar, rest = __rest(_a, ["sideCar"]);
	if (!sideCar) throw new Error("Sidecar: please provide `sideCar` property to import the right car");
	var Target = sideCar.read();
	if (!Target) throw new Error("Sidecar medium not found");
	return import_react.createElement(Target, __assign({}, rest));
};
SideCar.isSideCarExport = true;
function exportSidecar(medium, exported) {
	medium.useMedium(exported);
	return SideCar;
}
//#endregion
//#region ../fieldtrip-v574/node_modules/react-remove-scroll/dist/es2015/medium.js
var effectCar = createSidecarMedium();
//#endregion
//#region ../fieldtrip-v574/node_modules/react-remove-scroll/dist/es2015/UI.js
var nothing = function() {};
/**
* Removes scrollbar from the page and contain the scroll within the Lock
*/
var RemoveScroll = import_react.forwardRef(function(props, parentRef) {
	var ref = import_react.useRef(null);
	var _a = import_react.useState({
		onScrollCapture: nothing,
		onWheelCapture: nothing,
		onTouchMoveCapture: nothing
	}), callbacks = _a[0], setCallbacks = _a[1];
	var forwardProps = props.forwardProps, children = props.children, className = props.className, removeScrollBar = props.removeScrollBar, enabled = props.enabled, shards = props.shards, sideCar = props.sideCar, noRelative = props.noRelative, noIsolation = props.noIsolation, inert = props.inert, allowPinchZoom = props.allowPinchZoom, _b = props.as, Container = _b === void 0 ? "div" : _b, gapMode = props.gapMode, rest = __rest(props, [
		"forwardProps",
		"children",
		"className",
		"removeScrollBar",
		"enabled",
		"shards",
		"sideCar",
		"noRelative",
		"noIsolation",
		"inert",
		"allowPinchZoom",
		"as",
		"gapMode"
	]);
	var SideCar = sideCar;
	var containerRef = useMergeRefs([ref, parentRef]);
	var containerProps = __assign(__assign({}, rest), callbacks);
	return import_react.createElement(import_react.Fragment, null, enabled && import_react.createElement(SideCar, {
		sideCar: effectCar,
		removeScrollBar,
		shards,
		noRelative,
		noIsolation,
		inert,
		setCallbacks,
		allowPinchZoom: !!allowPinchZoom,
		lockRef: ref,
		gapMode
	}), forwardProps ? import_react.cloneElement(import_react.Children.only(children), __assign(__assign({}, containerProps), { ref: containerRef })) : import_react.createElement(Container, __assign({}, containerProps, {
		className,
		ref: containerRef
	}), children));
});
RemoveScroll.defaultProps = {
	enabled: true,
	removeScrollBar: true,
	inert: false
};
RemoveScroll.classNames = {
	fullWidth: fullWidthClassName,
	zeroRight: zeroRightClassName
};
//#endregion
//#region ../fieldtrip-v574/node_modules/get-nonce/dist/es2015/index.js
var currentNonce;
var getNonce = function() {
	if (currentNonce) return currentNonce;
	if (typeof __webpack_nonce__ !== "undefined") return __webpack_nonce__;
};
//#endregion
//#region ../fieldtrip-v574/node_modules/react-style-singleton/dist/es2015/singleton.js
function makeStyleTag() {
	if (!document) return null;
	var tag = document.createElement("style");
	tag.type = "text/css";
	var nonce = getNonce();
	if (nonce) tag.setAttribute("nonce", nonce);
	return tag;
}
function injectStyles(tag, css) {
	if (tag.styleSheet) tag.styleSheet.cssText = css;
	else tag.appendChild(document.createTextNode(css));
}
function insertStyleTag(tag) {
	(document.head || document.getElementsByTagName("head")[0]).appendChild(tag);
}
var stylesheetSingleton = function() {
	var counter = 0;
	var stylesheet = null;
	return {
		add: function(style) {
			if (counter == 0) {
				if (stylesheet = makeStyleTag()) {
					injectStyles(stylesheet, style);
					insertStyleTag(stylesheet);
				}
			}
			counter++;
		},
		remove: function() {
			counter--;
			if (!counter && stylesheet) {
				stylesheet.parentNode && stylesheet.parentNode.removeChild(stylesheet);
				stylesheet = null;
			}
		}
	};
};
//#endregion
//#region ../fieldtrip-v574/node_modules/react-style-singleton/dist/es2015/hook.js
/**
* creates a hook to control style singleton
* @see {@link styleSingleton} for a safer component version
* @example
* ```tsx
* const useStyle = styleHookSingleton();
* ///
* useStyle('body { overflow: hidden}');
*/
var styleHookSingleton = function() {
	var sheet = stylesheetSingleton();
	return function(styles, isDynamic) {
		import_react.useEffect(function() {
			sheet.add(styles);
			return function() {
				sheet.remove();
			};
		}, [styles && isDynamic]);
	};
};
//#endregion
//#region ../fieldtrip-v574/node_modules/react-style-singleton/dist/es2015/component.js
/**
* create a Component to add styles on demand
* - styles are added when first instance is mounted
* - styles are removed when the last instance is unmounted
* - changing styles in runtime does nothing unless dynamic is set. But with multiple components that can lead to the undefined behavior
*/
var styleSingleton = function() {
	var useStyle = styleHookSingleton();
	var Sheet = function(_a) {
		var styles = _a.styles, dynamic = _a.dynamic;
		useStyle(styles, dynamic);
		return null;
	};
	return Sheet;
};
//#endregion
//#region ../fieldtrip-v574/node_modules/react-remove-scroll-bar/dist/es2015/utils.js
var zeroGap = {
	left: 0,
	top: 0,
	right: 0,
	gap: 0
};
var parse = function(x) {
	return parseInt(x || "", 10) || 0;
};
var getOffset = function(gapMode) {
	var cs = window.getComputedStyle(document.body);
	var left = cs[gapMode === "padding" ? "paddingLeft" : "marginLeft"];
	var top = cs[gapMode === "padding" ? "paddingTop" : "marginTop"];
	var right = cs[gapMode === "padding" ? "paddingRight" : "marginRight"];
	return [
		parse(left),
		parse(top),
		parse(right)
	];
};
var getGapWidth = function(gapMode) {
	if (gapMode === void 0) gapMode = "margin";
	if (typeof window === "undefined") return zeroGap;
	var offsets = getOffset(gapMode);
	var documentWidth = document.documentElement.clientWidth;
	var windowWidth = window.innerWidth;
	return {
		left: offsets[0],
		top: offsets[1],
		right: offsets[2],
		gap: Math.max(0, windowWidth - documentWidth + offsets[2] - offsets[0])
	};
};
//#endregion
//#region ../fieldtrip-v574/node_modules/react-remove-scroll-bar/dist/es2015/component.js
var Style = styleSingleton();
var lockAttribute = "data-scroll-locked";
var getStyles = function(_a, allowRelative, gapMode, important) {
	var left = _a.left, top = _a.top, right = _a.right, gap = _a.gap;
	if (gapMode === void 0) gapMode = "margin";
	return "\n  .".concat(noScrollbarsClassName, " {\n   overflow: hidden ").concat(important, ";\n   padding-right: ").concat(gap, "px ").concat(important, ";\n  }\n  body[").concat(lockAttribute, "] {\n    overflow: hidden ").concat(important, ";\n    overscroll-behavior: contain;\n    ").concat([
		allowRelative && "position: relative ".concat(important, ";"),
		gapMode === "margin" && "\n    padding-left: ".concat(left, "px;\n    padding-top: ").concat(top, "px;\n    padding-right: ").concat(right, "px;\n    margin-left:0;\n    margin-top:0;\n    margin-right: ").concat(gap, "px ").concat(important, ";\n    "),
		gapMode === "padding" && "padding-right: ".concat(gap, "px ").concat(important, ";")
	].filter(Boolean).join(""), "\n  }\n  \n  .").concat(zeroRightClassName, " {\n    right: ").concat(gap, "px ").concat(important, ";\n  }\n  \n  .").concat(fullWidthClassName, " {\n    margin-right: ").concat(gap, "px ").concat(important, ";\n  }\n  \n  .").concat(zeroRightClassName, " .").concat(zeroRightClassName, " {\n    right: 0 ").concat(important, ";\n  }\n  \n  .").concat(fullWidthClassName, " .").concat(fullWidthClassName, " {\n    margin-right: 0 ").concat(important, ";\n  }\n  \n  body[").concat(lockAttribute, "] {\n    ").concat(removedBarSizeVariable, ": ").concat(gap, "px;\n  }\n");
};
var getCurrentUseCounter = function() {
	var counter = parseInt(document.body.getAttribute("data-scroll-locked") || "0", 10);
	return isFinite(counter) ? counter : 0;
};
var useLockAttribute = function() {
	import_react.useEffect(function() {
		document.body.setAttribute(lockAttribute, (getCurrentUseCounter() + 1).toString());
		return function() {
			var newCounter = getCurrentUseCounter() - 1;
			if (newCounter <= 0) document.body.removeAttribute(lockAttribute);
			else document.body.setAttribute(lockAttribute, newCounter.toString());
		};
	}, []);
};
/**
* Removes page scrollbar and blocks page scroll when mounted
*/
var RemoveScrollBar = function(_a) {
	var noRelative = _a.noRelative, noImportant = _a.noImportant, _b = _a.gapMode, gapMode = _b === void 0 ? "margin" : _b;
	useLockAttribute();
	var gap = import_react.useMemo(function() {
		return getGapWidth(gapMode);
	}, [gapMode]);
	return import_react.createElement(Style, { styles: getStyles(gap, !noRelative, gapMode, !noImportant ? "!important" : "") });
};
//#endregion
//#region ../fieldtrip-v574/node_modules/react-remove-scroll/dist/es2015/aggresiveCapture.js
var passiveSupported = false;
if (typeof window !== "undefined") try {
	var options = Object.defineProperty({}, "passive", { get: function() {
		passiveSupported = true;
		return true;
	} });
	window.addEventListener("test", options, options);
	window.removeEventListener("test", options, options);
} catch (err) {
	passiveSupported = false;
}
var nonPassive = passiveSupported ? { passive: false } : false;
//#endregion
//#region ../fieldtrip-v574/node_modules/react-remove-scroll/dist/es2015/handleScroll.js
var alwaysContainsScroll = function(node) {
	return node.tagName === "TEXTAREA";
};
var elementCanBeScrolled = function(node, overflow) {
	if (!(node instanceof Element)) return false;
	var styles = window.getComputedStyle(node);
	return styles[overflow] !== "hidden" && !(styles.overflowY === styles.overflowX && !alwaysContainsScroll(node) && styles[overflow] === "visible");
};
var elementCouldBeVScrolled = function(node) {
	return elementCanBeScrolled(node, "overflowY");
};
var elementCouldBeHScrolled = function(node) {
	return elementCanBeScrolled(node, "overflowX");
};
var locationCouldBeScrolled = function(axis, node) {
	var ownerDocument = node.ownerDocument;
	var current = node;
	do {
		if (typeof ShadowRoot !== "undefined" && current instanceof ShadowRoot) current = current.host;
		if (elementCouldBeScrolled(axis, current)) {
			var _a = getScrollVariables(axis, current);
			if (_a[1] > _a[2]) return true;
		}
		current = current.parentNode;
	} while (current && current !== ownerDocument.body);
	return false;
};
var getVScrollVariables = function(_a) {
	return [
		_a.scrollTop,
		_a.scrollHeight,
		_a.clientHeight
	];
};
var getHScrollVariables = function(_a) {
	return [
		_a.scrollLeft,
		_a.scrollWidth,
		_a.clientWidth
	];
};
var elementCouldBeScrolled = function(axis, node) {
	return axis === "v" ? elementCouldBeVScrolled(node) : elementCouldBeHScrolled(node);
};
var getScrollVariables = function(axis, node) {
	return axis === "v" ? getVScrollVariables(node) : getHScrollVariables(node);
};
var getDirectionFactor = function(axis, direction) {
	/**
	* If the element's direction is rtl (right-to-left), then scrollLeft is 0 when the scrollbar is at its rightmost position,
	* and then increasingly negative as you scroll towards the end of the content.
	* @see https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollLeft
	*/
	return axis === "h" && direction === "rtl" ? -1 : 1;
};
var handleScroll = function(axis, endTarget, event, sourceDelta, noOverscroll) {
	var directionFactor = getDirectionFactor(axis, window.getComputedStyle(endTarget).direction);
	var delta = directionFactor * sourceDelta;
	var target = event.target;
	var targetInLock = endTarget.contains(target);
	var shouldCancelScroll = false;
	var isDeltaPositive = delta > 0;
	var availableScroll = 0;
	var availableScrollTop = 0;
	do {
		if (!target) break;
		var _a = getScrollVariables(axis, target), position = _a[0];
		var elementScroll = _a[1] - _a[2] - directionFactor * position;
		if (position || elementScroll) {
			if (elementCouldBeScrolled(axis, target)) {
				availableScroll += elementScroll;
				availableScrollTop += position;
			}
		}
		var parent_1 = target.parentNode;
		target = parent_1 && parent_1.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? parent_1.host : parent_1;
	} while (!targetInLock && target !== document.body || targetInLock && (endTarget.contains(target) || endTarget === target));
	if (isDeltaPositive && (noOverscroll && Math.abs(availableScroll) < 1 || !noOverscroll && delta > availableScroll)) shouldCancelScroll = true;
	else if (!isDeltaPositive && (noOverscroll && Math.abs(availableScrollTop) < 1 || !noOverscroll && -delta > availableScrollTop)) shouldCancelScroll = true;
	return shouldCancelScroll;
};
//#endregion
//#region ../fieldtrip-v574/node_modules/react-remove-scroll/dist/es2015/SideEffect.js
var getTouchXY = function(event) {
	return "changedTouches" in event ? [event.changedTouches[0].clientX, event.changedTouches[0].clientY] : [0, 0];
};
var getDeltaXY = function(event) {
	return [event.deltaX, event.deltaY];
};
var extractRef = function(ref) {
	return ref && "current" in ref ? ref.current : ref;
};
var deltaCompare = function(x, y) {
	return x[0] === y[0] && x[1] === y[1];
};
var generateStyle = function(id) {
	return "\n  .block-interactivity-".concat(id, " {pointer-events: none;}\n  .allow-interactivity-").concat(id, " {pointer-events: all;}\n");
};
var idCounter = 0;
var lockStack = [];
function RemoveScrollSideCar(props) {
	var shouldPreventQueue = import_react.useRef([]);
	var touchStartRef = import_react.useRef([0, 0]);
	var activeAxis = import_react.useRef();
	var id = import_react.useState(idCounter++)[0];
	var Style = import_react.useState(styleSingleton)[0];
	var lastProps = import_react.useRef(props);
	import_react.useEffect(function() {
		lastProps.current = props;
	}, [props]);
	import_react.useEffect(function() {
		if (props.inert) {
			document.body.classList.add("block-interactivity-".concat(id));
			var allow_1 = __spreadArray([props.lockRef.current], (props.shards || []).map(extractRef), true).filter(Boolean);
			allow_1.forEach(function(el) {
				return el.classList.add("allow-interactivity-".concat(id));
			});
			return function() {
				document.body.classList.remove("block-interactivity-".concat(id));
				allow_1.forEach(function(el) {
					return el.classList.remove("allow-interactivity-".concat(id));
				});
			};
		}
	}, [
		props.inert,
		props.lockRef.current,
		props.shards
	]);
	var shouldCancelEvent = import_react.useCallback(function(event, parent) {
		if ("touches" in event && event.touches.length === 2 || event.type === "wheel" && event.ctrlKey) return !lastProps.current.allowPinchZoom;
		var touch = getTouchXY(event);
		var touchStart = touchStartRef.current;
		var deltaX = "deltaX" in event ? event.deltaX : touchStart[0] - touch[0];
		var deltaY = "deltaY" in event ? event.deltaY : touchStart[1] - touch[1];
		var currentAxis;
		var target = event.target;
		var moveDirection = Math.abs(deltaX) > Math.abs(deltaY) ? "h" : "v";
		if ("touches" in event && moveDirection === "h" && target.type === "range") return false;
		var selection = window.getSelection();
		var anchorNode = selection && selection.anchorNode;
		if (anchorNode ? anchorNode === target || anchorNode.contains(target) : false) return false;
		var canBeScrolledInMainDirection = locationCouldBeScrolled(moveDirection, target);
		if (!canBeScrolledInMainDirection) return true;
		if (canBeScrolledInMainDirection) currentAxis = moveDirection;
		else {
			currentAxis = moveDirection === "v" ? "h" : "v";
			canBeScrolledInMainDirection = locationCouldBeScrolled(moveDirection, target);
		}
		if (!canBeScrolledInMainDirection) return false;
		if (!activeAxis.current && "changedTouches" in event && (deltaX || deltaY)) activeAxis.current = currentAxis;
		if (!currentAxis) return true;
		var cancelingAxis = activeAxis.current || currentAxis;
		return handleScroll(cancelingAxis, parent, event, cancelingAxis === "h" ? deltaX : deltaY, true);
	}, []);
	var shouldPrevent = import_react.useCallback(function(_event) {
		var event = _event;
		if (!lockStack.length || lockStack[lockStack.length - 1] !== Style) return;
		var delta = "deltaY" in event ? getDeltaXY(event) : getTouchXY(event);
		var sourceEvent = shouldPreventQueue.current.filter(function(e) {
			return e.name === event.type && (e.target === event.target || event.target === e.shadowParent) && deltaCompare(e.delta, delta);
		})[0];
		if (sourceEvent && sourceEvent.should) {
			if (event.cancelable) event.preventDefault();
			return;
		}
		if (!sourceEvent) {
			var shardNodes = (lastProps.current.shards || []).map(extractRef).filter(Boolean).filter(function(node) {
				return node.contains(event.target);
			});
			if (shardNodes.length > 0 ? shouldCancelEvent(event, shardNodes[0]) : !lastProps.current.noIsolation) {
				if (event.cancelable) event.preventDefault();
			}
		}
	}, []);
	var shouldCancel = import_react.useCallback(function(name, delta, target, should) {
		var event = {
			name,
			delta,
			target,
			should,
			shadowParent: getOutermostShadowParent(target)
		};
		shouldPreventQueue.current.push(event);
		setTimeout(function() {
			shouldPreventQueue.current = shouldPreventQueue.current.filter(function(e) {
				return e !== event;
			});
		}, 1);
	}, []);
	var scrollTouchStart = import_react.useCallback(function(event) {
		touchStartRef.current = getTouchXY(event);
		activeAxis.current = void 0;
	}, []);
	var scrollWheel = import_react.useCallback(function(event) {
		shouldCancel(event.type, getDeltaXY(event), event.target, shouldCancelEvent(event, props.lockRef.current));
	}, []);
	var scrollTouchMove = import_react.useCallback(function(event) {
		shouldCancel(event.type, getTouchXY(event), event.target, shouldCancelEvent(event, props.lockRef.current));
	}, []);
	import_react.useEffect(function() {
		lockStack.push(Style);
		props.setCallbacks({
			onScrollCapture: scrollWheel,
			onWheelCapture: scrollWheel,
			onTouchMoveCapture: scrollTouchMove
		});
		document.addEventListener("wheel", shouldPrevent, nonPassive);
		document.addEventListener("touchmove", shouldPrevent, nonPassive);
		document.addEventListener("touchstart", scrollTouchStart, nonPassive);
		return function() {
			lockStack = lockStack.filter(function(inst) {
				return inst !== Style;
			});
			document.removeEventListener("wheel", shouldPrevent, nonPassive);
			document.removeEventListener("touchmove", shouldPrevent, nonPassive);
			document.removeEventListener("touchstart", scrollTouchStart, nonPassive);
		};
	}, []);
	var removeScrollBar = props.removeScrollBar, inert = props.inert;
	return import_react.createElement(import_react.Fragment, null, inert ? import_react.createElement(Style, { styles: generateStyle(id) }) : null, removeScrollBar ? import_react.createElement(RemoveScrollBar, {
		noRelative: props.noRelative,
		gapMode: props.gapMode
	}) : null);
}
function getOutermostShadowParent(node) {
	var shadowParent = null;
	while (node !== null) {
		if (node instanceof ShadowRoot) {
			shadowParent = node.host;
			node = node.host;
		}
		node = node.parentNode;
	}
	return shadowParent;
}
//#endregion
//#region ../fieldtrip-v574/node_modules/react-remove-scroll/dist/es2015/sidecar.js
var sidecar_default = exportSidecar(effectCar, RemoveScrollSideCar);
//#endregion
//#region ../fieldtrip-v574/node_modules/react-remove-scroll/dist/es2015/Combination.js
var ReactRemoveScroll = import_react.forwardRef(function(props, ref) {
	return import_react.createElement(RemoveScroll, __assign({}, props, {
		ref,
		sideCar: sidecar_default
	}));
});
ReactRemoveScroll.classNames = RemoveScroll.classNames;
//#endregion
//#region ../fieldtrip-v574/node_modules/aria-hidden/dist/es2015/index.js
var getDefaultParent = function(originalTarget) {
	if (typeof document === "undefined") return null;
	return (Array.isArray(originalTarget) ? originalTarget[0] : originalTarget).ownerDocument.body;
};
var counterMap = /* @__PURE__ */ new WeakMap();
var uncontrolledNodes = /* @__PURE__ */ new WeakMap();
var markerMap = {};
var lockCount = 0;
var unwrapHost = function(node) {
	return node && (node.host || unwrapHost(node.parentNode));
};
var correctTargets = function(parent, targets) {
	return targets.map(function(target) {
		if (parent.contains(target)) return target;
		var correctedTarget = unwrapHost(target);
		if (correctedTarget && parent.contains(correctedTarget)) return correctedTarget;
		console.error("aria-hidden", target, "in not contained inside", parent, ". Doing nothing");
		return null;
	}).filter(function(x) {
		return Boolean(x);
	});
};
/**
* Marks everything except given node(or nodes) as aria-hidden
* @param {Element | Element[]} originalTarget - elements to keep on the page
* @param [parentNode] - top element, defaults to document.body
* @param {String} [markerName] - a special attribute to mark every node
* @param {String} [controlAttribute] - html Attribute to control
* @return {Undo} undo command
*/
var applyAttributeToOthers = function(originalTarget, parentNode, markerName, controlAttribute) {
	var targets = correctTargets(parentNode, Array.isArray(originalTarget) ? originalTarget : [originalTarget]);
	if (!markerMap[markerName]) markerMap[markerName] = /* @__PURE__ */ new WeakMap();
	var markerCounter = markerMap[markerName];
	var hiddenNodes = [];
	var elementsToKeep = /* @__PURE__ */ new Set();
	var elementsToStop = new Set(targets);
	var keep = function(el) {
		if (!el || elementsToKeep.has(el)) return;
		elementsToKeep.add(el);
		keep(el.parentNode);
	};
	targets.forEach(keep);
	var deep = function(parent) {
		if (!parent || elementsToStop.has(parent)) return;
		Array.prototype.forEach.call(parent.children, function(node) {
			if (elementsToKeep.has(node)) deep(node);
			else try {
				var attr = node.getAttribute(controlAttribute);
				var alreadyHidden = attr !== null && attr !== "false";
				var counterValue = (counterMap.get(node) || 0) + 1;
				var markerValue = (markerCounter.get(node) || 0) + 1;
				counterMap.set(node, counterValue);
				markerCounter.set(node, markerValue);
				hiddenNodes.push(node);
				if (counterValue === 1 && alreadyHidden) uncontrolledNodes.set(node, true);
				if (markerValue === 1) node.setAttribute(markerName, "true");
				if (!alreadyHidden) node.setAttribute(controlAttribute, "true");
			} catch (e) {
				console.error("aria-hidden: cannot operate on ", node, e);
			}
		});
	};
	deep(parentNode);
	elementsToKeep.clear();
	lockCount++;
	return function() {
		hiddenNodes.forEach(function(node) {
			var counterValue = counterMap.get(node) - 1;
			var markerValue = markerCounter.get(node) - 1;
			counterMap.set(node, counterValue);
			markerCounter.set(node, markerValue);
			if (!counterValue) {
				if (!uncontrolledNodes.has(node)) node.removeAttribute(controlAttribute);
				uncontrolledNodes.delete(node);
			}
			if (!markerValue) node.removeAttribute(markerName);
		});
		lockCount--;
		if (!lockCount) {
			counterMap = /* @__PURE__ */ new WeakMap();
			counterMap = /* @__PURE__ */ new WeakMap();
			uncontrolledNodes = /* @__PURE__ */ new WeakMap();
			markerMap = {};
		}
	};
};
/**
* Marks everything except given node(or nodes) as aria-hidden
* @param {Element | Element[]} originalTarget - elements to keep on the page
* @param [parentNode] - top element, defaults to document.body
* @param {String} [markerName] - a special attribute to mark every node
* @return {Undo} undo command
*/
var hideOthers = function(originalTarget, parentNode, markerName) {
	if (markerName === void 0) markerName = "data-aria-hidden";
	var targets = Array.from(Array.isArray(originalTarget) ? originalTarget : [originalTarget]);
	var activeParentNode = parentNode || getDefaultParent(originalTarget);
	if (!activeParentNode) return function() {
		return null;
	};
	targets.push.apply(targets, Array.from(activeParentNode.querySelectorAll("[aria-live], script")));
	return applyAttributeToOthers(targets, activeParentNode, markerName, "aria-hidden");
};
//#endregion
//#region ../fieldtrip-v574/node_modules/@radix-ui/react-dialog/node_modules/@radix-ui/react-slot/dist/index.mjs
var __defProp$1 = Object.defineProperty;
var __name$1 = (target, value) => __defProp$1(target, "name", {
	value,
	configurable: true
});
/* @__NO_SIDE_EFFECTS__ */
function createSlot(ownerName) {
	const Slot2 = import_react.forwardRef((props, forwardedRef) => {
		let { children, ...slotProps } = props;
		let slottableElement = null;
		let hasSlottable = false;
		const newChildren = [];
		if (isLazyComponent(children) && typeof use === "function") children = use(children._payload);
		import_react.Children.forEach(children, (maybeSlottable) => {
			if (isSlottable(maybeSlottable)) {
				hasSlottable = true;
				const slottable = maybeSlottable;
				let child = "child" in slottable.props ? slottable.props.child : slottable.props.children;
				if (isLazyComponent(child) && typeof use === "function") child = use(child._payload);
				slottableElement = getSlottableElementFromSlottable(slottable, child);
				newChildren.push(slottableElement?.props?.children);
			} else newChildren.push(maybeSlottable);
		});
		if (slottableElement) slottableElement = import_react.cloneElement(slottableElement, void 0, newChildren);
		else if (!hasSlottable && import_react.Children.count(children) === 1 && import_react.isValidElement(children)) slottableElement = children;
		const slottableElementRef = slottableElement ? getElementRef(slottableElement) : void 0;
		const composedRef = useComposedRefs$2(forwardedRef, slottableElementRef);
		if (!slottableElement) {
			if (children || children === 0) throw new Error(hasSlottable ? createSlottableError(ownerName) : createSlotError(ownerName));
			return children;
		}
		const mergedProps = mergeProps(slotProps, slottableElement.props ?? {});
		if (slottableElement.type !== import_react.Fragment) mergedProps.ref = forwardedRef ? composedRef : slottableElementRef;
		return import_react.cloneElement(slottableElement, mergedProps);
	});
	Slot2.displayName = `${ownerName}.Slot`;
	return Slot2;
}
__name$1(createSlot, "createSlot");
var SLOTTABLE_IDENTIFIER = Symbol.for("radix.slottable");
/* @__NO_SIDE_EFFECTS__ */
function createSlottable(ownerName) {
	const Slottable2 = /* @__PURE__ */ __name$1((props) => "child" in props ? props.children(props.child) : props.children, "Slottable");
	Slottable2.displayName = `${ownerName}.Slottable`;
	Slottable2.__radixId = SLOTTABLE_IDENTIFIER;
	return Slottable2;
}
__name$1(createSlottable, "createSlottable");
var getSlottableElementFromSlottable = /* @__PURE__ */ __name$1((slottable, child) => {
	if ("child" in slottable.props) {
		const child2 = slottable.props.child;
		if (!import_react.isValidElement(child2)) return null;
		return import_react.cloneElement(child2, void 0, slottable.props.children(child2.props.children));
	}
	return import_react.isValidElement(child) ? child : null;
}, "getSlottableElementFromSlottable");
function mergeProps(slotProps, childProps) {
	const overrideProps = { ...childProps };
	for (const propName in childProps) {
		const slotPropValue = slotProps[propName];
		const childPropValue = childProps[propName];
		if (/^on[A-Z]/.test(propName)) {
			if (slotPropValue && childPropValue) overrideProps[propName] = (...args) => {
				const result = childPropValue(...args);
				slotPropValue(...args);
				return result;
			};
			else if (slotPropValue) overrideProps[propName] = slotPropValue;
		} else if (propName === "style") overrideProps[propName] = {
			...slotPropValue,
			...childPropValue
		};
		else if (propName === "className") overrideProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(" ");
	}
	return {
		...slotProps,
		...overrideProps
	};
}
__name$1(mergeProps, "mergeProps");
function getElementRef(element) {
	let getter = Object.getOwnPropertyDescriptor(element.props, "ref")?.get;
	let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
	if (mayWarn) return element.ref;
	getter = Object.getOwnPropertyDescriptor(element, "ref")?.get;
	mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
	if (mayWarn) return element.props.ref;
	return element.props.ref || element.ref;
}
__name$1(getElementRef, "getElementRef");
function isSlottable(child) {
	return import_react.isValidElement(child) && typeof child.type === "function" && "__radixId" in child.type && child.type.__radixId === SLOTTABLE_IDENTIFIER;
}
__name$1(isSlottable, "isSlottable");
var REACT_LAZY_TYPE = Symbol.for("react.lazy");
function isLazyComponent(element) {
	return element != null && typeof element === "object" && "$$typeof" in element && element.$$typeof === REACT_LAZY_TYPE && "_payload" in element && isPromiseLike(element._payload);
}
__name$1(isLazyComponent, "isLazyComponent");
function isPromiseLike(value) {
	return typeof value === "object" && value !== null && "then" in value;
}
__name$1(isPromiseLike, "isPromiseLike");
var createSlotError = /* @__PURE__ */ __name$1((ownerName) => {
	return `${ownerName} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`;
}, "createSlotError");
var createSlottableError = /* @__PURE__ */ __name$1((ownerName) => {
	return `${ownerName} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`;
}, "createSlottableError");
var use = import_react[" use ".trim().toString()];
//#endregion
//#region ../fieldtrip-v574/node_modules/@radix-ui/react-dialog/dist/index.mjs
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", {
	value,
	configurable: true
});
var DIALOG_NAME = "Dialog";
var [createDialogContext, createDialogScope] = createContextScope(DIALOG_NAME);
var [DialogProvider, useDialogContext] = createDialogContext(DIALOG_NAME);
var Dialog$1 = /* @__PURE__ */ __name((props) => {
	const { __scopeDialog, children, open: openProp, defaultOpen, onOpenChange, modal = true } = props;
	const triggerRef = import_react.useRef(null);
	const contentRef = import_react.useRef(null);
	const [open, setOpen] = useControllableState({
		prop: openProp,
		defaultProp: defaultOpen ?? false,
		onChange: onOpenChange,
		caller: DIALOG_NAME
	});
	const [titleCount, setTitleCount] = import_react.useState(0);
	const [descriptionCount, setDescriptionCount] = import_react.useState(0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogProvider, {
		scope: __scopeDialog,
		triggerRef,
		contentRef,
		contentId: useId(),
		titleId: useId(),
		descriptionId: useId(),
		titlePresent: titleCount > 0,
		descriptionPresent: descriptionCount > 0,
		setTitleCount,
		setDescriptionCount,
		open,
		onOpenChange: setOpen,
		onOpenToggle: import_react.useCallback(() => setOpen((prevOpen) => !prevOpen), [setOpen]),
		modal,
		children
	});
}, "Dialog");
var PORTAL_NAME = "DialogPortal";
var [PortalProvider, usePortalContext] = createDialogContext(PORTAL_NAME, { forceMount: void 0 });
var DialogPortal$1 = /* @__PURE__ */ __name((props) => {
	const { __scopeDialog, forceMount, children, container } = props;
	const context = useDialogContext(PORTAL_NAME, __scopeDialog);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortalProvider, {
		scope: __scopeDialog,
		forceMount,
		children: import_react.Children.map(children, (child) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Presence, {
			present: forceMount || context.open,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, {
				asChild: true,
				container,
				children: child
			})
		}))
	});
}, "DialogPortal");
var OVERLAY_NAME = "DialogOverlay";
var DialogOverlay$1 = /* @__PURE__ */ import_react.forwardRef(/* @__PURE__ */ __name(function DialogOverlay2(props, forwardedRef) {
	const portalContext = usePortalContext(OVERLAY_NAME, props.__scopeDialog);
	const { forceMount = portalContext.forceMount, ...overlayProps } = props;
	const context = useDialogContext(OVERLAY_NAME, props.__scopeDialog);
	return context.modal ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Presence, {
		present: forceMount || context.open,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlayImpl, {
			...overlayProps,
			ref: forwardedRef
		})
	}) : null;
}, "DialogOverlay"));
var Slot = /* @__PURE__ */ createSlot("DialogOverlay.RemoveScroll");
var DialogOverlayImpl = /* @__PURE__ */ import_react.forwardRef(/* @__PURE__ */ __name(function DialogOverlayImpl2(props, forwardedRef) {
	const { __scopeDialog, ...overlayProps } = props;
	const context = useDialogContext(OVERLAY_NAME, __scopeDialog);
	const composedRefs = useComposedRefs$2(forwardedRef, useDismissableLayerSurface());
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReactRemoveScroll, {
		as: Slot,
		allowPinchZoom: true,
		shards: [context.contentRef],
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
			"data-state": getState(context.open),
			...overlayProps,
			ref: composedRefs,
			style: {
				pointerEvents: "auto",
				...overlayProps.style
			}
		})
	});
}, "DialogOverlayImpl"));
var CONTENT_NAME = "DialogContent";
var DialogContent$1 = /* @__PURE__ */ import_react.forwardRef(/* @__PURE__ */ __name(function DialogContent2(props, forwardedRef) {
	const portalContext = usePortalContext(CONTENT_NAME, props.__scopeDialog);
	const { forceMount = portalContext.forceMount, ...contentProps } = props;
	const context = useDialogContext(CONTENT_NAME, props.__scopeDialog);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Presence, {
		present: forceMount || context.open,
		children: context.modal ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContentModal, {
			...contentProps,
			ref: forwardedRef
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContentNonModal, {
			...contentProps,
			ref: forwardedRef
		})
	});
}, "DialogContent"));
var DialogContentModal = /* @__PURE__ */ import_react.forwardRef(/* @__PURE__ */ __name(function DialogContentModal2(props, forwardedRef) {
	const context = useDialogContext(CONTENT_NAME, props.__scopeDialog);
	const contentRef = import_react.useRef(null);
	const composedRefs = useComposedRefs$2(forwardedRef, context.contentRef, contentRef);
	import_react.useEffect(() => {
		const content = contentRef.current;
		if (content) return hideOthers(content);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContentImpl, {
		...props,
		ref: composedRefs,
		trapFocus: context.open,
		disableOutsidePointerEvents: context.open,
		onCloseAutoFocus: composeEventHandlers(props.onCloseAutoFocus, (event) => {
			event.preventDefault();
			context.triggerRef.current?.focus();
		}),
		onPointerDownOutside: composeEventHandlers(props.onPointerDownOutside, (event) => {
			const originalEvent = event.detail.originalEvent;
			const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
			if (originalEvent.button === 2 || ctrlLeftClick) event.preventDefault();
		}),
		onFocusOutside: composeEventHandlers(props.onFocusOutside, (event) => event.preventDefault())
	});
}, "DialogContentModal"));
var DialogContentNonModal = /* @__PURE__ */ import_react.forwardRef(/* @__PURE__ */ __name(function DialogContentNonModal2(props, forwardedRef) {
	const context = useDialogContext(CONTENT_NAME, props.__scopeDialog);
	const hasInteractedOutsideRef = import_react.useRef(false);
	const hasPointerDownOutsideRef = import_react.useRef(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContentImpl, {
		...props,
		ref: forwardedRef,
		trapFocus: false,
		disableOutsidePointerEvents: false,
		onCloseAutoFocus: (event) => {
			props.onCloseAutoFocus?.(event);
			if (!event.defaultPrevented) {
				if (!hasInteractedOutsideRef.current) context.triggerRef.current?.focus();
				event.preventDefault();
			}
			hasInteractedOutsideRef.current = false;
			hasPointerDownOutsideRef.current = false;
		},
		onInteractOutside: (event) => {
			props.onInteractOutside?.(event);
			if (!event.defaultPrevented) {
				hasInteractedOutsideRef.current = true;
				if (event.detail.originalEvent.type === "pointerdown") hasPointerDownOutsideRef.current = true;
			}
			const target = event.target;
			if (context.triggerRef.current?.contains(target)) event.preventDefault();
			if (event.detail.originalEvent.type === "focusin" && hasPointerDownOutsideRef.current) event.preventDefault();
		}
	});
}, "DialogContentNonModal"));
var DialogContentImpl = /* @__PURE__ */ import_react.forwardRef(/* @__PURE__ */ __name(function DialogContentImpl2(props, forwardedRef) {
	const { __scopeDialog, trapFocus, onOpenAutoFocus, onCloseAutoFocus, ...contentProps } = props;
	const context = useDialogContext(CONTENT_NAME, __scopeDialog);
	useFocusGuards();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FocusScope, {
		asChild: true,
		loop: true,
		trapped: trapFocus,
		onMountAutoFocus: onOpenAutoFocus,
		onUnmountAutoFocus: onCloseAutoFocus,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DismissableLayer, {
			role: "dialog",
			id: context.contentId,
			"aria-describedby": context.descriptionPresent ? context.descriptionId : void 0,
			"aria-labelledby": context.titlePresent ? context.titleId : void 0,
			"data-state": getState(context.open),
			...contentProps,
			ref: forwardedRef,
			deferPointerDownOutside: true,
			onDismiss: () => context.onOpenChange(false)
		})
	}) });
}, "DialogContentImpl"));
var TITLE_NAME = "DialogTitle";
var DialogTitle$1 = /* @__PURE__ */ import_react.forwardRef(/* @__PURE__ */ __name(function DialogTitle2(props, forwardedRef) {
	const { __scopeDialog, ...titleProps } = props;
	const context = useDialogContext(TITLE_NAME, __scopeDialog);
	const { setTitleCount } = context;
	useLayoutEffect2(() => {
		setTitleCount((count) => count + 1);
		return () => setTitleCount((count) => count - 1);
	}, [setTitleCount]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.h2, {
		id: context.titleId,
		...titleProps,
		ref: forwardedRef
	});
}, "DialogTitle"));
var DESCRIPTION_NAME = "DialogDescription";
var DialogDescription$1 = /* @__PURE__ */ import_react.forwardRef(/* @__PURE__ */ __name(function DialogDescription2(props, forwardedRef) {
	const { __scopeDialog, ...descriptionProps } = props;
	const context = useDialogContext(DESCRIPTION_NAME, __scopeDialog);
	const { setDescriptionCount } = context;
	useLayoutEffect2(() => {
		setDescriptionCount((count) => count + 1);
		return () => setDescriptionCount((count) => count - 1);
	}, [setDescriptionCount]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.p, {
		id: context.descriptionId,
		...descriptionProps,
		ref: forwardedRef
	});
}, "DialogDescription"));
var CLOSE_NAME = "DialogClose";
var DialogClose$1 = /* @__PURE__ */ import_react.forwardRef(/* @__PURE__ */ __name(function DialogClose2(props, forwardedRef) {
	const { __scopeDialog, ...closeProps } = props;
	const context = useDialogContext(CLOSE_NAME, __scopeDialog);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.button, {
		type: "button",
		...closeProps,
		ref: forwardedRef,
		onClick: composeEventHandlers(props.onClick, () => context.onOpenChange(false))
	});
}, "DialogClose"));
function getState(open) {
	return open ? "open" : "closed";
}
__name(getState, "getState");
cva("inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground hover:bg-primary/90",
			destructive: "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40",
			outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
			secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-9 px-4 py-2 has-[>svg]:px-3",
			xs: "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
			sm: "h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5",
			lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
			icon: "size-9",
			"icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
			"icon-sm": "size-8",
			"icon-lg": "size-10"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
//#endregion
//#region components/ui/dialog.tsx
function Dialog({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog$1, {
		"data-slot": "dialog",
		...props
	});
}
function DialogPortal({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogPortal$1, {
		"data-slot": "dialog-portal",
		...props
	});
}
function DialogClose({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose$1, {
		"data-slot": "dialog-close",
		...props
	});
}
function DialogOverlay({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
		"data-slot": "dialog-overlay",
		className: cn("fixed inset-0 z-50 bg-black/50 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0", className),
		...props
	});
}
function DialogContent({ className, children, showCloseButton = true, layout = "dialog", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, {
		"data-slot": "dialog-portal",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
			"data-slot": "dialog-content",
			"data-layout": layout,
			className: cn("fixed z-50 outline-none", layout === "fullscreen" ? "inset-0" : "top-[50%] left-[50%] grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border bg-background p-6 shadow-lg duration-200 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 sm:max-w-lg", className),
			...props,
			children: [children, showCloseButton && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose$1, {
				"data-slot": "dialog-close",
				className: "absolute top-4 right-4 rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "sr-only",
					children: "Close"
				})]
			})]
		})]
	});
}
function DialogTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
		"data-slot": "dialog-title",
		className: cn("text-lg leading-none font-semibold", className),
		...props
	});
}
function DialogDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
		"data-slot": "dialog-description",
		className: cn("text-sm text-muted-foreground", className),
		...props
	});
}
//#endregion
//#region app/work/project-image-archive.tsx
function ProjectImageArchive({ images: originalImages, projectTitle, captionDetails = {}, projectSlug, afterHero }) {
	const images = (0, import_react.useMemo)(() => originalImages.map((image) => ({
		...image,
		caption: image.caption?.replace(/;\s*photographer unverified\.?/gi, ".")
	})), [originalImages]);
	const filmAvailable = !!projectSlug && hasProjectIntro(projectSlug);
	const [mediaMode, setMediaMode] = (0, import_react.useState)(() => filmAvailable ? "film" : "photos");
	const [activeIndex, setActiveIndex] = (0, import_react.useState)(null);
	const returnFocusRef = (0, import_react.useRef)(null);
	const closeRef = (0, import_react.useRef)(null);
	const controlsObserver = (0, import_react.useRef)(null);
	const measureControls = (0, import_react.useCallback)((node) => {
		controlsObserver.current?.disconnect();
		controlsObserver.current = null;
		if (!node) return;
		const measure = () => node.parentElement?.style.setProperty("--project-viewer-controls-height", `${node.getBoundingClientRect().height}px`);
		measure();
		if (typeof ResizeObserver !== "undefined") {
			controlsObserver.current = new ResizeObserver(measure);
			controlsObserver.current.observe(node);
		}
	}, []);
	const galleryCount = images.length;
	const archiveEntries = (0, import_react.useMemo)(() => images.map((image, imageIndex) => ({
		image,
		imageIndex
	})), [images]);
	const archiveIndexes = (0, import_react.useMemo)(() => archiveEntries.map(({ imageIndex }) => imageIndex), [archiveEntries]);
	const archiveRows = (0, import_react.useMemo)(() => {
		const rows = [];
		if (archiveEntries.length === 1 && !filmAvailable) return rows;
		for (let index = 0; index < archiveEntries.length;) {
			const count = archiveEntries.length - index === 3 ? 3 : 2;
			rows.push(archiveEntries.slice(index, index + count));
			index += count;
		}
		return rows;
	}, [archiveEntries, filmAvailable]);
	const showPrevious = (0, import_react.useCallback)(() => {
		setActiveIndex((current) => {
			if (current === null || archiveIndexes.length === 0) return null;
			const position = archiveIndexes.indexOf(current);
			return position <= 0 ? archiveIndexes.at(-1) : archiveIndexes[position - 1];
		});
	}, [archiveIndexes]);
	const showNext = (0, import_react.useCallback)(() => {
		setActiveIndex((current) => {
			if (current === null || archiveIndexes.length === 0) return null;
			const position = archiveIndexes.indexOf(current);
			return position < 0 || position >= archiveIndexes.length - 1 ? archiveIndexes[0] : archiveIndexes[position + 1];
		});
	}, [archiveIndexes]);
	(0, import_react.useEffect)(() => {
		if (activeIndex === null) return;
		const handleKeyDown = (event) => {
			if (event.key === "ArrowLeft") {
				event.preventDefault();
				showPrevious();
			}
			if (event.key === "ArrowRight") {
				event.preventDefault();
				showNext();
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [
		activeIndex,
		showNext,
		showPrevious
	]);
	(0, import_react.useEffect)(() => {
		const openFromPage = (event) => {
			const button = event.target.closest("[data-gallery-open]");
			if (!button) return;
			const requestedIndex = Number(button.dataset.galleryIndex ?? "0");
			const safeIndex = Number.isInteger(requestedIndex) && requestedIndex >= 0 && requestedIndex < galleryCount ? requestedIndex : 0;
			returnFocusRef.current = button;
			setActiveIndex(safeIndex);
		};
		document.addEventListener("click", openFromPage);
		return () => document.removeEventListener("click", openFromPage);
	}, [galleryCount]);
	if (galleryCount === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
		modal: true,
		open: activeIndex !== null,
		onOpenChange: (open) => {
			if (!open) setActiveIndex(null);
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "project-sequence",
			id: "project-images",
			tabIndex: -1,
			"aria-label": projectTitle + " image archive",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "project-detail-media",
					children: [
						filmAvailable && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "project-detail-media-tabs",
							role: "group",
							"aria-label": "Project media",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-pressed": mediaMode === "photos",
								"aria-controls": "project-photo-panel",
								onClick: () => setMediaMode("photos"),
								children: "Photos"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-pressed": mediaMode === "film",
								"aria-controls": "project-film-panel",
								onClick: () => setMediaMode("film"),
								children: projectSlug === "core-nyc" ? "Reel" : "Film"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							id: "project-photo-panel",
							hidden: mediaMode !== "photos",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectPhotoReel, {
								entries: archiveEntries,
								projectTitle,
								galleryCount,
								suspended: activeIndex !== null || mediaMode !== "photos",
								captionDetails,
								suppressCaptionText: true
							})
						}),
						filmAvailable && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							id: "project-film-panel",
							hidden: mediaMode !== "film" || activeIndex !== null,
							children: mediaMode === "film" && activeIndex === null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectIntro, {
								slug: projectSlug,
								title: projectTitle,
								poster: images[0].src,
								detail: true,
								sourceLink: false
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "project-detail-film-caption",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectCaption, {
									title: projectTitle,
									...captionDetails
								})
							})] })
						})
					]
				}),
				afterHero && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "project-detail-after-hero",
					children: afterHero
				}),
				archiveRows.map((row) => {
					const ratios = row.map(({ image }) => {
						const size = project_image_dimensions_default[image.src];
						return size ? size.width / size.height : 1.5;
					});
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "project-sequence-row",
						style: {
							"--project-row-columns": ratios.map((ratio) => `${ratio}fr`).join(" "),
							"--project-row-ratio": ratios[0]
						},
						children: row.map(({ image, imageIndex }) => {
							const number = imageIndex + 1;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
								className: "project-sequence-item",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									"aria-label": `Enlarge ${projectTitle}, archive view ${number} of ${galleryCount}`,
									className: "project-sequence-trigger",
									onClick: (event) => {
										returnFocusRef.current = event.currentTarget;
										setActiveIndex(imageIndex);
									},
									type: "button",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MotionImage, {
										loading: "lazy",
										...project_image_dimensions_default[image.src],
										src: image.src,
										alt: image.caption || projectTitle + ", archive view " + number,
										direction: imageIndex % 2 ? "right" : "left"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									String(number).padStart(2, "0"),
									" / ",
									String(galleryCount).padStart(2, "0")
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectImageCredit, { image })] })]
							}, image.id);
						})
					}, row[0].image.id);
				})
			]
		}), activeIndex !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "project-lightbox",
			layout: "fullscreen",
			onOpenAutoFocus: (event) => {
				event.preventDefault();
				closeRef.current?.focus({ preventScroll: true });
			},
			onCloseAutoFocus: (event) => {
				event.preventDefault();
				returnFocusRef.current?.focus({ preventScroll: true });
			},
			showCloseButton: false,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
					className: "sr-only",
					children: [
						projectTitle,
						", archive view ",
						activeIndex + 1
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, {
					className: "sr-only",
					children: ["Full-screen project photograph.", galleryCount > 1 && " Use the arrow keys or Previous and Next controls to move through the archive."]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "project-lightbox-frame",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: images[activeIndex].src,
						alt: images[activeIndex].caption || projectTitle + ", archive view " + (activeIndex + 1)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "project-lightbox-controls",
					ref: measureControls,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"aria-live": "polite",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectImageCredit, { image: images[activeIndex] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							String(activeIndex + 1).padStart(2, "0"),
							" / ",
							String(galleryCount).padStart(2, "0")
						] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						"aria-label": "Project image viewer controls",
						children: [
							galleryCount > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: showPrevious,
								type: "button",
								children: "← Previous"
							}),
							galleryCount > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: showNext,
								type: "button",
								children: "Next →"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									ref: closeRef,
									type: "button",
									children: "Close ×"
								})
							})
						]
					})]
				})
			]
		})]
	});
}
//#endregion
export { ProjectImageArchive };
