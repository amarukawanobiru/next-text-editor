"use client";

import Link from "next/link";
import { useFormPreview } from "@/components/FormPreview/index.hook";
import { getFormProps, getInputProps } from "@conform-to/react";
import type { FormType } from "@/lib/conform/constants";
import { serialize } from "@/lib/editor/serialize";
import parse from "html-react-parser";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type FormPreviewProps = {
  formType: FormType;
} & React.ComponentPropsWithoutRef<"div">;

export const FormPreview = ({
  formType,
  className,
  ...props
}: FormPreviewProps) => {
  const { form, id, title, body, isSending } = useFormPreview({ formType });
  const cancelPath =
    formType === "draft" ? `/${formType}` : `/${formType}/${id.value}`;

  // 渡された値がないときに表示する画面を作る
  if (!title.value || !body.value) return null;

  return (
    <div {...props} className={cn(className)}>
      <div className="py-10 px-6 border rounded-xs">
        <div className="text-3xl font-bold">{title.value}</div>

        <div id="editor" className="mt-10 p-0 space-y-4">
          {parse(serialize(JSON.parse(body.value)))}
        </div>
      </div>

      <form {...getFormProps(form)} onSubmit={form.onSubmit}>
        {id && (
          <input {...getInputProps(id, { type: "hidden" })} value={id.value} />
        )}

        <input
          {...getInputProps(title, { type: "hidden" })}
          value={title.value}
        />
        <input
          {...getInputProps(body, { type: "hidden" })}
          value={body.value}
        />

        <div className="mt-6 ml-auto w-fit flex items-center gap-x-6">
          <Button asChild variant="outline" className="rounded-xs">
            <Link href={cancelPath}>キャンセル</Link>
          </Button>

          <Button
            type="submit"
            name="intent"
            value="submit"
            disabled={isSending}
            className="rounded-xs"
          >
            保存する
          </Button>
        </div>
      </form>
    </div>
  );
};
