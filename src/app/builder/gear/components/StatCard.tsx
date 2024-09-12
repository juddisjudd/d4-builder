import React from 'react';
import StatCombobox from './StatCombobox';
import { useBuildContext } from '@/contexts/BuildContext';
import { getStatsForSlot, getTemperingStatsForSlot, getImplicitForSlot, hasImplicit } from '../utils/statUtils';

interface StatCardProps {
  slot: string;
}

const StatCard: React.FC<StatCardProps> = ({ slot }) => {
  const { buildState, updateItemStat } = useBuildContext();
  const regularStats = getStatsForSlot(slot, buildState.selectedClass);
  const temperingStats = getTemperingStatsForSlot(slot, buildState.selectedClass);
  const implicitStats = getImplicitForSlot(slot);
  const slotHasImplicit = hasImplicit(slot);

  return (
    <div className="mb-4 rounded-lg border p-3">
      <h3 className="mb-2 text-base font-semibold">{slot}</h3>

      {slotHasImplicit && implicitStats.length > 0 && (
        <div className="mb-2">
          <StatCombobox
            options={implicitStats}
            value={buildState.itemStats[slot]?.[0] || ''}
            onChange={(value) => updateItemStat(slot, 0, value)}
            placeholder={slot.toLowerCase().includes('weapon') ? 'Weapon Type' : 'Implicit'}
          />
        </div>
      )}

      {[0, 1, 2].map((index) => (
        <div key={`regular-${index}`} className="mb-2">
          <StatCombobox
            options={regularStats}
            value={buildState.itemStats[slot]?.[slotHasImplicit ? index + 1 : index] || ''}
            onChange={(value) => updateItemStat(slot, slotHasImplicit ? index + 1 : index, value)}
            placeholder={`Stat ${index + 1}`}
          />
        </div>
      ))}

      {[0, 1].map((index) => (
        <div key={`tempering-${index}`} className="mb-2">
          <StatCombobox
            options={temperingStats}
            value={buildState.itemStats[slot]?.[slotHasImplicit ? index + 4 : index + 3] || ''}
            onChange={(value) => updateItemStat(slot, slotHasImplicit ? index + 4 : index + 3, value)}
            placeholder={`Tempering Stat ${index + 1}`}
          />
        </div>
      ))}
    </div>
  );
};

export default StatCard;
