'use client';

import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { mockClasses, currentUser } from '@/lib/mock-data';
import { Send, Pin, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export default function ChatPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const activeClass = mockClasses[0];

  // 1. Fetch existing messages
  const fetchMessages = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: true });

    if (!error && data) {
      setMessages(data);
    }
    setIsLoading(false);
  };

  // 2. Subscribe to real-time changes
  useEffect(() => {
    fetchMessages();

    const channel = supabase
      .channel('public:messages')
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'messages' 
      }, (payload) => {
        setMessages((prev) => [...prev, payload.new]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // 3. Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // 4. Send Message
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || isSending) return;

    setIsSending(true);
    const { error } = await supabase
      .from('messages')
      .insert([
        {
          content: newMessage,
          sender_id: currentUser.id,
          sender_name: currentUser.name,
          class_id: activeClass.id,
          is_pinned: false
        }
      ]);

    if (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please check your Supabase connection.");
    } else {
      setNewMessage('');
    }
    setIsSending(false);
  };

  return (
    <div className="max-w-5xl mx-auto h-[calc(100vh-8rem)] flex flex-col border rounded-xl bg-card overflow-hidden">
      <div className="h-16 border-b flex items-center px-6 justify-between bg-muted/20">
        <div>
          <h2 className="font-semibold text-lg">{activeClass.name}</h2>
          <p className="text-xs text-muted-foreground">{activeClass.studentCount} students • {activeClass.teacherName}</p>
        </div>
      </div>

      {messages.some(m => m.is_pinned) && (
        <div className="bg-primary/5 border-b px-6 py-2 flex items-start gap-2">
          <Pin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
          <div className="text-sm">
            <span className="font-medium text-primary block text-xs mb-0.5">Pinned Message</span>
            <p className="text-muted-foreground">{messages.find(m => m.is_pinned)?.content}</p>
          </div>
        </div>
      )}

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth">
        {isLoading ? (
          <div className="h-full flex items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : messages.length > 0 ? (
          messages.map(msg => {
            const isMe = msg.sender_id === currentUser.id;
            return (
              <div key={msg.id} className={cn("flex flex-col max-w-[80%]", isMe ? "ml-auto items-end" : "items-start")}>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-xs font-medium text-foreground/80">{isMe ? "You" : msg.sender_name}</span>
                  <span className="text-[10px] text-muted-foreground">{new Date(msg.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                </div>
                <div className={cn(
                  "px-4 py-2.5 rounded-2xl text-sm whitespace-pre-wrap leading-relaxed",
                  isMe ? "bg-primary text-primary-foreground rounded-tr-sm" : "bg-muted rounded-tl-sm"
                )}>
                  {msg.content}
                </div>
              </div>
            )
          })
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
            <p>No messages yet. Start the conversation!</p>
          </div>
        )}
      </div>

      <form onSubmit={handleSendMessage} className="p-4 border-t bg-muted/10">
        <div className="flex items-center gap-2">
          <Input 
            placeholder="Type a message..." 
            className="flex-1 rounded-full bg-background"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            disabled={isSending}
          />
          <Button type="submit" size="icon" className="shrink-0 rounded-full h-10 w-10" disabled={!newMessage.trim() || isSending}>
            {isSending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            <span className="sr-only">Send</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
