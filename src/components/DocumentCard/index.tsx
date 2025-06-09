import Link from "next/link";

type DocumentCardProps = {
  id: string;
  title: string;
  createdAt: Date;
};

export const DocumentCard = ({ id, title, createdAt }: DocumentCardProps) => {
  return (
    <article className="hover:opacity-60 group">
      <Link href={`/document/${id}`} className="block py-6">
        <h2 className="font-bold group-hover:underline">{title}</h2>
        <p className="text-sm">
          作成日時: <span>{createdAt.toLocaleDateString("ja-JP")}</span>
        </p>
      </Link>
    </article>
  );
};
