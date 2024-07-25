import * as React from 'react';
import { DialogContent, DialogClose } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AspectsList from './AspectsList';
import ItemStats from './ItemStats';
import { AspectData } from '../data/codex';
import { UniqueData } from '../data/uniques';

interface GearSlotDialogProps {
  label: string;
  slotType: string;
  selectedClass: string | null;
  onSelect: (item: AspectData | UniqueData, isUnique: boolean) => void;
}

const GearSlotDialog: React.FC<GearSlotDialogProps> = ({ label, slotType, selectedClass, onSelect }) => {
  const handleSelect = (item: AspectData | UniqueData, isUnique: boolean) => {
    onSelect(item, isUnique);
  };

  return (
    <DialogContent className="max-w-3xl">
      <h2 className="text-xl font-semibold mb-4">{label}</h2>
      <Tabs defaultValue="aspects">
        <TabsList>
          <TabsTrigger value="aspects">Aspects & Uniques</TabsTrigger>
          <TabsTrigger value="stats">Item Stats</TabsTrigger>
        </TabsList>
        <TabsContent value="aspects">
          <AspectsList slotType={slotType} selectedClass={selectedClass} onSelect={handleSelect} />
        </TabsContent>
        <TabsContent value="stats">
          <ItemStats />
        </TabsContent>
      </Tabs>
      <DialogClose />
    </DialogContent>
  );
};

export default GearSlotDialog;