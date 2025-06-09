"use client";

import { useEffect } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import type { FormType } from "@/lib/conform/constants";
import { useFormMetadata, useField } from "@conform-to/react";

type UseFormPreviewProps = {
  formType: FormType;
};

export const useFormPreview = ({ formType }: UseFormPreviewProps) => {
  const router = useRouter();
  const status = useFormStatus();
  const isSending = status.pending;
  const form = useFormMetadata();
  const [id] = useField<string>("id");
  const [title] = useField<string>("title");
  const [body] = useField<string>("body");

  useEffect(() => {
    if (!title.value || !body.value) {
      router.push(`/${formType}`);
    }
  }, [formType, router.push, title.value, body.value]);

  return { form, id, title, body, isSending };
};
