"use client";

import { resetDeletedStatusAllDocuments } from "@/lib/features/resetDeletedStatusDocument";
import { Button } from "@/components/ui/button";

export const ResetDeletedStatusButton = () => {
  const handleClick = async () => {
    try {
      const result = await resetDeletedStatusAllDocuments();

      if (!result) {
        throw new Error();
      }

      alert("全てのドキュメントの削除状態を取り消しました。");
    } catch (error) {
      alert("想定外のエラーです。");
    }
  };

  return <Button onClick={handleClick}>全ての削除を取り消す</Button>;
};
