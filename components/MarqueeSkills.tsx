"use client";

const techIcons: Record<string, string> = {
  React: "⚛️",
  "Next.js": "▲",
  TypeScript: "📘",
  "Tailwind CSS": "🎨",
  "Node.js": "🟢",
  PostgreSQL: "🐘",
  Prisma: "◆",
  Docker: "🐳",
  Git: "📦",
};

type Skill = { id: number; name: string; category: string };

export default function MarqueeSkills({ skills }: { skills: Skill[] }) {
  const doubled = [...skills, ...skills];

  return (
    <div style={{ overflow: "hidden", width: "100%", padding: "8px 0" }}>
      <div
        style={{
          display: "flex",
          gap: 12,
          width: "max-content",
          animation: "marquee 25s linear infinite",
        }}
      >
        {doubled.map((skill, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 20px",
              background: "linear-gradient(135deg, #7c3aed15, #3b82f615)",
              border: "1px solid #c4b5fd",
              borderRadius: 999,
              fontSize: 14,
              fontWeight: 600,
              color: "#5b21b6",
              whiteSpace: "nowrap",
            }}
          >
            <span style={{ fontSize: 18 }}>
              {techIcons[skill.name] || "⚡"}
            </span>
            {skill.name}
          </div>
        ))}
      </div>
    </div>
  );
}
