export function getCategory(path: string) {
  if (path.includes('tv')) {
    return '/tv';
  }
  if (path.includes('movie')) {
    return '/movie';
  }
  return '';
}
