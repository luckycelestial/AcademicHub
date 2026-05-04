'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { CheckCircle2, Circle, Clock, Tag, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { currentUser } from '@/lib/mock-data';

export default function TasksPage() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTasks = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('due_date', { ascending: true });

    if (!error && data) {
      setTasks(data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const toggleTaskStatus = async (taskId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'done' ? 'pending' : 'done';
    
    // Optimistic update
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));

    const { error } = await supabase
      .from('tasks')
      .update({ status: newStatus })
      .eq('id', taskId);

    if (error) {
      console.error("Error updating task:", error);
      fetchTasks(); // Revert on error
    }
  };

  const pendingTasks = tasks.filter(t => t.status === 'pending');
  const completedTasks = tasks.filter(t => t.status === 'done');

  const TaskItem = ({ task, isDone }: { task: any, isDone: boolean }) => (
    <div className={cn("p-4 border rounded-lg flex items-start gap-4", isDone ? "bg-muted/50 opacity-60" : "bg-card")}>
      <button className="mt-0.5" onClick={() => toggleTaskStatus(task.id, task.status)}>
        {isDone ? <CheckCircle2 className="h-5 w-5 text-primary" /> : <Circle className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />}
      </button>
      <div className="flex-1 space-y-1">
        <div className="flex sm:items-center sm:justify-between flex-col sm:flex-row gap-2">
          <h3 className={cn("font-medium", isDone && "line-through")}>{task.title}</h3>
          {!isDone && (
            <span className={cn(
              "text-[10px] font-medium px-2 py-0.5 rounded-full uppercase tracking-wider w-fit",
              task.priority === 'high' ? 'bg-destructive/10 text-destructive' : 
              task.priority === 'medium' ? 'bg-amber-500/10 text-amber-600' : 
              'bg-blue-500/10 text-blue-600'
            )}>
              {task.priority}
            </span>
          )}
        </div>
        <p className="text-sm text-muted-foreground">{task.description}</p>
        <div className="flex gap-4 pt-2">
          <div className="flex items-center text-xs text-muted-foreground gap-1">
            <Clock className="h-3 w-3" />
            <span>{task.due_date ? new Date(task.due_date).toLocaleDateString() : 'No date'}</span>
          </div>
          <div className="flex items-center text-xs text-muted-foreground gap-1">
            <Tag className="h-3 w-3" />
            <span className="capitalize">{task.type}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tasks & Deadlines</h1>
        <p className="text-muted-foreground mt-2">Manage your personal and class assignments.</p>
      </div>
      
      {isLoading ? (
        <div className="text-center py-12">
          <Loader2 className="mx-auto h-8 w-8 text-primary animate-spin mb-3" />
          <p className="text-sm text-muted-foreground">Loading tasks...</p>
        </div>
      ) : (
        <div className="space-y-8">
          <section>
            <h2 className="text-lg font-semibold mb-4 text-foreground/80 flex items-center gap-2">
              Pending Tasks ({pendingTasks.length})
            </h2>
            <div className="space-y-3">
              {pendingTasks.map(task => <TaskItem key={task.id} task={task} isDone={false} />)}
              {pendingTasks.length === 0 && <p className="text-sm text-muted-foreground">All caught up!</p>}
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-4 text-foreground/80 flex items-center gap-2">
              Completed Tasks ({completedTasks.length})
            </h2>
            <div className="space-y-3">
              {completedTasks.map(task => <TaskItem key={task.id} task={task} isDone={true} />)}
              {completedTasks.length === 0 && <p className="text-sm text-muted-foreground">No completed tasks yet.</p>}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
