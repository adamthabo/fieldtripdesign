# Field Trip — Cloudflare release v575

This folder contains the ready-to-deploy public portfolio, including the corrected full-width Currently On Display landscape photographs. It matches the public design and content of Sites v575, published November 2, 2026.

## Put these files in GitHub Desktop

1. Unzip Field-Trip-GitHub-v575.zip.
2. In GitHub Desktop, select the existing **fieldtripdesign** repository and **main** branch.
3. Choose **Repository → Show in Finder** (Shift–Command–F on a Mac).
4. Copy the **contents** of this extracted folder into that repository folder. Replace the existing README.md, index.html and _redirects when Finder asks. Keep the repository folder itself and its hidden .git folder. Do not copy the ZIP or put the enclosing Field-Trip-GitHub-v575 folder inside the repository.
5. The repository should now directly contain **wrangler.jsonc**, **package.json**, **server**, and **assets**.
6. Return to GitHub Desktop. Review the Changes tab. Enter **Update website to v575 — fix homepage image framing** in Summary and click **Commit to main**.
7. Click **Push origin**. Cloudflare should start its connected build automatically.

## Existing Cloudflare settings

- Worker: **fieldtripdesign**
- Repository: **adamthabo/fieldtripdesign**
- Branch: **main**
- Root directory: **/**
- Build command: **leave empty** (the site is already compiled)
- Deploy command: **npx wrangler deploy**
- No API keys or account IDs need to be pasted into these files. The existing Cloudflare GitHub build integration supplies deployment authorization.

After the deployment shows success, open https://fieldtripdesign.adamthabo.workers.dev/home and check the Home carousel, Projects, About and Contact. Connect fieldtripdesign.com after the deployment is verified; this package does not change DNS or email settings.

## Release contents and portability

The public pages, films, original photographs, navigation, theme, motion and captions come from Sites v575. The public image metadata correction is included without requiring a separate database. Canonical metadata points to fieldtripdesign.com.

This is a precompiled deployment package: edit the canonical Site source for future changes and export a fresh release. The Sites owner editor, private request records and administration routes are not exported. Legacy object-request links lead to Contact on this public deployment. External Vimeo/Squarespace-hosted films continue to depend on those providers; the MCNY Home excerpt is included locally.

The root index.html and _redirects replace the old temporary redirect files. Cloudflare serves the actual application from server/ and assets/ using wrangler.jsonc.

RELEASE.json records provenance and checks. SHA256SUMS records file integrity. Cloudflare deployment itself is completed only after you push and the connected build succeeds.
