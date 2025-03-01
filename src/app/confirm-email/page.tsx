// src/app/confirm-email/page.tsx
"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";

export default function ConfirmEmailPage() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/confirm-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          confirmationCode: code
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Verification failed");
      }

      setIsVerified(true);
      toast({
        title: "Email Verified!",
        description: "Your email has been successfully verified.",
      });
    } catch (error: any) {
      toast({
        title: "Verification Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (isVerified) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">Email Verified!</h1>
            <p className="text-muted-foreground">
              Your email has been successfully verified. You can now access your account.
            </p>
            <Button asChild>
              <Link href="/login">Continue to Login</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Confirm Your Email</h1>
          <p className="mt-2 text-muted-foreground">
            We've sent a 6-digit code to {email}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="code">Verification Code</Label>
              <Input
                id="code"
                type="text"
                placeholder="Enter 6-digit code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
                maxLength={6}
                pattern="\d{6}"
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Verifying..." : "Verify Email"}
          </Button>

          <div className="text-center text-sm">
            Didn't receive the code?{" "}
            <Button 
              variant="link" 
              className="p-0 text-sm"
              type="button"
              disabled={loading}
            >
              Resend Code
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}