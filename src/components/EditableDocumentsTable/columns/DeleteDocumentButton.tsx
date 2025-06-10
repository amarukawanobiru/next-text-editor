"use client";

import { useState } from "react";
import { deleteDocument } from "@/lib/db/deleteDocument";
import type { Row } from "@tanstack/react-table";
import type { EditableContentType } from "@/components/EditableDocumentsTable/columns/types";
import { toast } from "sonner";
import { ToastMessage } from "@/components/ToastMessage";
import { Trash2Icon } from "lucide-react";

type DeleteDocumentButtonProps = {
  row: Row<EditableContentType>;
};

export const DeleteDocumentButton = ({ row }: DeleteDocumentButtonProps) => {
  const [isPending, setIsPending] = useState(false);
  const documentId = row.original.id;

  // TODO: 削除確認のダイアログを表示する
  // TODO: isPendingの時の表示を追加する

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
    }
  };

  return (
    <button
      onClick={() => handleClick(documentId)}
      disabled={isPending}
      type="button"
      className="mx-auto w-8 h-6 rounded-xs grid place-items-center cursor-pointer group hover:bg-muted"
    >
      <Trash2Icon size={16} className="text-destructive" />
    </button>
  );
};
