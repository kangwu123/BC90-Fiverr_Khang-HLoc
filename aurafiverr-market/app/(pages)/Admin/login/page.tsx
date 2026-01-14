"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/app/services/api";
import { toast } from "sonner";

export default function AdminLoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await api.post("auth/signin", { email, password });

            if (res.status !== 200) {
                toast.error(res.data?.content || "Đăng nhập thất bại");
                return;
            }

            const raw = res?.data || {};
            // API returns token under content.token based on user's example
            const token = raw?.token || raw?.accessToken || raw?.content?.token || raw?.content?.accessToken || raw?.content?.data?.token || "";

            if (!token) {
                toast.error("Không lấy được token đăng nhập");
                return;
            }

            // Store normalized so other components can reliably find accessToken or token
            const store = {
                ...raw,
                accessToken: token,  // standardize to accessToken
                token: token,        // also keep token field
            };

            localStorage.setItem("USER_ADMIN", JSON.stringify(store));

            // Verify storage
            const verify = localStorage.getItem("USER_ADMIN");
            const verifyParsed = verify ? JSON.parse(verify) : null;
            console.log("✅ USER_ADMIN stored successfully");
            console.log("✅ Token in storage:", verifyParsed?.accessToken ? "✓ Present" : "✗ Missing");
            console.log("✅ User ID:", verifyParsed?.user?.id || "Not found");

            window.dispatchEvent(new Event("adminAuthChanged"));
            toast.success("Đăng nhập admin thành công");
            router.push("/Admin");

        } catch (error) {
            console.error(error);
            toast.error("Lỗi đăng nhập");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">

                {/* Header */}
                <div className="mb-6 text-center">
                    <h2 className="text-2xl font-semibold text-slate-800">
                        Admin Sign In
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                        Đăng nhập để quản lý hệ thống
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-600">
                            Email
                        </label>
                        <input
                            type="email"
                            required
                            placeholder="admin@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm
                     focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-600">
                            Password
                        </label>
                        <input
                            type="password"
                            required
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm
                     focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`mt-2 w-full rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition
          ${loading
                                ? "bg-emerald-300 cursor-not-allowed"
                                : "bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98]"
                            }`}
                    >
                        {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                    </button>
                </form>

                {/* Footer */}
                <div className="mt-6 text-center text-xs text-slate-400">
                    © 2026 Admin Panel
                </div>
            </div>
        </div>

    );
}