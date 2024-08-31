import uniqueData from './uniques.json';

export interface UniqueData {
  name: string;
  class?: string;
  type: string;
  mythic?: boolean;
  secondary_stats?: string[];
  terciary_stats?: string[];
  filters?: string[];
  effect: string;
  flavor?: string;
  icon?: boolean;
}

export const uniques: UniqueData[] = uniqueData.uniques;