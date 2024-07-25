import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import GearSlotDialog from './GearSlotDialog';
import { AspectData } from '../data/codex';
import { UniqueData } from '../data/uniques';
import { getUniqueImagePath, getAspectImagePath, logImagePath } from '../utils/imagePathUtils';

interface GearSlotProps {
  label?: string;
  imageSrc?: string;
  isPlaceholder?: boolean;
  isRightSide?: boolean;
  selectedClass: string | null;
  index: number;
  selections: (AspectData | UniqueData | null)[];
  onSelectionChange: (index: number, item: AspectData | UniqueData | null) => void;
}

const GearSlot: React.FC<GearSlotProps> = ({
  label,
  imageSrc,
  isPlaceholder = false,
  isRightSide = false,
  selectedClass,
  index,
  selections,
  onSelectionChange,
}) => {
  const selectedItem = selections[index];

  const isUnique = (item: AspectData | UniqueData | null): item is UniqueData => {
    return item !== null && 'mythic' in item;
  };

  const handleSelect = (item: AspectData | UniqueData | null) => {
    console.log('Selected item:', item);
    onSelectionChange(index, item);
  };

  const getItemImage = () => {
    if (selectedItem) {
      console.log('Getting image for item:', selectedItem);
      if (isUnique(selectedItem)) {
        console.log('Item is a Unique');
        logImagePath(selectedItem.type, selectedItem.name);
        return getUniqueImagePath(selectedItem.type, selectedItem.name);
      } else {
        console.log('Item is an Aspect');
        logImagePath(selectedItem.type, selectedItem.name, true);
        return getAspectImagePath(selectedItem.type);
      }
    }
    console.log('No item selected, using default image');
    return imageSrc;
  };

  const getItemNameColor = () => {
    if (!selectedItem) return 'text-white';
    if (!isUnique(selectedItem)) return 'text-orange-500';
    return selectedItem.mythic ? 'text-purple-500' : 'text-yellow-500';
  };

  if (isPlaceholder) {
    return (
      <div className={`flex items-center ${isRightSide ? 'flex-row-reverse' : ''}`}>
        <Button
          variant="outline"
          className="flex h-20 w-20 cursor-not-allowed items-center justify-center border-[#52525b] bg-[#262626] p-2"
          disabled
        />
      </div>
    );
  }

  const itemImage = getItemImage();
  console.log('Item image path:', itemImage);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className={`flex items-center ${isRightSide ? 'flex-row-reverse' : ''}`}>
          <Button variant="outline" className="flex h-20 w-20 items-center justify-center p-2 hover:bg-[#171717]">
            <img
              src={itemImage}
              alt={selectedItem ? selectedItem.name : label || 'Gear slot'}
              className="h-12 w-12 object-contain"
              onError={(e) => {
                console.error('Failed to load image:', (e.target as HTMLImageElement).src);
                console.error('For item:', selectedItem);
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </Button>
          <div className={`${isRightSide ? 'mr-2 text-right' : 'ml-2'}`}>
            <div className={`text-sm ${getItemNameColor()}`}>
              {selectedItem ? selectedItem.name : label || 'Gear slot'}
            </div>
            <div className="text-xs text-gray-500">{selectedItem ? label || 'Gear slot' : 'Empty'}</div>
          </div>
        </div>
      </DialogTrigger>
      <GearSlotDialog
        label={label || 'Gear slot'}
        slotType={label || 'Gear slot'}
        selectedClass={selectedClass}
        onSelect={handleSelect}
        selections={selections}
        currentIndex={index}
      />
    </Dialog>
  );
};

export default GearSlot;
