"use client";

import { useEffect, useState } from "react";

type Profile = {
  id: number;
  name: string;
  title: string;
  bio: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  avatarUrl: string;
  cvUrl: string;
};

export default function AdminProfilePage() {
  const [profile, setProfile] = useState<Partial<Profile>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/profile")
      .then((r) => r.json())
      .then((data) => {
        setProfile(data || {});
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    const res = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    });
    if (res.ok) setMessage("✅ Saved successfully!");
    else setMessage("❌ Failed to save");
    setSaving(false);
    setTimeout(() => setMessage(""), 3000);
  };

  if (loading) return <div style={{ color: "#7c3aed" }}>Loading...</div>;

  const fields = [
    { key: "name", label: "Full Name", type: "text" },
    { key: "title", label: "Job Title", type: "text" },
    { key: "email", label: "Email", type: "email" },
    { key: "phone", label: "Phone", type: "text" },
    { key: "github", label: "GitHub URL", type: "text" },
    { key: "linkedin", label: "LinkedIn URL", type: "text" },
    { key: "avatarUrl", label: "Avatar URL", type: "text" },
    { key: "cvUrl", label: "CV URL", type: "text" },
  ];

  return (
    <div style={{ maxWidth: 720 }}>
      <h1
        style={{
          fontSize: 28,
          fontWeight: 800,
          color: "#1e1b4b",
          marginBottom: 8,
        }}
      >
        Profile
      </h1>
      <p style={{ color: "#6b7280", marginBottom: 32 }}>
        Update your personal information.
      </p>

      <div
        style={{
          background: "white",
          borderRadius: 16,
          padding: 32,
          border: "1px solid #ede9fe",
          marginBottom: 24,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 20,
            marginBottom: 20,
          }}
        >
          {fields.map((field) => (
            <div key={field.key}>
              <label
                style={{
                  display: "block",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#374151",
                  marginBottom: 6,
                }}
              >
                {field.label}
              </label>
              <input
                type={field.type}
                value={(profile as any)[field.key] || ""}
                onChange={(e) =>
                  setProfile({ ...profile, [field.key]: e.target.value })
                }
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  border: "1px solid #ddd6fe",
                  borderRadius: 8,
                  fontSize: 14,
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>
          ))}
        </div>

        <div>
          <label
            style={{
              display: "block",
              fontSize: 13,
              fontWeight: 600,
              color: "#374151",
              marginBottom: 6,
            }}
          >
            Bio
          </label>
          <textarea
            value={profile.bio || ""}
            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
            rows={4}
            style={{
              width: "100%",
              padding: "10px 14px",
              border: "1px solid #ddd6fe",
              borderRadius: 8,
              fontSize: 14,
              outline: "none",
              resize: "vertical",
              boxSizing: "border-box",
            }}
          />
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <button
          onClick={handleSave}
          disabled={saving}
          style={{
            padding: "12px 32px",
            background: "linear-gradient(135deg, #7c3aed, #3b82f6)",
            color: "white",
            border: "none",
            borderRadius: 10,
            fontSize: 15,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
        {message && (
          <span
            style={{
              fontSize: 14,
              color: message.includes("✅") ? "#10b981" : "#ef4444",
            }}
          >
            {message}
          </span>
        )}
      </div>
    </div>
  );
}
