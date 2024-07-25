import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';

interface Gem {
  name: string;
  weapon: string;
  armor: string;
  jewelry: string;
}

interface GemSlotProps {
  label: string;
  slotType: 'weapon' | 'armor' | 'jewelry';
  gems: Gem[];
}

const GemSlot: React.FC<GemSlotProps> = ({ label, slotType, gems }) => {
  const [selectedGem, setSelectedGem] = React.useState<Gem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [showHoverCard, setShowHoverCard] = React.useState(false);
  const placeholderImage = '/images/gems/gems.png';

  const renderGemContent = (gem: Gem) => (
    <div className="flex justify-between space-x-4">
      <div>
        <h4 className="text-sm font-semibold">{gem.name}</h4>
        <p className="text-sm">
          {gem[slotType]}
        </p>
      </div>
    </div>
  );

  React.useEffect(() => {
    if (selectedGem) {
      const timer = setTimeout(() => setShowHoverCard(true), 500);
      return () => clearTimeout(timer);
    }
  }, [selectedGem]);

  return (
    <div className="flex flex-col items-center">
      <Dialog open={isDialogOpen} onOpenChange={(open) => {
        setIsDialogOpen(open);
        if (!open) setShowHoverCard(false);
      }}>
        <HoverCard open={showHoverCard && !isDialogOpen}>
          <HoverCardTrigger asChild>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                className="relative p-2 w-20 h-20"
                onClick={() => setIsDialogOpen(true)}
                onMouseEnter={() => setShowHoverCard(true)}
                onMouseLeave={() => setShowHoverCard(false)}
              >
                <img
                  src={selectedGem ? `/images/gems/${selectedGem.name.toLowerCase()}.png` : placeholderImage}
                  alt={selectedGem ? selectedGem.name : label}
                  className="w-12 h-12"
                />
              </Button>
            </DialogTrigger>
          </HoverCardTrigger>
          {selectedGem && (
            <HoverCardContent className="w-80">
              {renderGemContent(selectedGem)}
            </HoverCardContent>
          )}
        </HoverCard>
        <DialogContent className="sm:max-w-[425px]" onInteractOutside={() => setShowHoverCard(false)}>
          <DialogHeader>
            <DialogTitle>Select a Gem for {label}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-3 gap-4">
            {gems.map((gem) => (
              <HoverCard key={gem.name}>
                <HoverCardTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full h-full"
                    onClick={() => {
                      setSelectedGem(gem);
                      setIsDialogOpen(false);
                      setShowHoverCard(false);
                    }}
                  >
                    <img
                      src={`/images/gems/${gem.name.toLowerCase()}.png`}
                      alt={gem.name}
                      className="w-8 h-8"
                    />
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  {renderGemContent(gem)}
                </HoverCardContent>
              </HoverCard>
            ))}
          </div>
        </DialogContent>
      </Dialog>
      <div className="mt-2 text-center">
        <div className="text-sm text-white">{label}</div>
      </div>
    </div>
  );
};

export default GemSlot;