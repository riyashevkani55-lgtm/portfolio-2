# Personal profile page audit

This file reviews `index.html`, `style.css`, and `script.js` against the requested structure and common quality checks.

## Requirement checklist

| Requirement | Status | Notes |
| --- | --- | --- |
| HTML lives in `index.html` | Met | Semantic document with header, main, sections, and footer. |
| All styling in `style.css` | Met | Linked from the document head. No `style=""` attributes in HTML. |
| Separate `script.js` | Met | Linked at the end of `body`. Sets the footer year and highlights the current nav section. |
| Page title | Met | `<title>PLACEHOLDER Full Name \| Personal Profile</title>` |
| One main heading | Met | A single `<h1>` with `PLACEHOLDER Full Name`. Section titles use `<h2>`. |
| About section | Met | `#about` with two placeholder paragraphs. |
| Skills section as a list | Met | `#skills` uses a `<ul>` of five placeholder skills. |
| Projects section with links | Met | `#projects` lists three projects, each with an `<a href>` and a short description. |
| Unknown details marked PLACEHOLDER | Met | Names, headline, copy, skills, project titles, URLs, and copyright name all include the word `PLACEHOLDER`. |

## Structure and accessibility

- Landmark regions: `header`, `nav`, `main`, `footer`.
- Skip link jumps to `#main`.
- Sections are labelled with `aria-labelledby`.
- Navigation uses a list of in-page anchors.
- Color contrast is intended to meet readable dark-on-light text; accent links are a deep red on cream.
- External project URLs currently use placeholder hostnames and should be replaced before publishing.

## Styling review

- Layout is centered, readable, and constrained to a comfortable measure.
- Sticky header and card-style sections keep the page scannable.
- A small-screen breakpoint stacks the header brand and nav.
- Fonts load from Google Fonts; the page still falls back to system fonts if those requests fail.

## JavaScript review

- Footer copyright year is filled from the current date.
- Scroll position updates an `is-active` class on primary nav links.
- Script is wrapped in an IIFE and does not depend on a build step.

## PLACEHOLDER inventory

Search the project for `PLACEHOLDER` and replace each of the following:

1. Full name (title, heading, brand, footer)
2. Professional headline
3. About paragraphs
4. Five skills
5. Three project names, descriptions, and URLs

## Suggested next edits

- Replace placeholder URLs with real project pages or GitHub repositories.
- Add contact information if you want visitors to reach you.
- Confirm that project links use `https` and open the intended destinations.
