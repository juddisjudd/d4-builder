import React, { useState } from 'react';
import Image from 'next/image';
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';

interface StatCardProps {
  slot: string;
}

interface StatSelection {
  greaterAffix: boolean;
  circleValue: string | null;
}

const GreaterAffixImage: React.FC<{ selected: boolean; onClick: () => void }> = ({ selected, onClick }) => (
  <Image
    src="/images/misc/ga.png"
    width={27}
    height={27}
    alt="Greater Affix"
    className={`cursor-pointer transition-all ${selected ? '' : 'grayscale'}`}
    onClick={onClick}
  />
);

const StatCard: React.FC<StatCardProps> = ({ slot }) => {
  const { buildState, updateItemStat } = useBuildContext();
  const offhandTypes = getOffhandTypes(buildState.selectedClass).map((type) => ({
    value: type,
    label: type,
  }));
  const [offhandType, setOffhandType] = useState<string>(offhandTypes[0].value);
  const [statSelections, setStatSelections] = useState<StatSelection[]>(
    Array(5).fill({ greaterAffix: false, circleValue: null })
  );

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

  const handleGreaterAffixClick = (index: number) => {
    setStatSelections((prev) => {
      const newSelections = [...prev];
      newSelections[index] = { ...newSelections[index], greaterAffix: !newSelections[index].greaterAffix };
      return newSelections;
    });
  };

  const handleCircleChange = (statIndex: number, value: string) => {
    setStatSelections((prev) => {
      const newSelections = [...prev];
      newSelections[statIndex] = {
        ...newSelections[statIndex],
        circleValue: newSelections[statIndex].circleValue === value ? null : value,
      };
      return newSelections;
    });
  };

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

      {[0, 1, 2, 3, 4].map((index) => (
        <div key={`stat-${index}`} className="mb-2 flex items-center space-x-2">
          <StatCombobox
            options={index < 3 ? regularStats : temperingStats}
            value={buildState.itemStats[`${slot}-${type}`]?.[slotHasImplicit ? index + 1 : index] || ''}
            onChange={(value) => updateItemStat(`${slot}-${type}`, slotHasImplicit ? index + 1 : index, value)}
            placeholder={index < 3 ? `Stat ${index + 1}` : `Tempering Stat ${index - 2}`}
          />
          <GreaterAffixImage
            selected={statSelections[index].greaterAffix}
            onClick={() => handleGreaterAffixClick(index)}
          />
          <RadioGroup
            value={statSelections[index].circleValue || ''}
            onValueChange={(value) => handleCircleChange(index, value)}
            className="flex space-x-1"
          >
            {['blue', 'yellow', 'orange'].map((color) => (
              <RadioGroupItem
                key={color}
                value={color}
                className={cn('h-5 w-5 cursor-pointer rounded-full border-2 border-gray-400', {
                  'border-blue-500 bg-blue-500': color === 'blue' && statSelections[index].circleValue === color,
                  'border-yellow-500 bg-yellow-500': color === 'yellow' && statSelections[index].circleValue === color,
                  'border-orange-700 bg-orange-700': color === 'orange' && statSelections[index].circleValue === color,
                })}
              />
            ))}
          </RadioGroup>
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
