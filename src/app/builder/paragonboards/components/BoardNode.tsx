import React from 'react';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';
import { Node } from '../types';

interface BoardNodeProps {
  node: Node;
  isSelected: boolean;
  canSelect: boolean;
  isAdjacent: boolean;
  onSelect: () => void;
}

const BoardNode: React.FC<BoardNodeProps> = ({ node, isSelected, canSelect, isAdjacent, onSelect }) => {
  const getNodeColor = () => {
    switch (node.name) {
      case 'Normal Node':
        return 'bg-gray-400';
      case 'Magic Node':
        return 'bg-blue-400';
      case 'Rare Node':
        return 'bg-yellow-400';
      case 'Legendary Node':
        return 'bg-orange-400';
      case 'Glyph Socket':
        return 'bg-purple-400';
      default:
        return 'bg-gray-300';
    }
  };

  return (
    <HoverCard>
      <HoverCardTrigger>
        <div
          onClick={(e) => {
            e.stopPropagation();
            if (canSelect) onSelect();
          }}
          className={`h-[30px] w-[30px] cursor-pointer rounded-full ${getNodeColor()} ${isSelected ? 'ring-2 ring-green-500' : ''} ${!isSelected && canSelect ? 'ring-2 ring-green-500' : ''} ${!isSelected && isAdjacent ? 'ring-2 ring-red-500' : ''} `}
        />
      </HoverCardTrigger>
      <HoverCardContent>
        <h4>{node.name}</h4>
        <p>{node.effects?.join(', ')}</p>
      </HoverCardContent>
    </HoverCard>
  );
};

export default BoardNode;
