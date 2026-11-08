# Field Trip — prepared Cloudflare update

Private Residence, Oakland, 2023: seven owner-reviewed images, numbered 01–07. Four viewpoints, two details, one walking image. No diagram or visible photo titles.

## Deploy from a phone

1. Open this pull request in Safari and sign into GitHub.
2. Review the change, then tap Merge pull request and Confirm merge.
3. Cloudflare Workers Builds should detect the update to main automatically.
4. In Cloudflare, open Workers & Pages → fieldtripdesign → Deployments. Wait for the new build to succeed.
5. Open https://fieldtripdesign.com/work/private-residence and verify the result. A merge is not proof of deployment success.

Existing configuration is preserved: Worker fieldtripdesign; repository adamthabo/fieldtripdesign; branch main; empty build command; npx wrangler deploy. No DNS or Google Workspace email records change. This is a precompiled Worker release, not a Pages drag-and-drop upload.

Build checks passed: 45 public routes, 38 project pages, private-route protection, referenced local assets and seven-image captions. No external Cloudflare deployment has been performed for this update.
