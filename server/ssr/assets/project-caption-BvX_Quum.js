//#region app/project-caption.ts
/** Compact public captions use only roles corroborated by the existing summary/credits.
* Public scope labels omit team attribution; unknown participation is not inferred from broad filter tags.
* Original narratives, image descriptions and detailed credits remain in their source records.
*/
var verifiedServices = {
	"women-who-rock": "Fabrication / Installation",
	"new-bamboo": "Fabrication",
	"fox-studios-titanic": "Fabrication",
	"hunt-for-paradise": "Fabrication / Installation",
	"central-governor": "Design / Fabrication / Installation",
	"coney-island-carousel-museum": "Design / Fabrication / Installation",
	"klaus-biesenbach-residence": "Fabrication / Installation",
	"katrin-sigurdardottir": "Fabrication / Installation",
	"adam-fuss": "Printmaking / Installation",
	"sacred-splendor": "Fabrication",
	"core-nyc": "Industrial design engineering / Installation assistance",
	"brooklyn-museum": "Design Engineering",
	"cooper-hewitt": "Engineering / Fabrication / Installation",
	"dia-beacon": "Fabrication",
	"china-institute": "Fabrication / Installation",
	"heliogram-series": "Engineering support",
	"modigliani-beyond-the-myth": "Fabrication / Installation",
	"touro-loeb-visitors-center": "Fabrication / Installation",
	"bronx-science-holocaust-museum": "Fabrication / Installation",
	"dream-machine": "Visualizations",
	"electric-jukebox": "Design",
	"ascend": "Design",
	"bldg-92": "Management / Installation",
	"on-becoming-an-artist": "Design",
	"beat-repeat": "Design / Installation",
	"holocaust-by-bullets": "Design / Fabrication / Installation",
	"2012-us-olympics": "Design / Visitor experience",
	"nike-free-hyperfeel": "Design",
	"wheat-thins-popped": "Design",
	"heart-bot": "Design",
	"best-of-all-possible-worlds": "Fabrication / Installation assistance",
	"hyatt-photo-booth": "Design engineering / Installation",
	"tumi": "Design",
	"jadu-beta": "Engineering / Fabrication / Installation",
	"m-is-for-museum": "Fabrication / Installation",
	"david-bowie-residence": "Fabrication / Installation",
	"intel-unknown": "Design"
};
/** Owner-approved public taxonomy. Detailed verified roles above remain unchanged.
* Engineering, development and management are presented under Design; assistance
* is presented under Installation. This does not add any unrecorded role.
*/
function projectCaptionServices(slug) {
	if (slug === "adam-fuss") return "Printmaking / Installation";
	if (slug === "dream-machine") return "Visualizations";
	if (slug === "core-nyc") return "Design Engineering";
	if (slug === "brooklyn-museum") return "Design Engineering";
	const evidence = verifiedServices[slug];
	if (!evidence) return "";
	const labels = [];
	if (/design|engineering|development|management/i.test(evidence)) labels.push("Design");
	if (/fabrication/i.test(evidence)) labels.push("Fabrication");
	if (/installation/i.test(evidence)) labels.push("Installation");
	return labels.join(" / ");
}
function projectCaptionYear(date) {
	const years = [...new Set(date?.match(/\b(?:19|20)\d{2}\b/g) ?? [])];
	if (!years.length) return "";
	const label = years.join("–");
	return /\b(?:present|ongoing)\b/i.test(date ?? "") ? `${label}–present` : label;
}
/** A later presentation must not inherit the original venue and date. */
function imageCaptionDetails(image, details) {
	return {
		...details,
		...image.venue ? { venue: image.venue } : {},
		...image.date ? { date: image.date } : {}
	};
}
//#endregion
export { projectCaptionServices as n, projectCaptionYear as r, imageCaptionDetails as t };
