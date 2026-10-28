# Field Trip Design

The launch uses the existing main website directly. There is no separate landing page.

Current site: https://field-trip-design.adamthabo409.chatgpt.site/home

## What this repository contains

This repository contains a temporary redirect to the current published website. It does **not** contain the full React/Vinext application or an independently deployed Cloudflare Worker. The old placeholder homepage has been removed.

If this repository is connected to Cloudflare Pages, `_redirects` sends visitors directly to the current site. The HTML file is a fallback. Query strings continue to the destination. Root and entrance requests continue through the current site's entry routing so existing numbered-ticket links also keep working.

## Full Cloudflare launch

Use the latest **Field-Trip-Cloudflare** release package and its `CLOUDFLARE-START-HERE.md`. It contains the editable application, compiled Worker, static assets and D1 preparation instructions. The full application requires **Cloudflare Workers with Static Assets**, not a no-build Pages upload.

The application redirects `/` and `/entrance` to `/home` in both hosting environments and retains ticket-number handling. Before switching domains, deploy and verify the standalone Worker with real account/database IDs, configure the final canonical origin, and review the domain configuration. Preserve existing mail records.

## Nameserver status

On 28 October 2026, Google Public DNS and Cloudflare's public resolver both returned Squarespace nameservers for `fieldtripdesign.com`. This repository update does not change DNS or establish a Cloudflare deployment.

## Editorial rules

Preserve the approved design, original project photography, precise contributor credits and current content. Do not restore a landing page or substitute the temporary redirect repository for the full application.
