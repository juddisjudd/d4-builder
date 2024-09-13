import React, { useState } from 'react';
import StatCombobox from './StatCombobox';
import { useBuildContext } from '@/contexts/BuildContext';
import {
  getStatsForSlot,
  getTemperingStatsForSlot,
  getImplicitForSlot,
  hasImplicit,
  getOffhandTypes,
} from '../utils/statUtils';
import { getWeaponTypesForClass, getWeaponAttribute } from '../utils/weaponUtils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface StatCardProps {
  slot: string;
}

const StatCard: React.FC<StatCardProps> = ({ slot }) => {
  const { buildState, updateItemStat } = useBuildContext();
  const offhandTypes = getOffhandTypes(buildState.selectedClass).map((type) => ({
    value: type,
    label: type,
  }));
  const [offhandType, setOffhandType] = useState<string>(offhandTypes[0].value);

  const isOffhandSlot = slot.toLowerCase() === 'offhand';
  const isWeaponSlot = slot.toLowerCase().includes('weapon');
  const isRingSlot = slot.toLowerCase().includes('ring');
  const isBootsSlot = slot.toLowerCase() === 'boots';
  const isAmuletSlot = slot.toLowerCase() === 'amulet';
  const currentSlot = isOffhandSlot ? offhandType : slot;

  const regularStats = getStatsForSlot(currentSlot, buildState.selectedClass, offhandType);
  const temperingStats = getTemperingStatsForSlot(currentSlot, buildState.selectedClass);
  const implicitStats = getImplicitForSlot(currentSlot, offhandType);
  const weaponTypes = buildState.selectedClass
    ? getWeaponTypesForClass(buildState.selectedClass, slot).map((type) => ({
        value: type,
        label: `${type}: ${getWeaponAttribute(type)}`,
      }))
    : [];
  const slotHasImplicit = hasImplicit(currentSlot, offhandType);

  const renderStatComboboxes = (type: string) => (
    <>
      {slotHasImplicit && (
        <>
          {(isRingSlot || isBootsSlot) && (
            <div className="mb-2">
              <StatCombobox
                options={implicitStats}
                value={buildState.itemStats[`${slot}-${type}`]?.[0] || ''}
                onChange={(value) => updateItemStat(`${slot}-${type}`, 0, value)}
                placeholder={isRingSlot ? 'Ring Implicit' : 'Boots Implicit'}
              />
            </div>
          )}
          {isAmuletSlot && (
            <div className="mb-2">
              <StatCombobox
                options={implicitStats}
                value={buildState.itemStats[`${slot}-${type}`]?.[0] || implicitStats[0]?.value || ''}
                onChange={(value) => updateItemStat(`${slot}-${type}`, 0, value)}
                placeholder="Amulet Implicit"
                disabled={true}
              />
            </div>
          )}
          {!isRingSlot && !isBootsSlot && !isAmuletSlot && (
            <div className="mb-2">
              <StatCombobox
                options={isWeaponSlot ? weaponTypes : implicitStats}
                value={
                  buildState.itemStats[`${slot}-${type}`]?.[0] || (isOffhandSlot ? implicitStats[0]?.value : '') || ''
                }
                onChange={(value) => updateItemStat(`${slot}-${type}`, 0, value)}
                placeholder={isWeaponSlot ? 'Weapon Type' : 'Implicit'}
                disabled={isOffhandSlot}
              />
            </div>
          )}
        </>
      )}

      {[0, 1, 2].map((index) => (
        <div key={`regular-${index}`} className="mb-2">
          <StatCombobox
            options={regularStats}
            value={buildState.itemStats[`${slot}-${type}`]?.[slotHasImplicit ? index + 1 : index] || ''}
            onChange={(value) => updateItemStat(`${slot}-${type}`, slotHasImplicit ? index + 1 : index, value)}
            placeholder={`Stat ${index + 1}`}
          />
        </div>
      ))}

      {[0, 1].map((index) => (
        <div key={`tempering-${index}`} className="mb-2">
          <StatCombobox
            options={temperingStats}
            value={buildState.itemStats[`${slot}-${type}`]?.[slotHasImplicit ? index + 4 : index + 3] || ''}
            onChange={(value) => updateItemStat(`${slot}-${type}`, slotHasImplicit ? index + 4 : index + 3, value)}
            placeholder={`Tempering Stat ${index + 1}`}
          />
        </div>
      ))}
    </>
  );

  return (
    <div className="mb-4 rounded-lg border p-3">
      <h3 className="mb-2 text-base font-semibold">{isOffhandSlot ? 'Offhand/Shield' : slot}</h3>

      {isOffhandSlot && offhandTypes.length > 1 ? (
        <Tabs defaultValue={offhandType} onValueChange={setOffhandType}>
          <TabsList>
            {offhandTypes.map((type) => (
              <TabsTrigger key={type.value} value={type.value}>
                {type.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {offhandTypes.map((type) => (
            <TabsContent key={type.value} value={type.value}>
              {renderStatComboboxes(type.value)}
            </TabsContent>
          ))}
        </Tabs>
      ) : (
        renderStatComboboxes(isOffhandSlot ? offhandType : slot)
      )}
    </div>
  );
};

export default StatCard;
