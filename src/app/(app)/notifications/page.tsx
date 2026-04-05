import { mockNotifications } from '@/lib/mock-data';
import { Bell, BookOpen, CheckSquare, GraduationCap, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const icons: Record<string, React.ElementType> = {
  note: BookOpen,
  deadline: CheckSquare,
  grade: GraduationCap,
  chat: Users,
  join: Bell,
};

export default function NotificationsPage() {
  return (
    <div className="space-y-6 max-w-3xl mx-auto pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground mt-2">Stay updated on your academic activity.</p>
        </div>
        <Button variant="outline" size="sm">Mark all as read</Button>
      </div>

      <div className="space-y-3">
        {mockNotifications.map(notification => {
          const Icon = icons[notification.type] || Bell;
          return (
            <Link key={notification.id} href={notification.actionUrl || '#'} className={cn(
              "flex gap-4 p-4 border rounded-xl hover:border-primary/50 transition-colors bg-card",
              !notification.isRead && "bg-primary/5 border-primary/20"
            )}>
              <div className={cn(
                "h-10 w-10 shrink-0 flex items-center justify-center rounded-full mt-1",
                !notification.isRead ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
              )}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-start justify-between gap-2">
                  <h3 className={cn("font-medium", !notification.isRead && "text-primary")}>
                    {notification.title}
                  </h3>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {new Date(notification.timestamp).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {notification.message}
                </p>
              </div>
            </Link>
          );
        })}
        {mockNotifications.length === 0 && (
          <div className="text-center py-16">
            <Bell className="mx-auto h-8 w-8 text-muted-foreground/50 mb-3" />
            <p className="text-muted-foreground text-sm">You have no notifications.</p>
          </div>
        )}
      </div>
    </div>
  );
}
