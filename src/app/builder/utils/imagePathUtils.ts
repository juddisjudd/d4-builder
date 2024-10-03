export const getUniqueImagePath = (type: string, name: string): string => {
  const typeToFolderMap: { [key: string]: string } = {
    Amulet: 'amulets',
    Ring: 'rings',
    Boots: 'boots',
    Helm: 'helms',
    Pants: 'pants',
    'Chest Armor': 'chestarmor',
    Gloves: 'gloves',
    Shield: 'offhand',
    Totem: 'offhand',
    Bow: 'weapons',
    Staff: 'weapons',
    '2h Axe': 'weapons',
    '1h Dagger': 'weapons',
    '1h Sword': 'weapons',
    '1h Scythe': 'weapons',
    '2h Scythe': 'weapons',
    '2h Sword': 'weapons',
    Wand: 'weapons',
    '1h Mace': 'weapons',
    '2h Mace': 'weapons',
    Quarterstaff: 'weapons',
    Glaive: 'weapons',
    '1h Axe': 'weapons',
  };

  const folder = typeToFolderMap[type] || 'weapons';

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
