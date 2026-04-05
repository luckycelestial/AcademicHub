import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import Link from "next/link";
import { GraduationCap, User, Users } from "lucide-react";

export default function OnboardingPage() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center p-4 bg-muted/30">
      <div className="mb-8 flex items-center gap-2">
        <GraduationCap className="h-8 w-8 text-primary" />
        <span className="font-bold text-3xl tracking-tight">Academia</span>
      </div>
      
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome aboard!</CardTitle>
          <CardDescription>Select your role to get started</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Link href="/dashboard/student" className="block">
            <Button variant="outline" className="w-full h-24 flex items-center justify-start gap-4 p-6 hover:border-primary">
              <User className="h-8 w-8 text-primary" />
              <div className="text-left">
                <div className="font-semibold text-lg">I am a Student</div>
                <div className="text-sm border-0 text-muted-foreground font-normal">Join classes, track tasks, and view notes.</div>
              </div>
            </Button>
          </Link>
          
          <Link href="/dashboard/teacher" className="block">
            <Button variant="outline" className="w-full h-24 flex items-center justify-start gap-4 p-6 hover:border-primary">
              <Users className="h-8 w-8 text-primary" />
              <div className="text-left">
                <div className="font-semibold text-lg">I am a Teacher</div>
                <div className="text-sm border-0 text-muted-foreground font-normal">Create classes, upload notes, and assign grades.</div>
              </div>
            </Button>
          </Link>
        </CardContent>
        <CardFooter className="justify-center">
          <div className="text-sm text-muted-foreground">Admin provisioning is handled separately.</div>
        </CardFooter>
      </Card>
    </div>
  );
}

