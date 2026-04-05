import { mockChats, mockClasses, currentUser } from '@/lib/mock-data';
import { Send, Pin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export default function ChatPage() {
  const activeClass = mockClasses[0];

  return (
    <div className="max-w-5xl mx-auto h-[calc(100vh-8rem)] flex flex-col border rounded-xl bg-card overflow-hidden">
      <div className="h-16 border-b flex items-center px-6 justify-between bg-muted/20">
        <div>
          <h2 className="font-semibold text-lg">{activeClass.name}</h2>
          <p className="text-xs text-muted-foreground">{activeClass.studentCount} students • {activeClass.teacherName}</p>
        </div>
      </div>

      {mockChats.some(m => m.isPinned) && (
        <div className="bg-primary/5 border-b px-6 py-2 flex items-start gap-2">
          <Pin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
          <div className="text-sm">
            <span className="font-medium text-primary block text-xs mb-0.5">Pinned by Admin</span>
            <p className="text-muted-foreground">{mockChats.find(m => m.isPinned)?.content}</p>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {mockChats.map(msg => {
          const isMe = msg.senderId === currentUser.id;
          return (
            <div key={msg.id} className={cn("flex flex-col max-w-[80%]", isMe ? "ml-auto items-end" : "items-start")}>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-xs font-medium text-foreground/80">{isMe ? "You" : msg.senderName}</span>
                <span className="text-[10px] text-muted-foreground">{new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
              </div>
              <div className={cn(
                "px-4 py-2.5 rounded-2xl text-sm whitespace-pre-wrap leading-relaxed",
                isMe ? "bg-primary text-primary-foreground rounded-tr-sm" : "bg-muted rounded-tl-sm"
              )}>
                {msg.content}
              </div>
            </div>
          )
        })}
      </div>

      <div className="p-4 border-t bg-muted/10">
        <div className="flex items-center gap-2">
          <Input 
            placeholder="Type a message..." 
            className="flex-1 rounded-full bg-background"
          />
          <Button type="submit" size="icon" className="shrink-0 rounded-full h-10 w-10">
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
