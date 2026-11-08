import { b as require_react, l as usePathname, n as require_jsx_runtime, w as __toESM } from "../index.js";
import { t as cn } from "./utils-QUTXbMHG.js";
import { c as createContextScope, s as composeEventHandlers } from "./dist-BiDiLra7.js";
import { a as DialogDescription, c as DialogTitle, i as DialogContent, l as DialogTrigger, n as Dialog, o as DialogOverlay, r as DialogClose, s as DialogPortal, t as X, u as createDialogScope } from "./x-Dmg9dQeD.js";
import { t as Button } from "./button-PqnSvM18.js";
//#region node_modules/@radix-ui/react-alert-dialog/node_modules/@radix-ui/react-compose-refs/dist/index.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var __defProp$1 = Object.defineProperty;
var __name$1 = (target, value) => __defProp$1(target, "name", {
	value,
	configurable: true
});
function setRef(ref, value) {
	if (typeof ref === "function") return ref(value);
	else if (ref !== null && ref !== void 0) ref.current = value;
}
__name$1(setRef, "setRef");
function composeRefs(...refs) {
	return (node) => {
		let hasCleanup = false;
		const cleanups = refs.map((ref) => {
			const cleanup = setRef(ref, node);
			if (!hasCleanup && typeof cleanup == "function") hasCleanup = true;
			return cleanup;
		});
		if (hasCleanup) return () => {
			for (let i = 0; i < cleanups.length; i++) {
				const cleanup = cleanups[i];
				if (typeof cleanup == "function") cleanup();
				else setRef(refs[i], null);
			}
		};
	};
}
__name$1(composeRefs, "composeRefs");
function useComposedRefs(...refs) {
	return import_react.useCallback(composeRefs(...refs), refs);
}
__name$1(useComposedRefs, "useComposedRefs");
//#endregion
//#region node_modules/@radix-ui/react-alert-dialog/dist/index.mjs
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", {
	value,
	configurable: true
});
var [createAlertDialogContext, createAlertDialogScope] = createContextScope("AlertDialog", [createDialogScope]);
var useDialogScope = createDialogScope();
var AlertDialog$1 = /* @__PURE__ */ __name((props) => {
	const { __scopeAlertDialog, ...alertDialogProps } = props;
	const dialogScope = useDialogScope(__scopeAlertDialog);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		...dialogScope,
		...alertDialogProps,
		modal: true
	});
}, "AlertDialog");
var AlertDialogTrigger$1 = import_react.forwardRef(/* @__PURE__ */ __name(function AlertDialogTrigger2(props, forwardedRef) {
	const { __scopeAlertDialog, ...triggerProps } = props;
	const dialogScope = useDialogScope(__scopeAlertDialog);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
		...dialogScope,
		...triggerProps,
		ref: forwardedRef
	});
}, "AlertDialogTrigger"));
var AlertDialogPortal$1 = /* @__PURE__ */ __name((props) => {
	const { __scopeAlertDialog, ...portalProps } = props;
	const dialogScope = useDialogScope(__scopeAlertDialog);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogPortal, {
		...dialogScope,
		...portalProps
	});
}, "AlertDialogPortal");
var AlertDialogOverlay$1 = import_react.forwardRef(/* @__PURE__ */ __name(function AlertDialogOverlay2(props, forwardedRef) {
	const { __scopeAlertDialog, ...overlayProps } = props;
	const dialogScope = useDialogScope(__scopeAlertDialog);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {
		...dialogScope,
		...overlayProps,
		ref: forwardedRef
	});
}, "AlertDialogOverlay"));
var [AlertDialogContentProvider, useAlertDialogContentContext] = createAlertDialogContext("AlertDialogContent");
var AlertDialogContent$1 = import_react.forwardRef(/* @__PURE__ */ __name(function AlertDialogContent2(props, forwardedRef) {
	const { __scopeAlertDialog, children, ...contentProps } = props;
	const dialogScope = useDialogScope(__scopeAlertDialog);
	const composedRefs = useComposedRefs(forwardedRef, import_react.useRef(null));
	const cancelRef = import_react.useRef(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogContentProvider, {
		scope: __scopeAlertDialog,
		cancelRef,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {
			role: "alertdialog",
			...dialogScope,
			...contentProps,
			ref: composedRefs,
			onOpenAutoFocus: composeEventHandlers(contentProps.onOpenAutoFocus, (event) => {
				event.preventDefault();
				cancelRef.current?.focus({ preventScroll: true });
			}),
			onPointerDownOutside: (event) => event.preventDefault(),
			onInteractOutside: (event) => event.preventDefault(),
			children
		})
	});
}, "AlertDialogContent"));
var AlertDialogTitle$1 = import_react.forwardRef(/* @__PURE__ */ __name(function AlertDialogTitle2(props, forwardedRef) {
	const { __scopeAlertDialog, ...titleProps } = props;
	const dialogScope = useDialogScope(__scopeAlertDialog);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
		...dialogScope,
		...titleProps,
		ref: forwardedRef
	});
}, "AlertDialogTitle"));
var AlertDialogDescription$1 = import_react.forwardRef(/* @__PURE__ */ __name(function AlertDialogDescription2(props, forwardedRef) {
	const { __scopeAlertDialog, ...descriptionProps } = props;
	const dialogScope = useDialogScope(__scopeAlertDialog);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
		...dialogScope,
		...descriptionProps,
		ref: forwardedRef
	});
}, "AlertDialogDescription"));
var AlertDialogAction$1 = import_react.forwardRef(/* @__PURE__ */ __name(function AlertDialogAction2(props, forwardedRef) {
	const { __scopeAlertDialog, ...actionProps } = props;
	const dialogScope = useDialogScope(__scopeAlertDialog);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
		...dialogScope,
		...actionProps,
		ref: forwardedRef
	});
}, "AlertDialogAction"));
var CANCEL_NAME = "AlertDialogCancel";
var AlertDialogCancel$1 = import_react.forwardRef(/* @__PURE__ */ __name(function AlertDialogCancel2(props, forwardedRef) {
	const { __scopeAlertDialog, ...cancelProps } = props;
	const { cancelRef } = useAlertDialogContentContext(CANCEL_NAME, __scopeAlertDialog);
	const dialogScope = useDialogScope(__scopeAlertDialog);
	const ref = useComposedRefs(forwardedRef, cancelRef);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
		...dialogScope,
		...cancelProps,
		ref
	});
}, "AlertDialogCancel"));
var Root2 = AlertDialog$1;
var Trigger2 = AlertDialogTrigger$1;
var Portal2 = AlertDialogPortal$1;
var Overlay2 = AlertDialogOverlay$1;
var Content2 = AlertDialogContent$1;
var Action = AlertDialogAction$1;
var Cancel = AlertDialogCancel$1;
var Title2 = AlertDialogTitle$1;
var Description2 = AlertDialogDescription$1;
//#endregion
//#region components/ui/alert-dialog.tsx
function AlertDialog({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root2, {
		"data-slot": "alert-dialog",
		...props
	});
}
function AlertDialogTrigger({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger2, {
		"data-slot": "alert-dialog-trigger",
		...props
	});
}
function AlertDialogPortal({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal2, {
		"data-slot": "alert-dialog-portal",
		...props
	});
}
function AlertDialogOverlay({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay2, {
		"data-slot": "alert-dialog-overlay",
		className: cn("fixed inset-0 z-50 bg-black/50 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0", className),
		...props
	});
}
function AlertDialogContent({ className, size = "default", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
		"data-slot": "alert-dialog-content",
		"data-size": size,
		className: cn("group/alert-dialog-content fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border bg-background p-6 shadow-lg duration-200 data-[size=sm]:max-w-xs data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[size=default]:sm:max-w-lg", className),
		...props
	})] });
}
function AlertDialogHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "alert-dialog-header",
		className: cn("grid grid-rows-[auto_1fr] place-items-center gap-1.5 text-center has-data-[slot=alert-dialog-media]:grid-rows-[auto_auto_1fr] has-data-[slot=alert-dialog-media]:gap-x-6 sm:group-data-[size=default]/alert-dialog-content:place-items-start sm:group-data-[size=default]/alert-dialog-content:text-left sm:group-data-[size=default]/alert-dialog-content:has-data-[slot=alert-dialog-media]:grid-rows-[auto_1fr]", className),
		...props
	});
}
function AlertDialogFooter({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "alert-dialog-footer",
		className: cn("flex flex-col-reverse gap-2 group-data-[size=sm]/alert-dialog-content:grid group-data-[size=sm]/alert-dialog-content:grid-cols-2 sm:flex-row sm:justify-end", className),
		...props
	});
}
function AlertDialogTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title2, {
		"data-slot": "alert-dialog-title",
		className: cn("text-lg font-semibold sm:group-data-[size=default]/alert-dialog-content:group-has-data-[slot=alert-dialog-media]/alert-dialog-content:col-start-2", className),
		...props
	});
}
function AlertDialogDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description2, {
		"data-slot": "alert-dialog-description",
		className: cn("text-sm text-muted-foreground", className),
		...props
	});
}
function AlertDialogAction({ className, variant = "default", size = "default", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		variant,
		size,
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
			"data-slot": "alert-dialog-action",
			className: cn(className),
			...props
		})
	});
}
function AlertDialogCancel({ className, variant = "outline", size = "default", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		variant,
		size,
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cancel, {
			"data-slot": "alert-dialog-cancel",
			className: cn(className),
			...props
		})
	});
}
//#endregion
//#region components/ui/sheet.tsx
function Sheet({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		"data-slot": "sheet",
		...props
	});
}
function SheetPortal({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogPortal, {
		"data-slot": "sheet-portal",
		...props
	});
}
function SheetOverlay({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {
		"data-slot": "sheet-overlay",
		className: cn("fixed inset-0 z-50 bg-black/50 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0", className),
		...props
	});
}
function SheetContent({ className, children, side = "right", showCloseButton = true, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
		"data-slot": "sheet-content",
		className: cn("fixed z-50 flex flex-col gap-4 bg-background shadow-lg transition ease-in-out data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:animate-in data-[state=open]:duration-500", side === "right" && "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm", side === "left" && "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm", side === "top" && "inset-x-0 top-0 h-auto border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top", side === "bottom" && "inset-x-0 bottom-0 h-auto border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom", className),
		...props,
		children: [children, showCloseButton && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
			className: "absolute top-4 right-4 rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none data-[state=open]:bg-secondary",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: "Close"
			})]
		})]
	})] });
}
function SheetHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "sheet-header",
		className: cn("flex flex-col gap-1.5 p-4", className),
		...props
	});
}
function SheetTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
		"data-slot": "sheet-title",
		className: cn("font-semibold text-foreground", className),
		...props
	});
}
function SheetDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
		"data-slot": "sheet-description",
		className: cn("text-sm text-muted-foreground", className),
		...props
	});
}
//#endregion
//#region app/editor/editor-shell.tsx
var candidateSelector = [
	"h1",
	"h2",
	"h3",
	"h4",
	"p",
	"span",
	"strong",
	"small",
	"dt",
	"dd",
	"figcaption",
	"label",
	"a",
	"button",
	"li",
	"em",
	"b"
].join(",");
function isEditableElement(element) {
	if (element.closest("[data-editor-root]")) return false;
	if (element.closest("[aria-hidden='true'], [inert]")) return false;
	if (element.matches("input, textarea, select, option, script, style, svg, [contenteditable]")) return false;
	if (!element.innerText.trim()) return false;
	if (element.dataset.contentKey) return true;
	return ![...element.children].some((child) => child.tagName !== "BR");
}
function elementKey(element, pathname) {
	if (element.dataset.contentKey) return element.dataset.contentKey;
	const parts = [];
	let current = element;
	while (current && current !== document.body) {
		if (current.id) {
			parts.unshift(`#${current.id}`);
			break;
		}
		const parent = current.parentElement;
		if (!parent) break;
		const tag = current.tagName.toLowerCase();
		const siblings = [...parent.children].filter((sibling) => sibling.tagName === current?.tagName);
		parts.unshift(`${tag}:${siblings.indexOf(current) + 1}`);
		current = parent;
	}
	return `page.${pathname}.dom.${parts.join(">")}`;
}
function EditorShell({ canEdit, initialOverrides, controlsEnabled = false }) {
	const pathname = usePathname() || "/";
	const [editing, setEditing] = (0, import_react.useState)(false);
	const [target, setTarget] = (0, import_react.useState)(null);
	const [draft, setDraft] = (0, import_react.useState)("");
	const [status, setStatus] = (0, import_react.useState)("idle");
	const [overrideCount, setOverrideCount] = (0, import_react.useState)(initialOverrides.length);
	const overridesRef = (0, import_react.useRef)(new Map(initialOverrides.map((override) => [override.key, override])));
	const observerRef = (0, import_react.useRef)(null);
	const scan = (0, import_react.useCallback)(() => {
		const candidates = [...document.body.querySelectorAll(candidateSelector)].filter(isEditableElement);
		for (const element of candidates) {
			const key = elementKey(element, pathname);
			element.dataset.editorKey = key;
			if (element.dataset.editorSource === void 0) element.dataset.editorSource = element.innerText;
			if (editing && canEdit) element.dataset.typeEditable = "true";
			else delete element.dataset.typeEditable;
			const override = overridesRef.current.get(key);
			if (override && element.innerText !== override.value) element.innerText = override.value;
		}
	}, [
		canEdit,
		editing,
		pathname
	]);
	(0, import_react.useEffect)(() => {
		scan();
		observerRef.current?.disconnect();
		const observer = new MutationObserver(() => window.requestAnimationFrame(scan));
		observer.observe(document.body, {
			childList: true,
			subtree: true
		});
		observerRef.current = observer;
		return () => observer.disconnect();
	}, [scan]);
	(0, import_react.useEffect)(() => {
		if (!canEdit) return;
		let cancelled = false;
		fetch("/api/editor").then((response) => response.ok ? response.json() : null).then((payload) => {
			if (cancelled || !payload || typeof payload !== "object" || !("overrides" in payload) || !Array.isArray(payload.overrides)) return;
			const overrides = payload.overrides.filter((override) => override !== null && typeof override === "object" && typeof override.key === "string" && typeof override.value === "string" && typeof override.pagePath === "string");
			overridesRef.current = new Map(overrides.map((override) => [override.key, override]));
			setOverrideCount(overrides.length);
			window.requestAnimationFrame(scan);
		}).catch(() => null);
		return () => {
			cancelled = true;
		};
	}, [canEdit, scan]);
	(0, import_react.useEffect)(() => {
		document.body.classList.toggle("type-editing", editing && canEdit);
		scan();
		return () => document.body.classList.remove("type-editing");
	}, [
		canEdit,
		editing,
		scan
	]);
	(0, import_react.useEffect)(() => {
		if (!editing || !canEdit) return;
		const handleClick = (event) => {
			const element = event.target?.closest("[data-type-editable='true']");
			if (!element || element.closest("[data-editor-root]")) return;
			event.preventDefault();
			event.stopPropagation();
			setTarget({
				element,
				key: element.dataset.editorKey ?? elementKey(element, pathname),
				source: element.dataset.editorSource ?? element.innerText
			});
			setDraft(element.innerText);
			setStatus("idle");
		};
		document.addEventListener("click", handleClick, true);
		return () => document.removeEventListener("click", handleClick, true);
	}, [
		canEdit,
		editing,
		pathname
	]);
	(0, import_react.useEffect)(() => {
		const handleKeyDown = (event) => {
			if (event.key !== "Escape") return;
			if (target) setTarget(null);
			else setEditing(false);
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [target]);
	const save = async () => {
		if (!target) return;
		setStatus("saving");
		if (!(await fetch("/api/editor", {
			method: "PATCH",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({
				key: target.key,
				pagePath: pathname,
				value: draft
			})
		}).catch(() => null))?.ok) {
			setStatus("error");
			return;
		}
		const isNewOverride = !overridesRef.current.has(target.key);
		overridesRef.current.set(target.key, {
			key: target.key,
			value: draft,
			pagePath: pathname
		});
		if (isNewOverride) setOverrideCount((count) => count + 1);
		document.querySelectorAll("[data-editor-key]").forEach((element) => {
			if (element.dataset.editorKey === target.key) element.innerText = draft;
		});
		setStatus("saved");
	};
	const resetTarget = async () => {
		if (!target) return;
		setStatus("saving");
		if (!(await fetch("/api/editor", {
			method: "DELETE",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({
				key: target.key,
				pagePath: pathname
			})
		}).catch(() => null))?.ok) {
			setStatus("error");
			return;
		}
		if (overridesRef.current.delete(target.key)) setOverrideCount((count) => Math.max(0, count - 1));
		document.querySelectorAll("[data-editor-key]").forEach((element) => {
			if (element.dataset.editorKey === target.key) element.innerText = element.dataset.editorSource ?? target.source;
		});
		setDraft(target.source);
		setStatus("saved");
	};
	const resetPage = async () => {
		setStatus("saving");
		if (!(await fetch("/api/editor", {
			method: "DELETE",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({ pagePath: pathname })
		}).catch(() => null))?.ok) {
			setStatus("error");
			return;
		}
		let removed = 0;
		for (const [key, override] of overridesRef.current) {
			if (override.pagePath === pathname) overridesRef.current.delete(key);
			if (override.pagePath === pathname) removed += 1;
		}
		setOverrideCount((count) => Math.max(0, count - removed));
		window.location.reload();
	};
	const toggleEditing = () => {
		if (editing) setTarget(null);
		setEditing((current) => !current);
	};
	if (!canEdit || !controlsEnabled) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "type-editor",
		"data-editor-root": true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				"aria-pressed": editing,
				className: "type-editor-toggle",
				onClick: toggleEditing,
				type: "button",
				children: editing ? "Done" : "Edit type"
			}),
			editing && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "type-editor-bar",
				"aria-label": "Type editor",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Edit type" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [overrideCount, " saved overrides"] })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Click outlined text to replace it." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialog, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTrigger, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							children: "Reset this page"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, {
						className: "type-editor-confirm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: "Reset this page?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogDescription, { children: [
							"This removes every saved text override on ",
							pathname,
							". Original site text will return."
						] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: "Keep edits" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
							onClick: resetPage,
							children: "Reset page"
						})] })]
					})] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
				open: target !== null,
				onOpenChange: (open) => {
					if (!open) setTarget(null);
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
					className: "type-editor-panel",
					"data-editor-root": true,
					side: "right",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetHeader, {
						className: "type-editor-panel-head",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, { children: "Edit text" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetDescription, { children: "Saved text overrides the published copy without changing the source record." })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "type-editor-panel-body",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "type-editor-text",
								children: "Replacement text"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								autoFocus: true,
								id: "type-editor-text",
								onChange: (event) => setDraft(event.target.value),
								rows: Math.min(12, Math.max(4, draft.split("\n").length + Math.ceil(draft.length / 70))),
								value: draft
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "type-editor-panel-actions",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									disabled: status === "saving",
									onClick: save,
									type: "button",
									children: status === "saving" ? "Saving…" : "Save override"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									disabled: status === "saving",
									onClick: resetTarget,
									type: "button",
									children: "Use original"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								"aria-live": "polite",
								className: `type-editor-status type-editor-status--${status}`,
								children: status === "saved" ? "Saved." : status === "error" ? "Could not save. Try again." : ""
							})
						]
					})]
				})
			})
		]
	});
}
//#endregion
export { EditorShell };
