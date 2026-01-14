import Sidebar from "@/app/components/admin/Sidebar";
import AdminAuth from "@/app/components/admin/AdminAuth";
import { Toaster } from "sonner";


export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-gradient-to-br from-slate-100 to-slate-200">
            <Sidebar />
            <main className="flex-1 p-8">
                <AdminAuth>{children}</AdminAuth>
            </main>
            <Toaster richColors position="top-right" />

        </div>
    );
}
