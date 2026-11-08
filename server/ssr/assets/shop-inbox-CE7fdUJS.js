import { b as require_react, n as require_jsx_runtime, w as __toESM } from "../index.js";
import { t as Button } from "./button-PqnSvM18.js";
//#region app/studio-tools/shop-inbox.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function ShopInbox({ initialRequests }) {
	const [requests, setRequests] = (0, import_react.useState)(initialRequests), [error, setError] = (0, import_react.useState)(""), [busy, setBusy] = (0, import_react.useState)(null);
	async function change(id, status) {
		setBusy(id);
		setError("");
		try {
			if (!(await fetch("/api/shop-requests/status", {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					id,
					status
				})
			})).ok) throw Error();
			setRequests((list) => list.map((item) => item.id === id ? {
				...item,
				status
			} : item));
		} catch {
			setError("Could not save the status. Try again.");
		} finally {
			setBusy(null);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "studio-inbox shop-inbox",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Shop requests" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Design-file and finished-object enquiries. These are not paid orders. No automatic email is sent." }),
			!requests.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "No shop requests yet." }),
			requests.map((item) => {
				const lines = JSON.parse(item.linesJson);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [
						item.reference,
						" · ",
						item.status
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						item.name,
						" · ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: `mailto:${item.email}?subject=${encodeURIComponent("Field Trip " + item.reference)}`,
							children: item.email
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						item.country,
						" ",
						item.postalCode,
						" · ",
						item.createdAt,
						" UTC"
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: lines.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						l.quantity,
						" × ",
						l.title,
						" / ",
						l.option
					] }, l.slug + l.option)) }),
					item.note && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: item.note }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						disabled: busy === item.id,
						onClick: () => change(item.id, item.status === "new" ? "handled" : "new"),
						children: item.status === "new" ? "Mark handled" : "Reopen"
					})
				] }, item.id);
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "alert",
				children: error
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
				className: "shop-details",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: "Before switching on payments" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Approve prototypes, release files and product-specific limitations." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Set separate design-file and finished-object prices and currency." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Connect your payment account and approved hosted checkout links." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Confirm licence, shipping regions and rates, lead times, returns and tax treatment." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Test payment, cancellation, refund and protected digital delivery. A checkout success page alone is not proof of payment." })
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Current storefront: quote requests only. No payment account or prices configured." })
				]
			})
		]
	});
}
//#endregion
export { ShopInbox };
