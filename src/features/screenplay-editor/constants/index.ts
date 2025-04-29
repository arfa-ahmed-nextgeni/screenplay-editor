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
