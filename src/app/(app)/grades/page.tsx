'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { mockClasses } from '@/lib/mock-data';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader2 } from 'lucide-react';

export default function GradesPage() {
  const [grades, setGrades] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchGrades = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('grades')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setGrades(data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchGrades();
  }, []);

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Grades</h1>
        <p className="text-muted-foreground mt-2">View your scores and assessments.</p>
      </div>
      
      <div className="border rounded-lg bg-card">
        {isLoading ? (
          <div className="text-center py-12">
            <Loader2 className="mx-auto h-8 w-8 text-primary animate-spin mb-3" />
            <p className="text-sm text-muted-foreground">Loading grades...</p>
          </div>
        ) : (
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
              {grades.map((grade) => {
                const cls = mockClasses.find(c => c.id === grade.class_id);
                const percentage = Math.round((grade.score / grade.max_score) * 100);
                
                return (
                  <TableRow key={grade.id}>
                    <TableCell className="font-medium">{grade.assessment_name}</TableCell>
                    <TableCell>{cls?.name || 'General'}</TableCell>
                    <TableCell>{new Date(grade.created_at).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <div className="font-bold flex items-center justify-end gap-2">
                        <span className={percentage >= 90 ? "text-green-600" : percentage >= 75 ? "text-primary" : percentage >= 60 ? "text-amber-600" : "text-destructive"}>
                          {grade.score} / {grade.max_score}
                        </span>
                        <span className="text-xs text-muted-foreground font-normal w-12 text-right">({percentage}%)</span>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
              {grades.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                    No grades posted yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
