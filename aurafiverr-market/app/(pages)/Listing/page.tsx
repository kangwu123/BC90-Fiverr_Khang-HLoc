"use client";

import HomeFooter from "@/app/components/HomeFooter";
import HomeHeader from "@/app/components/HomeHeader";
import api from "@/app/services/api";
import { TBookingHireJobViewModel, TUser } from "@/app/types";
import React, { useEffect, useState, useCallback } from "react";
import EditProfilePopUp from "./editProfile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faUserLock } from "@fortawesome/free-solid-svg-icons";
import Loading from "@/app/components/_Loading/Loading";
import Toast from "@/app/components/_Toast/Toast";
import LinkedAccounts from "./LinkedAccounts";
import StickyNav from "@/app/components/StickyNav";
import BackToTopButton from "@/app/components/BackToTop";
import Swal from 'sweetalert2';
import { useRouter } from "next/navigation";

const Listing = () => {
  const router = useRouter();
  const [user, setUser] = useState<TUser | null>(null);
  const [hiredBookingJobs, setHiredBookingJobs] = useState<TBookingHireJobViewModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);

  const JobHiredPriceTotal = () => {
    // Calculate total price of hired jobs including service fee per job
    let total = 0;
    hiredBookingJobs.forEach((job) => {
      const price = Number(job.giaTien) || 0;
      let feeRate = 0.1; // default 10%
      if (job.tenCongViec === 'Premium') feeRate = 0.2;
      else if (job.tenCongViec === 'Standard') feeRate = 0.3;
      // If specific labels like 'Basic' are used, keep default 0.1
      const fee = price * feeRate;
      total += price + fee;
    });
    return total;
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

  const renderBookingHireJobs = (item: TBookingHireJobViewModel) => {
    return (
      <div key={item.id} className="border border-gray-200 rounded-2xl p-4 sm:p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-start gap-4 sm:gap-6">
          {/* Image */}
          <img
            src={item.hinhAnh}
            alt={String(item.tenCongViec)}
            className="w-28 sm:w-36 h-20 sm:h-24 object-cover rounded-xl shrink-0"
          />

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-gray-900 text-sm sm:text-base">
              {item.tenCongViec}
            </h4>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2 line-clamp-2">
              {item.moTaNgan}
            </p>
          </div>

          {/* Price and Actions - Pushed to Right */}
          <div className="flex flex-col items-end justify-start gap-2 sm:gap-3 shrink-0 ml-4">
            <p className="font-bold text-base sm:text-lg text-gray-900">
              ${item.giaTien}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => router.push(`/detail/${item.id}`)}
                className="bg-green-500 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-xs sm:text-sm font-medium"
              >
                View detail
              </button>
              <button
                onClick={() => {
                  // Handle delete
                  handleDeleteJob(item.id);
                }}
                className="bg-red-500 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-red-600 transition-colors text-xs sm:text-sm font-medium"
              >
                DEL
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

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

      const res = await api.get(`thue-cong-viec/lay-danh-sach-da-thue`);
      const list: TBookingHireJobViewModel[] = res.data.content || [];

      setHiredBookingJobs(list);
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
      await api.get(`users/${currentUser.id}`);
    } catch (error) {
      console.log(error);
    }
    setIsEditOpen(true);
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("formFile", file);

      try {
        const res = await api.post("/users/upload-avatar", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (res.data.content) {
          fetchData();
          Swal.fire("Avatar updated successfully!", "", "success");
        }
      } catch (error) {
        console.error("Failed to upload avatar", error);
        Swal.fire("Failed to upload avatar", "", "error");
      }
    }
  };

  if (loading) {
    return (
      <Loading />
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

      <main className="container mx-auto px-60 py-10 md:py-10">
        <div className=" container mx-auto py-12 px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-8 xl:gap-14">
          <aside className="w-full lg:w-75 xl:w-87.5 shrink-0">
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <img src={user?.avatar || "/img/avatarLogo.jpg"} alt="User Avatar" style={{ objectFit: 'cover' }}
                    className="rounded-full"
                  />
                  <input
                    type="file"
                    id="avatar-upload"
                    className="hidden"
                    onChange={handleAvatarChange}
                  />
                  <label
                    htmlFor="avatar-upload"
                    className="absolute bottom-0 right-0 bg-gray-800 text-white rounded-full p-2 cursor-pointer hover:bg-gray-700"
                  >
                    <FontAwesomeIcon icon={faCamera} />
                  </label>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">{user?.name}</h2>
                <p className="text-sm text-gray-500">BASIC ACCOUNT</p>
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
          </aside>

          <section className="w-full lg:w-[70%]">
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl xl:text-5xl font-black">
                Booking History
              </h1>
              <p className="text-gray-500 mt-2">
                You have {hiredBookingJobs.length} Job Hired
              </p>
            </div>

            <div className="grid gap-6 md:gap-8">
              {/* Call the arrow function here */}
              {hiredBookingJobs.map((item) => renderBookingHireJobs(item))}
            </div>
          </section>
        </div>
      </main>

      {isEditOpen && (
        <EditProfilePopUp
          userId={user.id}
          onClose={() => setIsEditOpen(false)}
          onUpdateSuccess={() => {
            fetchData();
            setToastOpen(true);
          }}
        />
      )}

      <Toast
        open={toastOpen}
        onClose={() => setToastOpen(false)}
        type="success"
      >
        <div>
          <p className="font-bold text-sm">Profile updated</p>
          <p className="text-xs text-gray-500 mt-0.5">
            Your information has been saved successfully
          </p>
        </div>
      </Toast>

      <div className="relative bg-white">
        <BackToTopButton />
        <HomeFooter />
      </div>
    </div>
  );
};

export default Listing;
