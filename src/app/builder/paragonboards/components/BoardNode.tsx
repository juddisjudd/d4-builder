import React from 'react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Node } from '../types';

interface BoardNodeProps {
  node: Node;
  isSelected: boolean;
  canSelect: boolean;
  isStartingNode: boolean;
  selectedClass: string;
  onSelect: () => void;
}

const BoardNode: React.FC<BoardNodeProps> = ({
  node,
  isSelected,
  canSelect,
  isStartingNode,
  selectedClass,
  onSelect,
}) => {
  const getNodeImage = () => {
    if (isStartingNode) {
      return `/images/paragon/nodes/${selectedClass.toLowerCase()}/${selectedClass.toLowerCase()}_start_node.png`;
    }

    switch (node.name) {
      case 'Normal Node':
        if (node.strength) return '/images/paragon/nodes/normal_str.png';
        if (node.dexterity) return '/images/paragon/nodes/normal_dex.png';
        if (node.intelligence) return '/images/paragon/nodes/normal_int.png';
        if (node.willpower) return '/images/paragon/nodes/normal_will.png';
        return '/images/paragon/nodes/normal_str.png';
      case 'Magic Node':
        return '/images/paragon/nodes/magic_node.png';
      case 'Rare Node':
        return '/images/paragon/nodes/rare_node.png';
      case 'Legendary Node':
        return '/images/paragon/nodes/legendary_node.png';
      case 'Glyph Socket':
        return '/images/paragon/nodes/glyph_socket.png';
      default:
        return '/images/paragon/nodes/normal_str.png';
    }
  };

  return (
    <HoverCard>
      <HoverCardTrigger>
        <div
          onClick={() => {
            if (canSelect && !isStartingNode) onSelect();
          }}
          className={`relative h-[45px] w-[45px] cursor-pointer rounded-full ${
            isSelected ? 'ring-0 ring-zinc-400' : canSelect ? 'ring-2 ring-red-800' : ''
          }`}
        >
          <div
            className={`absolute inset-0 rounded-full bg-cover bg-center bg-no-repeat ${
              !isSelected && !isStartingNode ? 'opacity-50' : ''
            }`}
            style={{ backgroundImage: `url(${getNodeImage()})` }}
          />
        </div>
      </HoverCardTrigger>
      <HoverCardContent>
        <h4>{node.name}</h4>
        {node.strength && <p>Strength: {node.strength}</p>}
        {node.dexterity && <p>Dexterity: {node.dexterity}</p>}
        {node.intelligence && <p>Intelligence: {node.intelligence}</p>}
        {node.willpower && <p>Willpower: {node.willpower}</p>}
        <p>{node.effects?.join(', ')}</p>
      </HoverCardContent>
    </HoverCard>
  );
};

export default BoardNode;
