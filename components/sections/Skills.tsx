import AnimateOnScroll from "@/components/AnimateOnScroll";
import MarqueeSkills from "@/components/MarqueeSkills";

type Skill = { id: number; name: string; category: string };

export default function Skills({ skills }: { skills: Skill[] }) {
  const categories = [...new Set(skills.map((s) => s.category))];

  return (
    <section
      id="skills"
      style={{ padding: "128px 24px", backgroundColor: "#f8f7ff" }}
    >
      <div style={{ maxWidth: 1152, margin: "0 auto" }}>
        <AnimateOnScroll>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <h2
              style={{
                fontSize: 40,
                fontWeight: 800,
                margin: "0 0 16px",
                background: "linear-gradient(135deg, #7c3aed, #3b82f6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Skills & Expertise
            </h2>
            <div
              style={{
                width: 64,
                height: 4,
                background: "linear-gradient(135deg, #7c3aed, #3b82f6)",
                margin: "0 auto",
                borderRadius: 999,
              }}
            ></div>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.1}>
          <div
            style={{
              background: "white",
              borderRadius: 24,
              padding: 32,
              boxShadow: "0 4px 24px rgba(124,58,237,0.08)",
              border: "1px solid #ede9fe",
              marginBottom: 32,
            }}
          >
            <MarqueeSkills skills={skills} />
          </div>
        </AnimateOnScroll>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
          }}
        >
          {categories.map((category, i) => (
            <AnimateOnScroll key={category} delay={i * 0.1}>
              <div
                style={{
                  background: "white",
                  borderRadius: 20,
                  padding: 24,
                  border: "1px solid #ede9fe",
                  boxShadow: "0 4px 16px rgba(124,58,237,0.06)",
                }}
              >
                <h3
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    marginBottom: 16,
                    color: "#7c3aed",
                  }}
                >
                  {category}
                </h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {skills
                    .filter((s) => s.category === category)
                    .map((skill) => (
                      <span
                        key={skill.id}
                        style={{
                          padding: "6px 14px",
                          background: "#f5f3ff",
                          border: "1px solid #ddd6fe",
                          borderRadius: 8,
                          fontSize: 13,
                          fontWeight: 500,
                          color: "#5b21b6",
                        }}
                      >
                        {skill.name}
                      </span>
                    ))}
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
