import { b as require_react, n as require_jsx_runtime, w as __toESM } from "../index.js";
//#region app/reel-fullscreen.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
/** Expand the existing player, preserving its stream, position and sound choice. */
function createReelFullscreen(root, changed) {
	const doc = root.ownerDocument;
	const button = doc.activeElement;
	let fallback = false, disposed = false;
	let previousOverflow = "";
	let inertElements = [];
	const savedAttributes = /* @__PURE__ */ new Map();
	const fullscreenElement = () => doc.fullscreenElement ?? doc.webkitFullscreenElement;
	const cleanupFallback = () => {
		if (!fallback) return;
		fallback = false;
		root.removeAttribute("data-reel-expanded");
		for (const [name, value] of savedAttributes) if (value === null) root.removeAttribute(name);
		else root.setAttribute(name, value);
		for (const { element, inert } of inertElements) element.inert = inert;
		inertElements = [];
		doc.body.style.overflow = previousOverflow;
	};
	const sync = () => {
		const active = fullscreenElement() === root;
		root.toggleAttribute("data-reel-expanded", active || fallback);
		changed(active || fallback);
		if (!active && !fallback && !disposed) button?.focus({ preventScroll: true });
	};
	const expandFallback = () => {
		if (disposed) return;
		fallback = true;
		for (const name of ["role", "aria-modal"]) savedAttributes.set(name, root.getAttribute(name));
		root.setAttribute("role", "dialog");
		root.setAttribute("aria-modal", "true");
		root.setAttribute("data-reel-expanded", "");
		previousOverflow = doc.body.style.overflow;
		doc.body.style.overflow = "hidden";
		let branch = root;
		while (branch.parentElement && branch !== doc.body) {
			for (const sibling of Array.from(branch.parentElement.children)) if (sibling !== branch && sibling instanceof HTMLElement) {
				inertElements.push({
					element: sibling,
					inert: sibling.inert
				});
				sibling.inert = true;
			}
			branch = branch.parentElement;
		}
		changed(true);
	};
	const exit = async () => {
		if (fallback) {
			cleanupFallback();
			sync();
			return;
		}
		if (fullscreenElement() !== root) return;
		const exitFullscreen = doc.exitFullscreen ?? doc.webkitExitFullscreen;
		try {
			await exitFullscreen?.call(doc);
		} catch {
			sync();
		}
	};
	const keydown = (event) => {
		if (!fallback) return;
		if (event.key === "Escape") {
			event.preventDefault();
			exit();
		}
		if (event.key !== "Tab") return;
		const items = Array.from(root.querySelectorAll("button:not(:disabled),a[href],input:not(:disabled),[tabindex=\"0\"],iframe")).filter((el) => el.getClientRects().length && !el.closest("[hidden],[inert]"));
		const first = items[0], last = items[items.length - 1];
		if (event.shiftKey && doc.activeElement === first) {
			event.preventDefault();
			last?.focus();
		} else if (!event.shiftKey && doc.activeElement === last) {
			event.preventDefault();
			first?.focus();
		}
	};
	doc.addEventListener("fullscreenchange", sync);
	doc.addEventListener("webkitfullscreenchange", sync);
	doc.addEventListener("keydown", keydown);
	return {
		async toggle() {
			if (fallback || fullscreenElement() === root) {
				await exit();
				return;
			}
			const request = root.requestFullscreen ?? root.webkitRequestFullscreen;
			if (!request) {
				expandFallback();
				return;
			}
			try {
				await request.call(root);
				if (!disposed) sync();
			} catch {
				expandFallback();
			}
		},
		destroy() {
			disposed = true;
			cleanupFallback();
			doc.removeEventListener("fullscreenchange", sync);
			doc.removeEventListener("webkitfullscreenchange", sync);
			doc.removeEventListener("keydown", keydown);
			root.removeAttribute("data-reel-expanded");
		}
	};
}
//#endregion
//#region app/reel-fullscreen-button.tsx
var import_jsx_runtime = require_jsx_runtime();
function ReelFullscreenButton() {
	const [active, setActive] = (0, import_react.useState)(false);
	const controller = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => () => {
		controller.current?.destroy();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		className: "reel-fullscreen-toggle",
		"aria-label": active ? "Exit full screen" : "View reel full screen",
		"aria-pressed": active,
		onClick: (event) => {
			const root = event.currentTarget.closest("[data-reel-fullscreen]");
			if (!root) return;
			controller.current ??= createReelFullscreen(root, setActive);
			controller.current.toggle();
		},
		children: active ? "Exit full screen" : "Full screen"
	});
}
//#endregion
export { ReelFullscreenButton as t };
