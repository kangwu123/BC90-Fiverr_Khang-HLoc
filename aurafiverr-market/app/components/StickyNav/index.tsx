"use client";
import { useEffect, useState } from "react";


const categories = [
    { name: "Graphics & Design" },
    { name: "Digital Marketing", },
    { name: "Writing & Translation", },
    { name: "Video & Animation", },
    { name: "Music & Audio",},
    { name: "Testing",}
];

export default function StickyNav({ headerHeight }: { headerHeight: number }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const heroSection = document.getElementById("hero-section");
            if (heroSection) {
                if (window.scrollY > heroSection.offsetHeight) {
                    setVisible(true);
                } else {
                    setVisible(false);
                }
            }
        };

        const handleHide = () => setVisible(false);

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("hideStickyNav", handleHide);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("hideStickyNav", handleHide);
        }
    }, []);

    return (
        <div
            className={`fixed left-0 w-full bg-orange-300 z-40 shadow-md transition-transform duration-300 ${visible ? "translate-y-0" : "-translate-y-full"}`}
            style={{ top: `${headerHeight}px` }}
        >
            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-center items-center h-16">
                    <div className="flex space-x-8">
                        {categories.map((category) => (
                            <a
                                key={category.name}
                                href="#"
                                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                            >
                                {category.name}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
