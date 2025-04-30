"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useCallback, useEffect, useRef, useState } from "react";

import { ScreenplayEditorWarningMarkers } from "@/features/screenplay-editor/components/screenplay-editor-warning-markers";
import { ScreenplayFormatToolbar } from "@/features/screenplay-editor/components/screenplay-format-toolbar";
import { ScreenplayPageBreakIndicators } from "@/features/screenplay-editor/components/screenplay-page-break-indicators";
import { ScreenplayPageNumbers } from "@/features/screenplay-editor/components/screenplay-page-numbers";
import { INITIAL_SCREENPLAY_EDITOR_CONTENT } from "@/features/screenplay-editor/constants";
import {
  ActionExtension,
  CharacterExtension,
  DialogueExtension,
  ParentheticalExtension,
  SceneHeadingExtension,
} from "@/features/screenplay-editor/editor-extensions";
import { computeScreenplayPagination } from "@/features/screenplay-editor/utils";
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
      setTimeout(() => updateScreenplayPagination(), 200);
    },
  });

  const updateScreenplayPagination = useCallback(() => {
    const { breakIndices, warnings } = computeScreenplayPagination({
      editorElement,
    });

    setPageBreakIndices(breakIndices);
    setWarnings(warnings);
  }, [editorElement]);

  useEffect(() => {
    if (editor) {
      updateScreenplayPagination();
    }
  }, [editor, updateScreenplayPagination]);

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
          <ScreenplayPageNumbers
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
