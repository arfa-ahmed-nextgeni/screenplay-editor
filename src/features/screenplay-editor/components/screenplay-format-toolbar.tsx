"use client";

import { Icon } from "@iconify/react";

import { Button } from "@/components/ui/button";
import { SCREENPLAY_EDITOR_FORMAT_OPTIONS } from "@/features/screenplay-editor/constants";
import { useScreenplayEditorAction } from "@/features/screenplay-editor/contexts/screenplay-editor-context";

export const ScreenplayFormatToolbar = () => {
  const { applyScreenplayFormat, isFormatActive } = useScreenplayEditorAction();

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
