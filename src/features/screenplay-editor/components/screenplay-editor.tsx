"use client";

import { Icon } from "@iconify/react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useCallback, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
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
import { getElementTextLineCount } from "@/features/screenplay-editor/utils";
import { cn } from "@/lib/utils";

export const ScreenplayEditor = () => {
  const editorRef = useRef<HTMLDivElement>(null);

  const [pageBreakIndices, setPageBreakIndices] = useState<number[]>([]);

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
        class: cn("focus:outline-none font-mono text-[16px] font-normal"),
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

    nodes.forEach((node, index) => {
      const lines = getElementTextLineCount(node);
      lineCount += lines;

      if (lineCount >= LINES_PER_PAGE) {
        breaks.push(index);
        lineCount = 0;
      }
    });

    setPageBreakIndices(breaks);
  }, [editorElement]);

  useEffect(() => {
    if (editor) {
      computeEditorPageBreaks();
    }
  }, [editor, computeEditorPageBreaks]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold my-4">Screenplay Editor</h1>
      <div className="w-[80vw] h-full border border-gray-300 rounded-lg p-4 m-4">
        <div className="flex flex-wrap gap-1">
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
        <div className="relative border border-gray-300 rounded-lg mt-2">
          {pageBreakIndices.map((breakIndex, i) => {
            if (!editorElement) return null;

            const nodes = Array.from(editorElement.children);
            if (!nodes[breakIndex]) return null;

            const node = nodes[breakIndex] as HTMLElement;
            const top = node.offsetTop;

            return (
              <div
                key={i}
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
          <EditorContent
            ref={editorRef}
            editor={editor}
            style={{ minHeight: "50vh" }}
          />
        </div>
      </div>
    </div>
  );
};
