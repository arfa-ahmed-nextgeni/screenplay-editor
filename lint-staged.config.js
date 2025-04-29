import path from "path";

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(" --file ")}`;

/** @type {import('lint-staged').Configuration} */
const config = {
  "*.{js,jsx,ts,tsx}": [buildEslintCommand],
  "*": "prettier --write --ignore-unknown",
};

export default config;
