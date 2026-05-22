"use client";

export default function FloatingIcons() {
  return (
    <>
      <div
        style={{
          position: "absolute",
          top: "15%",
          right: "3%",
          width: 120,
          height: 120,
          animation: "float1 4s ease-in-out infinite",
          opacity: 0.9,
          pointerEvents: "none",
          fontSize: 100,
        }}
      >
        🚀
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "20%",
          left: "2%",
          width: 140,
          height: 140,
          animation: "float2 5s ease-in-out infinite",
          opacity: 0.85,
          pointerEvents: "none",
          fontSize: 120,
        }}
      >
        💻
      </div>
      <style>{`
        @keyframes float1 {
          0%, 100% { transform: translateY(0px) rotate(-5deg); }
          50% { transform: translateY(-24px) rotate(5deg); }
        }
        @keyframes float2 {
          0%, 100% { transform: translateY(0px) rotate(5deg); }
          50% { transform: translateY(-18px) rotate(-5deg); }
        }
      `}</style>
    </>
  );
}
