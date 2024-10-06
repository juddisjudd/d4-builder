import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { GlyphHoverCard } from './GlyphHoverCard';
import { Input } from '@/components/ui/input';
import glyphsData from '@/app/data/glyphs.json';

interface GlyphDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectGlyph: (glyph: any) => void;
  selectedClass: string;
  usedGlyphs: string[];
}

export const GlyphDialog: React.FC<GlyphDialogProps> = ({
  isOpen,
  onClose,
  onSelectGlyph,
  selectedClass,
  usedGlyphs,
}) => {
  const [availableGlyphs, setAvailableGlyphs] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const filteredGlyphs = glyphsData.glyphs.filter(
      (glyph) => (glyph.class === selectedClass || glyph.class === 'All') && !usedGlyphs.includes(glyph.name)
    );
    setAvailableGlyphs([{ name: 'None' }, ...filteredGlyphs]);
  }, [selectedClass, usedGlyphs]);

  const filteredGlyphs = availableGlyphs.filter((glyph) => glyph.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="border-zinc-700 bg-zinc-900 sm:max-w-[725px]">
        <DialogTitle className="text-center text-xl font-bold">Select a Glyph</DialogTitle>
        <Input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4 border-zinc-700 bg-zinc-800 text-white"
        />
        <div className="grid max-h-[60vh] grid-cols-3 gap-2 overflow-y-auto">
          {filteredGlyphs.map((glyph) => (
            <GlyphHoverCard key={glyph.name} glyph={glyph}>
              <button
                onClick={() => onSelectGlyph(glyph)}
                className="flex h-full w-full items-center rounded bg-zinc-800 p-2 hover:bg-zinc-700"
              >
                {glyph.name !== 'None' ? (
                  <img
                    src={`/images/paragon/glyphs/${selectedClass.toLowerCase()}/${glyph.name.toLowerCase().replace(/\s+/g, '_')}.png`}
                    alt={glyph.name}
                    className="mr-2 h-8 w-8"
                  />
                ) : (
                  <div className="mr-2 h-8 w-8 rounded-full bg-zinc-700"></div>
                )}
                <span className="text-left text-sm text-orange-400">{glyph.name}</span>
              </button>
            </GlyphHoverCard>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
