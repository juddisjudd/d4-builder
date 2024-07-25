import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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
  const placeholderImage = '/images/gems/gems.png';

  const renderGemContent = (gem: Gem) => (
    <div className="flex justify-between space-x-4">
      <div>
        <h4 className="text-sm font-semibold">{gem.name}</h4>
        <p className="text-sm">{gem[slotType]}</p>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-center">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <DialogTrigger asChild>
                <Button variant="outline" className="relative h-20 w-20 p-2">
                  <img
                    src={selectedGem ? `/images/gems/${selectedGem.name.toLowerCase()}.png` : placeholderImage}
                    alt={selectedGem ? selectedGem.name : label}
                    className="h-12 w-12"
                  />
                </Button>
              </DialogTrigger>
            </TooltipTrigger>
            {selectedGem && !isDialogOpen && <TooltipContent>{renderGemContent(selectedGem)}</TooltipContent>}
          </Tooltip>
        </TooltipProvider>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Select a Gem for {label}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-3 gap-4">
            {gems.map((gem) => (
              <TooltipProvider key={gem.name}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      className="h-full w-full"
                      onClick={() => {
                        setSelectedGem(gem);
                        setIsDialogOpen(false);
                      }}
                    >
                      <img src={`/images/gems/${gem.name.toLowerCase()}.png`} alt={gem.name} className="h-8 w-8" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>{renderGemContent(gem)}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
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
