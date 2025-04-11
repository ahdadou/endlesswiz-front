"use client";

import { useState } from "react";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import GmailIcon from "@/Icons/GmailIcon";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { signInRequest } from "@/clients/AuthService";
import { signIn } from "next-auth/react";
import { GoogleTagManager, sendGAEvent } from "@next/third-parties/google";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // sendGAEvent('event', 'button_clicked', {page:'Login_page',type:'EMAIL/PASSWORD'});
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "demo_event",
      category: "Button",
      label: "Login page",
      type: "EMAIL/PASSWORD",
    });
    await signInRequest(email, password)
      .then((data) => {
        toast({
          title: "Success",
          description: "You have been logged in successfully",
        });
        router.push(DEFAULT_LOGIN_REDIRECT);
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: error?.message,
          variant: "destructive",
        });
      })
      .finally(() => setIsLoading(false));
  };

  const handleLoginWithProvider = (
    provider: "google" | "github" | "tiktok" | "facebook" | "instagram"
  ) => {
    // sendGAEvent('event', 'button_clicked', {page:'Login_page',type:'GMAIL'});
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "demo_event",
      category: "Button",
      label: "Login page",
      type: "GMAIL",
    });

    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
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
            Welcome back test
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in to continue your English learning journey
          </p>
        </div>

        <div className="mt-8 space-y-6">
          {/* Add Google Button */}
          <Button
            variant="outline"
            className="w-full gap-2"
            onClick={() => handleLoginWithProvider("google")}
            disabled={isLoading}
          >
            <GmailIcon />
            <span>Continue with Google</span>
          </Button>
        </div>

        {/* Add divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

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

            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/auth/forgot-password"
                  className="text-xs text-primary hover:underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <div className="relative mt-1">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pr-10"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                <span>Signing in...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span>Sign in</span>
                <ArrowRight className="h-4 w-4" />
              </div>
            )}
          </Button>

          <div className="flex items-center justify-center">
            <div className="text-center text-sm">
              Don't have an account?{" "}
              <Link
                href="/auth/signup"
                className="font-medium text-primary hover:underline"
              >
                Sign up
              </Link>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default LoginPage;
