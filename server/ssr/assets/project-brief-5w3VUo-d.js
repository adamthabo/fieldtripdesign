import { b as require_react, n as require_jsx_runtime, w as __toESM } from "../index.js";
import { t as cn } from "./utils-ymay08E2.js";
//#region components/ui/textarea.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function Textarea({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		"data-slot": "textarea",
		className: cn("flex field-sizing-content min-h-16 w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:aria-invalid:ring-destructive/40", className),
		...props
	});
}
//#endregion
//#region app/contact/project-brief.tsx
var fieldTripEmail = "info@fieldtripdesign.com";
var emptyBrief = { details: "" };
function briefText(brief, context) {
	return [
		"Hello field trip,",
		"",
		brief.details.trim(),
		...context ? ["", `${context.kicker}: ${context.emailLabel}`] : []
	].join("\n");
}
function ProjectBrief({ context }) {
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setReady(true);
	}, []);
	const [brief, setBrief] = (0, import_react.useState)(emptyBrief);
	const updateBrief = (field, value) => {
		setBrief((current) => ({
			...current,
			[field]: value
		}));
	};
	const openDraft = (event) => {
		event.preventDefault();
		if (!ready) return;
		const subject = `Project inquiry — ${context?.emailLabel || "New message"}`;
		const draft = briefText(brief, context);
		window.location.href = `mailto:${fieldTripEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(draft)}`;
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "project-brief",
		tabIndex: -1,
		"data-page-section": true,
		className: "project-brief",
		"aria-labelledby": "project-brief-title",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				id: "project-brief-title",
				children: "Write to us"
			}),
			context && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
				className: `project-brief-context project-brief-context--${context.kind}`,
				"aria-label": "Inquiry context",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["About ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: context.href,
					children: context.label
				})] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("noscript", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				"Please email your project details to ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "mailto:info@fieldtripdesign.com",
					children: "info@fieldtripdesign.com"
				}),
				". The form requires JavaScript."
			] }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "project-brief-form",
				onSubmit: openDraft,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "project-brief-wide",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Message" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						disabled: !ready,
						name: "details",
						onChange: (event) => updateBrief("details", event.target.value),
						required: true,
						rows: 4,
						value: brief.details
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "project-brief-submit",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "project-brief-action",
						disabled: !ready,
						type: "submit",
						"aria-label": "Email Field Trip in your default mail app",
						children: "Email Field Trip"
					})
				})]
			})
		]
	});
}
//#endregion
export { ProjectBrief };
