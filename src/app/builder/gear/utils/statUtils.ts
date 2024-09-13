import statsData from '@/app/data/stats.json';
import temperStatsData from '@/app/data/temperstats.json';
import { getWeaponTypes } from './aspectUtils';

interface StatOption {
  value: string;
  label: string;
  name?: string;
}

interface SlotStat {
  slot: string;
  all?: string[];
  barbarian?: string[];
  druid?: string[];
  necromancer?: string[];
  rogue?: string[];
  sorcerer?: string[];
  implicit?: string[];
}

function normalizeSlotName(slot: string, offhandType?: string): string {
  if (slot.toLowerCase() === 'offhand') {
    return offhandType || 'Offhand';
  }
  if (slot.toLowerCase().includes('weapon')) {
    return 'Weapon';
  }
  if (slot.toLowerCase().includes('ring')) {
    return 'Ring';
  }
  return slot;
}

export function getOffhandTypes(className: string | null): string[] {
  if (className === 'Necromancer') {
    return ['Offhand', 'Shield'];
  }
  return ['Offhand'];
}

export function getStatsForSlot(slot: string, className: string | null, offhandType?: string): StatOption[] {
  const normalizedSlot = normalizeSlotName(slot, offhandType);
  const slotStats = statsData.stats.find((s) => s.slot.toLowerCase() === normalizedSlot.toLowerCase());
  if (!slotStats) return [];

  let allStats = slotStats.all || [];
  if (className && slotStats[className.toLowerCase() as keyof SlotStat]) {
    const classStats = slotStats[className.toLowerCase() as keyof SlotStat];
    if (Array.isArray(classStats)) {
      allStats = [...allStats, ...classStats];
    }
  }

  return allStats.map((stat) => ({ value: stat, label: stat }));
}

export function getWeaponTypesForSlot(slot: string, className: string | null): StatOption[] {
  if (!className) return [];

  const weaponTypes = getWeaponTypes(slot, className);
  return weaponTypes.map((type) => ({ value: type, label: type }));
}

export function getTemperingStatsForSlot(slot: string, className: string | null): StatOption[] {
  if (!className) return [];

  const allowedTypes = getAllowedTemperTypes(slot);
  const classTemperStats = temperStatsData.temperstats.filter(
    (ts) => (ts.class === className || ts.class === 'All') && allowedTypes.includes(ts.type)
  );

  return classTemperStats.flatMap((temper) =>
    temper.stats.map((stat) => ({
      value: stat,
      label: stat,
      name: temper.name,
    }))
  );
}

function getAllowedTemperTypes(slot: string): string[] {
  const lowerSlot = slot.toLowerCase();
  if (lowerSlot.includes('weapon') || lowerSlot === 'offhand' || lowerSlot === 'shield')
    return ['Weapons', 'Offensive'];
  if (['amulet'].includes(lowerSlot)) return ['Offensive', 'Defensive', 'Utility', 'Mobility', 'Resource'];
  if (['gloves'].includes(lowerSlot)) return ['Offensive', 'Utility'];
  if (['ring 1', 'ring 2'].includes(lowerSlot)) return ['Offensive', 'Resource'];
  if (['helm', 'chest armor', 'pants'].includes(lowerSlot)) return ['Defensive', 'Utility'];
  if (['boots'].includes(lowerSlot)) return ['Utility', 'Mobility'];
  return [];
}

export function getImplicitForSlot(slot: string, offhandType?: string): StatOption[] {
  const normalizedSlot = normalizeSlotName(slot, offhandType);
  const slotStats = statsData.stats.find((s) => s.slot.toLowerCase() === normalizedSlot.toLowerCase());
  if (!slotStats || !slotStats.implicit) return [];

  return slotStats.implicit.map((stat) => ({ value: stat, label: stat }));
}

export function hasImplicit(slot: string, offhandType?: string): boolean {
  const normalizedSlot = normalizeSlotName(slot, offhandType);
  const slotStats = statsData.stats.find((s) => s.slot.toLowerCase() === normalizedSlot.toLowerCase());
  return !!slotStats?.implicit;
}
