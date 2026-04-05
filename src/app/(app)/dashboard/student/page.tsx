import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BookOpen, CheckSquare, GraduationCap, Clock } from "lucide-react";
import { mockTasks, mockClasses, mockNotes } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";

export default function StudentDashboard() {
  const pendingTasks = mockTasks.filter(t => t.status === "pending");
  const upcomingDeadline = pendingTasks.sort((a,b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())[0];

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Student Dashboard</h1>
        <p className="text-muted-foreground mt-2">Welcome back! Here is your academic overview.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">My Classes</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockClasses.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Enrolled subjects</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
            <CheckSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingTasks.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Needs attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Notes</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockNotes.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Available this week</p>
          </CardContent>
        </Card>

        <Card className="bg-primary/5 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-primary">Next Deadline</CardTitle>
            <GraduationCap className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{upcomingDeadline ? upcomingDeadline.title : "None"}</div>
            <p className="text-xs text-muted-foreground mt-1">{upcomingDeadline ? new Date(upcomingDeadline.dueDate).toLocaleDateString() : "You are all caught up!"}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Upcoming Tasks</CardTitle>
            <CardDescription>Your tasks and assignments due soon.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingTasks.slice(0, 4).map(task => (
                <div key={task.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium text-sm">{task.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">Due {new Date(task.dueDate).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Notes</CardTitle>
            <CardDescription>Latest materials uploaded by teachers.</CardDescription>
          </CardHeader>
          <CardContent>
             <div className="space-y-4">
              {mockNotes.slice(0, 4).map(note => (
                <div key={note.id} className="flex items-center gap-4">
                  <div className="bg-muted p-2 rounded-md">
                    <BookOpen className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{note.filename}</p>
                    <p className="text-xs text-muted-foreground mt-1">Uploaded by Teacher • {note.fileType}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
