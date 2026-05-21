// Root layout — html + body live in app/[locale]/layout.tsx so they can set
// lang from the actual locale. This pass-through exists because Next.js
// requires an app/layout.tsx file.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
