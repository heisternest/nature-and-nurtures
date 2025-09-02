"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormStatus } from "react-dom";

// Import your server action
import { login } from "./action";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full h-11 bg-brand text-black font-medium hover:bg-brand/80"
    >
      {pending ? "Signing in..." : "Sign In"}
    </Button>
  );
}

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br bg-brand-light flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand Area */}
        <div className="text-center mb-8">
          <img
            src="/logo.png"
            alt="MumBuds Logo"
            className="w-40 flex items-center justify-center mx-auto mb-4"
          />
        </div>

        {/* Sign In Form */}
        <Card className="shadow-lg border-0">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-xl text-center text-brand-primary">
              <div>
                <h1 className="text-2xl font-semibold text-brand-primary">
                  Nature And Nurture Admin
                </h1>
              </div>
            </CardTitle>
            <CardDescription className="text-center text-slate-600">
              <p className="text-slate-600 mt-1">Sign in to your account</p>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Bind the login server action to form */}
            <form action={login} className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-slate-700"
                >
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="h-11 border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-sm font-medium text-slate-700"
                >
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  className="h-11 border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" />
                  <Label htmlFor="remember" className="text-sm text-brand-dark">
                    Remember me
                  </Label>
                </div>
              </div>

              <SubmitButton />
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-slate-500">
          <p>© 2025 Nature And Nurtures. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
