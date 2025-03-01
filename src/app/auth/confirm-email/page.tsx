"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import api from "@/clients/api/api";

export default function ConfirmEmailPage() {
  const router = useRouter();
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
      const response = await api.registrationConfirmation(code);
      if (response) {
        setIsVerified(true);
        toast({
          title: "Email Verified!",
          description: "Your email has been successfully verified.",
        });
        router.push("/auth/login");
      } else {
        throw new Error("Something is wrong, try again");
      }
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

  const resendCode = async () => {
    try {
      if (!email) return;
      const response = await api.resentTokenByEmail(email);
      if (response) {
        toast({
          title: "Send Verified Code!",
          description: "Your code has been successfully sent.",
        });
      } else {
        throw new Error("Something is wrong, try again");
      }
    } catch (error: any) {
      toast({
        title: "Send Verified Code Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

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
              onClick={resendCode}
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
