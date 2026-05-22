interface FooterProps {
  name?: string | null;
  title?: string | null;
}

export default function Footer({ name, title }: FooterProps) {
  return (
    <footer
      style={{
        padding: "48px 24px",
        backgroundColor: "#1e1b4b",
        color: "white",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: 1152, margin: "0 auto" }}>
        <p
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: "#a78bfa",
            marginBottom: 8,
          }}
        >
          {name || "Thuan Ba Nguyen"}
        </p>
        <p style={{ fontSize: 14, color: "#7c7ca8", marginBottom: 24 }}>
          {title || "Software Engineer"}
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 32,
            marginBottom: 24,
          }}
        >
          {[
            { label: "About", href: "#about" },
            { label: "Skills", href: "#skills" },
            { label: "Projects", href: "#projects" },
            { label: "Certificates", href: "#certificates" },
            { label: "Courses", href: "#courses" },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{ fontSize: 14, color: "#a78bfa", textDecoration: "none" }}
            >
              {link.label}
            </a>
          ))}
        </div>
        <div
          style={{
            width: "100%",
            height: 1,
            backgroundColor: "#2d2b5e",
            marginBottom: 24,
          }}
        ></div>
        <p style={{ fontSize: 13, color: "#7c7ca8" }}>
          © {new Date().getFullYear()} {name || "Thuan Ba Nguyen"}. Built with
          Next.js & PostgreSQL.
        </p>
      </div>
    </footer>
  );
}
