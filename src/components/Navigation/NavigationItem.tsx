"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type NavigationItemProps = {
  href: string;
  title: string;
};

export const NavigationItem = ({ href, title }: NavigationItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Button variant="ghost" size="sm" className="rounded-xs" asChild>
      <Link
        href={href}
        className={cn(
          "relative after:w-full after:h-0.5 after:bg-accent-foreground after:absolute after:-bottom-2 after:pointer-events-none after:invisible",
          isActive && "after:visible",
        )}
      >
        <span>{title}</span>
      </Link>
    </Button>
  );
};
