import {
  LINES_PER_PAGE,
  SCREENPLAY_EDITOR_FORMAT,
} from "@/features/screenplay-editor/constants";
import styles from "@/features/screenplay-editor/styles/screenplay-editor.module.css";

export const getElementTextLineCount = (elem: HTMLElement) => {
  const computedStyle = getComputedStyle(elem);
  const lineHeight = parseFloat(computedStyle.lineHeight);

  if (isNaN(lineHeight)) {
    console.warn(
      "Line height is 'normal' or invalid; unable to calculate line count."
    );
    return 0;
  }

  const height = elem.offsetHeight;
  return Math.round(height / lineHeight);
};

function shouldWarnForSceneHeading(node: HTMLElement) {
  return node.classList.contains(
    styles[SCREENPLAY_EDITOR_FORMAT.SCENE_HEADING]
  );
}

function shouldWarnForSplitDialogue(nodes: HTMLElement[], index: number) {
  return (
    nodes[index].classList.contains(
      styles[SCREENPLAY_EDITOR_FORMAT.DIALOGUE]
    ) &&
    index > 0 &&
    nodes[index - 1].classList.contains(
      styles[SCREENPLAY_EDITOR_FORMAT.CHARACTER]
    )
  );
}

function shouldWarnForSplitParenthetical(nodes: HTMLElement[], index: number) {
  return (
    nodes[index].classList.contains(
      styles[SCREENPLAY_EDITOR_FORMAT.PARENTHETICAL]
    ) &&
    index > 0 &&
    index < nodes.length - 1 &&
    nodes[index - 1].classList.contains(
      styles[SCREENPLAY_EDITOR_FORMAT.CHARACTER]
    ) &&
    nodes[index + 1].classList.contains(
      styles[SCREENPLAY_EDITOR_FORMAT.DIALOGUE]
    )
  );
}

export function computeScreenplayPagination({
  editorElement,
}: {
  editorElement: HTMLElement;
}) {
  if (!editorElement) return { breakIndices: [], warnings: [] };

  const nodes = Array.from(editorElement.children) as HTMLElement[];
  let lineCount = 0;
  const breakIndices: number[] = [];
  const warnings: { index: number; message: string }[] = [];

  nodes.forEach((node, index) => {
    const lines = getElementTextLineCount(node);
    lineCount += lines;

    if (lineCount >= LINES_PER_PAGE) {
      breakIndices.push(index);

      if (shouldWarnForSceneHeading(node) && index > 0) {
        warnings.push({
          index: index - 1,
          message: "Scene heading should not be at the bottom of a page",
        });
      }

      if (shouldWarnForSplitDialogue(nodes, index)) {
        warnings.push({
          index,
          message:
            "Dialogue is separated from its character across a page break",
        });
      }

      if (shouldWarnForSplitParenthetical(nodes, index)) {
        warnings.push({
          index,
          message:
            "Parenthetical is separated from dialogue across a page break",
        });
      }

      lineCount = 0;
    }
  });

  return {
    breakIndices,
    warnings,
  };
}
