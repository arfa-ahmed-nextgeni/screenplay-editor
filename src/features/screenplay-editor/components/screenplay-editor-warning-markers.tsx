import { Icon } from "@iconify/react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const ScreenplayEditorWarningMarkers = ({
  warnings,
  editorElement,
}: {
  warnings: {
    index: number;
    message: string;
  }[];
  editorElement: HTMLElement;
}) => {
  return warnings.map((warning, i) => {
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
  });
};
