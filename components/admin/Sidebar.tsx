"use client";

import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const menuItems = [
  { label: "📊 Dashboard", href: "/admin" },
  { label: "👤 Profile", href: "/admin/profile" },
  { label: "🚀 Projects", href: "/admin/projects" },
  { label: "🎓 Certificates", href: "/admin/certificates" },
  { label: "📚 Courses", href: "/admin/courses" },
  { label: "⚡ Skills", href: "/admin/skills" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      style={{
        width: 260,
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        backgroundColor: "#1e1b4b",
        padding: "24px 16px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ marginBottom: 32, padding: "0 8px" }}>
        <h2
          style={{ color: "#a78bfa", fontSize: 20, fontWeight: 800, margin: 0 }}
        >
          Admin Panel
        </h2>
        <p style={{ color: "#7c7ca8", fontSize: 12, margin: "4px 0 0" }}>
          Portfolio Manager
        </p>
      </div>

      <nav
        style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}
      >
        {menuItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            style={{
              padding: "10px 16px",
              borderRadius: 10,
              fontSize: 14,
              fontWeight: 500,
              textDecoration: "none",
              color: mounted && pathname === item.href ? "white" : "#a78bfa",
              backgroundColor:
                mounted && pathname === item.href ? "#7c3aed" : "transparent",
              transition: "all 0.2s",
            }}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <div style={{ borderTop: "1px solid #2d2b5e", paddingTop: 16 }}>
        <a
          href="/"
          style={{
            display: "block",
            padding: "10px 16px",
            color: "#a78bfa",
            fontSize: 14,
            textDecoration: "none",
            marginBottom: 8,
          }}
        >
          🌐 View Portfolio
        </a>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          style={{
            width: "100%",
            padding: "10px 16px",
            background: "transparent",
            border: "1px solid #4c1d95",
            borderRadius: 10,
            color: "#f87171",
            fontSize: 14,
            cursor: "pointer",
            textAlign: "left",
          }}
        >
          🚪 Sign Out
        </button>
      </div>
    </div>
  );
}
