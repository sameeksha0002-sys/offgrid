# Keeping emergency pages out of search results

Written by [SANJANA BIJU] (@[sanjanabijumac-ops]). My part in OFFGRID: I worked on adding a robots.txt file to prevent emergency live-status pages from appearing in search engine results.

## The idea

When someone sends an SOS from OFFGRID, their emergency contacts get a link to a live-status page. That page shows a map with the person's location, so it must never show up in Google or other search results.

## What the file does

A website can include a file called `robots.txt` that tells search engines which pages to leave alone. Ours says:

- Allow search engines to list the normal site.
- Do not list any address that contains `view=sos-status`. That is how the live-status page address is written.
- Do not list any address that contains `token=`, which is the secret code in those links.

Once the site is deployed, the file is available at the website's `/robots.txt` address.

## Where the code lives

- `apps/web/public/robots.txt`: the file. Anything in the `public` folder is copied to the website as it is.

## Limits

`robots.txt` is a polite request to search engines, not a lock. Well-behaved ones follow it, but it does not stop anyone who has the link. The real protection is that the link contains a long random code and the page expires 72 hours after the SOS ends. This file is an extra layer on top of that.

## What I worked on

I created the robots.txt file to help prevent emergency live-status pages from appearing in search results. I understood how the Disallow rules work and why protecting emergency location links is important. I also checked the file contents to ensure the correct rules were included.

_Drafted with an AI assistant from the project's code, then checked and edited by [Sanjana Biju]._
