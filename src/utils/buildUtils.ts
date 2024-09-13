import { BuildState } from '@/contexts/BuildContext';

export function encodeBuildState(state: BuildState): string {
  const json = JSON.stringify(state);
  const utf8Bytes = new TextEncoder().encode(json);
  return btoa(String.fromCharCode.apply(null, Array.from(utf8Bytes))); // Convert to a binary string
}

export function decodeBuildState(encoded: string): BuildState {
  const binaryString = atob(encoded);
  const utf8Bytes = new Uint8Array(binaryString.split('').map(char => char.charCodeAt(0)));
  const json = new TextDecoder().decode(utf8Bytes);
  return JSON.parse(json);
}
