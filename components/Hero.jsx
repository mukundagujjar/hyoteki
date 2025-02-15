"use client"
import Link from "next/link";
import Image from "next/image";

import { useState, useEffect } from "react";

const MtFujiCaption = ["富士山", "ふじさん", "Mount Fuji"];

const Hero = () => {

    const [index, setIndex] = useState(0);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setVisible(false); // Fade out
            setTimeout(() => {
                setIndex((prev) => (prev + 1) % MtFujiCaption.length);
                setVisible(true); // Fade in
            }, 400); // Smooth transition delay
        }, 3000);

        return () => clearInterval(interval);
    }, [3000]);

    return (
        <div className="flex flex-col lg:flex-row w-full items-center p-3 lg:p-8 gap-8">
            <div className="flex flex-col w-full items-center justify-center md:w-[55%] gap-4 md:gap-10">
                <h1 className="text-4xl md:text-6xl font-black text-center">A step closer to learning Japanese</h1>
                <p className="text-lg text-center text-[#778DA9]">Improve your Japanese skills through incremental practice tests and tailored lessons.</p>

                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-[60%] justify-center">
                    <Link prefetch href="/learn">
                        <button className="px-4 py-2 md:px-10 md:py-4 bg-[#415A77] cursor-pointer hover:shadow-xl rounded-lg font-medium w-full">Learn</button>
                    </Link>
                    <Link prefetch href="/practice">
                        <button className="px-4 py-2 md:px-10 md:py-4 bg-[#1B263B] cursor-pointer hover:shadow-xl rounded-lg font-medium w-full">Practice</button>
                    </Link>
                </div>
            </div>

            <div className="w-full md:w-[45%] flex flex-col items-center justify-center rounded-full p-8 select-none bg-radial from-[#415A77] from-5% via-[#0D1B2A] via-60% to-[#0D1B2A]">
                <Image src="/mt-fuji-light.svg" width={600} height={600} alt="Hero Image" />
                <p
                    className={`md:text-2xl text-[#778DA9] text-center mt-4 transition-opacity duration-400 ${visible ? "opacity-100" : "opacity-0"
                        }`}
                >
                    {MtFujiCaption[index]}
                </p>
            </div>
        </div>
    )
}

export default Hero;