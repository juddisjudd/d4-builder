export const getAllowedAspectTypes = (slotType: string): string[] => {
  const lowerSlotType = slotType.toLowerCase();

  switch (lowerSlotType) {
    case 'helm':
      return ['Defensive', 'Utility'];
    case 'chest armor':
      return ['Defensive', 'Utility'];
    case 'gloves':
      return ['Offensive', 'Utility'];
    case 'pants':
      return ['Defensive', 'Utility'];
    case 'boots':
      return ['Utility', 'Mobility'];
    case 'amulet':
      return ['Offensive', 'Defensive', 'Utility', 'Mobility'];
    case 'ring 1':
    case 'ring 2':
      return ['Offensive', 'Resource'];
    case 'weapon':
    case 'bludgeoning weapon':
    case 'slashing weapon':
    case 'dual-wield weapon 1':
    case 'dual-wield weapon 2':
    case 'ranged weapon':
    case 'offhand':
      return ['Offensive', 'Defensive'];
    default:
      return [];
  }
};

export const getWeaponTypes = (slotType: string, className: string): string[] => {
  const lowerSlotType = slotType.toLowerCase();
  const lowerClassName = className.toLowerCase();

  switch (lowerClassName) {
    case 'barbarian':
      switch (lowerSlotType) {
        case 'bludgeoning weapon':
          return ['2h Mace'];
        case 'dual-wield weapon 1':
        case 'dual-wield weapon 2':
          return ['1h Sword', '1h Axe'];
        case 'slashing weapon':
          return ['2h Axe', '2h Sword'];
        default:
          return [];
      }
    case 'druid':
      if (lowerSlotType === 'weapon') return ['Staff', '1h Sword', '1h Mace', '1h Axe'];
      return [];
    case 'necromancer':
      switch (lowerSlotType) {
        case 'weapon':
          return ['Staff', '1h Sword', '1h Scythe', '2h Scythe', '2h Sword', '1h Dagger'];
        case 'offhand':
          return ['Shield'];
        default:
          return [];
      }
    case 'rogue':
      switch (lowerSlotType) {
        case 'ranged weapon':
          return ['Bow'];
        case 'dual-wield weapon 1':
        case 'dual-wield weapon 2':
          return ['1h Dagger', '1h Sword'];
        default:
          return [];
      }
    case 'sorcerer':
      if (lowerSlotType === 'weapon') return ['Staff', '1h Sword', 'Wand'];
      return [];
    case 'spiritborn':
      if (lowerSlotType === 'weapon') return ['Quarterstaff', 'Glaive'];
      return [];
    default:
      return [];
  }
};

export const getJewelryTypes = (slotType: string): string[] => {
  const lowerSlotType = slotType.toLowerCase();
  switch (lowerSlotType) {
    case 'amulet':
      return ['Amulet'];
    case 'ring 1':
    case 'ring 2':
      return ['Ring'];
    default:
      return [];
  }
};
