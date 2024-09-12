import React, { useState, useEffect } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { GemData } from '@/app/data/gems';
import { RuneData } from '@/app/data/runes';

interface SocketHoverCardProps {
  item: GemData | RuneData;
  slotType: 'weapon' | 'armor' | 'jewelry';
  children: React.ReactNode;
}

const SocketHoverCard: React.FC<SocketHoverCardProps> = ({ item, slotType, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll, true);
    return () => {
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [isOpen]);

  const renderGemContent = (gem: GemData) => (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <img src={`/images/gems/${gem.name.toLowerCase()}.png`} alt={gem.name} className="h-8 w-8" />
        <div>
          <h4 className="font-semibold">{gem.name}</h4>
          <p className="text-sm text-zinc-400">Gem</p>
        </div>
      </div>
      <ul className="space-y-1 text-sm">
        <li>
          <span className={`font-semibold ${slotType === 'weapon' ? 'text-yellow-500' : 'text-zinc-600'}`}>
            Weapon:
          </span>{' '}
          {gem.weapon}
        </li>
        <li>
          <span className={`font-semibold ${slotType === 'armor' ? 'text-yellow-500' : 'text-zinc-600'}`}>Armor:</span>{' '}
          {gem.armor}
        </li>
        <li>
          <span className={`font-semibold ${slotType === 'jewelry' ? 'text-yellow-500' : 'text-zinc-600'}`}>
            Jewelry:
          </span>{' '}
          {gem.jewelry}
        </li>
      </ul>
    </div>
  );

  const renderRuneContent = (rune: RuneData) => (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <img
          src={`/images/runes/${rune.rarity.toLowerCase()}_${rune.type.toLowerCase()}/${rune.name.toLowerCase()}.png`}
          alt={rune.name}
          className="h-8 w-8"
        />
        <div>
          <h4 className="font-semibold">{rune.name}</h4>
          <p className="text-sm text-zinc-400">
            {rune.rarity} Rune of {rune.type}
          </p>
        </div>
      </div>
      <ul className="space-y-1 text-sm">
        <li>
          <span className="font-semibold text-yellow-500">Gain:</span> {rune.gain} Offering
        </li>
        <li>{rune.bonus}</li>
      </ul>
    </div>
  );

  return (
    <TooltipProvider>
      <Tooltip open={isOpen} onOpenChange={setIsOpen}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent className="w-64 border border-zinc-700 bg-zinc-950 p-2">
          {'weapon' in item ? renderGemContent(item) : renderRuneContent(item)}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default SocketHoverCard;
