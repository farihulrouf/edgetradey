'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Logo component
const Logo = () => (
  <div className="text-center mb-8">
    <h1 className="text-4xl font-bold tracking-tight mb-2">CAMIOCA</h1>
    <p className="text-muted-foreground">Intelligent Service</p>
  </div>
);

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@mail.com"); // default demo
  const [password, setPassword] = useState("admin123"); // default demo
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailValid, setEmailValid] = useState(true); // default valid

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate login delay
    setTimeout(() => {
      if (email === "admin@mail.com" && password === "admin123") {
        router.push("/dashboard"); // redirect ke dashboard
      } else {
        alert("Invalid credentials");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gray-50">
      <Logo />
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm bg-white p-8 rounded-lg shadow-lg space-y-6"
      >
        <div className="text-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-700">Welcome back!</h2>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email address
            </Label>
            <div className="relative">
              <Input
                id="email"
                type="email"
                placeholder="example@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pr-10"
                required
              />
              {emailValid && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <div className="bg-green-500 rounded-full p-1">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        <Button type="submit" className="w-full bg-green-600" size="lg" disabled={loading}>
          {loading ? "Logging in..." : "LOG IN"}
        </Button>
      </form>
    </div>
  );
}
