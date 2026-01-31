"use client";

import Logo from "@/public/logo.svg"
import Link from 'next/link'
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { MoveUpRight } from "lucide-react";

const links = [
    {
        label: "Home",
        link: "/",
    },
    {
        label: "About",
        link: "/about",
    }
    , {
        label: "Projects",
        link: "/projects",
    }
    , {
        label: "Contact",
        link: "/contact-me",
    }
]

const Header = () => {
    const [open, setOpen] = useState(false);
    const pathname = usePathname()
    const isMobile = () => window.matchMedia("(max-width: 639px)").matches;
    useEffect(() => {
        if (open && isMobile()) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        const handleResize = () => {
            if (!isMobile()) {
                document.body.style.overflow = "";
            }
            setOpen(false)

        };

        window.addEventListener("resize", handleResize);

        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("resize", handleResize);
        };
    }, [open]);
    console.log(pathname)
    return (
        <header className="body-font h-18 xl:h-22 bg-white/05 backdrop-blur-sm sticky top-0 z-999 border-b border-white/10">
            <div className="mx-auto max-w-6xl px-6 sm:px-10 xl:px-0 flex h-full flex-row items-center justify-between w-full">
                <Link href="/" className="flex title-font font-medium items-center md:mb-0 [&_svg]:size-10 h-full">
                    <Logo />
                </Link>
                <button className="flex flex-col gap-1 items-end h-fit shrink-0 sm:hidden" onClick={() => setOpen(prev => !prev)}>
                    <span className={`transition-all w-5 h-0.5 bg-white shrink-0 ${open ? "-rotate-50 translate-y-1" : ""}`} />
                    <span className={`transition-all  h-0.5 bg-white shrink-0 ${open ? "opacity-0 w-0 invisible" : "opacity-100 w-4"}`} />
                    <span className={`transition-all h-0.5 bg-white shrink-0 ${open ? "rotate-50 w-5 -translate-y-2" : "w-3"}`} />
                </button>

                <nav className={`gap-6  sm:items-center text-base font-jakarta-sans  ${open ? "flex flex-col absolute sm:relative top-full right-4 left-4 mt-4 text-left bg-header rounded-3xl z-999 backdrop-blur-3xl p-5" : "hidden "} sm:flex`}>
                    {links.map((item, ix) => (
                        <Link
                            href={item.link}
                            key={ix}
                            onClick={() => {
                                setOpen(false)
                            }}
                            className={`hover:text-foreground/80 group text-sm xl:text-base relative text-nowrap ${(ix == 0 ? pathname == "/" : pathname.includes(item.link)) ? "text-white" : "text-white/75"}`}
                        >
                            {item.label}
                            <span className='w-0 absolute transition-all left-0 h-0.5 group-hover:w-full delay-200 group-hover:delay-0 bg-card bottom-0'></span>
                            <span className='w-0 delay-0 absolute transition-all left-0 h-px group-hover:w-[80%] group-hover:delay-200 bg-card -bottom-0.5'></span>

                        </Link>
                    ))}
                    <Link href="cv.pdf" download="satpal_singh-software_developer.pdf" className="w-full lg:w-fit">
                        <Button className="rounded-full border bg-primary/50 lg:!bg-transparent border-white/20 [&_svg]:size-2 relative group overflow-hidden w-full lg:w-fit">
                            <span className="relative z-10  flex gap-1 items-center">
                                Resume
                                <MoveUpRight />
                            </span>
                            <div className="absolute top-0 translate-y-full h-full w-full rounded-full group-hover:translate-y-0 transition-all duration-500 bg-primary"></div>
                        </Button>
                    </Link>
                </nav>
            </div>
        </header >
    )
}

export default Header
