export interface UniqueData {
  name: string;
  class?: string;
  type: string;
  mythic?: boolean;
  secondary_stats?: string[];
  terciary_stats?: string[];
  filters?: string[];
  effect: string;
  flavor?: string;
  icon?: boolean;
}

export const uniques: UniqueData[] = [
  {
    name: '100,000 Steps',
    class: 'Barbarian',
    type: 'Boots',
    secondary_stats: ['Max Evade Charges'],
    terciary_stats: [
      'Dexterity',
      'Damage with Skills that Swap to New Weapons',
      'Movement Speed',
      'Ranks of Ground Stomp',
    ],
    effect:
      'After gaining the final damage bonus from the Walking Arsenal Key Passive, you automatically cast Ground Stomp and gain [32-50] Fury. This cannot happen more than once every 15 seconds.',
    flavor:
      '"While many Barbarians remained in the Dreadlands, small groups from the Oxen, Crane and Bear tribes instead chose to search the land for a new home." - A History of the Children of Bul-Kathos',
  },
  {
    name: "Ancients' Oath",
    class: 'Barbarian',
    type: '2h Axe',
    secondary_stats: ['Damage to Healthy Enemies'],
    terciary_stats: ['Damage to Close Enemies', 'Vulnerable Damage', 'Damage while Berserking', 'Ranks of Steel Grasp'],
    filters: ['Pull'],
    effect:
      'Steel Grasp launches 2 additional chains. Enemies that have been pulled by Steel Grasp take x [40-60%] bonus damage from you for 5 seconds.',
    flavor:
      '"Weapons wielded by the fiercest warriors often catch the eye of the Ancient spirits. If the wielder is worthy, the spirits may bless the steel with their strength." - Gerti, Oxen Tribe Forgemaster',
  },
  {
    name: "Arreat's Bearing",
    class: 'Barbarian',
    type: 'Pants',
    terciary_stats: ['Maximum Life', 'Ultimate Cooldown Reduction', 'Strength', 'Damage Reduction'],
    effect:
      'Ancients you summon are empowered.\nKorlic creates an Earthquake that deals [X] Physical damage over 4 seconds when he leaps.\nTalic leaves behind Dust Devils that deal [X] damage while he whirlwinds.\nMawdac ignites the ground Burning enemies for an additional [X] damage over 4 seconds when he upheaves the ground.',
    flavor:
      '"Rise clansmen and reclaim our trampled honor! Ancients\' blood runs through us all! We are storms - earth breaking, maelstrom wielding. The fire of the gods burn still! They are with us!" - Ealda',
  },
  {
    name: 'Battle Trance',
    class: 'Barbarian',
    type: 'Amulet',
    secondary_stats: ['Resistance to All Elements'],
    terciary_stats: ['Cooldown Reduction', 'Damage Reduction from Close Enemies', 'Maximum Fury', 'Ranks of Frenzy'],
    filters: ['Attack Speed'],
    effect:
      "Increase Frenzy's maximum stacks by 2 . While you have maximum Frenzy, your other Skills gain [35-45%] increased Attack Speed.",
    flavor:
      '"The change that overtook my brother in battle was terrifying. His eyes turned hard like diamonds, and the way he moved... it was like he was dancing to music only he could hear." - Captain Dervin',
  },
  {
    name: 'Fields of Crimson',
    class: 'Barbarian',
    type: '2h Sword',
    secondary_stats: ['Critical Strike Damage'],
    terciary_stats: [
      'Damage with Two-Handed Slashing Weapons',
      'Damage Over Time',
      'Critical Strike Damage',
      'Rupture Cooldown Reduction',
    ],
    filters: ['Bleed'],
    effect:
      'While using this weapon, damaging at least one enemy with Rupture creates a blood pool that inflicts [X] Bleeding damage over 6 seconds. Enemies standing in the pool take 30% increased damage.',
    flavor:
      "\"We've been fighting these flesh-eaters for so long, been soaked in so much blood, that after a while it's difficult to tell what side you're truly on.\" - Daelyr, Crane Tribe warrior",
  },
  {
    name: "Gohr's Devastating Grips",
    class: 'Barbarian',
    type: 'Gloves',
    terciary_stats: [
      'Critical Strike Chance Against Close Enemies',
      'Lucky Hit Chance',
      'Damage',
      'Ranks of Whirlwind',
    ],
    effect:
      'Whirlwind explodes every 2 seconds and after it ends, dealing [40-50%] of the total Base damage dealt to surrounding enemies as Fire damage.',
    flavor:
      '"The brutish construction of these gloves belies the strength they bestow. Gohr was clearly no craftsman, but it would be foolish to ignore the triumph of his work." - Barrett\'s Book of Implements',
  },
  {
    name: 'Hellhammer',
    class: 'Barbarian',
    type: '2h Mace',
    secondary_stats: ['Overpower Damage'],
    terciary_stats: [
      'Damage with Two-Handed Bludgeoning Weapons',
      'Damage to Burning Enemies',
      'Damage Reduction from Enemies That Are Burning',
      'Ranks of Upheaval',
    ],
    filters: ['Burn'],
    effect: 'Upheaval ignites the ground Burning enemies for an additonal [X] damage over 3 seconds.',
    flavor:
      'The demon prince Ikonoth slew hundreds of the Heavenly Host with this infernal hammer before falling to none other than the Archangel Imperius himself.',
  },
  {
    name: 'Overkill',
    class: 'Barbarian',
    type: '2h Mace',
    secondary_stats: ['Overpower Damage'],
    terciary_stats: ['Physical Damage', 'Overpower Damage', 'Damage to Injured Enemies', 'Ranks of Death Blow'],
    effect:
      "Death Blow creates a shockwave, dealing [24-38%] of its Base damage to enemies. Enemies who die to this effect also reset Death Blow's Cooldown.",
    flavor:
      'The malformed snake creatures that live in the swamps are not content with simply killing their prey. They seem to take a malicious pleasure from inflicting as much suffering as possible before death.',
  },
  {
    name: 'Rage of Harrogath',
    class: 'Barbarian',
    type: 'Chest Armor',
    terciary_stats: [
      'Physical Damage',
      'Critical Strike Chance with Physical Damage Against Elites',
      'Damage Reduction from Enemies That Are Bleeding',
      'Thorns',
    ],
    filters: ['Lucky Hit', 'Bleed'],
    effect:
      'Lucky Hit: Inflicting Bleeding on an enemy has up to a [20-40%] chance to reduce the Cooldowns of your Skills by 1 second.',
    flavor:
      "Harrogath, the final bastion of resistance against Baal's assault on Mt. Arreat was destroyed along with the Worldstone. The survivors never forgave the betrayal that led to the loss of their home.",
  },
  {
    name: "Ramaladni's Magnum Opus",
    class: 'Barbarian',
    type: '1h Sword',
    secondary_stats: ['Critical Strike Damage'],
    terciary_stats: [
      'Damage with Dual-Wielded Weapons',
      'Damage to Close Enemies',
      'Maximum Fury',
      'Lucky Hit: Up to a 5% Chance to Restore [X]% Primary Resource',
    ],
    effect:
      'Skills using this weapon deal [0.2-0.4%] increased damage per point of Fury you have, but you lose 2 Fury every second.',
    flavor:
      '"Without him the wine is less sweet, the hearth less warm, and our blades less keen. Our blood brother is gone, but Bul-Kathos willing, we will meet again one day." - Sorrowsong for Ramaladni',
  },
  {
    name: 'Ring of Red Furor',
    class: 'Barbarian',
    type: 'Ring',
    secondary_stats: ['Resistance to All Elements', 'Fire Resistance'],
    terciary_stats: ['Strength', 'Attack Speed', 'Maximum Fury', 'Resource Generation'],
    filters: ['Critical Strike'],
    effect:
      'After spending 100 Fury within 3 seconds, your next cast of Hammer of the Ancients, Upheaval, or Death Blow within 5 seconds is a guaranteed Critical Strike and deals [10-30%] bonus Critical Strike Damage.',
    flavor:
      '"Anger brings strength but clouds the mind. You must learn to focus your fury, direct it with purpose. Keep our sacred duty at the forefront of your mind, always." -Talic, to Madawc',
  },
  {
    name: 'Ring of the Ravenous',
    class: 'Barbarian',
    type: 'Ring',
    secondary_stats: ['Resistance to All Elements', 'Shadow Resistance'],
    terciary_stats: [
      'Critical Strike Chance',
      'Vulnerable Damage',
      'Ranks of All Brawling Skills',
      'Damage to Bleeding Enemies',
    ],
    effect:
      "Rend's duration is increased by [2.0-4.0] seconds. Damaging enemies with Brawling Skills applies 2 stacks of Rend's Bleed. This effect can only occur once every 4 seconds per enemy.",
    flavor:
      '"The hunger, it starts so small, like a tickle in the back of your mind. You believe the lie that you still have control until you\'re so far gone you can\'t even recognize yourself." - Varyana',
  },
  {
    name: 'Tuskhelm of Joritz the Mighty',
    class: 'Barbarian',
    type: 'Helm',
    terciary_stats: [
      'Maximum Fury',
      'Attack Speed',
      'Damage while Berserking',
      'Ranks of the Aggressive Resistance Passive',
    ],
    filters: ['Cooldown'],
    effect:
      'When you gain Berserking while already Berserk, you have a [40-60%] chance to become more enraged granting x15% increased damage, 2 Fury per second, and 10% Cooldown Reduction.',
    flavor:
      'As he fought with side by side with Raekor to liberate the labor camp, Joritz claimed this dented helm from a fallen foe. As his legend grew, its unique shape became synonymous with his great deeds.',
  },
  {
    name: 'Twin Strikes',
    class: 'Barbarian',
    type: 'Gloves',
    terciary_stats: [
      'Attack Speed',
      'Lucky Hit: Up to a 5% Chance to Restore Primary Resource',
      'Damage',
      'Ranks to Double Swing',
    ],
    effect:
      'After casting Double Swing 4 times, your next Double Swing will hit 2 additional times, each dealing [10-25%] increased damage.',
    flavor: '"When hitting it once doesn\'t kill it, hit it twice." - Bear Tribe Proverb',
  },
  {
    name: "Airidah's Inexorable Will",
    class: 'Druid',
    type: 'Ring',
    secondary_stats: ['Resistance to All Elements', 'Lightning Resistance'],
    terciary_stats: ['Willpower', 'Damage to Close Enemies', 'Lucky Hit Chance', 'Ultimate Skill Cooldown Reduction'],
    filters: ['Distant Enemies', 'Pull'],
    effect:
      'When casting an Ultimate Skill and again 5 seconds after, you Pull in Distant enemies and deal [X] Physical damage to them. This damage is increased by x1% per 1 point of Willpower you have.',
    flavor:
      '"When I was born, I breathed in the wind and the storm and they gave me life. When I die, I will breath out, and return that gift to the skies." - Journal excerpt',
  },
  {
    name: 'Dolmen Stone',
    class: 'Druid',
    type: 'Amulet',
    terciary_stats: [
      'Maximum Life',
      'Resource Generation',
      'Nature Magic Skill Cooldown Reduction',
      'Ranks of All Wrath Skills',
    ],
    effect: 'Casting Boulder while Hurricane is active will cause your boulders to rotate around you.',
    flavor:
      '"As the hateful mob beat on his door, he gripped the pulsing shard tightly and screamed for calm. When he opened his eyes, all that greeted him was silence and the blood-smeared ruins of his cottage."',
  },
  {
    name: 'Earthbreaker',
    class: 'Druid',
    type: 'Ring',
    secondary_stats: ['Resistance to All Elements', 'Cold Resistance'],
    terciary_stats: ['Spirit Cost Reduction', 'Willpower', 'Attack Speed', 'Lucky Hit: Chance to Slow for 2 Seconds'],
    effect:
      'Landslide causes the ground to erupt in tectonic spikes which continue to deal [X] damage over 2 seconds.\nCasting Landslide in this area has a [20-30]% chance to cause additional Landslide pillars to spawn within.',
    flavor:
      "When Arreat was sundered, the world quaked. The Druid Aglainn journeyed far to chronicle the aftermath. Grief-stricken by the great mountain king's fall, he rent the earth anew.",
  },
  {
    name: 'Fleshrender',
    class: 'Druid',
    type: '1h Mace',
    secondary_stats: ['Overpower Damage'],
    terciary_stats: [
      'Damage while Shapeshifted',
      'Damage to Poisoned Enemies',
      'Core Skill Damage',
      'Ranks of All Defensive Skills',
    ],
    filters: ['Poison'],
    effect:
      'Casting a Defensive Skill deals damage to Nearby Poisoned enemies, increased by x15% for every 100 Willpower you have.',
    flavor:
      '"This weapon is a reminder of the unbridled savagery of our druidic ancestors, the wisdom of which I see more clearly with every day that passes." - Moreg, Druidic Scholar',
  },
  {
    name: 'Greatstaff of the Crone',
    class: 'Druid',
    type: 'Staff',
    secondary_stats: ['Damage to Crowd Controlled Enemies'],
    terciary_stats: [
      'Damage to Close Enemies',
      'Damage to Crowd Controlled Enemies',
      'Non-Physical Damage',
      'Ranks of Claw',
    ],
    effect: 'Claw is now a Storm Skill and also casts Storm Strike at [120-150%] normal damage.',
    flavor:
      '"She has existed in Scosglen since before Fiacla-Géar walked the land. Her purpose is a mystery to us all. However, approach her with deference; she may grant you her counsel." - Airidah, to Donan',
  },
  {
    name: "Hunter's Zenith",
    class: 'Druid',
    type: 'Ring',
    secondary_stats: ['Lightning Resistance', 'Poison Resistance'],
    terciary_stats: [
      'Damage while Shapeshifted',
      'Critical Strike Chance',
      'Ranks of the Heightened Senses Passive',
      'Ranks of the Quickshift Passive',
    ],
    filters: ['Heal'],
    effect:
      'Gain a bonus when you kill with Shapeshifting Skill:\n\nWerewolf: Your next Non-Ultimate Werebear Skill costs no Resource and has no Cooldown.\n\nWerebear: Your next Werewolf Skill will Heal you for [X] when damage is first dealt.',
    flavor:
      '"By fang, claw, spear, or sword - send the bastards back to the flames from which they crawled! Soak the peat with their blood! For Fiacla-Géar! For Scosglen!" - Nafain, during the Days of Ash',
  },
  {
    name: 'Insatiable Fury',
    class: 'Druid',
    type: 'Chest Armor',
    terciary_stats: [
      'Physical Damage',
      'Overpower Damage',
      'Damage Reduction While Fortified',
      'Total Armor while in Werebear Form',
    ],
    filters: ['Skill Rank'],
    effect: 'Werebear form is now your true form, and you gain +3 Ranks to all Werebear Skills.',
    flavor:
      "When the Days of Ash began, the great druid Nafain reminded his disciples that nothing, not even the loss of their humanity, was too great a sacrifice to protect Túr Dúlra from Astaroth's flames.",
  },
  {
    name: "Mad Wolf's Glee",
    class: 'Druid',
    type: 'Chest Armor',
    terciary_stats: [
      'Maximum Life',
      'Poison Damage',
      'Damage Reduction from Enemies That Are Poisoned',
      'Movement Speed',
    ],
    filters: ['Skill Rank'],
    effect: 'Werewolf form is now your true form, and you gain +3 Ranks to all Werewolf Skills.',
    flavor:
      '"He was not a victim of the curse - he sought it out. As his skin split and his bones cracked, his laughter never ceased." - Tale of the Mad Nobleman',
  },
  {
    name: "Storm's Companion",
    class: 'Druid',
    type: 'Pants',
    secondary_stats: ['Your Potion Also Briefly Grants Movement Speed'],
    terciary_stats: ['Maximum Life', 'Damage Reduction', 'Companion Movement Speed', 'Ranks of Wolves'],
    filters: ['Lightning'],
    effect:
      'Your Wolf Companions are infused with the power of the storm, dealing Lightning damage and gaining the Storm Howl ability.',
    flavor: '"The storm\'s rage is my own, brother. I call, and the skies roar in reply." - Vasily, to Bul-Kathos',
  },
  {
    name: 'Tempest Roar',
    class: 'Druid',
    type: 'Helm',
    terciary_stats: ['Damage While Shapeshifted', 'Critical Strike Damage', 'Maximum Spirit', 'Poison Resistance'],
    filters: ['Lucky Hit'],
    effect:
      'Lucky Hit: Storm Skills have up to a [15-25%] chance to grant 4 Spirit. Your base Storm Skills are now also Werewolf Skills.',
    flavor:
      '"Listen, child, to the music of the storm. It has its own rhythm. Its own melody. Hear how beautifully it sings, and perhaps one day you will be able to join in its harmony." - Airidah',
  },
  {
    name: "Unsung Ascetic's Wraps",
    class: 'Druid',
    type: 'Gloves',
    terciary_stats: [
      'Lucky Hit Chance',
      'Ranks of Lightning Storm',
      'Critical Strike Chance',
      'Ranks of the Defiance Passive',
    ],
    effect:
      'Lightning Storm gains 1 additional strike each times it grows.\nLightning Storm Critical Strikes cause lightning to strike twice, dealing [10-20%] increased damage.',
    flavor:
      '"The storm caller returns, day after day, demanding to meet the Tree. He beats his chest and demonstrates his powers, refusing to believe that he will never be chosen." - Excerpt from Gulyas\' Diary',
  },
  {
    name: "Vasily's Prayer",
    class: 'Druid',
    type: 'Helm',
    terciary_stats: ['Damage While Shapeshifted', 'Overpower Damage', 'Maximum Life', 'Lightning Resistance'],
    filters: ['Fortify'],
    effect: 'Your Earth Skills are now also Werebear Skills and Fortify you for [X] .',
    flavor:
      '"Roots from the Great Oak growing at the seaward statue of Vasily will, on rare occasions, be found twisted back upon themselves, suffused with ferocious magic." - Barrett\'s Book of Implements',
  },
  {
    name: 'Waxing Gibbous',
    class: 'Druid',
    type: '1h Axe',
    secondary_stats: ['Damage to Healthy Enemies'],
    terciary_stats: [
      'Critical Strike Damage',
      'Damage to Close Enemies',
      'Damage to Injured Enemies',
      'Spirit on Kill',
    ],
    filters: ['Stealth', 'Critical Strike'],
    effect:
      'Gain Stealth for 2 seconds when killing enemies with Shred. Breaking Stealth with an attack grants Ambush which gaurantees Critical Strikes for [1.0-2.5] seconds.',
    flavor:
      "The nights preceding the full moon are sometimes far more dangerous than the event itself. The frenzy has begun to rise, yet the night is just dark enough to obscure a hunter from their prey's sight.",
  },
  {
    name: 'Wildheart Hunger',
    class: 'Druid',
    type: 'Boots',
    secondary_stats: ["Attacks Reduce Evade's Cooldown by 0.8 Seconds"],
    terciary_stats: ['Overpower Damage', 'Damage Reduction', 'Critical Strike Damage', 'Movement Speed'],
    filters: ['Shapeshift', 'Werewolf', 'Werebear'],
    effect:
      'When you Shapeshift into a Werewolf or a Werebear, you gain Wildheart for 5 seconds. Wildheart grants you [1-1.5%] increased damage with Shapeshifting Skills every 2 seconds, stacking 20 times.',
  },
  {
    name: 'Black River',
    class: 'Necromancer',
    type: '1h Scythe',
    secondary_stats: ['Life On Kill'],
    terciary_stats: [
      'Intelligence',
      'Ranks of All Corpse Skills',
      'Ranks of the Hewed Flesh Passive',
      'Ranks of the Fueled by Death Passive',
    ],
    effect:
      'Corpse Explosion consumes up to 4 additonal Corpses around the initial Corpse, dealing [X%] increased damage and with a [X%] larger radius per additional Corpse.',
    flavor:
      '"The scrolls describe a river of tar that separated the living from the land of the dead. Any unfortunate soul who tried to cross would be dragged down into oblivion." - Notes of Scholar Kamien',
  },
  {
    name: "Blood Artisan's Cuirass",
    class: 'Necromancer',
    type: 'Chest Armor',
    terciary_stats: [
      'Damage for 4 Seconds After Picking Up a Blood Orb',
      'Blood Orb Healing',
      'Maximum Life',
      'Ranks of Bone Spirit',
    ],
    filters: ['Blood Orb'],
    effect:
      'When you pick up [10-5] Blood Orbs, a free Bone Spirit is spawned, dealing bonus damage based on your current Life percent.',
    flavor:
      '"The infamous Necromancer Gaza-Thul\'s mastery over blood magic was indisputable. Many suspect that upon his death, his skin was used to fashion this eldritch armor." - Barrett\'s Book of Implements',
  },
  {
    name: 'Blood Moon Breeches',
    class: 'Necromancer',
    type: 'Pants',
    secondary_stats: ['While Injured, Your Potion Also Grants 30% Movement Speed for 2 Seconds'],
    terciary_stats: [
      'Maximum Life',
      'Ranks of All Curse Skills',
      'Ranks of the Amplify Damage Passive',
      'Damage Reduction from Enemies Affected by Curse Skills',
    ],
    filters: ['Overpower'],
    effect:
      'Your Minions have a [3-7%] chance to curse enemies. Enemies affected by at least 1 of your curses take x70% increased Overpower damage from you.',
    flavor:
      'A naturally occurring curiosity, the blood moon persists as a sign of woe for the most superstitious Zakarum faithful. Children born under it are often considered cursed and cast out, lest it spread.',
  },
  {
    name: 'Bloodless Scream',
    class: 'Necromancer',
    type: '2h Scythe',
    secondary_stats: ['Life On Kill'],
    terciary_stats: ['Darkness Skill Damage', 'Damage to Chilled Enemies', 'Intelligence', 'Cold Resistance'],
    filters: ['Lucky Hit', 'Chill'],
    effect:
      'Your Darkness Skills Chill enemies for up to 100% .\n\nLucky Hit: Your Darkness Skills deal x [20-50%] bonus damage to Frozen enemies and have up to a 100% chance to generate [15-20] additional Essence against Frozen targets.',
    flavor:
      '"My companion swung her odd weapon in a wide arc, and our pursuer stopped short. The look of horror on his face as his body fell to pieces will haunt me forever." - The Ebon Pages, Canto II, Verse XI',
  },
  {
    name: "Cruor's Embrace",
    class: 'Necromancer',
    type: 'Gloves',
    terciary_stats: [
      'Overpower Damage',
      'Core Damage',
      'Lucky Hit: Up to a 5% Chance to Heal Life',
      'Ranks to Blood Surge',
    ],
    filters: ['Blood Surge', 'Corpse'],
    effect:
      'Blood Surge consumes Corpses to cause mini novas, dealing [X] damage. Damage is increased by 10% per target drained by the initial cast, up to 50%. Damage is also increased by 20% for each Corpse consumed.',
    flavor:
      "In the blood dancer's grasp, a victim lies, A vessel dried 'neath darkened skies. Their life extinguished, veins burst and drained, In Cruor's embrace, forever enchained.",
  },
  {
    name: 'Deathless Visage',
    class: 'Necromancer',
    type: 'Helm',
    terciary_stats: [
      'Damage Reduction',
      'Physical Damage',
      'Critical Strike Damage with Bone Skills',
      'Maximum Essence',
    ],
    effect:
      'Bone Spear leaves behind echoes as it travels that explode dealing [X] damage, increased by x5% for every 30% of your Critical Strike Damage Bonus.',
    flavor:
      '"Rathma is endless. He was the first Ancient, and will remain at the end. He is the master of the Great Cycle of Being. When Death comes for him, why should he fear it?" - Vauntus, Acolyte of Rathma',
  },
  {
    name: "Deathspeaker's Pendant",
    class: 'Necromancer',
    type: 'Amulet',
    secondary_stats: ['Resistance to All Elements'],
    terciary_stats: [
      'Blood Skill Damage',
      'Summoning Skill Damage',
      'Essence Cost Reduction',
      'Ranks of the Coalesced Blood Passive',
    ],
    effect:
      'Blood Surge casts a mini nova on your Minions, dealing [X] damage. Damage is increased by 10% per target drained by the initial cast, up to 50%.',
    flavor:
      "Once a sanctum for Rathma's studies, the Temple of the Deathspeaker became a proving grounds for potential leaders of his priesthood. Its halls are filled with the corpses of those who failed.",
  },
  {
    name: 'Ebonpiercer',
    class: 'Necromancer',
    type: 'Amulet',
    secondary_stats: ['Resistance to All Elements'],
    terciary_stats: [
      'Shadow Damage Over Time',
      'Damage Reduction from Shadow Damage Over Time-Affected Enemies',
      'Essence Cost Reduction',
      'Movement Speed',
    ],
    effect: 'Blight also shoots 4 smaller projectiles that pierce enemies and deal [X] Shadow damage over 3 seconds.',
    flavor:
      "This talisman was the life's work of Deathspeaker Jurdann. Following his premature demise, Jurdann's successor wore the amulet in tribute as they trialed against the Temple of the Deathspeaker.",
  },
  {
    name: 'Greaves of the Empty Tomb',
    class: 'Necromancer',
    type: 'Boots',
    secondary_stats: ['Max Evade Charges'],
    terciary_stats: [
      'Movement Speed',
      'Essence Cost Reduction',
      'Lucky Hit Chance with Shadow Damage',
      'Damage Reduction from Enemies That Are Affected By Shadow Damage Over Time',
    ],
    filters: ['Shadow'],
    effect:
      'Create desecrated ground beneath your Sever spectres as they travel, damaging enemies for [X] Shadow damage over 2 seconds.',
    flavor:
      '"The massive door to my family\'s crypt, which had taken a dozen men to close, was thrown open. Had I known the horrors to come I never would have set foot inside!" -The Ebon Pages, Canto I, Verse VII',
  },
  {
    name: 'Howl from Below',
    class: 'Necromancer',
    type: 'Gloves',
    terciary_stats: [
      'Lucky Hit Chance',
      'Corpse Skill Attack Speed',
      'Lucky Hit: Up to a [X]% Chance to Stun',
      'Lucky Hit: Up to a [X]% Chance to Fear',
    ],
    effect:
      "Instead of detonating immediately, Corpse Explosion summons a Volatile Skeleton that charges at a random enemy and explodes. Corpse Explosion's damage is increased by [30-40%] .",
    flavor:
      '"Can you not hear it? That endless scream from the cold earth beneath your feet!? They are down there, trapped, blind with rage! Waiting to drag us down into the sod!" - Ravings of Madman Gustav',
  },
  {
    name: 'Lidless Wall',
    class: 'Necromancer',
    type: 'Shield',
    secondary_stats: ['Block Chance', 'Blocked Damage Reduction', 'Main Hand Weapon Damage', 'Thorns'],
    terciary_stats: [
      'Attack Speed',
      'Maximum Life',
      'Maximum Essence',
      'Lucky Hit: Up to a 5% Chance to Restore [X]% Primary Resource',
    ],
    filters: ['Lucky Hit', 'Bone'],
    effect:
      'Lucky Hit: While you have an active Bone Storm, hitting an enemy outside of a Bone Storm has up to a [15-30%] chance to spawn an additional Bone Storm at their location. Each of your active Sacrifice bonuses increases the chance by 25% and the total number of additional Bone Storms you can have by 1.',
    flavor:
      'Initially an unpopular choice to replace Mendeln as Deathspeaker, Daros quickly proved his worth with the creation of this masterpiece.',
  },
  {
    name: 'Mutilator Plate',
    class: 'Necromancer',
    type: 'Chest Armor',
    terciary_stats: ['Willpower', 'Total Armor', 'Healing Received', 'Maximum Life'],
    effect:
      'You are Blood Lanced, and when Blood Lance would deal damage to you it instead Fortifies you for [1-2%] of your Maximum Life and has a 5% chance to form a Blood Orb. Blood Lance deals x [10-20%] increased damage.',
    flavor:
      '"The Cathedral of Light\'s earliest attempts at crafting their penitent armor was to infuse the plate with painful blood magic, before such acts were deemed heretical." - Barrett\'s Book of Implements',
  },
  {
    name: 'Ring of Mendeln',
    class: 'Necromancer',
    type: 'Ring',
    secondary_stats: ['Cold Resistance', 'Shadow Resistance'],
    terciary_stats: ['Lucky Hit Chance', 'Minion Attack Speed', 'Maximum Minion Life', 'Thorns'],
    filters: ['Lucky Hit'],
    effect: 'Every 6th attack from each Minion is empowered, exploding for [X] Physical damage.',
    flavor:
      'The signet of Mendeln ul-Diomed, the founder of the Priests of Rathma and the first Necromancer, was lost for over 3,000 years. The immense power over death held within, however, has not diminished.',
  },
  {
    name: 'Ring of the Sacrilegious Soul',
    class: 'Necromancer',
    type: 'Ring',
    secondary_stats: ['Resistance to All Elements', 'Poison Resistance'],
    terciary_stats: ['Lucky Hit Chance', 'Maximum Life', 'Maximum Essence', 'Ranks of All Corpse Skills'],
    effect:
      'You automatically activate the following equipped Skills on Corpses around you:\nRaise Skeleton every [2-1] seconds.\nCorpse Explosion every [2-1] seconds.\nCorpse Tendrils every [16-8] seconds.',
    flavor:
      'The mere proximity of a practitioner of such dark arts can rouse the dead and disturb those souls who have earned their rest.',
  },
  {
    name: "Asheara's Khanjar",
    class: 'Rogue',
    type: '1h Dagger',
    secondary_stats: ['Damage to Close Enemies'],
    terciary_stats: [
      'Basic Skill Damage',
      'Damage to Crowd Controlled Enemies',
      'Movement Speed for 4 Seconds After Killing an Elite',
      'Lucky Hit Chance',
    ],
    filters: ['Attack Speed'],
    effect: 'Hits with this weapon increase your Attack Speed by [4-6%] for 4 seconds, up to [20-30%] .',
    flavor:
      "When Caldeum's gates closed, Asheara led her Iron Wolves out of the city knowing full well they would never return. Instead they roamed Kehjistan pledging their blades to any who were in need.",
  },
  {
    name: 'Beastfall Boots',
    class: 'Rogue',
    type: 'Boots',
    secondary_stats: ['Maximum Evade Charges'],
    terciary_stats: ['Maximum Energy', 'Damage Reduction', 'Cooldown Reduction', 'Movement Speed', ''],
    filters: ['Ultimate', 'Core', 'Energy'],
    effect:
      'When you cast an Ultimate Skill, your next Core Skill consumes all of your energy and deals [0.25-0.75%] increased damage per Energy consumed. Using a Cooldown restores 15 Energy.',
    flavor:
      '"Genai grew proud and fond of boasting of her hunting prowess. She claimed she was fast enough to catch even the spirit Leraye, who cursed her for such an insult." - Fable of Genai\'s Twenty Trials',
  },
  {
    name: 'Condemnation',
    class: 'Rogue',
    type: '1h Dagger',
    secondary_stats: ['Damage to Close Enemies'],
    terciary_stats: [
      'Basic Skill Attack Speed',
      'Critical Strike Damage',
      'Damage with Dual-Wielded Weapons',
      'Core Skill Damage',
    ],
    effect:
      'Your Core Skills deal [20-40%] increased damage when spending 3 Combo Points. Your Skills using this weapon have a 30% chance to generate 3 Combo Points.',
    flavor:
      '"I\'ve never seen such ruthless butchery. He deserves to be be shipped off to die in the swamps with the rest of the godless murderers." - Witness to the murder of Sergeant Walcot',
  },
  {
    name: 'Cowl of the Nameless',
    class: 'Rogue',
    type: 'Helm',
    terciary_stats: [
      'Damage Reduction from Close Enemies',
      'Cooldown Reduction',
      'Crowd Control Duration',
      'Ranks of Imbuement Skills',
    ],
    filters: ['Lucky Hit', 'Crowd Control'],
    effect: 'You gain [15-25%] increased Lucky Hit Chance against Crowd Controlled enemies.',
    flavor:
      '"He is banished from the Guild, his name stricken from the Book. His punishment is to never have been." - Excerpt from a burned parchment',
  },
  {
    name: 'Eaglehorn',
    class: 'Rogue',
    type: 'Bow',
    secondary_stats: ['Damage to Distant Enemies'],
    terciary_stats: ['Critical Strike Chance', 'Physical Damage', 'Vulnerable Damage', 'Damage to Elites'],
    filters: ['Vulnerable'],
    effect:
      'Penetrating Shot makes enemies Vulnerable for 3 seconds. Every 4th cast bounces off walls and scenery and deals x [50%-70%] bonus damage.',
    flavor:
      '"Scholars have been unable to decipher the runes carved into this bow, however all agree they are related to its uncanny ability to bend arrows towards their targets." - Barrett\'s Book of Implements',
  },
  {
    name: 'Eyes in the Dark',
    class: 'Rogue',
    type: 'Pants',
    secondary_stats: ['Your Potion Also Briefly Grants Movement Speed'],
    terciary_stats: ['Damage Reduction', 'Shadow Damage', 'Maximum Life', 'Damage to Enemies Affected by Trap Skills'],
    effect:
      'Unless it hits a Boss or Player, Death Trap deals [50-90%] increased damage and will re-arm iteself a second time, however the Cooldown is increased by [20-15%] .',
    flavor:
      '"And so, when the sun dipped behind the hills each night, he knew that Ashen Jack would soon be near. Watching, and waiting." - Greenslade\'s Tales, Chapter 2: "Each Long Night"',
  },
  {
    name: 'Grasp of Shadow',
    class: 'Rogue',
    type: 'Gloves',
    terciary_stats: ['Attack Speed', 'Dexterity', 'Shadow Clone Damage', 'Ranks of All Core Skills'],
    filters: ['Lucky Hit'],
    effect:
      'Lucky Hit: Damaging a Vulnerable enemy with a Marskman or Cutthroat Skill has up to a [24-34%] chance to summon a Shadow Clone that mimics your attack.',
    flavor:
      "Dark wisps creep hungrily across these gloves, like an assassin's blade seeking a life to steal on a moonless night.",
  },
  {
    name: "Saboteur's Signet",
    class: 'Rogue',
    type: 'Ring',
    secondary_stats: ['Resistance to All Elements', 'Shadow Resistance'],
    terciary_stats: [
      'Damage to Crowd Controlled Enemies',
      'Critical Strike Chance',
      'Maximum Life',
      'Critical Strike Damage',
    ],
    filters: ['Stun'],
    effect:
      'Casting Flurry has a [15-30%] chance to release Stun Grenades that deal [X] Physical damage and Stun enemies for 1 second. Your Grenade Skills have a 2% Lucky Hit Chance.',
    flavor: '"The element of surprise is the starting point. In this moment, be sure to finish it." - Kashya',
  },
  {
    name: "Scoundrel's Kiss",
    class: 'Rogue',
    type: 'Ring',
    secondary_stats: ['Resistance to All Elements', 'Poison Resistance'],
    terciary_stats: [
      'Critical Strike Chance',
      'Ranks to Rapid Fire',
      'Imbuement Cooldown Reduction',
      'Attack Speed for 4 Seconds After Dodging an Attack',
    ],
    effect: 'Rapid Fire now lobs exploding arrows that deal [15%-25%] increased damage.',
    flavor: '"This\'ll blow your hair back." - Lyndon',
  },
  {
    name: "Scoundrel's Leathers",
    class: 'Rogue',
    type: 'Chest Armor',
    terciary_stats: [
      'Trap Skill Damage',
      'Damage to Enemies Affected by Trap Skills',
      'Damage Reduction from Enemies Affected by Trap Skills',
      'Dodge Chance',
    ],
    effect:
      'While you have unlimited Energy from Inner Sight, your Core Skills have a [60-80%] chance to spawn Caltrops, Poison Trap, or Death Trap.',
    flavor:
      '"Rumor has it he lost them in a game of Skull & Anchor, but the boss is a devil with the dice. I think he wanted to give the poor sod something to keep him warm without wounding his pride." - Elstir',
  },
  {
    name: 'Skyhunter',
    class: 'Rogue',
    type: 'Bow',
    secondary_stats: ['Damage to Distant Enemies'],
    terciary_stats: ['Dexterity', 'Marksman Skill Damage', 'Critical Strike Damage', 'Ranks of the Exploit Passive'],
    filters: ['Critical Strike'],
    effect:
      'The first direct damage you deal to an enemy is a guaranteed Critical Strike. When you consume Precision casting a Skill, that Skill gains x [20-40%] increased Critical Strike Damage and you gain [20-40] Energy.',
    flavor:
      '"Genai took up her bow and aimed at the sun itself. The light burned her eyes, but her arrow flew true. Wounded, the sun hid, and brought forth the first night. - Fable of the Great Sky-Hunt',
  },
  {
    name: 'Windforce',
    class: 'Rogue',
    type: 'Bow',
    secondary_stats: ['Damage to Distant Enemies'],
    terciary_stats: [
      'Vulnerable Damage',
      'Core Skill Damage',
      'Ranks of the Concussive Passive',
      'Ranks of the Impetus Passive',
    ],
    filters: ['Lucky Hit', 'Knock Back'],
    effect:
      'Lucky Hit: Hits with this weapon have up to a [30-40%] chance to deal double damage and Knock Back the target.',
    flavor:
      '"There have been numerous world-shaping conflicts throughout history. This bow has been found on the battlefield of every one, and always in the hands of the victors." - Barrett\'s Book of Implements',
  },
  {
    name: 'Word of Hakan',
    class: 'Rogue',
    type: 'Amulet',
    terciary_stats: [
      'Ultimate Skill Damage',
      'Rain of Arrows Cooldown Reduction',
      'Movement Speed',
      'Ranks of All Imbuement Skills',
    ],
    effect: 'Your Rain of Arrows is always Imbued with all Imbuements at once.',
    flavor:
      '"Let the great gates of Caldeum be sealed. Let its proud walls stand fiercely defended. The rest of Kehjistan may suffer this plague, but my city, and my people, will not." - Proclamation of Hakan II',
  },
  {
    name: 'Writhing Band of Trickery',
    class: 'Rogue',
    type: 'Ring',
    secondary_stats: ['Resistance to All Elements', 'Shadow Resistance'],
    terciary_stats: [
      'Critical Strike Chance',
      'Critical Strike Damage',
      'Damage to Crowd Controlled Enemies',
      'Maximum Life',
    ],
    effect:
      'Casting a Subterfuge Skill leaves behind a Decoy Trap that continuously Taunts and lures enemies. The Decoy Trap explodes after 3 seconds dealing [X] Shadow damage. Can occur every 6 seconds.',
    flavor: 'The ring shifts and spins on your finger as the forces within desperately attempt to escape.',
  },
  {
    name: 'Blue Rose',
    class: 'Sorcerer',
    type: 'Ring',
    terciary_stats: ['Critical Strike Damage', 'Ice Spike Damage', 'Lucky Hit Chance', 'Mana Cost Reduction'],
    filters: ['Freeze'],
    effect:
      'Lucky Hit: Damaging an enemy has up to a 30% chance of forming an exploding Ice Spike, dealing [0.25-0.35] Cold damage. Triple this chance if the enemy is Frozen.',
    flavor:
      '"Her lover\'s spirit faded and in her sorrow she wept frozen tears. Where they fell, roses of the purest ice would blossom each winter." - Greenslade\'s Tales, Chapter 7: "The Myth of Irina Coldheart"',
  },
  {
    name: "Esadora's Overflowing Cameo",
    class: 'Sorcerer',
    type: 'Amulet',
    secondary_stats: ['Resistance to All Elements'],
    terciary_stats: [
      'Cooldown Reduction',
      'Crackling Energy Damage',
      'Ranks of the Shocking Impact Passive',
      'Movement Speed',
    ],
    filters: ['Crackling Energy'],
    effect:
      "Upon collecting Crackling Energy, there's a 15% chance to release a lightning nova, dealing [X] Lightning Damage, increased by x60% for every 100 Intelligence you have.",
    flavor:
      "The only thing more potent than Esadora's magic was her endless hatred of humanity. As she lay dying, the pale amulet around her neck drank in both.",
  },
  {
    name: "Esu's Heirloom",
    class: 'Sorcerer',
    type: 'Boots',
    secondary_stats: ['Dodge Chance While Evading'],
    terciary_stats: [
      'Movement Speed',
      'Movement Speed for 4 Seconds After Killing an Elite',
      'Mana Cost Reduction',
      'Critical Strike Damage',
    ],
    filters: ['Movement Speed'],
    effect: 'Your Critical Strike Chance is increased by [20-30%] of your Movement Speed bonus.',
    flavor:
      '"While scholars have proven these boots were not created by Esu herself, it is noteworthy that they have been passed down since the formation of the Mage Clans." - Barrett\'s Book of Implements',
  },
  {
    name: 'Flamescar',
    class: 'Sorcerer',
    type: 'Wand',
    secondary_stats: ['Lucky Hit Chance'],
    terciary_stats: [
      'Mana Cost Reduction',
      'Damage to Burning Enemies',
      'Lucky Hit Chance with Fire Damage',
      'Ranks of Incinerate',
    ],
    filters: ['Fire'],
    effect:
      'While Channeling Incinerate, you periodically shoot embers that are attracted to enemies, each dealing [X] Fire damage.',
    flavor: 'The burn may heal, but the pain is eternal.',
  },
  {
    name: 'Flameweaver',
    class: 'Sorcerer',
    type: 'Gloves',
    terciary_stats: ['Attack Speed', 'Damage to Burning Enemies', 'Ranks to Fire Bolt', 'Ranks to Devouring Blaze'],
    effect:
      'Casting Fire Bolt through your Firewall causes it to split into 3 bolts, each dealing [30-70%] more damage.',
  },
  {
    name: 'Fractured Winterglass',
    class: 'Sorcerer',
    type: 'Amulet',
    secondary_stats: ['Resistance to All Elements'],
    terciary_stats: ['Cooldown Reduction', 'Non-Physical Damage', 'Ranks to Conjuration Mastery', 'Vulnerable Damage'],
    filters: ['Conjuration'],
    effect:
      'Casting Frozen Orb has a [35-50%] chance to spawn a random Conjuration when it explodes.\n\nLucky Hit: Your Conjurations have up to a [50-70%] chance to launch a Frozen Orb at Nearby enemies.',
    flavor:
      'Winterglass refracts light and also manipulates mana - forming complex arrays of spells and enchantments. These distinct characteristics posses great power, yet the outcomes remain unpredictable.',
  },
  {
    name: 'Gloves of the Illuminator',
    class: 'Sorcerer',
    type: 'Gloves',
    terciary_stats: [
      'Critical Strike Chance',
      'Fireball Attack Speed',
      'Lucky Hit: Up to a 55% Chance to Restore [X]% Primary Resource',
      'Ranks of Fireball',
    ],
    effect:
      "Fireball now bounces as it travels, exploding each time it hits the ground, but it's explosion deals [30-20%] less damage.",
    flavor:
      'After Inarius returned to Sanctuary, he sought a way back to the High Heavens. His first step was to reignite the religion he had abandoned millennia before: the Cathedral of Light.',
  },
  {
    name: 'Iceheart Brais',
    class: 'Sorcerer',
    type: 'Pants',
    secondary_stats: ['Your Potion Also Restores X% Resource'],
    terciary_stats: ['Maximum Life', 'Damage to Frozen Enemies', 'Damage Reduction', 'Freeze Duration'],
    filters: ['Freeze'],
    effect: 'Enemies that die while Frozen, have a [21-30%] chance to unleash a Frost Nova.',
    flavor:
      'The mad artisan saw his fingers turn black from frostbite as he worked the cloth, but refused to stay the needle and thread for even a moment.',
  },
  {
    name: 'Raiment of the Infinite',
    class: 'Sorcerer',
    type: 'Chest Armor',
    terciary_stats: [
      'Intelligence',
      'Damage to Close Enemies',
      'Damage to Stunned Enemies',
      'Ranks of the Glass Cannon Passive',
    ],
    filters: ['Pull', 'Stun'],
    effect:
      "After using Teleport, Close enemies are Pulled to you and Stunned for [2-3] seconds, but Teleport's cooldown is increased by 20%.",
    flavor: 'The power you have is never enough.',
  },
  {
    name: 'Staff of Endless Rage',
    class: 'Sorcerer',
    type: 'Staff',
    secondary_stats: ['Damage to Crowd Controlled Enemies'],
    terciary_stats: [
      'Core Skill Damage',
      'Damage to Close Enemies',
      'Fire Damage',
      'Ranks of the Inner Flames Passive',
    ],
    effect: 'Every 3rd cast of Fireball launches 2 additional projectiles dealing [50-70%] bonus damage.',
    flavor: '"Leaving even blackened bones for your kin to mourn is too good an end for you." - Josiah',
  },
  {
    name: 'Staff of Lam Esen',
    class: 'Sorcerer',
    type: 'Staff',
    secondary_stats: ['Damage to Crowd Controlled Enemies'],
    terciary_stats: [
      'Lightning Damage',
      'Ranks of Charged Bolts',
      'Damage to Close Enemies',
      'Lucky Hit: Up to a 5% Chance to Restore [X]% Primary Resource',
    ],
    effect: 'Your cast of Charged Bolts have a [40-60%] chance to be attracted to enemies and last 300% longer.',
    flavor:
      '"Also known as the Greatstaff of the Old Religion, this powerful relic is one of only a small handful of Skatsimi artifacts that have survived to this day." - Barrett\'s Book of Implements',
  },
  {
    name: 'Starfall Coronet',
    class: 'Sorcerer',
    type: 'Helm',
    terciary_stats: ['Ranks of Meteor', 'Cooldown Reduction', 'Lucky Hit Chance', 'Maximum Life'],
    effect:
      "Meteor now has 2 charges with a [11.0-6.0] second Charge Cooldown instead of a Mana cost, and drops 3 additional meteors around the target.\nMeteor's Enchantment Effect and Enhanced Meteor drop 1 additional meteor.",
    flavor:
      '"The elders say they saw a star falling from the sky many years ago. A sign from the heavens that the end times were nigh. A rallying cry to take up arms and protect Sanctuary!" - Crusader Hamilton',
  },
  {
    name: "Tal Rasha's Iridescent Loop",
    class: 'Sorcerer',
    type: 'Ring',
    secondary_stats: ['Resistance to All Elements', 'Resistance to All Elements'],
    terciary_stats: ['Non-Physical Damage', 'Lucky Hit Chance', 'Resource Generation', 'Cooldown Reduction'],
    effect:
      'For each type of Elemental damage you deal, gain [10-15%] increased damage for 4 seconds. Dealing Elemental damage refreshes all bonuses. Capped at four Elements.',
    flavor:
      '"Fool said he dug it out of the sands near Lut Gholein with a few other \'worthless trinkets\'. I hid my delight at receiving such a treasure in exchange for a meager handful of coins." Rakhaan',
  },
  {
    name: 'The Oculus',
    class: 'Sorcerer',
    type: 'Wand',
    secondary_stats: ['Lucky Hit Chance'],
    terciary_stats: [
      'Max Evade Charges',
      "Attacks Reduce Evade's Cooldown by [X] Seconds",
      'Damage',
      'Ranks of Teleport',
    ],
    effect:
      'Gain the effect of the Teleport Enchantment for free. When you Evade using Teleport Enchantment, you are taken to a random location.',
    flavor:
      '"The rhythm of the orb, which had pulsed steadily for five centuries, quickened as its owner took his final ragged breaths. It were as if some intelligence within reveled in the sight." - Master Eos',
  },
  {
    name: 'Ahavarion, Spear of Lycander',
    mythic: true,
    type: 'Staff',
    secondary_stats: ['Damage to Crowd Controlled Enemies'],
    terciary_stats: ['Critical Strike Chance', 'Attack Speed', 'Damage', 'Lucky Hit: Up to a [X]% Chance to Stun'],
    filters: ['Elite'],
    effect:
      'Gain a random Shrine effect for [10-20] seconds after killing an Elite enemy. Can only occur once every 30 seconds.',
    flavor:
      '"The angel Lycander left us a portion of her power in this spear. It is all the proof I need that she watches over us still." - Oracle Argoysni',
  },
  {
    name: "Andariel's Visage",
    mythic: true,
    type: 'Helm',
    terciary_stats: ['All Stats', 'Attack Speed', 'Life Steal', 'Poison Resistance'],
    filters: ['Lucky Hit', 'Poison'],
    effect:
      'Lucky Hit: Up to a [15-20%] chance to trigger a poison nova that applies [X] Poisoning damage over 5 seconds to enemies in the area.',
    flavor:
      'The horrific whispers of the Maiden of Anguish flicker through your mind, pushing you ever closer to madness...',
  },
  {
    name: 'Azurewrath',
    type: '1h Sword',
    secondary_stats: ['Critical Strike Damage'],
    terciary_stats: ['Attack Speed', 'Non-Physical Damage', 'Core Damage', 'Damage to Crowd Controlled Enemies'],
    filters: ['Lucky Hit', 'Freeze', 'Cold'],
    effect:
      'Lucky Hit: Your Skills have up to a 20% chance to Freeze enemies for 3 seconds and deal [X] Cold damage to them.',
    flavor:
      'The ancient runeblade of the angel Izual, Azurewrath was miraculously spared the corruption that consumed its master.',
  },
  {
    name: "Banished Lord's Talisman",
    type: 'Amulet',
    terciary_stats: ['Critical Strike Chance', 'Overpower Damage', 'Resource Generation', 'Ranks of All Core Skills'],
    filters: ['Overpower'],
    effect:
      'After you spend 275 of your Primary Resource, your next Core Skill is guaranteed to Overpower. Your Critical Strikes that Overpower deal [20-60%] increased damage.',
    flavor:
      '"His name has been lost to history, but to have been exiled from a land as cursed as Hawezar, his deeds must have been truly depraved." - Scholar\'s Notes',
  },
  {
    name: 'Doombringer',
    mythic: true,
    type: '1h Sword',
    secondary_stats: ['Critical Strike Damage'],
    terciary_stats: ['Core Skill Damage', 'Damage', 'Lucky Hit: Up to a 5% Chance to Heal [X] Life', 'Maximum Life'],
    filters: ['Lucky Hit', 'Shadow'],
    effect:
      'Lucky Hit: Up to a [15-25%] chance to deal [X] Shadow damage to surrounding enemies and reduce their damage done by 20% for 5 seconds.',
    flavor:
      'Whenever this ancient sword has reappeared throughout history, it portends a time of great strife, as well as a devastating loss of life.',
  },
  {
    name: 'Fists of Fate',
    type: 'Gloves',
    terciary_stats: [
      'Lucky Hit: Up to a 10% Chance to Gain [X]% Damage for 4 Seconds',
      'Lucky Hit: Up to a 5% Chance to Restore [X]% Primary Resource',
      'Lucky Hit: Up to a [X]% Chance to Immobilize',
      'Lucky Hit: Up to a [X]% Chance to Daze',
    ],
    effect: 'Your attacks randomly deal 1% to [200-300%] of their normal damage.',
    flavor:
      '"Will you let fear cheat you, or will you risk everything to find understanding? After all, death is simply the coin with which we purchase life." - Zurke',
  },
  {
    name: 'Flickerstep',
    type: 'Boots',
    secondary_stats: ["Attacks Reduce Evade's Cooldown by 0.8 Seconds."],
    terciary_stats: ['All Stats', 'Movement Speed', 'Ultimate Skill Damage', 'Damage Reduction from Close Enemies'],
    filters: ['Cooldown'],
    effect:
      'Each enemy you Evade through reduces your active Ultimate Cooldown by [2.0-4.0] seconds, up to 10 seconds.',
    flavor:
      '"Considered a failure by their creator, it wasn\'t until the assassination of an "untouchable" Caldeum noble that these boots\' true power was understood." - Barrett\'s Book of Implements',
  },
  {
    name: 'Frostburn',
    type: 'Gloves',
    terciary_stats: [
      'Critical Strike Chance',
      'Attack Speed',
      'Freeze Duration',
      'Lucky Hit: Up to a 5% Chance to Restore [X]% Primary Resource',
    ],
    filters: ['Freeze', 'Lucky Hit'],
    effect: 'Lucky Hit: Up to a [15-25%] chance to Freeze enemies for 2 seconds.',
    flavor: 'A touch so frigid it stops the heart and chills the very soul.',
  },
  {
    name: 'Godslayer Crown',
    type: 'Helm',
    terciary_stats: ['Cooldown Reduction', 'Crowd Control Duration', 'Maximum Life', 'Damage'],
    filters: ['Stun', 'Freeze', 'Immobilize', 'Elite'],
    effect:
      'When you Stun, Freeze, or Immobilize an Elite enemy, or damage a Boss, it pulls in nearby enemies. You deal [30-60%] increased damage to them for 3 seconds. This effect can only occur once every 12 seconds.',
    flavor:
      '"The Sahptev faithful believe in a thousand and one gods. If it takes me as many lifetimes, I will find and kill them all." - Gaspar Stilbian, Veradani Outcast',
  },
  {
    name: 'Harlequin Crest',
    mythic: true,
    type: 'Helm',
    terciary_stats: ['Maximum Life', 'Cooldown Reduction', 'Resource Generation', 'All Stats'],
    filters: ['Damage Reduction', 'Skill Rank'],
    effect: 'Gain [10.0-20.0%] Damage Reduction. In addition, gain +4 Ranks to all Skills.',
    flavor:
      '"This headdress was once worn by an assassin disguised as a court mage. Her treachery was unveiled, but not before she used its magic to curse the king\'s entire lineage." - The Fall of House Aston',
  },
  {
    name: 'Melted Heart of Selig',
    mythic: true,
    type: 'Amulet',
    secondary_stats: ['Resistance to All Elements'],
    terciary_stats: ['All Stats', 'Movement Speed', 'Damage While Healthy', 'Resource Regeneration'],
    effect:
      'Gain 60 maximum Resource. When taking damage, 75% is drained as 2 Resource for every 1% of Maximum Life you would have lost.',
    flavor:
      '"Do not allow your passions to become obsessions. Fuel the fire that burns within you, but it is madness to allow yourself to become ash to please an uncaring universe." - Last words of Master Selig',
  },
  {
    name: "Mother's Embrace",
    type: 'Ring',
    secondary_stats: ['Fire Resistance', 'Cold Resistance'],
    terciary_stats: ['All Stats', 'Lucky Hit Chance', 'Critical Strike Damage', 'Maximum Life'],
    effect: 'If a Core Skill hits 4 or more enemies, [30-50%] of the Resource is refunded.',
    flavor:
      '"Every tome, every scroll, every book in this temple produces the same answer. The only being willing to stand against the Eternal Conflict, against the Prime Evils, was Lilith." - Elias',
  },
  {
    name: "Paingorger's Gauntlets",
    type: 'Gloves',
    terciary_stats: ['Basic Skill Damage', 'Attack Speed', 'All Stats', 'Critical Strike Chance'],
    effect:
      "Damaging enemies with a cast Non-Basic Skill marks them for 3 seconds. When a Basic Skill first hits a marked enemy, the Basic Skill's damage is echoed to all marked enemies, dealing [100-200%] increased damage.",
    flavor:
      "Crafted from fragments of Duriel's carapace, wearing these gloves, or being struck by them, causes an agonizing sensation akin to pushing one's hands through a thousand shards of glass.",
  },
  {
    name: 'Penitent Greaves',
    type: 'Boots',
    secondary_stats: ['Dodge Chance While Evading'],
    terciary_stats: ['Movement Speed', 'Crowd Control Duration', 'Slow Duration Reduction', 'Cold Resistance'],
    filters: ['Chill'],
    effect: 'You leave behind a trail of frost that Chills enemies. You deal [12-15%] more damage to Chilled enemies.',
    flavor:
      'Remorseful devotees of the Cathedral of Light must undertake a grueling pilgrimage, journeying across the frigid glacier known as the Serac Rapture. Only then may their gravest sins be forgiven.',
  },
  {
    name: 'Razorplate',
    type: 'Chest Armor',
    terciary_stats: ['Thorns', 'Thorns', 'Thorns', 'Thorns'],
    filters: ['Thorns'],
    effect: 'Thorns has a 10% chance to deal [100-150%] increased damage.',
    flavor:
      "Crafted by the cannibal Armoda, each piece of this interlocking armor has been sharpened into a knife's edge. Even a century after death, the plate remained on her corpse, unable to be removed safely.",
  },
  {
    name: 'Ring of Starless Skies',
    mythic: true,
    type: 'Ring',
    secondary_stats: ['Lightning Resistance', 'Shadow Resistance'],
    terciary_stats: ['Lucky Hit Chance', 'Critical Strike Chance', 'Critical Strike Damage', 'Core Skill Damage'],
    effect:
      'Spending resources reduces your resource costs and increases your damage by x10% for 3 seconds, up to 50%.',
    flavor:
      '"Yours is the power to pluck the stars from the heavens with the ease of a child gathering fruit from the bough." - Unknown',
  },
  {
    name: 'Soulbrand',
    type: 'Chest Armor',
    terciary_stats: [
      'Lucky Hit Chance while You Have a Barrier',
      'Barrier Generation',
      'Maximum Life',
      'Damage Reduction from Close Enemies',
    ],
    filters: ['Damage Reduction', 'Barrier'],
    effect:
      'Your Healing Potion no longer Heals instantly, instead it grants a Barrier for 200% of the healing for 4 seconds. While you have a Barrier, you gain [10-20%] Damage Reduction.',
    flavor:
      '"To create such an artifact would require an impossible mastery over alchemy, transmutation and the subtle magics of the soul. By all rights, it should not exist, yet it does."',
  },
  {
    name: 'Tassets of the Dawning Sky',
    type: 'Pants',
    secondary_stats: ['While Injured, Your Potion Also Grants 30% Movement Speed for 2 Seconds'],
    terciary_stats: ['Control Impaired Duration Reduction', 'Maximum Life', 'All Stats', 'Resistance to All Elements'],
    filters: ['Resistance'],
    effect:
      'When you take damage from a Non-Physical damage type, you gain + [8-12%] Maximum Resistance to that damage type for 6 seconds. This effect can only apply to one damage type at a time.',
    flavor:
      '“May the Light of Father Inarius shine down upon all weary travelers of this holy land. Turn your face toward his radiance and find your strength renewed.” - Statue Inscription',
  },
  {
    name: 'Temerity',
    type: 'Pants',
    secondary_stats: ['Your Potion Also Briefly Grants Movement Speed'],
    terciary_stats: [
      'Maximum Life',
      'Potion Drop Rate',
      'Lucky Hit: Up to a 5% Chance to Heal [X] Life',
      'Healing Received',
    ],
    filters: ['Heal', 'Barrier'],
    effect:
      'Effects that Heal you beyond 100% Life grant you a Barrier up to [40-80%] of your Maximum Life that lasts for 8 seconds.',
    flavor:
      '"The revelation that master tailor Callas was in fact a witch only served to further fuel the desire for her uniquely enchanted legwraps." - Barrett\'s Book of Implements',
  },
  {
    name: "The Butcher's Cleaver",
    type: '1h Axe',
    secondary_stats: ['Damage to Healthy Enemies'],
    terciary_stats: [
      'Physical Damage',
      'Damage to Crowd Controlled Enemies',
      'Critical Strike Damage',
      'Critical Strike Chance Against Injured Enemies',
    ],
    filters: ['Slow', 'Critical Strike', 'Slow'],
    effect:
      'Lucky Hit: When you Critically Strike an enemy you have up to a 100% chance to Fear and Slow them by [61-75%] for 4 seconds.',
    flavor: 'A nightmarish amalgam of blood, bone and steel, this axe is as horrific, and as deadly, as its creator.',
  },
  {
    name: 'The Grandfather',
    mythic: true,
    type: '2h Sword',
    secondary_stats: ['Critical Strike Damage'],
    terciary_stats: ['Damage', 'Maximum Life', 'All Stats', 'Ignores Durability Loss'],
    filters: ['Critical Strike'],
    effect:
      'Increases your Critical Strike Damage by [60-100%] . The other properties of this weapon can roll higher than normal.',
    flavor: 'An unbroken lineage of unwavering strength.',
  },
  {
    name: "Tibault's Will",
    type: 'Pants',
    secondary_stats: ['While Injured, Your Potion Also Restores 20% Resource'],
    terciary_stats: ['Damage Reduction from Close Enemies', 'Potion Capacity', 'Damage', 'Maximum Resource'],
    filters: ['Untoppable'],
    effect:
      'You deal [10-20%] increased damage while Unstoppable and for 5 seconds after. When you become Unstoppable, gain 50 of your Primary Resource.',
    flavor:
      '"The younger apprentices think wearing heavy plate in the swamps is foolish. They fail to understand that our armor is our legacy, and without it we are nothing." - Crusader Pembroke',
  },
  {
    name: "Tyrael's Might",
    mythic: true,
    type: 'Chest Armor',
    terciary_stats: [
      'Resistance to All Elements',
      'Maximum Resistance to All Elements',
      'All Stats',
      'Damage Reduction',
    ],
    filters: ['Damage Reduction', 'Resistance'],
    effect: 'While at full Life, your Skills unleash a divine barrage dealing [X] damage.',
    flavor:
      '"Thus Tyrael, a perfect aspect of Justice, came to be. None were more vehement against the forces of hell. All demonic entities learned to shudder at Justice\'s might." - The Books of Jarl, Volume I',
  },
  {
    name: "X'Fal's Corroded Signet",
    type: 'Ring',
    secondary_stats: ['Resistance to All Elements', 'Fire Resistance'],
    terciary_stats: ['All Stats', 'Damage Over Time', 'Lucky Hit Chance', 'Cooldown Reduction'],
    filters: ['Lucky Hit'],
    effect:
      'Lucky Hit: Your damage over time effects have up to a 50% chance to erupt, dealing [5.0-6.0] damage of the same type to Nearby enemies.',
    flavor:
      'Skulking in the shadows of the Realm of Destruction, the Scarred Baron plots the downfall of the mortal who banished him here.',
  },
  {
    name: "Yen's Blessing",
    type: 'Boots',
    secondary_stats: ['Maximum Evade Charges'],
    terciary_stats: [
      'Damage Reduction from Close Enemies',
      'Movement Speed',
      'Vulnerable Damage',
      'Lucky Hit: Up to a 5% Chance to Restore Primary Resource',
    ],
    effect:
      'Casting a Skill has a [40-60%] chance to cast a Non-Mobility, Non-Ultimate Skill that is currently on Cooldown. This effect can only occur once every 8 seconds.',
    flavor:
      'These greaves are imbued with the divine blessing of Yen, the Veradani goddess of restoration. They bestow the wearer a revitalizing strength that enhances their own.',
  },
  {
    name: 'Ring of Gorilla Centipede (PH)',
    class: 'Spiritborn',
    icon: true,
    type: 'Ring',
    secondary_stats: ['Resistance to All Elements', 'Resistance to All Elements'],
    terciary_stats: ['Total Armor', 'Thorns', 'Damage Reduction from Poisoned Enemies', 'Ranks to Patient Guard'],
    filters: ['Thorns'],
    effect: "Generates [1-7] Vigor each time you deal Thorns damage. Gain Toxic Skin's Passive Effect.",
  },
  {
    name: 'Scorn of the Earth',
    class: 'Spiritborn',
    icon: true,
    type: 'Boots',
    secondary_stats: ['Maximum Evade Charges'],
    terciary_stats: ['Damage', 'Resource Generation', 'Cooldown Reduction', "Attacks Reduce Evade's Cooldown"],
    filters: ['Evade'],
    effect: 'Soar deals [10-50%] increased damage and your Evade is now Soar.',
  },
  {
    name: 'Harmony',
    class: 'Spiritborn',
    icon: true,
    type: 'Helm',
    terciary_stats: ['All Stats', 'Damage', 'Critical Strike Chance', 'Damage Reduction'],
    effect:
      'Your Skills are all additionally Jaguar, Eagle, Gorilla or Centipede Skills based on your secondary Spirit Hall choice. Each Spirit type on a Skill increases its damage by 50%.',
  },
  {
    name: 'Moving Dodge (PH)',
    class: 'Spiritborn',
    icon: true,
    type: 'Pants',
    terciary_stats: ['Maximum Life', 'Life per Second', 'Maximum Resistance to All Elements', 'Damage while Healthy'],
    filters: ['Dodge Chance', 'Unstoppable'],
    effect: 'While moving you gain [15-30%] Dodge Chance or after standing still for 3 seconds you become Unstoppable.',
  },
  {
    name: 'Sepazontec',
    class: 'Spiritborn',
    icon: true,
    type: 'Quarterstaff',
    secondary_stats: ['Block Chance'],
    terciary_stats: ['All Stats', 'Damage while Healthy', 'Cooldown Reduction', 'Ranks to Follow Through'],
    filters: ['Basic Skill'],
    effect:
      'Your Basic Skills deal [100-200%] increased damage, always use their 3rd attack, and every 3rd cast unleashes triple strikes.',
    flavor:
      'To the silent heavens, the hunter Etzlek raised his staff and smote the numen. "Release her!" came his cries as desecrated the hallowed ground. On the third strike, the spirit answered...',
  },
  {
    name: 'Ring of Eagle Jaguar (PH)',
    class: 'Spiritborn',
    icon: true,
    type: 'Ring',
    secondary_stats: ['Resistance to All Elements', 'Resistance to All Elements'],
    terciary_stats: ['Attack Speed', 'Critical Strike Damage', 'Damage to Elites', 'Ranks to Mirage'],
    filters: ['Critical Strike', 'Critical Strike Damage'],
    effect:
      "Critical Strikes restore [10-30%] of the Vigor you have spent in the last 2 seconds, increased by your Critical Strike Damage Bonus. Gain Counterattack's Passive Effect.",
  },
  {
    name: 'Ring of Centipede Jaguar (PH)',
    class: 'Spiritborn',
    icon: true,
    type: 'Ring',
    secondary_stats: ['Resistance to All Elements', 'Resistance to All Elements'],
    terciary_stats: ['Life On Kill', 'Resource Generation', 'Cooldown Reduction', 'Ranks to Nourishment'],
    filters: ['Vigor', 'Ferocity', 'Poison'],
    effect:
      'Your Maximum Vigor is increased by 100% and every kill grants [1-7] Vigor. Killing a Poisoned enemy grants a stack of Ferocity.',
  },
];
