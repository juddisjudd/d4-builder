import gemData from './gems.json';

export interface GemData {
  name: string;
  weapon: string;
  armor: string;
  jewelry: string;
}

export const gems: GemData[] = gemData.gems;