import Paragraph from "@tiptap/extension-paragraph";

import { SCREENPLAY_EDITOR_FORMAT } from "@/features/screenplay-editor/constants";
import styles from "@/features/screenplay-editor/styles/screenplay-editor.module.css";

export const SceneHeadingExtension = Paragraph.extend({
  name: SCREENPLAY_EDITOR_FORMAT.SCENE_HEADING,
  group: "block",

  parseHTML() {
    return [{ tag: `p.${styles[SCREENPLAY_EDITOR_FORMAT.SCENE_HEADING]}` }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "p",
      {
        ...HTMLAttributes,
        class: styles[SCREENPLAY_EDITOR_FORMAT.SCENE_HEADING],
      },
      0,
    ];
  },
});

export const ActionExtension = Paragraph.extend({
  name: SCREENPLAY_EDITOR_FORMAT.ACTION,
  group: "block",

  parseHTML() {
    return [{ tag: `p.${styles[SCREENPLAY_EDITOR_FORMAT.ACTION]}` }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "p",
      { ...HTMLAttributes, class: styles[SCREENPLAY_EDITOR_FORMAT.ACTION] },
      0,
    ];
  },
});

export const CharacterExtension = Paragraph.extend({
  name: SCREENPLAY_EDITOR_FORMAT.CHARACTER,
  group: "block",

  parseHTML() {
    return [{ tag: `p.${styles[SCREENPLAY_EDITOR_FORMAT.CHARACTER]}` }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "p",
      { ...HTMLAttributes, class: styles[SCREENPLAY_EDITOR_FORMAT.CHARACTER] },
      0,
    ];
  },
});

export const ParentheticalExtension = Paragraph.extend({
  name: SCREENPLAY_EDITOR_FORMAT.PARENTHETICAL,
  group: "block",

  parseHTML() {
    return [{ tag: `p.${styles[SCREENPLAY_EDITOR_FORMAT.PARENTHETICAL]}` }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "p",
      {
        ...HTMLAttributes,
        class: styles[SCREENPLAY_EDITOR_FORMAT.PARENTHETICAL],
      },
      0,
    ];
  },
});

export const DialogueExtension = Paragraph.extend({
  name: SCREENPLAY_EDITOR_FORMAT.DIALOGUE,
  group: "block",

  parseHTML() {
    return [{ tag: `p.${styles[SCREENPLAY_EDITOR_FORMAT.DIALOGUE]}` }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "p",
      { ...HTMLAttributes, class: styles[SCREENPLAY_EDITOR_FORMAT.DIALOGUE] },
      0,
    ];
  },
});
