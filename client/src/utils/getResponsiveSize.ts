export function getResponsiveSize() {
  const width = window.innerWidth;

  if (width <= 480) {
    return 12;
  } else if (width <= 770) {
    return 16;
  } else if (width <= 1024) {
    return 20;
  } else {
    return 24;
  }
}
