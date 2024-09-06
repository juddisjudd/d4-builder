import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import GearSlotDialog from './GearSlotDialog';
import { AspectData } from '../../../data/codex';
import { UniqueData } from '../../../data/uniques';
import { getUniqueImagePath, getAspectImagePath } from '../utils/imagePathUtils';
import AspectHoverCard from './AspectHoverCard';
import UniqueHoverCard from './UniqueHoverCard';

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
  onSelectionChange
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
        return getUniqueImagePath(selectedItem.type, selectedItem.name);
      } else {
        console.log('Item is an Aspect');
        return getAspectImagePath(selectedItem.type);
      }
    }
    console.log('No item selected, using default image');
    return imageSrc;
  };

  const getItemNameColor = () => {
    if (!selectedItem) return 'text-white';
    if (!isUnique(selectedItem)) return 'text-orange-500'; // Aspect color
    return selectedItem.mythic ? 'text-purple-500' : 'text-yellow-500'; // Mythic or regular Unique color
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

  const renderSlotContent = () => {
    if (!selectedItem) {
      return (
        <Button
          variant="outline"
          className="flex items-center justify-center p-2 w-20 h-20 hover:bg-[#171717]"
        >
          <img src={imageSrc} alt={label || 'Gear slot'} className="w-12 h-12 object-contain" />
        </Button>
      );
    }

    const content = (
      <Button
        variant="outline"
        className="flex items-center justify-center p-2 w-20 h-20 hover:bg-[#171717]"
      >
        <img 
          src={getItemImage()}
          alt={selectedItem.name} 
          className="w-12 h-12 object-contain"
          onError={(e) => {
            console.error('Failed to load image:', (e.target as HTMLImageElement).src);
            console.error('For item:', selectedItem);
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
      </Button>
    );

    return isUnique(selectedItem) 
      ? <UniqueHoverCard unique={selectedItem}>{content}</UniqueHoverCard>
      : <AspectHoverCard aspect={selectedItem}>{content}</AspectHoverCard>;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className={`flex items-center ${isRightSide ? 'flex-row-reverse' : ''}`}>
          {renderSlotContent()}
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
        selections={selections}
        currentIndex={index}
      />
    </Dialog>
  );
};

export default GearSlot;