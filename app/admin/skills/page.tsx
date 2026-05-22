"use client";

import { useEffect, useState } from "react";

type Skill = {
  id: number;
  name: string;
  category: string;
  order: number;
};

export default function AdminSkillsPage() {
  const [items, setItems] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Partial<Skill> | null>(null);
  const [message, setMessage] = useState("");

  const fetchItems = () => {
    fetch("/api/skills")
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
    const url = editing?.id ? `/api/skills/${editing.id}` : "/api/skills";
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
    if (!confirm("Delete this skill?")) return;
    await fetch(`/api/skills/${id}`, { method: "DELETE" });
    fetchItems();
  };

  const categories = [...new Set(items.map((s) => s.category))];

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
            Skills
          </h1>
          <p style={{ color: "#6b7280", margin: "4px 0 0" }}>
            {items.length} skills total
          </p>
        </div>
        <button
          onClick={() => {
            setEditing({ order: items.length + 1 });
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
          + Add Skill
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
            {editing?.id ? "Edit" : "Add"} Skill
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 16,
              marginBottom: 16,
            }}
          >
            {[
              { key: "name", label: "Skill Name" },
              { key: "category", label: "Category" },
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

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {categories.map((cat) => (
          <div key={cat}>
            <h2
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: "#7c3aed",
                marginBottom: 12,
              }}
            >
              {cat}
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {items
                .filter((s) => s.category === cat)
                .map((item) => (
                  <div
                    key={item.id}
                    style={{
                      background: "white",
                      borderRadius: 10,
                      padding: "12px 16px",
                      border: "1px solid #ede9fe",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: "#1e1b4b",
                      }}
                    >
                      {item.name}
                    </span>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button
                        onClick={() => {
                          setEditing(item);
                          setShowForm(true);
                        }}
                        style={{
                          padding: "6px 14px",
                          background: "#ede9fe",
                          color: "#7c3aed",
                          border: "none",
                          borderRadius: 6,
                          fontSize: 12,
                          fontWeight: 600,
                          cursor: "pointer",
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        style={{
                          padding: "6px 14px",
                          background: "#fee2e2",
                          color: "#ef4444",
                          border: "none",
                          borderRadius: 6,
                          fontSize: 12,
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
        ))}
      </div>
    </div>
  );
}
