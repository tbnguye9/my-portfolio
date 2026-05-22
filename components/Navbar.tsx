"use client";

import { useTheme } from "./ThemeProvider";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Certificates", href: "#certificates" },
  { label: "Courses", href: "#courses" },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backgroundColor:
          theme === "dark" ? "rgba(15,10,30,0.85)" : "rgba(248,247,255,0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${theme === "dark" ? "#2d1f5e" : "#e5e0ff"}`,
      }}
    >
      <div
        style={{
          maxWidth: 1152,
          margin: "0 auto",
          padding: "0 24px",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <a
          href="#"
          style={{
            fontWeight: 700,
            fontSize: 18,
            color: "#7c3aed",
            textDecoration: "none",
          }}
        >
          Thuan
        </a>
        <ul
          style={{
            display: "flex",
            alignItems: "center",
            gap: 32,
            listStyle: "none",
            margin: 0,
            padding: 0,
          }}
        >
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                style={{
                  fontSize: 14,
                  color: theme === "dark" ? "#a78bfa" : "#6b7280",
                  textDecoration: "none",
                  fontWeight: 500,
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            onClick={toggleTheme}
            style={{
              padding: 8,
              borderRadius: 8,
              border: "none",
              backgroundColor: theme === "dark" ? "#2d1f5e" : "#ede9fe",
              cursor: "pointer",
            }}
          >
            {theme === "dark" ? (
              <Sun size={18} color="#fbbf24" />
            ) : (
              <Moon size={18} color="#7c3aed" />
            )}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              display: "none",
              padding: 8,
              borderRadius: 8,
              border: "none",
              backgroundColor: theme === "dark" ? "#2d1f5e" : "#ede9fe",
              cursor: "pointer",
            }}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
    </nav>
  );
}
