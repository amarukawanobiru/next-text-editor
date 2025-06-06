import { z } from "zod";
import { documentTitleSchema, documentBodySchema } from "@/lib/schema";

export const draftFormSchema = z.object({
  title: documentTitleSchema,
  body: documentBodySchema,
});
