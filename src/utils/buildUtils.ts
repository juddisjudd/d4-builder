import { BuildState } from '@/contexts/BuildContext';

export function encodeBuildState(state: BuildState): string {
  const json = JSON.stringify(state);
  return btoa(json);
}

export function decodeBuildState(encoded: string): BuildState {
  const json = atob(encoded);
  return JSON.parse(json);
}