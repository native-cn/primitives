import { z } from "zod"

export const registryItemFileSchema = z.object({
  path: z.string(),
  type: z.string().optional(),
})

export const registryItemSchema = z.object({
  name: z.string(),
  type: z.enum([
    "registry:ui",
    "registry:lib",
    "registry:hook",
    "registry:block",
    "registry:component",
  ]),
  dependencies: z.array(z.string()).default([]),
  registryDependencies: z.array(z.string()).default([]),
  files: z.array(registryItemFileSchema).default([]),
})

export const registrySchema = z.object({
  name: z.string(),
  homepage: z.string().optional(),
  items: z.array(registryItemSchema),
})

export type RegistryItem = z.infer<typeof registryItemSchema>
export type Registry = z.infer<typeof registrySchema>
