//#region app/image-credit-policy.ts
var photographerAliases = {
	"Amy Beckerman": ["Photo: Amy Beckerman · Source: South Side Design & Building archive"],
	"Bill Jacobson": ["Photo: Bill Jacobson Studio, New York · Artwork © Tehching Hsieh"],
	"Kaylee Pugliese": [
		"Photo: Kaylee Pugliese / RISD",
		"Photograph: Kaylee Pugliese / RISD",
		"Kaylee Pugliese / RISD"
	],
	"Kris Graves": [
		"Photo: Kris Graves · Courtesy The Jewish Museum",
		"Photos by Kris Graves / courtesy The Jewish Museum",
		"Photo Kris Graves, courtesy The Jewish Museum."
	],
	"Nathan Punwar": ["Photo: Nathan Punwar"],
	"Perry Hu": ["Images by Perry Hu"],
	"a. thabo": [
		"A. Thabo",
		"Adam Thabo",
		"Photos by A. Thabo.",
		"Photos by Adam Thabo."
	],
	"David Armstrong": ["Photographs by David Armstrong."],
	"Kenro Izu": ["Photographs by Kenro Izu."],
	"David Graham": ["Image by David Graham"]
};
var normalizedCredit = (label) => label.trim().replace(/\s+/g, " ").replace(/\.$/, "").toLowerCase();
var photographersByLabel = new Map(Object.entries(photographerAliases).flatMap(([name, aliases]) => [name, ...aliases].map((label) => [normalizedCredit(label), name])));
function photographerName(label) {
	return label ? photographersByLabel.get(normalizedCredit(label)) : void 0;
}
function photographerCredit(credit) {
	const name = photographerName(credit?.label);
	return credit && name ? {
		label: name,
		href: credit.href
	} : void 0;
}
//#endregion
export { photographerName as n, photographerCredit as t };
