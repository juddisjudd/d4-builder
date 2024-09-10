// src/app/builder/skills-and-mechanics/rogue/data/specializations.ts

import specializationsData from './specializations.json';

export interface Specialization {
  name: string;
  description: string;
  values?: { [key: string]: number | string };
}

export const specializations: Specialization[] = Object.entries(specializationsData).map(([name, data]) => ({
  name,
  description: data.Description,
  values: Object.fromEntries(Object.entries(data).filter(([key]) => key !== 'Description')) as {
    [key: string]: number | string;
  },
}));
