export const ScreenplayPageNumbers = ({
  pageBreakIndices,
  editorElement,
}: {
  pageBreakIndices: number[];
  editorElement: HTMLElement;
}) => {
  return (
    <>
      <div className="absolute left-0 right-0 flex justify-end p-4">
        <span>1.</span>
      </div>
      {pageBreakIndices.map((breakIndex, i) => {
        if (!editorElement) return null;

        const nodes = Array.from(editorElement.children);
        if (!nodes[breakIndex]) return null;

        const node = nodes[breakIndex] as HTMLElement;
        const top = node.offsetTop;

        return (
          <div
            key={`page-break-${i}`}
            className="absolute left-0 right-0 flex justify-end p-4"
            style={{
              top: `${top}px`,
            }}
          >
            <span>{i + 2}.</span>
          </div>
        );
      })}
    </>
  );
};
