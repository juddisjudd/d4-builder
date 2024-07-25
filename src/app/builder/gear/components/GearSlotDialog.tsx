import * as React from 'react';
import { DialogContent } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AspectsList from './AspectsList';
import ItemStats from './ItemStats';

interface GearSlotDialogProps {
  label: string;
  slotType: string;
  selectedClass: string | null;
}

const GearSlotDialog: React.FC<GearSlotDialogProps> = ({ label, slotType, selectedClass }) => {
  return (
    <DialogContent className="max-w-3xl">
      <h2 className="text-xl font-semibold mb-4">{label}</h2>
      <Tabs defaultValue="aspects">
        <TabsList>
          <TabsTrigger value="aspects">Aspects & Uniques</TabsTrigger>
          <TabsTrigger value="stats">Item Stats</TabsTrigger>
        </TabsList>
        <TabsContent value="aspects">
          <AspectsList slotType={slotType} selectedClass={selectedClass} />
        </TabsContent>
        <TabsContent value="stats">
          <ItemStats />
        </TabsContent>
      </Tabs>
    </DialogContent>
  );
};

export default GearSlotDialog;