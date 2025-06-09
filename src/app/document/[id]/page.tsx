import { fetchDocumentById } from "@/lib/db/fetchDocumentById";
import { serialize } from "@/lib/editor/serialize";
import parse from "html-react-parser";
import { Heading } from "@/components/Heading";

type DocumentDetailProps = {
  params: Promise<{ id: string }>;
};

// TODO: return null の画面表示を作ること

export default async function Page({ params }: DocumentDetailProps) {
  const { id } = await params;

  const document = await fetchDocumentById(id);

  if (!document) return null;

  return (
    <section className="px-6 pt-10">
      <Heading title={document.title} description="DocumentPage" />

      <div id="editor" className="mt-10 max-w-4xl p-0 space-y-4">
        {parse(serialize(JSON.parse(document.body)))}
      </div>
    </section>
  );
}
