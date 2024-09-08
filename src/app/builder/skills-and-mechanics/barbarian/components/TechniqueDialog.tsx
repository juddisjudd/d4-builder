import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { techniques, Technique } from '../data/techniques';
import TechniqueHoverCard from './TechniqueHoverCard';

interface TechniqueDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectTechnique: (technique: Technique) => void;
}

const TechniqueDialog: React.FC<TechniqueDialogProps> = ({ isOpen, onOpenChange, onSelectTechnique }) => (
  <Dialog open={isOpen} onOpenChange={onOpenChange}>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Select Technique</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        {techniques.map((technique) => (
          <TechniqueHoverCard key={technique.name} technique={technique}>
            <Button
              variant="outline"
              className="flex w-full items-center justify-start p-2"
              onClick={() => {
                onSelectTechnique(technique);
                onOpenChange(false);
              }}
            >
              <img src={technique.icon} alt={technique.name} className="mr-4 h-8 w-8" />
              <span>{technique.name}</span>
            </Button>
          </TechniqueHoverCard>
        ))}
      </div>
    </DialogContent>
  </Dialog>
);

export default TechniqueDialog;
