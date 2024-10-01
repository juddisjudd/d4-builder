export const getUniqueImagePath = (type: string, name: string): string => {
  let folder = '';
  switch (type) {
    case 'Amulet':
      folder = 'amulets';
      break;
    case 'Ring':
      folder = 'rings';
      break;
    case 'Boots':
      folder = 'boots';
      break;
    case 'Helm':
      folder = 'helms';
      break;
    case 'Pants':
      folder = 'pants';
      break;
    case 'Chest Armor':
      folder = 'chestarmor';
      break;
    case 'Gloves':
      folder = 'gloves';
      break;
    case 'Shield':
      folder = 'offhand';
      break;
    case 'Bow':
    case 'Staff':
    case '2h Axe':
    case '1h Dagger':
    case '1h Sword':
    case '1h Scythe':
    case '2h Scythe':
    case '2h Sword':
    case 'Wand':
    case '1h Mace':
    case '2h Mace':
    case 'Quarterstaff':
    case '1h Axe':
      folder = 'weapons';
      break;
    default:
      folder = 'weapons';
  }

  const fileName = name
    .toLowerCase()
    .replace(/'/g, '')
    .replace(/\s+/g, '_')
    .replace(/[^a-z0-9_-]/g, '');

  return `/images/uniques/${folder}/${fileName}.png`;
};

export const getAspectImagePath = (aspectName: string, aspectClass: string | undefined, aspectType: string): string => {
  const folder = aspectClass ? aspectClass.toLowerCase() : 'generic';

  let fileName = aspectName.toLowerCase().replace(/'/g, '').replace(/\s+/g, '_');

  if (fileName.startsWith('aspect_of_')) {
  } else if (fileName.endsWith('_aspect')) {
    fileName = `${fileName}`;
  } else {
    fileName = `aspect_of_${fileName}`;
  }

  fileName = fileName.replace(/_-_/g, '-');

  return `/images/aspects/${folder}/${fileName}.png`;
};

export const logImagePath = (type: string, name: string, isAspect: boolean = false): void => {
  const path = isAspect ? getAspectImagePath(name, undefined, type) : getUniqueImagePath(type, name);
  console.log(`Image path for ${name} (${type}):`, path);
};

export const getSkillImagePath = (className: string, skillName: string): string => {
  const formattedClassName = className.toLowerCase();
  const formattedSkillName = skillName.toLowerCase().replace(/\s+/g, '_').replace(/'/g, '');
  return `/images/skills/${formattedClassName}/${formattedSkillName}.png`;
};

export const getCategoryImagePath = (category: string): string => {
  const formattedCategory = category.toLowerCase().replace(/\s+/g, '_');
  return `/images/skills/categories/${formattedCategory}.png`;
};
