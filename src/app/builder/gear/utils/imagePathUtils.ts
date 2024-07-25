export const getUniqueImagePath = (type: string, name: string): string => {
    let folder = '';
    switch (type) {
      case 'Amulet':
        folder = 'amulets';
        break;
      case 'Boots':
        folder = 'boots';
        break;
      case 'Chest Armor':
        folder = 'chest%20armor';  // URL encode the space directly
        break;
      case 'Gloves':
        folder = 'gloves';
        break;
      case 'Helm':
        folder = 'helms';
        break;
      case 'Shield':
        folder = 'offhand';
        break;
      case 'Pants':
        folder = 'pants';
        break;
      case 'Ring':
        folder = 'rings';
        break;
      default:
        folder = 'weapons';
    }
    
    // Encode the name separately
    const encodedName = encodeURIComponent(name);
    
    return `/images/uniques/${folder}/${encodedName}.png`;
  };
  
  export const getAspectImagePath = (type: string): string => {
    const lowerType = type.toLowerCase().replace(/\s+/g, '-');
    return `/images/aspects/${lowerType}.png`;
  };
  
  export const logImagePath = (type: string, name: string, isAspect: boolean = false): void => {
    const path = isAspect ? getAspectImagePath(type) : getUniqueImagePath(type, name);
    console.log(`Image path for ${name} (${type}):`, path);
  };