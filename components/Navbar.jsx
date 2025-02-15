import Link from "next/link"
import { Oooh_Baby } from "next/font/google"
const NavbarRoutes = [
    {
        id: 1,
        title: "Guided coaching",
        href: "/hirameki"
    },
    {
        id: 2,
        title: "About",
        href: "/about"
    },
    {
        id: 3,
        title: "Contact",
        href: "/contact"
    },
    {
        id: 4,
        title: "Legal",
        href: "/legal"
    }
]

const NavbarFont = Oooh_Baby({
    subsets: ["latin"],
    variable: "manrope",
    weight: "400"
})

const Navbar = () => {
    return (
        <div className="flex justify-between items-center w-full p-6 md:mb-6 select-none">
            <h1 className={`${NavbarFont.className} text-[#E0E1DD] text-2xl md:text-6xl`}>Hyoteki</h1>

            <div className="flex hidden lg:flex gap-18 items-center">
                {
                    NavbarRoutes.map((route) => (
                        <Link prefetch key={route.id} href={route.href} className="text-[#778DA9] font-semibold hover:bg-[#1B263B] px-4 py-2 rounded-lg">{route.title}</Link>
                    ))
                }
            </div>

            <div className="flex lg:hidden">
                
            </div>
        </div>
    )
}

export default Navbar