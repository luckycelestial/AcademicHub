import { mockNotes, mockClasses } from '@/lib/mock-data';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Download, FileUp, Hash, Calendar, UploadCloud } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotesPage() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notes & Resources</h1>
          <p className="text-muted-foreground mt-2">Access your course materials and uploads.</p>
        </div>
        <Button className="gap-2">
          <UploadCloud className="h-4 w-4" />
          Upload Note
        </Button>
      </div>
      
      <div className="grid gap-3">
        {mockNotes.map((note) => {
          const cls = mockClasses.find(c => c.id === note.classId);
          return (
             <Card key={note.id} className="overflow-hidden hover:shadow-sm transition-shadow">
              <CardContent className="p-0">
                <div className="flex items-center gap-4 p-4 sm:p-6">
                  <div className="h-12 w-12 shrink-0 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-base truncate">{note.filename}</h3>
                      <span className="shrink-0 text-xs font-medium px-2 py-0.5 bg-muted text-muted-foreground rounded-sm uppercase tracking-wide">
                        {note.fileType}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5"><FileUp className="h-3.5 w-3.5" /> {note.uploaderName}</span>
                      <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> {new Date(note.uploadDate).toLocaleDateString()}</span>
                      <span className="flex items-center gap-1.5 min-w-0 truncate"><span className="font-medium text-foreground/70">{cls?.code}</span></span>
                      <span className="flex items-center gap-1.5"><Hash className="h-3.5 w-3.5" /> {note.subjectTag}</span>
                      <span>{note.size}</span>
                    </div>
                  </div>
                  <div className="shrink-0 pl-4">
                    <Button variant="ghost" size="icon" className="hover:bg-primary/10 hover:text-primary transition-colors">
                      <Download className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
        {mockNotes.length === 0 && (
          <div className="text-center py-12 border-2 border-dashed rounded-lg">
            <FileText className="mx-auto h-8 w-8 text-muted-foreground mb-3" />
            <h3 className="text-lg font-medium text-foreground">No notes yet</h3>
            <p className="text-sm text-muted-foreground mt-1">Files uploaded to your classes will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
