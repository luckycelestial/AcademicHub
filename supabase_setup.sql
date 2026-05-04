-- Create tables for AcademicHub

-- 1. Notes table
CREATE TABLE IF NOT EXISTS public.notes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT now(),
    filename TEXT NOT NULL,
    file_url TEXT NOT NULL,
    file_type TEXT,
    subject_tag TEXT DEFAULT 'General',
    description TEXT,
    uploader_name TEXT DEFAULT 'Anonymous',
    size TEXT
);

-- 2. Messages table (for Chat)
CREATE TABLE IF NOT EXISTS public.messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT now(),
    class_id TEXT DEFAULT 'c1', -- Default class for now
    sender_id TEXT NOT NULL,
    sender_name TEXT NOT NULL,
    content TEXT NOT NULL,
    is_pinned BOOLEAN DEFAULT false
);

-- Enable RLS
ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Create Policies (Allow everything for now to fix the user's issue, can be hardened later)
CREATE POLICY "Allow public read access to notes" ON public.notes FOR SELECT USING (true);
CREATE POLICY "Allow public insert access to notes" ON public.notes FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read access to messages" ON public.messages FOR SELECT USING (true);
CREATE POLICY "Allow public insert access to messages" ON public.messages FOR INSERT WITH CHECK (true);

-- 3. Storage Setup (Run these separately if your SQL editor doesn't support storage management)
-- Insert bucket into storage.buckets
INSERT INTO storage.buckets (id, name, public) 
VALUES ('notes_files', 'notes_files', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'notes_files');
CREATE POLICY "Authenticated Upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'notes_files');
