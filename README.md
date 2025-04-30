# Screenplay Editor with Page Awareness

A basic screenplay editor built using React (Next.js) and TipTap that supports essential screenplay formatting and a conceptual page boundary awareness feature based on standard screenplay rules.

## Features

- Add and edit screenplay elements:
  Scene Heading, Action, Character, Parenthetical, Dialogue
- Automatically apply basic formatting rules per element
- Page awareness estimation (55 lines per page)
- Visual page break indicators
- Rule-based page break warnings
- Built using TipTap, Tailwind CSS, and Next.js App Router

## Research Summary: Screenplay Formatting

Formatting was implemented based on information gathered from the following references:

- [StudioBinder – Screenplay Margins](https://www.studiobinder.com/blog/screenplay-margins/)
- [StudioBinder – How to Write a Screenplay](https://www.studiobinder.com/blog/how-to-write-a-screenplay)
- [NFI – Screenplay Format](https://www.nfi.edu/screenplay-format)
- [Scribophile – How to Format a Screenplay](https://www.scribophile.com/academy/how-to-format-a-screenplay)
- ChatGPT assisted in confirming and validating standard practices.

Key Formatting Rules Implemented:

> **Editor width:** 816px<br>**Padding:** 144px left, 96px right, 80px top

| Element       | Style                                                   |
| ------------- | ------------------------------------------------------- |
| Scene Heading | UPPERCASE, left-aligned, 16px from top                  |
| Action        | Left-aligned, 16px from top                             |
| Character     | UPPERCASE, indented (192px from left) and 16px from top |
| Parenthetical | Indented (144px from left), 50% width                   |
| Dialogue      | Indented (96px from left), 60% width                    |

## Why TipTap?

I chose TipTap because:

- I’ve worked with TipTap previously, allowing me to implement complex editing logic more efficiently and focus on the core challenge of page awareness.
- Rich plugin system and great community support
- Easy to define custom nodes for each screenplay element.

## Page Awareness Logic

To help simulate how a screenplay would be laid out on real pages, I added basic page awareness using the following steps:

1. **Count Lines:** For each block (like Dialogue or Action), I calculate how many lines it takes by dividing its height by the line height. For example:

```plaintext
export const getElementTextLineCount = (elem: HTMLElement) => {
  const computedStyle = getComputedStyle(elem);
  const lineHeight = parseFloat(computedStyle.lineHeight);

  const height = elem.offsetHeight;
  return Math.round(height / lineHeight);
};
```

2. **Track Total Lines:** Call the function for total lines calculation as the user types.
3. **Show Page Breaks:** Once the total reaches 55 lines (one screenplay page), I display a horizontal line to visually mark a page break.
4. **Warn About Formatting Issues:** Show warnings when:
   1. If a Scene Heading ends up as the last line of a page.
   2. If a Character cue is on one page but their Dialogue starts on the next.
   3. If a Parenthetical is separated from its Dialogue.
5. **Display Page Numbers:** A page number appears at the top-right corner of each estimated page.

## Testing Strategy

For this project, I would focus mainly on unit tests to ensure core logic works as expected. Since it's a UI-heavy component, the goal is to test the logic behind formatting and page awareness. So, I would test:

- **Line count calculation:** Make sure the function that calculates line count from element height and line height gives accurate results.
- **Page break logic:** Test that a page break is inserted after 55 lines.
- **Warning rules:** Check that the warning logic correctly identifies:
  - Scene Heading as the last line on a page.
  - Character and Dialogue being split across pages.
  - Parenthetical being separated from Dialogue.
- **Page numbering:** Make sure the page number increases only after 55 lines.

## Known Limitations & Trade-offs

- The page awareness logic is based on rough line counting, not exact pixel-perfect measurements.
- Some warning messages might show up incorrectly in rare cases, especially if an element has an unusual height or layout.

## WYSIWYG Pagination – Real-World Approach

- It's possible to build true WYSIWYG pagination (like Google Docs or Final Draft) using TipTap.
- You can measure content height and insert page breaks when content overflows a fixed-height page.
- Each page could be treated as a container matching the size of a real paper page (e.g. US Letter).
- TipTap allows enough control to create custom layouts and split content across pages.

**Challenges:**

- Keeping layout consistent across screen sizes and zoom levels.
- Avoiding awkward breaks (e.g. character name on one page, dialogue on the next).
- Updating layout in real time as the user types.
- Performance concerns for long scripts.

TipTap doesn’t handle pagination automatically, but it gives you the tools to build it with extra work.

## Tech Stack

- Next.js (App Router)
- TipTap Editor – for rich text editing
- Tailwind CSS – for styling
- TypeScript – type-safe development
- Shadcn – for UI components
- Iconify – for icons
- ESLint + Prettier + Husky + lint-staged – for consistent and clean codebase

## Running the Application

1. Clone the repo from https://github.com/arfa-ahmed-nextgeni/screenplay-editor.git
2. Run the following commands:

```shellscript
npm install
npm run dev
```
