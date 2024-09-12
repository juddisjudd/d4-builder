import React, { useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { GemData, gems } from '@/app/data/gems';
import { RuneData, getLegendaryRunes, getRareRunes, getMagicRunes } from '@/app/data/runes';
import SocketHoverCard from './SocketHoverCard';

interface SocketsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectItem: (item: GemData | RuneData, type: 'gem' | 'rune') => void;
  slotType: 'weapon' | 'armor' | 'jewelry';
}

const SocketsDialog: React.FC<SocketsDialogProps> = ({ isOpen, onClose, onSelectItem, slotType }) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const tooltips = document.querySelectorAll('[data-state="open"][role="tooltip"]');
      tooltips.forEach((tooltip) => {
        if (tooltip.parentElement) {
          tooltip.parentElement.removeAttribute('data-state');
        }
      });
    };

    const dialogElement = dialogRef.current;
    if (dialogElement) {
      dialogElement.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (dialogElement) {
        dialogElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const renderGemSelection = () => (
    <div className="grid grid-cols-3 gap-2">
      {gems.map((gem) => (
        <SocketHoverCard key={gem.name} item={gem} slotType={slotType}>
          <Button onClick={() => onSelectItem(gem, 'gem')} className="h-16 w-16 bg-transparent p-0 hover:bg-zinc-900">
            <img src={`/images/gems/${gem.name.toLowerCase()}.png`} alt={gem.name} className="h-12 w-12" />
          </Button>
        </SocketHoverCard>
      ))}
    </div>
  );

  const renderRuneSelection = () => {
    const renderRuneGroup = (runes: RuneData[], title: string) => {
      let titleColor = 'text-white';
      if (title.includes('Legendary')) {
        titleColor = 'text-orange-400';
      } else if (title.includes('Rare')) {
        titleColor = 'text-yellow-400';
      } else if (title.includes('Magic')) {
        titleColor = 'text-blue-400';
      }

      return (
        <div className="mb-6">
          <h3 className={`mb-2 text-lg font-semibold ${titleColor}`}>{title}</h3>
          <div className="grid grid-cols-4 gap-4">
            {runes.map((rune) => (
              <SocketHoverCard key={rune.name} item={rune} slotType={slotType}>
                <div className="flex flex-col items-center">
                  <Button
                    onClick={() => onSelectItem(rune, 'rune')}
                    className="mb-1 h-16 w-16 bg-transparent p-1 hover:bg-zinc-900"
                  >
                    <img
                      src={`/images/runes/${rune.rarity.toLowerCase()}_${rune.type.toLowerCase()}/${rune.name.toLowerCase()}.png`}
                      alt={rune.name}
                      className="h-12 w-12"
                    />
                  </Button>
                  <span className="text-center text-xs">{rune.name}</span>
                </div>
              </SocketHoverCard>
            ))}
          </div>
        </div>
      );
    };

    const legendaryRunes = getLegendaryRunes();
    const rareRunes = getRareRunes();
    const magicRunes = getMagicRunes();

    return (
      <div className="space-y-4">
        {renderRuneGroup(
          legendaryRunes.filter((rune) => rune.type === 'Ritual'),
          'Legendary Ritual Runes'
        )}
        {renderRuneGroup(
          legendaryRunes.filter((rune) => rune.type === 'Invocation'),
          'Legendary Invocation Runes'
        )}
        {renderRuneGroup(
          rareRunes.filter((rune) => rune.type === 'Ritual'),
          'Rare Ritual Runes'
        )}
        {renderRuneGroup(
          rareRunes.filter((rune) => rune.type === 'Invocation'),
          'Rare Invocation Runes'
        )}
        {renderRuneGroup(
          magicRunes.filter((rune) => rune.type === 'Ritual'),
          'Magic Ritual Runes'
        )}
        {renderRuneGroup(
          magicRunes.filter((rune) => rune.type === 'Invocation'),
          'Magic Invocation Runes'
        )}
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]" ref={dialogRef}>
        <DialogHeader>
          <DialogTitle>Select a Gem or Rune</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="gems">
          <TabsList>
            <TabsTrigger value="gems">Gems</TabsTrigger>
            <TabsTrigger value="runes">Runes</TabsTrigger>
          </TabsList>
          <TabsContent value="gems">{renderGemSelection()}</TabsContent>
          <TabsContent value="runes" className="max-h-[60vh] overflow-y-auto">
            {renderRuneSelection()}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default SocketsDialog;
