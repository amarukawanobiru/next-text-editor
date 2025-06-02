"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useSlate } from "slate-react";
import imageCompression from "browser-image-compression";
import { insertImage } from "@/lib/editor/transforms";
import { toast } from "sonner";
import { ToastMessage } from "@/components/ToastMessage";

const COMPRESSION_OPTIONS = {
  maxSizeMB: 1,
  maxWidthOrHeight: 768 * 2,
} as const;

const MAX_FILE_SIZE_BYTES = 1_000_000;

const IMAGE_MIME_TYPE_PREFIX = "image/";

type FileState = {
  file: File | null;
  objectUrl: string;
};

export const useInsertImageButton = () => {
  const editor = useSlate();
  const [isOpen, setIsOpen] = useState(false);
  const [fileState, setFileState] = useState<FileState>({
    file: null,
    objectUrl: "",
  });
  const [isCompressing, setIsCompressing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [altText, setAltText] = useState("");

  const compressFileIfNeeded = useCallback(
    async (file: File) => {
      if (file.size <= MAX_FILE_SIZE_BYTES) {
        return file;
      }

      return await imageCompression(file, COMPRESSION_OPTIONS);
    },

    [],
  );

  const processFile = useCallback(
    async (file: File) => {
      if (!file.type.startsWith(IMAGE_MIME_TYPE_PREFIX)) {
        toast(<ToastMessage message="画像ファイルを選択してください。" />);
        return;
      }

      setIsCompressing(true);

      try {
        const processedFile = await compressFileIfNeeded(file);
        const imageUrl = URL.createObjectURL(processedFile);

        setFileState({
          file: processedFile,
          objectUrl: imageUrl,
        });
      } catch (error) {
        toast(<ToastMessage message="画像の処理中にエラーが発生しました。" />);
      } finally {
        setIsCompressing(false);
      }
    },
    [compressFileIfNeeded],
  );

  const handleDrag = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();

      setDragActive(false);

      const file = e.dataTransfer?.files?.[0];

      if (file) {
        processFile(file);
      }
    },
    [processFile],
  );

  const handleChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];

      if (file) {
        processFile(file);
      }
    },
    [processFile],
  );

  const resetImageSelection = useCallback(() => {
    if (fileState.objectUrl) {
      URL.revokeObjectURL(fileState.objectUrl);
    }

    setAltText("");
    setFileState({
      file: null,
      objectUrl: "",
    });
  }, [fileState.objectUrl]);

  const handleUpload = useCallback(async () => {
    if (!fileState.file) return;

    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", fileState.file);
    const imageAltText = altText ? altText : "アップロードされた画像";
    formData.append("altText", imageAltText);

    const endpoint = "/api/image/upload";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
      });

      const { success, fileName } = await response.json();

      if (!success) {
        toast(<ToastMessage message="画像のアップロードに失敗しました。" />);
        setIsUploading(false);
        return;
      }

      insertImage(editor, fileName, imageAltText);
      resetImageSelection();
      setIsOpen(false);
    } catch (error) {
      toast(
        <ToastMessage message="画像のアップロード中にエラーが発生しました。" />,
      );
    } finally {
      setIsUploading(false);
    }
  }, [editor, fileState.file, altText, resetImageSelection]);

  useEffect(() => {
    return () => {
      if (fileState.objectUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(fileState.objectUrl);
      }
    };
  }, [fileState.objectUrl]);

  return {
    editor,
    isOpen,
    setIsOpen,
    objectUrl: fileState.objectUrl,
    selectedFile: fileState.file,
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
  };
};
