export type Role = "student" | "teacher" | "admin";

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatarUrl?: string;
  department?: string;
};

export type Class = {
  id: string;
  code: string;
  name: string;
  teacherId: string;
  teacherName: string;
  studentCount: number;
  schedule: string;
  room?: string;
};

export type Note = {
  id: string;
  classId: string;
  filename: string;
  fileType: "pdf" | "docx" | "pptx" | "image";
  uploadedBy: string;
  uploaderName: string;
  uploadDate: string;
  size: string;
  subjectTag: string;
};

export type Task = {
  id: string;
  type: "personal" | "class";
  classId?: string;
  title: string;
  description: string;
  dueDate: string;
  priority: "high" | "medium" | "low";
  status: "pending" | "done";
};

export type Grade = {
  id: string;
  classId: string;
  studentId: string;
  assessmentName: string;
  score: number;
  maxScore: number;
  date: string;
};

export type ChatMessage = {
  id: string;
  classId: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  isPinned?: boolean;
  attachment?: {
    type: "image" | "file";
    url: string;
    name: string;
  };
};

export type Notification = {
  id: string;
  userId: string;
  type: "note" | "deadline" | "grade" | "chat" | "join";
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  actionUrl?: string;
};

// ==========================================
// MOCK DATA
// ==========================================

export const currentUser: User = {
  id: "u1",
  name: "Alex Johnson",
  email: "alex.j@university.edu",
  role: "student",
  avatarUrl: "https://i.pravatar.cc/150?u=u1",
  department: "Computer Science",
};

export const mockUsers: User[] = [
  ...[currentUser],
  { id: "t1", name: "Dr. Sarah Chen", email: "s.chen@university.edu", role: "teacher", avatarUrl: "https://i.pravatar.cc/150?u=t1", department: "Computer Science" },
  { id: "t2", name: "Prof. Michael Roberts", email: "m.roberts@university.edu", role: "teacher", avatarUrl: "https://i.pravatar.cc/150?u=t2", department: "Mathematics" },
  { id: "a1", name: "Dr. James Wilson", email: "j.wilson@university.edu", role: "admin", department: "Computer Science" },
];

export const mockClasses: Class[] = [
  { id: "c1", code: "CS301-A", name: "Data Structures & Algorithms", teacherId: "t1", teacherName: "Dr. Sarah Chen", studentCount: 42, schedule: "Mon, Wed 10:00 AM", room: "Room 402" },
  { id: "c2", code: "MT201-B", name: "Linear Algebra", teacherId: "t2", teacherName: "Prof. Michael Roberts", studentCount: 55, schedule: "Tue, Thu 2:00 PM", room: "Hall B" },
  { id: "c3", code: "CS405-C", name: "Database Management Systems", teacherId: "t1", teacherName: "Dr. Sarah Chen", studentCount: 38, schedule: "Fri 9:00 AM", room: "Lab 2" },
];

export const mockNotes: Note[] = [
  { id: "n1", classId: "c1", filename: "Graph_Algorithms.pdf", fileType: "pdf", uploadedBy: "t1", uploaderName: "Dr. Sarah Chen", uploadDate: "2026-04-01T10:00:00Z", size: "2.4 MB", subjectTag: "Graphs" },
  { id: "n2", classId: "c1", filename: "Trees_Midterms_Review.pptx", fileType: "pptx", uploadedBy: "t1", uploaderName: "Dr. Sarah Chen", uploadDate: "2026-03-25T14:30:00Z", size: "5.1 MB", subjectTag: "Trees" },
  { id: "n3", classId: "c2", filename: "Eigenvectors_Notes.pdf", fileType: "pdf", uploadedBy: "u1", uploaderName: "Alex Johnson", uploadDate: "2026-04-03T09:15:00Z", size: "1.2 MB", subjectTag: "Matrices" },
];

export const mockTasks: Task[] = [
  { id: "task1", type: "class", classId: "c1", title: "Assignment: Implement Dijkstra's Algorithm", description: "Write down the pseudocode and a working C++ / Python implementation.", dueDate: "2026-04-10T23:59:00Z", priority: "high", status: "pending" },
  { id: "task2", type: "class", classId: "c2", title: "Problem Set 4", description: "Complete chapters 5 questions.", dueDate: "2026-04-06T12:00:00Z", priority: "medium", status: "pending" },
  { id: "task3", type: "personal", title: "Read DBMS chapter 3", description: "Focus on normal forms before the lecture.", dueDate: "2026-04-08T09:00:00Z", priority: "low", status: "done" },
];

export const mockGrades: Grade[] = [
  { id: "g1", classId: "c1", studentId: "u1", assessmentName: "Mid-Term Exam", score: 85, maxScore: 100, date: "2026-03-20T00:00:00Z" },
  { id: "g2", classId: "c2", studentId: "u1", assessmentName: "Quiz 1", score: 18, maxScore: 20, date: "2026-02-15T00:00:00Z" },
  { id: "g3", classId: "c1", studentId: "u1", assessmentName: "Assignment 1", score: 48, maxScore: 50, date: "2026-02-28T00:00:00Z" },
];

export const mockNotifications: Notification[] = [
  { id: "not1", userId: "u1", type: "deadline", title: "Deadline Approaching", message: "Problem Set 4 is due in 24 hours.", timestamp: "2026-04-05T12:00:00Z", isRead: false, actionUrl: "/tasks" },
  { id: "not2", userId: "u1", type: "note", title: "New Note Uploaded", message: "Dr. Sarah Chen uploaded 'Graph_Algorithms.pdf'", timestamp: "2026-04-01T10:05:00Z", isRead: true, actionUrl: "/notes" },
  { id: "not3", userId: "u1", type: "grade", title: "Grade Posted", message: "Grade for 'Mid-Term Exam' in Data Structures has been published.", timestamp: "2026-03-21T09:00:00Z", isRead: true, actionUrl: "/grades" },
];

export const mockChats: ChatMessage[] = [
  { id: "msg1", classId: "c1", senderId: "t1", senderName: "Dr. Sarah Chen", content: "Welcome to Data Structures! Please check the syllabus.", timestamp: "2026-01-15T09:00:00Z", isPinned: true },
  { id: "msg2", classId: "c1", senderId: "u1", senderName: "Alex Johnson", content: "Will the mid-term cover Red-Black trees?", timestamp: "2026-03-10T14:20:00Z" },
  { id: "msg3", classId: "c1", senderId: "t1", senderName: "Dr. Sarah Chen", content: "No, we will only cover up to AVL trees.", timestamp: "2026-03-10T15:05:00Z" },
];
