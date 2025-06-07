"use client";

import { useDraftForm } from "@/components/DraftForm/index.hook";
import { useFormMetadata, useField } from "@conform-to/react";
import { useEditor } from "@/hooks/editor/useEditor";
import { LOCAL_STORAGE_KEY_DRAFT_TITLE } from "@/lib/conform/constants";
import { Slate, Editable } from "slate-react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Toolbar } from "@/components/editor/Toolbar";
import { LoaderIcon } from "lucide-react";

type DraftFormProps = React.ComponentPropsWithoutRef<"div">;

export const DraftForm = ({ className, ...props }: DraftFormProps) => {
  const form = useFormMetadata();
  const [title] = useField<string>("title");
  const [body] = useField<string>("body");
  const { editor, renderElement, renderLeaf } = useEditor();
  const { titleValue, initialValue, setEditorValue, serializedEditorValue } =
    useDraftForm();

  if (titleValue === null || initialValue === null) {
    return (
      <div {...props} className={cn(className)}>
        <div className="flex items-center gap-x-2 animate-pulse">
          <LoaderIcon
            size={18}
            strokeWidth={1.5}
            className="text-muted-foreground animate-spin"
          />
          <p className="text-muted-foreground text-sm tracking-widest">
            設定を読み込み中...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div {...props} className={cn(className)}>
      <form id={form.id} onSubmit={form.onSubmit} noValidate>
        <div className="relative">
          <label
            htmlFor={title.id}
            className="h-8 text-muted-foreground text-xs font-bold grid place-items-center absolute top-4 left-6"
          >
            タイトル：
          </label>
          <Textarea
            onChange={(e) => {
              localStorage.setItem(
                LOCAL_STORAGE_KEY_DRAFT_TITLE,
                e.target.value,
              );
            }}
            rows={1}
            id={title.id}
            key={title.key}
            name={title.name}
            defaultValue={titleValue}
            placeholder="ドキュメントにタイトルをつけましょう。"
            className="block w-full py-4 pl-22 pr-6 border rounded-xs text-xl font-bold leading-normal resize-none md:text-xl"
          />
        </div>

        <Slate
          editor={editor}
          initialValue={initialValue}
          onChange={(newValue) => setEditorValue(newValue)}
        >
          <div className="mt-4 border rounded-xs">
            <Toolbar className="mt-4 mx-4 sticky top-0 z-30" />
            <Editable
              id="editor"
              renderElement={renderElement}
              renderLeaf={renderLeaf}
              placeholder="ここに内容を入力してください。"
              className="space-y-4"
            />
          </div>
        </Slate>

        <input
          type="hidden"
          id={body.id}
          key={body.key}
          name={body.name}
          value={serializedEditorValue}
        />
      </form>
    </div>
  );
};
