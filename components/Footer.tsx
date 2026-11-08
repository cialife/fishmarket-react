import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <p>
        &copy; 2026
        <Link href="/admin/login" className="secret-admin-link">
          {" Muara Baru. "}
        </Link>
        All rights reserved | +62 813-8272-0890 |{" "}
        <a
          href="https://www.instagram.com/pasarikanmodern_muarabaru/?hl=en"
          target="_blank"
          rel="noopener noreferrer"
        >
          @pasarikanmodern_muarabaru
        </a>
      </p>
    </footer>
  );
}
