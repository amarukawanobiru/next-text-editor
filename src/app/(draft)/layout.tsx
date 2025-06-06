"use client";

import type { LayoutProps } from "@/types";
import { createDraftDocument } from "@/lib/db/createDraftDocument";
import { draftFormSchema } from "@/lib/schema/draftFormSchema";
import { FormProvider } from "@/contexts/FormProvider";

export default function Layout({ children }: LayoutProps) {
  return (
    <FormProvider
      formType="draft"
      submitAction={createDraftDocument}
      schema={draftFormSchema}
    >
      {children}
    </FormProvider>
  );
}
