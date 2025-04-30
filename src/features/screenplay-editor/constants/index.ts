import styles from "@/features/screenplay-editor/styles/screenplay-editor.module.css";

export const enum SCREENPLAY_EDITOR_FORMAT {
  SCENE_HEADING = "screenplay-scene-heading",
  ACTION = "screenplay-action",
  CHARACTER = "screenplay-character",
  PARENTHETICAL = "screenplay-parenthetical",
  DIALOGUE = "screenplay-dialogue",
}

export const SCREENPLAY_EDITOR_FORMAT_OPTIONS = [
  {
    id: SCREENPLAY_EDITOR_FORMAT.SCENE_HEADING,
    label: "Scene Heading",
    icon: "uil:scenery",
  },
  {
    id: SCREENPLAY_EDITOR_FORMAT.ACTION,
    label: "Action",
    icon: "mdi:run",
  },
  {
    id: SCREENPLAY_EDITOR_FORMAT.CHARACTER,
    label: "Character",
    icon: "game-icons:character",
  },
  {
    id: SCREENPLAY_EDITOR_FORMAT.PARENTHETICAL,
    label: "Parenthetical",
    icon: "hugeicons:first-bracket",
  },
  {
    id: SCREENPLAY_EDITOR_FORMAT.DIALOGUE,
    label: "Dialogue",
    icon: "solar:dialog-bold",
  },
];

export const INITIAL_SCREENPLAY_EDITOR_CONTENT = `
<p class="${styles[SCREENPLAY_EDITOR_FORMAT.SCENE_HEADING]}">INT. COFFEE SHOP - DAY</p>
<p class="${styles[SCREENPLAY_EDITOR_FORMAT.ACTION]}">Sarah types furiously on her laptop.</p>
<p class="${styles[SCREENPLAY_EDITOR_FORMAT.CHARACTER]}">DAVID</p>
<p class="${styles[SCREENPLAY_EDITOR_FORMAT.PARENTHETICAL]}">(sarcastically)</p>
<p class="${styles[SCREENPLAY_EDITOR_FORMAT.DIALOGUE]}">We need more coffee.</p>
`;

export const LINES_PER_PAGE = 28;
