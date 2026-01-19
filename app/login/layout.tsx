// app/login/layout.tsx
export default function LoginLayout({ children }: { children: React.ReactNode }) {
  // ✅ Only wrap children, do NOT use <html>/<body>
  return <>{children}</>;
}
