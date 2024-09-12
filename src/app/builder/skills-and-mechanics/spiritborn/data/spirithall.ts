export interface SpiritData {
  'Primary Passive': string;
  'Secondary Passive': string;
}

export interface SpiritHallData {
  [key: string]: SpiritData;
}

import spiritHallData from './spirithall.json';

export const spiritHall: SpiritHallData = spiritHallData;
