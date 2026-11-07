import { b as require_react, n as require_jsx_runtime, w as __toESM } from "../index.js";
import { t as cn } from "./utils-QUTXbMHG.js";
import { a as DialogDescription$1, c as DialogTitle$1, i as DialogContent$1, n as Dialog$1, o as DialogOverlay$1, r as DialogClose$1, s as DialogPortal$1, t as X } from "./x-Dmg9dQeD.js";
import "./button-PqnSvM18.js";
import { a as projectFilms, i as NativeFilm, n as archiveVimeoFilms, t as ArchiveVimeo } from "./archive-vimeo-Dt7Kkk29.js";
import { r as projectCaptionYear, t as imageCaptionDetails } from "./project-caption-CQOzgQB_.js";
import { t as ReelFullscreenButton } from "./reel-fullscreen-button-CDdGreTl.js";
import { t as BrandText } from "./field-trip-name-BbSfcdsd.js";
import { t as photographerCredit } from "./image-credit-policy-C0re5pSB.js";
import { t as ProjectTitle } from "./project-title-CYErkrLI.js";
import { r as imageCredit, t as MotionImage } from "./motion-image-CzCHxmz3.js";
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
