"use client";

import { useDraftForm } from "@/components/DraftForm/index.hook";
import { useEditor } from "@/hooks/editor/useEditor";
import { LOCAL_STORAGE_KEY_DRAFT_TITLE } from "@/lib/editor/constants";
import { Slate, Editable } from "slate-react";
import { cn } from "@/lib/utils";
import { Toolbar } from "@/components/editor/Toolbar";
import { LoaderIcon } from "lucide-react";

type DraftFormProps = React.ComponentPropsWithoutRef<"div">;

export const DraftForm = ({ className, ...props }: DraftFormProps) => {
  const { editor, renderElement, renderLeaf } = useEditor();
  const { titleField, initialValue, setEditorValue } = useDraftForm();

  if (titleField === null || initialValue === null) {
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
      <div>
        <div className="relative">
          <label
            htmlFor="title"
            className="h-8 text-muted-foreground text-xs font-bold grid place-items-center absolute top-4 left-6"
          >
            タイトル：
          </label>
          <textarea
            id="title"
            onChange={(e) => {
              const borderYWidth = 2;
              e.target.style.height = "auto";
              e.target.style.height = `${e.target.scrollHeight + borderYWidth}px`;
              localStorage.setItem(
                LOCAL_STORAGE_KEY_DRAFT_TITLE,
                e.target.value,
              );
            }}
            rows={1}
            defaultValue={titleField}
            placeholder="ドキュメントにタイトルをつけましょう。"
            className="block w-full py-4 pl-22 pr-6 border rounded-xs text-xl font-bold leading-normal resize-none"
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
              className="space-y-6"
            />
          </div>
        </Slate>
      </div>
    </div>
  );
};
