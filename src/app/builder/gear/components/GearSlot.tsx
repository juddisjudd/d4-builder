import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import GearSlotDialog from './GearSlotDialog';
import { AspectData } from '../../../data/codex';
import { UniqueData } from '../../../data/uniques';
import { getUniqueImagePath, getAspectImagePath } from '../../utils/imagePathUtils';
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
  onSelectionChange,
}) => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const selectedItem = selections[index];

  const isUnique = React.useCallback((item: AspectData | UniqueData | null): item is UniqueData => {
    return item !== null && 'effect' in item;
  }, []);

  const handleSelect = (item: AspectData | UniqueData | null) => {
    console.log('Selected item:', item, 'Is right side:', isRightSide, 'Index:', index);
    onSelectionChange(index, item);
    setIsDialogOpen(false);
  };

  const getItemImage = React.useCallback(() => {
    console.log('selectedItem', selectedItem, isUnique(selectedItem));
    if (selectedItem) {
      if (isUnique(selectedItem)) {
        const path = getUniqueImagePath(selectedItem.type, selectedItem.name);
        return path;
      } else {
        const path = getAspectImagePath(selectedItem.name, selectedItem.class, selectedItem.type);
        return path;
      }
    }
    return imageSrc;
  }, [selectedItem, index, isUnique, imageSrc]);

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

  const renderSlotContent = () => {
    const imageSource = selectedItem ? getItemImage() : imageSrc;

    const content = (
      <Button variant="outline" className="flex h-20 w-20 items-center justify-center p-2 hover:bg-[#171717]">
        <img
          src={imageSource}
          alt={selectedItem ? selectedItem.name : label || 'Gear slot'}
          className="h-16 w-16 object-contain"
          onError={(e) => {
            console.error('Failed to load image:', (e.target as HTMLImageElement).src);
            console.error('For item:', selectedItem, 'Is right side:', isRightSide, 'Index:', index);
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
      </Button>
    );

    if (!selectedItem) return content;

    return isUnique(selectedItem) ? (
      <UniqueHoverCard unique={selectedItem}>{content}</UniqueHoverCard>
    ) : (
      <AspectHoverCard aspect={selectedItem}>{content}</AspectHoverCard>
    );
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <div className={`flex items-center ${isRightSide ? 'flex-row-reverse' : ''}`}>
          {renderSlotContent()}
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
        onClose={() => setIsDialogOpen(false)}
      />
    </Dialog>
  );
};

export default GearSlot;
