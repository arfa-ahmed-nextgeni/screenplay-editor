"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useCallback, useEffect, useRef, useState } from "react";

import { ScreenplayEditorWarningMarkers } from "@/features/screenplay-editor/components/screenplay-editor-warning-markers";
import { ScreenplayFormatToolbar } from "@/features/screenplay-editor/components/screenplay-format-toolbar";
import { ScreenplayPageBreakIndicators } from "@/features/screenplay-editor/components/screenplay-page-break-indicators";
import {
  INITIAL_SCREENPLAY_EDITOR_CONTENT,
  LINES_PER_PAGE,
  SCREENPLAY_EDITOR_FORMAT,
} from "@/features/screenplay-editor/constants";
import {
  ActionExtension,
  CharacterExtension,
  DialogueExtension,
  ParentheticalExtension,
  SceneHeadingExtension,
} from "@/features/screenplay-editor/editor-extensions";
import styles from "@/features/screenplay-editor/styles/screenplay-editor.module.css";
import { getElementTextLineCount } from "@/features/screenplay-editor/utils";
import { cn } from "@/lib/utils";

export const ScreenplayEditor = () => {
  const editorRef = useRef<HTMLDivElement>(null);

  const [pageBreakIndices, setPageBreakIndices] = useState<number[]>([]);
  const [warnings, setWarnings] = useState<
    { index: number; message: string }[]
  >([]);

  const editorElement = editorRef.current?.firstChild as HTMLElement;

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        paragraph: false,
        heading: false,
        bulletList: false,
        orderedList: false,
        listItem: false,
        codeBlock: false,
      }),
      SceneHeadingExtension,
      ActionExtension,
      CharacterExtension,
      ParentheticalExtension,
      DialogueExtension,
    ],
    content: INITIAL_SCREENPLAY_EDITOR_CONTENT,
    editorProps: {
      attributes: {
        class: cn(
          "focus:outline-none font-mono text-[16px] font-normal pl-[144px] pr-[96px] pt-[80px]"
        ),
      },
    },
    immediatelyRender: false,
    onCreate({ editor }) {
      editor.commands.focus("end");
    },
    onUpdate: () => {
      setTimeout(() => computeEditorPageBreaks(), 200);
    },
  });

  const computeEditorPageBreaks = useCallback(() => {
    if (!editorElement) return;

    const nodes = Array.from(editorElement.children) as HTMLElement[];

    let lineCount = 0;
    const breaks: number[] = [];
    const newWarnings: { index: number; message: string }[] = [];

    nodes.forEach((node, index) => {
      const lines = getElementTextLineCount(node);
      lineCount += lines;

      if (lineCount >= LINES_PER_PAGE) {
        breaks.push(index);

        if (
          node.classList.contains(
            styles[SCREENPLAY_EDITOR_FORMAT.SCENE_HEADING]
          ) &&
          index > 0
        ) {
          newWarnings.push({
            index: index - 1,
            message: "Scene heading should not be at the bottom of a page",
          });
        }

        if (
          node.classList.contains(styles[SCREENPLAY_EDITOR_FORMAT.DIALOGUE]) &&
          index > 0 &&
          nodes[index - 1].classList.contains(
            styles[SCREENPLAY_EDITOR_FORMAT.CHARACTER]
          )
        ) {
          newWarnings.push({
            index,
            message:
              "Dialogue is separated from its character across a page break",
          });
        }

        if (
          node.classList.contains(
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
        ) {
          newWarnings.push({
            index,
            message:
              "Parenthetical is separated from dialogue across a page break",
          });
        }

        lineCount = 0;
      }
    });

    setPageBreakIndices(breaks);
    setWarnings(newWarnings);
  }, [editorElement]);

  useEffect(() => {
    if (editor) {
      computeEditorPageBreaks();
    }
  }, [editor, computeEditorPageBreaks]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold my-4">Screenplay Editor</h1>
      <div className="w-[816px] h-full border border-gray-300 rounded-lg mb-4">
        <ScreenplayFormatToolbar editor={editor} />
        <div className="relative">
          <ScreenplayPageBreakIndicators
            editorElement={editorElement}
            pageBreakIndices={pageBreakIndices}
          />
          <ScreenplayEditorWarningMarkers
            warnings={warnings}
            editorElement={editorElement}
          />
          <EditorContent
            ref={editorRef}
            editor={editor}
            style={{ minHeight: "1776px" }}
          />
        </div>
      </div>
    </div>
  );
};
