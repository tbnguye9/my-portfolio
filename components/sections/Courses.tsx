import { BookOpen, CheckCircle, Clock } from "lucide-react";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import HoverCard from "@/components/HoverCard";

type Course = {
  id: number;
  title: string;
  platform: string;
  instructor: string | null;
  completed: boolean;
  courseUrl: string | null;
};

export default function Courses({ courses }: { courses: Course[] }) {
  return (
    <section
      id="courses"
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
              Courses
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
          {courses.map((course, i) => (
            <AnimateOnScroll key={course.id} delay={i * 0.1}>
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
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    marginBottom: 16,
                  }}
                >
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      background:
                        "linear-gradient(135deg, #7c3aed20, #3b82f620)",
                      borderRadius: 12,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <BookOpen size={24} color="#7c3aed" />
                  </div>
                  {course.completed ? (
                    <CheckCircle size={20} color="#7c3aed" />
                  ) : (
                    <Clock size={20} color="#9ca3af" />
                  )}
                </div>
                <h3
                  style={{ fontWeight: 700, marginBottom: 4, color: "#1f2937" }}
                >
                  {course.title}
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    color: "#7c3aed",
                    marginBottom: 4,
                    fontWeight: 500,
                  }}
                >
                  {course.platform}
                </p>
                {course.instructor && (
                  <p style={{ fontSize: 12, color: "#9ca3af" }}>
                    {course.instructor}
                  </p>
                )}
                <span
                  style={{
                    display: "inline-block",
                    marginTop: 12,
                    padding: "4px 12px",
                    borderRadius: 999,
                    fontSize: 12,
                    fontWeight: 600,
                    background: course.completed ? "#f5f3ff" : "#f3f4f6",
                    color: course.completed ? "#7c3aed" : "#6b7280",
                  }}
                >
                  {course.completed ? "Completed" : "In Progress"}
                </span>
              </HoverCard>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
