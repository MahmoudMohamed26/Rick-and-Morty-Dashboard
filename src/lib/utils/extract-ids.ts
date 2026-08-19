export function extractIdsFromUrls(urls: string[]): number[] {
  return urls
    .map((url) => {
      const match = url.match(/\/(\d+)$/);
      return match ? Number(match[1]) : null;
    })
    .filter((id): id is number => id !== null);
}
