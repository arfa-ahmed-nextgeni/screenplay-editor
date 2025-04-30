import { Icon } from "@iconify/react";
import { Editor } from "@tiptap/react";
import { useCallback } from "react";

import { Button } from "@/components/ui/button";
import {
  SCREENPLAY_EDITOR_FORMAT,
  SCREENPLAY_EDITOR_FORMAT_OPTIONS,
} from "@/features/screenplay-editor/constants";

export const ScreenplayFormatToolbar = ({
  editor,
}: {
  editor: Editor | null;
}) => {
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
  );
};
