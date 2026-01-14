"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function AdminAuth({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // skip check on login page
        if (pathname === "/Admin/login") {
            setLoading(false);
            return;
        }

        const stored = localStorage.getItem("USER_ADMIN");
        if (!stored) {
            router.push("/Admin/login");
            return;
        }

        // (optional) could verify token server-side here
        setLoading(false);
    }, [pathname]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div>Loading...</div>
            </div>
        );
    }

    return <>{children}</>;
}
