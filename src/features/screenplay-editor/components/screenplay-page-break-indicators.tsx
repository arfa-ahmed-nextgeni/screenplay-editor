"use client";

import { useScreenplayEditorState } from "@/features/screenplay-editor/contexts/screenplay-editor-context";

export const ScreenplayPageBreakIndicators = () => {
  const { pageBreakIndices, editorElement } = useScreenplayEditorState();

  return pageBreakIndices.map((breakIndex, i) => {
    if (!editorElement) return null;

    const nodes = Array.from(editorElement.children);
    if (!nodes[breakIndex]) return null;

    const node = nodes[breakIndex] as HTMLElement;
    const top = node.offsetTop;

    return (
      <div
        key={`page-break-${i}`}
        className="absolute left-0 right-0 border-t-2 border-dashed border-blue-300 pointer-events-none"
        style={{
          top: `${top}px`,
        }}
      >
        <span className="absolute right-0 top-0 bg-blue-100 text-blue-800 text-xs px-1 rounded transform -translate-y-full">
          Page {i + 1} End
        </span>
      </div>
    );
  });
};
