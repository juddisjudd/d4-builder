import React from 'react';
import { useBuildContext } from '@/contexts/BuildContext';
import StatCard from './StatCard';
import { gearSlots } from '@/app/data/gearSlots';

interface ItemStatsProps {
  slot?: string;
}

const ItemStats: React.FC<ItemStatsProps> = ({ slot }) => {
  const { buildState } = useBuildContext();
  const { selectedClass } = buildState;

  if (!selectedClass) return null;

  const slots = gearSlots[selectedClass.toLowerCase()];

  if (slot) {
    return <StatCard slot={slot} />;
  }

  return (
    <div className="grid grid-cols-1 gap-4 p-8 md:grid-cols-2 lg:grid-cols-3">
      {slots.map(
        (slotItem, index) =>
          !slotItem.isPlaceholder && <StatCard key={index} slot={slotItem.label || `Slot ${index + 1}`} />
      )}
    </div>
  );
};

export default ItemStats;
