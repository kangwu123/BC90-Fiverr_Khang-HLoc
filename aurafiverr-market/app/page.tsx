"use client";
import { useEffect, useState } from "react";
import WOW from "wowjs/dist/wow";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "animate.css";
import {
  AudioOutlined,
  BulbOutlined,
  CodeOutlined,
  FormatPainterOutlined,
  RobotOutlined,
  ShopOutlined,
  TeamOutlined,
  TranslationOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";

import HomeHeader from "./components/HomeHeader";
import HomeFooter from "./components/HomeFooter";
import BackToTopButton from "./components/BackToTop";
//import DestinationBar from "./(pages)/destinationBar";
import SocialMedia from "./components/SocialMedia";

export default function Home() {
  const [splashDone, setSplashDone] = useState(false);
  const [homeReady, setHomeReady] = useState(false);

  const categories = [
    { name: "Programming & Tech", icon: <CodeOutlined className="text-3xl" /> },
    { name: "Graphics & Design", icon: <FormatPainterOutlined className="text-3xl" /> },
    { name: "Digital Marketing", icon: <BulbOutlined className="text-3xl" /> },
    { name: "Writing & Translation", icon: <TranslationOutlined className="text-3xl" /> },
    { name: "Video & Animation", icon: <VideoCameraOutlined className="text-3xl" /> },
    { name: "AI Services", icon: <RobotOutlined className="text-3xl" /> },
    { name: "Music & Audio", icon: <AudioOutlined className="text-3xl" /> },
    { name: "Business", icon: <ShopOutlined className="text-3xl" /> },
    { name: "Consulting", icon: <TeamOutlined className="text-3xl" /> },
  ];

  const popularServices = [
    { name: "Book Design", image: "/img/popular/book-design.png" },
    { name: "UGC Videos", image: "/img/popular/ugc-videos.png" },
    { name: "Voice Over", image: "/img/popular/voice-over.png" },
    { name: "Social Media Marketing", image: "/img/popular/smm.png" },
    { name: "AI Development", image: "/img/popular/ai-dev.png" },
    { name: "Logo Design", image: "/img/popular/logo-design.png" },
  ];

  const professionalServices = [
    {
      subtitle: "Build your brand",
      title: "Logo Design",
      image: "/img/professional/logo-design.png",
    },
    {
      subtitle: "Customize your site",
      title: "AI Development",
      image: "/img/professional/AI Development.png",
    },
    {
      subtitle: "Share your message",
      title: "Voice Over",
      image: "/img/professional/voice-over.png",
    },
    {
      subtitle: "Engage your audience",
      title: "Video Explainer",
      image: "/img/professional/UGCVideoimg.png",
    },
    {
      subtitle: "Reach more customers",
      title: "Social Media",
      image: "/img/professional/social-media-marketing.png",
    },
  ];

  const trustedServices = [
    { name: "3D Industrial Design", image: "/img/Trusted/3D-Industrial-Design_2x.png" },
    { name: "E-commerce Website Development", image: "/img/Trusted/E-commerce-Website-Development_2x.png" },
    { name: "Email Marketing", image: "/img/Trusted/Email-Marketing_2x.png" },
    { name: "Press Releases", image: "/img/Trusted/Press-Releases_2x.png" },
    { name: "Logo Design", image: "/img/Trusted/Logo-Design_2x.png" },
  ];

  useEffect(() => {
    let wow: any;

    import("wowjs/dist/wow").then((module) => {
      const WOW = module.WOW;
      wow = new WOW({ live: false, offset: 80 });
      wow.init();
    });

    const t = setTimeout(() => setSplashDone(true), 80);

    return () => {
      clearTimeout(t);
      wow = null;
    };
  }, []);

  return (
    <div className="w-full min-h-screen bg-linear-to-b from-[#C6C6C6] via-[#8D8D8D] to-[#383838] relative overflow-hidden">

      <div className="fixed inset-0 z-100 pointer-events-none">
        <motion.div
          initial={{ y: 0 }}
          animate={splashDone ? { y: "-100%" } : {}}
          transition={{ duration: 0.75, ease: [0.4, 0, 0.2, 1] }}
          className="absolute top-0 left-0 w-full h-1/2 bg-[#1C1C1C]"
        />
        <motion.div
          initial={{ y: 0 }}
          animate={splashDone ? { y: "100%" } : {}}
          transition={{ duration: 0.75, ease: [0.4, 0, 0.2, 1] }}
          className="absolute bottom-0 left-0 w-full h-1/2 bg-[#1C1C1C]"
        />
      </div>

      <motion.div
        className="relative w-full bg-white origin-center"
        initial={{ scale: 0.7, opacity: 0, y: 40 }}
        animate={splashDone ? { scale: 1, opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        onAnimationComplete={() => setHomeReady(true)}
      >
        <HomeHeader isHome homeAnimationDone={homeReady} />

        <main className="w-full">

          <section className="relative h-screen">
            <div className="absolute inset-0">
              <Swiper
                modules={[Autoplay, Pagination]}
                loop
                autoplay={{ delay: 5200 }}
                pagination={{ clickable: true }}
                className="w-full h-full"
              >
                <SwiperSlide className="relative">
                  <img src="/img/Carousel/hero.png" className="w-full h-full object-cover animate__animated animate__fadeIn" />
                  <div className="absolute inset-0 bg-opacity-30 flex flex-col items-center justify-center text-white p-4">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center leading-tight">Our freelancers<br />will take it from here</h1>
                    <div className="w-full max-w-2xl">
                      <div className="relative">
                        <input type="text" placeholder="Search for any service..." className="w-full p-4 rounded-md text-gray-900" />
                        <button className="absolute right-1 top-1/2 -translate-y-1/2 bg-gray-600 text-amber-400 p-3 rounded-md hover:bg-gray-700">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-wrap justify-center gap-2 md:gap-4 mt-4">
                      <button className="border border-amber-400 rounded-full px-4 py-1 text-sm hover:bg-red-500 hover:text-black transition-colors">Website Development &rarr;</button>
                      <button className="border border-amber-400 rounded-full px-4 py-1 text-sm hover:bg-red-500 hover:text-black transition-colors">Architecture & Interior Design &rarr;</button>
                      <button className="border border-amber-400 rounded-full px-4 py-1 text-sm hover:bg-red-500 hover:text-black transition-colors">UGC Videos &rarr;</button>
                      <button className="border border-amber-400 rounded-full px-4 py-1 text-sm hover:bg-red-500 hover:text-black transition-colors">Video Editing &rarr;</button>
                      <button className="border border-amber-400 rounded-full px-4 py-1 text-sm hover:bg-red-500 hover:text-black transition-colors">Book Publishing &rarr;</button>
                    </div>
                    <div className="px-6 py-10 flex items-center flex-wrap justify-center gap-x-6 gap-y-2">
                      <span className="font-semibold">Trusted by:</span>
                      <img src="/img/Trusted/meta.svg" alt="Meta" className="h-5" />
                      <img src="/img/Trusted/google.svg" alt="Google" className="h-5" />
                      <img src="/img/Trusted/netflix.svg" alt="Netflix" className="h-5" />
                      <img src="/img/Trusted/pg.svg" alt="P&G" className="h-5" />
                      <img src="/img/Trusted/paypal.svg" alt="PayPal" className="h-5" />
                      <img src="/img/Trusted/payoneer.svg" alt="Payoneer" className="h-6" />
                    </div>
                  </div>
                </SwiperSlide>

                <SwiperSlide className="relative">
                  <img src="/img/Carousel/bg-first-hero.jpg" className="w-full h-full object-cover animate__animated animate__fadeIn" />
                  <div className="absolute inset-0 bg-opacity-30 flex flex-col items-center justify-center text-white p-4">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center leading-tight">Our freelancers<br />will take it from here</h1>
                    <div className="w-full max-w-2xl">
                      <div className="relative">
                        <input type="text" placeholder="Search for any service..." className="w-full p-4 rounded-md text-gray-900" />
                        <button className="absolute right-1 top-1/2 -translate-y-1/2 bg-gray-600 text-amber-400 p-3 rounded-md hover:bg-gray-700">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-wrap justify-center gap-2 md:gap-4 mt-4">
                      <button className="border border-amber-400 rounded-full px-4 py-1 text-sm hover:bg-red-500 hover:text-black transition-colors">Website Development &rarr;</button>
                      <button className="border border-amber-400 rounded-full px-4 py-1 text-sm hover:bg-red-500 hover:text-black transition-colors">Architecture & Interior Design &rarr;</button>
                      <button className="border border-amber-400 rounded-full px-4 py-1 text-sm hover:bg-red-500 hover:text-black transition-colors">UGC Videos &rarr;</button>
                      <button className="border border-amber-400 rounded-full px-4 py-1 text-sm hover:bg-red-500 hover:text-black transition-colors">Video Editing &rarr;</button>
                      <button className="border border-amber-400 rounded-full px-4 py-1 text-sm hover:bg-red-500 hover:text-black transition-colors">Book Publishing &rarr;</button>
                    </div>
                    <div className="px-6 py-10 flex items-center flex-wrap justify-center gap-x-6 gap-y-2">
                      <span className="font-semibold">Trusted by:</span>
                      <img src="/img/Trusted/meta.svg" alt="Meta" className="h-5" />
                      <img src="/img/Trusted/google.svg" alt="Google" className="h-5" />
                      <img src="/img/Trusted/netflix.svg" alt="Netflix" className="h-5" />
                      <img src="/img/Trusted/pg.svg" alt="P&G" className="h-5" />
                      <img src="/img/Trusted/paypal.svg" alt="PayPal" className="h-5" />
                      <img src="/img/Trusted/payoneer.svg" alt="Payoneer" className="h-6" />
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>

            {homeReady && (
              <motion.div
                initial={{ x: -40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                className="fixed left-1 bottom-[20%] z-10"
              >
                <SocialMedia />
              </motion.div>
            )}
          </section>

          <section className="w-full py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-wrap justify-center gap-6">
                {categories.map((category) => (
                  <div key={category.name} className="flex flex-col items-center justify-center p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out w-40 h-36 cursor-pointer group">
                    <div className="text-gray-500 group-hover:text-amber-500 transition-colors duration-300">
                      {category.icon}
                    </div>
                    <p className="text-sm font-medium text-gray-700 group-hover:text-black text-center mt-3 transition-colors duration-300">
                      {category.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="w-full py-10 bg-white px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 wow animate__animated animate__fadeInUp">
              Popular Professional Services
            </h2>

            <div className="max-w-6xl mx-auto relative">
              <Swiper
                modules={[Navigation, Pagination]}
                navigation={{
                  nextEl: ".prof-next",
                  prevEl: ".prof-prev",
                }}
                pagination={{ clickable: true }}
                spaceBetween={20}
                breakpoints={{
                  320: { slidesPerView: 1.2, centeredSlides: true, spaceBetween: 16, loop: true },
                  640: { slidesPerView: 2.5 },
                  768: { slidesPerView: 3 },
                  1024: { slidesPerView: 4 },
                  1280: { slidesPerView: 5, centeredSlides: false, loop: false },
                }}
                className="professional-services-slider"
              >
                {professionalServices.map((service) => (
                  <SwiperSlide key={service.title}>
                    <div className="relative h-80 rounded-md overflow-hidden group cursor-pointer">
                      <img src={service.image} alt={service.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                      <div className="absolute top-4 left-4 text-green-600">
                        <p className="text-sm font-light">{service.subtitle}</p>
                        <h3 className="font-bold text-2xl">{service.title}</h3>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="prof-prev absolute top-1/2 -translate-y-1/2 -left-10 z-10 cursor-pointer bg-yellow-400 shadow-md rounded-full w-10 h-10 flex items-center justify-center hover:bg-red-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </div>
              <div className="prof-next absolute top-1/2 -translate-y-1/2 -right-10 z-10 cursor-pointer bg-yellow-400 shadow-md rounded-full w-10 h-10 flex items-center justify-center hover:bg-red-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </div>
            </div>
          </section>

          <section className="w-full py-10 bg-white px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-14 wow animate__animated animate__fadeInUp">
              Vontélle’s trusted services
            </h2>

            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-wrap justify-center gap-4">
                {trustedServices.map((service) => (
                  <div key={service.name} className="flex flex-col items-center justify-start pt-6 pb-4 px-4 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out w-56 h-48 cursor-pointer group">
                    <div className="h-20 flex items-center justify-center mb-4">
                      <img src={service.image} alt={service.name} className="max-h-full max-w-full" />
                    </div>
                    <p className="text-base font-medium text-gray-800 group-hover:text-black text-center transition-colors duration-300">
                      {service.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="w-full py-10 bg-gray-100 overflow-hidden">
            <h3 className="text-xl text-gray-500 mb-16 uppercase tracking-[0.3em] font-medium text-center wow animate__animated animate__fadeInUp">
              Our Partners
            </h3>

            <Swiper
              modules={[Autoplay]}
              slidesPerView="auto"
              spaceBetween={80}
              loop
              speed={12000}
              allowTouchMove={false}
              autoplay={{ delay: 0, disableOnInteraction: false }}
              className="w-full"
            >
              <SwiperSlide className="w-auto! flex items-center wow animate__animated animate__fadeIn">
                <img src="/img/Partner/expedia.png" className="h-10 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all" />
              </SwiperSlide>
              <SwiperSlide className="w-auto! flex items-center wow animate__animated animate__fadeIn">
                <img src="/img/Partner/visa.png" className="h-10 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all" />
              </SwiperSlide>
              <SwiperSlide className="w-auto! flex items-center wow animate__animated animate__fadeIn">
                <img src="/img/Partner/mastercard.png" className="h-10 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all" />
              </SwiperSlide>
              <SwiperSlide className="w-auto! flex items-center wow animate__animated animate__fadeIn">
                <img src="/img/Partner/paypal.png" className="h-10 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all" />
              </SwiperSlide>
              <SwiperSlide className="w-auto! flex items-center wow animate__animated animate__fadeIn">
                <img src="/img/Partner/airbnb.png" className="h-10 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all" />
              </SwiperSlide>
              <SwiperSlide className="w-auto! flex items-center wow animate__animated animate__fadeIn">
                <img src="/img/Partner/expedia.png" className="h-10 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all" />
              </SwiperSlide>
              <SwiperSlide className="w-auto! flex items-center wow animate__animated animate__fadeIn">
                <img src="/img/Partner/visa.png" className="h-10 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all" />
              </SwiperSlide>
              <SwiperSlide className="w-auto! flex items-center wow animate__animated animate__fadeIn">
                <img src="/img/Partner/mastercard.png" className="h-10 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all" />
              </SwiperSlide>
              <SwiperSlide className="w-auto! flex items-center wow animate__animated animate__fadeIn">
                <img src="/img/Partner/paypal.png" className="h-10 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all" />
              </SwiperSlide>
              <SwiperSlide className="w-auto! flex items-center wow animate__animated animate__fadeIn">
                <img src="/img/Partner/airbnb.png" className="h-10 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all" />
              </SwiperSlide>
            </Swiper>
          </section>

          <div className="relative bg-white">
            <BackToTopButton />
            <HomeFooter />
          </div>

        </main>
      </motion.div>
    </div>
  );
}
