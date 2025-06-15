"use client";

import { useState } from "react";
import { Transforms } from "slate";
import { ReactEditor, useSlateStatic } from "slate-react";
import { updateAltText } from "@/lib/db/updateAltText";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { ToastMessage } from "@/components/ToastMessage";
import { PenLineIcon } from "lucide-react";

type DeleteImageProps = {
  element: any;
};

export const UpdateAltText = ({ element }: DeleteImageProps) => {
  const editor = useSlateStatic();
  const path = ReactEditor.findPath(editor, element);
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [inputValue, setInputValue] = useState(element.alt);

  const handleClick = async () => {
    if (!inputValue.trim()) return;

    setIsPending(true);

    try {
      const result = await updateAltText(element.url, inputValue);

      if (!result.success) {
        throw new Error();
      }

      Transforms.setNodes(editor, { alt: inputValue }, { at: path });

      toast(<ToastMessage message="説明文を更新しました。" />);
    } catch {
      toast(<ToastMessage message="説明文の更新に失敗しました。" />);
    } finally {
      setIsPending(false);
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-xs">
          <PenLineIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>画像の説明文の編集</DialogTitle>
          <DialogDescription>
            入力された説明文は、目の不自由な方が画面読み上げソフトなどを使って画像の内容を理解するための情報として活用されます。
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          <Label htmlFor="alt-text">画像の説明文</Label>
          <Input
            id="alt-text"
            name="alt-text"
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
          />
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              disabled={isPending}
              variant="outline"
              className="rounded-xs"
            >
              閉じる
            </Button>
          </DialogClose>
          <Button
            onClick={handleClick}
            disabled={isPending}
            type="submit"
            className="rounded-xs"
          >
            保存する
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
