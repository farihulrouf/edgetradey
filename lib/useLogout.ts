"use client";
import { useRouter } from "next/navigation";
import { logout } from "./api";

export const useLogout = () => {
  const router = useRouter();
  return () => {
    logout();         // hapus token
    router.push("/login"); // redirect ke login
  };
};
