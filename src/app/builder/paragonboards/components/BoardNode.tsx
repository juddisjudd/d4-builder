import React, { useState } from 'react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Node } from '../types';
import { GlyphDialog } from './GlyphDialog';
import { GlyphHoverCard } from './GlyphHoverCard';

interface BoardNodeProps {
  node: Node;
  boardId: string;
  isSelected: boolean;
  canSelect: boolean;
  isStartingNode: boolean;
  selectedClass: string;
  onSelect: () => void;
  onDeselect: () => void;
  boardRotation: number;
  onGlyphSelect: (glyph: any) => void;
  selectedGlyph: any | null;
  usedGlyphs: string[];
}

const BoardNode: React.FC<BoardNodeProps> = ({
  node,
  boardId,
  isSelected,
  canSelect,
  isStartingNode,
  selectedClass,
  onSelect,
  onDeselect,
  boardRotation,
  onGlyphSelect,
  selectedGlyph,
  usedGlyphs,
}) => {
  const [isGlyphDialogOpen, setIsGlyphDialogOpen] = useState(false);

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

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isStartingNode) return;

    if (e.button === 0) {
      if (node.name === 'Glyph Socket') {
        if (canSelect) {
          onSelect();
          setIsGlyphDialogOpen(true);
        }
      } else {
        if (canSelect) onSelect();
        else if (isSelected) onDeselect();
      }
    } else if (e.button === 2) {
      if (isSelected) {
        onDeselect();
        if (node.name === 'Glyph Socket') {
          onGlyphSelect(null);
        }
      }
    }
  };

  const handleGlyphSelect = (glyph: any) => {
    onGlyphSelect(glyph);
    setIsGlyphDialogOpen(false);
  };

  const renderNodeContent = () => (
    <div
      onClick={handleClick}
      onContextMenu={handleClick}
      className={`relative h-[45px] w-[45px] cursor-pointer rounded-full ${
        isSelected ? 'ring-2 ring-blue-500' : canSelect ? 'ring-2 ring-red-800' : ''
      }`}
    >
      <div
        className={`absolute inset-0 rounded-full bg-cover bg-center bg-no-repeat ${
          !isSelected && !isStartingNode ? 'opacity-50' : ''
        }`}
        style={{
          backgroundImage: `url(${getNodeImage()})`,
          transform: `rotate(${-boardRotation}deg)`,
        }}
      />
      {selectedGlyph && node.name === 'Glyph Socket' && (
        <div
          className="absolute inset-0 z-10 rounded-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(/images/paragon/glyphs/${selectedClass.toLowerCase()}/${selectedGlyph.name.toLowerCase().replace(/\s+/g, '_')}.png)`,
            transform: `rotate(${-boardRotation}deg)`,
          }}
        />
      )}
    </div>
  );

  if (node.name === 'Glyph Socket' && selectedGlyph) {
    return (
      <>
        <GlyphHoverCard glyph={selectedGlyph}>{renderNodeContent()}</GlyphHoverCard>
        <GlyphDialog
          isOpen={isGlyphDialogOpen}
          onClose={() => setIsGlyphDialogOpen(false)}
          onSelectGlyph={handleGlyphSelect}
          selectedClass={selectedClass}
          usedGlyphs={usedGlyphs}
        />
      </>
    );
  }

  return (
    <>
      <HoverCard>
        <HoverCardTrigger asChild>{renderNodeContent()}</HoverCardTrigger>
        <HoverCardContent className="z-50 w-64 p-4">
          <h4 className="mb-2 font-bold">{node.name}</h4>
          {node.strength && <p>Strength: {node.strength}</p>}
          {node.dexterity && <p>Dexterity: {node.dexterity}</p>}
          {node.intelligence && <p>Intelligence: {node.intelligence}</p>}
          {node.willpower && <p>Willpower: {node.willpower}</p>}
          {node.effects && <p>Effects: {node.effects}</p>}
        </HoverCardContent>
      </HoverCard>
      <GlyphDialog
        isOpen={isGlyphDialogOpen}
        onClose={() => setIsGlyphDialogOpen(false)}
        onSelectGlyph={handleGlyphSelect}
        selectedClass={selectedClass}
        usedGlyphs={usedGlyphs}
      />
    </>
  );
};

export default BoardNode;
