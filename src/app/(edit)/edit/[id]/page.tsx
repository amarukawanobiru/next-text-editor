import { fetchDocumentById } from "@/lib/db/fetchDocumentById";
import { isDescendantArray } from "@/lib/editor/utils";
import { Heading } from "@/components/Heading";

type EditFormProps = {
  params: Promise<{ id: string }>;
};

// TODO: return null の画面表示を作ること

export default async function Page({ params }: EditFormProps) {
  const { id } = await params;

  const document = await fetchDocumentById(id);

  if (!document) return null;

  const initialValue = JSON.parse(document.body);

  if (!isDescendantArray(initialValue)) return null;

  return (
    <section className="px-6 pt-10">
      <Heading title="編集" description="EditForm" />

      <div>{document.title}</div>
    </section>
  );
}
