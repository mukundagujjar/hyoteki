import Link from "next/link";

const PracticeCard = ({ title, live, href }) => {
    if (live) {
        return (
            <Link href={href} prefetch className="relative rounded-2xl flex flex-col items-center justify-center select-none p-4 bg-[#1B263B] hover:shadow-xl transition duration-300 ease-in-out cursor-pointer">
                <h2 className="text-xl md:text-3xl font-bold text-center">{title}</h2>
            </Link>
        );
    }

    return (
        <div className="relative flex flex-col items-center rounded-2xl justify-center select-none p-6  opacity-50 cursor-not-allowed max-h-[100px] bg-[#1B263B]">
            {/* "Coming soon" badge */}
            <div className="absolute -top-2 -right-2 bg-blue-700 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-md rotate-24">
                Coming soon
            </div>
            <h2 className="text-xl md:text-3xl font-bold text-center">{title}</h2>
        </div>
    );
};

export default PracticeCard;