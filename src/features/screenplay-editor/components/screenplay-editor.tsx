"use client";

import { Icon } from "@iconify/react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useCallback, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  INITIAL_SCREENPLAY_EDITOR_CONTENT,
  LINES_PER_PAGE,
  SCREENPLAY_EDITOR_FORMAT,
  SCREENPLAY_EDITOR_FORMAT_OPTIONS,
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

  const applyScreenplayFormat = useCallback(
    (type: SCREENPLAY_EDITOR_FORMAT) => {
      if (!editor) return;

      editor.chain().focus().setNode(type).run();
    },
    [editor]
  );

  const isFormatActive = useCallback(
    (type: SCREENPLAY_EDITOR_FORMAT) => {
      if (!editor) return false;
      return editor.isActive(type);
    },
    [editor]
  );

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
        <div className="flex flex-wrap gap-1 p-2 border-b border-gray-300">
          {SCREENPLAY_EDITOR_FORMAT_OPTIONS.map(({ id, label, icon }) => (
            <Button
              key={id}
              onClick={() => applyScreenplayFormat(id)}
              variant={isFormatActive(id) ? "default" : "outline"}
            >
              <Icon icon={icon} /> {label}
            </Button>
          ))}
        </div>
        <div className="relative">
          {pageBreakIndices.map((breakIndex, i) => {
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
          })}
          {warnings.map((warning, i) => {
            if (!editorElement) return null;

            const nodes = Array.from(editorElement.children);
            if (!nodes[warning.index]) return null;

            const node = nodes[warning.index] as HTMLElement;
            const top = node.offsetTop;

            return (
              <div
                key={`warning-${i}`}
                className={`absolute right-0 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-l-md z-50`}
                style={{
                  top: `${top}px`,
                }}
              >
                <Tooltip>
                  <TooltipTrigger>
                    <div className="flex flex-row items-center gap-1">
                      <Icon icon="material-symbols:warning-outline" /> Warning
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>{warning.message}</TooltipContent>
                </Tooltip>
              </div>
            );
          })}
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
