"use client";

import { EditorContent } from "@tiptap/react";

import { useScreenplayEditorState } from "@/features/screenplay-editor/contexts/screenplay-editor-context";

export const ScreenplayEditorContent = () => {
  const { editorRef, editor } = useScreenplayEditorState();

  return (
    <EditorContent
      ref={editorRef}
      editor={editor}
      style={{ minHeight: "1776px" }}
    />
  );
};
