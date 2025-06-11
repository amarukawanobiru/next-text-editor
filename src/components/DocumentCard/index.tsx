import Link from "next/link";
import { formatLocalDate } from "@/lib/utils/formatLocalDate";

type DocumentCardProps = {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
};

export const DocumentCard = ({
  id,
  title,
  createdAt,
  updatedAt,
}: DocumentCardProps) => {
  return (
    <article className="hover:opacity-60 group">
      <Link href={`/document/${id}`} className="block py-6">
        <h2 className="font-bold group-hover:underline">{title}</h2>
        <div className="mt-1 flex items-center gap-x-4">
          <p className="text-xs">
            作成日時:
            <time dateTime={formatLocalDate(createdAt)}>
              {createdAt.toLocaleDateString("ja-JP", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}
            </time>
          </p>

          <p className="text-xs">
            更新日時:
            <time dateTime={formatLocalDate(updatedAt)}>
              {updatedAt.toLocaleDateString("ja-JP", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}
            </time>
          </p>
        </div>
      </Link>
    </article>
  );
};
