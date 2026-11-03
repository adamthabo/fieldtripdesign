import { b as require_react, n as require_jsx_runtime, w as __toESM } from "../index.js";
import { a as projectFilms } from "./archive-vimeo-D6Ct3jdd.js";
import { i as orderProjects } from "./image-catalog-_cJHhi6C.js";
import { n as projectCaptionServices, r as projectCaptionYear } from "./project-caption-BvX_Quum.js";
import { n as HomeVideoSequence } from "./home-video-sequence-l1Sx6fpr.js";
import { t as ReelFullscreenButton } from "./reel-fullscreen-button-BatwXWGX.js";
import { t as BrandText } from "./field-trip-name-BKqnzu5g.js";
//#region app/project-awards.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var mcnyAwards = [
	{
		year: "2017",
		award: "AIA New York Design Awards",
		result: "Project Honor Award",
		href: "https://www.aiany.org/about/press-releases/aia-new-york-announces-2017-design-awards-winners/"
	},
	{
		year: "2017",
		award: "Architizer A+Awards",
		result: "Popular Choice Winner / Concepts: Architecture + Learning",
		href: "https://architizer.com/projects/new-york-at-its-core/"
	},
	{
		year: "2017",
		award: "Core77 Design Awards",
		result: "Notable / Built Environment",
		href: "https://designawards.core77.com/Built-Environment/64618/New-York-at-Its-Core.html"
	},
	{
		year: "2017",
		award: "NYCxDESIGN Awards",
		result: "Winner / Exhibition–Installation",
		href: "https://interiordesign.net/award/nycxdesign-award-winners-2017-2/"
	},
	{
		year: "2017",
		award: "AAM MUSE Awards",
		result: "Honorable Mention / Interpretive Interactive Installations",
		href: "https://www.aam-us.org/programs/awards-program/2017-muse-award-winners/"
	},
	{
		year: "2018",
		award: "AAM Excellence in Exhibition",
		result: "Overall Award Winner",
		href: "https://www.aam-us.org/programs/awards-program/current-recipients-of-excellence-in-exhibition-awards/"
	},
	{
		year: "2018",
		award: "AIA New York State Design Awards",
		result: "Institutional / Award of Citation",
		href: "https://www.aiany.org/news/aia-new-york-state-celebrates-design-excellence/"
	},
	{
		year: "2018",
		award: "American Architecture Awards",
		result: "Winner",
		href: "https://www.chi-athenaeum.org/june-11-2018.html"
	},
	{
		year: "2018",
		award: "GANYC Apple Awards",
		result: "Winner / Outstanding Achievement in NYC Museum Exhibitions",
		href: "https://www.ganyc.org/ganyc-apple-awards-winners"
	},
	{
		year: "2017",
		award: "SEGD Global Design Awards",
		result: "Finalist",
		href: "https://www.pentagram.com/work/new-york-at-its-core/story"
	}
];
[...mcnyAwards].sort((a, b) => Number(b.year) - Number(a.year));
//#endregion
//#region app/project-data.ts
var projects = [
	{
		"slug": "women-who-rock",
		"recordType": "predecessor",
		"title": "Women Who Rock: Vision, Passion, Power",
		"client": "Rock & Roll Hall of Fame",
		"location": "Cleveland, Ohio",
		"date": "2011",
		"scope": "Fabrication / Installation",
		"summary": "Fabrication and installation with South Side Design & Building for an exhibition designed by Pure + Applied.",
		"credits": [
			{
				"role": "Exhibition design",
				"name": "Pure + Applied"
			},
			{
				"role": "Fabrication / Installation",
				"name": "South Side Design & Building"
			},
			{ "name": "a. thabo w/ South Side Design & Building" }
		],
		"galleryCount": 6,
		"sources": [{
			"label": "Elkan & Levinsohn / project archive",
			"href": "https://www.elkanlevinsohn.com/projects/whomen-who-rock"
		}]
	},
	{
		"slug": "new-bamboo",
		"recordType": "predecessor",
		"title": "New Bamboo: Contemporary Japanese Masters",
		"client": "Japan Society",
		"location": "New York, New York",
		"date": "2008–2009",
		"scope": "Fabrication",
		"summary": "Exhibition fabrication with South Side Design & Building for New Bamboo at Japan Society, designed by Perry Hu.",
		"credits": [
			{
				"role": "Exhibition design",
				"name": "Perry Hu"
			},
			{
				"role": "Fabrication",
				"name": "South Side Design & Building"
			},
			{ "name": "a. thabo w/ South Side Design & Building" }
		],
		"galleryCount": 6,
		"sources": [{
			"label": "Elkan & Levinsohn / project archive",
			"href": "https://www.elkanlevinsohn.com/projects/project-three-8zgh7-8frkx-9a9dk-f3353-c76x9-zwswj-3pr8b-9cmgn"
		}, {
			"label": "Japan Society / exhibition",
			"href": "https://japansociety.org/events/new-bamboo-contemporary-japanese-masters/"
		}]
	},
	{
		"slug": "fox-studios-titanic",
		"recordType": "predecessor",
		"title": "The Titanic Experience",
		"client": "Fox Studios",
		"location": "Sydney, Australia",
		"date": "1999–2000",
		"scope": "Fabrication",
		"summary": "Carpentry and light metal fabrication with Performance Structures for the Titanic Experience at Fox Studios, Sydney.",
		"credits": [
			{
				"role": "Design",
				"name": "Technifex, Inc."
			},
			{
				"role": "Fabrication",
				"name": "Performance Structures, Inc."
			},
			{
				"role": "Carpentry / light metal fabrication",
				"name": "a. thabo, with Performance Structures"
			},
			{
				"role": "Lighting design",
				"name": "Lisa Passamonte Green"
			}
		],
		"galleryCount": 6,
		"sources": [{
			"label": "Elkan & Levinsohn / project archive",
			"href": "https://www.elkanlevinsohn.com/projects/project-three-8zgh7-8frkx-9a9dk-f3353-c76x9-zwswj"
		}, {
			"label": "Performance Structures / company history",
			"href": "https://www.performancestructures.com/about.html"
		}]
	},
	{
		slug: "hunt-for-paradise",
		recordType: "predecessor",
		title: "Hunt for Paradise: Court Arts of Iran, 1501–1576",
		client: "Asia Society",
		location: "New York, New York",
		date: "October 16, 2003–January 18, 2004",
		scope: "Fabrication / Installation",
		summary: "Exhibition design by Perry Hu. Fabrication and installation by South Side Design & Building.",
		credits: [
			{
				role: "Exhibition design",
				name: "Perry Hu"
			},
			{
				role: "Fabrication / Installation",
				name: "South Side Design & Building"
			},
			{
				role: "Images",
				name: "Perry Hu"
			}
		],
		galleryCount: 10,
		sources: [{
			label: "Asia Society / exhibition",
			href: "https://sites.asiasociety.org/huntforparadise/"
		}]
	},
	{
		slug: "central-governor",
		recordType: "field-trip",
		title: "Central Governor",
		client: "Saul Melman / MoMA PS1",
		location: "Long Island City, Queens, New York",
		date: "2010",
		scope: "Design / Fabrication / Installation",
		summary: "field trip provided design, fabrication and installation for Saul Melman’s Central Governor at MoMA PS1.",
		narrative: ["Melman worked directly with the existing machinery, cleaning its surfaces, carving a 5,000-pound salt block and applying gold leaf. The installation brings the building’s former heating system into view as part of its architectural history.", "The photographs show the metal apparatus and its base within the boiler room. Central Governor was originally presented alongside Aki Sasamoto’s performance and installation Skewed Lies."],
		details: [
			{
				label: "Venue",
				value: "MoMA PS1, basement boiler room"
			},
			{
				label: "First presented",
				value: "Greater New York, 2010"
			},
			{
				label: "Artwork materials",
				value: "Gold leaf, salt and saliva"
			}
		],
		credits: [
			{
				role: "Design / Fabrication / Installation",
				name: "field trip"
			},
			{
				role: "Artist",
				name: "Saul Melman"
			},
			{ name: "a. thabo" }
		],
		galleryCount: 2,
		sources: [
			{
				label: "MoMA PS1 / long-term artist interventions",
				href: "https://www.momaps1.org/en/programs/85-artist-interventions"
			},
			{
				label: "BOMB / Saul Melman interviewed by A. M. Homes",
				href: "https://bombmagazine.org/articles/2018/10/29/saul-melman/"
			},
			{
				label: "MoMA / Central Governor",
				href: "https://www.moma.org/slideshows/56/927"
			},
			{
				label: "MoMA / Greater New York installation record",
				href: "https://www.moma.org/calendar/exhibitions/3800"
			},
			{
				label: "The Brooklyn Rail / Shana Beth Mason, February 2015",
				href: "https://brooklynrail.org/2015/02/artseen/saul-melman-central-governor/"
			}
		]
	},
	{
		slug: "modigliani-beyond-the-myth",
		recordType: "predecessor",
		title: "Modigliani: Beyond the Myth",
		client: "The Jewish Museum",
		location: "New York, New York",
		date: "May 21–September 19, 2004",
		scope: "Fabrication, Installation",
		summary: "a. thabo worked on fabrication and installation for Modigliani: Beyond the Myth at The Jewish Museum with South Side Design & Building.",
		credits: [{
			role: "Fabrication and installation",
			name: "a. thabo w/ South Side Design & Building"
		}, {
			role: "Image source",
			name: "Imrey Studio / Imrey Culbert portfolio"
		}],
		details: [{
			label: "Exhibition dates",
			value: "May 21–September 19, 2004"
		}],
		galleryCount: 1,
		sources: [
			{
				label: "Imrey Studio / installation photograph",
				href: "https://www.imreystudio.com/projects/jewish-museum-modigliani.html"
			},
			{
				label: "The Jewish Museum / exhibition dates",
				href: "https://thejewishmuseum.org/exhibitions/modigliani-beyond-the-myth/"
			},
			{
				label: "South Side / fabrication and installation",
				href: "https://web.archive.org/web/20110219053220/http://southsidedb.com/?page_id=297"
			}
		]
	},
	{
		slug: "coney-island-carousel-museum",
		recordType: "predecessor",
		title: "Coney Island Carousel Museum",
		client: "B&B Carousell / Steeplechase Pavilion",
		location: "Coney Island, Brooklyn, New York",
		date: "2013",
		scope: "Design",
		summary: "Interpretive exhibition for the B&B Carousell at Steeplechase Pavilion, completed with South Side Design & Building.",
		credits: [{ name: "a. thabo w/ South Side Design & Building" }, {
			role: "Curation, design, fabrication and installation",
			name: "South Side Design & Building"
		}],
		details: [{
			label: "Site",
			value: "Steeplechase Pavilion, Coney Island"
		}, {
			label: "Project",
			value: "Carousel museum and interpretation"
		}],
		galleryCount: 1,
		sources: [{
			label: "South Side Design & Building",
			href: "https://web.archive.org/web/20160818111918/http://southsidedb.com/portfolio/bb-carousell-steeplechase-pavillion/"
		}]
	},
	{
		slug: "touro-loeb-visitors-center",
		recordType: "predecessor",
		title: "Touro Synagogue · Loeb Visitors Center",
		client: "Loeb Visitors Center",
		location: "Newport, Rhode Island",
		date: "Opened 2009",
		scope: "Fabrication, Installation",
		summary: "a. thabo worked on fabrication and installation for the Loeb Visitors Center with South Side Design & Building.",
		narrative: ["South Side was the primary exhibit contractor. Exhibition design is credited to Charles Mack Design Ltd."],
		credits: [
			{
				role: "Fabrication and installation",
				name: "a. thabo w/ South Side Design & Building"
			},
			{
				role: "Exhibit fabrication",
				name: "South Side Design & Building"
			},
			{
				role: "Exhibition design",
				name: "Charles Mack Design Ltd."
			},
			{
				role: "Railing fabrication",
				name: "South Side Design & Building"
			},
			{
				role: "Architect",
				name: "Northeast Collaborative Architects LLC"
			},
			{
				role: "General contractor",
				name: "H.V. Collins"
			},
			{
				role: "Image source",
				name: "South Side Design & Building, archived portfolio"
			}
		],
		details: [
			{
				label: "Exhibition work",
				value: "Custom displays and integrated media"
			},
			{
				label: "Architectural metalwork",
				value: "Curved nickel-silver grand-stair railing"
			},
			{
				label: "Recognition",
				value: "2011 North American Copper in Architecture Award / ornamental applications"
			}
		],
		galleryCount: 2,
		sources: [
			{
				label: "South Side Design & Building",
				href: "https://web.archive.org/web/20160818172325/http://southsidedb.com/portfolio/the-ambassador-john-l-loeb-vistiors-center/"
			},
			{
				label: "South Side interior gallery",
				href: "https://web.archive.org/web/20190202084041/https://www.southsidedb.com/touro-synogogue/"
			},
			{
				label: "Loeb Visitors Center",
				href: "https://www.loebvisitors.org/visit/"
			},
			{
				label: "2011 copper architecture awards",
				href: "https://www.buildingenclosureonline.com/articles/82914-sustainability-leads-the-way-for-2011-north-american-copper-in-architecture-awards"
			}
		]
	},
	{
		slug: "bronx-science-holocaust-museum",
		recordType: "collaboration",
		title: "Holocaust Museum and Study Center",
		client: "The Bronx High School of Science",
		location: "Bronx, New York",
		date: "Opened April 19, 2013",
		scope: "Fabrication, Installation",
		summary: "a. thabo worked on fabrication and installation for the Holocaust Museum and Study Center at Bronx Science with South Side Design & Building.",
		credits: [
			{
				role: "Fabrication and installation",
				name: "a. thabo w/ South Side Design & Building"
			},
			{
				role: "Exhibit design",
				name: "Robin Parkinson"
			},
			{
				role: "Architect",
				name: "Leo Blackman Architect"
			},
			{
				role: "Curatorial work",
				name: "Jill Vexler"
			},
			{
				role: "Photography",
				name: "Amy Beckerman"
			},
			{
				role: "Image source",
				name: "South Side Design & Building archive"
			}
		],
		galleryCount: 1,
		sources: [
			{
				label: "South Side Design & Building",
				href: "https://web.archive.org/web/20160609231034/http://southsidedb.com/portfolio/holocaust-museum-and-study-center/"
			},
			{
				label: "Bronx Science museum opening",
				href: "https://bxscience.edu/apps/news/show_news.jsp?REC_ID=270392&id=1"
			},
			{
				label: "Leo Blackman Architect",
				href: "https://leoblackmanarchitect.squarespace.com/bronx"
			}
		]
	},
	{
		slug: "heliogram-series",
		recordType: "collaboration",
		title: "Heliogram Series / Desert camera",
		client: "Saul Melman",
		location: "Joshua Tree, California",
		date: "2014 series",
		scope: "Engineering",
		summary: "Engineering support for Saul Melman’s desert pinhole-camera system.",
		narrative: ["Saul Melman transformed a room-sized structure in Joshua Tree into a pinhole camera, working with daylight and photographic paper to create the Heliogram Series."],
		credits: [
			{
				role: "Artist",
				name: "Saul Melman"
			},
			{
				role: "Engineering support",
				name: "Field Trip"
			},
			{
				role: "Heliogram Series_09 image",
				name: "Courtesy of the Milwaukee Art Museum, via BOMB"
			},
			{
				role: "2012 camera-process photographs",
				name: "BoxoHOUSE"
			}
		],
		galleryCount: 3,
		sources: [
			{
				label: "Artist’s Heliogram Series",
				href: "https://www.saulmelman.com/work/detail/ge/"
			},
			{
				label: "BOMB artist interview and artwork",
				href: "https://bombmagazine.org/articles/2018/10/29/saul-melman/"
			},
			{
				label: "BoxoHOUSE / camera construction",
				href: "https://boxoblog.blogspot.com/2012/07/saul-melman-untitled-work-in-progress.html"
			}
		]
	},
	{
		slug: "sacred-splendor",
		recordType: "field-trip",
		title: "Sacred Splendor",
		client: "Jewish Museum of New York",
		location: "New York, NY",
		date: "2026–2027",
		scope: "Fabrication",
		summary: "Field Trip fabricated a custom display case for a large textile in Sacred Splendor at Jewish Museum of New York. The aluminum-extrusion structure incorporates a dedicated desiccant chamber and security provisions within a conditioned display environment.",
		credits: [{
			role: "Exhibition design",
			name: "Leslie Gill Architect — Leslie Gill, Laura Lyon and Polina Stepanova"
		}, {
			role: "Installation photography",
			name: "Kris Graves / courtesy The Jewish Museum"
		}],
		details: [
			{
				label: "Exhibition",
				value: "Sacred Splendor: Jewish Ritual Art and Christian Treasures from St. Vitus Cathedral in Prague"
			},
			{
				label: "Currently on display",
				value: "September 18, 2026–February 7, 2027"
			},
			{
				label: "Field Trip scope",
				value: "Custom textile display case fabrication"
			},
			{
				label: "Case system",
				value: "Aluminum extrusion / dedicated desiccant chamber / security provisions / conditioned display environment"
			}
		],
		galleryCount: 3,
		sources: [{
			label: "Arts Summary / exhibition photographs",
			href: "https://artssummary.com/2026/09/30/sacred-splendor-at-jewish-museum-september-18-2026-through-february-7-2027/"
		}, {
			label: "Jewish Museum exhibition",
			href: "https://thejewishmuseum.org/exhibitions/sacred-splendor-jewish-ritual-art-and-christian-treasures-from-st-vitus-cathedral-in-prague/"
		}]
	},
	{
		slug: "core-nyc",
		recordType: "field-trip",
		title: "New York at Its Core",
		client: "Museum of the City of New York",
		location: "New York, NY",
		date: "2016",
		scope: "Industrial design engineering / Installation assistance",
		summary: "Field Trip provided industrial design engineering to assist with AV implementation for New York at Its Core. The studio assisted fabricators South Side Design & Building with installation, particularly the map table and also the standing AV units.",
		narrative: ["The 8,000-square-foot permanent exhibition explores 400 years of New York City history. It opened on November 18, 2016, with galleries including Port City, 1609–1898; World City, 1898–2012; and Future City Lab."],
		details: [
			{
				label: "Footprint",
				value: "8,000 square feet / entire first floor"
			},
			{
				label: "Development",
				value: "Five years"
			},
			{
				label: "Structure",
				value: "Three galleries / two media anterooms"
			},
			{
				label: "Collection",
				value: "Nearly 450 objects and images"
			}
		],
		credits: [
			{
				role: "Design Engineering",
				name: "Field Trip"
			},
			{
				role: "Curators",
				name: "Sarah M. Henry / Hilary Ballon / Steven H. Jaffe"
			},
			{
				role: "Exhibition design",
				name: "Studio Joseph"
			},
			{
				role: "Experience + media",
				name: "Local Projects"
			},
			{
				role: "Graphic design + identity",
				name: "Pentagram / Michael Bierut"
			},
			{
				role: "Additional project team",
				name: "Clinard Design Studio / BBI Engineering"
			},
			{
				role: "Exhibition contractor + fabricator",
				name: "South Side Design & Building"
			}
		],
		recognition: mcnyAwards,
		galleryCount: 13,
		sources: [
			{
				label: "Museum of the City of New York",
				href: "https://www.mcny.org/nyatitscore"
			},
			{
				label: "Museum press release",
				href: "https://www.mcny.org/sites/default/files/2018-08/mcny_newyorkatitscore_release.pdf"
			},
			{
				label: "SEGD",
				href: "https://segd.org/projects/new-york-its-core/"
			},
			{
				label: "South Side Design & Building / exhibition photographs",
				href: "https://www.southsidedb.com/portfolio-1/new-portfolio-item-3"
			},
			{
				label: "AIA New York / exhibition design and team",
				href: "https://www.aiany.org/architecture/featured-projects/view/new-york-at-its-core/"
			}
		]
	},
	{
		slug: "brooklyn-museum",
		recordType: "collaboration",
		title: "Iris van Herpen: Sculpting the Senses",
		client: "Brooklyn Museum",
		location: "Brooklyn, NY",
		date: "2026",
		scope: "Design Engineering",
		summary: "Design engineering by Field Trip for an illuminated display housing an Iris van Herpen garment in Sculpting the Senses. Original case by Chris Bellamy.",
		narrative: ["The exhibition was first organized by the Musée des Arts Décoratifs in Paris. The display case houses a living-algae garment developed by Iris van Herpen with biodesigner Chris Bellamy."],
		details: [
			{
				label: "Opened",
				value: "May 16, 2026"
			},
			{
				label: "Exhibition",
				value: "North American debut"
			},
			{
				label: "Contents",
				value: "More than 140 designs"
			},
			{
				label: "Project work",
				value: "Design Engineering"
			}
		],
		credits: [
			{
				role: "Design Engineering",
				name: "Field Trip"
			},
			{
				role: "Original case",
				name: "Chris Bellamy"
			},
			{
				role: "Living Algae Look",
				name: "Iris van Herpen / Chris Bellamy"
			},
			{
				role: "Exhibition fabrication",
				name: "South Side Design & Building"
			},
			{
				role: "Original curators",
				name: "Cloé Pitiot / Louise Curtis"
			},
			{
				role: "Brooklyn presentation",
				name: "Matthew Yokobosky / Imani Williford"
			}
		],
		galleryCount: 4,
		sources: [
			{
				label: "Vogue / exhibition feature",
				href: "https://www.vogue.com/article/iris-van-herpen-opens-her-retrospective-in-brooklyn-when-fashion-stays-within-its-own-bubble-its-not-responding-to-the-world"
			},
			{
				label: "Brooklyn Museum exhibition",
				href: "https://www.brooklynmuseum.org/exhibitions/iris-van-herpen"
			},
			{
				label: "Brooklyn Museum press release",
				href: "https://www.brooklynmuseum.org/press/the-brooklyn-museum-presents-north-american-debut-of-iris-van-herpen-sculpting-the-senses"
			},
			{
				label: "Living Look",
				href: "https://www.irisvanherpen.com/collections/sympoiesis/the-living-look"
			}
		]
	},
	{
		slug: "cooper-hewitt",
		recordType: "field-trip",
		title: "Making Home—Smithsonian Design Triennial",
		client: "Cooper Hewitt, Smithsonian Design Museum",
		location: "New York, NY",
		date: "2024–2025",
		scope: "Engineering / Fabrication / Installation",
		summary: "Field Trip worked with South Side Design & Building on engineering, fabrication and installation for Ronald Rael’s Casa Desenterrada / Exhuming Home.",
		narrative: ["Ronald Rael’s Casa Desenterrada / Exhuming Home uses adobe bricks made from material taken from the demolished Ute Indian Agency. The support system uses milled dimensional lumber, custom-stained back-to-back frames, and tension cables for stabilization and security."],
		details: [
			{
				label: "Public run",
				value: "November 2, 2024–August 10, 2025"
			},
			{
				label: "Triennial",
				value: "25 site-specific commissions"
			},
			{
				label: "Installation",
				value: "Approximately 300 adobe bricks"
			},
			{
				label: "Structure",
				value: "Roughly ten-foot horseshoe"
			}
		],
		credits: [
			{
				role: "Artist",
				name: "Ronald Rael"
			},
			{
				role: "Engineering / fabrication / installation",
				name: "Field Trip w/ South Side Design & Building"
			},
			{
				role: "Curators",
				name: "Alexandra Cunningham Cameron / Christina L. De León / Michelle Joan Wilkinson"
			},
			{
				role: "Exhibition design",
				name: "Johnston Marklee"
			},
			{
				role: "Graphic design",
				name: "Office Ben Ganz"
			}
		],
		galleryCount: 8,
		sources: [
			{
				label: "Wallpaper* / Making Home",
				href: "https://www.wallpaper.com/design-interiors/cooper-hewitt-making-home-triennial"
			},
			{
				label: "Cooper Hewitt exhibition",
				href: "https://www.cooperhewitt.org/channel/making-home/"
			},
			{
				label: "Cooper Hewitt",
				href: "https://www.cooperhewitt.org/making-home-access/floor-3/3/"
			}
		]
	},
	{
		slug: "dia-beacon",
		recordType: "field-trip",
		title: "Tehching Hsieh: Lifeworks 1978–1999",
		client: "Dia Beacon",
		location: "Beacon, NY",
		date: "2025–present",
		scope: "Fabrication",
		summary: "Field Trip worked with South Side Design & Building to fabricate tables and benches for Tehching Hsieh: Lifeworks 1978–1999 at Dia Beacon.",
		narrative: ["The retrospective brings together all five One Year Performances, the Thirteen Year Plan, and previously unexhibited material."],
		details: [
			{
				label: "Opened",
				value: "October 4, 2025"
			},
			{
				label: "Public run",
				value: "Long-term view"
			},
			{
				label: "Works",
				value: "Five One Year Performances / Thirteen Year Plan"
			},
			{
				label: "Project work",
				value: "Tables and benches"
			}
		],
		credits: [
			{
				role: "Artist",
				name: "Tehching Hsieh"
			},
			{
				role: "Photography",
				name: "Bill Jacobson Studio, New York. Artwork © Tehching Hsieh."
			},
			{
				role: "Tables and benches / Fabrication",
				name: "Field Trip w/ South Side Design & Building"
			},
			{
				role: "Curators",
				name: "Humberto Moro / Adrian Heathfield / Liv Cuniberti"
			}
		],
		galleryCount: 3,
		sources: [
			{
				label: "The Guardian / artist interview",
				href: "https://www.theguardian.com/artanddesign/2026/jan/14/tehching-hsieh-most-extreme-performance-artist-ever"
			},
			{
				label: "Dia exhibition",
				href: "https://www.diaart.org/exhibition/exhibitions-projects/tehching-hsieh-lifeworks-19781999-exhibition"
			},
			{
				label: "Dia",
				href: "https://www.diaart.org/about/press/further-details-announced-for-major-tehching-hsieh-retrospective-at-dia-beacon"
			}
		]
	},
	{
		slug: "china-institute",
		recordType: "field-trip",
		title: "China Institute",
		client: "China Institute of America",
		location: "New York, NY",
		date: "2026",
		scope: "Fabrication / Installation",
		summary: "Field Trip provided fabrication and installation for China Institute in New York, with No.4 Studio.",
		details: [],
		credits: [
			{
				role: "Exhibition design",
				name: "East China Normal University, School of Design; Perry Hu"
			},
			{
				role: "Producer",
				name: "Yongqiang Lin"
			},
			{
				role: "Fabrication / Installation",
				name: "Field Trip w/ No.4 Studio (Steven Gaviño)"
			},
			{
				role: "Gallery image source",
				name: "East China Normal University, School of Design"
			}
		],
		galleryCount: 5,
		sources: [{
			label: "Exhibition and installation photographs / East China Normal University",
			href: "https://english.ecnu.edu.cn/content.jsp?urltype=news.NewsContentUrl&wbnewsid=4011&wbtreeid=1599"
		}, {
			label: "No.4 Studio / Steven Gaviño",
			href: "https://www.no4studio.com/the-team"
		}]
	},
	{
		slug: "dream-machine",
		recordType: "collaboration",
		title: "Dream Machine",
		client: "Emilie Baltz / Liberty Science Center",
		location: "New York, NY / Jersey City, NJ",
		date: "2017–2018",
		scope: "Visualizations",
		summary: "Concept + Design by Emilie Baltz. Visualizations by Field Trip. Fabrication by No.4 Studio.",
		narrative: ["Ten stations pair bicycle pumps with brass horns. Each pump triggers sound, scent and light associated with one of ten emotions."],
		details: [
			{
				label: "Debut",
				value: "Panorama Festival / 2017"
			},
			{
				label: "Permanent home",
				value: "Liberty Science Center / 2018"
			},
			{
				label: "Instrument",
				value: "Ten bicycle-pump and brass-horn stations"
			},
			{
				label: "Sensory field",
				value: "Sound / scent / light / touch"
			}
		],
		credits: [
			{
				role: "Concept + Design",
				name: "Emilie Baltz"
			},
			{
				role: "Visualizations",
				name: "Field Trip"
			},
			{
				role: "Sound design",
				name: "Antfood Studios"
			},
			{
				role: "Technology",
				name: "Smooth Technology"
			},
			{
				role: "Fabrication",
				name: "No.4 Studio"
			},
			{
				role: "Scent",
				name: "Givaudan"
			}
		],
		galleryCount: 5,
		sources: [
			{
				label: "Liberty Science Center / Dream Machine",
				href: "https://lsc.org/explore/exhibitions/dream-machine"
			},
			{
				label: "Liberty Science Center",
				href: "https://lsc.org/explore/exhibitions/dream-machine"
			},
			{
				label: "Antfood",
				href: "https://www.antfood.com/work/the-dream-machine"
			}
		]
	},
	{
		slug: "electric-jukebox",
		recordType: "field-trip",
		title: "Sonos Electric Jukebox",
		client: "Sonos / Janelle Monáe",
		location: "Pier 84, New York, NY",
		date: "2013",
		scope: "Design / Engineering",
		summary: "a. thabo worked with Odd Division on exhibition design for a Sonos and Janelle Monáe event using music selections to control projections in fog.",
		narrative: ["Guests selected music while a projection system illuminated fog at a private record-release event at Pier 84 in New York."],
		credits: [{
			role: "Client",
			name: "Sonos / Janelle Monáe"
		}, {
			role: "Exhibition design",
			name: "a. thabo / Odd Division"
		}],
		galleryCount: 3,
		sources: [{
			label: "Original event archive",
			href: "https://www.adamthabo.com/opening-ceremony-intel"
		}]
	},
	{
		slug: "ascend",
		recordType: "field-trip",
		title: "Ascend",
		client: "Delta / TED",
		location: "Vancouver, BC",
		date: "2016",
		scope: "Design",
		summary: "Created for Delta at TED2016: Dream in Vancouver, Ascend was a climbable night sky of responsive light and sound. Field Trip collaborated with Odd Division on design and provided production design, with production by Tool of NA and fabrication and installation by Pink Sparrow for MKG.",
		narrative: [
			"Inspired by Delta’s Hangar research lab, Ascend invited visitors to explore the future of flying through a responsive environment of ropes, light and sound. As visitors climbed, 6,000 LED lights reacted to their movement.",
			"MKG was Delta’s agency partner. Tool of NA produced the installation, directed by Aramique, with technical direction by Jeff Crouse / See Through Lab, animation by Mau Morgo and composition and sound design by Gary Gunn.",
			"Field Trip collaborated with Odd Division on design and provided production design; Pink Sparrow fabricated and installed the project for MKG."
		],
		details: [
			{
				label: "Context",
				value: "Delta at TED2016"
			},
			{
				label: "Environment",
				value: "Climbable rope field"
			},
			{
				label: "Lighting",
				value: "6,000 responsive LED lights"
			},
			{
				label: "Response",
				value: "Movement-driven sensor system"
			}
		],
		credits: [
			{
				role: "Client",
				name: "Delta Air Lines"
			},
			{
				role: "Conference",
				name: "TED2016: Dream"
			},
			{
				role: "Agency",
				name: "MKG"
			},
			{
				role: "Production",
				name: "Tool of NA"
			},
			{
				role: "Direction",
				name: "Aramique"
			},
			{
				role: "Executive producer",
				name: "Dustin Callif"
			},
			{
				role: "Senior producer",
				name: "Jennifer Baker"
			},
			{
				role: "Technical direction",
				name: "Jeff Crouse / See Through Lab"
			},
			{
				role: "Production management",
				name: "Jean Chang"
			},
			{
				role: "Design",
				name: "Field Trip w/ Odd Division"
			},
			{
				role: "Production design",
				name: "Field Trip"
			},
			{
				role: "Fabrication / Installation",
				name: "Pink Sparrow for MKG"
			},
			{
				role: "Animation",
				name: "Mau Morgo"
			},
			{
				role: "Composition / Sound design",
				name: "Gary Gunn"
			},
			{
				role: "LED consultant",
				name: "Matt Mets"
			},
			{
				role: "LED support",
				name: "Ranjit Bhatnagar"
			},
			{
				role: "Video",
				name: "MKG"
			}
		],
		galleryCount: 5,
		sources: [
			{
				label: "TED2016 conference",
				href: "https://pastconferences.ted.com/TED2016/"
			},
			{
				label: "See Through Lab / project and production team",
				href: "https://seethroughlab.com/projects/delta-ascend/"
			},
			{
				label: "Gary Gunn / composition and sound design",
				href: "https://www.garygunnmusic.com/"
			},
			{
				label: "BizBash / Delta marketing director interview, 2016",
				href: "https://www.bizbash.com/event-tech/event-innovators-2016-mauricio-parise"
			}
		]
	},
	{
		slug: "bldg-92",
		recordType: "predecessor",
		title: "Brooklyn Navy Yard: Past, Present & Future",
		client: "Brooklyn Navy Yard / BLDG 92",
		location: "Brooklyn, NY",
		date: "2011",
		scope: "Management / Installation",
		summary: "South Side Design & Building was selected to manage the complete production of the new museum at BLDG 92. a. thabo worked as project lead and manager for over 18 months, coordinating graphic design services and assisting with all shop drawings for the museum’s exhibits.",
		narrative: [
			"The exhibition opened in 2011 across three floors of BLDG 92, spanning the restored Marine Commandant’s Residence and a new wing. It covers the Navy Yard’s history from its founding in 1801.",
			"EAT (Exhibition Art & Technology) provided exhibition and graphic design, with exhibition designer Robin Parkinson and graphic design assistance by Stephanie Chen.",
			"The Brooklyn Navy Yard team included project director Daniella Romano, deputy director Aileen Chumard and Elliot S. Matz, who led the team developing and opening BLDG 92."
		],
		details: [
			{
				label: "Opened",
				value: "2011"
			},
			{
				label: "Format",
				value: "Permanent / three floors"
			},
			{
				label: "Historic building",
				value: "1857 Marine Commandant’s Residence"
			},
			{
				label: "Recognition",
				value: "Brooklyn Navy Yard’s first LEED Platinum building"
			}
		],
		credits: [
			{
				role: "Architecture",
				name: "Beyer Blinder Belle / Workshop/APD"
			},
			{
				role: "Exhibition design / Graphic design",
				name: "EAT (Exhibition Art & Technology)"
			},
			{
				role: "Complete production / Exhibit fabrication",
				name: "South Side Design & Building"
			},
			{
				role: "Project lead and management",
				name: "a. thabo"
			},
			{
				role: "Graphic design assistance",
				name: "Stephanie Chen"
			},
			{
				role: "Exhibition design — EAT",
				name: "Robin Parkinson"
			},
			{
				role: "Project director — BLDG 92",
				name: "Daniella Romano"
			},
			{
				role: "Deputy director — BLDG 92",
				name: "Aileen Chumard"
			},
			{
				role: "BLDG 92 development leadership — BNYDC",
				name: "Elliot S. Matz"
			}
		],
		note: "Completed with South Side Design & Building before Field Trip was established.",
		galleryCount: 5,
		sources: [
			{
				label: "Brooklyn Navy Yard exhibits",
				href: "https://www.brooklynnavyyard.org/exhibits/"
			},
			{
				label: "Beyer Blinder Belle / project credits",
				href: "https://www.beyerblinderbelle.com/work/view/bldg-92-brooklyn-navy-yard/"
			},
			{
				label: "Robin Parkinson / exhibition design biography",
				href: "https://westbeth.org/artist-page/robin-parkinson/"
			},
			{
				label: "Daniella Romano / 2011 museum update",
				href: "https://hnsa.memberclicks.net/assets/Archive/ANCHORWATCH/2011summer.pdf"
			},
			{
				label: "Gothamist / 2011 museum opening",
				href: "https://tollbit.gothamist.com/2011/11/10/brooklyn_navy_yard_museum_1.php"
			},
			{
				label: "Elliot S. Matz / museum development biography",
				href: "https://www.rmtmuseum.org/"
			},
			{
				label: "Brooklyn Navy Yard public spaces",
				href: "https://www.brooklynnavyyard.org/public-spaces/"
			},
			{
				label: "Architect Magazine",
				href: "https://www.architectmagazine.com/design/buildings/brooklyn-navy-yard-center-building-92_o"
			},
			{
				label: "Communication Arts / exhibition design team",
				href: "https://www.commarts.com/project/8852/brooklyn-navy-yard"
			},
			{
				label: "Blooloop / exhibition technology and fabrication",
				href: "https://blooloop.com/uncategorised/news/audiovisual-technology-alcorn-mcbride-at-brooklyn-navy-yards-exhibit-and-visitors-center/"
			}
		]
	},
	{
		slug: "on-becoming-an-artist",
		recordType: "predecessor",
		title: "On Becoming an Artist",
		client: "The Noguchi Museum",
		location: "Long Island City, NY",
		date: "2010–2011",
		scope: "Design",
		summary: "Exhibition design with South Side Design & Building for The Noguchi Museum’s exhibition on Noguchi’s collaborators and mentors.",
		details: [
			{
				label: "Public run",
				value: "November 17, 2010–April 24, 2011"
			},
			{
				label: "Curator",
				value: "Amy Wolf"
			},
			{
				label: "Institution",
				value: "The Noguchi Museum"
			}
		],
		note: "Completed with South Side Design & Building before Field Trip was established.",
		credits: [
			{
				role: "Exhibition design",
				name: "a. thabo w/ South Side Design & Building"
			},
			{
				role: "Agency",
				name: "Pure + Applied"
			},
			{
				role: "Curator",
				name: "Amy Wolf"
			}
		],
		galleryCount: 4,
		sources: [{
			label: "Noguchi Museum exhibition",
			href: "https://www.noguchi.org/museum/exhibitions/view/on-becoming-an-artist-isamu-noguchi-and-his-contemporaries-1922-1960/"
		}, {
			label: "South Side Design & Building / exhibition portfolio",
			href: "https://www.southsidedb.com/portfolio-1/noguchi-and-his-contemporaries"
		}]
	},
	{
		slug: "beat-repeat",
		recordType: "field-trip",
		title: "Beat : Repeat",
		client: "Red Bull Studios",
		location: "New York, NY",
		date: "2014",
		scope: "Design / Installation",
		summary: "a. thabo worked with Odd Division on exhibition design and installation for a display of 101 vintage drum machines at Red Bull Studios New York, with interactive media by Red Paper Heart.",
		narrative: [
			"The exhibition presented 101 vintage drum machines from Joe Mansfield’s collection. Red Paper Heart developed a thirty-foot projection-mapped interactive centerpiece.",
			"Red Paper Heart’s team included Zander Brimijoin (creative direction), Daniel Scheibel (technology direction), Lisa Walters (senior producer), Charlie Whitney (development), Pedro Piccinini (design) and Nathan Punwar (documentation).",
			"Red Paper Heart’s published credits name Aramique Krauthamer, a. thabo and Nathalie Salazar as the Odd Division collaborators. a. thabo provided installation."
		],
		details: [
			{
				label: "Public run",
				value: "May 3–31, 2014"
			},
			{
				label: "Collection",
				value: "101 vintage drum machines"
			},
			{
				label: "Venue",
				value: "Red Bull Studios New York"
			},
			{
				label: "Media centerpiece",
				value: "30-foot projection-mapped installation"
			}
		],
		credits: [
			{
				role: "Collection",
				name: "Joe Mansfield"
			},
			{
				role: "Exhibition design",
				name: "a. thabo / Odd Division"
			},
			{
				role: "Interactive media",
				name: "Red Paper Heart"
			},
			{
				role: "Creative direction — Red Paper Heart",
				name: "Zander Brimijoin"
			},
			{
				role: "Technology direction — Red Paper Heart",
				name: "Daniel Scheibel"
			},
			{
				role: "Senior producer — Red Paper Heart",
				name: "Lisa Walters"
			},
			{
				role: "Development — Red Paper Heart",
				name: "Charlie Whitney"
			},
			{
				role: "Design — Red Paper Heart",
				name: "Pedro Piccinini"
			},
			{
				role: "Odd Division collaborators",
				name: "Aramique Krauthamer / a. thabo / Nathalie Salazar"
			},
			{
				role: "Installation",
				name: "a. thabo"
			},
			{
				role: "Photography — Red Paper Heart documentation",
				name: "Nathan Punwar"
			}
		],
		galleryCount: 5,
		sources: [
			{
				label: "Red Bull",
				href: "https://www.redbull.com/us-en/events/beat-repeat-nyc-a-drum-machine-exhibition"
			},
			{
				label: "Red Paper Heart project",
				href: "https://redpaperheart.com/work/beat-repeat"
			},
			{
				label: "Red Bull / exhibition photographs",
				href: "https://www.redbull.com/us-en/galleries/beat-repeat-nyc-exhibition-at-red-bull-studios-ny-gallery-c3"
			},
			{
				label: "Red Paper Heart / project film and team credits",
				href: "https://vimeo.com/97760035"
			},
			{
				label: "Red Paper Heart on Behance / project documentation",
				href: "https://www.behance.net/gallery/17560315/beatrepeat-Red-Bull-Studios-NYC"
			}
		]
	},
	{
		slug: "holocaust-by-bullets",
		recordType: "predecessor",
		title: "The Shooting of Jews in Ukraine: Holocaust by Bullets",
		client: "Museum of Jewish Heritage",
		location: "New York, NY",
		date: "2008–2009",
		scope: "Design / Fabrication / Installation",
		summary: "Exhibition design, fabrication, and installation for testimony, photographs, artifacts, maps, and forensic research at the Museum of Jewish Heritage.",
		narrative: ["Created by Mémorial de la Shoah and presented with Yahad-In Unum, the exhibition drew on Father Patrick Desbois’s research into mass shootings and witness testimony in Ukraine."],
		details: [
			{
				label: "Public run",
				value: "October 24, 2008–March 23, 2009"
			},
			{
				label: "Institution",
				value: "Museum of Jewish Heritage"
			},
			{
				label: "Created by",
				value: "Mémorial de la Shoah"
			},
			{
				label: "Research partner",
				value: "Yahad-In Unum"
			}
		],
		note: "Completed with South Side Design & Building before Field Trip was established.",
		galleryCount: 4,
		sources: [{
			label: "Museum exhibition",
			href: "https://mjhnyc.org/exhibitions/shooting-jews-ukraine-holocaust-bullets/"
		}]
	},
	{
		slug: "2012-us-olympics",
		recordType: "predecessor",
		title: "U.S. Olympic Team Trials—Swimming",
		client: "Speedo America",
		location: "Omaha, NE",
		date: "2012",
		scope: "Design / Engineering / Fabrication / Installation",
		summary: "Exhibition design and visitor experience for Speedo at the 2012 U.S. Olympic Team Trials—Swimming in Omaha.",
		narrative: ["Speedo’s AquaZone at the U.S. Olympic Team Trials in Omaha introduced PaceClub training tools."],
		details: [
			{
				label: "Event",
				value: "2012 U.S. Olympic Team Trials—Swimming"
			},
			{
				label: "Location",
				value: "Omaha, Nebraska"
			},
			{
				label: "Visitor program",
				value: "AquaZone / PaceClub"
			},
			{
				label: "Team",
				value: "a. thabo / South Side Design & Building"
			}
		],
		note: "Completed with South Side Design & Building before Field Trip was established.",
		galleryCount: 5,
		sources: [{
			label: "2012 Olympic Swimming Trials",
			href: "https://www.visitomaha.com/articles/post/2012-olympic-team-trials-swimming-media-credential-application-now-available/"
		}]
	},
	{
		slug: "nike-free-hyperfeel",
		recordType: "field-trip",
		title: "The Art + Science of Feeling",
		client: "Nike Free Hyperfeel",
		location: "Gansevoort Plaza, New York, NY",
		date: "2013",
		scope: "Design",
		summary: "a. thabo worked with Odd Division on industrial design for The Art + Science of Feeling for Nike Free Hyperfeel. South Side Design & Building fabricated and installed the project.",
		narrative: ["Visitors walked across stone, sand and grass at Gansevoort Plaza. A NeuroSky interface translated brainwave data into a real-time soundtrack and visualization."],
		details: [
			{
				label: "Context",
				value: "Nike Free Hyperfeel launch"
			},
			{
				label: "Site",
				value: "Gansevoort Plaza"
			},
			{
				label: "Terrain",
				value: "Stone / sand / grass"
			},
			{
				label: "Interaction",
				value: "Neural data / sound / cumulative visualization"
			}
		],
		credits: [
			{
				role: "Design",
				name: "a. thabo / Odd Division"
			},
			{
				role: "Industrial design",
				name: "a. thabo"
			},
			{
				role: "Fabrication / Installation",
				name: "South Side Design & Building"
			}
		],
		galleryCount: 13,
		sources: [{
			label: "Jeff Crouse / project",
			href: "https://jeffish.com/projects/nike-hyperfeel.html"
		}, {
			label: "Aramique / Nike Free Hyperfeel",
			href: "https://aramique.com/NIKE-FREE-HYPERFEEL"
		}]
	},
	{
		slug: "wheat-thins-popped",
		recordType: "field-trip",
		title: "Wheat Thins Popped",
		client: "Nabisco / Wheat Thins",
		location: "Times Square, New York, NY",
		date: "2014",
		scope: "Design",
		summary: "a. thabo worked with Odd Division on industrial design for Wheat Thins Popped, an interactive Times Square installation directed by Aramique through Tool.",
		narrative: ["Visitors’ tweets triggered balloons to pop on a thirty-foot structure in Times Square."],
		details: [
			{
				label: "Format",
				value: "One-day public installation"
			},
			{
				label: "Site",
				value: "Times Square"
			},
			{
				label: "Structure",
				value: "30 feet"
			},
			{
				label: "Trigger",
				value: "Visitor tweets / physical balloon pops"
			}
		],
		credits: [
			{
				role: "Design",
				name: "a. thabo / Odd Division"
			},
			{
				role: "Industrial design",
				name: "a. thabo"
			},
			{
				role: "Direction",
				name: "Aramique / Tool"
			},
			{
				role: "Fabrication",
				name: "SFDS"
			}
		],
		galleryCount: 7,
		sources: [{
			label: "Launch announcement",
			href: "https://www.prnewswire.com/news-releases/kelly-osbourne-unveils-latest-snacking-must-have---wheat-thins-popped-253733161.html"
		}, {
			label: "SFDS / engineering credit and event photographs",
			href: "https://www.sfdshop.com/portfolio/ejfjgmmf6ndw23z-exgyr-mrmxx-rm24f-axx2c"
		}]
	},
	{
		slug: "heart-bot",
		recordType: "collaboration",
		title: "Heart Bot",
		client: "Intel / SMS Audio",
		location: "New Museum, New York, NY",
		date: "2014",
		scope: "Design / Engineering",
		summary: "a. thabo worked with Odd Division on industrial design for a drawing system that translated each participant’s heart rate into an ink plot.",
		narrative: ["Participants placed a hand on a pulse sensor. Heart Bot translated heart-rate data into an ink drawing."],
		details: [
			{
				label: "Presented",
				value: "August 2014"
			},
			{
				label: "Venue",
				value: "New Museum Sky Room"
			},
			{
				label: "Input",
				value: "Participant heart rate"
			},
			{
				label: "Output",
				value: "Unique plotted drawing"
			}
		],
		credits: [
			{
				role: "Industrial design",
				name: "a. thabo"
			},
			{
				role: "Director",
				name: "Aramique"
			},
			{
				role: "Technical director",
				name: "Jeff Crouse"
			},
			{
				role: "Engineering",
				name: "Ranjit Bhatnagar / Matt Mets"
			},
			{
				role: "Graphics",
				name: "Nikolay Saveliev"
			},
			{
				role: "Fabrication",
				name: "South Side"
			}
		],
		galleryCount: 7,
		sources: [
			{
				label: "Jeff Crouse / project",
				href: "https://jeffish.com/projects/heart-bot.html"
			},
			{
				label: "Creator video and credits",
				href: "https://vimeo.com/104567379"
			},
			{
				label: "Aramique / industrial design and fabrication credits",
				href: "https://aramique.com/INTEL-HEART-BOT"
			},
			{
				label: "Forbes / 50 Cent Enters the Art Game...Sort Of",
				href: "https://www.forbes.com/sites/abinlot/2014/08/27/50-cent-enters-the-art-game-sort-of/"
			},
			{
				label: "VICE / Heart Bot Turns Heartbeats Into Personalized Illustrations",
				href: "https://www.vice.com/en/article/heart-bot-turns-human-heartbeats-into-personalized-illustrations/"
			},
			{
				label: "element14 / Heart Bot engineering feature",
				href: "https://community.element14.com/technologies/sensor-technology/b/blog/posts/heart-bot-is-a-heartbeat-interactive-art-installation"
			},
			{
				label: "Adafruit / Heart Bot coverage",
				href: "https://blog.adafruit.com/2014/09/01/this-robot-draws-pictures-to-the-beat-of-your-heart-robotics/"
			}
		]
	},
	{
		slug: "best-of-all-possible-worlds",
		recordType: "predecessor",
		title: "Best of All Possible Worlds",
		client: "Saul Melman / Socrates Sculpture Park",
		location: "Long Island City, NY",
		date: "2011–2012",
		scope: "Design / Engineering",
		summary: "Fabrication and installation assistance for Saul Melman’s 55-foot installation of vacuum-formed door casts on steel frames.",
		narrative: ["Translucent, vacuum-formed thermoplastic door casts mapped a New York apartment floor plan at Socrates Sculpture Park."],
		details: [
			{
				label: "Public run",
				value: "September 10, 2011–March 4, 2012"
			},
			{
				label: "Artist",
				value: "Saul Melman"
			},
			{
				label: "Length",
				value: "55 feet"
			},
			{
				label: "a. thabo credit",
				value: "Assistant"
			}
		],
		credits: [{
			role: "Artist",
			name: "Saul Melman"
		}, {
			role: "Assistants",
			name: "a. thabo / Ani Weinstein"
		}],
		note: "Completed with South Side Design & Building before Field Trip was established.",
		galleryCount: 5,
		sources: [
			{
				label: "Socrates",
				href: "https://socratessculpturepark.org/artwork/best-of-all-possible-worlds/"
			},
			{
				label: "Saul Melman",
				href: "https://www.saulmelman.com/work/detail/best_of_all_possible_worlds/"
			},
			{
				label: "Making-of",
				href: "https://believermagblog.wordpress.com/2013/11/14/best-of-all-possible-worlds-a-visual-tour/"
			},
			{
				label: "The Believer / Saul Melman’s visual essay and assistant credits",
				href: "https://www.thebeliever.net/logger/2013-11-14-best-of-all-possible-worlds-a-visual-tour/"
			},
			{
				label: "The Trustees / artwork and later presentation",
				href: "https://thetrustees.org/content/best-of-all-possible-worlds/"
			}
		]
	},
	{
		slug: "hyatt-photo-booth",
		recordType: "field-trip",
		title: "Mechanical Photo Booth",
		client: "Hyatt Hotels",
		location: "Newport Beach, CA",
		date: "2014",
		scope: "Design / Engineering / Installation",
		summary: "a. thabo provided design engineering and installation for a photo booth with hand-rotated backgrounds, developed with Rokkan and Red Paper Heart.",
		narrative: ["Hand-rotated scenic elements changed the background between dimensional dioramas and monitor-based imagery before each photograph."],
		credits: [
			{
				role: "Client",
				name: "Hyatt Hotels"
			},
			{
				role: "Design engineering / installation",
				name: "a. thabo"
			},
			{
				role: "Design",
				name: "Red Paper Heart"
			},
			{
				role: "Agency",
				name: "Rokkan"
			}
		],
		galleryCount: 6,
		sources: []
	},
	{
		slug: "tumi",
		recordType: "field-trip",
		title: "TUMI at Tribeca Film Festival",
		client: "TUMI",
		location: "New York, NY",
		date: "2017",
		scope: "Design / Engineering",
		summary: "Field Trip designed the TUMI environment for the 2017 Tribeca Film Festival; South Side fabricated it.",
		credits: [
			{
				role: "Design",
				name: "Field Trip"
			},
			{
				role: "Fabrication",
				name: "South Side"
			},
			{
				role: "Dome concept",
				name: "THEORIZ"
			},
			{
				role: "Campaign",
				name: "EP+Co"
			},
			{
				role: "Context",
				name: "2017 Tribeca Film Festival"
			}
		],
		galleryCount: 4,
		sources: [{
			label: "Tribeca 2017",
			href: "https://tribecafilm.com/press-center/festival/press-releases/tribeca-film-festival-announces-tribeca-talks-lineup-featuring-engaging-conversations-with-noah-baumbach-kathryn-bigelow-kobe-bryant-common-lena-dunham-jon-favreau-glen-keane-jenni-konner-bruce-springsteen-and-more"
		}]
	},
	{
		slug: "jadu-beta",
		recordType: "predecessor",
		title: "Jadu Beta",
		client: "Saul Melman",
		location: "Black Rock City, NV",
		date: "2004",
		scope: "Design / Engineering / Fabrication / Installation",
		summary: "Engineering, fabrication, and installation for Saul Melman’s 450-foot polyethylene structure with eight-channel sound by Wolf + Lamb.",
		narrative: ["Translucent polyethylene cells and connecting tunnels used inflatable membranes, wood and PVC structure, and anchoring."],
		details: [
			{
				label: "Site",
				value: "Black Rock City"
			},
			{
				label: "Length",
				value: "450 feet"
			},
			{
				label: "Material",
				value: "Polyethylene / wood / PVC"
			},
			{
				label: "Sound",
				value: "Eight channels / Wolf + Lamb"
			}
		],
		credits: [
			{
				role: "Artist",
				name: "Saul Melman"
			},
			{
				role: "Sound environment",
				name: "Wolf + Lamb"
			},
			{
				role: "Engineering, fabrication and installation",
				name: "a. thabo"
			}
		],
		note: "Completed by a. thabo before Field Trip was established.",
		galleryCount: 5,
		sources: [{
			label: "Saul Melman",
			href: "https://www.saulmelman.com/work/detail/jadu_beta/"
		}]
	},
	{
		slug: "m-is-for-museum",
		recordType: "predecessor",
		title: "M Is for Museum",
		client: "Carnegie Museum of Natural History",
		location: "Pittsburgh, PA",
		date: "2011",
		scope: "Fabrication / Installation",
		summary: "Fabrication and installation for a 9,000-square-foot children’s gallery at Carnegie Museum of Natural History.",
		narrative: ["Alphabet stations used collection objects, measurement, sound, scent, touch and role-play to introduce museum science."],
		details: [
			{
				label: "Opened",
				value: "October 15, 2011"
			},
			{
				label: "Gallery",
				value: "R.P. Simmons Family Gallery / third floor"
			},
			{
				label: "Footprint",
				value: "9,000 square feet"
			},
			{
				label: "Framework",
				value: "Alphabet-based / one station per letter"
			},
			{
				label: "Audience",
				value: "Young visitors through approximately age 13 and their grown-ups"
			},
			{
				label: "Museum collection",
				value: "Approximately 22 million objects and specimens"
			}
		],
		credits: [
			{
				role: "Production company",
				name: "South Side Design and Building"
			},
			{
				role: "Services",
				name: "Exhibit fabrication / installation"
			},
			{
				role: "Museum project director",
				name: "Beth Redmond-Jones"
			}
		],
		note: "A South Side Design & Building project, completed before Field Trip was established.",
		galleryCount: 7,
		sources: [{
			label: "Carnegie Magazine",
			href: "https://carnegiemuseums.org/magazine-archive/2011/winter/feature-292.html"
		}]
	},
	{
		slug: "david-bowie-residence",
		recordType: "predecessor",
		title: "David Bowie Residence",
		client: "David Bowie",
		location: "New York, NY",
		date: "Unknown",
		scope: "Fabrication / Installation",
		summary: "Private-residence fabrication and installation by South Side Design & Building.",
		credits: [{
			role: "Production company",
			name: "South Side Design and Building"
		}, {
			role: "Services",
			name: "Fabrication / installation"
		}],
		note: "A South Side Design & Building project.",
		galleryCount: 3,
		sources: []
	},
	{
		slug: "klaus-biesenbach-residence",
		recordType: "research",
		title: "Klaus Biesenbach Residence",
		client: "Klaus Biesenbach",
		location: "Unknown",
		date: "Unknown",
		scope: "Fabrication / Installation",
		summary: "field trip provided fabrication and installation for the Klaus Biesenbach residence.",
		note: "The original portfolio identifies the residence. Project date, exact scope, production team and photography credit remain unverified.",
		credits: [{
			role: "Fabrication / Installation",
			name: "field trip"
		}],
		galleryCount: 1,
		sources: [{
			label: "The New York Times",
			href: "https://www.nytimes.com/slideshow/2012/01/26/garden/20120126-DESIGNPERFECTION.html"
		}]
	},
	{
		slug: "adam-fuss",
		recordType: "research",
		title: "Adam Fuss",
		client: "Adam Fuss",
		location: "New York",
		date: "2002–2003",
		scope: "Printmaking / Installation",
		summary: "Studio assistant to Adam Fuss for the year leading up to the artist’s 2003 exhibition at Cheim & Read, with work in photograms, printmaking and installation. Adam also facilitated the dress-photogravure collaboration with Paul Taylor at Renaissance Press.",
		note: "Adam Fuss’s exhibition of new work at Cheim & Read ran from 16 October to 15 November 2003.",
		credits: [
			{
				role: "Artist",
				name: "Adam Fuss"
			},
			{
				role: "Studio assistant / Printmaking / Installation",
				name: "a. thabo, 2002–2003"
			},
			{
				role: "Exhibition",
				name: "Cheim & Read, New York, 16 October–15 November 2003"
			},
			{
				role: "Dress photogravure collaboration",
				name: "Adam Fuss and Paul Taylor, Renaissance Press; facilitated by a. thabo"
			}
		],
		galleryCount: 9,
		sources: [{
			label: "Cheim & Read — Adam Fuss, 2003",
			href: "https://cheimread.com/exhibitions/161-adam-fuss/"
		}, {
			label: "Renaissance Press collaboration",
			href: "/about/risd-printmaking#adam-fuss-collaboration"
		}]
	},
	{
		slug: "katrin-sigurdardottir",
		recordType: "research",
		title: "Stage 2005/2012",
		client: "Katrín Sigurðardóttir",
		location: "Art in General / New York, NY",
		date: "2012",
		scope: "Fabrication / Installation",
		summary: "a. thabo worked with South Side Design & Building on fabrication and installation for Katrín Sigurðardóttir’s Stage 2005/2012 at Art in General.",
		note: "Unknown: exact credited role and complete production team.",
		credits: [{
			role: "Fabrication / Installation",
			name: "a. thabo w/ South Side Design & Building"
		}],
		galleryCount: 3,
		sources: []
	},
	{
		slug: "intel-unknown",
		recordType: "research",
		title: "Opening Ceremony product display",
		client: "Intel / Opening Ceremony",
		location: "Unknown",
		date: "Unknown",
		scope: "Design",
		summary: "field trip provided design for the Intel / Opening Ceremony product display.",
		credits: [{
			role: "Design",
			name: "field trip"
		}],
		galleryCount: 6,
		sources: []
	},
	{
		slug: "droog-unknown",
		recordType: "research",
		title: "Droog",
		client: "Droog",
		location: "Unknown",
		date: "Unknown",
		scope: "Design / Fabrication",
		summary: "One archive image is assigned to Droog. The project title, year, location, and role are unknown.",
		note: "Unknown: project title, year, location, scope, and credits.",
		galleryCount: 1,
		sources: []
	},
	{
		slug: "blanket-chocolate-factory",
		recordType: "research",
		title: "The Blanket / The Chocolate Factory",
		client: "The Blanket / The Chocolate Factory",
		location: "Unknown",
		date: "Unknown",
		scope: "Engineering",
		summary: "The project title, date, location, and role remain unconfirmed. No verified project photograph is currently available.",
		note: "Unknown: project identity, year, location, scope, and credits.",
		galleryCount: 0,
		sources: []
	},
	{
		slug: "archive",
		recordType: "research",
		title: "Extended Archive",
		client: "Exhibitions / installations / artworks",
		location: "New York and beyond",
		date: "Earlier work",
		scope: "Design / engineering / fabrication / installation",
		summary: "",
		details: [
			{
				label: "Field Trip",
				value: "Studio work / 2013–present"
			},
			{
				label: "Collaborations",
				value: "a. thabo with artists and project teams"
			},
			{
				label: "Production company",
				value: "South Side / earlier teams"
			}
		],
		galleryCount: 26,
		sources: []
	}
];
var additionalArchive = [
	{
		title: "Entertaining America: Jews, Movies, and Broadcasting",
		scope: "Fabrication / Installation",
		venue: "Jewish Museum of New York",
		date: "February 21–September 14, 2003",
		category: "South Side Design & Building",
		note: "Guest-curated by J. Hoberman and Jeffrey Shandler. Fabrication and installation by South Side Design & Building.",
		href: "https://thejewishmuseum.org/exhibitions/entertaining-america-jews-movies-and-broadcasting/"
	},
	{
		title: "Women Who Rock: Vision, Passion, Power",
		scope: "Fabrication / Installation",
		venue: "Rock & Roll Hall of Fame / traveling exhibition",
		date: "2011–2013",
		category: "South Side Design & Building",
		note: "More than 250 costumes, instruments, handwritten lyrics, posters, video, and listening materials. Exhibition design by Pure + Applied. Fabrication and installation by South Side Design & Building.",
		href: "/work/women-who-rock"
	},
	{
		title: "Hunt for Paradise: Court Arts of Iran, 1501–1576",
		scope: "Fabrication / Installation",
		venue: "Asia Society",
		date: "October 16, 2003–January 18, 2004",
		category: "South Side Design & Building",
		note: "Sheila Canby’s exhibition brought together more than 75 works from over 30 collections. Exhibition design by Perry Hu. Fabrication and installation by South Side Design & Building.",
		href: "/work/hunt-for-paradise"
	},
	{
		title: "New Bamboo: Contemporary Japanese Masters",
		scope: "Fabrication",
		venue: "Japan Society",
		date: "October 4, 2008–January 11, 2009",
		category: "South Side Design & Building",
		note: "Joe Earle’s exhibition presented more than 90 works by 23 artists. Exhibition design by Perry Hu. Fabrication by South Side Design & Building.",
		href: "/work/new-bamboo"
	},
	{
		title: "Counter Culture",
		scope: "Design / Engineering",
		venue: "Archive record",
		date: "Date under research",
		category: "Documentation pending",
		note: "Visual material survives in the original archive; institution, date, complete team, and exact scope still require a reliable public or first-party record."
	},
	{
		title: "Pitch Perfect / Inductive Learning",
		scope: "Design / Engineering",
		venue: "Archive record",
		date: "Date under research",
		category: "Documentation pending",
		note: "Retained as a project lead while title, venue, date, and Field Trip scope are confirmed against primary documentation."
	},
	{
		title: "Digestive Disease Week / Creo Medical",
		scope: "Design / Fabrication / Installation",
		venue: "Archive record",
		date: "Date under research",
		category: "Documentation pending",
		note: "Retained as a project lead; the public record is not yet complete enough for a standalone case study."
	},
	{
		title: "Grant’s Tomb",
		scope: "Design",
		venue: "General Grant National Memorial / New York",
		date: "",
		category: "",
		note: "With South Side Design & Building.",
		href: "https://www.nps.gov/gegr/"
	},
	{
		title: "Artwork fabrication / Adam Fuss",
		scope: "Fabrication",
		venue: "Artist relationship",
		date: "Ongoing archive",
		category: "Relationship only",
		note: "The Field Trip supports the fabrication relationship; individual artworks will be named only when a project-specific record can be verified."
	},
	{
		title: "Artwork fabrication / Paul Taylor / Renaissance Press",
		scope: "",
		venue: "Artist and printmaking relationship",
		date: "Ongoing archive",
		category: "Relationship only",
		note: "Retained at relationship level until individual works, dates, and exact production roles can be verified."
	},
	{
		title: "Artwork fabrication / Katrín Sigurðardóttir",
		scope: "",
		venue: "Artist relationship",
		date: "Ongoing archive",
		category: "Relationship only",
		note: "The relationship is documented, but the current evidence does not support attaching Field Trip or a. thabo to a particular work."
	}
];
var excludedAdditionalArchiveTitles = new Set([
	"Counter Culture",
	"Pitch Perfect / Inductive Learning",
	"Digestive Disease Week / Creo Medical"
]);
additionalArchive.filter((record) => !excludedAdditionalArchiveTitles.has(record.title) && record.category !== "Relationship only");
var ownerExcludedProjectSlugs = /* @__PURE__ */ new Set();
/** Owner-selected image portfolios may be visible while their incomplete credits remain research. */
var visibleResearchSlugs = [
	"klaus-biesenbach-residence",
	"intel-unknown",
	"adam-fuss",
	"katrin-sigurdardottir"
];
var publishedProjects = orderProjects(projects.filter((project) => !ownerExcludedProjectSlugs.has(project.slug) && (project.recordType !== "research" || visibleResearchSlugs.includes(project.slug))));
//#endregion
//#region app/home/home-curated-films.ts
var metadata = (slug) => {
	const p = publishedProjects.find((p) => p.slug === slug);
	const services = slug === "dream-machine" ? "Concept + Design by Emilie Baltz. Visualizations by Field Trip." : projectCaptionServices(slug);
	return {
		slug,
		title: p.title,
		client: p.client,
		href: `/work/${slug}`,
		date: p.date,
		services
	};
};
var excerpt = (slug, poster, id, start, end) => ({
	...metadata(slug),
	poster,
	alt: `${publishedProjects.find((p) => p.slug === slug).title} — original project film`,
	vimeo: {
		id,
		start,
		end
	}
});
var ascendPoster = "/home-previews/ascend-audio-first-frame-20261101.webp";
var coreNative = {
	...projectFilms[0],
	src: "/home-previews/core-nyc-reel-960-20261102.mp4",
	mobileSrc: "/home-previews/core-nyc-reel-640-20261102.mp4"
};
var heroFilms = [
	{
		...projectFilms[0],
		...metadata("core-nyc"),
		native: coreNative
	},
	{
		...projectFilms[1],
		...metadata("ascend"),
		poster: ascendPoster,
		alt: "Opening frame of the Ascend project film excerpt",
		native: {
			...projectFilms[1],
			poster: ascendPoster,
			start: 35,
			end: 50
		}
	},
	excerpt("dream-machine", "/project-galleries/dream-machine/01.webp", 233887587, 15, 30),
	excerpt("heart-bot", "/project-film-posters/heart-bot-reel.jpg", 104567379, 45, 60),
	excerpt("beat-repeat", "/project-galleries/beat-repeat/02.webp", 97760035, 16, 31),
	{
		...metadata("wheat-thins-popped"),
		poster: "/project-galleries/wheat-thins-popped/02.webp",
		alt: "Kelly Osbourne at the Wheat Thins Popped launch in Times Square",
		photo: {
			durationMs: 5e3,
			width: 516,
			height: 538,
			objectPosition: "50% 0%"
		}
	},
	excerpt("nike-free-hyperfeel", "/project-galleries/nike-free-hyperfeel/01.webp", 77378108, 20, 35)
];
//#endregion
//#region app/home/desktop-home-films.tsx
var import_jsx_runtime = require_jsx_runtime();
var desktopFilmColumns = [
	{
		id: "left",
		films: [
			1,
			3,
			6,
			1,
			3,
			6,
			0
		],
		holdMs: 15e3
	},
	{
		id: "center",
		films: [0],
		holdMs: 0
	},
	{
		id: "right",
		films: [
			4,
			2,
			5,
			4,
			0,
			2,
			5
		],
		holdMs: 1e4
	}
];
/** Mount only the chosen presentation, never a hidden second set of players. */
function ResponsiveHomeFilms({ mobile }) {
	const [desktop, setDesktop] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const query = matchMedia("(min-width:1024px)");
		const update = () => setDesktop(query.matches);
		update();
		query.addEventListener("change", update);
		return () => query.removeEventListener("change", update);
	}, []);
	if (desktop === null) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "home-films-placeholder",
		"aria-label": "Selected project reels",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "desktop-home-films home-film-desktop-placeholder",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "desktop-film-grid",
				children: desktopFilmColumns.map((column) => {
					const film = heroFilms[column.films[0]];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "desktop-film-column",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "desktop-film-window",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								className: "home-video-poster",
								src: film.poster,
								alt: film.alt,
								width: 1600,
								height: 900
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "desktop-film-label",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: film.href,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: film.title }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
										film.client,
										" · ",
										projectCaptionYear(film.date)
									] }),
									film.slug === "dream-machine" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "desktop-film-credit",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandText, { children: film.services ?? "" })
									})
								]
							})
						})]
					}, column.id);
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "desktop-film-controls",
				"aria-hidden": "true",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					disabled: true,
					children: "Pause"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					disabled: true,
					children: "Full screen"
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "landing-reel home-photo-reel home-film-mobile-placeholder",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "landing-reel-stage",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "home-video-stage",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							className: "home-video-poster",
							src: heroFilms[0].poster,
							alt: heroFilms[0].alt,
							width: 1600,
							height: 900
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "home-reel-controls",
					"aria-hidden": "true",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							disabled: true,
							children: "←"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							disabled: true,
							children: "Pause"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							disabled: true,
							children: "→"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							disabled: true,
							children: "Full screen"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "home-reel-caption",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: heroFilms[0].href,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: heroFilms[0].title }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
								heroFilms[0].client,
								" · ",
								projectCaptionYear(heroFilms[0].date)
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: heroFilms[0].services })
						]
					})
				})
			]
		})]
	});
	return desktop ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DesktopHomeFilms, {}) : mobile;
}
function FilmColumn({ column, active, playRequest, muted, onSound, registerPlay, onResume }) {
	const [position, setPosition] = (0, import_react.useState)(0), [running, setRunning] = (0, import_react.useState)(false), [failed, setFailed] = (0, import_react.useState)(false), [focused, setFocused] = (0, import_react.useState)(false);
	const [retry, setRetry] = (0, import_react.useState)(0), [recovery, setRecovery] = (0, import_react.useState)(false);
	const playGesture = (0, import_react.useRef)(null), soundGesture = (0, import_react.useRef)(null);
	const films = (0, import_react.useMemo)(() => column.films.map((index) => heroFilms[index]), [column]);
	const film = films[position];
	const clock = (0, import_react.useMemo)(() => ({ elapsed: 0 }), [position]);
	const runningChanged = (0, import_react.useMemo)(() => (value) => setRunning(value), []);
	const unavailable = (0, import_react.useMemo)(() => () => {
		setFailed(true);
		setRunning(false);
	}, []);
	const filmActive = active && !focused;
	(0, import_react.useEffect)(() => {
		registerPlay(column.id, () => playGesture.current?.());
		return () => registerPlay(column.id, null);
	}, [column.id, registerPlay]);
	(0, import_react.useEffect)(() => {
		setFailed(false);
	}, [playRequest]);
	(0, import_react.useEffect)(() => {
		if (!filmActive || !running || failed || !column.holdMs) return;
		const started = performance.now();
		const timer = window.setTimeout(() => {
			setRunning(false);
			setFailed(false);
			onSound(false);
			setPosition((p) => (p + 1) % column.films.length);
		}, Math.max(0, column.holdMs - clock.elapsed));
		return () => {
			clearTimeout(timer);
			clock.elapsed += performance.now() - started;
		};
	}, [
		filmActive,
		running,
		failed,
		column,
		clock,
		onSound
	]);
	const recoverySource = film.vimeo ? `https://vimeo.com/${film.vimeo.id}` : null;
	const hasSound = film.native ? film.native.hasAudio !== false : !!film.vimeo;
	const mediaLabel = film.slug === "core-nyc" ? "reel" : "film";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "desktop-film-column",
		"data-film-column": column.id,
		"data-film-project": film.slug,
		"data-film-running": running && filmActive,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "desktop-film-window",
			onPointerEnter: (event) => {
				if (event.pointerType !== "mouse" || event.buttons || !filmActive || running || !muted) return;
				setFailed(false);
				setRetry((n) => n + 1);
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomeVideoSequence, {
				index: position,
				videos: films,
				active: filmActive,
				loop: true,
				playRequest: playRequest + retry,
				playFromGestureRef: playGesture,
				muted,
				soundFromGestureRef: soundGesture,
				onMutedChange: (value) => {
					if (value) onSound(false);
				},
				onRunningChange: runningChanged,
				onRecoveryChange: setRecovery,
				onComplete: () => {},
				onUnavailable: unavailable
			}, film.slug)
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "desktop-film-label",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: film.href,
					onFocus: () => setFocused(true),
					onBlur: () => setFocused(false),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: film.title }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							film.client,
							" · ",
							projectCaptionYear(film.date)
						] }),
						film.slug === "dream-machine" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "desktop-film-credit",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandText, { children: film.services ?? "" })
						})
					]
				}),
				hasSound && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-label": `${muted ? "Turn sound on" : "Mute"}: ${film.title}`,
					"aria-pressed": !muted,
					onClick: () => {
						onSound(muted);
						soundGesture.current?.(!muted);
					},
					children: muted ? "Sound off" : "Sound on"
				}),
				failed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => {
						onResume();
						setFailed(false);
						setRetry((n) => n + 1);
						playGesture.current?.();
					},
					children: ["Play ", mediaLabel]
				}),
				recovery && recoverySource && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					className: "desktop-film-source",
					href: recoverySource,
					target: "_blank",
					rel: "noopener noreferrer",
					children: "Watch film on Vimeo"
				}),
				(failed || recovery || film.photo) && column.films.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => {
						setRunning(false);
						setFailed(false);
						setRecovery(false);
						onSound(false);
						setPosition((p) => (p + 1) % column.films.length);
					},
					children: film.photo ? "Next project" : film.slug === "core-nyc" ? "Next reel" : "Next film →"
				})
			]
		})]
	});
}
function DesktopHomeFilms() {
	const root = (0, import_react.useRef)(null), gestures = (0, import_react.useRef)(/* @__PURE__ */ new Map());
	const [visible, setVisible] = (0, import_react.useState)(false), [online, setOnline] = (0, import_react.useState)(true), [inView, setInView] = (0, import_react.useState)(false);
	const [allowed, setAllowed] = (0, import_react.useState)(false), [requested, setRequested] = (0, import_react.useState)(false), [paused, setPaused] = (0, import_react.useState)(false), [playRequest, setPlayRequest] = (0, import_react.useState)(0);
	const [audible, setAudible] = (0, import_react.useState)(null);
	const registerPlay = (0, import_react.useMemo)(() => (id, play) => {
		if (play) gestures.current.set(id, play);
		else gestures.current.delete(id);
	}, []);
	const resume = (0, import_react.useMemo)(() => () => {
		setRequested(true);
		setPaused(false);
	}, []);
	const soundControls = (0, import_react.useMemo)(() => Object.fromEntries(desktopFilmColumns.map((c) => [c.id, (on) => setAudible((current) => on ? c.id : current === c.id ? null : current)])), []);
	(0, import_react.useEffect)(() => {
		const motion = matchMedia("(prefers-reduced-motion: reduce)"), data = matchMedia("(prefers-reduced-data: reduce)");
		const connection = navigator.connection;
		const preferences = () => {
			setAllowed(!motion.matches && !data.matches && !connection?.saveData);
			setRequested(false);
		};
		const visibility = () => setVisible(!document.hidden), connectivity = () => setOnline(navigator.onLine);
		preferences();
		visibility();
		connectivity();
		motion.addEventListener("change", preferences);
		data.addEventListener("change", preferences);
		connection?.addEventListener("change", preferences);
		document.addEventListener("visibilitychange", visibility);
		window.addEventListener("online", connectivity);
		window.addEventListener("offline", connectivity);
		const element = root.current;
		const measure = () => {
			const r = element.getBoundingClientRect();
			setInView(r.bottom > 0 && r.top < innerHeight);
		};
		const observer = typeof IntersectionObserver === "undefined" ? null : new IntersectionObserver((entries) => setInView(entries[entries.length - 1].isIntersecting));
		if (observer) observer.observe(element);
		else {
			measure();
			window.addEventListener("scroll", measure, { passive: true });
			window.addEventListener("resize", measure);
		}
		return () => {
			observer?.disconnect();
			motion.removeEventListener("change", preferences);
			data.removeEventListener("change", preferences);
			connection?.removeEventListener("change", preferences);
			document.removeEventListener("visibilitychange", visibility);
			window.removeEventListener("online", connectivity);
			window.removeEventListener("offline", connectivity);
			window.removeEventListener("scroll", measure);
			window.removeEventListener("resize", measure);
		};
	}, []);
	const playing = (allowed || requested) && !paused;
	const active = playing && visible && online && inView;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "desktop-home-films",
		ref: root,
		"data-reel-fullscreen": "",
		"aria-label": "Three project reels",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "desktop-film-grid",
			children: desktopFilmColumns.map((column) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilmColumn, {
				column,
				active,
				playRequest,
				muted: audible !== column.id,
				onSound: soundControls[column.id],
				registerPlay,
				onResume: resume
			}, column.id))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "desktop-film-controls",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				"aria-label": playing ? "Pause all three reels" : "Play all three reels",
				"aria-pressed": !playing,
				onClick: () => {
					if (playing) setPaused(true);
					else {
						setRequested(true);
						setPaused(false);
						setPlayRequest((n) => n + 1);
						gestures.current.forEach((play) => play());
					}
				},
				children: playing ? "Pause" : "Play"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReelFullscreenButton, {})]
		})]
	});
}
//#endregion
export { ResponsiveHomeFilms };
