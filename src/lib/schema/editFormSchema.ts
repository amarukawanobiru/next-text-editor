import { z } from "zod";
import {
  documentIdSchema,
  documentTitleSchema,
  documentBodySchema,
} from "@/lib/schema";

export const editFormSchema = z.object({
  id: documentIdSchema,
  title: documentTitleSchema,
  body: documentBodySchema,
});
