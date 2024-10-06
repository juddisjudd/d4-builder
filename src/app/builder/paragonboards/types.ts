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
  selectedGlyph: any;
  id: string;
  title: string;
  nodes: Node[];
  selectedNodes: string[];
  attachedTo?: {
    parentId: string;
    position: 'top' | 'right' | 'bottom' | 'left';
  };
  gates: {
    top: string | null;
    right: string | null;
    bottom: string | null;
    left: string | null;
  };
  rotation: 0 | 90 | 180 | 270;
  showControls: boolean;
}

export interface BoardConnection {
  sourceBoardId: string;
  targetBoardId: string;
  sourceGate: 'top' | 'right' | 'bottom' | 'left';
  targetGate: 'top' | 'right' | 'bottom' | 'left';
}

export interface ParagonBoardState {
  boards: { [id: string]: Board };
  connections: BoardConnection[];
  totalPoints: number;
  usedPoints: number;
}
