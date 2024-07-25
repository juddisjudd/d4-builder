import * as React from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import GearSlotDialog from './GearSlotDialog';
import { AspectData } from '../data/codex';
import { UniqueData } from '../data/uniques';

interface GearSlotProps {
  label?: string;
  imageSrc?: string;
  isPlaceholder?: boolean;
  isRightSide?: boolean;
  selectedClass: string | null;
}

const GearSlot: React.FC<GearSlotProps> = ({ label, imageSrc, isPlaceholder = false, isRightSide = false, selectedClass }) => {
  const [selectedItem, setSelectedItem] = useState<AspectData | UniqueData | null>(null);
  const [isUnique, setIsUnique] = useState(false);

  const handleSelect = (item: AspectData | UniqueData, itemIsUnique: boolean) => {
    setSelectedItem(item);
    setIsUnique(itemIsUnique);
  };

  const getItemImage = () => {
    if (selectedItem) {
      return isUnique 
        ? `/images/uniques/${selectedItem.type.toLowerCase().replace(/\s+/g, '_')}s/${encodeURIComponent(selectedItem.name)}.png`
        : `/images/aspects/${selectedItem.type.toLowerCase()}.png`;
    }
    return imageSrc;
  };

  const getItemNameColor = () => {
    if (!selectedItem) return 'text-white';
    if (!isUnique) return 'text-orange-500'; // Aspect color
    return (selectedItem as UniqueData).mythic ? 'text-purple-500' : 'text-yellow-500'; // Mythic or regular Unique color
  };

  if (isPlaceholder) {
    return (
      <div className={`flex items-center ${isRightSide ? 'flex-row-reverse' : ''}`}>
        <Button
          variant="outline"
          className="flex items-center justify-center p-2 w-20 h-20 bg-[#262626] border-[#52525b] cursor-not-allowed"
          disabled
        />
      </div>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className={`flex items-center ${isRightSide ? 'flex-row-reverse' : ''}`}>
          <Button
            variant="outline"
            className="flex items-center justify-center p-2 w-20 h-20 hover:bg-[#171717]"
          >
            <img src={getItemImage()} alt={selectedItem ? selectedItem.name : label || 'Gear slot'} className="w-12 h-12 object-contain" />
          </Button>
          <div className={`${isRightSide ? 'mr-2 text-right' : 'ml-2'}`}>
            <div className={`text-sm ${getItemNameColor()}`}>
              {selectedItem ? selectedItem.name : (label || 'Gear slot')}
            </div>
            <div className="text-xs text-gray-500">
              {selectedItem ? (label || 'Gear slot') : 'Empty'}
            </div>
          </div>
        </div>
      </DialogTrigger>
      <GearSlotDialog 
        label={label || 'Gear slot'} 
        slotType={label || 'Gear slot'} 
        selectedClass={selectedClass} 
        onSelect={handleSelect}
      />
    </Dialog>
  );
};

export default GearSlot;