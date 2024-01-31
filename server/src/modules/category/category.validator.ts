import { z } from "zod";

const createSchema = z.object({
  category: z.string(),
})

const updateSchema = z.object({
  category: z.string().optional(),
})

const categoryValidator = { createSchema, updateSchema }
export default categoryValidator