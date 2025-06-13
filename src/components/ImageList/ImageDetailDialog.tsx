"use client";

import { useState } from "react";
import { formatLocalDate } from "@/lib/utils/formatLocalDate";
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

type DeleteImageDialogProps = {
  fileName: string;
  altText: string;
  imageWidth: number;
  imageHeight: number;
  fileSize: number;
  createdAt: Date;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ImageDetailDialog = ({
  fileName,
  altText,
  imageWidth,
  imageHeight,
  fileSize,
  createdAt,
  setIsMenuOpen,
}: DeleteImageDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="w-full px-2 py-1.5 text-sm text-left hover:bg-muted">
        画像の詳細
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            <p className="my-2 text-base break-all">{fileName.split(".")[0]}</p>
          </DialogTitle>
          <DialogDescription asChild>
            <dl className="space-y-1">
              <div className="flex items-center gap-x-1">
                <dt>拡張子:</dt>
                <dd>{fileName.split(".")[1]}</dd>
              </div>
              <div className="flex items-center gap-x-1">
                <dt>説明文:</dt>
                <dd>{altText ? altText : "設定されていません。"}</dd>
              </div>
              <div className="flex items-center gap-x-1">
                <dt>画像サイズ</dt>
                <dd>
                  {imageWidth} * {imageHeight}
                </dd>
              </div>
              <div className="flex items-center gap-x-1">
                <dt>ファイルサイズ:</dt>
                <dd>{Math.floor(fileSize / 1024)} キロバイト</dd>
              </div>
              <div className="flex items-center gap-x-1">
                <dt>アップロード日時:</dt>
                <dd>
                  <time dateTime={formatLocalDate(createdAt)}>
                    {createdAt.toLocaleDateString("ja-JP", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </time>
                </dd>
              </div>
            </dl>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              onClick={() => setIsMenuOpen(false)}
              variant="outline"
              className="rounded-xs"
            >
              閉じる
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
