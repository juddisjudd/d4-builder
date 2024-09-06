import codexData from './codex.json';

export interface AspectData {
  name: string;
  new?: boolean;
  type: string;
  legendary: boolean;
  campaign: boolean;
  dungeon?: string;
  location?: string;
  class?: string;
  filters?: string[];
  description: string;
}

export const codex: AspectData[] = codexData.codexes;