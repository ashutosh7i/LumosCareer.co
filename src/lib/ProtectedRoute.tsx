"use client";

import React from "react";
import { useAuth } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!isLoggedIn) {
      console.log("Unauthorized");
      router.push("/login");
    }
  }, [isLoggedIn, router]);

  return <>{children}</>;
};
