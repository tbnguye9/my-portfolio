import { GitBranch, Link, Mail, Phone, Download } from "lucide-react";
import FloatingIcons from "@/components/FloatingIcons";

type Profile = {
  name: string;
  title: string;
  bio: string;
  email: string;
  phone: string | null;
  github: string | null;
  linkedin: string | null;
  avatarUrl: string | null;
  cvUrl: string | null;
};

export default function Hero({ profile }: { profile: Profile | null }) {
  if (!profile) return null;

  return (
    <section
      id="about"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <FloatingIcons />
      <div
        style={{
          maxWidth: 1152,
          margin: "0 auto",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 64,
          alignItems: "center",
          padding: "160px 0",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <p style={{ color: "#7c3aed", fontWeight: 600, fontSize: 18 }}>
              Hi, I am
            </p>
            <h1
              style={{
                fontSize: 52,
                fontWeight: 800,
                lineHeight: 1.1,
                margin: 0,
                background: "linear-gradient(135deg, #7c3aed, #3b82f6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {profile.name}
            </h1>
            <h2
              style={{
                fontSize: 22,
                color: "#8b5cf6",
                fontWeight: 400,
                margin: 0,
              }}
            >
              {profile.title}
            </h2>
          </div>
          <p
            style={{
              color: "#6b7280",
              fontSize: 17,
              lineHeight: 1.8,
              maxWidth: 440,
              margin: 0,
            }}
          >
            {profile.bio}
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <a
              href="#projects"
              style={{
                padding: "14px 32px",
                background: "linear-gradient(135deg, #7c3aed, #3b82f6)",
                color: "white",
                borderRadius: 12,
                fontWeight: 600,
                textDecoration: "none",
                fontSize: 15,
              }}
            >
              View Projects
            </a>
            {profile.cvUrl && (
              <a
                href={profile.cvUrl}
                style={{
                  padding: "14px 32px",
                  border: "2px solid #7c3aed",
                  color: "#7c3aed",
                  borderRadius: 12,
                  fontWeight: 600,
                  textDecoration: "none",
                  fontSize: 15,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <Download size={16} /> Download CV
              </a>
            )}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {profile.github && (
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: 40,
                  height: 40,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 10,
                  backgroundColor: "#ede9fe",
                  color: "#7c3aed",
                  textDecoration: "none",
                }}
              >
                <GitBranch size={18} />
              </a>
            )}
            {profile.linkedin && (
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: 40,
                  height: 40,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 10,
                  backgroundColor: "#ede9fe",
                  color: "#7c3aed",
                  textDecoration: "none",
                }}
              >
                <Link size={18} />
              </a>
            )}
            {profile.email && (
              <a
                href={`mailto:${profile.email}`}
                style={{
                  width: 40,
                  height: 40,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 10,
                  backgroundColor: "#ede9fe",
                  color: "#7c3aed",
                  textDecoration: "none",
                }}
              >
                <Mail size={18} />
              </a>
            )}
            {profile.phone && (
              <a
                href={`tel:${profile.phone}`}
                style={{
                  width: 40,
                  height: 40,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 10,
                  backgroundColor: "#ede9fe",
                  color: "#7c3aed",
                  textDecoration: "none",
                }}
              >
                <Phone size={18} />
              </a>
            )}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <div style={{ position: "relative" }}>
            {profile.avatarUrl ? (
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                style={{
                  width: 320,
                  height: 320,
                  borderRadius: "50%",
                  objectFit: "cover",
                  boxShadow: "0 25px 60px rgba(124,58,237,0.3)",
                  border: "4px solid rgba(124,58,237,0.2)",
                }}
              />
            ) : (
              <div
                style={{
                  width: 320,
                  height: 320,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #7c3aed, #3b82f6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 25px 60px rgba(124,58,237,0.3)",
                }}
              >
                <span style={{ color: "white", fontSize: 80, fontWeight: 800 }}>
                  {profile.name.split(" ").pop()?.charAt(0)}
                </span>
              </div>
            )}
            <div
              style={{
                position: "absolute",
                inset: -8,
                borderRadius: "50%",
                border: "2px solid rgba(124,58,237,0.2)",
                pointerEvents: "none",
              }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
}
