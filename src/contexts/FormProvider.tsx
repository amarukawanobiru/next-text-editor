"use client";

import { useActionState, startTransition } from "react";
import { useRouter } from "next/navigation";
import {
  FormProvider as ConformFormProvider,
  useForm,
} from "@conform-to/react";
import { parseWithZod, getZodConstraint } from "@conform-to/zod";
import type { ZodTypeAny } from "zod";
import type { FormActionResult } from "@/types/db";
import { isDescendantArray } from "@/lib/editor/utils";
import type { FormType } from "@/lib/conform/constants";
import { getStorageKeys } from "@/lib/conform/utils";
import { toast } from "sonner";
import { ToastMessage } from "@/components/ToastMessage";

type FormProviderProps = {
  formType: FormType;
  submitAction: (formData: FormData) => Promise<FormActionResult>;
  schema: ZodTypeAny;
  children: React.ReactNode;
};

export const FormProvider = ({
  formType,
  submitAction,
  schema,
  children,
}: FormProviderProps) => {
  const storageKeys = getStorageKeys(formType);
  const router = useRouter();
  const formAction = async (_prevState: unknown, formData: FormData) => {
    const result = await submitAction(formData);

    if (!result.success) {
      return result.submission;
    }

    for (const key of Object.values(storageKeys)) {
      localStorage.removeItem(key);
    }

    toast(<ToastMessage message={result.message} />);
    router.push("/edit");
  };
  const [state, action] = useActionState(formAction, undefined);
  const [form] = useForm({
    lastResult: state,
    constraint: getZodConstraint(schema),
    onValidate: ({ formData }) => {
      return parseWithZod(formData, { schema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
    onSubmit: (event, { formData }) => {
      event.preventDefault();

      switch (formData.get("intent")) {
        case "confirm":
          router.push(`/${formType}/confirm`);
          break;
        case "submit": {
          const body = formData.get("body") as string;
          if (!isDescendantArray(JSON.parse(body))) {
            router.replace(`/${formType}`);
          }

          startTransition(() => {
            action(formData);
          });
          break;
        }
        default:
          break;
      }
    },
  });

  return (
    <ConformFormProvider context={form.context}>{children}</ConformFormProvider>
  );
};
