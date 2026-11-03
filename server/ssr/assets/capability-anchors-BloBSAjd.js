import { b as require_react, w as __toESM } from "../index.js";
//#region app/about/capability-anchors.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function followCapabilityAnchor(hash) {
	if (window.location.pathname.replace(/\/$/, "") === "/about" && /^#(?:capabilities|design|fabrication|installation|engineering|interactive|management)(?:-(?:trigger|details|projects))?$/.test(hash)) {
		window.location.replace(`/home${window.location.search}${hash}`);
		return;
	}
	if (/^#(?:engineering|interactive|management)(?:-(?:trigger|details|projects))?$/.test(hash)) {
		window.history.replaceState(window.history.state, "", `${window.location.pathname}${window.location.search}#capabilities`);
		document.getElementById("capabilities")?.scrollIntoView({
			block: "start",
			behavior: "instant"
		});
		return;
	}
	const match = /^#(design|fabrication|installation)(?:-(?:trigger|details|projects))?$/.exec(hash);
	if (!match) return;
	const id = match[1];
	const trigger = document.getElementById(`${id}-trigger`);
	if (trigger?.getAttribute("aria-expanded") === "false") trigger.click();
	document.getElementById(id)?.scrollIntoView({
		block: "start",
		behavior: "instant"
	});
}
function CapabilityAnchors() {
	(0, import_react.useEffect)(() => {
		let frame = 0;
		const follow = () => {
			cancelAnimationFrame(frame);
			frame = requestAnimationFrame(() => followCapabilityAnchor(window.location.hash));
		};
		follow();
		window.addEventListener("hashchange", follow);
		return () => {
			cancelAnimationFrame(frame);
			window.removeEventListener("hashchange", follow);
		};
	}, []);
	return null;
}
//#endregion
export { CapabilityAnchors };
