export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function parseJapaneseNumber(text: string): number {
  if (!text) return 0;
  const match = text.match(/[\d.]+/);
  if (!match) return 0;
  
  const value = parseFloat(match[0]);
  const multiplier = text.includes('万') ? 10000 : 1;
  
  return value * multiplier;
}

export function extractYear(text: string): number {
  const match = text.match(/\d{4}/);
  return match ? parseInt(match[0]) : 0;
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}