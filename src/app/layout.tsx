import type { ReactNode } from "react";

// Minimal root layout — the [locale] layout provides the full document structure.
export default function RootLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
