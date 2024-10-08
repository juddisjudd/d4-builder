import React, { useCallback, useState } from 'react';
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
import { cn } from '@/lib/utils';

interface StatCardProps {
  slot: string;
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

type ColorType = 'blue' | 'yellow' | 'orange';

const ColorCircle: React.FC<{
  color: ColorType;
  checked: boolean;
  disabled: boolean;
  onCheckedChange: (checked: boolean) => void;
}> = ({ color, checked, disabled, onCheckedChange }) => {
  const baseClasses = 'h-5 w-5 rounded-full border-2 cursor-pointer transition-all duration-200';
  const colorClasses = {
    blue: 'border-blue-500',
    yellow: 'border-yellow-500',
    orange: 'border-orange-700',
  };
  const checkedClasses = {
    blue: 'bg-blue-500',
    yellow: 'bg-yellow-500',
    orange: 'bg-orange-700',
  };

  return (
    <div
      className={cn(
        baseClasses,
        colorClasses[color as keyof typeof colorClasses],
        checked && checkedClasses[color as keyof typeof checkedClasses],
        disabled && 'cursor-not-allowed opacity-50'
      )}
      onClick={() => !disabled && onCheckedChange(!checked)}
    />
  );
};

const StatCard: React.FC<StatCardProps> = ({ slot }) => {
  const { buildState, updateItemStat, updateStatSelection } = useBuildContext();
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

  const getTotalSelectedCheckboxes = useCallback(() => {
    return (buildState.statSelections?.[slot] || []).reduce((total, stat) => total + stat.circleValues.length, 0);
  }, [buildState.statSelections, slot]);

  const handleGreaterAffixClick = (index: number) => {
    const currentSelection = buildState.statSelections?.[slot]?.[index] || { greaterAffix: false, circleValues: [] };
    updateStatSelection(slot, index, {
      ...currentSelection,
      greaterAffix: !currentSelection.greaterAffix,
    });
  };

  const handleCircleChange = (statIndex: number, color: ColorType, checked: boolean) => {
    const currentSelection = buildState.statSelections?.[slot]?.[statIndex] || {
      greaterAffix: false,
      circleValues: [],
    };
    const currentValues = [...currentSelection.circleValues] as ColorType[];
    const colorOrder: ColorType[] = ['blue', 'yellow', 'orange'];
    const colorIndex = colorOrder.indexOf(color);

    if (checked) {
      if (colorIndex === 0 || currentValues.includes(colorOrder[colorIndex - 1])) {
        if (!currentValues.includes(color)) {
          currentValues.push(color);
        }
      }
    } else {
      const removeIndex = currentValues.indexOf(color);
      if (removeIndex !== -1) {
        currentValues.splice(removeIndex);
      }
    }

    updateStatSelection(slot, statIndex, {
      ...currentSelection,
      circleValues: currentValues,
    });
  };

  const isCircleDisabled = (index: number, color: ColorType) => {
    const currentValues = (buildState.statSelections?.[slot]?.[index]?.circleValues as ColorType[]) || [];
    const totalSelected = getTotalSelectedCheckboxes();
    const colorOrder: ColorType[] = ['blue', 'yellow', 'orange'];
    const colorIndex = colorOrder.indexOf(color);

    if (currentValues.includes(color)) return false;
    if (totalSelected >= 3) return true;
    if (colorIndex === 0) return false;
    return !currentValues.includes(colorOrder[colorIndex - 1]);
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
            selected={buildState.statSelections?.[slot]?.[index]?.greaterAffix || false}
            onClick={() => handleGreaterAffixClick(index)}
          />
          <div className="flex space-x-1">
            {(['blue', 'yellow', 'orange'] as ColorType[]).map((color) => (
              <ColorCircle
                key={color}
                color={color}
                checked={buildState.statSelections?.[slot]?.[index]?.circleValues.includes(color) || false}
                onCheckedChange={(checked) => handleCircleChange(index, color, checked)}
                disabled={isCircleDisabled(index, color)}
              />
            ))}
          </div>
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
