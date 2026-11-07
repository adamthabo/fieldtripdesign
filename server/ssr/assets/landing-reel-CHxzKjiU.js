import { b as require_react, n as require_jsx_runtime, w as __toESM } from "../index.js";
import { t as core_nyc_media_default } from "./core-nyc-media-EKyRbVkv.js";
import { r as projectCaptionYear } from "./project-caption-CQOzgQB_.js";
import { n as HomeVideoSequence, t as HOME_VIDEO_SEQUENCE } from "./home-video-sequence-BW45un_v.js";
import { t as ReelFullscreenButton } from "./reel-fullscreen-button-CDdGreTl.js";
import { t as BrandText } from "./field-trip-name-BbSfcdsd.js";
import { n as photographerName } from "./image-credit-policy-C0re5pSB.js";
import { t as ProjectTitle } from "./project-title-CYErkrLI.js";
//#region app/landing-mask.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
/** Positive alpha mask: photographs can paint only inside the complete letters.
* A fixed 2px transparent raster guard surrounds the slightly wider letter apertures.
* The outer stage repaints that perimeter black after compositing the photographs.
* A separate 1600×1000 photo frame preserves every approved photograph crop. */
function LandingMask({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "landing-mask",
		"data-letter-bounds": "58.68 77.28 1541.32 922.72",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "landing-photograph-frame",
			children
		})
	});
}
//#endregion
//#region app/studio-copy.ts
var studioIntroduction = ["Field Trip designs, fabricates and installs exhibitions, objects and environments.", "Our studios in Brooklyn and at Atlantic Mills in Providence bring together design, material development and hands-on making."];
var marketingCopy = {
	overview: "Field Trip is a full-service creative fabrication and design studio dedicated to turning ambitious architectural, cultural, and commercial concepts into physical reality. Operating at the intersection of rigorous design and technical execution, we guide projects seamlessly from initial ideation through to final on-site installation. Whether we are engineering custom museum environments, high-end retail displays, or complex spatial installations, our core offering is a commitment to uncompromising craftsmanship and creative problem-solving.",
	production: "Our capabilities are anchored by advanced in-house production technology that allows us to push the boundaries of what is possible. From precision CNC routing and high-tolerance laser fabrication to dust-controlled finishing and HEPA-filtered dust extraction, our shop floor is equipped to handle intricate detailing across wood, metal, plastics, and composite materials. This technical fluency means we don't just design objects; we engineer them for structural integrity, durability, and flawless visual impact.",
	providence: "Geographically positioned to serve clients across the Northeast and beyond, our expansion and transition of operations to Providence represent an exciting evolution for the studio. This move allows us to scale our production footprint while maintaining our deep-rooted creative connections to New York and the broader design community. Our Providence facility acts as a robust fabrication powerhouse, giving us the expanded physical capacity to build larger, more complex installations while maintaining the hands-on artistic oversight our clients expect.",
	brooklyn: "Rooted in our foundational years in our Brooklyn studio, Field Trip was built on a culture of relentless experimentation, interdisciplinary collaboration, and hands-on making. That NYC provenance taught us how to navigate tight timelines, complex urban installation challenges, and demanding architectural specs without ever losing sight of the design intent. Today, that legacy informs every project we touch—blending raw industrial grit with refined execution."
};
var servicesCopy = {
	headline: "Our services",
	subheadline: "We bridge the gap between uncompromising design intent and physical reality, delivering custom fabrication, advanced machining, and precision installation for cultural institutions, commercial brands, and architectural spaces.",
	services: [
		{
			id: "design",
			title: "Design & Engineering",
			copy: "Every successful installation starts with rigorous technical thinking. We collaborate closely with architects, curators, and creative directors to translate complex conceptual visions into buildable, structurally sound realities. Drawing on decades of industrial design engineering expertise, we evaluate material performance, constructability, and spatial flow from the outset—ensuring that every detail is optimized before a single piece of material is cut."
		},
		{
			id: "fabrication",
			title: "Advanced Fabrication & Technology",
			copy: marketingCopy.production
		},
		{
			id: "installation",
			title: "Installation & Logistics",
			copy: "The finest build is only as good as its final placement. Field Trip manages white-glove, on-site installation with the discipline required by the world’s leading museums and high-end commercial environments. Navigating tight deadlines, complex site constraints, and rigorous building codes, our team ensures that every project is installed seamlessly, safely, and to exact architectural specifications. We use HEPA-filtered dust extraction and low-impact methods to limit dust, noise, and disruption during installation."
		}
	]
};
servicesCopy.services[0].copy, servicesCopy.services[1].copy, servicesCopy.services[2].copy;
marketingCopy.providence;
marketingCopy.brooklyn;
//#endregion
//#region app/entrance/opening-announcement.tsx
var OPENING_ANNOUNCEMENT_HOLD_MS = 24e3;
var openingAnnouncementTitle = "field trip Design, LLC";
var openingAnnouncementSupport = "Our skilled installation crew uses HEPA-filtered dust extraction for low-impact on-site cutting and sanding.";
var openingAnnouncementMessages = ["Based in Brooklyn, NY, and now Providence, RI, field trip has been designing, building and installing experience-based work since 2014. Our Brooklyn offices, studio and light fabrication facilities occupy three levels at 6 Saint James Place, with space for design work, project preparation and client meetings, and a garden behind.", "At Atlantic Mills in Providence, our offices and studios are in the tower and on the top floor. CNC and laser cutting, metalwork and fine furniture are supported by fabrication facilities at the rear on the first floor, served by a loading dock."];
function OpeningAnnouncement({ playing, reducedMotion, staticMode = false }) {
	const sectionRef = (0, import_react.useRef)(null);
	const inViewRef = (0, import_react.useRef)(false);
	const [inView, setInView] = (0, import_react.useState)(false);
	const [index, setIndex] = (0, import_react.useState)(0);
	const rotating = !staticMode && playing && !reducedMotion && inView;
	(0, import_react.useEffect)(() => {
		const section = sectionRef.current;
		if (!section) return;
		let active = true;
		const updateInView = (visible) => {
			if (!active) return;
			inViewRef.current = visible;
			setInView(visible);
		};
		if (typeof IntersectionObserver !== "undefined") {
			const observer = new IntersectionObserver((entries) => {
				const latest = entries[entries.length - 1];
				if (latest) updateInView(latest.isIntersecting && latest.intersectionRatio > 0);
			}, { threshold: [0, .001] });
			observer.observe(section);
			return () => {
				active = false;
				inViewRef.current = false;
				observer.disconnect();
			};
		}
		let frame = null;
		const measure = () => {
			frame = null;
			if (!active) return;
			const rect = section.getBoundingClientRect();
			updateInView(rect.width > 0 && rect.height > 0 && rect.bottom > 0 && rect.top < window.innerHeight && rect.right > 0 && rect.left < window.innerWidth);
		};
		const scheduleMeasure = () => {
			if (active && frame === null) frame = window.requestAnimationFrame(measure);
		};
		measure();
		window.addEventListener("scroll", scheduleMeasure, {
			passive: true,
			capture: true
		});
		window.addEventListener("resize", scheduleMeasure);
		return () => {
			active = false;
			inViewRef.current = false;
			if (frame !== null) window.cancelAnimationFrame(frame);
			window.removeEventListener("scroll", scheduleMeasure, true);
			window.removeEventListener("resize", scheduleMeasure);
		};
	}, []);
	(0, import_react.useEffect)(() => {
		if (!rotating) return;
		const timer = window.setTimeout(() => {
			if (inViewRef.current && !document.hidden && navigator.onLine !== false) setIndex((current) => (current + 1) % openingAnnouncementMessages.length);
		}, OPENING_ANNOUNCEMENT_HOLD_MS);
		return () => window.clearTimeout(timer);
	}, [rotating, index]);
	if (staticMode) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "opening-announcement opening-announcement--static",
		"aria-label": "field trip announcement",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "opening-announcement-title",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandText, { children: openingAnnouncementTitle })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "studio-introduction",
			children: studioIntroduction.map((paragraph) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandText, { children: paragraph }) }, paragraph))
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		ref: sectionRef,
		className: "opening-announcement",
		"aria-label": "field trip announcement",
		"data-playing": rotating,
		"data-static-copy": reducedMotion,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "opening-announcement-title",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandText, { children: openingAnnouncementTitle })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "opening-announcement-visual",
				"aria-hidden": "true",
				"aria-live": "off",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "opening-announcement-messages",
					children: openingAnnouncementMessages.map((message, messageIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: `opening-announcement-message${messageIndex === index ? " is-current" : ""}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandText, { children: message })
					}, message))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "opening-announcement-transcript",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: openingAnnouncementMessages.map((message) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandText, { children: message }) }, message)) })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "opening-announcement-support",
				children: openingAnnouncementSupport
			})
		]
	});
}
//#endregion
//#region app/landing-photographs.ts
/** Retained original project photographs before the latest public MCNY selection.
* Enter accents echo each image and keep at least 7:1 contrast against black. */
var originalLandingPhotographs = [
	{
		"src": "/portfolio-carousel/museum-city-new-york/03.webp",
		"projectSlug": "core-nyc",
		"alt": "Illuminated media kiosks in the dark New York at Its Core gallery at MCNY",
		"width": 1488,
		"height": 988,
		"portraitPosition": "50% 50%",
		"torsoCloseup": false,
		"enterColor": "#C4B4A0",
		"framingScale": 1,
		"framingX": 0,
		"framingY": 0
	},
	{
		"src": "/project-galleries/sacred-splendor/01.jpg",
		"projectSlug": "sacred-splendor",
		"alt": "Sacred Splendor exhibition cases at the Jewish Museum",
		"width": 1200,
		"height": 800,
		"portraitPosition": "50% 50%",
		"torsoCloseup": false,
		"enterColor": "#A8B9AA",
		"framingScale": 1,
		"framingX": 0,
		"framingY": 0
	},
	{
		"src": "/portfolio-carousel/brooklyn-museum/03.webp",
		"projectSlug": "brooklyn-museum",
		"alt": "Mannequin face and sculptural garment in the Iris van Herpen case at Brooklyn Museum",
		"width": 1440,
		"height": 1920,
		"portraitPosition": "50% 50%",
		"torsoCloseup": false,
		"enterColor": "#A3CFC7",
		"framingScale": 1,
		"framingX": 0,
		"framingY": 0
	},
	{
		"src": "/portfolio-carousel/cooper-hewitt/01.webp",
		"projectSlug": "cooper-hewitt",
		"alt": "Central aisle of Casa Desenterrada at Cooper Hewitt",
		"width": 1488,
		"height": 1e3,
		"portraitPosition": "50% 50%",
		"torsoCloseup": false,
		"enterColor": "#D2AE8C",
		"framingScale": 1,
		"framingX": 0,
		"framingY": 0
	},
	{
		"src": "/portfolio-carousel/sonos-janelle-monae/02.webp",
		"projectSlug": "electric-jukebox",
		"alt": "Portrait at the Sonos Electric Jukebox event",
		"width": 1920,
		"height": 1193,
		"portraitPosition": "50% 50%",
		"torsoCloseup": false,
		"enterColor": "#B5B5B5",
		"framingScale": 1.2,
		"framingX": 9.5,
		"framingY": -6
	},
	{
		"src": "/project-galleries/dream-machine/03.webp",
		"projectSlug": "dream-machine",
		"alt": "Purple-lit listening tubes in Dream Machine at Liberty Science Center",
		"width": 1920,
		"height": 1282,
		"portraitPosition": "50% 50%",
		"torsoCloseup": false,
		"enterColor": "#D59DE5",
		"framingScale": 1,
		"framingX": 0,
		"framingY": 0
	},
	{
		"src": "/project-galleries/sacred-splendor/02.jpg",
		"projectSlug": "sacred-splendor",
		"alt": "Oblique view of the textile display case in Sacred Splendor at the Jewish Museum",
		"width": 720,
		"height": 514,
		"portraitPosition": "50% 50%",
		"torsoCloseup": false,
		"enterColor": "#B8B59C",
		"framingScale": 1,
		"framingX": 0,
		"framingY": 0
	},
	{
		"src": "/project-galleries/ascend/02.webp",
		"projectSlug": "ascend",
		"alt": "Close-up of suspended LED spheres for Delta at TED",
		"width": 1400,
		"height": 929,
		"portraitPosition": "50% 50%",
		"torsoCloseup": false,
		"enterColor": "#B1BEE8",
		"framingScale": 1,
		"framingX": 0,
		"framingY": 0
	},
	{
		"src": "/portfolio-carousel/museum-city-new-york/04.webp",
		"projectSlug": "core-nyc",
		"alt": "Media displays along the dark New York at Its Core gallery at MCNY",
		"width": 1488,
		"height": 994,
		"portraitPosition": "50% 50%",
		"torsoCloseup": false,
		"enterColor": "#C7B495",
		"framingScale": 1,
		"framingX": 0,
		"framingY": 0
	},
	{
		"src": "/portfolio-carousel/museum-city-new-york/01.webp",
		"projectSlug": "core-nyc",
		"alt": "Large interactive table in New York at Its Core at MCNY",
		"width": 1486,
		"height": 988,
		"portraitPosition": "50% 50%",
		"torsoCloseup": false,
		"enterColor": "#D2B282",
		"framingScale": 1,
		"framingX": 0,
		"framingY": 0
	},
	{
		"src": "/portfolio-carousel/museum-city-new-york/02.webp",
		"projectSlug": "core-nyc",
		"alt": "Portrait media kiosks in New York at Its Core at MCNY",
		"width": 1496,
		"height": 998,
		"portraitPosition": "50% 50%",
		"torsoCloseup": false,
		"enterColor": "#B7C49D",
		"framingScale": 1,
		"framingX": 0,
		"framingY": 0
	},
	{
		"src": "/project-galleries/sacred-splendor/03.jpg",
		"projectSlug": "sacred-splendor",
		"alt": "Sacred Splendor textile case viewed through a gallery doorway at the Jewish Museum",
		"width": 720,
		"height": 514,
		"portraitPosition": "50% 50%",
		"torsoCloseup": false,
		"enterColor": "#A9BAC6",
		"framingScale": 1,
		"framingX": 0,
		"framingY": 0
	},
	{
		"src": "/project-galleries/ascend/05.webp",
		"projectSlug": "ascend",
		"alt": "Visitors in the mirrored LED environment for Delta at TED",
		"width": 1400,
		"height": 780,
		"portraitPosition": "50% 50%",
		"torsoCloseup": false,
		"enterColor": "#EB9EAF",
		"framingScale": 1,
		"framingX": 0,
		"framingY": 0
	},
	{
		"src": "/portfolio-carousel/new-museum/12.webp",
		"projectSlug": "heart-bot",
		"alt": "Guest beside the SMS Audio and Intel event display at the New Museum",
		"width": 1920,
		"height": 1280,
		"portraitPosition": "50% 25%",
		"torsoCloseup": false,
		"enterColor": "#9CBFDA",
		"framingScale": 1.06,
		"framingX": -2.5,
		"framingY": 0
	},
	{
		"src": "/portfolio-carousel/dia-beacon/01.webp",
		"projectSlug": "dia-beacon",
		"alt": "Exhibition partitions in Tehching Hsieh: Lifeworks at Dia Beacon",
		"width": 1568,
		"height": 954,
		"portraitPosition": "50% 50%",
		"torsoCloseup": false,
		"enterColor": "#BDBBAE",
		"framingScale": 1,
		"framingX": 0,
		"framingY": 0
	},
	{
		"src": "/portfolio-carousel/dia-beacon/02.webp",
		"projectSlug": "dia-beacon",
		"alt": "Front view of the Tehching Hsieh exhibition at Dia Beacon",
		"width": 1396,
		"height": 972,
		"portraitPosition": "50% 50%",
		"torsoCloseup": false,
		"enterColor": "#C9C0A6",
		"framingScale": 1,
		"framingX": 0,
		"framingY": 0
	},
	{
		"src": "/portfolio-carousel/museum-city-new-york/05.webp",
		"projectSlug": "core-nyc",
		"alt": "Bright window-side interactive exhibit in New York at Its Core at MCNY",
		"width": 1492,
		"height": 986,
		"portraitPosition": "50% 50%",
		"torsoCloseup": false,
		"enterColor": "#AFC3AE",
		"framingScale": 1,
		"framingX": 0,
		"framingY": 0
	},
	{
		"src": "/project-galleries/wheat-thins-popped/03.webp",
		"projectSlug": "wheat-thins-popped",
		"alt": "Yellow balloon installation for Wheat Thins Popped",
		"width": 937,
		"height": 809,
		"portraitPosition": "50% 50%",
		"torsoCloseup": false,
		"enterColor": "#D8C76F",
		"framingScale": 1,
		"framingX": 0,
		"framingY": 0
	},
	{
		"src": "/project-galleries/beat-repeat/05.webp",
		"projectSlug": "beat-repeat",
		"alt": "Wall-mounted drum machines in Beat : Repeat at Red Bull Studios",
		"width": 1400,
		"height": 782,
		"portraitPosition": "50% 50%",
		"torsoCloseup": false,
		"enterColor": "#CFB2A0",
		"framingScale": 1,
		"framingX": 0,
		"framingY": 0
	},
	{
		"src": "/project-galleries/beat-repeat/overview-original.jpg",
		"projectSlug": "beat-repeat",
		"alt": "Bright gallery overview of Beat : Repeat at Red Bull Studios",
		"width": 1920,
		"height": 1080,
		"portraitPosition": "50% 50%",
		"torsoCloseup": false,
		"enterColor": "#D2C2AE",
		"framingScale": 1,
		"framingX": 0,
		"framingY": 0
	},
	{
		"src": "/project-galleries/china-institute/completed-gallery-front.jpg",
		"projectSlug": "china-institute",
		"alt": "Chinese Opera: A Century of Dreams — Art, Design, and Technology at China Institute, completed gallery frontal view",
		"width": 2e3,
		"height": 1125,
		"portraitPosition": "50% 50%",
		"torsoCloseup": false,
		"enterColor": "#D6BA92",
		"framingScale": 1,
		"framingX": 0,
		"framingY": 0
	},
	{
		"src": "/project-galleries/jadu-beta/01.webp",
		"projectSlug": "jadu-beta",
		"alt": "Jadu Beta installation in a desert landscape",
		"width": 714,
		"height": 493,
		"portraitPosition": "50% 50%",
		"torsoCloseup": false,
		"enterColor": "#88BDE0",
		"framingScale": 1,
		"framingX": 0,
		"framingY": 0
	},
	{
		"src": "/portfolio-carousel/david-bowie/01.webp",
		"projectSlug": "david-bowie-residence",
		"alt": "Terrace at the private residence project",
		"width": 1920,
		"height": 1080,
		"portraitPosition": "50% 50%",
		"torsoCloseup": false,
		"enterColor": "#D6B573",
		"framingScale": 1,
		"framingX": 0,
		"framingY": 0
	},
	{
		"src": "/project-galleries/hyatt-photo-booth/01.webp",
		"projectSlug": "hyatt-photo-booth",
		"alt": "Visitors in the confetti-filled Mechanical Photo Booth for Hyatt",
		"width": 1400,
		"height": 827,
		"portraitPosition": "50% 50%",
		"torsoCloseup": false,
		"enterColor": "#D7A58E",
		"framingScale": 1,
		"framingX": 0,
		"framingY": 0
	},
	{
		"src": "/project-galleries/best-of-all-possible-worlds/01.webp",
		"projectSlug": "best-of-all-possible-worlds",
		"alt": "Best of All Possible Worlds installation at Socrates Sculpture Park",
		"width": 716,
		"height": 476,
		"portraitPosition": "50% 50%",
		"torsoCloseup": false,
		"enterColor": "#A6BA97",
		"framingScale": 1,
		"framingX": 0,
		"framingY": 0
	},
	{
		"src": "/project-galleries/m-is-for-museum/01.webp",
		"projectSlug": "m-is-for-museum",
		"alt": "Interactive exhibition space for M Is for Museum",
		"width": 1125,
		"height": 840,
		"portraitPosition": "50% 50%",
		"torsoCloseup": false,
		"enterColor": "#BDD47F",
		"framingScale": 1,
		"framingX": 0,
		"framingY": 0
	},
	{
		"src": "/portfolio-carousel/noguchi-museum/01.webp",
		"projectSlug": "on-becoming-an-artist",
		"alt": "Sculpture gallery for On Becoming an Artist at the Noguchi Museum",
		"width": 671,
		"height": 487,
		"portraitPosition": "50% 50%",
		"torsoCloseup": false,
		"enterColor": "#D3B98C",
		"framingScale": 1,
		"framingX": 0,
		"framingY": 0
	},
	{
		"src": "/project-galleries/2012-us-olympics/02.webp",
		"projectSlug": "2012-us-olympics",
		"alt": "Speedo exhibition environment for the US Olympic swimming trials",
		"width": 925,
		"height": 568,
		"portraitPosition": "50% 50%",
		"torsoCloseup": false,
		"enterColor": "#9BB5DC",
		"framingScale": 1,
		"framingX": 0,
		"framingY": 0
	},
	{
		"src": "/project-galleries/coney-island-carousel-museum/01.png",
		"projectSlug": "coney-island-carousel-museum",
		"alt": "B&B Carousell at Steeplechase Pavilion, Coney Island",
		"width": 800,
		"height": 533,
		"portraitPosition": "50% 50%",
		"torsoCloseup": false,
		"enterColor": "#CDB18D",
		"framingScale": 1,
		"framingX": 0,
		"framingY": 0
	},
	{
		"src": "/project-galleries/holocaust-by-bullets/01.webp",
		"projectSlug": "holocaust-by-bullets",
		"alt": "Exhibition environment for Holocaust by Bullets",
		"width": 667,
		"height": 406,
		"portraitPosition": "50% 50%",
		"torsoCloseup": false,
		"enterColor": "#A0BFCC",
		"framingScale": 1,
		"framingX": 0,
		"framingY": 0
	},
	{
		"src": "/project-galleries/tumi/01.webp",
		"projectSlug": "tumi",
		"alt": "Illuminated geometric photo booth for TUMI at Tribeca Film Festival",
		"width": 800,
		"height": 800,
		"portraitPosition": "50% 50%",
		"torsoCloseup": false,
		"enterColor": "#B5A2E1",
		"framingScale": 1,
		"framingX": 0,
		"framingY": 0
	},
	{
		"src": "/project-galleries/bldg-92/04.webp",
		"projectSlug": "bldg-92",
		"alt": "Wall displays and casework at BLDG 92, Brooklyn Navy Yard",
		"width": 878,
		"height": 586,
		"portraitPosition": "50% 50%",
		"torsoCloseup": false,
		"enterColor": "#D2A56F",
		"framingScale": 1,
		"framingX": 0,
		"framingY": 0
	},
	{
		"src": "/portfolio-carousel/nike/01.webp",
		"projectSlug": "nike-free-hyperfeel",
		"alt": "Immersive forest environment for Nike Art and Science of Feeling",
		"width": 1200,
		"height": 800,
		"portraitPosition": "50% 50%",
		"torsoCloseup": false,
		"enterColor": "#A7B2C1",
		"framingScale": 1,
		"framingX": 0,
		"framingY": 0
	},
	{
		"src": "/project-galleries/heliogram-series/01.jpg",
		"projectSlug": "heliogram-series",
		"alt": "Heliogram Series artwork by Saul Melman",
		"width": 1056,
		"height": 1583,
		"portraitPosition": "50% 50%",
		"torsoCloseup": false,
		"enterColor": "#B6B8BA",
		"framingScale": 1,
		"framingX": 0,
		"framingY": 0
	},
	{
		"src": "/project-galleries/dream-machine/01.webp",
		"projectSlug": "dream-machine",
		"alt": "Dream Machine installation illuminated in purple at Liberty Science Center",
		"width": 1920,
		"height": 1274,
		"portraitPosition": "50% 50%",
		"torsoCloseup": false,
		"enterColor": "#CF9FDA",
		"framingScale": 1,
		"framingX": 0,
		"framingY": 0
	},
	{
		"src": "/project-galleries/ascend/03.webp",
		"projectSlug": "ascend",
		"alt": "Immersive LED light room for Delta at TED",
		"width": 1400,
		"height": 791,
		"portraitPosition": "50% 50%",
		"torsoCloseup": false,
		"enterColor": "#AFC2DC",
		"framingScale": 1,
		"framingX": 0,
		"framingY": 0
	},
	{
		"src": "/project-galleries/dream-machine/02.webp",
		"projectSlug": "dream-machine",
		"alt": "Visitor using a listening tube in Dream Machine at Liberty Science Center",
		"width": 1920,
		"height": 1075,
		"portraitPosition": "50% 50%",
		"torsoCloseup": false,
		"enterColor": "#ACA7E9",
		"framingScale": 1,
		"framingX": 0,
		"framingY": 0
	}
];
var landingPhotographs = [{
	...originalLandingPhotographs[0],
	...core_nyc_media_default.lead
}, ...originalLandingPhotographs.filter((photograph) => photograph.projectSlug !== "core-nyc")];
var LANDING_HOLD_MS = 1e4;
var LANDING_DISSOLVE_MS = 1600;
var LANDING_MOTION = {
	[core_nyc_media_default.lead.src]: {
		fromScale: 1.042,
		toScale: 1.096,
		fromX: -.66,
		toX: .66,
		fromY: -.78,
		toY: .48
	},
	"/portfolio-carousel/museum-city-new-york/03.webp": {
		fromScale: 1.042,
		toScale: 1.096,
		fromX: -.6,
		toX: .6,
		fromY: -.42,
		toY: .42
	},
	"/project-galleries/sacred-splendor/01.jpg": {
		fromScale: 1.096,
		toScale: 1.042,
		fromX: .6,
		toX: -.6,
		fromY: .36,
		toY: -.36
	},
	"/portfolio-carousel/brooklyn-museum/03.webp": {
		fromScale: 1.02,
		toScale: 1.05,
		fromX: .1,
		toX: -.1,
		fromY: -.25,
		toY: .25
	},
	"/portfolio-carousel/cooper-hewitt/01.webp": {
		fromScale: 1.042,
		toScale: 1.096,
		fromX: -.15,
		toX: .15,
		fromY: -.6,
		toY: .6
	},
	"/portfolio-carousel/sonos-janelle-monae/02.webp": {
		fromScale: 1.02,
		toScale: 1.04,
		fromX: .25,
		toX: -.25,
		fromY: 0,
		toY: .15
	},
	"/project-galleries/dream-machine/03.webp": {
		fromScale: 1.09,
		toScale: 1.042,
		fromX: -1.08,
		toX: 1.08,
		fromY: .3,
		toY: -.3
	},
	"/project-galleries/sacred-splendor/02.jpg": {
		fromScale: 1.042,
		toScale: 1.09,
		fromX: 1.08,
		toX: -1.08,
		fromY: -.3,
		toY: .3
	},
	"/project-galleries/ascend/02.webp": {
		fromScale: 1.042,
		toScale: 1.09,
		fromX: -.9,
		toX: .9,
		fromY: -.48,
		toY: .48
	},
	"/portfolio-carousel/museum-city-new-york/04.webp": {
		fromScale: 1.096,
		toScale: 1.042,
		fromX: 1.14,
		toX: -1.14,
		fromY: .3,
		toY: -.3
	},
	"/portfolio-carousel/museum-city-new-york/01.webp": {
		fromScale: 1.042,
		toScale: 1.096,
		fromX: -.66,
		toX: .66,
		fromY: -.78,
		toY: .48
	},
	"/portfolio-carousel/museum-city-new-york/02.webp": {
		fromScale: 1.09,
		toScale: 1.042,
		fromX: -.9,
		toX: .9,
		fromY: .36,
		toY: -.36
	},
	"/project-galleries/sacred-splendor/03.jpg": {
		fromScale: 1.042,
		toScale: 1.096,
		fromX: .96,
		toX: -.96,
		fromY: -.42,
		toY: .42
	},
	"/project-galleries/ascend/05.webp": {
		fromScale: 1.09,
		toScale: 1.042,
		fromX: -.72,
		toX: .72,
		fromY: .36,
		toY: -.36
	},
	"/portfolio-carousel/new-museum/12.webp": {
		fromScale: 1.04,
		toScale: 1.02,
		fromX: -.35,
		toX: .35,
		fromY: .15,
		toY: -.15
	},
	"/portfolio-carousel/dia-beacon/01.webp": {
		fromScale: 1.042,
		toScale: 1.09,
		fromX: 1.32,
		toX: -1.32,
		fromY: -.3,
		toY: .3
	},
	"/portfolio-carousel/dia-beacon/02.webp": {
		fromScale: 1.096,
		toScale: 1.042,
		fromX: -.2,
		toX: .2,
		fromY: .54,
		toY: -.54
	},
	"/portfolio-carousel/museum-city-new-york/05.webp": {
		fromScale: 1.042,
		toScale: 1.09,
		fromX: -1.08,
		toX: 1.08,
		fromY: -.42,
		toY: .42
	},
	"/project-galleries/wheat-thins-popped/03.webp": {
		fromScale: 1.036,
		toScale: 1.072,
		fromX: -.48,
		toX: .48,
		fromY: -.6,
		toY: .6
	},
	"/project-galleries/beat-repeat/05.webp": {
		fromScale: 1.078,
		toScale: 1.042,
		fromX: -1.08,
		toX: 1.08,
		fromY: .24,
		toY: -.24
	},
	"/project-galleries/beat-repeat/overview-original.jpg": {
		fromScale: 1.042,
		toScale: 1.09,
		fromX: 1.08,
		toX: -1.08,
		fromY: -.36,
		toY: .36
	},
	"/project-galleries/china-institute/completed-gallery-front.jpg": {
		fromScale: 1.096,
		toScale: 1.042,
		fromX: .9,
		toX: -.9,
		fromY: .42,
		toY: -.42
	},
	"/project-galleries/jadu-beta/01.webp": {
		fromScale: 1.042,
		toScale: 1.078,
		fromX: -1.08,
		toX: 1.08,
		fromY: .12,
		toY: -.12
	},
	"/portfolio-carousel/david-bowie/01.webp": {
		fromScale: 1.09,
		toScale: 1.042,
		fromX: 1.14,
		toX: -1.14,
		fromY: .3,
		toY: -.3
	},
	"/project-galleries/hyatt-photo-booth/01.webp": {
		fromScale: 1.025,
		toScale: 1.05,
		fromX: -.25,
		toX: .25,
		fromY: 0,
		toY: .2
	},
	"/project-galleries/best-of-all-possible-worlds/01.webp": {
		fromScale: 1.042,
		toScale: 1.09,
		fromX: -.78,
		toX: .78,
		fromY: -.3,
		toY: .3
	},
	"/project-galleries/m-is-for-museum/01.webp": {
		fromScale: 1.09,
		toScale: 1.042,
		fromX: 1.08,
		toX: -1.08,
		fromY: .36,
		toY: -.36
	},
	"/portfolio-carousel/noguchi-museum/01.webp": {
		fromScale: 1.042,
		toScale: 1.09,
		fromX: 1.08,
		toX: -1.08,
		fromY: -.24,
		toY: .24
	},
	"/project-galleries/2012-us-olympics/02.webp": {
		fromScale: 1.09,
		toScale: 1.042,
		fromX: -1.08,
		toX: 1.08,
		fromY: .36,
		toY: -.36
	},
	"/project-galleries/coney-island-carousel-museum/01.png": {
		fromScale: 1.042,
		toScale: 1.09,
		fromX: -.9,
		toX: .9,
		fromY: -.6,
		toY: .6
	},
	"/project-galleries/holocaust-by-bullets/01.webp": {
		fromScale: 1.096,
		toScale: 1.042,
		fromX: 1.14,
		toX: -1.14,
		fromY: .3,
		toY: -.3
	},
	"/project-galleries/tumi/01.webp": {
		fromScale: 1.042,
		toScale: 1.09,
		fromX: -.48,
		toX: .48,
		fromY: -.48,
		toY: .48
	},
	"/project-galleries/bldg-92/04.webp": {
		fromScale: 1.09,
		toScale: 1.042,
		fromX: -1.32,
		toX: 1.32,
		fromY: .3,
		toY: -.3
	},
	"/portfolio-carousel/nike/01.webp": {
		fromScale: 1.042,
		toScale: 1.09,
		fromX: .78,
		toX: -.78,
		fromY: -.24,
		toY: .24
	},
	"/project-galleries/heliogram-series/01.jpg": {
		fromScale: 1.035,
		toScale: 1.02,
		fromX: -.1,
		toX: .1,
		fromY: .1,
		toY: -.1
	},
	"/project-galleries/dream-machine/01.webp": {
		fromScale: 1.096,
		toScale: 1.042,
		fromX: .6,
		toX: -.6,
		fromY: .48,
		toY: -.48
	},
	"/project-galleries/ascend/03.webp": {
		fromScale: 1.042,
		toScale: 1.096,
		fromX: -.78,
		toX: .78,
		fromY: -.6,
		toY: .6
	},
	"/project-galleries/dream-machine/02.webp": {
		fromScale: 1.055,
		toScale: 1.025,
		fromX: .3,
		toX: -.3,
		fromY: .2,
		toY: -.2
	}
};
/** Existing art-directed moves survive reordering; other approved gallery images
* receive a restrained source-keyed push/pull without changing their still crop. */
function photographMotionTransform(src, elapsedMs, framingScale = 1, motionProfile) {
	const direction = [...src].reduce((sum, character) => sum + character.charCodeAt(0), 0) % 2 ? 1 : -1;
	const move = src === "/project-galleries/brooklyn-museum/02.webp" ? {
		fromScale: 1.02,
		toScale: 1,
		fromX: 0,
		toX: 0,
		fromY: 0,
		toY: 0
	} : motionProfile === "home-dynamic" ? src === "/project-galleries/brooklyn-museum/01.webp" ? {
		fromScale: 1.08,
		toScale: 1.55,
		fromX: -2,
		toX: -23,
		fromY: -1,
		toY: -14
	} : direction > 0 ? {
		fromScale: 1.035,
		toScale: 1.14,
		fromX: .8,
		toX: -3,
		fromY: 0,
		toY: -.6
	} : {
		fromScale: 1.14,
		toScale: 1.035,
		fromX: -3,
		toX: .8,
		fromY: -.6,
		toY: 0
	} : LANDING_MOTION[src] ?? {
		fromScale: direction > 0 ? 1.042 : 1.078,
		toScale: direction > 0 ? 1.078 : 1.042,
		fromX: -.4 * direction,
		toX: .4 * direction,
		fromY: -.25,
		toY: .25
	};
	const progress = Math.max(0, Math.min(1, elapsedMs / (LANDING_HOLD_MS + LANDING_DISSOLVE_MS)));
	const eased = progress * progress * (3 - 2 * progress);
	const scale = move.fromScale + (move.toScale - move.fromScale) * eased;
	const x = move.fromX + (move.toX - move.fromX) * eased;
	const y = move.fromY + (move.toY - move.fromY) * eased;
	const relativeScale = framingScale > 1 ? 1 + Math.min(.02, Math.max(0, scale - 1.02)) / framingScale : scale;
	const relativeX = framingScale > 1 ? Math.max(-.2, Math.min(.2, x * (.2 / .35))) / framingScale : x;
	const relativeY = framingScale > 1 ? Math.max(-.15, Math.min(.15, y)) / framingScale : y;
	return `translate3d(${relativeX.toFixed(4)}%, ${relativeY.toFixed(4)}%, 0) scale(${relativeScale.toFixed(5)})`;
}
//#endregion
//#region app/landing-reel.tsx
function LandingReel({ presentation = "entrance", captions = [], photographs = landingPhotographs, announcement = false, unmasked = false, controls = false, entry, videoIntro = false, playOnSelect = false, videos = HOME_VIDEO_SEQUENCE, videoIntroCount = videos.length, mediaOrder, captionLinks = true, imageLinks = false, showCaptionDetails = false, showCaptionYear = false, simpleCaption = false, showProjectScope = false, photoHoldMs = LANDING_HOLD_MS } = {}) {
	const videoCount = Math.max(1, Math.min(videoIntroCount, videos.length));
	const [index, setIndex] = (0, import_react.useState)(mediaOrder?.[0]?.kind === "photo" ? mediaOrder[0].index : 0);
	const [videoIndex, setVideoIndex] = (0, import_react.useState)(videoIntro ? mediaOrder?.[0]?.kind === "photo" ? null : mediaOrder?.[0]?.index ?? 0 : null);
	const videoPosition = (0, import_react.useRef)(videoIndex);
	videoPosition.current = videoIndex;
	const showingVideo = videoIndex !== null;
	const [videoFinished, setVideoFinished] = (0, import_react.useState)(false);
	const [videoNavigation, setVideoNavigation] = (0, import_react.useState)(null);
	const [videoFailure, setVideoFailure] = (0, import_react.useState)("");
	const [videoPlayRequest, setVideoPlayRequest] = (0, import_react.useState)(0);
	const videoGesture = (0, import_react.useRef)(null);
	const videoRunning = (0, import_react.useRef)(false);
	const reportVideoRunning = (0, import_react.useRef)((value) => {
		videoRunning.current = value;
	}).current;
	const [muted, setMuted] = (0, import_react.useState)(true);
	const [soundAvailable, setSoundAvailable] = (0, import_react.useState)(false);
	const soundFromGestureRef = (0, import_react.useRef)(null);
	const transitionWait = (0, import_react.useRef)(0);
	const stage = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		stage.current?.closest(".landing-page")?.style.setProperty("--landing-enter-color", photographs[index]?.enterColor ?? "#ccc");
	}, [index]);
	const [previous, setPrevious] = (0, import_react.useState)(null);
	const [canAnimate, setCanAnimate] = (0, import_react.useState)(false);
	const [preferencesReady, setPreferencesReady] = (0, import_react.useState)(false);
	const entryReady = (0, import_react.useRef)(false);
	const entryElapsed = (0, import_react.useRef)(0);
	const [entryTimeReached, setEntryTimeReached] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (index >= 2 && (unmasked || photoHoldMs >= 1e4 || entryTimeReached)) entryReady.current = true;
		stage.current?.closest(".landing-page")?.style.setProperty("--landing-hint-animation", !canAnimate ? "landing-hint-reveal 10s step-end both" : entryReady.current ? "landing-hint-repeat 40s ease-in-out infinite" : "none");
	}, [
		index,
		canAnimate,
		photoHoldMs,
		entryTimeReached,
		unmasked
	]);
	const [visible, setVisible] = (0, import_react.useState)(true);
	const [online, setOnline] = (0, import_react.useState)(true);
	const [paused, setPaused] = (0, import_react.useState)(false);
	const [captionFocused, setCaptionFocused] = (0, import_react.useState)(false);
	const captionHasFocus = (0, import_react.useRef)(false);
	const focusCaption = () => {
		captionHasFocus.current = true;
		setCaptionFocused(true);
		setPrevious(null);
	};
	const blurCaption = () => {
		captionHasFocus.current = false;
		setCaptionFocused(false);
	};
	const pointerStopped = (0, import_react.useRef)(null);
	const [advanceRequested, setAdvanceRequested] = (0, import_react.useState)(false);
	const [manualDirection, setManualDirection] = (0, import_react.useState)(1);
	const pendingDirection = (0, import_react.useRef)(null);
	const requestGeneration = (0, import_react.useRef)(0);
	const [failed, setFailed] = (0, import_react.useState)([]);
	const decoded = (0, import_react.useRef)(/* @__PURE__ */ new WeakSet());
	const imageNodes = (0, import_react.useRef)(/* @__PURE__ */ new Map());
	const elapsed = (0, import_react.useRef)(0);
	const motionElapsed = (0, import_react.useRef)(/* @__PURE__ */ new Map());
	const mounted = (0, import_react.useRef)(true);
	const [inView, setInView] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!stage.current) return;
		if (typeof IntersectionObserver === "undefined") {
			const measure = () => {
				const rect = stage.current?.getBoundingClientRect();
				setInView(!!rect && rect.bottom > 0 && rect.top < innerHeight && rect.right > 0 && rect.left < innerWidth);
			};
			measure();
			window.addEventListener("scroll", measure, { passive: true });
			window.addEventListener("resize", measure);
			return () => {
				window.removeEventListener("scroll", measure);
				window.removeEventListener("resize", measure);
			};
		}
		const observer = new IntersectionObserver((entries) => {
			const entry = entries[entries.length - 1];
			if (entry) setInView(entry.isIntersecting);
		}, { threshold: 0 });
		observer.observe(stage.current);
		return () => observer.disconnect();
	}, [presentation, videoIntro]);
	const stopped = paused || Boolean(videoFailure);
	const playing = canAnimate && visible && online && !stopped && !captionFocused && inView;
	(0, import_react.useEffect)(() => {
		stage.current?.closest(".landing-page")?.style.setProperty("--landing-entry-play-state", (announcement ? playing : visible && !paused) ? "running" : "paused");
	}, [
		visible,
		paused,
		announcement,
		playing
	]);
	const recovering = !showingVideo && failed.includes(index);
	const automaticRecovery = recovering && !captionFocused && (!videoIntro || playing);
	const adjacentPhotograph = (direction, includeLead = false) => Array.from({ length: Math.max(0, photographs.length - 1) }, (_, offset) => (index + direction * (offset + 1) + photographs.length) % photographs.length).find((candidate) => (includeLead || !announcement || videoIntro || candidate !== 0) && !failed.includes(candidate));
	const orderedAdjacent = (direction) => {
		if (!mediaOrder?.length) return void 0;
		const current = mediaOrder.findIndex((item) => item.kind === (showingVideo ? "video" : "photo") && item.index === (showingVideo ? videoIndex : index));
		for (let offset = 1; offset <= mediaOrder.length; offset++) {
			const item = mediaOrder[(current + direction * offset + mediaOrder.length) % mediaOrder.length];
			if (item.kind === "video" || !failed.includes(item.index)) return item;
		}
	};
	const orderedNext = orderedAdjacent(controls && advanceRequested ? manualDirection : 1);
	const next = mediaOrder ? orderedNext?.kind === "photo" ? orderedNext.index : orderedNext ? index : void 0 : adjacentPhotograph(controls && advanceRequested ? manualDirection : 1, controls && advanceRequested);
	const manualPrevious = mediaOrder ? orderedAdjacent(-1)?.index : adjacentPhotograph(-1, true);
	const manualNext = mediaOrder ? orderedAdjacent(1)?.index : adjacentPhotograph(1, true);
	const manualCrossesVideo = !mediaOrder && videoIntro && !showingVideo && advanceRequested && (next === void 0 || (manualDirection === 1 ? next <= index : next >= index));
	const transitionPhotograph = showingVideo && videoNavigation?.position === null ? mediaOrder ? !failed.includes(videoNavigation.photoIndex) ? videoNavigation.photoIndex : void 0 : Array.from({ length: photographs.length }, (_, offset) => (videoNavigation.photoIndex + (videoNavigation.direction ?? 1) * offset + photographs.length) % photographs.length).find((candidate) => !failed.includes(candidate)) : void 0;
	const prepareVideoPhoto = transitionPhotograph !== void 0 && visible && online && inView && (!videoNavigation?.automatic || playing);
	const prepareNext = !showingVideo && orderedNext?.kind !== "video" && !manualCrossesVideo && visible && online && inView && (playing || automaticRecovery || advanceRequested) && previous === null;
	const changeVideoPosition = (position, photoIndex = 0) => {
		videoPosition.current = position;
		setVideoIndex(position);
		setVideoFinished(false);
		setVideoNavigation(null);
		requestGeneration.current += 1;
		pendingDirection.current = null;
		setAdvanceRequested(false);
		setPrevious(null);
		elapsed.current = 0;
		transitionWait.current = 0;
		if (position === null) setIndex(photoIndex);
	};
	(0, import_react.useEffect)(() => {
		if (!showingVideo || !videoFinished || videoNavigation || !playing || captionHasFocus.current) return;
		if (mediaOrder) {
			const target = orderedAdjacent(1);
			if (!target) return;
			if (target.kind === "video") changeVideoPosition(target.index);
			else setVideoNavigation({
				position: null,
				photoIndex: target.index,
				direction: 1,
				automatic: true
			});
		} else if (videoIndex + 1 < videoCount) changeVideoPosition(videoIndex + 1);
		else setVideoNavigation({
			position: null,
			photoIndex: 0,
			direction: 1,
			automatic: true
		});
	}, [
		videoIndex,
		videoFinished,
		videoNavigation,
		playing,
		showingVideo
	]);
	(0, import_react.useEffect)(() => {
		if (!videoNavigation || videoNavigation.automatic && !playing || showingVideo && videoNavigation.position === null || captionHasFocus.current || !visible || !online || !inView) return;
		changeVideoPosition(videoNavigation.position, videoNavigation.photoIndex);
	}, [
		videoNavigation,
		captionFocused,
		visible,
		online,
		inView,
		showingVideo,
		playing
	]);
	(0, import_react.useEffect)(() => {
		if (!manualCrossesVideo) return;
		requestGeneration.current += 1;
		setAdvanceRequested(false);
		pendingDirection.current = null;
		setVideoNavigation({
			position: manualDirection === 1 ? 0 : videoCount - 1,
			photoIndex: 0
		});
	}, [manualCrossesVideo, manualDirection]);
	(0, import_react.useEffect)(() => {
		if (!showingVideo || videoNavigation?.position !== null || !prepareVideoPhoto || captionFocused || transitionPhotograph === void 0) return;
		const generation = requestGeneration.current;
		let frame, last = performance.now();
		const tick = (now) => {
			if (captionHasFocus.current || generation !== requestGeneration.current) return;
			const delta = now - last;
			last = now;
			const image = imageNodes.current.get(transitionPhotograph);
			if (image && decoded.current.has(image)) {
				changeVideoPosition(null, transitionPhotograph);
				return;
			}
			if (!document.hidden && navigator.onLine && delta >= 0 && delta < 1e3) transitionWait.current += delta;
			if (transitionWait.current >= 15e3) {
				setFailed((items) => items.includes(transitionPhotograph) ? items : [...items, transitionPhotograph]);
				setVideoNavigation(null);
				setVideoFailure("Photograph loading paused. Use Next item to try another photograph, or Previous item to return to films.");
				return;
			}
			frame = requestAnimationFrame(tick);
		};
		frame = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(frame);
	}, [
		showingVideo,
		videoNavigation,
		prepareVideoPhoto,
		captionFocused,
		transitionPhotograph
	]);
	(0, import_react.useEffect)(() => {
		if (!showingVideo || videoNavigation?.position !== null || transitionPhotograph !== void 0) return;
		setVideoFailure("No photographs could be loaded. Previous item can revisit the films; project details remain available.");
	}, [
		showingVideo,
		videoNavigation,
		transitionPhotograph
	]);
	const requestPhotograph = (direction) => {
		if (mediaOrder && videoIntro && online) {
			const target = orderedAdjacent(direction);
			if (!target) return;
			if (showingVideo || target.kind === "video") {
				setVideoFailure("");
				requestGeneration.current += 1;
				transitionWait.current = 0;
				setAdvanceRequested(false);
				pendingDirection.current = null;
				setVideoNavigation({
					position: target.kind === "video" ? target.index : null,
					photoIndex: target.kind === "photo" ? target.index : 0,
					direction
				});
				return;
			}
		}
		if (!mediaOrder && videoIntro && online) {
			if (showingVideo) {
				setVideoFailure("");
				requestGeneration.current += 1;
				transitionWait.current = 0;
				setAdvanceRequested(false);
				pendingDirection.current = null;
				const destination = videoIndex + direction;
				setVideoNavigation({
					position: destination < 0 || destination >= videoCount ? null : destination,
					photoIndex: destination < 0 ? photographs.length - 1 : 0,
					direction
				});
				return;
			}
			const target = direction === -1 ? manualPrevious : manualNext;
			if (target === void 0 || (direction === -1 ? target >= index : target <= index)) {
				setVideoFailure("");
				requestGeneration.current += 1;
				transitionWait.current = 0;
				setAdvanceRequested(false);
				pendingDirection.current = null;
				setVideoNavigation({
					position: direction === -1 ? videoCount - 1 : 0,
					photoIndex: 0
				});
				return;
			}
		}
		if (showingVideo || !online) return;
		if (videoIntro && videoNavigation) {
			setVideoNavigation(null);
			pendingDirection.current = null;
		}
		if (pendingDirection.current === direction || (direction === -1 ? manualPrevious : manualNext) === void 0) return;
		pendingDirection.current = direction;
		requestGeneration.current += 1;
		setManualDirection(direction);
		setVideoFailure("");
		setPrevious(null);
		setAdvanceRequested(true);
	};
	(0, import_react.useEffect)(() => {
		mounted.current = true;
		return () => {
			mounted.current = false;
		};
	}, []);
	(0, import_react.useEffect)(() => {
		const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
		const data = window.matchMedia("(prefers-reduced-data: reduce)");
		const connection = navigator.connection;
		const update = () => {
			setCanAnimate(!motion.matches && !data.matches && !connection?.saveData);
			setPreferencesReady(true);
		};
		const visibility = () => setVisible(!document.hidden);
		const connectivity = () => setOnline(navigator.onLine);
		update();
		visibility();
		connectivity();
		motion.addEventListener("change", update);
		data.addEventListener("change", update);
		connection?.addEventListener("change", update);
		document.addEventListener("visibilitychange", visibility);
		window.addEventListener("online", connectivity);
		window.addEventListener("offline", connectivity);
		return () => {
			motion.removeEventListener("change", update);
			data.removeEventListener("change", update);
			connection?.removeEventListener("change", update);
			document.removeEventListener("visibilitychange", visibility);
			window.removeEventListener("online", connectivity);
			window.removeEventListener("offline", connectivity);
		};
	}, []);
	(0, import_react.useEffect)(() => {
		const keyboard = (event) => {
			if (event.repeat || event.altKey || event.ctrlKey || event.metaKey) return;
			if (!(event.target instanceof HTMLElement) || !event.target.closest(".landing-enter")) return;
			if (event.code === "Space") {
				event.preventDefault();
				setPaused(!stopped);
				if (stopped) setVideoFailure("");
				if (announcement) setPrevious(null);
			} else if (announcement && event.code === "ArrowRight") {
				event.preventDefault();
				if (next === void 0 || advanceRequested || !online) return;
				requestPhotograph(1);
			}
		};
		window.addEventListener("keydown", keyboard);
		return () => window.removeEventListener("keydown", keyboard);
	}, [
		announcement,
		next,
		advanceRequested,
		online,
		stopped
	]);
	(0, import_react.useEffect)(() => {
		if (showingVideo || manualCrossesVideo || captionFocused || !visible || !online || !inView || !automaticRecovery && !playing && !advanceRequested || next === void 0) return;
		const generation = requestGeneration.current;
		let frame;
		let last = performance.now();
		const tick = (now) => {
			if (videoPosition.current !== null || captionHasFocus.current || generation !== requestGeneration.current) return;
			const delta = now - last;
			last = now;
			const currentImage = imageNodes.current.get(index);
			const nextImage = imageNodes.current.get(next);
			if (!document.hidden && delta < 1e3 && currentImage && decoded.current.has(currentImage)) {
				elapsed.current += delta;
				if (playing && !unmasked && !entryReady.current && photoHoldMs < 1e4) {
					entryElapsed.current += delta;
					if (entryElapsed.current >= 2e4) setEntryTimeReached(true);
				}
				if (playing) for (const photoIndex of previous === null ? [index] : [index, previous]) {
					const image = imageNodes.current.get(photoIndex);
					if (!image || !decoded.current.has(image)) continue;
					const duration = Math.min(photoHoldMs + LANDING_DISSOLVE_MS, (motionElapsed.current.get(photoIndex) ?? 0) + delta);
					motionElapsed.current.set(photoIndex, duration);
					image.style.setProperty("--landing-motion-transform", photographMotionTransform(photographs[photoIndex].src, duration * (LANDING_HOLD_MS + LANDING_DISSOLVE_MS) / (photoHoldMs + LANDING_DISSOLVE_MS), photographs[photoIndex].framingScale, photographs[photoIndex].motionProfile));
				}
			}
			if (mediaOrder && orderedNext?.kind === "video" && previous === null && (recovering || advanceRequested || elapsed.current >= photoHoldMs)) {
				setVideoNavigation({
					position: orderedNext.index,
					photoIndex: 0,
					automatic: !advanceRequested
				});
				return;
			}
			if (previous === null && nextImage && decoded.current.has(nextImage) && (recovering || advanceRequested || elapsed.current >= photoHoldMs)) {
				elapsed.current = 0;
				motionElapsed.current.set(next, 0);
				setPrevious(recovering || advanceRequested || !canAnimate || paused ? null : index);
				pendingDirection.current = null;
				setAdvanceRequested(false);
				setIndex(next);
				return;
			}
			frame = requestAnimationFrame(tick);
		};
		frame = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(frame);
	}, [
		index,
		next,
		previous,
		recovering,
		automaticRecovery,
		playing,
		visible,
		online,
		inView,
		advanceRequested,
		manualDirection,
		canAnimate,
		paused,
		captionFocused,
		showingVideo,
		manualCrossesVideo,
		photoHoldMs,
		unmasked
	]);
	(0, import_react.useEffect)(() => {
		motionElapsed.current.clear();
		if (!canAnimate) setPrevious(null);
	}, [canAnimate]);
	const markFailed = (photoIndex) => {
		setFailed((items) => items.includes(photoIndex) ? items : [...items, photoIndex]);
		if (photoIndex === index && previous !== null) {
			elapsed.current = 0;
			if (!captionHasFocus.current) setIndex(previous);
			setPrevious(null);
		}
	};
	const markDecoded = async (image, photoIndex) => {
		if (decoded.current.has(image)) return;
		try {
			await image.decode();
			if (!mounted.current || imageNodes.current.get(photoIndex) !== image) return;
			if (!image.naturalWidth) {
				markFailed(photoIndex);
				return;
			}
			decoded.current.add(image);
		} catch {
			if (mounted.current && imageNodes.current.get(photoIndex) === image) markFailed(photoIndex);
		}
	};
	const photograph = (photoIndex, role = "current") => {
		const photo = photographs[photoIndex];
		if (!photo) return null;
		const hidden = role !== "current";
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			className: `landing-reel-photo${photo.torsoCloseup ? " landing-reel-photo--torso" : ""}${role === "outgoing" ? " is-outgoing" : role === "buffering" ? " is-buffering" : previous !== null && canAnimate ? " is-arriving" : ""}`,
			"data-photo-index": photoIndex,
			"data-photo-src": photo.src,
			"data-orientation": photo.height > photo.width ? "portrait" : "landscape",
			"data-desktop-fit": photo.width >= 900 && photo.width / photo.height >= 1.4 && photo.width / photo.height <= 1.85 && !photo.torsoCloseup ? "cover" : "contain",
			src: photo.src,
			width: photo.width,
			height: photo.height,
			alt: hidden ? "" : photo.alt,
			"aria-hidden": hidden || void 0,
			loading: presentation === "entrance" || inView ? "eager" : "lazy",
			fetchPriority: presentation === "entrance" && photoIndex === 0 && !hidden ? "high" : hidden ? "low" : "auto",
			decoding: "async",
			style: {
				"--portrait-position": photo.portraitPosition,
				"--landing-framing-transform": `translate3d(${photo.framingX}%, ${photo.framingY}%, 0) scale(${photo.framingScale})`,
				"--landing-motion-transform": canAnimate ? photographMotionTransform(photo.src, 0, photo.framingScale, photo.motionProfile) : "scale(1)"
			},
			draggable: false,
			ref: (image) => {
				if (!image) {
					imageNodes.current.delete(photoIndex);
					return;
				}
				imageNodes.current.set(photoIndex, image);
				if (image.complete) if (image.naturalWidth > 0) markDecoded(image, photoIndex);
				else markFailed(photoIndex);
			},
			onLoad: (event) => {
				markDecoded(event.currentTarget, photoIndex);
			},
			onError: () => markFailed(photoIndex),
			onAnimationEnd: role === "current" ? (event) => {
				if (event.animationName === "landing-photo-arrive") setPrevious(null);
			} : void 0
		}, photoIndex);
	};
	const frames = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		showingVideo && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomeVideoSequence, {
			index: videoIndex,
			videos,
			active: playing,
			playRequest: videoPlayRequest,
			playFromGestureRef: videoGesture,
			muted,
			soundFromGestureRef,
			onMutedChange: setMuted,
			onSoundAvailableChange: setSoundAvailable,
			onRunningChange: reportVideoRunning,
			onComplete: () => {
				if (videoPosition.current === videoIndex) setVideoFinished(true);
			},
			onUnavailable: (message) => {
				if (videoPosition.current === videoIndex) setVideoFailure(message);
			}
		}, `film-${videoIndex}`),
		!showingVideo && previous !== null && photograph(previous, "outgoing"),
		!showingVideo && photograph(index),
		prepareNext && next !== void 0 && photograph(next, "buffering"),
		prepareVideoPhoto && transitionPhotograph !== void 0 && photograph(transitionPhotograph, "buffering")
	] });
	const filmCaption = showingVideo ? videos[videoIndex] : void 0;
	const filmLabel = filmCaption?.slug === "core-nyc" ? "Reel" : "Film";
	const caption = filmCaption ? {
		...filmCaption,
		date: captions.find((item) => item.href === filmCaption.href)?.date ?? filmCaption.date,
		services: captions.find((item) => item.href === filmCaption.href)?.services ?? filmCaption.services
	} : captions[index];
	const CaptionContainer = captionLinks ? "a" : "div";
	const captionBody = (item, projectNavigation) => {
		const photographer = photographerName(item.photoCredit);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [projectNavigation && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "project-title-static",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectTitle, { title: item.title })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "home-project-meta",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandText, { children: item.client }), projectCaptionYear(item.date) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [" · ", projectCaptionYear(item.date)] })]
			}),
			item.services && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "home-project-services",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandText, { children: item.services })
			})
		] }), photographer && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "news-carousel-credit",
			children: photographer
		})] });
	};
	const layoutCaptions = videoIntro ? [...captions, ...videos.slice(0, videoCount).map((video) => ({
		...video,
		date: captions.find((item) => item.href === video.href)?.date ?? video.date,
		services: captions.find((item) => item.href === video.href)?.services ?? video.services
	}))] : captions;
	const playbackLabel = `${videoIntro ? "films" : ""}${videoIntro && photographs.length ? ", " : ""}${photographs.length ? "photographs" : ""}${announcement ? " and announcement" : ""}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"data-reel-fullscreen": presentation === "home" ? "" : void 0,
		className: `landing-reel${presentation === "home" ? " home-photo-reel" : ""}${controls ? " home-project-reel" : ""}`,
		"aria-label": videoIntro ? photographs.length ? "field trip project films and photographs" : "field trip project films" : "field trip project photographs",
		"data-playing": playing,
		style: { "--landing-dissolve-ms": `${LANDING_DISSOLVE_MS}ms` },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				ref: stage,
				className: `landing-reel-stage${unmasked ? " opening-photo-stage" : ""}`,
				onPointerEnter: (event) => {
					if (event.pointerType !== "mouse" || event.buttons || !showingVideo || !canAnimate || !visible || !online || !inView || captionFocused || !muted || videoRunning.current || paused) return;
					setVideoFailure("");
					setVideoPlayRequest((value) => value + 1);
				},
				children: [presentation === "home" && imageLinks && captionLinks && caption && !showingVideo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					className: "home-reel-project-link",
					href: caption.href,
					"aria-label": `View ${caption.title} project`,
					onFocus: focusCaption,
					onBlur: blurCaption,
					children: frames
				}) : presentation === "home" || unmasked ? frames : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingMask, { children: frames }), presentation === "home" && !controls && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "home-reel-toggle",
					"aria-keyshortcuts": "ArrowRight",
					onKeyDown: (event) => {
						if (event.key !== "ArrowRight" || event.repeat) return;
						event.preventDefault();
						if (next === void 0 || previous !== null && !stopped || advanceRequested || !online) return;
						requestPhotograph(1);
					},
					onPointerDown: () => {
						pointerStopped.current = stopped;
					},
					onClick: (event) => {
						if (!canAnimate) return;
						const wasStopped = event.detail > 0 ? pointerStopped.current ?? stopped : stopped;
						pointerStopped.current = null;
						setPaused(!wasStopped);
						if (!wasStopped) setPrevious(null);
						if (wasStopped) setVideoFailure("");
					},
					"aria-pressed": stopped,
					"aria-label": !canAnimate ? "Project photographs. Right Arrow for next photograph." : stopped ? "Resume project photographs. Right Arrow for next photograph." : "Pause project photographs. Right Arrow for next photograph."
				})]
			}),
			controls && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "home-reel-controls",
				role: "group",
				"aria-label": videoIntro ? "Project media controls" : "Project photograph controls",
				onKeyDown: (event) => {
					if (event.repeat || event.altKey || event.ctrlKey || event.metaKey || event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
					event.preventDefault();
					requestPhotograph(event.key === "ArrowLeft" ? -1 : 1);
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": videoIntro ? "Previous item" : "Previous photograph",
						"aria-keyshortcuts": "ArrowLeft",
						"aria-disabled": !videoIntro && manualPrevious === void 0 || advanceRequested && manualDirection === -1 || !online,
						onClick: () => requestPhotograph(-1),
						children: "←"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "home-reel-play-pause",
						onPointerDown: () => {
							pointerStopped.current = stopped;
						},
						onClick: (event) => {
							if (!canAnimate) return;
							const wasStopped = event.detail > 0 ? pointerStopped.current ?? stopped : stopped;
							pointerStopped.current = null;
							setPaused(!wasStopped);
							setPrevious(null);
							if (wasStopped) {
								setVideoFailure("");
								if (showingVideo) {
									setVideoPlayRequest((value) => value + 1);
									if (visible && online && inView && !captionHasFocus.current) videoGesture.current?.();
								}
							}
						},
						"aria-disabled": !canAnimate,
						"aria-pressed": stopped,
						"aria-label": !canAnimate ? "Animation reduced by your preferences" : stopped ? `Play animation: ${playbackLabel}` : `Pause animation: ${playbackLabel}`,
						children: !canAnimate ? "Motion reduced" : stopped ? "Play" : "Pause"
					}),
					showingVideo && soundAvailable && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "film-sound-toggle",
						"aria-label": muted ? `Turn ${filmLabel.toLowerCase()} sound on` : `Mute ${filmLabel.toLowerCase()} sound`,
						"aria-pressed": !muted,
						onClick: () => {
							const nextMuted = !muted;
							setMuted(nextMuted);
							soundFromGestureRef.current?.(nextMuted);
						},
						children: muted ? "Sound off" : "Sound on"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": videoIntro ? "Next item" : "Next photograph",
						"aria-keyshortcuts": "ArrowRight",
						"aria-disabled": !videoIntro && manualNext === void 0 || advanceRequested && manualDirection === 1 || !online,
						onClick: () => requestPhotograph(1),
						children: "→"
					}),
					presentation === "home" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReelFullscreenButton, {})
				]
			}),
			presentation === "home" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "home-reel-caption",
				"data-photographer-only": !videoIntro || void 0,
				children: [caption && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CaptionContainer, {
					className: "home-reel-caption-current",
					href: captionLinks ? caption.href : void 0,
					"aria-live": playing ? "off" : "polite",
					"aria-atomic": true,
					"aria-label": !showingVideo && captionLinks ? `View ${caption.title} project` : void 0,
					onFocus: captionLinks ? focusCaption : void 0,
					onBlur: captionLinks ? blurCaption : void 0,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "sr-only",
							children: showingVideo ? `${filmLabel} ${videoIndex + 1} of ${videoCount}. ` : `Photograph ${index + 1} of ${photographs.length}. `
						}),
						captionBody(caption, showingVideo),
						showCaptionDetails && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "news-carousel-position",
							"aria-hidden": "true",
							children: [
								String((showingVideo ? videoIndex : index) + 1).padStart(2, "0"),
								" / ",
								String(showingVideo ? videoCount : photographs.length).padStart(2, "0")
							]
						})
					]
				}), layoutCaptions.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "home-reel-caption-reserve",
					"aria-hidden": "true",
					inert: true,
					children: layoutCaptions.map((item, captionIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: captionBody(item, videoIntro && captionIndex >= captions.length) }, `${item.href}-${captionIndex}`))
				})]
			}),
			videoIntro && /[Pp]hotograph/.test(videoFailure) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "home-video-status",
				role: "status",
				"aria-live": "polite",
				"aria-atomic": true,
				children: videoFailure
			}),
			entry && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "opening-entry",
				children: entry
			}),
			announcement && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OpeningAnnouncement, {
					staticMode: presentation === "home",
					playing: canAnimate && visible && online && !stopped && !captionFocused,
					reducedMotion: preferencesReady && !canAnimate
				}),
				photographs[index] && !(controls && presentation === "home" && caption) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "sr-only",
					"aria-live": playing ? "off" : "polite",
					"aria-atomic": true,
					children: `Photograph ${index + 1} of ${photographs.length}. ${photographs[index].alt}`
				}),
				!controls && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "opening-photo-controls",
					"aria-label": "Opening photograph controls",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onPointerDown: () => {
							pointerStopped.current = stopped;
						},
						onClick: (event) => {
							if (!canAnimate) return;
							const wasStopped = event.detail > 0 ? pointerStopped.current ?? stopped : stopped;
							pointerStopped.current = null;
							setPaused(!wasStopped);
							setPrevious(null);
							if (wasStopped) setVideoFailure("");
						},
						"aria-disabled": !canAnimate,
						"aria-pressed": stopped,
						"aria-label": !canAnimate ? "Animation reduced by your preferences" : stopped ? "Play animation: photographs and announcement" : "Pause animation: photographs and announcement",
						children: !canAnimate ? "Motion reduced" : stopped ? "Play animation" : "Pause animation"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => {
							if (next === void 0 || advanceRequested || !online) return;
							requestPhotograph(1);
						},
						"aria-disabled": next === void 0 || advanceRequested || !online,
						children: "Next photograph"
					})]
				})
			] }),
			presentation === "home" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "sr-only",
				role: "status",
				"aria-live": "polite",
				"aria-atomic": true,
				children: recovering ? next === void 0 ? "No photographs could be loaded. Project details remain available." : controls ? "Photograph unavailable. Use the previous or next photograph buttons to try another." : "Photograph unavailable. Focus the photograph and press Right Arrow to try another." : ""
			})
		]
	});
}
//#endregion
export { LandingReel };
