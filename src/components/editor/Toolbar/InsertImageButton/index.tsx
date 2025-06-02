"use client";

import { useInsertImageButton } from "@/components/editor/Toolbar/InsertImageButton/index.hook";
import { cn } from "@/lib/utils";
import { ImageIcon, LoaderIcon, FileInputIcon } from "lucide-react";
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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const InsertImageButton = () => {
  const {
    editor,
    isOpen,
    setIsOpen,
    objectUrl,
    selectedFile,
    isCompressing,
    isUploading,
    dragActive,
    fileInputRef,
    altText,
    setAltText,
    handleDrag,
    handleDrop,
    handleChange,
    resetImageSelection,
    handleUpload,
  } = useInsertImageButton();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-xs">
          <ImageIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-xs">
        <DialogHeader>
          <DialogTitle>画像の挿入</DialogTitle>
          <DialogDescription>
            アップロード可能なファイルサイズは1MBまでとなっております。1MBを超えるファイルは、自動的に圧縮処理が行われます。
          </DialogDescription>
        </DialogHeader>
        {objectUrl ? (
          <div className="space-y-4">
            <div>
              <img src={objectUrl} alt="" />
            </div>

            <div className="space-y-2">
              <Label>画像の説明文</Label>
              <Input
                onChange={(e) => setAltText(e.target.value)}
                disabled={isUploading}
                value={altText}
                className="rounded-xs"
              />
            </div>
          </div>
        ) : (
          <>
            <div
              className={cn(
                "aspect-[4/3] border-2 border-dashed rounded-xs grid place-items-center relative",
                { "bg-primary-foreground": dragActive },
              )}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {isCompressing && (
                <div className="bg-white/75 absolute inset-0 z-10 grid place-items-center">
                  <LoaderIcon className="animate-spin" />
                </div>
              )}
              <div>
                <div className="flex flex-col items-center">
                  <div className="flex flex-col items-center">
                    <FileInputIcon
                      size={48}
                      strokeWidth={1.5}
                      className="text-muted-foreground"
                    />
                    <p className="mt-4 text-lg font-bold">
                      ファイルをドラッグ＆ドロップ
                    </p>
                  </div>

                  <p className="mt-2 text-muted-foreground text-sm font-bold">
                    または
                  </p>

                  <div className="mt-4">
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        if (!fileInputRef.current) return;
                        fileInputRef.current.click();
                      }}
                      className="w-full rounded-xs"
                    >
                      選択してください
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      onChange={handleChange}
                      className="hidden"
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        <DialogFooter>
          {objectUrl && (
            <div className="flex items-center gap-x-4">
              <Button
                onClick={resetImageSelection}
                variant="outline"
                disabled={isUploading}
                className="rounded-xs"
              >
                キャンセル
              </Button>

              <Button
                onClick={handleUpload}
                disabled={isUploading}
                className="rounded-xs"
              >
                アップロード
              </Button>
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
