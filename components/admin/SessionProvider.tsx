"use client";

import { SessionProvider as NextSessionProvider } from "next-auth/react";
import { ReactNode } from "react";

export default function SessionProvider({
  children,
  session,
}: {
  children: ReactNode;
  session: any;
}) {
  return (
    <NextSessionProvider session={session}>{children}</NextSessionProvider>
  );
}
