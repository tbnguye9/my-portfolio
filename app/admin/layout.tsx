import AdminSidebar from "@/components/admin/Sidebar";
import SessionProvider from "@/components/admin/SessionProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <SessionProvider session={session}>
      <div
        style={{
          display: "flex",
          minHeight: "100vh",
          backgroundColor: "#f8f7ff",
        }}
      >
        <AdminSidebar />
        <main style={{ flex: 1, padding: 32, marginLeft: 260 }}>
          {children}
        </main>
      </div>
    </SessionProvider>
  );
}
