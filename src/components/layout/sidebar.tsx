import Link from "next/link";
import { BookOpen, CheckSquare, GraduationCap, Users, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/classes", label: "My Classes", icon: BookOpen },
  { href: "/tasks", label: "Tasks & Deadlines", icon: CheckSquare },
  { href: "/grades", label: "Grades", icon: GraduationCap },
  { href: "/chat", label: "Chat", icon: Users },
];

export default function Sidebar() {
  // const pathname = usePathname();

  return (
    <aside className="w-64 border-r bg-card flex-col h-screen hidden md:flex sticky top-0">
      <div className="h-14 flex items-center px-6 border-b font-bold tracking-tight gap-2">
        <GraduationCap className="h-5 w-5 text-primary" />
        <span>Academia</span>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={`${item.href}`}
            className={cn(
              "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors",
              "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
