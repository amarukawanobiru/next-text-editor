"use client";

import { useState } from "react";
import { deleteDocument } from "@/lib/db/deleteDocument";
import type { Row } from "@tanstack/react-table";
import type { EditableContentType } from "@/components/EditableDocumentsTable/columns/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { ToastMessage } from "@/components/ToastMessage";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";

type DeleteDocumentButtonProps = {
  row: Row<EditableContentType>;
};

export const DeleteDocumentButton = ({ row }: DeleteDocumentButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const documentTitle = row.original.title;
  const documentId = row.original.id;

  const handleClick = async (documentId: string) => {
    try {
      setIsPending(true);

      const result = await deleteDocument(documentId);

      if (!result.success) {
        throw new Error();
      }

      toast(<ToastMessage message="ドキュメントを削除しました。" />);
    } catch {
      toast(<ToastMessage message="ドキュメントの削除に失敗しました。" />);
    } finally {
      setIsPending(false);
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="mx-auto rounded-xs grid place-items-center cursor-pointer group">
        <p className="flex items-center gap-x-1">
          <Trash2Icon size={16} className="text-destructive" />
          <span className="text-destructive group-hover:underline">削除</span>
        </p>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            <p className="my-2">
              <span className="line-clamp-1">{documentTitle}</span>
            </p>
            <p className="text-base">を削除しますか？</p>
          </DialogTitle>
          <DialogDescription>
            一度削除すると元に戻すことができません。
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              disabled={isPending}
              variant="outline"
              className="rounded-xs"
            >
              キャンセル
            </Button>
          </DialogClose>
          <Button
            onClick={() => handleClick(documentId)}
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
