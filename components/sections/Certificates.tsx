import { Award, ExternalLink } from "lucide-react";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import HoverCard from "@/components/HoverCard";

type Certificate = {
  id: number;
  name: string;
  issuer: string;
  date: Date;
  credentialUrl: string | null;
};

export default function Certificates({
  certificates,
}: {
  certificates: Certificate[];
}) {
  return (
    <section
      id="certificates"
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
              Certificates
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
          {certificates.map((cert, i) => (
            <AnimateOnScroll key={cert.id} delay={i * 0.1}>
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
                  <Award size={24} color="#7c3aed" />
                </div>
                <h3
                  style={{ fontWeight: 700, marginBottom: 4, color: "#1f2937" }}
                >
                  {cert.name}
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    color: "#7c3aed",
                    marginBottom: 4,
                    fontWeight: 500,
                  }}
                >
                  {cert.issuer}
                </p>
                <p style={{ fontSize: 12, color: "#9ca3af", marginBottom: 12 }}>
                  {new Date(cert.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                  })}
                </p>
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
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
                    <ExternalLink size={14} /> View Credential
                  </a>
                )}
              </HoverCard>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
