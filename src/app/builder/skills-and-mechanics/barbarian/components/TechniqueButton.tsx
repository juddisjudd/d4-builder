import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Technique } from '../data/techniques';
import TechniqueHoverCard from './TechniqueHoverCard';
import TechniqueDialog from './TechniqueDialog';

const TechniqueButton: React.FC = () => {
  const [selectedTechnique, setSelectedTechnique] = useState<Technique | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <TechniqueHoverCard technique={selectedTechnique}>
        <DialogTrigger asChild>
          <Button variant="outline" className="h-16 w-16 p-0">
            {selectedTechnique ? (
              <img src={selectedTechnique.icon} alt={selectedTechnique.name} className="h-12 w-12" />
            ) : (
              <div className="h-12 w-12 rounded-md"></div>
            )}
          </Button>
        </DialogTrigger>
      </TechniqueHoverCard>
      <TechniqueDialog isOpen={isDialogOpen} onOpenChange={setIsDialogOpen} onSelectTechnique={setSelectedTechnique} />
    </Dialog>
  );
};

export default TechniqueButton;
