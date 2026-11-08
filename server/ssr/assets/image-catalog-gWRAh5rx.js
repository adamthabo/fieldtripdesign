import { t as verified_image_credits_default } from "./verified-image-credits-CtFeqEE_.js";
//#region app/exhibition-availability.ts
/** Venue-checked 30 October 2026. Sources and access notes: docs/CURRENTLY-ON-DISPLAY-20261030.md. */
var displayDates = {
	"sacred-splendor": ["2026-09-18", "2027-02-07"],
	"brooklyn-museum": ["2026-05-16", "2027-01-03"],
	"cooper-hewitt": ["2024-11-02", "2025-08-10"],
	"china-institute": ["2026-07-09", "2026-07-29"]
};
var ongoingDisplayNotes = {
	"dia-beacon": "Long-term view",
	"core-nyc": "Permanent exhibition",
	"coney-island-carousel-museum": "Permanent installation · Seasonal venue hours",
	"bldg-92": "Permanent exhibition",
	"dream-machine": "Permanent installation",
	"touro-loeb-visitors-center": "Permanent displays and architectural metalwork · Check center hours",
	"central-governor": "Long-term installation · Access subject to weather",
	"bronx-science-holocaust-museum": "Permanent museum · Arrange access with the school"
};
var aliases = {
	"brooklyn-museum-iris-van-herpen": "brooklyn-museum",
	"dia-beacon-tehching-hsieh": "dia-beacon"
};
function exhibitionToday() {
	return (/* @__PURE__ */ new Date()).toLocaleDateString("en-CA", { timeZone: "America/New_York" });
}
function exhibitionDisplayInfo(slug, today = exhibitionToday()) {
	const id = aliases[slug] ?? slug;
	const dates = displayDates[id];
	if (dates) {
		const format = (date) => (/* @__PURE__ */ new Date(`${date}T12:00:00Z`)).toLocaleDateString("en-US", {
			month: "long",
			day: "numeric",
			year: "numeric",
			timeZone: "America/New_York"
		});
		if (today < dates[0]) return {
			open: false,
			label: `Opens ${format(dates[0])}`
		};
		if (today > dates[1]) return {
			open: false,
			label: `Completed · Exhibition ended ${format(dates[1])}`
		};
		return {
			open: true,
			label: `On display through ${format(dates[1])}`
		};
	}
	return ongoingDisplayNotes[id] ? {
		open: true,
		label: ongoingDisplayNotes[id]
	} : null;
}
function isExhibitionOpen(slug, today = exhibitionToday()) {
	return exhibitionDisplayInfo(slug, today)?.open ?? false;
}
//#endregion
//#region app/work/project-curation.ts
/** Owner's 12 October sections. Display choices never imply project scope or credits. */
var featuredProjectSlugs = [
	"core-nyc",
	"ascend",
	"heart-bot",
	"beat-repeat"
];
var latestProjectSlugs = [
	"sacred-splendor",
	"brooklyn-museum",
	"dia-beacon",
	"cooper-hewitt",
	"china-institute"
];
/** Latest work leads, followed by the ongoing installations requested on 30 October. */
var ongoingProjectSlugs = [
	"core-nyc",
	"coney-island-carousel-museum",
	"bldg-92",
	"dream-machine",
	"touro-loeb-visitors-center",
	"central-governor",
	"bronx-science-holocaust-museum"
];
var currentlyOnDisplaySlugs = [...latestProjectSlugs, ...ongoingProjectSlugs];
/** Owner's 14 October Archive-only opening; Featured and Latest keep their own order. */
var archiveOpeningSlugs = [
	"bldg-92",
	"on-becoming-an-artist",
	"holocaust-by-bullets",
	"m-is-for-museum",
	"dream-machine",
	"nike-free-hyperfeel",
	"wheat-thins-popped"
];
var projectSectionDefinitions = [
	{
		id: "featured-projects",
		title: "Featured Projects"
	},
	{
		id: "latest-projects",
		title: "Currently On Display"
	},
	{
		id: "archive",
		title: "Archive"
	}
];
projectSectionDefinitions.filter((group) => group.id !== "archive");
var priorityProjectSlugs = [
	...featuredProjectSlugs,
	...latestProjectSlugs,
	...archiveOpeningSlugs,
	"electric-jukebox",
	"2012-us-olympics",
	"touro-loeb-visitors-center",
	"bronx-science-holocaust-museum"
];
var corporateProjectSlugs = [
	"fox-studios-titanic",
	"electric-jukebox",
	"ascend",
	"beat-repeat",
	"2012-us-olympics",
	"nike-free-hyperfeel",
	"wheat-thins-popped",
	"heart-bot",
	"hyatt-photo-booth",
	"tumi",
	"intel-unknown"
];
var artworkProjectSlugs = [
	"best-of-all-possible-worlds",
	"jadu-beta",
	"heliogram-series",
	"central-governor",
	"adam-fuss",
	"katrin-sigurdardottir"
];
var finalArtworkSlug = "katrin-sigurdardottir";
/** The owner keeps Katrín last, including user-sorted and filtered lists. */
function compareFinalArtwork(a, b) {
	return Number(a === finalArtworkSlug) - Number(b === finalArtworkSlug);
}
[...corporateProjectSlugs];
var presentationOrder = [
	...priorityProjectSlugs,
	"hyatt-photo-booth",
	"tumi",
	"intel-unknown",
	"coney-island-carousel-museum",
	"archive"
];
function orderProjects(records) {
	const rank = (slug) => {
		const index = presentationOrder.indexOf(slug);
		if (index >= 0) return index;
		if (slug === "david-bowie-residence") return presentationOrder.length + 1;
		if (slug === "klaus-biesenbach-residence") return presentationOrder.length + 2;
		if (slug === "private-residence") return presentationOrder.length + 3;
		const artwork = artworkProjectSlugs.indexOf(slug);
		return artwork < 0 ? presentationOrder.length : presentationOrder.length + 4 + artwork;
	};
	return [...records].sort((a, b) => rank(a.slug) - rank(b.slug));
}
/** MCNY intentionally appears in Featured and On Display. Other current work leaves Archive. */
function projectsInSection(records, id, today) {
	const displaySlugs = currentlyOnDisplaySlugs.filter((slug) => latestProjectSlugs.includes(slug) || isExhibitionOpen(slug, today));
	if (id === "latest-projects") return displaySlugs.flatMap((slug) => records.filter((project) => project.slug === slug));
	if (id === "featured-projects") return records.filter((project) => featuredProjectSlugs.includes(project.slug));
	return records.filter((project) => !featuredProjectSlugs.includes(project.slug) && !displaySlugs.includes(project.slug));
}
//#endregion
//#region app/image-catalog.ts
var imageCategories = [
	"contract",
	"design",
	"fabrication",
	"installation",
	"unknown"
];
var sequence = (directory, count) => Array.from({ length: count }, (_, index) => `${directory}/${String(index + 1).padStart(2, "0")}.webp`);
var group = ({ directory, count, ...metadata }) => sequence(directory, count).map((src) => ({
	...metadata,
	id: src.slice(1).replaceAll("/", "--"),
	src
}));
var file = (src, metadata) => ({
	...metadata,
	id: src.slice(1).replaceAll("/", "--"),
	src
});
var projectGalleryGroups = [
	{
		directory: "/project-galleries/women-who-rock",
		count: 6,
		projectSlug: "women-who-rock",
		category: "fabrication",
		identification: "confirmed",
		kind: "project",
		caption: "Women Who Rock exhibition at the Rock & Roll Hall of Fame.",
		sourceCredit: {
			label: "Source: Elkan & Levinsohn archive",
			href: "https://www.elkanlevinsohn.com/projects/whomen-who-rock"
		}
	},
	{
		directory: "/project-galleries/new-bamboo",
		count: 6,
		projectSlug: "new-bamboo",
		category: "fabrication",
		identification: "confirmed",
		kind: "project",
		caption: "New Bamboo exhibition at Japan Society.",
		sourceCredit: {
			label: "Source: Elkan & Levinsohn archive",
			href: "https://www.elkanlevinsohn.com/projects/project-three-8zgh7-8frkx-9a9dk-f3353-c76x9-zwswj-3pr8b-9cmgn"
		}
	},
	{
		directory: "/project-galleries/fox-studios-titanic",
		count: 6,
		projectSlug: "fox-studios-titanic",
		category: "fabrication",
		identification: "confirmed",
		kind: "project",
		caption: "The Titanic Experience at Fox Studios, Sydney: fabrication and installation views.",
		sourceCredit: {
			label: "Source: Elkan & Levinsohn archive",
			href: "https://www.elkanlevinsohn.com/projects/project-three-8zgh7-8frkx-9a9dk-f3353-c76x9-zwswj"
		}
	},
	{
		directory: "/project-galleries/2012-us-olympics",
		count: 5,
		projectSlug: "2012-us-olympics",
		category: "design",
		identification: "confirmed",
		kind: "project"
	},
	{
		directory: "/project-galleries/archive",
		count: 26,
		projectSlug: "archive",
		category: "unknown",
		identification: "unknown",
		kind: "project"
	},
	{
		directory: "/project-galleries/ascend",
		count: 7,
		projectSlug: "ascend",
		category: "design",
		identification: "confirmed",
		kind: "project"
	},
	{
		directory: "/project-galleries/beat-repeat",
		count: 5,
		projectSlug: "beat-repeat",
		category: "design",
		identification: "confirmed",
		kind: "project"
	},
	{
		directory: "/project-galleries/best-of-all-possible-worlds",
		count: 5,
		projectSlug: "best-of-all-possible-worlds",
		category: "fabrication",
		identification: "confirmed",
		kind: "project"
	},
	{
		directory: "/project-galleries/bldg-92",
		count: 5,
		projectSlug: "bldg-92",
		category: "fabrication",
		identification: "confirmed",
		kind: "project"
	},
	{
		directory: "/project-galleries/brooklyn-museum",
		count: 4,
		projectSlug: "brooklyn-museum",
		category: "unknown",
		identification: "unknown",
		kind: "project"
	},
	{
		directory: "/project-galleries/china-institute",
		count: 3,
		projectSlug: "china-institute",
		category: "installation",
		identification: "confirmed",
		kind: "project"
	},
	{
		directory: "/project-galleries/cooper-hewitt",
		count: 8,
		projectSlug: "cooper-hewitt",
		category: "fabrication",
		identification: "confirmed",
		kind: "project"
	},
	{
		directory: "/project-galleries/core-nyc",
		count: 5,
		projectSlug: "core-nyc",
		category: "design",
		identification: "confirmed",
		kind: "project"
	},
	{
		directory: "/project-galleries/dia-beacon",
		count: 3,
		projectSlug: "dia-beacon",
		category: "fabrication",
		identification: "confirmed",
		kind: "project"
	},
	{
		directory: "/project-galleries/dream-machine",
		count: 5,
		projectSlug: "dream-machine",
		category: "design",
		identification: "confirmed",
		kind: "project"
	},
	{
		directory: "/project-galleries/electric-jukebox",
		count: 3,
		projectSlug: "electric-jukebox",
		category: "design",
		identification: "confirmed",
		kind: "project"
	},
	{
		directory: "/project-galleries/heart-bot",
		count: 7,
		projectSlug: "heart-bot",
		category: "design",
		identification: "confirmed",
		kind: "project"
	},
	{
		directory: "/project-galleries/holocaust-by-bullets",
		count: 4,
		projectSlug: "holocaust-by-bullets",
		category: "design",
		identification: "confirmed",
		kind: "project"
	},
	{
		directory: "/project-galleries/hyatt-photo-booth",
		count: 6,
		projectSlug: "hyatt-photo-booth",
		category: "design",
		identification: "confirmed",
		kind: "project"
	},
	{
		directory: "/project-galleries/jadu-beta",
		count: 5,
		projectSlug: "jadu-beta",
		category: "fabrication",
		identification: "confirmed",
		kind: "project"
	},
	{
		directory: "/project-galleries/m-is-for-museum",
		count: 7,
		projectSlug: "m-is-for-museum",
		category: "fabrication",
		identification: "confirmed",
		kind: "project"
	},
	{
		directory: "/project-galleries/nike-free-hyperfeel",
		count: 13,
		projectSlug: "nike-free-hyperfeel",
		category: "design",
		identification: "confirmed",
		kind: "project"
	},
	{
		directory: "/project-galleries/on-becoming-an-artist",
		count: 4,
		projectSlug: "on-becoming-an-artist",
		category: "design",
		identification: "confirmed",
		kind: "project"
	},
	{
		directory: "/project-galleries/tumi",
		count: 4,
		projectSlug: "tumi",
		category: "design",
		identification: "confirmed",
		kind: "project"
	},
	{
		directory: "/project-galleries/wheat-thins-popped",
		count: 7,
		projectSlug: "wheat-thins-popped",
		category: "installation",
		identification: "confirmed",
		kind: "project"
	}
];
var reelGroups = [
	{
		directory: "/portfolio-carousel/adam-fuss",
		count: 9,
		projectSlug: "adam-fuss",
		category: "unknown",
		identification: "unknown",
		kind: "project"
	},
	{
		directory: "/portfolio-carousel/brooklyn-museum",
		count: 9,
		projectSlug: "brooklyn-museum",
		category: "unknown",
		identification: "unknown",
		kind: "project"
	},
	{
		directory: "/portfolio-carousel/carnegie",
		count: 8,
		projectSlug: "m-is-for-museum",
		category: "fabrication",
		identification: "confirmed",
		kind: "project"
	},
	{
		directory: "/portfolio-carousel/cooper-hewitt",
		count: 11,
		projectSlug: "cooper-hewitt",
		category: "fabrication",
		identification: "confirmed",
		kind: "project"
	},
	{
		directory: "/portfolio-carousel/david-bowie",
		count: 3,
		projectSlug: "david-bowie-residence",
		category: "unknown",
		identification: "unknown",
		kind: "project"
	},
	{
		directory: "/portfolio-carousel/delta",
		count: 14,
		projectSlug: "ascend",
		category: "design",
		identification: "confirmed",
		kind: "project"
	},
	{
		directory: "/portfolio-carousel/dia-beacon",
		count: 6,
		projectSlug: "dia-beacon",
		category: "fabrication",
		identification: "confirmed",
		kind: "project"
	},
	{
		directory: "/portfolio-carousel/droog",
		count: 1,
		projectSlug: "droog-unknown",
		category: "unknown",
		identification: "unknown",
		kind: "project"
	},
	{
		directory: "/portfolio-carousel/intel",
		count: 6,
		projectSlug: "intel-unknown",
		category: "unknown",
		identification: "unknown",
		kind: "project"
	},
	{
		directory: "/portfolio-carousel/katrin-sigurdardottir",
		count: 3,
		projectSlug: "katrin-sigurdardottir",
		category: "unknown",
		identification: "unknown",
		kind: "project"
	},
	{
		directory: "/portfolio-carousel/liberty-science-center",
		count: 5,
		projectSlug: "dream-machine",
		category: "design",
		identification: "confirmed",
		kind: "project"
	},
	{
		directory: "/portfolio-carousel/museum-city-new-york",
		count: 10,
		projectSlug: "core-nyc",
		category: "design",
		identification: "confirmed",
		kind: "project"
	},
	{
		directory: "/portfolio-carousel/nabisco",
		count: 14,
		projectSlug: "wheat-thins-popped",
		category: "installation",
		identification: "confirmed",
		kind: "project"
	},
	{
		directory: "/portfolio-carousel/new-museum",
		count: 19,
		projectSlug: "heart-bot",
		category: "design",
		identification: "confirmed",
		kind: "project"
	},
	{
		directory: "/portfolio-carousel/nike",
		count: 24,
		projectSlug: "nike-free-hyperfeel",
		category: "design",
		identification: "confirmed",
		kind: "project"
	},
	{
		directory: "/portfolio-carousel/noguchi-museum",
		count: 11,
		projectSlug: "on-becoming-an-artist",
		category: "design",
		identification: "confirmed",
		kind: "project"
	},
	{
		directory: "/portfolio-carousel/saul-melman-jadu-beta",
		count: 11,
		projectSlug: "jadu-beta",
		category: "fabrication",
		identification: "confirmed",
		kind: "project"
	},
	{
		directory: "/portfolio-carousel/socrates-sculpture-park",
		count: 14,
		projectSlug: "best-of-all-possible-worlds",
		category: "installation",
		identification: "confirmed",
		kind: "project"
	},
	{
		directory: "/portfolio-carousel/sonos-janelle-monae",
		count: 9,
		projectSlug: "electric-jukebox",
		category: "design",
		identification: "confirmed",
		kind: "project"
	}
];
var projectCovers = Object.entries({
	"2012-us-olympics": "design",
	archive: "unknown",
	ascend: "design",
	"beat-repeat": "design",
	"best-of-all-possible-worlds": "fabrication",
	"bldg-92": "fabrication",
	"brooklyn-museum": "unknown",
	"cooper-hewitt": "fabrication",
	"core-nyc": "design",
	"dia-beacon": "fabrication",
	"electric-jukebox": "design",
	"heart-bot": "design",
	"holocaust-by-bullets": "design",
	"hyatt-photo-booth": "design",
	"jadu-beta": "fabrication",
	"nike-free-hyperfeel": "design",
	"on-becoming-an-artist": "design",
	tumi: "design",
	"wheat-thins-popped": "installation"
}).map(([projectSlug, category]) => file(`/projects/${projectSlug}.webp`, {
	projectSlug,
	category,
	identification: projectSlug === "archive" || projectSlug === "brooklyn-museum" ? "unknown" : "confirmed",
	kind: "cover"
}));
var processImages = [
	file("/project-galleries/hunt-for-paradise/01.webp", {
		projectSlug: "hunt-for-paradise",
		category: "installation",
		identification: "confirmed",
		kind: "project",
		caption: "Carpet display case framed by the gallery’s arched structure.",
		sourceCredit: {
			label: "Images by Perry Hu",
			href: "https://www.elkanlevinsohn.com/projects/project-three-8zgh7-8frkx-9a9dk-f3353-c76x9-zwswj-3pr8b"
		}
	}),
	file("/project-galleries/hunt-for-paradise/02.webp", {
		projectSlug: "hunt-for-paradise",
		category: "installation",
		identification: "confirmed",
		kind: "project",
		caption: "Gallery view with carpet case and wall-mounted works.",
		sourceCredit: {
			label: "Images by Perry Hu",
			href: "https://www.elkanlevinsohn.com/projects/project-three-8zgh7-8frkx-9a9dk-f3353-c76x9-zwswj-3pr8b"
		}
	}),
	file("/project-galleries/hunt-for-paradise/03.webp", {
		projectSlug: "hunt-for-paradise",
		category: "installation",
		identification: "confirmed",
		kind: "project",
		caption: "Arched exhibition partitions and inset displays.",
		sourceCredit: {
			label: "Images by Perry Hu",
			href: "https://www.elkanlevinsohn.com/projects/project-three-8zgh7-8frkx-9a9dk-f3353-c76x9-zwswj-3pr8b"
		}
	}),
	file("/project-galleries/hunt-for-paradise/04.webp", {
		projectSlug: "hunt-for-paradise",
		category: "installation",
		identification: "confirmed",
		kind: "project",
		caption: "Display cases and framed works across the gallery.",
		sourceCredit: {
			label: "Images by Perry Hu",
			href: "https://www.elkanlevinsohn.com/projects/project-three-8zgh7-8frkx-9a9dk-f3353-c76x9-zwswj-3pr8b"
		}
	}),
	file("/project-galleries/hunt-for-paradise/05.webp", {
		projectSlug: "hunt-for-paradise",
		category: "installation",
		identification: "confirmed",
		kind: "project",
		caption: "Central object display with carpet and framed works beyond.",
		sourceCredit: {
			label: "Images by Perry Hu",
			href: "https://www.elkanlevinsohn.com/projects/project-three-8zgh7-8frkx-9a9dk-f3353-c76x9-zwswj-3pr8b"
		}
	}),
	file("/project-galleries/hunt-for-paradise/06.webp", {
		projectSlug: "hunt-for-paradise",
		category: "installation",
		identification: "confirmed",
		kind: "project",
		caption: "Object and manuscript display within an arched niche.",
		sourceCredit: {
			label: "Images by Perry Hu",
			href: "https://www.elkanlevinsohn.com/projects/project-three-8zgh7-8frkx-9a9dk-f3353-c76x9-zwswj-3pr8b"
		}
	}),
	file("/project-galleries/hunt-for-paradise/07.webp", {
		projectSlug: "hunt-for-paradise",
		category: "installation",
		identification: "confirmed",
		kind: "project",
		caption: "View through successive arched gallery openings.",
		sourceCredit: {
			label: "Images by Perry Hu",
			href: "https://www.elkanlevinsohn.com/projects/project-three-8zgh7-8frkx-9a9dk-f3353-c76x9-zwswj-3pr8b"
		}
	}),
	file("/project-galleries/hunt-for-paradise/08.webp", {
		projectSlug: "hunt-for-paradise",
		category: "installation",
		identification: "confirmed",
		kind: "project",
		caption: "Large wall-mounted carpet with gallery seating.",
		sourceCredit: {
			label: "Images by Perry Hu",
			href: "https://www.elkanlevinsohn.com/projects/project-three-8zgh7-8frkx-9a9dk-f3353-c76x9-zwswj-3pr8b"
		}
	}),
	file("/project-galleries/hunt-for-paradise/09.webp", {
		projectSlug: "hunt-for-paradise",
		category: "installation",
		identification: "confirmed",
		kind: "project",
		caption: "Carpet display with a foreground object case.",
		sourceCredit: {
			label: "Images by Perry Hu",
			href: "https://www.elkanlevinsohn.com/projects/project-three-8zgh7-8frkx-9a9dk-f3353-c76x9-zwswj-3pr8b"
		}
	}),
	file("/project-galleries/hunt-for-paradise/10.webp", {
		projectSlug: "hunt-for-paradise",
		category: "installation",
		identification: "confirmed",
		kind: "project",
		caption: "Angled carpet mount and adjacent wall display.",
		sourceCredit: {
			label: "Images by Perry Hu",
			href: "https://www.elkanlevinsohn.com/projects/project-three-8zgh7-8frkx-9a9dk-f3353-c76x9-zwswj-3pr8b"
		}
	}),
	file("/spaces/atlantic-mills-official-daytime-rendering.png", {
		projectSlug: "site-assets",
		category: "design",
		identification: "confirmed",
		kind: "site",
		caption: "Architectural rendering from Atlantic Mills’ official website, https://atlanticmillsri.com/, Where We’re Headed. Source PNG preserved unchanged; not a photograph of completed construction. No named illustrator credit is published."
	}),
	file("/spaces/atlantic-mills-tower-landing-refined-20261022.webp", {
		projectSlug: "site-assets",
		category: "design",
		identification: "confirmed",
		kind: "site",
		caption: "Owner-requested retouch of Atlantic Mills tower landing; door notices removed, original architecture retained. Not evidence of completed renovation."
	}),
	file("/collaborators/south-side-design-building.png", {
		projectSlug: "site-assets",
		category: "design",
		identification: "confirmed",
		kind: "site",
		caption: "Unchanged official South Side Design & Building logo from southsidedb.com, linked from Adam’s biography."
	}),
	file("/education/nyu-steinhardt.png", {
		projectSlug: "site-assets",
		category: "design",
		identification: "confirmed",
		kind: "site",
		caption: "Official NYU Steinhardt black logo, linked to A. Thabo’s faculty profile."
	}),
	file("/project-galleries/central-governor/01.png", {
		projectSlug: "central-governor",
		category: "unknown",
		identification: "confirmed",
		kind: "project",
		caption: "Central Governor, Saul Melman, MoMA PS1. Wide boiler-room view. Retouched archival photograph."
	}),
	file("/project-galleries/central-governor/02.png", {
		projectSlug: "central-governor",
		category: "unknown",
		identification: "confirmed",
		kind: "project",
		caption: "Central Governor, Saul Melman, MoMA PS1. Metal apparatus and base. Retouched archival photograph."
	}),
	file("/project-galleries/sacred-splendor/01.jpg", {
		projectSlug: "sacred-splendor",
		category: "fabrication",
		identification: "confirmed",
		kind: "project",
		caption: "Sacred Splendor at the Jewish Museum: custom textile display case. Photo Kris Graves, courtesy The Jewish Museum."
	}),
	file("/project-galleries/sacred-splendor/02.jpg", {
		projectSlug: "sacred-splendor",
		category: "fabrication",
		identification: "confirmed",
		kind: "project",
		caption: "Oblique gallery view of the textile display case in Sacred Splendor. Photo Kris Graves, courtesy The Jewish Museum."
	}),
	file("/project-galleries/sacred-splendor/03.jpg", {
		projectSlug: "sacred-splendor",
		category: "fabrication",
		identification: "confirmed",
		kind: "project",
		caption: "Textile case viewed through the doorway in Sacred Splendor. Photo Kris Graves, courtesy The Jewish Museum."
	}),
	file("/process/china-institute-install-wall.webp", {
		projectSlug: "china-institute",
		category: "installation",
		identification: "confirmed",
		kind: "process"
	}),
	file("/process/field-trip-crate-loadout.webp", {
		projectSlug: "archive",
		category: "unknown",
		identification: "unknown",
		kind: "process"
	}),
	file("/process/china-institute-install-progress.webp", {
		projectSlug: "china-institute",
		category: "installation",
		identification: "confirmed",
		kind: "process"
	}),
	file("/process/china-institute-install-wide.webp", {
		projectSlug: "china-institute",
		category: "installation",
		identification: "confirmed",
		kind: "process"
	})
];
var studioArchiveFiles = [
	"acrylic-case-blue-and-rose-reflections.webp",
	"cedar-pencil-meets-drafting-lines.webp",
	"coiled-cables-after-the-test.webp",
	"daylight-electronics-prototyping-bench.webp",
	"full-scale-test-bay-in-natural-light.webp",
	"gallery-installation-kit-ready-to-roll.webp",
	"late-night-projection-test-bench.webp",
	"museum-corridor-with-staged-installation-gear.webp",
	"museum-crate-in-an-empty-gallery.webp",
	"predawn-raster-light-in-empty-gallery.webp",
	"prismatic-pixels-on-acrylic.webp",
	"projector-standby-in-an-empty-gallery.webp",
	"quiet-architecture-studio-after-critique.webp",
	"quiet-electronics-bench-after-midnight.webp",
	"quiet-studio-dawn-with-pixel-light.webp",
	"quiet-trace-table-after-hours.webp",
	"raster-light-across-an-empty-gallery.webp",
	"warm-light-beneath-the-plinth.webp"
].map((name) => file(`/studio-archive/${name}`, {
	projectSlug: "archive",
	category: "unknown",
	identification: "unknown",
	kind: "studio"
}));
var siteAssets = [
	...[
		"01",
		"02",
		"03",
		"04"
	].map((number) => file(`/education/rca-show/show-${number}.jpg`, {
		projectSlug: "site-assets",
		category: "design",
		identification: "confirmed",
		kind: "site",
		caption: "Innovation Design Engineering graduate exhibition at the Royal College of Art, 2006. Original photograph from the Elkan & Levinsohn archive.",
		sourceCredit: {
			label: "Source: Elkan & Levinsohn archive",
			href: "https://www.elkanlevinsohn.com/projects/whomen-who-rock-y6dl4"
		}
	})),
	file("/education/rca-show/01.webp", {
		projectSlug: "site-assets",
		category: "design",
		identification: "confirmed",
		kind: "site",
		caption: "Innovation Design Engineering graduate exhibition at the Royal College of Art, 2006.",
		sourceCredit: {
			label: "Source: Elkan & Levinsohn archive",
			href: "https://www.elkanlevinsohn.com/projects/whomen-who-rock-y6dl4"
		}
	}),
	file("/education/rca-show/02.webp", {
		projectSlug: "site-assets",
		category: "design",
		identification: "confirmed",
		kind: "site",
		caption: "Conveyor display in the Royal College of Art graduate exhibition, 2006.",
		sourceCredit: {
			label: "Source: Elkan & Levinsohn archive",
			href: "https://www.elkanlevinsohn.com/projects/whomen-who-rock-y6dl4"
		}
	}),
	file("/education/rca-archive/david-graham/DSC_0045.JPG", {
		projectSlug: "site-assets",
		category: "design",
		identification: "confirmed",
		kind: "site",
		caption: "Floating furniture at the Royal College of Art Interim Show, 2008. Image courtesy of David Graham."
	}),
	file("/education/rca-archive/david-graham/DSC_0051.JPG", {
		projectSlug: "site-assets",
		category: "design",
		identification: "confirmed",
		kind: "site",
		caption: "Sun installation at the Royal College of Art Interim Show, 2008. Image courtesy of David Graham."
	}),
	file("/teaching/rca-show-team-2006.png", {
		projectSlug: "site-assets",
		category: "design",
		identification: "confirmed",
		kind: "site",
		caption: "RCA exhibition design team: Gregory Epps, Rachel Ghazaros, Kofi Aidoo and A. Thabo. Original photograph from A. Thabo’s archive; names do not specify left-to-right order."
	}),
	file("/education/photogravure/armstrong-bridge-charlottenburg.jpg", {
		projectSlug: "site-assets",
		category: "design",
		identification: "confirmed",
		kind: "site",
		caption: "David Armstrong, Bridge, Charlottenburg. Reproduction from the Renaissance Press archive.",
		sourceCredit: {
			label: "Image: Renaissance Press",
			href: "https://www.renaissancepress.com/artists/david-armstrong"
		}
	}),
	file("/education/photogravure/izu-angkor-158.jpeg", {
		projectSlug: "site-assets",
		category: "design",
		identification: "confirmed",
		kind: "site",
		caption: "Kenro Izu, Angkor 158. Tree roots growing into a temple wall. Reproduction from the Renaissance Press archive.",
		sourceCredit: {
			label: "Image: Renaissance Press",
			href: "https://www.renaissancepress.com/artists/kendo-izu"
		}
	}),
	file("/education/photogravure/izu-angkor-26.jpeg", {
		projectSlug: "site-assets",
		category: "design",
		identification: "confirmed",
		kind: "site",
		caption: "Kenro Izu, Angkor 26. Tree roots across a temple wall. Reproduction from the Renaissance Press archive.",
		sourceCredit: {
			label: "Image: Renaissance Press",
			href: "https://www.renaissancepress.com/artists/kendo-izu"
		}
	}),
	file("/project-galleries/modigliani-beyond-the-myth/01.jpg", {
		projectSlug: "modigliani-beyond-the-myth",
		category: "installation",
		identification: "confirmed",
		kind: "project",
		caption: "Sculpture alcove and adjoining portrait displays."
	}),
	file("/project-galleries/klaus-biesenbach-residence/01.webp", {
		projectSlug: "klaus-biesenbach-residence",
		category: "unknown",
		identification: "confirmed",
		kind: "project",
		caption: "White kitchen and dining area in Klaus Biesenbach’s residence."
	}),
	file("/project-galleries/bronx-science-holocaust-museum/01.png", {
		projectSlug: "bronx-science-holocaust-museum",
		category: "fabrication",
		identification: "confirmed",
		kind: "project",
		caption: "Display cases and framed historical material in the Bronx Science Holocaust Museum and Study Center. Photograph: Amy Beckerman; source: South Side Design & Building archive."
	}),
	file("/project-galleries/touro-loeb-visitors-center/01.png", {
		projectSlug: "touro-loeb-visitors-center",
		category: "fabrication",
		identification: "confirmed",
		kind: "project",
		caption: "Upper gallery with custom multimedia displays and integrated portrait installation. Image source: South Side Design & Building, archived portfolio."
	}),
	file("/project-galleries/touro-loeb-visitors-center/02.png", {
		projectSlug: "touro-loeb-visitors-center",
		category: "fabrication",
		identification: "confirmed",
		kind: "project",
		caption: "Welcome and interpretive exhibit walls with integrated media. Image source: South Side Design & Building, archived portfolio."
	}),
	file("/project-galleries/coney-island-carousel-museum/01.png", {
		projectSlug: "coney-island-carousel-museum",
		category: "design",
		identification: "confirmed",
		kind: "project",
		caption: "B&B Carousell at Steeplechase Pavilion, 2013. Image via South Side Design & Building archive."
	}),
	file("/brand/field-trip-closed-door-sankaty.webp", {
		projectSlug: "site-assets",
		category: "design",
		identification: "confirmed",
		kind: "site",
		caption: "Owner-selected Closed Door × Sankaty Path photographic header. FIELD: Diane Picchiottino, Unsplash License. TRIP: Jeff Dell, CC BY 2.0. Cropped and letter-masked; FIELD monochrome. Credits: /brand/photo-credits.html. Brand artwork, not a client-project image."
	}),
	file("/brand/field-trip-wordmark.svg", {
		projectSlug: "site-assets",
		category: "design",
		identification: "confirmed",
		kind: "site",
		caption: "Existing Field Trip refined lettering without ticket or dots, per 5 October direction."
	}),
	file("/equipment/techno-lc-series.jpg", {
		projectSlug: "site-assets",
		category: "fabrication",
		identification: "confirmed",
		kind: "site",
		caption: "Techno CNC manufacturer photograph of the LC 60120 router."
	}),
	file("/equipment/omtech-pronto60-130w.jpg", {
		projectSlug: "site-assets",
		category: "fabrication",
		identification: "confirmed",
		kind: "site",
		caption: "OMTech manufacturer photograph of the Pronto 60 CO₂ laser."
	}),
	file("/brand/field-trip-footer-ticket.svg", {
		projectSlug: "site-assets",
		category: "design",
		identification: "confirmed",
		kind: "site",
		caption: "Original chocolate three-dot ticket restored as the explicitly requested footer exception on 4 October; export margins trimmed, original embedded artwork unchanged."
	}),
	file("/people/adam-thabo-risd-2024.jpg", {
		projectSlug: "site-assets",
		category: "design",
		identification: "confirmed",
		kind: "site",
		caption: "A. Thabo. Unchanged photograph from his official RISD faculty profile; source URL recorded privately. No AI processing."
	}),
	file("/brand/field-trip-single-dot-chocolate-transparent.svg", {
		projectSlug: "site-assets",
		category: "design",
		identification: "confirmed",
		kind: "site",
		caption: "Approved 4 October refined field lettering, thin italic trip and single red period; native vector wordmark."
	}),
	file("/brand/field-trip-ticket-white-on-tomato.svg", {
		projectSlug: "site-assets",
		category: "design",
		identification: "confirmed",
		kind: "site",
		caption: "Approved 4 October white-on-tomato ticket with one red period in a white end stub."
	}),
	file("/project-galleries/heliogram-series/01.jpg", {
		projectSlug: "heliogram-series",
		category: "design",
		identification: "confirmed",
		kind: "project",
		caption: "Heliogram Series_09,2014. Courtesy of the Milwaukee Art Museum, via BOMB."
	}),
	file("/project-galleries/heliogram-series/02.jpg", {
		projectSlug: "heliogram-series",
		category: "design",
		identification: "confirmed",
		kind: "process",
		caption: "Camera-obscura experiment, July2012. Source: BoxoHOUSE."
	}),
	file("/project-galleries/heliogram-series/03.jpg", {
		projectSlug: "heliogram-series",
		category: "design",
		identification: "confirmed",
		kind: "process",
		caption: "Camera-system development, July2012. Source: BoxoHOUSE."
	}),
	file("/brand/field-trip-refined-uppercase.png", {
		projectSlug: "site-assets",
		category: "design",
		identification: "confirmed",
		kind: "site",
		caption: "Owner-selected refined uppercase Field Trip artwork, recovered unchanged from the black typography source."
	}),
	file("/brand/field-trip-3d.png", {
		projectSlug: "site-assets",
		category: "design",
		identification: "confirmed",
		kind: "site",
		caption: "Archived Field Trip 3-D three-block identity, extracted unchanged from the 1 October 2026 Fabricators Photo Edition presentation; chocolate, tomato red, cream and white. Brand artwork, not a project photograph."
	}),
	file("/objects/Phone-Stand-Assembly.svg", {
		projectSlug: "site-assets",
		category: "design",
		identification: "confirmed",
		kind: "site",
		caption: "Monthly Objects prototype drawing, revision B. Physical sample testing remains required."
	}),
	file("/objects/Phone-Stand-Parts.svg", {
		projectSlug: "site-assets",
		category: "design",
		identification: "confirmed",
		kind: "site",
		caption: "Monthly Objects prototype drawing, revision B. Physical sample testing remains required."
	}),
	file("/objects/CNC-Tray-Drawing.svg", {
		projectSlug: "site-assets",
		category: "design",
		identification: "confirmed",
		kind: "site",
		caption: "Monthly Objects prototype drawing, revision B. Physical sample testing remains required."
	}),
	file("/brand/field-trip-ticket-chocolate.svg", {
		projectSlug: "site-assets",
		category: "design",
		identification: "confirmed",
		kind: "site",
		caption: "29 September chocolate, red and white presentation of the exact supplied ticket; original pixels embedded unchanged with a color transform. Brand artwork, not a client photograph."
	}),
	file("/brand/field-trip-black-ticket.png", {
		projectSlug: "site-assets",
		category: "design",
		identification: "confirmed",
		kind: "site",
		caption: "Approved 29 September black Field Trip ticket with white lettering, right-hand stub and orange bottom dot; exact supplied brand artwork, not a client project."
	}),
	file("/brand/field-trip-centered-ticket.png", {
		projectSlug: "site-assets",
		category: "design",
		identification: "confirmed",
		kind: "site",
		caption: "Historical 28 September centered-ticket Field Trip logo, superseded on shared identity surfaces by the approved 29 September black ticket; brand artwork, not a client project."
	}),
	file("/landing-reel/full-letter-apertures.svg", {
		projectSlug: "site-assets",
		category: "design",
		identification: "confirmed",
		kind: "site",
		caption: "Positive-alpha complete-letter landing aperture mask; native vector interface artwork, not a client photograph."
	}),
	file("/landing-reel/mask-13.png", {
		projectSlug: "site-assets",
		category: "design",
		identification: "confirmed",
		kind: "site",
		caption: "Archived Mask 13 interface silhouette; removed from the landing page on 30 September 2026. Site artwork, not a client project."
	}),
	file("/landing-reel/poster-desktop.webp", {
		projectSlug: "site-assets",
		category: "design",
		identification: "confirmed",
		kind: "site",
		caption: "Desktop poster derived from the curated landing reel for immediate loading; site artwork, not a client project."
	}),
	file("/landing-reel/poster-mobile.webp", {
		projectSlug: "site-assets",
		category: "design",
		identification: "confirmed",
		kind: "site",
		caption: "Portrait poster derived from the curated landing reel for immediate loading; site artwork, not a client project."
	}),
	file("/portfolio-carousel/_identity/field-trip-tech-gallery-portrait-v116.png", {
		projectSlug: "site-assets",
		category: "design",
		identification: "confirmed",
		kind: "site",
		caption: "Generated portrait companion for the conceptual pale media-wall and white-gallery landing artwork; not a client project."
	}),
	file("/portfolio-carousel/_identity/field-trip-tech-gallery-v116.png", {
		projectSlug: "site-assets",
		category: "design",
		identification: "confirmed",
		kind: "site",
		caption: "Generated conceptual pale media wall with sparse blue and white light apertures on the left and an open white gallery on the right; landing artwork, not a client project."
	}),
	file("/portfolio-carousel/_identity/field-trip-tech-gallery-portrait-v115.png", {
		projectSlug: "site-assets",
		category: "design",
		identification: "confirmed",
		kind: "site",
		caption: "Generated portrait companion for the conceptual matte pixel-wall and white-gallery landing artwork; not a client project."
	}),
	file("/portfolio-carousel/_identity/field-trip-tech-gallery-v115.png", {
		projectSlug: "site-assets",
		category: "design",
		identification: "confirmed",
		kind: "site",
		caption: "Generated conceptual matte pixel-wall installation with a narrow illuminated seam on the left and an open white gallery on the right; landing artwork, not a client project."
	}),
	file("/portfolio-carousel/_identity/field-trip-tech-gallery-portrait-v114.png", {
		projectSlug: "site-assets",
		category: "design",
		identification: "confirmed",
		kind: "site",
		caption: "Generated portrait companion for the conceptual glass pixel-wall and white-gallery landing artwork; not a client project."
	}),
	file("/portfolio-carousel/_identity/field-trip-tech-gallery-v114.png", {
		projectSlug: "site-assets",
		category: "design",
		identification: "confirmed",
		kind: "site",
		caption: "Generated conceptual glass pixel-wall installation with a restrained horizontal light on the left and an open white gallery on the right; landing artwork, not a client project."
	}),
	file("/portfolio-carousel/_identity/field-trip-tech-gallery-portrait-v113.png", {
		projectSlug: "site-assets",
		category: "design",
		identification: "confirmed",
		kind: "site",
		caption: "Generated portrait companion for the conceptual light-slit and white-gallery landing artwork; not a client project."
	}),
	file("/portfolio-carousel/_identity/field-trip-tech-gallery-v113.png", {
		projectSlug: "site-assets",
		category: "design",
		identification: "confirmed",
		kind: "site",
		caption: "Generated conceptual light-slit installation with a vertical blue seam on the left and an open white gallery on the right; landing artwork, not a client project."
	}),
	file("/portfolio-carousel/_identity/field-trip-tech-gallery-portrait-v112.png", {
		projectSlug: "site-assets",
		category: "design",
		identification: "confirmed",
		kind: "site",
		caption: "Generated portrait companion for the conceptual LCD-pixel and white-gallery landing artwork; not a client project."
	}),
	file("/portfolio-carousel/_identity/field-trip-tech-gallery-v112.png", {
		projectSlug: "site-assets",
		category: "design",
		identification: "confirmed",
		kind: "site",
		caption: "Generated conceptual LCD-pixel installation with a vertical light on the left and quiet white gallery on the right; landing artwork, not a client project."
	}),
	file("/portfolio-carousel/_identity/field-trip-tech-gallery-portrait-v111.png", {
		projectSlug: "site-assets",
		category: "design",
		identification: "confirmed",
		kind: "site",
		caption: "Generated portrait companion for the conceptual pixel-light and white-gallery landing artwork; not a client project."
	}),
	file("/portfolio-carousel/_identity/field-trip-tech-gallery-v111.png", {
		projectSlug: "site-assets",
		category: "design",
		identification: "confirmed",
		kind: "site",
		caption: "Generated conceptual thin pixel-light installation on the left and quiet white gallery on the right; landing artwork, not a client project."
	}),
	file("/portfolio-carousel/_identity/field-trip-tech-gallery-portrait-v110.png", {
		projectSlug: "site-assets",
		category: "design",
		identification: "confirmed",
		kind: "site",
		caption: "Generated portrait companion for the conceptual linear-light and white-gallery landing artwork; not a client project."
	}),
	file("/portfolio-carousel/_identity/field-trip-tech-gallery-v110.png", {
		projectSlug: "site-assets",
		category: "design",
		identification: "confirmed",
		kind: "site",
		caption: "Generated conceptual linear-light installation on the left and white gallery on the right; landing artwork, not a client project."
	}),
	file("/portfolio-carousel/_identity/field-trip-tech-gallery-portrait-v109.png", {
		projectSlug: "site-assets",
		category: "design",
		identification: "confirmed",
		kind: "site",
		caption: "Generated portrait companion for the conceptual pixel-light and gallery landing artwork; not a client project."
	}),
	file("/portfolio-carousel/_identity/field-trip-tech-gallery-v109.png", {
		projectSlug: "site-assets",
		category: "design",
		identification: "confirmed",
		kind: "site",
		caption: "Generated conceptual pixel-light installation on the left and white gallery on the right; landing artwork, not a client project."
	}),
	file("/portfolio-carousel/_identity/field-trip-tech-gallery-portrait-v108.png", {
		projectSlug: "site-assets",
		category: "design",
		identification: "confirmed",
		kind: "site",
		caption: "Generated portrait companion for the conceptual LCD and gallery landing artwork; not a client project."
	}),
	file("/portfolio-carousel/_identity/field-trip-tech-gallery-v108.png", {
		projectSlug: "site-assets",
		category: "design",
		identification: "confirmed",
		kind: "site",
		caption: "Generated conceptual LCD installation on the left and white gallery on the right; landing artwork, not a client project."
	}),
	file("/portfolio-carousel/_identity/field-trip-gallery-light.png", {
		projectSlug: "site-assets",
		category: "design",
		identification: "confirmed",
		kind: "site",
		caption: "Generated conceptual gallery and digital-light artwork for the landing page; not a client project."
	}),
	file("/capability-design.png", {
		projectSlug: "site-assets",
		category: "design",
		identification: "confirmed",
		kind: "site"
	}),
	file("/capability-design.webp", {
		projectSlug: "site-assets",
		category: "design",
		identification: "confirmed",
		kind: "site"
	}),
	file("/capability-fabrication.png", {
		projectSlug: "site-assets",
		category: "fabrication",
		identification: "confirmed",
		kind: "site"
	}),
	file("/capability-fabrication.webp", {
		projectSlug: "site-assets",
		category: "fabrication",
		identification: "confirmed",
		kind: "site"
	}),
	file("/capability-installation.png", {
		projectSlug: "site-assets",
		category: "installation",
		identification: "confirmed",
		kind: "site"
	}),
	...[
		"field-trip-home-desktop.png",
		"field-trip-home-mobile.png",
		"field-trip-home-original-v34.jpeg",
		"field-trip-master-desktop-v25.png",
		"field-trip-master-desktop-v27.webp",
		"field-trip-master-mobile-v25.png",
		"field-trip-master-mobile-v27.webp",
		"field-trip-pencils-blank.png",
		"field-trip-worktable-reference.jpeg",
		"pencil-background-plate.png"
	].map((name) => file(`/${name}`, {
		projectSlug: "site-assets",
		category: "design",
		identification: "confirmed",
		kind: "site"
	})),
	...Array.from({ length: 6 }, (_, index) => file(`/pencil-faces/pencil-face-${index}.webp`, {
		projectSlug: "site-assets",
		category: "design",
		identification: "confirmed",
		kind: "site"
	})),
	file("/spaces/atlantic-mills-curved-stairwell.jpeg", {
		projectSlug: "site-assets",
		category: "design",
		identification: "confirmed",
		kind: "site",
		caption: "Original Atlantic Mills interior photograph supplied by the owner (IMG_6717.jpeg); retained source, superseded on Home by the exterior tower photograph."
	}),
	file("/spaces/atlantic-mills-stairwell-up-source.jpeg", {
		projectSlug: "site-assets",
		category: "design",
		identification: "confirmed",
		kind: "site",
		caption: "Owner-supplied Atlantic Mills stairwell photograph in IMG_8777.jpeg. Original screenshot retained; About uses a CSS viewport to display the photograph only."
	}),
	file("/spaces/atlantic-mills-stairwell-down-source.jpeg", {
		projectSlug: "site-assets",
		category: "design",
		identification: "confirmed",
		kind: "site",
		caption: "Owner-supplied Atlantic Mills timber stair detail in IMG_8781.jpeg. Original screenshot retained; About uses a CSS viewport to display the photograph only."
	}),
	file("/spaces/atlantic-mills-blue-sky.jpeg", {
		projectSlug: "site-assets",
		category: "design",
		identification: "confirmed",
		kind: "site",
		caption: "Original Atlantic Mills exterior photograph supplied by the owner; retained source."
	}),
	file("/spaces/atlantic-mills-tower-windows-approved.png", {
		projectSlug: "site-assets",
		category: "design",
		identification: "confirmed",
		kind: "site",
		caption: "Owner-approved Atlantic Mills tower artist rendering with restored low-wing window glazing; not a documentary photograph."
	}),
	file("/spaces/atlantic-mills-tower-enhanced.webp", {
		projectSlug: "site-assets",
		category: "design",
		identification: "confirmed",
		kind: "site",
		caption: "Atlantic Mills tower artist rendering, enhanced from an earlier owner-requested tower study; not a documentary photograph."
	}),
	file("/spaces/atlantic-mills-pencil-v2.png", {
		projectSlug: "site-assets",
		category: "design",
		identification: "confirmed",
		kind: "site",
		caption: "Owner-requested pencil refinement of the full Atlantic Mills facade; original linework retained."
	}),
	file("/spaces/atlantic-mills-line-drawing.png", {
		projectSlug: "site-assets",
		category: "design",
		identification: "confirmed",
		kind: "site",
		caption: "Owner-selected facilities illustration of the full Atlantic Mills facade with both towers and no labels; About spaces."
	}),
	file("/spaces/6-st-james-entrance.png", {
		projectSlug: "site-assets",
		category: "design",
		identification: "confirmed",
		kind: "site",
		caption: "Owner-selected pencil illustration of the 6 Saint James Place doorway; About Brooklyn facilities."
	}),
	file("/portfolio-carousel/_identity/elkan-levinsohn-logo.webp", {
		projectSlug: "site-assets",
		category: "design",
		identification: "confirmed",
		kind: "site"
	}),
	file("/portfolio-carousel/_identity/field-trip-cnc-gallery-line.webp", {
		projectSlug: "site-assets",
		category: "design",
		identification: "confirmed",
		kind: "site",
		caption: "Field Trip identity artwork. Not documentary photography of The Blanket / The Chocolate Factory."
	}),
	...[
		"file.svg",
		"window.svg",
		"globe.svg",
		"favicon.svg"
	].map((name) => file(`/${name}`, {
		projectSlug: "site-assets",
		category: "design",
		identification: "confirmed",
		kind: "site"
	}))
];
var numberedDuplicatePairs = (copiesDirectory, copyNumbers, sourceDirectory, sourceNumbers) => copyNumbers.map((copyNumber, index) => [`${copiesDirectory}/${String(copyNumber).padStart(2, "0")}.webp`, `${sourceDirectory}/${String(sourceNumbers[index]).padStart(2, "0")}.webp`]);
var duplicateOfBySrc = Object.fromEntries([
	...Object.entries({
		"2012-us-olympics": "/project-galleries/2012-us-olympics/01.webp",
		archive: "/project-galleries/archive/02.webp",
		ascend: "/project-galleries/ascend/01.webp",
		"beat-repeat": "/project-galleries/beat-repeat/01.webp",
		"best-of-all-possible-worlds": "/project-galleries/best-of-all-possible-worlds/01.webp",
		"bldg-92": "/project-galleries/bldg-92/01.webp",
		"brooklyn-museum": "/project-galleries/brooklyn-museum/01.webp",
		"cooper-hewitt": "/project-galleries/cooper-hewitt/01.webp",
		"core-nyc": "/project-galleries/core-nyc/01.webp",
		"dia-beacon": "/project-galleries/dia-beacon/02.webp",
		"electric-jukebox": "/project-galleries/electric-jukebox/01.webp",
		"heart-bot": "/project-galleries/archive/06.webp",
		"holocaust-by-bullets": "/project-galleries/holocaust-by-bullets/01.webp",
		"hyatt-photo-booth": "/project-galleries/hyatt-photo-booth/01.webp",
		"jadu-beta": "/project-galleries/jadu-beta/01.webp",
		"nike-free-hyperfeel": "/project-galleries/nike-free-hyperfeel/04.webp",
		"on-becoming-an-artist": "/project-galleries/on-becoming-an-artist/01.webp",
		tumi: "/project-galleries/tumi/01.webp",
		"wheat-thins-popped": "/project-galleries/wheat-thins-popped/01.webp"
	}).map(([projectSlug, source]) => [`/projects/${projectSlug}.webp`, source]),
	...numberedDuplicatePairs("/portfolio-carousel/brooklyn-museum", [
		6,
		7,
		8,
		9
	], "/project-galleries/brooklyn-museum", [
		1,
		2,
		3,
		4
	]),
	...numberedDuplicatePairs("/portfolio-carousel/delta", [
		9,
		10,
		11,
		12,
		13,
		14
	], "/project-galleries/ascend", [
		2,
		3,
		4,
		5,
		6,
		7
	]),
	...numberedDuplicatePairs("/portfolio-carousel/cooper-hewitt", [
		5,
		7,
		8,
		9,
		11
	], "/project-galleries/cooper-hewitt", [
		1,
		3,
		5,
		6,
		8
	]),
	["/project-galleries/beat-repeat/overview-original.jpg", "/project-galleries/beat-repeat/02.webp"],
	...numberedDuplicatePairs("/portfolio-carousel/nike", [
		1,
		3,
		4,
		5,
		6,
		7,
		9,
		12,
		14,
		15,
		16,
		17,
		18,
		19,
		20,
		21,
		22,
		23,
		24
	], "/project-galleries/nike-free-hyperfeel", [
		4,
		12,
		11,
		2,
		4,
		9,
		3,
		1,
		3,
		4,
		5,
		6,
		7,
		8,
		9,
		10,
		11,
		12,
		13
	]),
	...numberedDuplicatePairs("/portfolio-carousel/new-museum", [
		1,
		4,
		5,
		13,
		14,
		16,
		17,
		18,
		19
	], "/project-galleries/heart-bot", [
		7,
		6,
		5,
		1,
		2,
		4,
		5,
		6,
		7
	]),
	...numberedDuplicatePairs("/portfolio-carousel/sonos-janelle-monae", [
		7,
		8,
		9
	], "/project-galleries/electric-jukebox", [
		1,
		2,
		3
	]),
	...numberedDuplicatePairs("/portfolio-carousel/museum-city-new-york", [
		2,
		6,
		7,
		8,
		9,
		10
	], "/project-galleries/core-nyc", [
		3,
		1,
		2,
		3,
		4,
		5
	]),
	...numberedDuplicatePairs("/portfolio-carousel/socrates-sculpture-park", [
		3,
		8,
		10,
		12,
		13,
		14
	], "/project-galleries/best-of-all-possible-worlds", [
		5,
		4,
		1,
		3,
		4,
		5
	]),
	...numberedDuplicatePairs("/portfolio-carousel/dia-beacon", [
		1,
		2,
		3,
		4,
		5,
		6
	], "/project-galleries/dia-beacon", [
		1,
		2,
		3,
		1,
		2,
		3
	]),
	...numberedDuplicatePairs("/portfolio-carousel/noguchi-museum", [
		8,
		9,
		10,
		11
	], "/project-galleries/on-becoming-an-artist", [
		1,
		2,
		3,
		4
	]),
	...numberedDuplicatePairs("/portfolio-carousel/saul-melman-jadu-beta", [
		1,
		2,
		3,
		7,
		8,
		11
	], "/project-galleries/jadu-beta", [
		1,
		4,
		5,
		1,
		2,
		5
	]),
	...numberedDuplicatePairs("/portfolio-carousel/nabisco", [
		1,
		2,
		4,
		5,
		6,
		7,
		8,
		9,
		10,
		11,
		12,
		13,
		14
	], "/project-galleries/wheat-thins-popped", [
		7,
		2,
		6,
		1,
		5,
		3,
		1,
		2,
		3,
		4,
		5,
		6,
		7
	]),
	...numberedDuplicatePairs("/portfolio-carousel/liberty-science-center", [
		1,
		2,
		3,
		4,
		5
	], "/project-galleries/dream-machine", [
		1,
		2,
		3,
		4,
		5
	]),
	...numberedDuplicatePairs("/portfolio-carousel/carnegie", [
		2,
		3,
		4,
		5,
		6,
		7,
		8
	], "/project-galleries/m-is-for-museum", [
		2,
		3,
		4,
		5,
		6,
		7,
		1
	]),
	["/project-galleries/cooper-hewitt/04.webp", "/project-galleries/cooper-hewitt/02.webp"],
	["/portfolio-carousel/intel/01.webp", "/portfolio-carousel/new-museum/12.webp"],
	["/portfolio-carousel/intel/02.webp", "/portfolio-carousel/new-museum/10.webp"],
	["/portfolio-carousel/intel/04.webp", "/portfolio-carousel/new-museum/09.webp"],
	["/process/china-institute-install-wide.webp", "/project-galleries/china-institute/01.webp"],
	["/process/china-institute-install-progress.webp", "/project-galleries/china-institute/02.webp"],
	["/process/china-institute-install-wall.webp", "/project-galleries/china-institute/03.webp"],
	["/project-galleries/archive/01.webp", "/project-galleries/core-nyc/01.webp"],
	["/project-galleries/archive/02.webp", "/project-galleries/core-nyc/03.webp"],
	["/project-galleries/archive/03.webp", "/project-galleries/ascend/02.webp"],
	["/project-galleries/archive/04.webp", "/project-galleries/electric-jukebox/01.webp"],
	["/project-galleries/archive/05.webp", "/project-galleries/wheat-thins-popped/04.webp"],
	["/project-galleries/archive/10.webp", "/project-galleries/tumi/01.webp"],
	["/project-galleries/archive/11.webp", "/project-galleries/wheat-thins-popped/02.webp"],
	["/project-galleries/archive/12.webp", "/project-galleries/heart-bot/04.webp"],
	["/project-galleries/archive/14.webp", "/project-galleries/nike-free-hyperfeel/08.webp"],
	["/project-galleries/archive/15.webp", "/project-galleries/best-of-all-possible-worlds/04.webp"],
	["/project-galleries/archive/17.webp", "/project-galleries/jadu-beta/01.webp"],
	["/capability-design.webp", "/capability-design.png"],
	["/capability-fabrication.webp", "/capability-fabrication.png"],
	["/field-trip-master-desktop-v27.webp", "/field-trip-master-desktop-v25.png"],
	["/field-trip-master-mobile-v27.webp", "/field-trip-master-mobile-v25.png"]
]);
var approvedChinaPhotographs = [
	"/project-galleries/china-institute/completed-gallery-front.jpg",
	"/project-galleries/china-institute/completed-gallery-wall.jpg",
	"/project-galleries/china-institute/completed-gallery-panorama.jpg",
	"/project-galleries/china-institute/finished-main-gallery.jpg",
	"/project-galleries/china-institute/finished-exterior.jpg"
];
var chinaCaptions = [
	"Chinese Opera: A Century of Dreams — Art, Design, and Technology, completed gallery front view. Source: East China Normal University, School of Design.",
	"Chinese Opera: A Century of Dreams — Art, Design, and Technology, framed works along the gallery wall. Source: East China Normal University, School of Design.",
	"Chinese Opera: A Century of Dreams — Art, Design, and Technology, gallery corner with multimedia display. Source: East China Normal University, School of Design.",
	"Completed China Institute gallery, wide view",
	"China Institute exterior and exhibition entrance"
];
var researchProjectImages = [
	file("/project-research-images/core-nyc/source-003.webp", {
		"projectSlug": "core-nyc",
		"category": "design",
		"identification": "confirmed",
		"kind": "project",
		"caption": "New York at Its Core, view through the dark exhibition galleries.",
		"sourceCredit": {
			"label": "Source: South Side Design & Building",
			"href": "https://www.southsidedb.com/portfolio-1/new-portfolio-item-3"
		}
	}),
	file("/project-research-images/core-nyc/source-004.webp", {
		"projectSlug": "core-nyc",
		"category": "design",
		"identification": "confirmed",
		"kind": "project",
		"caption": "New York at Its Core, historical displays and illuminated cases.",
		"sourceCredit": {
			"label": "Source: South Side Design & Building",
			"href": "https://www.southsidedb.com/portfolio-1/new-portfolio-item-3"
		}
	}),
	file("/project-research-images/core-nyc/source-005.webp", {
		"projectSlug": "core-nyc",
		"category": "design",
		"identification": "confirmed",
		"kind": "project",
		"caption": "New York at Its Core, Future City Lab in the daylit gallery.",
		"sourceCredit": {
			"label": "Source: South Side Design & Building",
			"href": "https://www.southsidedb.com/portfolio-1/new-portfolio-item-3"
		}
	}),
	file("/project-research-images/core-nyc/source-006.webp", {
		"projectSlug": "core-nyc",
		"category": "design",
		"identification": "confirmed",
		"kind": "project",
		"caption": "New York at Its Core, detail of the tiled interactive exhibit surface.",
		"sourceCredit": {
			"label": "Source: South Side Design & Building",
			"href": "https://www.southsidedb.com/portfolio-1/new-portfolio-item-3"
		}
	}),
	file("/project-research-images/core-nyc/source-007.webp", {
		"projectSlug": "core-nyc",
		"category": "design",
		"identification": "confirmed",
		"kind": "project",
		"caption": "New York at Its Core, Money, Density, Diversity gallery entrance.",
		"sourceCredit": {
			"label": "Source: South Side Design & Building",
			"href": "https://www.southsidedb.com/portfolio-1/new-portfolio-item-3"
		}
	}),
	file("/project-research-images/core-nyc/source-008.webp", {
		"projectSlug": "core-nyc",
		"category": "design",
		"identification": "confirmed",
		"kind": "project",
		"caption": "New York at Its Core, World City gallery projection.",
		"sourceCredit": {
			"label": "Source: South Side Design & Building",
			"href": "https://www.southsidedb.com/portfolio-1/new-portfolio-item-3"
		}
	}),
	file("/project-research-images/core-nyc/source-009.webp", {
		"projectSlug": "core-nyc",
		"category": "design",
		"identification": "confirmed",
		"kind": "project",
		"caption": "New York at Its Core, interactive tables in Future City Lab.",
		"sourceCredit": {
			"label": "Source: South Side Design & Building",
			"href": "https://www.southsidedb.com/portfolio-1/new-portfolio-item-3"
		}
	}),
	file("/project-research-images/core-nyc/source-010.webp", {
		"projectSlug": "core-nyc",
		"category": "design",
		"identification": "confirmed",
		"kind": "project",
		"caption": "New York at Its Core, display cases in the Gilded Age gallery.",
		"sourceCredit": {
			"label": "Source: South Side Design & Building",
			"href": "https://www.southsidedb.com/portfolio-1/new-portfolio-item-3"
		}
	}),
	file("/project-research-images/holocaust-by-bullets/source-036.webp", {
		"projectSlug": "holocaust-by-bullets",
		"category": "design",
		"identification": "confirmed",
		"kind": "project",
		"caption": "Holocaust by Bullets, visitor seated at a testimony display."
	}),
	file("/project-research-images/holocaust-by-bullets/source-037.webp", {
		"projectSlug": "holocaust-by-bullets",
		"category": "design",
		"identification": "confirmed",
		"kind": "project",
		"caption": "Holocaust by Bullets, gallery installation with testimony screens and benches."
	}),
	file("/project-research-images/beat-repeat/source-081.webp", {
		"projectSlug": "beat-repeat",
		"category": "design",
		"identification": "confirmed",
		"kind": "project",
		"caption": "Beat : Repeat, vintage drum machines arranged on exhibition plinths."
	}),
	file("/project-research-images/beat-repeat/source-082.webp", {
		"projectSlug": "beat-repeat",
		"category": "design",
		"identification": "confirmed",
		"kind": "project",
		"caption": "Beat : Repeat, Rhythm Box and Maestro drum-machine displays."
	}),
	file("/project-research-images/beat-repeat/source-083.webp", {
		"projectSlug": "beat-repeat",
		"category": "design",
		"identification": "confirmed",
		"kind": "project",
		"caption": "Beat : Repeat, exhibition identity and installation visible from the street."
	}),
	file("/project-research-images/hyatt-photo-booth/source-120.webp", {
		"projectSlug": "hyatt-photo-booth",
		"category": "design",
		"identification": "confirmed",
		"kind": "project",
		"caption": "Hyatt Mechanical Photo Booth, exterior of the freestanding booth."
	}),
	file("/project-research-images/hyatt-photo-booth/source-121.webp", {
		"projectSlug": "hyatt-photo-booth",
		"category": "design",
		"identification": "confirmed",
		"kind": "project",
		"caption": "Hyatt Mechanical Photo Booth, illuminated exterior panels at night."
	}),
	file("/project-research-images/beat-repeat/source-202.webp", {
		"projectSlug": "beat-repeat",
		"category": "design",
		"identification": "confirmed",
		"kind": "project",
		"caption": "Beat : Repeat — 2 Live Crew Me So Horny",
		"sourceCredit": {
			"label": "Photo: Nathan Punwar",
			"href": "https://redpaperheart.com/work/beat-repeat"
		}
	}),
	file("/project-research-images/beat-repeat/source-203.webp", {
		"projectSlug": "beat-repeat",
		"category": "design",
		"identification": "confirmed",
		"kind": "project",
		"caption": "Beat : Repeat — connect a drum machine to listen",
		"sourceCredit": {
			"label": "Photo: Nathan Punwar",
			"href": "https://redpaperheart.com/work/beat-repeat"
		}
	}),
	file("/project-research-images/beat-repeat/source-205.webp", {
		"projectSlug": "beat-repeat",
		"category": "design",
		"identification": "confirmed",
		"kind": "project",
		"caption": "Beat : Repeat — roland composer tr-808",
		"sourceCredit": {
			"label": "Photo: Nathan Punwar",
			"href": "https://redpaperheart.com/work/beat-repeat"
		}
	}),
	file("/project-research-images/beat-repeat/source-206.webp", {
		"projectSlug": "beat-repeat",
		"category": "design",
		"identification": "confirmed",
		"kind": "project",
		"caption": "Beat : Repeat — Ice-T Reckless",
		"sourceCredit": {
			"label": "Photo: Nathan Punwar",
			"href": "https://redpaperheart.com/work/beat-repeat"
		}
	}),
	file("/project-research-images/beat-repeat/source-207.webp", {
		"projectSlug": "beat-repeat",
		"category": "design",
		"identification": "confirmed",
		"kind": "project",
		"caption": "Beat : Repeat — exhibit at Red Bull Music Academy",
		"sourceCredit": {
			"label": "Photo: Nathan Punwar",
			"href": "https://redpaperheart.com/work/beat-repeat"
		}
	}),
	file("/project-research-images/beat-repeat/source-208.webp", {
		"projectSlug": "beat-repeat",
		"category": "design",
		"identification": "confirmed",
		"kind": "project",
		"caption": "Beat : Repeat — Michael Jackson, Linn 9000",
		"sourceCredit": {
			"label": "Photo: Nathan Punwar",
			"href": "https://redpaperheart.com/work/beat-repeat"
		}
	}),
	file("/project-research-images/beat-repeat/source-209.webp", {
		"projectSlug": "beat-repeat",
		"category": "design",
		"identification": "confirmed",
		"kind": "project",
		"caption": "Beat : Repeat — Beastie Boys",
		"sourceCredit": {
			"label": "Photo: Nathan Punwar",
			"href": "https://redpaperheart.com/work/beat-repeat"
		}
	}),
	file("/project-research-images/beat-repeat/source-210.webp", {
		"projectSlug": "beat-repeat",
		"category": "design",
		"identification": "confirmed",
		"kind": "project",
		"caption": "Beat : Repeat — The Cure, Rhythm DR-55",
		"sourceCredit": {
			"label": "Photo: Nathan Punwar",
			"href": "https://redpaperheart.com/work/beat-repeat"
		}
	}),
	file("/project-research-images/beat-repeat/source-211.webp", {
		"projectSlug": "beat-repeat",
		"category": "design",
		"identification": "confirmed",
		"kind": "project",
		"caption": "Beat : Repeat — Nomad Rhythm Maker 12, Ace Tone Rhthm Ace FR-1",
		"sourceCredit": {
			"label": "Photo: Nathan Punwar",
			"href": "https://redpaperheart.com/work/beat-repeat"
		}
	}),
	file("/project-research-images/beat-repeat/source-212.webp", {
		"projectSlug": "beat-repeat",
		"category": "design",
		"identification": "confirmed",
		"kind": "project",
		"caption": "Beat : Repeat — exhibit at Red Bull Music Academy",
		"sourceCredit": {
			"label": "Photo: Nathan Punwar",
			"href": "https://redpaperheart.com/work/beat-repeat"
		}
	}),
	file("/project-research-images/ascend/source-214.webp", {
		"projectSlug": "ascend",
		"category": "design",
		"identification": "confirmed",
		"kind": "project",
		"caption": "Ascend at TED2016, the mirrored installation and its suspended lights.",
		"sourceCredit": {
			"label": "Source: See Through Lab",
			"href": "https://seethroughlab.com/projects/delta-ascend/"
		}
	}),
	file("/project-research-images/ascend/source-215.webp", {
		"projectSlug": "ascend",
		"category": "design",
		"identification": "confirmed",
		"kind": "process",
		"caption": "Ascend, installation construction shown in See Through Lab’s project film.",
		"sourceCredit": {
			"label": "Source: See Through Lab",
			"href": "https://seethroughlab.com/projects/delta-ascend/"
		}
	}),
	file("/project-research-images/ascend/source-216.webp", {
		"projectSlug": "ascend",
		"category": "design",
		"identification": "confirmed",
		"kind": "project",
		"caption": "Ascend at TED2016, visitors inside the illuminated installation.",
		"sourceCredit": {
			"label": "Source: See Through Lab",
			"href": "https://seethroughlab.com/projects/delta-ascend/"
		}
	}),
	file("/project-research-images/ascend/source-217.webp", {
		"projectSlug": "ascend",
		"category": "design",
		"identification": "confirmed",
		"kind": "project",
		"caption": "Ascend at TED2016, wide view of the suspended lights and mirrored interior.",
		"sourceCredit": {
			"label": "Source: See Through Lab",
			"href": "https://seethroughlab.com/projects/delta-ascend/"
		}
	}),
	file("/project-research-images/wheat-thins-popped/source-218.webp", {
		"projectSlug": "wheat-thins-popped",
		"category": "installation",
		"identification": "confirmed",
		"kind": "project",
		"caption": "Wheat Thins Popped, balloon installation and visitor area in Times Square.",
		"sourceCredit": {
			"label": "Source: SFDS",
			"href": "https://www.sfdshop.com/portfolio/ejfjgmmf6ndw23z-exgyr-mrmxx-rm24f-axx2c"
		}
	}),
	file("/project-research-images/wheat-thins-popped/source-219.webp", {
		"projectSlug": "wheat-thins-popped",
		"category": "installation",
		"identification": "confirmed",
		"kind": "project",
		"caption": "Wheat Thins Popped, the Times Square event and photo station.",
		"sourceCredit": {
			"label": "Source: SFDS",
			"href": "https://www.sfdshop.com/portfolio/ejfjgmmf6ndw23z-exgyr-mrmxx-rm24f-axx2c"
		}
	}),
	file("/project-research-images/wheat-thins-popped/source-220.webp", {
		"projectSlug": "wheat-thins-popped",
		"category": "installation",
		"identification": "confirmed",
		"kind": "project",
		"caption": "Wheat Thins Popped, close view of the balloon installation.",
		"sourceCredit": {
			"label": "Source: SFDS",
			"href": "https://www.sfdshop.com/portfolio/ejfjgmmf6ndw23z-exgyr-mrmxx-rm24f-axx2c"
		}
	}),
	file("/project-research-images/wheat-thins-popped/source-221.webp", {
		"projectSlug": "wheat-thins-popped",
		"category": "installation",
		"identification": "confirmed",
		"kind": "project",
		"caption": "Wheat Thins Popped, event participants at the branded photo backdrop.",
		"sourceCredit": {
			"label": "Source: SFDS",
			"href": "https://www.sfdshop.com/portfolio/ejfjgmmf6ndw23z-exgyr-mrmxx-rm24f-axx2c"
		}
	})
];
var rawImageCatalog = [
	file("/project-galleries/ascend/03-color-20261101.webp", {
		projectSlug: "ascend",
		category: "design",
		identification: "confirmed",
		kind: "project"
	}),
	file("/project-galleries/ascend/05-color-20261101.webp", {
		projectSlug: "ascend",
		category: "design",
		identification: "confirmed",
		kind: "project"
	}),
	file("/project-galleries/ascend/06-color-20261101.webp", {
		projectSlug: "ascend",
		category: "design",
		identification: "confirmed",
		kind: "project"
	}),
	file("/project-research-images/ascend/source-215-clean-20261101.webp", {
		projectSlug: "ascend",
		category: "design",
		identification: "confirmed",
		kind: "process",
		caption: "Ascend, installation construction shown in See Through Lab’s project film.",
		sourceCredit: {
			label: "Source: See Through Lab",
			href: "https://seethroughlab.com/projects/delta-ascend/"
		}
	}),
	file("/project-galleries/beat-repeat/overview-original.jpg", {
		projectSlug: "beat-repeat",
		category: "design",
		identification: "confirmed",
		kind: "project",
		caption: "Beat : Repeat exhibition overview. Source: Red Paper Heart; documentation: Nathan Punwar."
	}),
	file("/project-film-posters/core-nyc-reel.jpg", {
		projectSlug: "core-nyc",
		category: "design",
		identification: "confirmed",
		kind: "site",
		caption: "Native public thumbnail of the 47-second New York at Its Core reel."
	}),
	file("/project-film-posters/core-nyc-opening-20261031.webp", {
		projectSlug: "core-nyc",
		category: "design",
		identification: "confirmed",
		kind: "site",
		caption: "First decoded frame of the original New York at Its Core film, used as its loading poster."
	}),
	file("/home-previews/core-nyc-first-frame.webp", {
		projectSlug: "core-nyc",
		category: "design",
		identification: "confirmed",
		kind: "site",
		caption: "Opening frame of the five-second New York at Its Core Home preview, used by the stage and native video loading poster."
	}),
	file("/project-film-posters/heart-bot-reel.jpg", {
		projectSlug: "heart-bot",
		category: "design",
		identification: "confirmed",
		kind: "site",
		caption: "Drawing-mechanism frame at 0.5 seconds in the approved 12-second photo-led Heart Bot project reel, used only as the film loading poster."
	}),
	...approvedChinaPhotographs.map((src, index) => file(src, {
		projectSlug: "china-institute",
		category: "installation",
		identification: "confirmed",
		kind: "project",
		caption: chinaCaptions[index]
	})),
	file("/brand/field-trip-single-outline-optical.png", {
		projectSlug: "site-assets",
		category: "design",
		identification: "confirmed",
		kind: "site",
		caption: "6 October single-outline yellow ticket with brown FIELD: and white script trip. Reference-based web derivative of the owner's selected 14:52 logo, with balanced internal spacing and transparent surroundings. No underline or registration mark. Shared header/footer artwork, not project photography."
	}),
	file("/brand/field-trip-form-ticket-source.jpeg", {
		projectSlug: "site-assets",
		category: "design",
		identification: "confirmed",
		kind: "site",
		caption: "Owner-supplied 6 October FIELD: trip! logo: dark uppercase FIELD and colon, white handwritten trip! and dark underline on a yellow ticket. Historical original proof preserved unchanged; superseded by the later single-outline ticket."
	}),
	file("/brand/safety-orange-source.png", {
		projectSlug: "site-assets",
		category: "design",
		identification: "confirmed",
		kind: "site",
		caption: "Owner-supplied orange comparison; historical header artwork."
	}),
	file("/brand/field-trip-yellow-source.png", {
		projectSlug: "site-assets",
		category: "design",
		identification: "confirmed",
		kind: "site",
		caption: "Owner-selected yellow Field Trip wordmark with twin bus stripes; unchanged source used to display black lettering on a yellow ticket with semicircular side notches."
	}),
	file("/project-galleries/china-institute/clean-retouched.png", {
		projectSlug: "china-institute",
		category: "installation",
		identification: "confirmed",
		kind: "project",
		caption: "Retouched original installation photograph: workers, tools and temporary materials removed at Adam’s request. Original retained; not a photograph of the completed exhibition."
	}),
	...projectGalleryGroups.flatMap(group),
	...reelGroups.flatMap(group),
	...projectCovers,
	file("/project-galleries/private-residence/01.jpg", {
		projectSlug: "private-residence",
		category: "fabrication",
		identification: "confirmed",
		kind: "project",
		date: "2023"
	}),
	file("/project-galleries/private-residence/02.jpg", {
		projectSlug: "private-residence",
		category: "fabrication",
		identification: "confirmed",
		kind: "project",
		date: "2023"
	}),
	file("/project-galleries/private-residence/03.jpg", {
		projectSlug: "private-residence",
		category: "fabrication",
		identification: "confirmed",
		kind: "project",
		date: "2023"
	}),
	file("/project-galleries/private-residence/04.jpg", {
		projectSlug: "private-residence",
		category: "fabrication",
		identification: "confirmed",
		kind: "project",
		date: "2023"
	}),
	file("/project-galleries/private-residence/05.jpg", {
		projectSlug: "private-residence",
		category: "fabrication",
		identification: "confirmed",
		kind: "project",
		date: "2023"
	}),
	file("/project-galleries/private-residence/06.jpg", {
		projectSlug: "private-residence",
		category: "fabrication",
		identification: "confirmed",
		kind: "project",
		date: "2023"
	}),
	file("/project-galleries/private-residence/07.jpg", {
		projectSlug: "private-residence",
		category: "fabrication",
		identification: "confirmed",
		kind: "project",
		date: "2023"
	}),
	...processImages,
	...studioArchiveFiles,
	...siteAssets,
	...researchProjectImages,
	file("/project-galleries/best-of-all-possible-worlds/decordova-2018.jpg", {
		projectSlug: "best-of-all-possible-worlds",
		category: "installation",
		identification: "confirmed",
		kind: "project",
		venue: "deCordova Sculpture Park and Museum, Lincoln, MA",
		date: "2018",
		caption: "Best of All Possible Worlds at deCordova.",
		sourceCredit: {
			label: "Photograph: Clements Photography and Design, Boston",
			href: "https://bombmagazine.org/articles/2018/10/29/saul-melman/"
		}
	}),
	file("/project-galleries/best-of-all-possible-worlds/decordova-detail-2018.jpg", {
		projectSlug: "best-of-all-possible-worlds",
		category: "installation",
		identification: "confirmed",
		kind: "project",
		venue: "deCordova Sculpture Park and Museum, Lincoln, MA",
		date: "2018",
		caption: "Best of All Possible Worlds, door detail at deCordova.",
		sourceCredit: {
			label: "Photograph: Clements Photography and Design, Boston",
			href: "https://bombmagazine.org/articles/2018/10/29/saul-melman/"
		}
	}),
	file("/project-galleries/central-governor/performance-2010.jpg", {
		projectSlug: "central-governor",
		category: "installation",
		identification: "confirmed",
		kind: "project",
		date: "2010",
		caption: "Saul Melman performing Central Governor at MoMA PS1."
	})
];
var retiredAscendImages = [
	"/project-galleries/ascend/01.webp",
	"/project-galleries/ascend/04.webp",
	"/projects/ascend.webp",
	"/portfolio-carousel/delta/04.webp",
	"/portfolio-carousel/delta/08.webp",
	"/portfolio-carousel/delta/11.webp"
];
var namedPhotoCaptions = {
	"/project-galleries/wheat-thins-popped/02.webp": "Kelly Osbourne at the Wheat Thins Popped launch in Times Square.",
	"/portfolio-carousel/new-museum/12.webp": "50 Cent at the Heart Bot launch, New Museum.",
	"/project-galleries/electric-jukebox/01.webp": "Janelle Monáe at the Electric Jukebox album-release event.",
	"/portfolio-carousel/sonos-janelle-monae/06.webp": "Janelle Monáe at the Electric Jukebox album-release event."
};
var catalogWithDuplicates = rawImageCatalog.map((image) => ({
	...image,
	duplicateOf: duplicateOfBySrc[image.src],
	caption: namedPhotoCaptions[image.src] ?? image.caption,
	sourceCredit: image.sourceCredit ?? verified_image_credits_default[image.src]
}));
var catalogImageBySrc = new Map(catalogWithDuplicates.map((image) => [image.src, image]));
catalogWithDuplicates.filter((image) => image.src !== "/portfolio-carousel/brooklyn-museum/04.webp" && !retiredAscendImages.includes(image.src) && (!image.src.startsWith("/brand/") || [
	"/brand/field-trip-closed-door-sankaty.webp",
	"/brand/field-trip-wordmark.svg",
	"/brand/safety-orange-source.png",
	"/brand/field-trip-yellow-source.png",
	"/brand/field-trip-3d.png",
	"/brand/field-trip-refined-uppercase.png",
	"/brand/field-trip-form-ticket-source.jpeg",
	"/brand/field-trip-single-outline-optical.png"
].includes(image.src)) && !/field-trip-crate-loadout|museum-crate-in-an-empty-gallery/.test(image.src) && (!image.src.includes("china-institute") || approvedChinaPhotographs.includes(image.src))).map((image) => {
	if (image.identification !== "unknown" || !image.duplicateOf) return image;
	const source = catalogImageBySrc.get(image.duplicateOf);
	if (!source || source.identification !== "confirmed") return image;
	return {
		...image,
		projectSlug: source.projectSlug,
		category: source.category,
		identification: "confirmed"
	};
});
function imageCategoryLabel(category) {
	return category === "unknown" ? "Project views" : category.charAt(0).toUpperCase() + category.slice(1);
}
//#endregion
export { projectSectionDefinitions as a, orderProjects as i, imageCategoryLabel as n, projectsInSection as o, compareFinalArtwork as r, exhibitionDisplayInfo as s, imageCategories as t };
