import { b as require_react, l as usePathname, n as require_jsx_runtime, u as useRouter, w as __toESM } from "../index.js";
import Link from "./link-Bfvg7QdF.js";
//#region app/site-navigation.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var primaryNavigation = [
	{
		key: "home",
		label: "Home",
		href: "/home"
	},
	{
		key: "work",
		label: "Projects",
		href: "/work"
	},
	{
		key: "about",
		label: "About",
		href: "/about"
	},
	{
		key: "news",
		label: "News",
		href: "/news"
	},
	{
		key: "contact",
		label: "Contact",
		href: "/contact"
	}
];
//#endregion
//#region app/header-menu.tsx
var import_jsx_runtime = require_jsx_runtime();
function HeaderMenu({ current }) {
	const pathname = usePathname();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeaderMenuDisclosure, { current }, pathname);
}
/** Full-screen navigation; genuine links, modal keyboard behavior, no hover dismissal. */
function HeaderMenuDisclosure({ current }) {
	const router = useRouter();
	const pathname = usePathname();
	const [open, setOpen] = (0, import_react.useState)(false);
	const [keyboardMode, setKeyboardMode] = (0, import_react.useState)(false);
	const root = (0, import_react.useRef)(null);
	const toggle = (0, import_react.useRef)(null);
	const firstLink = (0, import_react.useRef)(null);
	const panel = (0, import_react.useRef)(null);
	const flips = (0, import_react.useRef)(/* @__PURE__ */ new Map());
	const pendingNavigation = (0, import_react.useRef)(null);
	const close = (restore = true) => {
		setOpen(false);
		if (restore) window.requestAnimationFrame(() => toggle.current?.focus({ preventScroll: true }));
	};
	(0, import_react.useEffect)(() => () => {
		pendingNavigation.current = null;
		flips.current.forEach((animation) => animation.cancel());
		flips.current.clear();
	}, [open]);
	const flipWord = (link, pointerEntry = false) => {
		if (!window.matchMedia?.("(min-width: 901px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return null;
		const label = link.querySelector(".site-menu-label");
		if (!label?.animate) return null;
		const active = flips.current.get(label);
		if (active && (active.playState === "running" || !pointerEntry)) return active;
		active?.cancel();
		const animation = label.animate([
			{ transform: "rotateX(0deg)" },
			{ transform: "rotateX(-90deg)" },
			{ transform: "rotateX(-180deg)" },
			{ transform: "rotateX(-270deg)" },
			{ transform: "rotateX(-360deg)" }
		], {
			duration: 720,
			easing: "cubic-bezier(.4,0,.6,1)"
		});
		flips.current.set(label, animation);
		animation.finished.catch(() => {});
		return animation;
	};
	const selectLink = (event, href) => {
		if (event?.metaKey || event?.ctrlKey || event?.shiftKey || event?.altKey || event && event.button !== 0) return;
		const animation = event && flipWord(event.currentTarget);
		if (!animation) {
			if (href === pathname) close(false);
			return;
		}
		event.preventDefault();
		pendingNavigation.current = animation;
		animation.finished.then(() => {
			if (pendingNavigation.current !== animation) return;
			pendingNavigation.current = null;
			if (href === pathname) close(false);
			router.push(href);
		}, () => {});
	};
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const bodyOverflow = document.body.style.overflow;
		const htmlOverflow = document.documentElement.style.overflow;
		document.body.style.overflow = "hidden";
		document.documentElement.style.overflow = "hidden";
		const inactive = [];
		let branch = root.current;
		while (branch?.parentElement) {
			for (const sibling of Array.from(branch.parentElement.children)) {
				const element = sibling;
				if (element !== branch) {
					inactive.push({
						element,
						inert: element.inert
					});
					element.inert = true;
				}
			}
			if (branch.parentElement === document.body) break;
			branch = branch.parentElement;
		}
		firstLink.current?.focus({ preventScroll: true });
		const keydown = (event) => {
			setKeyboardMode(true);
			if (event.key === "Escape") {
				event.preventDefault();
				close();
				return;
			}
			if (event.key !== "Tab") return;
			const items = Array.from(panel.current?.querySelectorAll("button, a[href]") ?? []);
			const first = items[0], last = items[items.length - 1];
			if (event.shiftKey && (document.activeElement === first || !panel.current?.contains(document.activeElement))) {
				event.preventDefault();
				last?.focus();
			} else if (!event.shiftKey && (document.activeElement === last || !panel.current?.contains(document.activeElement))) {
				event.preventDefault();
				first?.focus();
			}
		};
		document.addEventListener("keydown", keydown);
		return () => {
			document.body.style.overflow = bodyOverflow;
			document.documentElement.style.overflow = htmlOverflow;
			inactive.forEach(({ element, inert }) => {
				element.inert = inert;
			});
			document.removeEventListener("keydown", keydown);
		};
	}, [open]);
	(0, import_react.useEffect)(() => {
		const menu = panel.current;
		if (!open || !menu || typeof window.getComputedStyle !== "function") return;
		const labels = Array.from(menu.querySelectorAll(".site-menu-label"));
		const paint = () => {
			const style = window.getComputedStyle(menu);
			const accent = style.getPropertyValue("--menu-accent").trim() || "#a63d2f";
			const foreground = style.getPropertyValue("--menu-ink").trim() || "#fff";
			for (const label of labels) {
				const link = label.closest("a");
				const emphasized = link?.getAttribute("aria-current") === "page" || link?.matches(":hover") || keyboardMode && link?.matches(":focus-visible");
				label.style.color = emphasized ? accent : foreground;
			}
		};
		paint();
		const timer = window.setInterval(paint, 80);
		return () => {
			window.clearInterval(timer);
			labels.forEach((label) => label.style.removeProperty("color"));
		};
	}, [open, keyboardMode]);
	const openWithArrow = (event) => {
		if (event.key === "ArrowDown") {
			event.preventDefault();
			setKeyboardMode(true);
			setOpen(true);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: root,
		className: "site-menu",
		"data-open": open,
		"data-keyboard": keyboardMode,
		onPointerDownCapture: () => setKeyboardMode(false),
		onPointerMoveCapture: () => setKeyboardMode(false),
		onKeyDownCapture: () => setKeyboardMode(true),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				ref: toggle,
				type: "button",
				className: "site-menu-toggle",
				"aria-label": "Menu",
				"aria-expanded": open,
				"aria-controls": "site-navigation-panel",
				onKeyDown: openWithArrow,
				onClick: (event) => {
					setKeyboardMode(event?.detail === 0);
					setOpen(true);
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "site-menu-lines",
					"aria-hidden": "true",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				ref: panel,
				id: "site-navigation-panel",
				className: "site-menu-panel",
				hidden: !open,
				role: "dialog",
				"aria-modal": "true",
				"aria-label": "Site navigation",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "site-menu-close",
					type: "button",
					"aria-label": "Close menu",
					onClick: () => close(),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"aria-hidden": "true",
						children: "×"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "section-nav site-menu-nav",
					"aria-label": "Main navigation",
					children: primaryNavigation.map(({ key, label, href }, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						ref: index === 0 ? firstLink : void 0,
						className: "site-menu-link",
						"aria-current": current === key ? "page" : void 0,
						href,
						onPointerEnter: (event) => flipWord(event.currentTarget, true),
						onClick: (event) => selectLink(event, href),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "site-menu-label",
							children: label
						})
					}, href))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "section-nav site-menu-static",
				"aria-label": "Main navigation",
				children: primaryNavigation.map(({ key, label, href }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					"aria-current": current === key ? "page" : void 0,
					href,
					children: label
				}, href))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("noscript", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `.section-header{flex-wrap:wrap}.site-menu{flex-basis:100%}.site-menu-toggle{display:none}.section-header .site-menu-static{display:flex}` }) })
		]
	});
}
//#endregion
export { HeaderMenu };
