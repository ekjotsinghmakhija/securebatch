import React from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="h-full w-full">
      {/* We do NOT use <html> or <body> here.
        Those are already provided by src/app/layout.tsx
      */}
      {children}
    </section>
  );
}
