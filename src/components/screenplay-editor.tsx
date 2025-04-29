"use client";

import { Icon } from "@iconify/react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { Button } from "@/components/ui/button";
import { SCREENPLAY_EDITOR_FORMAT_OPTIONS } from "@/config/constants";

export const ScreenplayEditor = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Hello World! 🌎️</p>",
    editorProps: {
      attributes: {
        class: "focus:outline-none",
      },
    },
    immediatelyRender: false,
  });

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold my-4">Screenplay Editor</h1>
      <div className="w-[80vw] h-full border border-gray-300 rounded-lg p-4 m-4">
        <div className="flex flex-wrap gap-1">
          {SCREENPLAY_EDITOR_FORMAT_OPTIONS.map(({ id, label, icon }) => (
            <Button key={id}>
              <Icon icon={icon} /> {label}
            </Button>
          ))}
        </div>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};
