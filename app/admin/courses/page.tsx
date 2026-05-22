"use client";

import { useEffect, useState } from "react";

type Course = {
  id: number;
  title: string;
  platform: string;
  instructor: string;
  completed: boolean;
  courseUrl: string;
};

export default function AdminCoursesPage() {
  const [items, setItems] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Partial<Course> | null>(null);
  const [message, setMessage] = useState("");

  const fetchItems = () => {
    fetch("/api/courses")
      .then((r) => r.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSave = async () => {
    const method = editing?.id ? "PUT" : "POST";
    const url = editing?.id ? `/api/courses/${editing.id}` : "/api/courses";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing),
    });
    if (res.ok) {
      setMessage("✅ Saved!");
      setShowForm(false);
      setEditing(null);
      fetchItems();
    }
    setTimeout(() => setMessage(""), 3000);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this course?")) return;
    await fetch(`/api/courses/${id}`, { method: "DELETE" });
    fetchItems();
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
            Courses
          </h1>
          <p style={{ color: "#6b7280", margin: "4px 0 0" }}>
            {items.length} courses total
          </p>
        </div>
        <button
          onClick={() => {
            setEditing({ completed: false });
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
          + Add Course
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
            {editing?.id ? "Edit" : "Add"} Course
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
              { key: "title", label: "Course Title" },
              { key: "platform", label: "Platform" },
              { key: "instructor", label: "Instructor" },
              { key: "courseUrl", label: "Course URL" },
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
          <div
            style={{
              marginBottom: 16,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <input
              type="checkbox"
              checked={editing?.completed || false}
              onChange={(e) =>
                setEditing({ ...editing, completed: e.target.checked })
              }
              id="completed"
            />
            <label
              htmlFor="completed"
              style={{ fontSize: 14, fontWeight: 500, color: "#374151" }}
            >
              Completed
            </label>
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
        {items.map((item) => (
          <div
            key={item.id}
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
                {item.title}
              </h3>
              <p style={{ fontSize: 13, color: "#7c3aed", margin: 0 }}>
                {item.platform} {item.instructor && `· ${item.instructor}`}
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span
                style={{
                  padding: "4px 10px",
                  borderRadius: 999,
                  fontSize: 12,
                  fontWeight: 600,
                  background: item.completed ? "#f0fdf4" : "#f3f4f6",
                  color: item.completed ? "#15803d" : "#6b7280",
                }}
              >
                {item.completed ? "Completed" : "In Progress"}
              </span>
              <button
                onClick={() => {
                  setEditing(item);
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
                onClick={() => handleDelete(item.id)}
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
