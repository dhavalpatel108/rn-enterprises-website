"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "", email: "", password: "", address: "", phone: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (isLogin) {
      const res = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (res?.error) setError("Invalid email or password");
      else router.push("/");
    } else {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsLogin(true);
        setError("Registration successful! Please login.");
      } else {
        const data = await res.json();
        setError(data.message || "Registration failed");
      }
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-8 bg-surface-container-low">
      <div className="bg-white p-8 rounded-xl shadow-xl border border-outline-variant/20 w-full max-w-md">
        <h2 className="text-3xl font-headline text-primary mb-6 text-center">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h2>

        {error && <div className="bg-error-container text-error p-3 rounded mb-4 text-sm font-bold">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <div>
                <label className="block text-sm font-bold text-primary mb-1">Full Name</label>
                <input required type="text" className="w-full border rounded p-2" onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-bold text-primary mb-1">Address</label>
                <input required type="text" className="w-full border rounded p-2" onChange={e => setFormData({...formData, address: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-bold text-primary mb-1">Phone</label>
                <input required type="text" className="w-full border rounded p-2" onChange={e => setFormData({...formData, phone: e.target.value})} />
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-bold text-primary mb-1">Email</label>
            <input required type="email" className="w-full border rounded p-2" onChange={e => setFormData({...formData, email: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-bold text-primary mb-1">Password</label>
            <input required type="password" className="w-full border rounded p-2" onChange={e => setFormData({...formData, password: e.target.value})} />
          </div>

          <button type="submit" className="w-full bg-primary text-on-primary py-3 rounded font-bold hover:opacity-90 transition mt-6">
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <div className="text-center mt-6">
          <button onClick={() => { setIsLogin(!isLogin); setError(""); }} className="text-sm text-secondary hover:text-primary font-bold underline">
            {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
          </button>
        </div>
      </div>
    </div>
  );
}
