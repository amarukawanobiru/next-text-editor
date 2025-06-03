import { Heading } from "@/components/Heading";
import { DraftForm } from "@/components/DraftForm";

export default function Page() {
  return (
    <section className="px-6 pt-10">
      <Heading title="下書き" description="DraftForm" />

      <DraftForm className="mt-10 max-w-4xl" />
    </section>
  );
}
