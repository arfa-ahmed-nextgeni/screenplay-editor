export const getElementTextLineCount = (elem: HTMLElement): number => {
  const computedStyle = getComputedStyle(elem);
  const lineHeight = parseFloat(computedStyle.lineHeight);

  if (isNaN(lineHeight)) {
    console.warn(
      "Line height is 'normal' or invalid; unable to calculate line count."
    );
    return 0;
  }

  const height = elem.offsetHeight;
  return Math.round(height / lineHeight);
};
