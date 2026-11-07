import { b as require_react, n as require_jsx_runtime, w as __toESM } from "../index.js";
import { t as Button } from "./button-PqnSvM18.js";
import { t as Input } from "./input-BesjKyYx.js";
//#region app/studio-tools/studio-controls.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function StudioControls({ initialRequests, initialCards }) {
	const [requests, setRequests] = (0, import_react.useState)(initialRequests), [cards, setCards] = (0, import_react.useState)(initialCards), [message, setMessage] = (0, import_react.useState)(""), [busy, setBusy] = (0, import_react.useState)(false);
	async function create(event) {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		setBusy(true);
		setMessage("");
		try {
			const res = await fetch("/api/object-cards", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ greeting: data.get("greeting") })
			});
			const value = await res.json();
			if (!res.ok) throw Error(value.error);
			setCards((items) => [value, ...items]);
		} catch {
			setMessage("The card could not be created. Please retry.");
		} finally {
			setBusy(false);
		}
	}
	async function change(id, status) {
		setBusy(true);
		setMessage("");
		try {
			if (!(await fetch("/api/object-requests/status", {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					id,
					status
				})
			})).ok) throw Error();
			setRequests((items) => items.map((item) => item.id === id ? {
				...item,
				status
			} : item));
		} catch {
			setMessage("The request status could not be saved. Please retry.");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "studio-inbox",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Object requests" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Latest 200 requests. No automatic email is sent. Contact the requester to confirm availability and pickup." }),
				requests.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "No requests yet." }) : requests.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "inbox-item",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [
							item.reference,
							" · ",
							item.object === "phone-stand" ? "Phone stand" : "Desk tray"
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							item.name,
							" · ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: `mailto:${item.email}`,
								children: item.email
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							item.ticket ? `Card ${item.ticket} · ` : "",
							item.createdAt,
							" UTC · ",
							item.status
						] }),
						item.note && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: item.note })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						disabled: busy,
						onClick: () => change(item.id, item.status === "new" ? "handled" : "new"),
						children: item.status === "new" ? "Mark handled" : "Reopen"
					})]
				}, item.id))
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "studio-inbox",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Public object cards" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Create a numbered link and QR code that opens this website without sign-in. Messages are public: use a general greeting, not recipient details. These cards link to the object request page; existing print-register cards remain in the printing application." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "card-create-form",
					onSubmit: create,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Welcome message ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						name: "greeting",
						maxLength: 200,
						defaultValue: "A small invitation from the Field Trip shop.",
						required: true
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						disabled: busy,
						type: "submit",
						children: "Create numbered card"
					})]
				}),
				cards.map((card) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "inbox-item",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: card.code }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: card.greeting }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [card.opens, " link openings · includes repeat visits and previews"] })
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: `/api/object-cards/qr?code=${card.code}`,
							download: `Field-Trip-${card.code}.svg`,
							children: "Download QR"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: `/t/${card.code}`,
							target: "_blank",
							rel: "noreferrer",
							children: "Open card"
						})
					]
				}, card.code))
			]
		}),
		message && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			role: "alert",
			children: message
		})
	] });
}
//#endregion
export { StudioControls };
