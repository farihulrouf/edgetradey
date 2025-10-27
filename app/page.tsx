// app/page.tsx
import { redirect } from "next/navigation";

export default function HomePage() {
  redirect("/login"); // langsung ke halaman login
}
