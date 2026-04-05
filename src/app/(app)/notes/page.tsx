'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Download, FileUp, Hash, Calendar, UploadCloud, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

export default function NotesPage() {
  const [notes, setNotes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Upload State
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const fetchNotes = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setNotes(data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setIsUploading(true);

    try {
      // 1. Upload file to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('notes_files')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 2. Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('notes_files')
        .getPublicUrl(filePath);

      // 3. Transform size for readability
      const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
      const sizeStr = `${sizeInMB} MB`;

      // 4. Insert record into messages table
      const { error: dbError } = await supabase
        .from('notes')
        .insert([
          {
            filename: file.name,
            file_url: publicUrl,
            file_type: fileExt?.toUpperCase() || 'UNKNOWN',
            subject_tag: subject || 'General',
            description: description,
            uploader_name: 'Anonymous',
            size: sizeStr
          }
        ]);

      if (dbError) throw dbError;

      // Success cleanup
      setFile(null);
      setSubject('');
      setDescription('');
      setIsOpen(false);
      fetchNotes(); // Optimistically reload notes

    } catch (err) {
      console.error("Error uploading:", err);
      // Ideally show a toast notification here
      alert("Failed to upload the file. Please check the console for details.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notes & Resources</h1>
          <p className="text-muted-foreground mt-2">Access your course materials and uploads.</p>
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">
              <UploadCloud className="h-4 w-4" />
              Upload Note
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={handleUpload}>
              <DialogHeader>
                <DialogTitle>Upload Note</DialogTitle>
                <DialogDescription>
                  Share a document or resource with your class. It will be uploaded to Supabase.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <label htmlFor="file" className="text-sm font-medium">Select File <span className="text-red-500">*</span></label>
                  <Input 
                    id="file" 
                    type="file" 
                    required
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="subject" className="text-sm font-medium">Subject Code / Tag</label>
                  <Input 
                    id="subject" 
                    placeholder="e.g. CS301" 
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="desc" className="text-sm font-medium">Description</label>
                  <Input 
                    id="desc" 
                    placeholder="Brief description of contents..." 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" disabled={!file || isUploading}>
                  {isUploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Upload to Supabase
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid gap-3">
        {isLoading ? (
          <div className="text-center py-12">
            <Loader2 className="mx-auto h-8 w-8 text-primary animate-spin mb-3" />
            <p className="text-sm text-muted-foreground">Loading notes...</p>
          </div>
        ) : notes.length > 0 ? (
          notes.map((note) => (
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
                        {note.file_type}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5"><FileUp className="h-3.5 w-3.5" /> {note.uploader_name}</span>
                      <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> {new Date(note.created_at).toLocaleDateString()}</span>
                      <span className="flex items-center gap-1.5 min-w-0 truncate"><span className="font-medium text-foreground/70">{note.subject_tag}</span></span>
                      {note.description && (
                         <span className="flex items-center gap-1.5 italic">"{note.description}"</span>
                      )}
                      <span>{note.size}</span>
                    </div>
                  </div>
                  <div className="shrink-0 pl-4 flex gap-2">
                    <a href={note.file_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/10 hover:text-primary transition-colors h-9 w-9">
                        <Download className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-12 border-2 border-dashed rounded-lg">
            <FileText className="mx-auto h-8 w-8 text-muted-foreground mb-3" />
            <h3 className="text-lg font-medium text-foreground">No notes yet</h3>
            <p className="text-sm text-muted-foreground mt-1">Upload a resource to share with the class.</p>
          </div>
        )}
      </div>
    </div>
  );
}
