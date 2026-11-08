import { b as require_react, n as require_jsx_runtime, w as __toESM } from "../index.js";
import { t as Textarea } from "./textarea-_NgpeGEb.js";
import { t as Button } from "./button-PqnSvM18.js";
import { t as BrandText } from "./field-trip-name-BbSfcdsd.js";
import { t as Input } from "./input-BesjKyYx.js";
import { n as NativeSelectOption, t as NativeSelect } from "./native-select-01-KG16R.js";
//#region app/objects/request-form.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function ObjectRequestForm({ initialTicket }) {
	const [busy, setBusy] = (0, import_react.useState)(false), [message, setMessage] = (0, import_react.useState)(""), [reference, setReference] = (0, import_react.useState)("");
	const requestId = (0, import_react.useRef)(null);
	const submitting = (0, import_react.useRef)(false);
	async function submit(event) {
		event.preventDefault();
		if (submitting.current) return;
		submitting.current = true;
		setBusy(true);
		setMessage("");
		const values = Object.fromEntries(new FormData(event.currentTarget));
		requestId.current ??= crypto.randomUUID();
		try {
			const response = await fetch("/api/object-requests", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					...values,
					requestId: requestId.current
				})
			});
			const result = await response.json();
			if (!response.ok) throw new Error(result.error || "Could not save your request. Please try again.");
			setReference(result.reference);
		} catch (error) {
			setMessage(error instanceof Error ? error.message : "Could not save your request. Please try again.");
		} finally {
			submitting.current = false;
			setBusy(false);
		}
	}
	if (reference) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "request-confirmation",
		role: "status",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Request received" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["Reference ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: reference })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandText, { children: "Your request is saved for the field trip shop. Keep this reference. We’ll reply to the email address you provided about availability and pickup." }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "No automatic confirmation email has been sent." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "mailto:info@fieldtripdesign.com",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandText, { children: "Contact field trip" })
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "object-request-form",
		onSubmit: submit,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Card number ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				name: "ticket",
				defaultValue: initialTicket,
				inputMode: "numeric",
				pattern: "[0-9]{4,12}",
				maxLength: 12,
				placeholder: "Optional"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Object ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(NativeSelect, {
				name: "object",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelectOption, {
					value: "phone-stand",
					children: "Phone stand"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelectOption, {
					value: "desk-tray",
					children: "Desk tray"
				})]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Name ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				name: "name",
				autoComplete: "name",
				required: true,
				maxLength: 100
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Email ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				name: "email",
				type: "email",
				autoComplete: "email",
				required: true,
				maxLength: 254
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Note ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
				name: "note",
				maxLength: 2e3,
				placeholder: "Optional: tell us about pickup or your interest in the object."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "form-honeypot",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Leave blank ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					name: "website",
					tabIndex: -1,
					autoComplete: "off"
				})] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "submit",
				disabled: busy,
				children: busy ? "Saving request…" : "Request a free sample"
			}),
			message && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				role: "alert",
				children: [
					message,
					" You can also email ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "mailto:info@fieldtripdesign.com",
						children: "info@fieldtripdesign.com"
					}),
					"."
				]
			})
		]
	});
}
//#endregion
export { ObjectRequestForm };
