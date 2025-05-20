export function getCurrentDateKo() {
  return new Date(new Date().getTime() + 9 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0];
}
