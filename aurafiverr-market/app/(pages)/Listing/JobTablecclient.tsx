"use client";

import { useEffect, useState } from "react";
import JobPagination from "../Admin/job/components/JobPagination";
import api from "@/app/services/api";

type Props = {
  keyword: string;
  page: number;
};

export default function JobTablecclient({ keyword, page }: Props) {
  const pageSize = 10;

  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // ===== FETCH DATA (CLIENT ONLY) =====
  useEffect(() => {
    let mounted = true;

    async function fetchJobs() {
      try {
        setLoading(true);
        const res = await api.get("/cong-viec");
        const result = res.data;

        let data: any[] = [];

        if (Array.isArray(result)) data = result;
        else if (result?.content?.data && Array.isArray(result.content.data))
          data = result.content.data;
        else if (Array.isArray(result?.content)) data = result.content;
        else if (Array.isArray(result?.data)) data = result.data;
        else if (result?.id) data = [result];

        if (mounted) setJobs(data);
      } catch (error) {
        console.error("Fetch jobs error:", error);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchJobs();

    return () => {
      mounted = false;
    };
  }, []);

  // ===== FILTER + PAGINATION =====
  const normalizedKeyword = (keyword || "").toLowerCase().trim();

  const filtered = normalizedKeyword
    ? jobs.filter((j) => {
        const text = `${j.tenCongViec ?? ""} ${j.moTaNgan ?? ""}`.toLowerCase();
        return text.includes(normalizedKeyword);
      })
    : jobs;

  const totalRow = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalRow / pageSize));

  const start = (page - 1) * pageSize;
  const pageJobs = filtered.slice(start, start + pageSize);

  // ===== LOADING UI =====
  if (loading) {
    return (
      <div className="py-10 text-center text-gray-500">Đang tải dữ liệu...</div>
    );
  }

  // ===== RENDER =====
  return (
    <>
      <div className="overflow-hidden rounded-xl bg-white shadow">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-6 py-3 text-left">Tiêu đề</th>
              <th className="px-6 py-3 text-left">Mô tả ngắn</th>
              <th className="px-6 py-3 text-left">Giá</th>
              <th className="px-6 py-3 text-left">Đánh giá</th>
              <th className="px-6 py-3 text-left">Hình</th>
              {/* <th className="px-6 py-3 text-center">Hành động</th> */}
            </tr>
          </thead>

          <tbody className="divide-y">
            {pageJobs.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                  Không tìm thấy công việc
                </td>
              </tr>
            )}

            {pageJobs.map((job: any) => (
              <tr key={job.id}>
                <td className="px-6 py-4">{job.tenCongViec}</td>
                <td className="px-6 py-4">{job.moTaNgan}</td>
                <td className="px-6 py-4">${job.giaTien}</td>
                <td className="px-6 py-4">{job.danhGia}</td>
                <td className="px-6 py-4">
                  {job.hinhAnh && (
                    <img
                      src={job.hinhAnh}
                      alt={job.tenCongViec}
                      className="h-12 w-20 object-cover rounded"
                    />
                  )}
                </td>
                {/* <td className="px-6 py-4 text-center">
                  <JobActions jobId={job.id} />
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <JobPagination page={page} keyword={keyword} totalPages={totalPages} />
    </>
  );
}
