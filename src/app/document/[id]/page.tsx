import { fetchDocumentById } from "@/lib/db/fetchDocumentById";
import { formatLocalDate } from "@/lib/utils/formatLocalDate";
import { serialize } from "@/lib/editor/serialize";
import parse from "html-react-parser";

type DocumentDetailProps = {
  params: Promise<{ id: string }>;
};

// TODO: return null の画面表示を作ること

export default async function Page({ params }: DocumentDetailProps) {
  const { id } = await params;

  const document = await fetchDocumentById(id);

  if (!document) return null;

  return (
    <section className="max-w-4xl px-6 pt-10">
      <h1 className="text-2xl font-bold text-justify">{document.title}</h1>

      <div className="mt-1 text-muted-foreground flex items-center gap-x-4">
        <p className="text-sm">
          作成日時:
          <time dateTime={formatLocalDate(document.createdAt)}>
            {document.createdAt.toLocaleDateString("ja-JP", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })}
          </time>
        </p>

        {document.createdAt.toISOString() !==
          document.updatedAt.toISOString() && (
          <p className="text-sm">
            更新日時:
            <time dateTime={formatLocalDate(document.updatedAt)}>
              {document.updatedAt.toLocaleDateString("ja-JP", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}
            </time>
          </p>
        )}
      </div>

      <div id="editor" className="mt-10 max-w-4xl p-0 space-y-4">
        {parse(serialize(JSON.parse(document.body)))}
      </div>
    </section>
  );
}
