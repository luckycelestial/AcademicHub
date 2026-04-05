import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockClasses } from '@/lib/mock-data';
import { Users, Clock, MapPin, User } from 'lucide-react';

export default function ClassesPage() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Classes</h1>
        <p className="text-muted-foreground mt-2">View and manage your enrolled subjects.</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockClasses.map(cls => (
          <Card key={cls.id} className="flex flex-col hover:border-primary transition-colors cursor-pointer">
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-semibold bg-primary/10 text-primary px-2 py-1 rounded-full">{cls.code}</span>
                <Users className="h-4 w-4 text-muted-foreground" />
              </div>
              <CardTitle className="text-xl line-clamp-2">{cls.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-end space-y-3">
              <div className="flex items-center text-sm text-muted-foreground gap-2">
                <User className="h-4 w-4" />
                <span>{cls.teacherName}</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground gap-2">
                <Clock className="h-4 w-4" />
                <span>{cls.schedule}</span>
              </div>
              {cls.room && (
                <div className="flex items-center text-sm text-muted-foreground gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{cls.room}</span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
