import Link from "next/link";

const PracticeCard = ({ title, live, href }) => {
    if (live) {
        return (
            <Link href={href} prefetch className="relative flex flex-col items-center justify-center select-none p-8 border border-gray-200 hover:shadow-lg transition duration-300 ease-in-out">
                <h2 className="text-xl md:text-3xl font-bold mb-4">{title}</h2>
            </Link>
        );
    }

    return (
        <div className="relative flex flex-col items-center justify-center select-none p-8 border border-gray-200 opacity-50 cursor-not-allowed">
            {/* "Coming soon" badge */}
            <div className="absolute -top-2 -right-2 bg-blue-700 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-md rotate-24">
                Coming soon
            </div>
            <h2 className="text-xl md:text-3xl font-bold mb-4">{title}</h2>
        </div>
    );
};

export default PracticeCard;