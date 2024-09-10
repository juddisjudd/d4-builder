import spiritboonsData from './spiritboons.json';

interface Boon {
  description: string;
  [key: string]: string | number;
}

interface SpiritBoonsData {
  [category: string]: {
    [boonName: string]: Boon;
  };
}

const spiritboonsDataTyped: SpiritBoonsData = spiritboonsData as SpiritBoonsData;

export interface SpiritBoon {
  name: string;
  icon: string;
  description: string[];
  values: { [key: string]: string | number };
  spirit: string;
}

export const spiritboons: SpiritBoon[] = Object.entries(spiritboonsDataTyped).flatMap(([category, boons]) =>
  Object.entries(boons).map(([boonName, boonData]) => ({
    name: boonName,
    icon: `/images/skills/druid/spiritboons/${category.toLowerCase()}/${boonName.toLowerCase().replace(/ /g, '_')}.png`,
    description: [boonData.description],
    values: Object.fromEntries(Object.entries(boonData).filter(([key]) => key !== 'description')),
    spirit: category,
  }))
);
