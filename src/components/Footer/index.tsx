import { cn } from "@/lib/utils";

type FooterProps = React.ComponentPropsWithoutRef<"footer">;

export const Footer = ({ className }: FooterProps) => {
  return (
    <footer className={cn("py-12", className)}>
      <div className="px-6">
        <small className="block text-xs tracking-widest">
          &copy; 2025 AmarukawaNobiru
        </small>
      </div>
    </footer>
  );
};
