import React from 'react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

interface GlyphHoverCardProps {
  glyph: any;
  children: React.ReactNode;
}

export const GlyphHoverCard: React.FC<GlyphHoverCardProps> = ({ glyph, children }) => {
  if (glyph.name === 'None') {
    return <>{children}</>;
  }

  const formatBonusText = (text: string) => {
    return text
      .replace('{value}', `[${glyph.value.toFixed(1)}]`)
      .replace('{legendary_value}', `[${glyph.legendary_value}]`);
  };

  return (
    <HoverCard>
      <HoverCardTrigger asChild>{children}</HoverCardTrigger>
      <HoverCardContent className="w-80 border-zinc-700 bg-zinc-900 p-4">
        <div className="mb-3 flex items-center">
          <img
            src={`/images/paragon/glyphs/${glyph.class.toLowerCase()}/${glyph.name.toLowerCase().replace(/\s+/g, '_')}.png`}
            alt={glyph.name}
            className="mr-3 h-8 w-8"
          />
          <div>
            <h3 className="text-lg font-bold text-orange-400">{glyph.name}</h3>
          </div>
        </div>
        <div className="text-sm text-gray-300">
          <p className="mb-1 font-semibold text-white">Bonus:</p>
          <ul className="mb-2 list-inside list-disc pl-2">
            {glyph.bonus.map((bonus: string, index: number) => (
              <li key={index}>{formatBonusText(bonus)}</li>
            ))}
          </ul>
          {glyph.additional_bonus && (
            <>
              <p className="mb-1 font-semibold text-white">Additional Bonus:</p>
              <ul className="mb-2 list-inside list-disc pl-2">
                {glyph.additional_bonus.map((bonus: string, index: number) => (
                  <li key={index}>{formatBonusText(bonus)}</li>
                ))}
              </ul>
            </>
          )}
          {glyph.requirements_amount && (
            <>
              <p className="mb-1 font-semibold text-white">Requirements (within radius):</p>
              <ul className="mb-2 list-inside list-disc pl-2">
                {glyph.requirements_amount.map((amount: number, index: number) => (
                  <li key={index}>
                    {amount} {glyph.requirements_stat[index]}
                  </li>
                ))}
              </ul>
            </>
          )}
          {glyph.legendary_bonus && (
            <>
              <p className="mb-1 font-semibold text-yellow-400">Legendary Bonus:</p>
              <ul className="list-inside list-disc pl-2">
                {glyph.legendary_bonus.map((bonus: string, index: number) => (
                  <li key={index}>{formatBonusText(bonus)}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};
