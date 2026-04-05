import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { BookOpen, Calendar, GraduationCap, Users } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="px-6 py-4 flex items-center justify-between border-b">
        <div className="flex items-center gap-2">
          <GraduationCap className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl tracking-tight">Academia</span>
        </div>
        <nav className="gap-6 hidden md:flex text-sm font-medium text-muted-foreground">
          <Link href="#features" className="hover:text-primary transition">Features</Link>
          <Link href="#how-it-works" className="hover:text-primary transition">How it Works</Link>
          <Link href="#roles" className="hover:text-primary transition">Roles</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/onboarding">
            <Button variant="ghost">Log in</Button>
          </Link>
          <Link href="/onboarding">
            <Button>Get Started</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="w-full py-24 md:py-32 lg:py-48 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/50">
          <div className="max-w-[800px] space-y-6">
            <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
              The #1 Platform for College Cohorts
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
              Manage your academic life <span className="text-primary">seamlessly.</span>
            </h1>
            <p className="text-xl text-muted-foreground md:px-12">
              Centralized notes, task tracking, grade visibility, and class communication, all in one intelligent workspace for students and teachers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Link href="/onboarding">
                <Button size="lg" className="w-full sm:w-auto text-base h-12 px-8">Start for Free</Button>
              </Link>
              <Link href="#features">
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-base h-12 px-8">Explore Features</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Everything you need in one place</h2>
            <p className="text-lg text-muted-foreground max-w-[600px] mx-auto">No more fragmented tools or missed deadlines. Academia brings your entire university cohort together.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-border/50 shadow-sm">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Centralized Notes</CardTitle>
                <CardDescription>Upload and access class materials effortlessly. Tagged by subject and automatically organized for everybody.</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="border-border/50 shadow-sm">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Deadlines & Tasks</CardTitle>
                <CardDescription>Track personal and class-wide tasks with intelligent in-app reminders so you never miss another submission.</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="border-border/50 shadow-sm">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Class Communication</CardTitle>
                <CardDescription>Collaborate in dedicated class chat rooms. Share insights securely with moderated discussions.</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-8 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Academia. All rights reserved.</p>
      </footer>
    </div>
  );
}

