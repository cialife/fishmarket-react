import { redirect } from "next/navigation";

export default function Home() {
  // Otomatis mengarahkan ke halaman login saat http://localhost:3000 dibuka
  redirect("/admin/login"); // Sesuaikan dengan jalur folder login Anda
}
