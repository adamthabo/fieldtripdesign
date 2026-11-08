import { b as require_react, n as require_jsx_runtime, w as __toESM } from "../index.js";
//#region app/work/private-residence/gallery-content.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var residenceContent = "<main class=\"project-detail project-detail--unified residence-project\" id=\"main-content\" tabindex=\"-1\">\n<a class=\"project-back\" href=\"/work\">Projects</a>\n<header class=\"project-hero project-title-block\"><div class=\"project-hero-copy\"><h1 class=\"project-detail-title\">Private Residence</h1><p class=\"section-kicker\"><span>Oakland, California</span><span>/ 2023</span></p></div></header>\n<section class=\"residence-introduction\" aria-label=\"Project description\"><div><p class=\"project-attribution-copy\">Wall lath reclaimed from the original nineteenth-century Victorian residence in Oakland was laminated through multiple glue-ups to create the kitchen’s door and drawer facings. All lath was salvaged from the house, and the completed facings were finished with Rubio.</p></div></section>\n<div class=\"project-sequence\" id=\"project-images\" aria-label=\"Private Residence image gallery\"><div class=\"project-sequence-row\" style=\"--project-row-columns:1.500000fr 0.800285fr\"><figure class=\"project-sequence-item\" id=\"view-1\" data-original-number=\"21\">\n<button type=\"button\" class=\"project-sequence-trigger\" data-image=\"0\" aria-label=\"Enlarge image 1 of 7\">\n<img src=\"/project-galleries/private-residence/01.jpg\" width=\"1536\" height=\"1024\" alt=\"AI-assisted recreation: cooking wall, Private Residence, Oakland.\" loading=\"eager\" decoding=\"sync\"></button>\n<figcaption class=\"photo-number\"><span>01</span></figcaption></figure><figure class=\"project-sequence-item\" id=\"view-2\" data-original-number=\"22\">\n<button type=\"button\" class=\"project-sequence-trigger\" data-image=\"1\" aria-label=\"Enlarge image 2 of 7\">\n<img src=\"/project-galleries/private-residence/02.jpg\" width=\"1122\" height=\"1402\" alt=\"AI-assisted recreation: sink cabinet, Private Residence, Oakland.\" loading=\"eager\" decoding=\"sync\"></button>\n<figcaption class=\"photo-number\"><span>02</span></figcaption></figure></div><div class=\"project-sequence-row\" style=\"--project-row-columns:1.500000fr 1.500000fr\"><figure class=\"project-sequence-item\" id=\"view-3\" data-original-number=\"19\">\n<button type=\"button\" class=\"project-sequence-trigger\" data-image=\"2\" aria-label=\"Enlarge image 3 of 7\">\n<img src=\"/project-galleries/private-residence/03.jpg\" width=\"1536\" height=\"1024\" alt=\"AI-assisted recreation: kitchen overview toward the patio, Private Residence, Oakland.\" loading=\"eager\" decoding=\"sync\"></button>\n<figcaption class=\"photo-number\"><span>03</span></figcaption></figure><figure class=\"project-sequence-item\" id=\"view-4\" data-original-number=\"20\">\n<button type=\"button\" class=\"project-sequence-trigger\" data-image=\"3\" aria-label=\"Enlarge image 4 of 7\">\n<img src=\"/project-galleries/private-residence/04.jpg\" width=\"1536\" height=\"1024\" alt=\"AI-assisted recreation: kitchen and living area without island, Private Residence, Oakland.\" loading=\"eager\" decoding=\"sync\"></button>\n<figcaption class=\"photo-number\"><span>04</span></figcaption></figure></div><div class=\"project-sequence-row\" style=\"--project-row-columns:1.500000fr 0.800285fr\"><figure class=\"project-sequence-item\" id=\"view-5\" data-original-number=\"25\">\n<button type=\"button\" class=\"project-sequence-trigger\" data-image=\"4\" aria-label=\"Enlarge image 5 of 7\">\n<img src=\"/project-galleries/private-residence/05.jpg\" width=\"1536\" height=\"1024\" alt=\"AI-assisted recreation: door and drawer-facing detail, Private Residence, Oakland.\" loading=\"eager\" decoding=\"sync\"></button>\n<figcaption class=\"photo-number\"><span>05</span></figcaption></figure><figure class=\"project-sequence-item\" id=\"view-6\" data-original-number=\"26\">\n<button type=\"button\" class=\"project-sequence-trigger\" data-image=\"5\" aria-label=\"Enlarge image 6 of 7\">\n<img src=\"/project-galleries/private-residence/06.jpg\" width=\"1122\" height=\"1402\" alt=\"AI-assisted recreation: countertop junction, Private Residence, Oakland.\" loading=\"eager\" decoding=\"sync\"></button>\n<figcaption class=\"photo-number\"><span>06</span></figcaption></figure></div><div class=\"project-sequence-row--walk\"><figure class=\"project-sequence-item\" id=\"view-7\" data-original-number=\"38\">\n<button type=\"button\" class=\"project-sequence-trigger\" data-image=\"6\" aria-label=\"Enlarge image 7 of 7\">\n<img src=\"/project-galleries/private-residence/07.jpg\" width=\"1024\" height=\"1536\" alt=\"AI-assisted recreation: woman walking through the kitchen, Private Residence, Oakland.\" loading=\"eager\" decoding=\"sync\"></button>\n<figcaption class=\"photo-number\"><span>07</span></figcaption></figure></div></div>\n<nav class=\"project-pagination preview-projects\" aria-label=\"Project navigation\"><a class=\"projects-link\" href=\"/work\">Projects</a></nav></main><dialog class=\"residence-viewer\" id=\"viewer\" aria-label=\"Private Residence image viewer\"><img id=\"viewer-image\" alt=\"\"><div class=\"residence-viewer-bar\"><p id=\"viewer-caption\" aria-live=\"polite\"></p><nav aria-label=\"Image navigation\"><button id=\"prev\" type=\"button\">Previous</button><button id=\"next\" type=\"button\">Next</button><button id=\"close\" type=\"button\">Close</button></nav></div></dialog>";
//#endregion
//#region app/work/private-residence/gallery.tsx
var import_jsx_runtime = require_jsx_runtime();
function ResidenceGallery() {
	const host = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (!host.current) return;
		const q = (s) => document.querySelector(s);
		const photoButtons = [...document.querySelectorAll("[data-image]")];
		let active = 0;
		let returnFocus;
		const viewer = q("#viewer");
		function show(i) {
			active = (i + photoButtons.length) % photoButtons.length;
			const b = photoButtons[active];
			q("#viewer-image").src = b.querySelector("img").src;
			q("#viewer-image").alt = b.querySelector("img").alt;
			q("#viewer-caption").textContent = String(active + 1).padStart(2, "0");
		}
		photoButtons.forEach((b, i) => b.addEventListener("click", () => {
			returnFocus = b;
			show(i);
			viewer.showModal();
			document.body.style.overflow = "hidden";
			q("#close").focus();
		}));
		q("#prev").onclick = () => show(active - 1);
		q("#next").onclick = () => show(active + 1);
		q("#close").onclick = () => viewer.close();
		viewer.addEventListener("close", () => {
			document.body.style.overflow = "";
			returnFocus?.focus({ preventScroll: true });
		});
		viewer.addEventListener("keydown", (e) => {
			if (e.key === "ArrowLeft") {
				e.preventDefault();
				show(active - 1);
			}
			if (e.key === "ArrowRight") {
				e.preventDefault();
				show(active + 1);
			}
		});
		return () => {
			document.body.style.overflow = "";
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref: host,
		dangerouslySetInnerHTML: { __html: residenceContent }
	});
}
//#endregion
export { ResidenceGallery };
