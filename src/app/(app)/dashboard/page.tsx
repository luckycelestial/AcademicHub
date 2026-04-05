import { redirect } from 'next/navigation';

export default function DashboardPage() {
  // For now, redirect to the student dashboard. 
  // Once auth is implemented, this should redirect based on role.
  redirect('/dashboard/student');
}
