import { b as require_react, n as require_jsx_runtime, w as __toESM } from "../index.js";
import { a as projectFilms, i as NativeFilm, r as prepareVimeoPlayer, t as ArchiveVimeo } from "./archive-vimeo-D6Ct3jdd.js";
//#region app/home/home-video-sequence.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
/** The original MCNY reel and Ascend excerpt. Detail films retain their original windows. */
var HOME_VIDEO_SEQUENCE = [{
	...projectFilms[0],
	slug: "core-nyc",
	native: projectFilms[0]
}, {
	...projectFilms[1],
	slug: "ascend",
	native: {
		...projectFilms[1],
		start: 0,
		end: 5
	}
}];
/** One keyed position at a time; LandingReel owns the shared sequence, controls,
* announcement and focus/environment gates. No hidden upcoming film is mounted.
* Autoplay refusal is a held photograph, never a completed project. The watchdog
* also holds rather than skipping, and counts only permitted active time. */
function HomeVideoSequence({ index, videos = HOME_VIDEO_SEQUENCE, active, playRequest = 0, playFromGestureRef, muted = true, soundFromGestureRef, onMutedChange, onSoundAvailableChange, onComplete, onUnavailable, loop = false, onRunningChange, onRecoveryChange }) {
	const film = videos[index];
	const [usingFallback, setUsingFallback] = (0, import_react.useState)(false);
	const nativeFilm = usingFallback ? film.fallbackNative : film.native;
	(0, import_react.useEffect)(() => {
		onSoundAvailableChange?.(nativeFilm ? nativeFilm.hasAudio !== false : !!film.vimeo);
	}, [
		nativeFilm,
		film.vimeo,
		onSoundAvailableChange
	]);
	const [hasFrame, setHasFrame] = (0, import_react.useState)(false);
	const [playing, setPlaying] = (0, import_react.useState)(false);
	const [blocked, setBlocked] = (0, import_react.useState)(false);
	const posterRef = (0, import_react.useRef)(null);
	const [photoLoaded, setPhotoLoaded] = (0, import_react.useState)(false);
	const [photoElapsed, setPhotoElapsed] = (0, import_react.useState)(0);
	const photoClock = (0, import_react.useRef)(0);
	(0, import_react.useEffect)(() => {
		if (film.photo && posterRef.current?.complete && posterRef.current.naturalWidth > 0) setPhotoLoaded(true);
	}, [film.photo]);
	const nextFilm = videos[(index + 1) % videos.length];
	(0, import_react.useEffect)(() => {
		if (!active || !playing || !hasFrame) return;
		if (nextFilm && nextFilm !== film) {
			const poster = new Image();
			poster.decoding = "async";
			poster.src = nextFilm.poster;
			poster.decode().catch(() => {});
		}
		if (film.native && nextFilm?.vimeo) prepareVimeoPlayer();
	}, [
		active,
		playing,
		hasFrame,
		film,
		nextFilm
	]);
	const blockedRequest = (0, import_react.useRef)(playRequest);
	const [held, setHeld] = (0, import_react.useState)(false);
	const [providerControls, setProviderControls] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		onRecoveryChange?.(providerControls || held);
		return () => onRecoveryChange?.(false);
	}, [
		providerControls,
		held,
		onRecoveryChange
	]);
	(0, import_react.useEffect)(() => {
		onRunningChange?.(active && playing && hasFrame && !held);
		return () => onRunningChange?.(false);
	}, [
		active,
		playing,
		hasFrame,
		held,
		onRunningChange
	]);
	const heldRef = (0, import_react.useRef)(false);
	const hasPlayed = (0, import_react.useRef)(false);
	const activeRef = (0, import_react.useRef)(active);
	activeRef.current = active;
	const report = (0, import_react.useRef)({
		onComplete,
		onUnavailable
	});
	report.current = {
		onComplete,
		onUnavailable
	};
	const settled = (0, import_react.useRef)(false);
	const stalled = (0, import_react.useRef)(0);
	const lastProgress = (0, import_react.useRef)(null);
	const mounted = (0, import_react.useRef)(true);
	(0, import_react.useEffect)(() => {
		mounted.current = true;
		return () => {
			mounted.current = false;
		};
	}, []);
	const finish = () => {
		if (loop || !mounted.current || settled.current || heldRef.current || !hasPlayed.current || !activeRef.current) return;
		settled.current = true;
		report.current.onComplete();
	};
	const hold = () => {
		if (!usingFallback && film.fallbackNative && mounted.current && !settled.current) {
			setUsingFallback(true);
			setHasFrame(false);
			setPlaying(false);
			setBlocked(false);
			hasPlayed.current = false;
			stalled.current = 0;
			lastProgress.current = null;
			return;
		}
		if (!mounted.current || settled.current || heldRef.current) return;
		if (!usingFallback && film.vimeo && !providerControls) {
			setProviderControls(true);
			setHasFrame(false);
			setPlaying(false);
			setBlocked(false);
			hasPlayed.current = false;
			stalled.current = 0;
			lastProgress.current = null;
			return;
		}
		heldRef.current = true;
		hasPlayed.current = false;
		setHeld(true);
		setPlaying(false);
		setHasFrame(false);
		report.current.onUnavailable(film.title);
	};
	const progress = (seconds) => {
		if (!activeRef.current || !Number.isFinite(seconds)) return;
		if (lastProgress.current === null || seconds > lastProgress.current + .02 || loop && seconds < lastProgress.current - .5) {
			lastProgress.current = seconds;
			stalled.current = 0;
		}
	};
	(0, import_react.useEffect)(() => {
		if (!film.photo) return;
		if (!active || !photoLoaded || held) {
			setPlaying(false);
			return;
		}
		hasPlayed.current = true;
		setHasFrame(true);
		setPlaying(true);
		let frame, previous = performance.now(), lastPaint = previous;
		const tick = (now) => {
			const delta = now - previous;
			previous = now;
			if (!document.hidden && delta >= 0 && delta < 1e3) photoClock.current += delta;
			if (now - lastPaint >= 50) {
				setPhotoElapsed(photoClock.current);
				lastPaint = now;
			}
			if (!loop && photoClock.current >= film.photo.durationMs) {
				setPlaying(false);
				finish();
				return;
			}
			frame = requestAnimationFrame(tick);
		};
		frame = requestAnimationFrame(tick);
		return () => {
			cancelAnimationFrame(frame);
			setPlaying(false);
		};
	}, [
		active,
		photoLoaded,
		held,
		film.photo,
		loop
	]);
	(0, import_react.useEffect)(() => {
		if (!playRequest) return;
		heldRef.current = false;
		setHeld(false);
		setBlocked(false);
		stalled.current = 0;
		lastProgress.current = null;
	}, [playRequest]);
	(0, import_react.useEffect)(() => {
		if (active && blocked && blockedRequest.current === playRequest) hold();
	}, [
		active,
		blocked,
		playRequest,
		providerControls
	]);
	(0, import_react.useEffect)(() => {
		if (film.photo || !active || held || providerControls || settled.current) return;
		let frame;
		let last = performance.now();
		const tick = (now) => {
			const delta = now - last;
			last = now;
			if (!activeRef.current || heldRef.current || settled.current) return;
			if (!document.hidden && navigator.onLine && delta >= 0 && delta < 1e3) stalled.current += delta;
			if (stalled.current >= (film.stallTimeoutMs ?? (!usingFallback && film.fallbackNative && !hasFrame ? 8e3 : 15e3))) {
				hold();
				return;
			}
			frame = requestAnimationFrame(tick);
		};
		frame = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(frame);
	}, [
		active,
		held,
		usingFallback,
		hasFrame,
		providerControls
	]);
	const playback = {
		active: active && !held,
		playRequest,
		muted,
		soundFromGestureRef,
		onMutedChange,
		loop,
		onPlayingChange: (value) => {
			if (value) hasPlayed.current = true;
			setPlaying(value);
		},
		onFrameChange: setHasFrame,
		onBlockedChange: (value) => {
			if (value) blockedRequest.current = playRequest;
			setBlocked(value);
		},
		onProgress: progress,
		onComplete: () => finish()
	};
	const photoProgress = film.photo ? (1 - Math.cos(photoElapsed / film.photo.durationMs * Math.PI)) / 2 : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "home-video-stage",
		"data-media-kind": film.photo ? "photo" : "video",
		"data-native-controls": providerControls,
		"data-video-project": film.slug,
		"data-video-ready": hasFrame,
		"data-video-playing": playing,
		"data-video-held": held,
		"data-video-fallback": usingFallback,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				ref: posterRef,
				className: "home-video-poster",
				src: film.poster,
				alt: film.alt,
				width: film.photo?.width ?? 1600,
				height: film.photo?.height ?? 900,
				onLoad: () => {
					if (film.photo) setPhotoLoaded(true);
				},
				onError: () => {
					if (film.photo) {
						setPhotoLoaded(false);
						hold();
					}
				},
				decoding: "async",
				fetchPriority: index === 0 ? "high" : "auto",
				style: {
					opacity: film.photo ? 1 : hasFrame ? 0 : 1,
					...film.photo ? {
						objectFit: "cover",
						objectPosition: film.photo.objectPosition ?? "center",
						transformOrigin: film.photo.objectPosition ?? "center",
						transform: `translate3d(${(-.5 + photoProgress).toFixed(3)}%, ${(-photoProgress * .35).toFixed(3)}%, 0) scale(${(1.025 + photoProgress * .055).toFixed(4)})`
					} : {}
				}
			}),
			nativeFilm && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeFilm, {
				film: nativeFilm,
				startupBufferSeconds: 1.5,
				playFromGestureRef,
				...playback
			}),
			!usingFallback && film.vimeo && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArchiveVimeo, {
				film: film.vimeo,
				nativeControls: providerControls,
				revealOnPlayback: true,
				playFromGestureRef,
				title: `${film.title} excerpt`,
				...playback
			}),
			held && film.vimeo && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				className: "home-video-source",
				href: `https://vimeo.com/${film.vimeo.id}`,
				target: "_blank",
				rel: "noopener noreferrer",
				children: "Watch film on Vimeo"
			})
		]
	});
}
//#endregion
export { HomeVideoSequence as n, HOME_VIDEO_SEQUENCE as t };
