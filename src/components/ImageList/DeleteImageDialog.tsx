"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
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
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const DeleteImageDialog = ({
  fileName,
  setIsMenuOpen,
}: DeleteImageDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setIsPending(true);

    const endpoint = "/api/image/delete";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: JSON.stringify({ fileName }),
      });

      const { success } = await response.json();

      if (!success) {
        throw new Error();
      }

      router.refresh();
    } catch (error) {
      toast(<ToastMessage message="画像の削除に失敗しました。" />);
    } finally {
      setIsPending(false);
      setIsMenuOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="w-full px-2 py-1.5 text-sm text-destructive text-left hover:bg-muted">
        削除する
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            <p className="my-2 text-base break-all">「{fileName}」</p>
            <p className="text-base">を削除しますか？</p>
          </DialogTitle>
          <DialogDescription>
            一度削除すると元に戻すことができません。
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              onClick={() => setIsMenuOpen(false)}
              disabled={isPending}
              variant="outline"
              className="rounded-xs"
            >
              キャンセル
            </Button>
          </DialogClose>
          <Button
            onClick={handleClick}
            disabled={isPending}
            type="submit"
            variant="destructive"
            className="rounded-xs"
          >
            削除する
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
