"use client";

import { useEffect, useState } from "react";

type Certificate = {
  id: number;
  name: string;
  issuer: string;
  date: string;
  credentialUrl: string;
};

export default function AdminCertificatesPage() {
  const [items, setItems] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Partial<Certificate> | null>(null);
  const [message, setMessage] = useState("");

  const fetchItems = () => {
    fetch("/api/certificates")
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
    const url = editing?.id
      ? `/api/certificates/${editing.id}`
      : "/api/certificates";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...editing,
        date: new Date(editing?.date || "").toISOString(),
      }),
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
    if (!confirm("Delete this certificate?")) return;
    await fetch(`/api/certificates/${id}`, { method: "DELETE" });
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
            Certificates
          </h1>
          <p style={{ color: "#6b7280", margin: "4px 0 0" }}>
            {items.length} certificates total
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
          + Add Certificate
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
            {editing?.id ? "Edit" : "Add"} Certificate
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
              { key: "name", label: "Certificate Name" },
              { key: "issuer", label: "Issuer" },
              { key: "date", label: "Date", type: "date" },
              { key: "credentialUrl", label: "Credential URL" },
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
                  type={f.type || "text"}
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
                {item.name}
              </h3>
              <p style={{ fontSize: 13, color: "#7c3aed", margin: 0 }}>
                {item.issuer} ·{" "}
                {new Date(item.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                })}
              </p>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={() => {
                  setEditing({ ...item, date: item.date.split("T")[0] });
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
