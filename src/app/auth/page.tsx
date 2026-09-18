"use client";

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

type FormInputs = {
  fullName?: string;
  email: string;
  password: string;
};

export default function AuthPage() {
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);
  const [isSignUp, setIsSignUp] = useState(() => {
    if (typeof window === "undefined") return false;
    return searchParams.get("mode") === "signup";
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting: formIsSubmitting },
    reset,
  } = useForm<FormInputs>();

  useEffect(() => {
    setMounted(true);
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    try {
      console.log(isSignUp ? "Signing up:" : "Logging in:", data);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      reset();
    } catch (error) {
      console.error(error);
    }
  });

  if (!mounted) {
    return (
      <div className="flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-emerald-400 rounded-full animate-spin border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-md p-6 bg-black/50 backdrop-blur-sm border border-white/10 rounded-lg shadow-xl">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-300 to-green-300 bg-clip-text text-transparent">
          {isSignUp ? "Create your account" : "Welcome back"}
        </h1>
        <p className="text-white/70">
          {isSignUp
            ? "Start managing your farm efficiently"
            : "Sign in to continue to FarmLife"}
        </p>
        {errors.email && (
          <p className="text-red-400 text-sm">A valid email is required.</p>
        )}
      </div>

      <form onSubmit={onSubmit} className="space-y-6 mt-8">
        {isSignUp && (
          <div className="space-y-2">
            <label className="text-sm text-white/80">Full Name</label>
            <input
              {...register("fullName", { required: isSignUp })}
              className="w-full p-2 rounded-md bg-black/30 border border-white/10 text-white focus:outline-none focus:border-emerald-500/50"
              placeholder="Enter your full name"
            />
            {errors.fullName && (
              <p className="text-red-400 text-sm">Full name is required.</p>
            )}
          </div>
        )}

        <div className="space-y-2">
          <label className="text-sm text-white/80">Email</label>
          <input
            {...register("email", { required: true })}
            type="email"
            className="w-full p-2 rounded-md bg-black/30 border border-white/10 text-white focus:outline-none focus:border-emerald-500/50"
            placeholder="hi@yourcompany.com"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-white/80">Password</label>
          <input
            {...register("password", { required: true })}
            type="password"
            className="w-full p-2 rounded-md bg-black/30 border border-white/10 text-white focus:outline-none focus:border-emerald-500/50"
            placeholder="Enter your password"
          />
        </div>

        <Button
          type="submit"
          disabled={formIsSubmitting}
          className="w-full bg-gradient-to-r from-emerald-400 to-green-400 hover:from-emerald-500 hover:to-green-500 text-white font-medium py-2 rounded-md"
        >
          {formIsSubmitting
            ? "Loading..."
            : isSignUp
            ? "Create Account"
            : "Sign In"}
        </Button>

        <div className="text-center">
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-emerald-400 hover:text-emerald-300 text-sm"
          >
            {isSignUp
              ? "Already have an account? Sign in"
              : "Don't have an account? Sign up"}
          </button>
        </div>
      </form>
    </div>
  );
}
  