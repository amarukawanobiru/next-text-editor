"use client";

import { useState } from "react";
import { changeDocumentPublishStatus } from "@/lib/db/changeDocumentPublishStatus";
import type { Row } from "@tanstack/react-table";
import type { EditableContentType } from "@/components/EditableDocumentsTable/columns/types";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { ToastMessage } from "@/components/ToastMessage";
import { CircleMinusIcon, CircleCheckIcon } from "lucide-react";

export const DraftHeader = () => {
  return <div>公開設定</div>;
};

type DraftCellProps = {
  row: Row<EditableContentType>;
};

export const DraftCell = ({ row }: DraftCellProps) => {
  const [isPending, setIsPending] = useState(false);
  const [isDraft, setIsDraft] = useState<boolean>(row.getValue("draft"));
  const documentId = row.original.id;

  const handleClick = async (documentId: string) => {
    try {
      setIsPending(true);

      const result = await changeDocumentPublishStatus(documentId, isDraft);

      if (!result.success) {
        throw new Error();
      }

      setIsDraft(result.draft);
      toast(
        <ToastMessage
          message={`公開設定を 「${result.draft ? "停止中" : "公開中"}」 に変更しました。`}
        />,
      );
    } catch {
      toast(<ToastMessage message="公開設定の更新に失敗しました。" />);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <button
      onClick={() => handleClick(documentId)}
      disabled={isPending}
      type="button"
      className={cn(
        "grid place-items-center cursor-pointer disabled:cursor-not-allowed hover:underline",
        isDraft ? "text-warning" : "text-success",
      )}
    >
      <div
        className={cn(
          "text-foreground animate-pulse hidden",
          isPending && "block",
        )}
      >
        ...処理中
      </div>
      <div className={cn("flex items-center gap-x-1", isPending && "hidden")}>
        {isDraft ? (
          <>
            <CircleMinusIcon size={14} strokeWidth={2} />
            <span>停止中</span>
          </>
        ) : (
          <>
            <CircleCheckIcon size={14} strokeWidth={2} />
            <span>公開中</span>
          </>
        )}
      </div>
    </button>
  );
};
