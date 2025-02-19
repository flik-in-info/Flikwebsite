/* eslint-disable */
"use client";
import { useState, useEffect } from "react";
import { account } from "@/lib/appwrite";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  // ✅ Check if the user is already logged in
  useEffect(() => {
    async function checkSession() {
      try {
        await account.get();
        router.push("/Admin/Dashboard"); // Redirect if already logged in
      } catch {
        // No session, allow login
      }
    }
    checkSession();
  }, [router]);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    setLoading(true);
    setError(""); // Clear previous errors

    try {
      await account.createSession(email, password);
      router.push("/Admin/Dashboard"); // Redirect after login
    } catch (error: any) {
      console.error("Login failed:", error);
      setError(error.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="p-6 bg-white shadow-lg rounded-lg w-96">
        <h2 className="text-2xl font-semibold mb-4 text-center">Admin Login</h2>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
}
