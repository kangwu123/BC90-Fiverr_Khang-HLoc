"use client";
import { useCallback, useEffect, useState } from "react";
import { TBookingHireJob, TUser } from "@/app/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserLock } from "@fortawesome/free-solid-svg-icons";
import HomeHeader from "@/app/components/HomeHeader";
import StickyNav from "@/app/components/StickyNav";
import BackToTopButton from "@/app/components/BackToTop";
import HomeFooter from "@/app/components/HomeFooter";
import api from "@/app/services/api";
import EditProfilePopUp from "./editProfile";
import LinkedAccounts from "./LinkedAccounts";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const ListingPage = () => {
  const router = useRouter();
  const [user, setUser] = useState<TUser | null>(null);
  const [hiredBookingJobs, setHiredBookingJobs] = useState<TBookingHireJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditOpen, setIsEditOpen] = useState(false);


  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const raw = localStorage.getItem("USER_LOGIN");
      if (!raw) {
        setUser(null);
        setHiredBookingJobs([]);
        return;
      }
      const parsed = JSON.parse(raw);
      const currentUser = parsed?.content?.user;
      if (!currentUser?.id) return;
      setUser(currentUser);

      const res = await api.get<{ content: TBookingHireJob[] }>(
        `/thue-cong-viec/lay-danh-sach-da-thue`
      );
      setHiredBookingJobs(res.data.content);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    window.addEventListener("LOGIN_SUCCESS", fetchData);
    return () => window.removeEventListener("LOGIN_SUCCESS", fetchData);
  }, [fetchData]);

  const handleEditProfile = async () => {
    try {
      const raw = localStorage.getItem("USER_LOGIN");
      if (!raw) {
        setUser(null);
        setHiredBookingJobs([]);
        return;
      }
      const parsed = JSON.parse(raw);
      const currentUser = parsed?.content?.user;
      if (!currentUser?.id) return;
      setUser(currentUser);
      await api.get(`/user/${currentUser.id}`);
    } catch (error) {
      console.log(error);
    }
    setIsEditOpen(true);
  };

  const handleDeleteJob = async (jobId: number) => {
    Swal.fire({
      title: "Do you want to delete it?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await api.delete(`/thue-cong-viec/${jobId}`);
          Swal.fire("Job Hire Booking Delete Successfully!", "", "success");
          fetchData();
        } catch (error) {
          Swal.fire("Failed to delete job", "", "error");
        }
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="relative w-14 h-14">
          <div className="absolute inset-0 border-4 border-gray-100 rounded-full" />
          <div className="absolute inset-0 border-4 border-rose-500 rounded-full animate-spin border-t-transparent" />
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="bg-white min-h-screen">
        <HomeHeader />
        <main className="flex flex-col items-center justify-center px-4 sm:px-6 md:px-10 py-16 sm:py-20 text-center">

          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-50 rounded-full flex items-center justify-center mb-5 sm:mb-6">
            <FontAwesomeIcon icon={faUserLock} className="text-2xl sm:text-3xl text-gray-400" />
          </div>

          <h2 className="font-extrabold text-amber-700 mb-3 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
            Login to see your Job Hired
          </h2>

          <p className="text-gray-500 mb-8 max-w-xs sm:max-w-sm md:max-w-md text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
            Manage your Job Hired and Job Posted after logging in.
          </p>

          <button
            onClick={() =>
              window.dispatchEvent(
                new CustomEvent("OPEN_AUTH_MODAL", { detail: { mode: "login" } })
              )
            }
            className="px-8 sm:px-10 py-3 sm:py-4 bg-linear-to-br from-[#F0944D] to-[#ACCAD5] text-black rounded-2xl font-bold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:brightness-110 active:scale-95 cursor-pointer"
          >
            Login Now
          </button>
        </main>

        <HomeFooter />
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <HomeHeader />
      <StickyNav headerHeight={140} />

      <div className="container mx-auto px-2 py-10">
        <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <img src={user?.avatar || "/img/avatarLogo.jpg"} alt="User Avatar" style={{ objectFit: 'cover' }}
                    className="rounded-full"
                  />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">{user?.name}</h2>
                <p className="text-sm text-gray-500">PREMIUM ACCOUNT</p>
                <div className="mt-6 text-left space-y-4">
                  <div>
                    <p className="text-xs font-semibold text-gray-400">EMAIL ADDRESS</p>
                    <p className="text-gray-800 wrap-break-words">{user?.email}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400">PHONE NUMBER</p>
                    <p className="text-gray-800">{user?.phone || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400">GENDER</p>
                    <p className="text-gray-800">{user?.gender ? "Male" : "Female"}</p>
                  </div>
                </div>
                <button onClick={handleEditProfile}
                  className="mt-8 w-full bg-gray-800 text-white font-bold py-3 px-6 rounded-full hover:bg-gray-700 transition-colors">
                  Edit Profile
                </button>
              </div>
              <LinkedAccounts />
            </div>

            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  My Posted Jobs
                </h3>
                {hiredBookingJobs.length > 0 ? (
                  <div className="space-y-6">
                    {hiredBookingJobs.map((job) => (
                      <div
                        key={job.id}
                        className="flex items-center space-x-4 border-b pb-4"
                      >
                        <img
                          src={job.congViec.hinhAnh}
                          alt={job.congViec.tenCongViec}
                          className="w-32 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-800">
                            {job.congViec.tenCongViec}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {job.congViec.moTaNgan}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg text-gray-800">
                            ${job.congViec.giaTien}
                          </p>
                          <div className="flex mt-2">
                            <button
                              onClick={() =>
                                router.push(`/detail/${job.congViec.id}`)
                              }
                              className="bg-green-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-green-600"
                            >
                              View detail
                            </button>
                            <button
                              onClick={() => handleDeleteJob(job.id)}
                              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                            >
                              DEL
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No jobs posted yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative bg-white">
        <BackToTopButton />
        <HomeFooter />
      </div>

      {isEditOpen && user && (
        <EditProfilePopUp
          userId={user.id}
          onClose={() => setIsEditOpen(false)}
          onUpdateSuccess={() => {
            fetchData();
            setIsEditOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default ListingPage;
