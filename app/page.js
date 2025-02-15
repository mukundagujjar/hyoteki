import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
const RootPage = () => {
    return (
        <div className="h-dvh w-full flex flex-col overflow-y-auto gap-8">
            <Navbar/>
            <Hero/>
        </div>
    )
}

export default RootPage;