"use client";

import { useRouter } from "next/navigation";

type Props = {
    page: number;
    keyword: string;
    totalPages: number;
};

export default function Pagination({ page, keyword, totalPages }: Props) {
    const router = useRouter();

    if (totalPages <= 1) return null;

    const goToPage = (p: number) => {
        const params = new URLSearchParams();
        if (keyword) params.set("keyword", keyword);
        params.set("page", String(p));

        router.push(`/Admin/User?${params.toString()}`);
    };

    return (
        <div className="flex items-center justify-end gap-2">
            {/* Prev */}
            <button
                disabled={page <= 1}
                onClick={() => goToPage(page - 1)}
                className="rounded-lg border px-3 py-1 text-sm
                disabled:cursor-not-allowed disabled:opacity-50"
            >
                Trước
            </button>

            {/* Page numbers */}
            {Array.from({ length: totalPages }).map((_, i) => {
                const p = i + 1;
                const active = p === page;

                return (
                    <button
                        key={p}
                        onClick={() => goToPage(p)}
                        className={`
                            h-8 w-8 rounded-lg text-sm font-medium
                            ${active
                                ? "bg-blue-600 text-white"
                                : "border hover:bg-gray-100"}
                        `}
                    >
                        {p}
                    </button>
                );
            })}

            {/* Next */}
            <button
                disabled={page >= totalPages}
                onClick={() => goToPage(page + 1)}
                className="rounded-lg border px-3 py-1 text-sm
                disabled:cursor-not-allowed disabled:opacity-50"
            >
                Tiếp theo
            </button>
        </div>
    );
}
