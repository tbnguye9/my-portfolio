"use client";

import { useEffect, useState } from "react";

type Project = {
  id: number;
  title: string;
  description: string;
  githubUrl: string;
  liveUrl: string;
  order: number;
};

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Partial<Project> | null>(null);
  const [message, setMessage] = useState("");

  const fetchProjects = () => {
    fetch("/api/projects")
      .then((r) => r.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSave = async () => {
    const method = editing?.id ? "PUT" : "POST";
    const url = editing?.id ? `/api/projects/${editing.id}` : "/api/projects";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing),
    });
    if (res.ok) {
      setMessage("✅ Saved!");
      setShowForm(false);
      setEditing(null);
      fetchProjects();
    }
    setTimeout(() => setMessage(""), 3000);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this project?")) return;
    await fetch(`/api/projects/${id}`, { method: "DELETE" });
    fetchProjects();
  };

  if (loading) return <div style={{ color: "#7c3aed" }}>Loading...</div>;

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 32,
        }}
      >
        <div>
          <h1
            style={{
              fontSize: 28,
              fontWeight: 800,
              color: "#1e1b4b",
              margin: 0,
            }}
          >
            Projects
          </h1>
          <p style={{ color: "#6b7280", margin: "4px 0 0" }}>
            {projects.length} projects total
          </p>
        </div>
        <button
          onClick={() => {
            setEditing({});
            setShowForm(true);
          }}
          style={{
            padding: "10px 24px",
            background: "linear-gradient(135deg, #7c3aed, #3b82f6)",
            color: "white",
            border: "none",
            borderRadius: 10,
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          + Add Project
        </button>
      </div>

      {message && (
        <div
          style={{
            padding: "12px 16px",
            background: "#f0fdf4",
            border: "1px solid #bbf7d0",
            borderRadius: 8,
            marginBottom: 16,
            color: "#15803d",
          }}
        >
          {message}
        </div>
      )}

      {showForm && (
        <div
          style={{
            background: "white",
            borderRadius: 16,
            padding: 24,
            border: "1px solid #ede9fe",
            marginBottom: 24,
          }}
        >
          <h2
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: "#1e1b4b",
              marginBottom: 20,
            }}
          >
            {editing?.id ? "Edit Project" : "Add Project"}
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
              marginBottom: 16,
            }}
          >
            {[
              { key: "title", label: "Title" },
              { key: "githubUrl", label: "GitHub URL" },
              { key: "liveUrl", label: "Live URL" },
              { key: "order", label: "Order" },
            ].map((f) => (
              <div key={f.key}>
                <label
                  style={{
                    display: "block",
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#374151",
                    marginBottom: 6,
                  }}
                >
                  {f.label}
                </label>
                <input
                  value={(editing as any)?.[f.key] || ""}
                  onChange={(e) =>
                    setEditing({ ...editing, [f.key]: e.target.value })
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
          <div style={{ marginBottom: 16 }}>
            <label
              style={{
                display: "block",
                fontSize: 13,
                fontWeight: 600,
                color: "#374151",
                marginBottom: 6,
              }}
            >
              Description
            </label>
            <textarea
              value={editing?.description || ""}
              onChange={(e) =>
                setEditing({ ...editing, description: e.target.value })
              }
              rows={3}
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
          <div style={{ display: "flex", gap: 12 }}>
            <button
              onClick={handleSave}
              style={{
                padding: "10px 24px",
                background: "linear-gradient(135deg, #7c3aed, #3b82f6)",
                color: "white",
                border: "none",
                borderRadius: 8,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Save
            </button>
            <button
              onClick={() => {
                setShowForm(false);
                setEditing(null);
              }}
              style={{
                padding: "10px 24px",
                background: "#f3f4f6",
                color: "#374151",
                border: "none",
                borderRadius: 8,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {projects.map((project) => (
          <div
            key={project.id}
            style={{
              background: "white",
              borderRadius: 12,
              padding: "16px 20px",
              border: "1px solid #ede9fe",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <h3
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: "#1e1b4b",
                  margin: "0 0 4px",
                }}
              >
                {project.title}
              </h3>
              <p style={{ fontSize: 13, color: "#6b7280", margin: 0 }}>
                {project.description}
              </p>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={() => {
                  setEditing(project);
                  setShowForm(true);
                }}
                style={{
                  padding: "8px 16px",
                  background: "#ede9fe",
                  color: "#7c3aed",
                  border: "none",
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(project.id)}
                style={{
                  padding: "8px 16px",
                  background: "#fee2e2",
                  color: "#ef4444",
                  border: "none",
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
