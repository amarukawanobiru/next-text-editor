"use client";

import { useEditor } from "@/hooks/editor/useEditor";
import { Slate, Editable } from "slate-react";
import { cn } from "@/lib/utils";
import { Toolbar } from "@/components/editor/Toolbar";

import type { Descendant } from "slate";

const initialValue: Descendant[] = [
  { type: "paragraph", children: [{ text: "" }] },
];

type DraftFormProps = React.ComponentPropsWithoutRef<"div">;

export const Editor = ({ className, ...props }: DraftFormProps) => {
  const { editor, renderElement, renderLeaf } = useEditor();

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
            }}
            rows={1}
            placeholder="ドキュメントにタイトルをつけましょう。"
            className="block w-full py-4 pl-22 pr-6 border rounded-xs text-xl font-bold leading-normal resize-none"
          />
        </div>
        <Slate editor={editor} initialValue={initialValue}>
          <div className="mt-4 border rounded-xs">
            <Toolbar className="mt-4 mx-4 sticky top-4 z-30" />
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
