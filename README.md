# 🎬 Screenplay Editor with Page Awareness

## Project Overview

A simplified screenplay editor built with Next.js (App Router) and TipTap editor that supports essential screenplay elements, basic formatting based on industry standards, and a conceptual page-awareness feature that mimics traditional screenwriting constraints (e.g., 55 lines per page).

## Features

- Support for Scene Headings, Action, Character, Parenthetical, and Dialogue elements
- Basic formatting based on industry screenplay conventions (indentation, capitalization, margins)
- Approximate page awareness with visual indicators for page breaks
- Rule-based warnings for bad page break placements:
  - Scene heading near the bottom of a page
  - Character name split from its dialogue
  - Parenthetical split from its dialogue

## Why TipTap?

I chose TipTap for the following reasons:

- **Experience familiarity**: I’ve worked with TipTap previously, allowing me to implement complex editing logic more efficiently and focus on the core challenge of page awareness.
- **Extensibility**: Easily supports custom block-level nodes like Scene Heading or Dialogue, which are crucial for screenplay structure.
- **Customization**: It allows custom rendering and styling of content blocks, which helped apply screenplay-specific formatting rules.

## Screenplay Formatting Rules

Formatting was implemented based on information gathered from the following references:

- [StudioBinder – Screenplay Margins](https://www.studiobinder.com/blog/screenplay-margins/)
- [StudioBinder – How to Write a Screenplay](https://www.studiobinder.com/blog/how-to-write-a-screenplay)
- [NFI – Screenplay Format](https://www.nfi.edu/screenplay-format)
- [Scribophile – How to Format a Screenplay](https://www.scribophile.com/academy/how-to-format-a-screenplay)
- ChatGPT assisted in confirming and validating standard practices.
- Inch-to-pixel conversions were calculated using: [unitconverters.net](https://www.unitconverters.net/typography/inch-to-pixel-x.htm)

Implemented formatting examples:

- **Editor**: Fixed width of 816px, with padding of 144px from the left, 96px from the right, and 80px from the top.
- **Scene Headings**: Uppercased, aligned to the left, with 16px spacing above.
- **Action**: Left-aligned, with 16px spacing above.
- **Character**: Uppercased, aligned to the left with a left margin of 192px, and 16px spacing above.
- **Parenthetical**: Left-aligned, indented 144px from the left, with a width of 50%.
- **Dialogue**: Left-aligned, indented 96px from the left, with a width of 60%.

## Tech Stack

- Next.js (App Router)
- TipTap Editor – for rich text editing
- Tailwind CSS – utility-first styling (with some custom CSS)
- TypeScript – type-safe development
- Shadcn/UI – for UI components
- Iconify – for icons
- ESLint – for code linting and standards enforcement
- Prettier – for code formatting
- Husky – for Git pre-commit hooks
- lint-staged – to run linters on staged files before committing

## Running the Application

1. Clone the repo from https://github.com/arfa-ahmed-nextgeni/screenplay-editor.git
2. Run the following commands:

```shellscript
npm install
npm run dev
```
