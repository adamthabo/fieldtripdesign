# Field Trip Cloudflare release

## 8 November 2026: company social links

The shared footer links to Instagram @field_trip_design and the LinkedIn company page designated by the owner during the earlier LinkedIn setup. Facebook is removed until a company page exists. The separate footer study also uses the current Instagram handle.

- Instagram: https://www.instagram.com/field_trip_design/
- LinkedIn: https://www.linkedin.com/company/144095495/

Private Residence retains its seven numbered images and its position immediately after Klaus Biesenbach Residence in Projects and Residential results.

## Deployment

This repository contains the precompiled release for the existing Cloudflare Worker `fieldtripdesign`. The production branch is `main`, the build command is empty, and the deploy command is `npx wrangler deploy`.

Cloudflare Workers Builds reports the result of each deployment. A GitHub merge alone does not confirm that production deployment succeeded. Check Workers & Pages → fieldtripdesign → Deployments, then https://fieldtripdesign.com.

## Validation

The rebuilt Worker passed the compiled public route and asset audit covering 45 public routes and 38 project pages. Every checked public page renders exactly the two expected company social destinations with accessible link labels. Private routes remain blocked and legacy redirects pass. Build-only prerender metadata is excluded from this deployment package.

`RELEASE.json` records the saved source commit and validation details. `SHA256SUMS` verifies the packaged files.
