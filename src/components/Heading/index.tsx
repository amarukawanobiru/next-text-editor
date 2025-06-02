import { cn } from "@/lib/utils";

type HeadingProps = {
  title: string;
  description: string;
  tagName?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
} & React.ComponentPropsWithoutRef<"head">;

export const Heading = ({
  title,
  description,
  tagName: TagName = "h2",
  className,
  ...props
}: HeadingProps) => {
  return (
    <hgroup className="flex flex-col">
      <TagName {...props} className={cn("text-2xl font-bold", className)}>
        {title}
      </TagName>
      <p className="text-muted-foreground text-sm font-medium">{`- ${description} -`}</p>
    </hgroup>
  );
};
