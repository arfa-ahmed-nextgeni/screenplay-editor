"use client";

import { Editor, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  createContext,
  PropsWithChildren,
  RefObject,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  INITIAL_SCREENPLAY_EDITOR_CONTENT,
  SCREENPLAY_EDITOR_FORMAT,
} from "@/features/screenplay-editor/constants";
import {
  ActionExtension,
  CharacterExtension,
  DialogueExtension,
  ParentheticalExtension,
  SceneHeadingExtension,
} from "@/features/screenplay-editor/editor-extensions";
import { computeScreenplayPagination } from "@/features/screenplay-editor/utils";

type ScreenplayEditorState = {
  editor: Editor | null;
  editorRef: RefObject<HTMLDivElement | null>;
  editorElement: HTMLElement;
  pageBreakIndices: number[];
  warnings: {
    index: number;
    message: string;
  }[];
};

type ScreenplayEditorAction = {
  applyScreenplayFormat: (type: SCREENPLAY_EDITOR_FORMAT) => void;
  isFormatActive: (type: SCREENPLAY_EDITOR_FORMAT) => boolean;
};

export const ScreenplayEditorStateContext = createContext<
  ScreenplayEditorState | undefined
>(undefined);
export const ScreenplayEditorActionContext = createContext<
  ScreenplayEditorAction | undefined
>(undefined);

export const ScreenplayEditorProvider = ({ children }: PropsWithChildren) => {
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
        class:
          "focus:outline-none font-mono text-[16px] font-normal pl-[144px] pr-[96px] pt-[80px]",
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
    <ScreenplayEditorStateContext.Provider
      value={{ editor, pageBreakIndices, warnings, editorRef, editorElement }}
    >
      <ScreenplayEditorActionContext.Provider
        value={{ applyScreenplayFormat, isFormatActive }}
      >
        {children}
      </ScreenplayEditorActionContext.Provider>
    </ScreenplayEditorStateContext.Provider>
  );
};

export const useScreenplayEditorState = () => {
  const context = useContext(ScreenplayEditorStateContext);
  if (!context) {
    throw new Error(
      "useScreenplayEditorState must be used within a ScreenplayEditorProvider"
    );
  }
  return context;
};

export const useScreenplayEditorAction = () => {
  const context = useContext(ScreenplayEditorActionContext);
  if (!context) {
    throw new Error(
      "useScreenplayEditorAction must be used within a ScreenplayEditorProvider"
    );
  }
  return context;
};
