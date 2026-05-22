import { prisma } from "@/lib/prisma";
import { Layers, GitBranch, Award, BookOpen, Zap } from "lucide-react";

export default async function AdminDashboard() {
  const [projects, certificates, courses, skills] = await Promise.all([
    prisma.project.count(),
    prisma.certificate.count(),
    prisma.course.count(),
    prisma.skill.count(),
  ]);

  const stats = [
    { label: "Projects", value: projects, icon: "🚀", color: "#7c3aed" },
    {
      label: "Certificates",
      value: certificates,
      icon: "🎓",
      color: "#3b82f6",
    },
    { label: "Courses", value: courses, icon: "📚", color: "#8b5cf6" },
    { label: "Skills", value: skills, icon: "⚡", color: "#6366f1" },
  ];

  return (
    <div>
      <h1
        style={{
          fontSize: 28,
          fontWeight: 800,
          color: "#1e1b4b",
          marginBottom: 8,
        }}
      >
        Dashboard
      </h1>
      <p style={{ color: "#6b7280", marginBottom: 32 }}>
        Welcome back! Here's your portfolio overview.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 20,
          marginBottom: 32,
        }}
      >
        {stats.map((stat) => (
          <div
            key={stat.label}
            style={{
              background: "white",
              borderRadius: 16,
              padding: 24,
              border: "1px solid #ede9fe",
              boxShadow: "0 2px 8px rgba(124,58,237,0.06)",
            }}
          >
            <div style={{ fontSize: 32, marginBottom: 12 }}>{stat.icon}</div>
            <div
              style={{
                fontSize: 36,
                fontWeight: 800,
                color: stat.color,
                marginBottom: 4,
              }}
            >
              {stat.value}
            </div>
            <div style={{ fontSize: 14, color: "#6b7280", fontWeight: 500 }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          background: "white",
          borderRadius: 16,
          padding: 24,
          border: "1px solid #ede9fe",
        }}
      >
        <h2
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: "#1e1b4b",
            marginBottom: 16,
          }}
        >
          Quick Actions
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 12,
          }}
        >
          {[
            { label: "Add Project", href: "/admin/projects", icon: "🚀" },
            {
              label: "Add Certificate",
              href: "/admin/certificates",
              icon: "🎓",
            },
            { label: "Add Course", href: "/admin/courses", icon: "📚" },
            { label: "Manage Skills", href: "/admin/skills", icon: "⚡" },
            { label: "Edit Profile", href: "/admin/profile", icon: "👤" },
            { label: "View Portfolio", href: "/", icon: "🌐" },
          ].map((action) => (
            <a
              key={action.href}
              href={action.href}
              style={{
                padding: "14px 16px",
                background: "#f5f3ff",
                border: "1px solid #ede9fe",
                borderRadius: 12,
                textDecoration: "none",
                color: "#7c3aed",
                fontSize: 14,
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span>{action.icon}</span> {action.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
