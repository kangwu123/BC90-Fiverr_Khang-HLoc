"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import api from "@/app/services/api";

const menu = [
    { label: "Dashboard", href: "/Admin" },
    { label: "Quản lý người dùng", href: "/Admin/User" },
    { label: "Quản lý Công việc", href: "/Admin/job" },
    { label: "Quản lý Loại công việc", href: "/Admin/jobtype" },
    { label: "Quản lý dịch vụ", href: "/Admin/jobservice" },
];

export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const [adminUser, setAdminUser] = useState<any | null>(null);

    useEffect(() => {
        const update = () => {
            const stored = localStorage.getItem("USER_ADMIN");
            setAdminUser(stored ? JSON.parse(stored) : null);
        };

        update();

        const onAuthChanged = () => update();
        window.addEventListener("adminAuthChanged", onAuthChanged);
        window.addEventListener("storage", onAuthChanged);

        return () => {
            window.removeEventListener("adminAuthChanged", onAuthChanged);
            window.removeEventListener("storage", onAuthChanged);
        };
    }, [pathname]);

    const handleAdminLogout = async () => {
        try {
            await api.post("auth/signout").catch(() => { });
        } catch { }

        localStorage.removeItem("USER_ADMIN");
        setAdminUser(null);
        toast.success("Đã đăng xuất");
        router.push("/Admin/login");
    };

    if (!adminUser) return null;

    const displayName =
        adminUser.content?.user?.name ??
        adminUser.content?.user?.email ??
        "Admin";

    return (
        <aside className="fixed left-0 top-0    h-screen w-64 flex flex-col bg-gradient-to-b from-slate-900 to-slate-950 text-slate-100 shadow-2xl">

            <div className="px-6 py-5 border-b border-slate-800">
                <div className="text-xl font-bold tracking-wide text-blue-400">
                    Fiverr Admin
                </div>
            </div>

            <div className="px-4 py-4 border-b border-slate-800">
                <div className="rounded-xl bg-slate-800/60 p-3">

                    <div className="flex items-center gap-2 overflow-hidden">
                        <span className="shrink-0 text-xs text-slate-400">
                            Xin chào:
                        </span>

                        <span className="truncate text-sm font-semibold text-slate-100">
                            {displayName}
                        </span>
                    </div>

                    <button
                        onClick={handleAdminLogout}
                        className="mt-3 w-full rounded-lg border border-red-500/30 py-1.5 text-xs font-medium text-red-400 transition
                       hover:bg-red-500/10 hover:text-red-300"
                    >
                        Đăng xuất
                    </button>
                </div>
            </div>

            <nav className="flex-1 space-y-1 px-3 py-4">
                {menu.map((item) => {
                    const active = pathname === item.href;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`group relative flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all
                                ${active
                                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                                }`}
                        >
                            <span
                                className={`absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r
                                    ${active ? "bg-blue-400" : "bg-transparent"}
                                `}
                            />

                            <span
                                className={`h-2 w-2 rounded-full transition
                                    ${active
                                        ? "bg-white"
                                        : "bg-slate-500 group-hover:bg-blue-400"}
                                `}
                            />

                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            <div className="px-4 py-3 text-center text-xs text-slate-500 border-t border-slate-800">
                © 2026 Fiverr Admin
            </div>
        </aside>
    );
}
