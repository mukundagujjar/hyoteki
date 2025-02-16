import Navbar from "@/components/Navbar";
import Link from "next/link";

const GuidedCoachingPage = () => {
    return (
        <div className="h-dvh w-full flex flex-col overflow-y-auto gap-8">
            <Navbar/>
            <div className="flex flex-col p-8 justify-center md:text-lg gap-8">
                <p>We are on the lookout for language schools looking to partner with us to offer guided coaching to prospective students. If you are interested, please contact us via the <Link prefetch className="bg-[#1B263B] py-1 px-2 rounded-lg" href="/contact">Contact page <sup>&#129109;</sup></Link>.</p>
            </div>
        </div>
    );
}

export default GuidedCoachingPage;