"use client";

import Sidebar from "@/app/components/admin/Sidebar";
import AdminAuth from "@/app/components/admin/AdminAuth";
import { Toaster } from "sonner";
import { usePathname } from "next/navigation";
import AdminHeader from "@/app/components/AdminHeader";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isLoginPage = pathname === "/Admin/login";

    if (isLoginPage) {
        return (
            <div className="min-h-screen bg-slate-100">
                <AdminAuth>{children}</AdminAuth>
                <Toaster richColors position="top-right" />
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-linear-to-br from-slate-100 to-slate-200">
            <Sidebar />
            <div className="ml-64 flex-1">
                <AdminHeader />
                <main className="p-8">
                    <AdminAuth>{children}</AdminAuth>
                </main>
            </div>
            <Toaster richColors position="top-right" />
        </div>
    );
}
