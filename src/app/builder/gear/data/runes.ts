import runesData from './runes.json';

export interface RuneData {
  name: string;
  type: 'Ritual' | 'Invocation';
  rarity: 'Legendary' | 'Rare' | 'Magic';
  gain?: number;
  bonus: string;
  requires?: number | string;
  overflow?: string;
  cooldown?: number;
}

export const runes: RuneData[] = runesData.runes as RuneData[];

// Helper functions to filter runes
export const getRitualRunes = (): RuneData[] => runes.filter(rune => rune.type === 'Ritual');
export const getInvocationRunes = (): RuneData[] => runes.filter(rune => rune.type === 'Invocation');

export const getLegendaryRunes = (): RuneData[] => runes.filter(rune => rune.rarity === 'Legendary');
export const getRareRunes = (): RuneData[] => runes.filter(rune => rune.rarity === 'Rare');
export const getMagicRunes = (): RuneData[] => runes.filter(rune => rune.rarity === 'Magic');

// Function to get a rune by name
export const getRuneByName = (name: string): RuneData | undefined => 
  runes.find(rune => rune.name.toLowerCase() === name.toLowerCase());