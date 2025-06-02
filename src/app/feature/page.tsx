import { Heading } from "@/components/Heading";
import { Editor } from "@/components/features/Editor";

export default function Page() {
  return (
    <section className="px-6 pt-10">
      <Heading title="開発用" description="Feature" />

      <Editor className="mt-10" />
    </section>
  );
}
