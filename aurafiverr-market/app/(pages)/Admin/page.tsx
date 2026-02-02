import DashboardStats from "@/app/components/admin/DashboardStats";

export default function AdminPage() {
    return (
        <div className="space-y-6">
            <div className="rounded-xl bg-white p-6 shadow">
                <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
                <p className="mt-2 text-gray-600">Chào mừng bạn vào trang quản trị</p>
            </div>

            {/* Stats row */}
            <div className="rounded-xl bg-white p-6 shadow">
                <DashboardStats />
            </div>

        </div>
    );
}
