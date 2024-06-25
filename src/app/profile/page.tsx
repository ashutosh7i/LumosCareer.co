"use client";

import React from "react";
import { ProtectedRoute } from "@/lib/ProtectedRoute"; // Adjust the import path as needed
import { useAuth } from "@/lib/AuthContext";
import Loading from "@/components/Loading/Loading";

export default function Profile() {
  const { user } = useAuth();

  if (!user) {
    return <Loading />;
  }

  return (
    <ProtectedRoute>
      <div>
        <h1>Dashboard</h1>
        <p>Welcome, {user.name}</p>
        <p>Email: {user.email}</p>
        {/* Add more user details as needed */}
      </div>
    </ProtectedRoute>
  );
}
