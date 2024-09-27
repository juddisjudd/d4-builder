import { Board, Node } from '../types';

export const loadBoardData = async (className: string): Promise<Board[]> => {
  try {
    const boardData = await import(`../${className.toLowerCase()}/data/boards.json`);
    return Object.entries(boardData).map(([title, nodes]) => ({
      id: `${className.toLowerCase()}_${title.replace(/\s+/g, '_').toLowerCase()}`,
      title,
      nodes: Array.isArray(nodes) ? (nodes as Node[]) : [],
      attachedTo: title === 'Starting Board' ? undefined : { parentId: '', position: 'top' as const },
    }));
  } catch (error) {
    console.error(`Failed to load board data for class ${className}:`, error);
    return [];
  }
};
