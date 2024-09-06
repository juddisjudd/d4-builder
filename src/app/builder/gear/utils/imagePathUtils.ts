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
      folder = 'chest%20armor';
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

  const encodedName = encodeURIComponent(name);

  return `/images/uniques/${folder}/${encodedName}.png`;
};

export const getAspectImagePath = (aspectName: string, aspectClass: string | undefined, aspectType: string): string => {
  const folder = aspectClass ? aspectClass.toLowerCase() : 'generic';
  
  // Remove any apostrophes and replace spaces with underscores
  let fileName = aspectName.toLowerCase().replace(/'/g, '').replace(/\s+/g, '_');
  
  // Handle cases where the aspect name starts with "Aspect of"
  if (fileName.startsWith('aspect_of_')) {
    // Keep the existing format
  } else if (fileName.endsWith('_aspect')) {
    // For cases like "Accelerating Aspect"
    fileName = `${fileName}`;
  } else {
    // For cases that don't start with "Aspect of" or end with "Aspect"
    fileName = `aspect_of_${fileName}`;
  }
  
  // Keep hyphens intact
  fileName = fileName.replace(/_-_/g, '-');
  
  return `/images/aspects/${folder}/${fileName}.png`;
};

export const logImagePath = (type: string, name: string, isAspect: boolean = false): void => {
  const path = isAspect ? getAspectImagePath(name, undefined, type) : getUniqueImagePath(type, name);
  console.log(`Image path for ${name} (${type}):`, path);
};