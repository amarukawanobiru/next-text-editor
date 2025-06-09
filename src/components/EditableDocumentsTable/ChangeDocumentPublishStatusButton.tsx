"use client";

import { changeDocumentPublishStatus } from "@/lib/db/changeDocumentPublishStatus";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { ToastMessage } from "@/components/ToastMessage";

type ChangeDocumentPublishStatusButtonProps = {
  documentId: string;
  isDraft: boolean;
};

export const ChangeDocumentPublishStatusButton = ({
  documentId,
  isDraft,
}: ChangeDocumentPublishStatusButtonProps) => {
  const handleClick = async (documentId: string, isDraft: boolean) => {
    try {
      const result = await changeDocumentPublishStatus(documentId, isDraft);

      if (!result.success) {
        toast(<ToastMessage message="公開設定の変更に失敗しました。" />);
        return;
      }

      toast(<ToastMessage message="公開設定を変更しました。" />);
    } catch (error) {
      // TODO: エラーハンドリングを追加すること
    }
  };

  return (
    <button onClick={() => handleClick(documentId, isDraft)} type="button">
      公開設定の変更
    </button>
  );
};
