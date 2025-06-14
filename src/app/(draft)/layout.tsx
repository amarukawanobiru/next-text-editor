"use client";

import type { LayoutProps } from "@/types";
import { createDocument } from "@/lib/db/createDocument";
import { draftFormSchema } from "@/lib/schema/draftFormSchema";
import { FormProvider } from "@/contexts/FormProvider";

export default function Layout({ children }: LayoutProps) {
  return (
    <FormProvider
      formType="draft"
      submitAction={createDocument}
      schema={draftFormSchema}
    >
      {children}
    </FormProvider>
  );
}
