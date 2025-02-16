import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
const RootPage = () => {
    return (
        <div className="h-dvh w-full flex flex-col overflow-y-auto gap-8">
            <Navbar />
            <div className="flex flex-col p-8 justify-center md:text-lg">
                <Hero />
            </div>
        </div>
    )
}

export default RootPage;