import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { redirect } from "next/navigation";

export default function LoginPage() {
  async function loginAction() {
    "use server";
    // Log in action (For now just redirect to dashboard)
    // Here you would add normal username/password validation logic
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-col min-h-screen items-center justify-center p-4 bg-muted/30">
      <div className="mb-8 flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2">
            <GraduationCap className="h-8 w-8 text-primary" />
            <span className="font-bold text-3xl tracking-tight">Academia</span>
        </Link>
      </div>
      
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome back</CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <form action={loginAction}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Username</label>
              <Input id="username" name="username" type="text" required placeholder="johndoe" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Password</label>
              </div>
              <Input id="password" name="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              Log in
            </Button>
          </CardContent>
        </form>
        <CardFooter className="flex justify-center text-sm text-muted-foreground gap-1">
          Don&apos;t have an account? 
          <Link href="/onboarding" className="text-primary hover:underline font-medium">Sign up</Link>
        </CardFooter>
      </Card>
    </div>
  );
}
