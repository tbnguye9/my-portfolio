import { ExternalLink, GitBranch } from "lucide-react";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import HoverCard from "@/components/HoverCard";

type Project = {
  id: number;
  title: string;
  description: string | null;
  githubUrl: string | null;
  liveUrl: string | null;
};

export default function Projects({ projects }: { projects: Project[] }) {
  return (
    <section
      id="projects"
      style={{ padding: "128px 24px", backgroundColor: "white" }}
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
              Projects
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
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
          }}
        >
          {projects.map((project, i) => (
            <AnimateOnScroll key={project.id} delay={i * 0.1}>
              <HoverCard
                style={{
                  background: "white",
                  borderRadius: 20,
                  padding: 24,
                  border: "1px solid #ede9fe",
                  boxShadow: "0 4px 16px rgba(124,58,237,0.06)",
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    background: "linear-gradient(135deg, #7c3aed20, #3b82f620)",
                    borderRadius: 12,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 16,
                  }}
                >
                  <GitBranch size={24} color="#7c3aed" />
                </div>
                <h3
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    marginBottom: 8,
                    color: "#1f2937",
                  }}
                >
                  {project.title}
                </h3>
                {project.description && (
                  <p
                    style={{
                      color: "#6b7280",
                      fontSize: 14,
                      lineHeight: 1.6,
                      marginBottom: 16,
                    }}
                  >
                    {project.description}
                  </p>
                )}
                <div style={{ display: "flex", gap: 12 }}>
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        fontSize: 13,
                        color: "#7c3aed",
                        textDecoration: "none",
                        fontWeight: 500,
                      }}
                    >
                      <GitBranch size={14} /> GitHub
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        fontSize: 13,
                        color: "#7c3aed",
                        textDecoration: "none",
                        fontWeight: 500,
                      }}
                    >
                      <ExternalLink size={14} /> Live
                    </a>
                  )}
                </div>
              </HoverCard>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
