"use client";

import Link from "next/link";
import type { ColumnDef } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CircleMinusIcon, CircleCheckIcon, EllipsisIcon } from "lucide-react";

type EditableContent = {
  id: string;
  title: string;
  draft: boolean;
  createdAt: Date;
};

export const columns: ColumnDef<EditableContent>[] = [
  {
    accessorKey: "title",
    header: () => (
      <div className="flex items-center justify-between">
        タイトル
        <div className="self-stretch">
          <Separator orientation="vertical" />
        </div>
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-between">
        {row.getValue("title")}
        <div className="self-stretch">
          <Separator orientation="vertical" />
        </div>
      </div>
    ),
  },
  {
    accessorKey: "draft",
    header: () => (
      <div className="flex items-center justify-between">
        公開設定
        <div className="self-stretch">
          <Separator orientation="vertical" />
        </div>
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-between">
        {row.getValue("draft") ? (
          <div className="flex items-center text-warning">
            <CircleMinusIcon size={14} />
            <span className="ml-1.5">停止中</span>
          </div>
        ) : (
          "公開中"
        )}
        <div className="self-stretch">
          <Separator orientation="vertical" />
        </div>
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: () => (
      <div className="flex items-center justify-between">
        作成日時
        <div className="self-stretch">
          <Separator orientation="vertical" />
        </div>
      </div>
    ),
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as Date;

      return (
        <div className="flex items-center justify-between">
          {date.toLocaleDateString("ja-JP")}
          <div className="self-stretch">
            <Separator orientation="vertical" />
          </div>
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const documentId = row.original.id;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 rounded-xs">
              <span className="sr-only">メニューを開く</span>
              <EllipsisIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href={`/edit/${documentId}`}>編集</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>公開設定</DropdownMenuItem>
            <DropdownMenuItem>削除</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
