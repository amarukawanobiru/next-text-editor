"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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

type DeleteImageDialogProps = {
  fileName: string;
  altText: string;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const UpdateAltTextDialog = ({
  fileName,
  altText,
  setIsMenuOpen,
}: DeleteImageDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [inputValue, setInputValue] = useState(altText);
  const router = useRouter();

  const handleClick = async () => {
    if (!inputValue.trim()) return;

    setIsPending(true);

    try {
      const result = await updateAltText(fileName, inputValue);

      if (!result.success) {
        throw new Error();
      }

      toast(<ToastMessage message="説明文を更新しました。" />);
      router.refresh();
    } catch {
      toast(<ToastMessage message="説明文の更新に失敗しました。" />);
    } finally {
      setIsPending(false);
      setIsMenuOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="w-full px-2 py-1.5 text-sm text-left hover:bg-muted">
        説明文の変更
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
              onClick={() => setIsMenuOpen(false)}
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
