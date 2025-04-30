import { ScreenplayEditorContent } from "@/features/screenplay-editor/components/screenplay-editor-content";
import { ScreenplayEditorWarningMarkers } from "@/features/screenplay-editor/components/screenplay-editor-warning-markers";
import { ScreenplayFormatToolbar } from "@/features/screenplay-editor/components/screenplay-format-toolbar";
import { ScreenplayPageBreakIndicators } from "@/features/screenplay-editor/components/screenplay-page-break-indicators";
import { ScreenplayPageNumbers } from "@/features/screenplay-editor/components/screenplay-page-numbers";
import { ScreenplayEditorProvider } from "@/features/screenplay-editor/contexts/screenplay-editor-context";

export const ScreenplayEditor = () => {
  return (
    <ScreenplayEditorProvider>
      <div className="w-full h-full flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold my-4">Screenplay Editor</h1>
        <div className="w-[816px] h-full border border-gray-300 rounded-lg mb-4">
          <ScreenplayFormatToolbar />
          <div className="relative">
            <ScreenplayPageBreakIndicators />
            <ScreenplayPageNumbers />
            <ScreenplayEditorWarningMarkers />
            <ScreenplayEditorContent />
          </div>
        </div>
      </div>
    </ScreenplayEditorProvider>
  );
};
