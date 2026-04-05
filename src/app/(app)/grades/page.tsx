import { mockGrades, mockClasses } from '@/lib/mock-data';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function GradesPage() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Grades</h1>
        <p className="text-muted-foreground mt-2">View your scores and assessments.</p>
      </div>
      
      <div className="border rounded-lg bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Assessment Name</TableHead>
              <TableHead>Class</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockGrades.map((grade) => {
              const cls = mockClasses.find(c => c.id === grade.classId);
              const percentage = Math.round((grade.score / grade.maxScore) * 100);
              
              return (
                <TableRow key={grade.id}>
                  <TableCell className="font-medium">{grade.assessmentName}</TableCell>
                  <TableCell>{cls?.name || 'Unknown Class'}</TableCell>
                  <TableCell>{new Date(grade.date).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="font-bold flex items-center justify-end gap-2">
                      <span className={percentage >= 90 ? "text-green-600" : percentage >= 75 ? "text-primary" : percentage >= 60 ? "text-amber-600" : "text-destructive"}>
                        {grade.score} / {grade.maxScore}
                      </span>
                      <span className="text-xs text-muted-foreground font-normal w-12 text-right">({percentage}%)</span>
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
            {mockGrades.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  No grades posted yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
