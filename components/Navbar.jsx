"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Oooh_Baby } from "next/font/google"

const NavbarRoutes = [
    {
        id: 1,
        title: "Guided coaching",
        href: "/guided-coaching"
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
    const pathname = usePathname()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    return (
        <div className="relative">
            <div className="flex justify-between items-center w-full p-6 md:mb-6 select-none">
                <Link prefetch href="/" className={`${NavbarFont.className} text-[#E0E1DD] text-2xl md:text-6xl`}>Hyoteki</Link>

                <div className="hidden lg:flex gap-18 items-center">
                    {
                        NavbarRoutes.map((route) => (
                            <Link
                                prefetch
                                key={route.id}
                                href={route.href}
                                className={`
                                    text-[#778DA9] 
                                    font-semibold 
                                    px-4 
                                    py-2 
                                    rounded-lg
                                    ${pathname === route.href ? 'bg-[#1B263B]' : 'hover:bg-[#1B263B]'}
                                `}
                            >
                                {route.title}
                            </Link>
                        ))
                    }
                </div>

                <div className="flex lg:hidden">
                    <button
                        onClick={toggleMobileMenu}
                        className="text-[#778DA9] hover:text-[#E0E1DD] transition-colors"
                    >
                        {isMobileMenuOpen ? (
                            <X size={24} />
                        ) : (
                            <Menu size={24} />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="lg:hidden absolute w-full bg-[#0D1B2A]/95 backdrop-blur-sm mt-2 rounded-lg animate-in slide-in-from-top duration-300">
                    <div className="flex flex-col p-6 space-y-4">
                        {NavbarRoutes.map((route) => (
                            <Link
                                prefetch
                                key={route.id}
                                href={route.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`
                                    text-[#778DA9] 
                                    font-semibold 
                                    px-4 
                                    py-2 
                                    rounded-lg
                                    ${pathname === route.href ? 'bg-[#1B263B]' : 'hover:bg-[#1B263B]'}
                                `}
                            >
                                {route.title}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Navbar