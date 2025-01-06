"use client";

import { signUp } from "@/actions/authActions";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useActionState } from "react";

export default function SignUp() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(signUp, null);

  if (state?.success) {
    router.push("/auth/login");
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Create a new account</CardDescription>
        </CardHeader>
        <form action={formAction}>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" required />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" required />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-start">
            <Button type="submit" className="w-full">
              {isPending ? "Loading..." : "Sign Up"}
            </Button>
            {state?.error && (
              <p className="text-sm text-red-500 mt-2">{state.error}</p>
            )}
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
