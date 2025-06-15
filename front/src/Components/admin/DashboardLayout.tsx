// // components/LayoutAdmin.tsx







import React from "react";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen bg-[#f9f9ff]">
      <Sidebar children={undefined} />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}

