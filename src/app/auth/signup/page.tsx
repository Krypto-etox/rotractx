"use client";

import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { authService } from "@/services/auth.service";
import { useState } from "react";
import { useRouter } from "next/navigation";

type SignUpFormInputs = {
  fullName: string;
  email: string;
  password: string;
};

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormInputs>();

  const [error, setError] = useState("");
  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    try {
      setError("");
      await authService.signup(data);
      router.push("/auth/login?message=Registration successful! Please login.");
    } catch (error: any) {
      setError(error.response?.data?.message || "Something went wrong");
    }
  });

  return (
    <div className="w-full max-w-md p-6 bg-black/50 backdrop-blur-sm border border-white/10 rounded-lg shadow-xl">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-300 to-green-300 bg-clip-text text-transparent">
          Create your account
        </h1>
        <p className="text-white/70">Start managing your farm efficiently</p>
      </div>

      <form onSubmit={onSubmit} className="space-y-6 mt-8">
        <div className="space-y-2">
          <label className="text-sm text-white/80">Full Name</label>
          <input
            {...register("fullName", { required: "Full name is required" })}
            className="w-full p-2 rounded-md bg-black/30 border border-white/10 text-white focus:outline-none focus:border-emerald-500/50"
            placeholder="Enter your full name"
          />
          {errors.fullName && (
            <p className="text-red-400 text-sm">{errors.fullName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm text-white/80">Email</label>
          <input
            {...register("email", { required: "Email is required" })}
            type="email"
            className="w-full p-2 rounded-md bg-black/30 border border-white/10 text-white focus:outline-none focus:border-emerald-500/50"
            placeholder="hi@yourcompany.com"
          />
          {errors.email && (
            <p className="text-red-400 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm text-white/80">Password</label>
          <input
            {...register("password", { required: "Password is required" })}
            type="password"
            className="w-full p-2 rounded-md bg-black/30 border border-white/10 text-white focus:outline-none focus:border-emerald-500/50"
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-red-400 text-sm">{errors.password.message}</p>
          )}
        </div>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-emerald-400 to-green-400 hover:from-emerald-500 hover:to-green-500 text-white font-medium py-2 rounded-md"
        >
          {isSubmitting ? "Loading..." : "Create Account"}
        </Button>

        <div className="text-center">
          <Link
            href="/auth/login"
            className="text-emerald-400 hover:text-emerald-300 text-sm"
          >
            Already have an account? Sign in
          </Link>
        </div>
      </form>
    </div>
  );
}
