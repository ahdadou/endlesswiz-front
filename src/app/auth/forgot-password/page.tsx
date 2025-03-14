"use client";

import { useState } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { resetlinkRequest } from "@/clients/AuthService";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("### handle submite");
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    await resetlinkRequest({
      email,
    })
      .then((res) => {
        toast({
          title: "Email sent",
          description: "Check your inbox for password reset instructions",
        });
      })
      .catch((err) => {
        toast({
          title: "Error",
          description: "Something wrong happened, please try again",
          variant: "destructive",
        });
      })
      .finally(() => {
        setIsLoading(false);
        setIsSubmitted(true);
      });
  };

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
            Reset your password
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {!isSubmitted
              ? "Enter your email and we'll send you instructions to reset your password"
              : "Check your email for a link to reset your password"}
          </p>
        </div>

        {!isSubmitted ? (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1"
                />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                  <span>Sending...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span>Send reset instructions</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
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
        ) : (
          <div className="mt-8 space-y-6">
            <div className="rounded-lg bg-secondary/50 p-4 text-center">
              <p className="text-sm">
                We've sent an email to <strong>{email}</strong> with
                instructions to reset your password.
              </p>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => setIsSubmitted(false)}
            >
              <div className="flex items-center gap-2">
                <span>Try another email</span>
              </div>
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
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
