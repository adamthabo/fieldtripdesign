import { b as require_react, n as require_jsx_runtime, w as __toESM } from "../index.js";
//#region app/home/project-films.ts
/** Original native project films, with retained public-source provenance.
* MCNY uses its actual opening frame; the provider thumbnail shows a later moment.
*/
var projectFilms = [{
	title: "New York at Its Core",
	client: "Museum of the City of New York",
	href: "/work/core-nyc",
	hasAudio: false,
	src: "https://video.squarespace-cdn.com/content/v1/68eed182526574092b5037c8/0b04b430-3f74-43db-8b91-06613e231423/playlist.m3u8",
	poster: "/project-film-posters/core-nyc-opening-20261031.webp",
	alt: "Opening frame of New York at Its Core, showing the Building Up gallery",
	source: "https://www.elkanlevinsohn.com/about",
	start: 0,
	end: 18
}, {
	title: "Ascend",
	client: "Delta / TED",
	href: "/work/ascend",
	hasAudio: true,
	src: "/project-films/ascend-aramique-360-20261101.mp4",
	poster: "/project-galleries/ascend/02.webp",
	alt: "Glowing LED spheres in Ascend for Delta / TED",
	source: "https://vimeo.com/217222063"
}];
//#endregion
//#region app/work/native-film.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
/** A mounted stream keeps its timeline when paused; only a source/mode change resets it. */
function NativeFilm({ film, active, full = false, playRequest = 0, playFromGestureRef, muted = true, soundFromGestureRef, onPlayingChange, onFrameChange, onBlockedChange, loop = true, onComplete, onProgress, startupBufferSeconds = 0 }) {
	const video = (0, import_react.useRef)(null);
	const activeRef = (0, import_react.useRef)(active);
	activeRef.current = active;
	const mutedRef = (0, import_react.useRef)(muted);
	mutedRef.current = muted;
	const control = (0, import_react.useRef)(null);
	const revealFrame = (0, import_react.useRef)(null);
	const report = (0, import_react.useRef)({
		onPlayingChange,
		onFrameChange,
		onBlockedChange,
		onComplete,
		onProgress
	});
	report.current = {
		onPlayingChange,
		onFrameChange,
		onBlockedChange,
		onComplete,
		onProgress
	};
	const [failed, setFailed] = (0, import_react.useState)(false);
	const [hasFrame, setHasFrame] = (0, import_react.useState)(false);
	const start = full ? 0 : film.start ?? 0;
	const end = full ? void 0 : film.end;
	(0, import_react.useEffect)(() => {
		const player = video.current;
		if (!player) return;
		let cancelled = false, started = false, restored = false, completed = false;
		let startupReady = startupBufferSeconds <= 0 || /\.mp4(?:[?#]|$)/i.test(film.src), pendingPlay = false, playGeneration = 0, autoplayBlocked = false;
		let interruptedStartupRetried = false;
		let destroy;
		let loading;
		let loadingStopped = false;
		let frameRequest;
		const showFrame = () => {
			frameRequest = void 0;
			if (cancelled || !activeRef.current || player.error) return;
			setFailed(false);
			setHasFrame(true);
			report.current.onFrameChange?.(true);
		};
		revealFrame.current = () => {
			if (typeof player.requestVideoFrameCallback === "function") {
				if (frameRequest === void 0) frameRequest = player.requestVideoFrameCallback(showFrame);
			} else showFrame();
		};
		setFailed(false);
		setHasFrame(false);
		report.current.onFrameChange?.(false);
		report.current.onBlockedChange?.(false);
		player.defaultMuted = true;
		player.muted = mutedRef.current;
		const play = (fromGesture = false) => {
			if (cancelled || completed || !activeRef.current) return;
			if (fromGesture) autoplayBlocked = false;
			if (autoplayBlocked) return;
			if (!restored && player.readyState >= 1) {
				if (start > 0 && Math.abs(player.currentTime - start) > .05) player.currentTime = start;
				restored = true;
			}
			if (!startupReady && !fromGesture) {
				const position = player.currentTime;
				const boundary = end ?? (Number.isFinite(player.duration) ? player.duration : Infinity);
				if (player.readyState < 3 || player.seeking || boundary <= position) return;
				for (let index = 0; index < player.buffered.length; index++) {
					const rangeStart = player.buffered.start(index);
					const initialDecodeOffset = start === 0 && index === 0 && position <= .1 && rangeStart <= .1;
					const bufferedFrom = Math.max(position, rangeStart);
					const required = Math.min(startupBufferSeconds, Math.max(0, boundary - bufferedFrom));
					if ((rangeStart <= position + .05 || initialDecodeOffset) && required > 0 && player.buffered.end(index) - bufferedFrom >= required - .05) startupReady = true;
				}
				if (!startupReady) return;
			}
			if (pendingPlay || !player.paused) return;
			pendingPlay = true;
			const generation = ++playGeneration;
			let retryInterruptedStartup = false;
			player.play().then(() => {
				if (cancelled || generation !== playGeneration) return;
				if (completed || !activeRef.current) player.pause();
			}).catch((error) => {
				if (cancelled || generation !== playGeneration || !activeRef.current) return;
				if (typeof error === "object" && error !== null && "name" in error && error.name === "AbortError") {
					if (mutedRef.current && player.muted && !interruptedStartupRetried) {
						interruptedStartupRetried = true;
						retryInterruptedStartup = true;
					}
					return;
				}
				autoplayBlocked = true;
				report.current.onBlockedChange?.(true);
				report.current.onPlayingChange?.(false);
			}).finally(() => {
				if (generation !== playGeneration) return;
				pendingPlay = false;
				if (retryInterruptedStartup && !cancelled && !completed && activeRef.current && mutedRef.current && player.muted) play();
			});
		};
		const tryPlay = () => play();
		const complete = () => {
			if (cancelled || completed || !activeRef.current || loop) return;
			completed = true;
			player.pause();
			loading?.stopLoad();
			report.current.onPlayingChange?.(false);
			report.current.onComplete?.();
		};
		const loopExcerpt = () => {
			if (cancelled || completed || !activeRef.current) return;
			report.current.onProgress?.(player.currentTime);
			if (end !== void 0 && player.currentTime >= end) if (loop) player.currentTime = start;
			else complete();
		};
		player.addEventListener("loadedmetadata", tryPlay);
		player.addEventListener("canplay", tryPlay);
		player.addEventListener("progress", tryPlay);
		player.addEventListener("seeked", tryPlay);
		player.addEventListener("timeupdate", loopExcerpt);
		player.addEventListener("ended", complete);
		const fail = () => {
			if (!cancelled) {
				setFailed(true);
				report.current.onFrameChange?.(false);
				report.current.onBlockedChange?.(true);
				report.current.onPlayingChange?.(false);
			}
		};
		const load = () => {
			if (started) return;
			started = true;
			if (/\.mp4(?:[?#]|$)/i.test(film.src)) {
				player.src = film.mobileSrc && player.clientWidth > 0 && player.clientWidth <= 680 ? film.mobileSrc : film.src;
				player.load();
				return;
			}
			const native = player.canPlayType("application/vnd.apple.mpegurl");
			const webkitBrowser = /AppleWebKit/.test(navigator.userAgent) && !/Chrome|Chromium|Edg/.test(navigator.userAgent);
			if (native && webkitBrowser) {
				player.src = film.src;
				player.load();
			} else import("./hls-DVFDZQhe.js").then(({ default: Hls }) => {
				if (cancelled) return;
				if (Hls.isSupported()) {
					const hls = new Hls({
						capLevelToPlayerSize: true,
						maxBufferLength: 10,
						maxMaxBufferLength: 10,
						backBufferLength: 0,
						startPosition: start,
						autoStartLoad: false
					});
					loading = hls;
					destroy = () => hls.destroy();
					hls.on(Hls.Events.MEDIA_ATTACHED, () => hls.loadSource(film.src));
					hls.on(Hls.Events.MANIFEST_PARSED, () => {
						if (activeRef.current) {
							hls.startLoad(player.currentTime || start);
							play();
						} else loadingStopped = true;
					});
					hls.on(Hls.Events.FRAG_BUFFERED, tryPlay);
					let recovered = false;
					hls.on(Hls.Events.ERROR, (_event, data) => {
						if (!data.fatal || cancelled) return;
						if (!recovered && activeRef.current) {
							recovered = true;
							if (data.type === Hls.ErrorTypes.NETWORK_ERROR) {
								hls.startLoad(player.currentTime);
								return;
							}
							if (data.type === Hls.ErrorTypes.MEDIA_ERROR) {
								hls.recoverMediaError();
								return;
							}
						}
						fail();
					});
					hls.attachMedia(player);
				} else if (native) {
					player.src = film.src;
					player.load();
				} else fail();
			}).catch(fail);
		};
		control.current = (fromGesture = false) => {
			if (cancelled || completed) return;
			if (fromGesture) {
				autoplayBlocked = false;
				if (player.error && /\.mp4(?:[?#]|$)/i.test(film.src)) {
					setFailed(false);
					player.load();
				}
			}
			if (!activeRef.current) {
				playGeneration++;
				pendingPlay = false;
				player.preload = "none";
				player.pause();
				loading?.stopLoad();
				loadingStopped = !!loading;
				report.current.onPlayingChange?.(false);
				return;
			}
			if (startupBufferSeconds > 0) player.preload = "auto";
			load();
			if (loadingStopped) {
				loading?.startLoad(player.currentTime);
				loadingStopped = false;
			}
			play(fromGesture);
		};
		const gesturePlay = () => {
			activeRef.current = true;
			control.current?.(true);
		};
		if (playFromGestureRef) playFromGestureRef.current = gesturePlay;
		control.current();
		return () => {
			if (playFromGestureRef?.current === gesturePlay) playFromGestureRef.current = null;
			cancelled = true;
			control.current = null;
			revealFrame.current = null;
			if (frameRequest !== void 0) player.cancelVideoFrameCallback?.(frameRequest);
			player.pause();
			report.current.onPlayingChange?.(false);
			player.removeEventListener("loadedmetadata", tryPlay);
			player.removeEventListener("canplay", tryPlay);
			player.removeEventListener("progress", tryPlay);
			player.removeEventListener("seeked", tryPlay);
			player.removeEventListener("timeupdate", loopExcerpt);
			player.removeEventListener("ended", complete);
			destroy?.();
			player.removeAttribute("src");
			player.load();
		};
	}, [
		film.src,
		film.mobileSrc,
		start,
		end,
		playFromGestureRef,
		loop,
		startupBufferSeconds
	]);
	(0, import_react.useEffect)(() => {
		const setSound = (nextMuted) => {
			mutedRef.current = nextMuted;
			if (!video.current) return;
			video.current.muted = nextMuted;
			if (!nextMuted) video.current.volume = 1;
		};
		if (soundFromGestureRef) soundFromGestureRef.current = setSound;
		setSound(mutedRef.current);
		return () => {
			if (soundFromGestureRef?.current === setSound) soundFromGestureRef.current = null;
		};
	}, [soundFromGestureRef]);
	(0, import_react.useEffect)(() => {
		if (video.current) video.current.muted = muted;
	}, [muted]);
	const previousPlayRequest = (0, import_react.useRef)(playRequest);
	(0, import_react.useEffect)(() => {
		const explicitRetry = playRequest !== previousPlayRequest.current;
		previousPlayRequest.current = playRequest;
		control.current?.(explicitRetry);
	}, [active, playRequest]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
		ref: video,
		autoPlay: active && muted && start === 0 && /\.mp4(?:[?#]|$)/i.test(film.src),
		muted,
		playsInline: true,
		loop,
		preload: "none",
		poster: film.poster,
		"aria-label": `${film.title} ${full ? "full film" : "reel"}`,
		style: { opacity: failed || !hasFrame ? 0 : 1 },
		onPlaying: () => {
			if (!activeRef.current) {
				video.current?.pause();
				return;
			}
			revealFrame.current?.();
			report.current.onPlayingChange?.(true);
			report.current.onBlockedChange?.(false);
		},
		onPause: () => report.current.onPlayingChange?.(false),
		onError: () => {
			setFailed(true);
			report.current.onFrameChange?.(false);
			report.current.onBlockedChange?.(true);
			report.current.onPlayingChange?.(false);
		}
	});
}
//#endregion
//#region app/work/archive-vimeo.tsx
/** Official source films matched to creator and collaborator project pages. */
var archiveVimeoFilms = {
	"heart-bot": {
		id: 104567379,
		start: 45,
		end: 57
	},
	"beat-repeat": {
		id: 97760035,
		start: 16,
		end: 28
	},
	"nike-free-hyperfeel": {
		id: 77378108,
		start: 20,
		end: 35
	},
	"dream-machine": {
		id: 233887587,
		start: 15,
		end: 30
	}
};
var sdk;
function loadPlayer() {
	if (sdk) return sdk;
	sdk = new Promise((resolve, reject) => {
		const current = window.Vimeo;
		if (current) {
			resolve(current.Player);
			return;
		}
		const script = document.createElement("script");
		script.src = "https://player.vimeo.com/api/player.js";
		script.async = true;
		script.onload = () => {
			const api = window.Vimeo;
			api ? resolve(api.Player) : reject(/* @__PURE__ */ new Error("Vimeo player unavailable"));
		};
		script.onerror = () => reject(/* @__PURE__ */ new Error("Vimeo player unavailable"));
		document.head.appendChild(script);
	}).catch((error) => {
		sdk = void 0;
		throw error;
	});
	return sdk;
}
function prepareVimeoPlayer() {
	loadPlayer().catch(() => {});
}
function ArchiveVimeo({ film, active, full = false, title = "Project film", playRequest = 0, playFromGestureRef, muted = true, soundFromGestureRef, onMutedChange, nativeControls = false, onPlayingChange, onFrameChange, onBlockedChange, loop = true, onComplete, onProgress, revealOnPlayback = false }) {
	const host = (0, import_react.useRef)(null), activeRef = (0, import_react.useRef)(active), control = (0, import_react.useRef)(null);
	activeRef.current = active;
	const mutedRef = (0, import_react.useRef)(muted), soundControl = (0, import_react.useRef)(null);
	mutedRef.current = muted;
	(0, import_react.useEffect)(() => {
		soundControl.current?.(muted);
	}, [muted]);
	const report = (0, import_react.useRef)({
		onPlayingChange,
		onFrameChange,
		onBlockedChange,
		onComplete,
		onProgress,
		onMutedChange
	});
	report.current = {
		onPlayingChange,
		onFrameChange,
		onBlockedChange,
		onComplete,
		onProgress,
		onMutedChange
	};
	const [controlsReady, setControlsReady] = (0, import_react.useState)(false), [requested, setRequested] = (0, import_react.useState)(false), [ready, setReady] = (0, import_react.useState)(false), [initializationFailed, setInitializationFailed] = (0, import_react.useState)(false), [attempt, setAttempt] = (0, import_react.useState)(0);
	const failure = (0, import_react.useRef)(false);
	failure.current = initializationFailed;
	(0, import_react.useEffect)(() => {
		if (playRequest && failure.current) {
			setInitializationFailed(false);
			setAttempt((value) => value + 1);
		}
	}, [playRequest]);
	const previousPlayRequest = (0, import_react.useRef)(playRequest);
	(0, import_react.useEffect)(() => {
		if (active) setRequested(true);
		const retry = playRequest !== previousPlayRequest.current;
		previousPlayRequest.current = playRequest;
		control.current?.(retry);
	}, [active, playRequest]);
	(0, import_react.useEffect)(() => {
		if (!requested || !host.current) return;
		let cancelled = false, seeking = false, initialized = false, playerReady = false, completed = false, playbackStarted = false, pendingPlay = false, playGeneration = 0, seekGeneration = 0, autoplayBlocked = false;
		let interruptedStartupRetried = false;
		let instance, gesturePlay, setSound;
		let soundGeneration = 0;
		let lastFrameTime;
		const container = host.current;
		const initializationError = () => {
			if (cancelled) return;
			setReady(false);
			setInitializationFailed(true);
			report.current.onFrameChange?.(false);
			report.current.onBlockedChange?.(true);
			report.current.onPlayingChange?.(false);
		};
		setReady(false);
		setControlsReady(false);
		report.current.onFrameChange?.(false);
		loadPlayer().then((Player) => {
			if (cancelled || !host.current) return;
			const iframe = document.createElement("iframe");
			iframe.src = `https://player.vimeo.com/video/${film.id}?autoplay=0&muted=1&playsinline=1&background=0&autopause=0&controls=${nativeControls ? 1 : 0}&loop=${full && loop ? 1 : 0}&title=0&byline=0&portrait=0`;
			iframe.title = title;
			iframe.tabIndex = nativeControls ? 0 : -1;
			iframe.setAttribute("allow", "autoplay; fullscreen; picture-in-picture");
			iframe.setAttribute("aria-hidden", nativeControls ? "false" : "true");
			container.replaceChildren(iframe);
			instance = new Player(iframe, {
				id: film.id,
				autoplay: false,
				muted: true,
				playsinline: true,
				background: false,
				autopause: false,
				controls: nativeControls,
				loop: full && loop,
				title: false,
				byline: false,
				portrait: false,
				responsive: true
			});
			const current = instance;
			setSound = (nextMuted) => {
				mutedRef.current = nextMuted;
				if (!playerReady) return;
				const generation = ++soundGeneration;
				if (!nextMuted) current.setVolume(1).catch(() => {});
				current.setMuted(nextMuted).then((value) => {
					if (!cancelled && generation === soundGeneration) report.current.onMutedChange?.(value);
				}).catch(() => {
					if (cancelled || generation !== soundGeneration) return;
					mutedRef.current = true;
					report.current.onMutedChange?.(true);
				});
			};
			soundControl.current = setSound;
			if (soundFromGestureRef) soundFromGestureRef.current = setSound;
			const inRange = (seconds) => Number.isFinite(seconds) && (full || seconds >= film.start - .25 && seconds < film.end);
			const pause = () => {
				playGeneration++;
				pendingPlay = false;
				playbackStarted = false;
				lastFrameTime = void 0;
				report.current.onPlayingChange?.(false);
				current.pause().catch(() => {});
			};
			const play = () => {
				if (pendingPlay || playbackStarted || autoplayBlocked) return;
				pendingPlay = true;
				const generation = ++playGeneration;
				let retryInterruptedStartup = false;
				current.play().then(() => {
					if (cancelled || generation !== playGeneration) return;
					if (completed || !activeRef.current) pause();
				}).catch((error) => {
					if (cancelled || generation !== playGeneration || !activeRef.current) return;
					if (typeof error === "object" && error !== null && "name" in error && error.name === "AbortError") {
						if (mutedRef.current && !interruptedStartupRetried) {
							interruptedStartupRetried = true;
							retryInterruptedStartup = true;
						}
						return;
					}
					autoplayBlocked = true;
					report.current.onBlockedChange?.(true);
					report.current.onPlayingChange?.(false);
				}).finally(() => {
					if (generation !== playGeneration) return;
					pendingPlay = false;
					if (retryInterruptedStartup && !cancelled && !completed && activeRef.current && mutedRef.current) play();
				});
			};
			const fail = () => {
				if (cancelled) return;
				seeking = false;
				setReady(false);
				setControlsReady(false);
				report.current.onFrameChange?.(false);
				report.current.onBlockedChange?.(true);
				pause();
			};
			const sync = (retry = false) => {
				if (cancelled || completed) return;
				if (retry) autoplayBlocked = false;
				if (!activeRef.current) {
					pause();
					return;
				}
				if (nativeControls && !retry) return;
				if (initialized) play();
				else if (playerReady) {
					seekStart();
					play();
				}
			};
			const seekStart = () => {
				if (cancelled || completed || seeking) return;
				seeking = true;
				lastFrameTime = void 0;
				const generation = ++seekGeneration;
				current.setCurrentTime(full ? 0 : film.start).then((seconds) => {
					if (cancelled || generation !== seekGeneration) return;
					seeking = false;
					initialized = true;
					if (!revealOnPlayback && inRange(seconds)) {
						setReady(true);
						report.current.onFrameChange?.(true);
					}
					sync();
				}).catch(() => {
					if (!cancelled && generation === seekGeneration) fail();
				});
			};
			const complete = () => {
				if (cancelled || completed || loop || !initialized || !activeRef.current) return;
				completed = true;
				pause();
				report.current.onComplete?.();
			};
			const frame = (data, fromPlaying = false) => {
				if (cancelled || completed) return;
				if (!activeRef.current) {
					pause();
					return;
				}
				if (!full && !loop && initialized && data.seconds >= film.end) {
					complete();
					return;
				}
				if (!inRange(data.seconds)) {
					seekStart();
					return;
				}
				if (revealOnPlayback && !playbackStarted && lastFrameTime !== void 0 && data.seconds > lastFrameTime + .02) {
					playbackStarted = true;
					report.current.onPlayingChange?.(true);
					report.current.onBlockedChange?.(false);
				}
				lastFrameTime = data.seconds;
				report.current.onProgress?.(data.seconds);
				seeking = false;
				initialized = true;
				seekGeneration++;
				if (!revealOnPlayback || playbackStarted && (fromPlaying || data.seconds > (full ? 0 : film.start) + .02)) {
					setReady(true);
					report.current.onFrameChange?.(true);
				}
			};
			const seeked = (data) => {
				if (cancelled || completed) return;
				if (inRange(data.seconds)) {
					seeking = false;
					initialized = true;
					seekGeneration++;
					if (!revealOnPlayback) {
						setReady(true);
						report.current.onFrameChange?.(true);
					}
					sync();
				}
			};
			current.on("timeupdate", frame);
			current.on("playing", (data) => {
				if (cancelled || completed) return;
				if (!activeRef.current) {
					pause();
					return;
				}
				playbackStarted = true;
				if (Number.isFinite(data?.seconds)) frame(data, true);
				if (completed) return;
				report.current.onPlayingChange?.(true);
				report.current.onBlockedChange?.(false);
			});
			current.on("pause", () => {
				playbackStarted = false;
				if (!cancelled) report.current.onPlayingChange?.(false);
			});
			current.on("seeked", seeked);
			current.on("error", fail);
			current.on("ended", complete);
			control.current = sync;
			gesturePlay = () => {
				activeRef.current = true;
				sync(true);
			};
			if (playFromGestureRef) playFromGestureRef.current = gesturePlay;
			current.ready().then(() => {
				if (cancelled) return;
				playerReady = true;
				setControlsReady(true);
				setSound?.(mutedRef.current);
				sync();
			}).catch(initializationError);
		}).catch(initializationError);
		return () => {
			if (soundFromGestureRef && soundFromGestureRef.current === setSound) soundFromGestureRef.current = null;
			soundControl.current = null;
			if (playFromGestureRef && playFromGestureRef.current === gesturePlay) playFromGestureRef.current = null;
			cancelled = true;
			control.current = null;
			instance?.destroy().catch(() => {});
			container.replaceChildren();
		};
	}, [
		requested,
		film.id,
		film.start,
		film.end,
		full,
		attempt,
		nativeControls,
		loop,
		revealOnPlayback,
		playFromGestureRef,
		soundFromGestureRef
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		ref: host,
		className: "archive-intro-vimeo",
		style: { opacity: ready || nativeControls && controlsReady ? 1 : 0 },
		"aria-hidden": !nativeControls
	});
}
//#endregion
export { projectFilms as a, NativeFilm as i, archiveVimeoFilms as n, prepareVimeoPlayer as r, ArchiveVimeo as t };
