import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Technique, techniques } from '../data/techniques';
import TechniqueHoverCard from './TechniqueHoverCard';
import TechniqueDialog from './TechniqueDialog';
import { useBuildContext } from '@/contexts/BuildContext';

const TechniqueButton: React.FC = () => {
  const { buildState, updateTechnique } = useBuildContext();
  const { technique: selectedTechniqueName } = buildState;
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const selectedTechnique = techniques.find((tech) => tech.name === selectedTechniqueName) || null;

  const handleSelectTechnique = (technique: Technique) => {
    updateTechnique(technique.name);
    setIsDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <TechniqueHoverCard technique={selectedTechnique}>
        <DialogTrigger asChild>
          <Button variant="outline" className="h-16 w-16 p-0">
            {selectedTechnique ? (
              <img src={selectedTechnique.icon} alt={selectedTechnique.name} className="h-14 w-14" />
            ) : (
              <div className="h-12 w-12 rounded-md">
                <img src="/images/skills/empty.png" alt="Empty Skill" className="h-12 w-12 object-contain" />
              </div>
            )}
          </Button>
        </DialogTrigger>
      </TechniqueHoverCard>
      <TechniqueDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSelectTechnique={handleSelectTechnique}
        selectedTechniqueName={selectedTechniqueName ?? null}
      />
    </Dialog>
  );
};

export default TechniqueButton;
