import { z } from 'zod';
import { AspectData } from '@/app/data/codex';
import { UniqueData } from '@/app/data/uniques';
import { GemData } from '@/app/data/gems';
import { RuneData } from '@/app/data/runes';
import { SkillData } from '@/contexts/BuildContext';

const validClasses = ['Barbarian', 'Druid', 'Necromancer', 'Rogue', 'Sorcerer', 'Spiritborn'] as const;

const AspectOrUniqueSchema = z.union([z.custom<AspectData>(), z.custom<UniqueData>(), z.null()]);

const SocketItemSchema = z.object({
  type: z.enum(['gem', 'rune']),
  item: z.union([z.custom<GemData>(), z.custom<RuneData>(), z.null()]),
});

const SkillDataSchema = z.custom<SkillData>();

export const BuildStateSchema = z.object({
  selectedClass: z.enum(validClasses).nullable(),
  aspects: z.array(AspectOrUniqueSchema).length(14),
  sockets: z.array(z.array(SocketItemSchema)),
  selectedSkills: z.array(SkillDataSchema.nullable()).length(6),
  technique: z.string().nullable(),
  spiritBoons: z.record(z.array(z.string())),
  specialization: z.string().nullable(),
  enchantments: z.array(SkillDataSchema.nullable()).length(2),
  bookOfTheDead: z.object({
    'Skeletal Warriors': z.object({ name: z.string(), upgrade: z.string().nullable() }).nullable(),
    'Skeletal Mages': z.object({ name: z.string(), upgrade: z.string().nullable() }).nullable(),
    Golems: z.object({ name: z.string(), upgrade: z.string().nullable() }).nullable(),
  }),
  spiritHall: z.object({
    primary: z.string().nullable(),
    secondary: z.string().nullable(),
  }),
  itemStats: z.record(z.array(z.string().optional())),
});

export type BuildState = z.infer<typeof BuildStateSchema>;
