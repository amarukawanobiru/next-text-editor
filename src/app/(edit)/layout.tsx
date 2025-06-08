"use client";

import type { LayoutProps } from "@/types";
import { updateDocument } from "@/lib/db/updateDocument";
import { editFormSchema } from "@/lib/schema/editFormSchema";
import { FormProvider } from "@/contexts/FormProvider";

export default function Layout({ children }: LayoutProps) {
  return (
    <FormProvider
      formType="edit"
      submitAction={updateDocument}
      schema={editFormSchema}
    >
      {children}
    </FormProvider>
  );
}
