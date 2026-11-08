# Field Trip Cloudflare release

## 8 November 2026: project ordering

Private Residence now appears immediately after Klaus Biesenbach Residence on Projects and in the Residential filter. The residence sequence is David Bowie Residence, Klaus Biesenbach Residence, then Private Residence.

The Private Residence project retains its seven owner-reviewed images, numbered 01–07: four viewpoints, two details, and one walking image. Project URL: https://fieldtripdesign.com/work/private-residence .

## Deployment

This repository contains the precompiled release for the existing Cloudflare Worker `fieldtripdesign`. The production branch is `main`, the build command is empty, and the deploy command is `npx wrangler deploy`.

Cloudflare Workers Builds reports the result of each deployment. A GitHub merge alone does not confirm that the production deployment succeeded. Check Workers & Pages → fieldtripdesign → Deployments, then https://fieldtripdesign.com/work .

## Validation

The rebuilt Worker passed the public route and asset checks covering 45 public routes and 38 project pages. Compiled page checks confirmed that Private Residence directly follows Klaus Biesenbach in the main archive and Residential results, and that the seven numbered image captions remain intact. Build-only prerender metadata is excluded from this deployment package.

`RELEASE.json` records the saved source commit and validation details. `SHA256SUMS` verifies the packaged files.
