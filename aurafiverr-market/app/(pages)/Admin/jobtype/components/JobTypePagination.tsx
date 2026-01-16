"use client";

import { useRouter, useSearchParams } from "next/navigation";

type Props = {
    page: number;
    keyword: string;
    totalPages: number;
};

export default function JobTypePagination({ page, keyword, totalPages }: Props) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handlePageChange = (newPage: number) => {
        if (newPage < 1 || newPage > totalPages) return;
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", newPage.toString());
        router.push(`?${params.toString()}`);
    };

    if (totalPages <= 1) return null;

    return (
        <div className="mt-6 flex items-center justify-between border-t pt-4">
            <span className="text-sm text-gray-500">
                Hiển thị trang {page} / {totalPages}
            </span>

            <div className="flex items-center gap-2">
                <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page <= 1}
                    className="rounded-lg border px-3 py-1 text-sm font-medium transition hover:bg-gray-50 disabled:opacity-50"
                >
                    Trước
                </button>

                {(() => {
                    let startPage = Math.max(1, page - 2);
                    let endPage = Math.min(totalPages, startPage + 4);

                    if (endPage - startPage < 4) {
                        startPage = Math.max(1, endPage - 4);
                    }

                    const pages = [];
                    for (let p = startPage; p <= endPage; p++) {
                        pages.push(p);
                    }

                    return pages.map((p) => {
                        const active = p === page;
                        return (
                            <button
                                key={p}
                                onClick={() => handlePageChange(p)}
                                className={`h-8 w-8 rounded-lg text-sm font-medium transition ${active
                                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                                    : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                                    }`}
                            >
                                {p}
                            </button>
                        );
                    });
                })()}

                <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page >= totalPages}
                    className="rounded-lg border px-3 py-1 text-sm font-medium transition hover:bg-gray-50 disabled:opacity-50"
                >
                    Sau
                </button>
            </div>
        </div>
    );
}
