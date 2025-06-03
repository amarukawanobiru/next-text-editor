import { cn } from "@/lib/utils";
import { NavigationItem } from "@/components/Navigation/NavigationItem";

const navItems = [
  { href: "/", title: "Home" },
  { href: "/draft", title: "Draft" },
  { href: "/edit", title: "Edit" },
  { href: "/uploaded", title: "Uploaded" },
  { href: "/feature", title: "Feature" },
];

type NavigationProps = React.ComponentPropsWithoutRef<"nav">;

export const Navigation = ({ className, ...props }: NavigationProps) => {
  return (
    <nav {...props} className={cn("px-6 border-b", className)}>
      <ul className="h-12 flex items-center gap-x-2">
        {navItems.map(({ href, title }) => (
          <li key={href}>
            <NavigationItem href={href} title={title} />
          </li>
        ))}
      </ul>
    </nav>
  );
};
