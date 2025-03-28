export function cleanText(text: string): string {
  // Use a regex to match all instances of '?', '!', and '"'
  return text.replace(/[?!"]/g, "");
}
