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
        return ['Defensive'];
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
        return ['Offensive'];
      case 'offhand':
        return ['Defensive'];
      default:
        return [];
    }
  };