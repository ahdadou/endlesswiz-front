"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { resetPasswordRequest } from "@/clients/AuthService";

const ResetPassword = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();
  const { toast } = useToast();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!token) {
      toast({
        title: "Error",
        description: "Invalid or missing token",
        variant: "destructive",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      await resetPasswordRequest({ token, password, confirmPassword });

      toast({
        title: "Password Reset",
        description: "Your password has been reset successfully",
      });
      router.push("/auth/login");
    } catch (err: any) {
      toast({
        title: "Error",
        description:
          err.message || "Failed to reset password. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md space-y-8 rounded-xl bg-card p-8 shadow-lg text-center"
        >
          <h2 className="text-2xl font-bold">Invalid Token</h2>
          <p className="text-muted-foreground">
            The reset link is invalid or has expired. Please request a new
            password reset link.
          </p>
          <Button asChild variant="link">
            <Link href="/auth/forgot-password" className="gap-1">
              <ArrowLeft className="h-4 w-4" />
              Go to Forgot Password
            </Link>
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md space-y-8 rounded-xl bg-card p-8 shadow-lg"
      >
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight">
            Reset Your Password
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Enter your new password below
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="password">New Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="mt-1"
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                <span>Resetting...</span>
              </div>
            ) : (
              "Reset Password"
            )}
          </Button>

          <div className="flex items-center justify-center">
            <Link
              href="/auth/login"
              className="flex items-center gap-1 text-sm text-primary hover:underline"
            >
              <ArrowLeft className="h-3 w-3" />
              <span>Back to login</span>
            </Link>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ResetPassword;
