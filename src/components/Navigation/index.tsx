import { cn } from "@/lib/utils";
import { NavigationItem } from "@/components/Navigation/NavigationItem";

const navItems = [
  { href: "/", title: "Home" },
  { href: "/draft", title: "Draft" },
  { href: "/Edit", title: "Edit" },
];

type NavigationProps = React.ComponentPropsWithoutRef<"nav">;

export const Navigation = ({ className, ...props }: NavigationProps) => {
  return (
    <nav
      {...props}
      className={cn("px-4 shadow-[inset_0_-1px_0_var(--accent)]", className)}
    >
      <ul className="h-12 flex items-center gap-x-2">
        {navItems.map(({ href, title }) => (
          <li key={href} className="px-2">
            <NavigationItem href={href} title={title} />
          </li>
        ))}
      </ul>
    </nav>
  );
};
