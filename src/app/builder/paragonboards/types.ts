export interface Node {
  name: string;
  icon: string;
  board: string;
  id: string;
  row: number;
  column: number;
  requires?: string[];
  effects?: string[];
  willpower?: number;
  strength?: number;
  dexterity?: number;
  intelligence?: number;
  radius_stat?: string;
  radius_value?: number;
  glyph_radius: boolean;
}

export interface Board {
  id: string;
  title: string;
  nodes: Node[];
  attachedTo?: {
    parentId: string;
    position: 'top' | 'right' | 'bottom' | 'left';
  };
}
