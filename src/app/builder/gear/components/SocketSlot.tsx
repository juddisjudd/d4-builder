import React from 'react';
import { Button } from '@/components/ui/button';
import { GemData } from '@/app/data/gems';
import { RuneData } from '@/app/data/runes';
import { useBuildContext } from '@/contexts/BuildContext';
import SocketsDialog from './SocketsDialog';
import SocketHoverCard from './SocketHoverCard';

interface SocketSlotProps {
  slotIndex: number;
  socketIndex: number;
  slotType: 'weapon' | 'armor' | 'jewelry';
}

const SocketSlot: React.FC<SocketSlotProps> = ({ slotIndex, socketIndex, slotType }) => {
  const { buildState, updateSocket } = useBuildContext();
  const socketItem = buildState.sockets[slotIndex][socketIndex];
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const handleSelectItem = (item: GemData | RuneData, type: 'gem' | 'rune') => {
    updateSocket(slotIndex, socketIndex, { type, item });
    setIsDialogOpen(false);
  };

  const getImageSrc = () => {
    if (!socketItem.item) return '/images/gems/gems.png';
    if (socketItem.type === 'gem') {
      return `/images/gems/${(socketItem.item as GemData).name.toLowerCase()}.png`;
    } else {
      const rune = socketItem.item as RuneData;
      return `/images/runes/${rune.rarity.toLowerCase()}_${rune.type.toLowerCase()}/${rune.name.toLowerCase()}.png`;
    }
  };

  const socketButton = (
    <Button
      variant="outline"
      className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full p-0"
      onClick={() => setIsDialogOpen(true)}
    >
      <img src={getImageSrc()} alt={socketItem.item?.name || 'Empty socket'} className="h-8 w-8 object-cover" />
    </Button>
  );

  return (
    <>
      {socketItem.item ? (
        <SocketHoverCard item={socketItem.item} slotType={slotType}>
          {socketButton}
        </SocketHoverCard>
      ) : (
        socketButton
      )}
      <SocketsDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSelectItem={handleSelectItem}
        slotType={slotType}
      />
    </>
  );
};

export default SocketSlot;
