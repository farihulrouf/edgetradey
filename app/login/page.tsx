'use client'
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login, isLoggedIn, refreshToken } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const checkLogin = async () => {
      if (isLoggedIn()) {
        try {
          await refreshToken();
        } catch {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
        }
        router.replace("/dashboard");
      }
    };
    checkLogin();
  }, [router]);

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!email || !password) {
      setErrorMsg("Email dan password wajib diisi.");
      return;
    }

    if (!validateEmail(email)) {
      setErrorMsg("Format email tidak valid.");
      return;
    }

    setLoading(true);
    try {
      const data = await login(email, password);
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
      localStorage.setItem("user_name", data.user_name || email);
      router.replace("/dashboard");
    } catch (err: any) {
      setErrorMsg(err.message || "Login gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gray-50">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-2">CAMIOCA</h1>
        <p className="text-muted-foreground">Intelligent Service</p>
      </div>

      <form onSubmit={handleLogin} className="w-full max-w-sm bg-white p-8 rounded-lg shadow-lg space-y-6">
        <h2 className="text-2xl font-semibold text-gray-700 text-center">Welcome back!</h2>
        {errorMsg && <div className="text-red-500 text-sm text-center">{errorMsg}</div>}

        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">Email address</Label>
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
            {email && validateEmail(email) && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <div className="bg-green-500 rounded-full p-1">
                  <Check className="h-4 w-4 text-white" />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium">Password</Label>
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

        <Button type="submit" className="w-full bg-green-600" size="lg" disabled={loading}>
          {loading ? "Logging in..." : "LOG IN"}
        </Button>
      </form>
    </div>
  );
}
