"use client";
import {
    LogOut,
    Mail,
    Menu,
    Moon,
    Bell,
    User,
    Sun,
    ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import api from "@/app/services/api";

export default function AdminHeader() {
    const pathname = usePathname();
    const router = useRouter();
    const [adminUser, setAdminUser] = useState<any | null>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

    const avatar = adminUser.content?.user?.avatar;

    return (
        <header className="relative z-10 h-16 w-full items-center bg-white shadow md:h-20">
            <div className="relative mx-auto flex h-full flex-col justify-center px-3">
                <div className="relative flex w-full items-center pl-1 sm:ml-0 sm:pr-2">
                    <div className="relative ml-auto flex items-center">
                        <div className="flex items-center gap-4">
                            <button>
                                <Bell size={20} />
                            </button>
                            <button>
                                <Mail size={20} />
                            </button>
                        </div>

                        <div className="relative ml-5">
                            <div
                                className="flex cursor-pointer items-center gap-2"
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            >
                                <span>Welcome, {displayName}</span>
                                <div className="h-8 w-8 overflow-hidden rounded-full border-2 border-yellow-400">
                                    {avatar ? (
                                        <img
                                            src={avatar}
                                            alt={displayName}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center bg-slate-200">
                                            <User size={20} className="text-slate-500" />
                                        </div>
                                    )}
                                </div>
                                <ChevronDown
                                    size={16}
                                    className={`transition-transform ${isDropdownOpen ? "rotate-180" : ""
                                        }`}
                                />
                            </div>
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 rounded-md bg-white shadow-lg">
                                    <button
                                        onClick={handleAdminLogout}
                                        className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
                                    >
                                        <LogOut size={16} />
                                        <span>Logout</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
