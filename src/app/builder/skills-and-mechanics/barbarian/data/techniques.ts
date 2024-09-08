import techniquesData from './techniques.json';

export interface Technique {
  name: string;
  icon: string;
  description: string[];
  values: { [key: string]: string | number };
}

export const techniques: Technique[] = Object.entries(techniquesData).map(([name, data]) => ({
  name,
  icon: `/images/skills/barbarian/technique/${name.toLowerCase().replace(/ /g, '_')}.png`,
  ...data,
}));