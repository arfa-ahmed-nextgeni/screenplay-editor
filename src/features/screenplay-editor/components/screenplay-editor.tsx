"use client";

import { Icon } from "@iconify/react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useCallback } from "react";

import { Button } from "@/components/ui/button";
import {
  INITIAL_SCREENPLAY_EDITOR_CONTENT,
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
import { cn } from "@/lib/utils";

export const ScreenplayEditor = () => {
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
        class: cn("focus:outline-none font-mono text-base font-normal"),
      },
    },
    immediatelyRender: false,
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
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};
