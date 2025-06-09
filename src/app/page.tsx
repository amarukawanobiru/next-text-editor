import { fetchPublishedDocuments } from "@/lib/db/fetchPublishedDocuments";
import { Heading } from "@/components/Heading";
import { DocumentCard } from "@/components/DocumentCard";

export default async function Home() {
  const documents = await fetchPublishedDocuments();

  if (!documents) {
    return (
      <section className="px-6 pt-10">
        <Heading title="ホームページ" description="HomePage" />

        <div className="mt-10">
          <p>公開されたドキュメントがありません。</p>
        </div>
      </section>
    );
  }

  return (
    <section className="px-6 pt-10">
      <Heading title="ホームページ" description="HomePage" />

      <ul className="mt-10 border-t">
        {documents.map((document) => (
          <li key={document.id} className="border-b">
            <DocumentCard {...document} />
          </li>
        ))}
      </ul>
    </section>
  );
}
