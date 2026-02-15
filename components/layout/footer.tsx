"use client";

import { ChevronsUp, Github, Instagram, Linkedin } from "lucide-react"
import Heart from '@/public/heart.svg'
import Link from "next/link";
import Whatsapp from "@/public/whatsapp-icon.svg"

const links = [
    {
        icon: Linkedin,
        link: "https://www.linkedin.com/in/satpal-singh-89b03a230"
    },
    {
        icon: Github,
        link: "https://github.com/pcsatpals"
    },
    {
        icon: Instagram,
        link: "https://www.instagram.com/pcsatpals/"
    },
    {
        icon: Whatsapp,
        link: "https://wa.me/917814104770?text=Hey%20Satpal%20Singh"
    }
]


const Footer = () => {
    function topFunction() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }

    return (
        <footer className="relative">
            <div className=" body-font border-t bg-white/05 backdrop-blur-2xl border-white/15 mt-10 flex flex-col gap-10 font-preahvihear-sans  pt-10 xl:px-0  text-center sm:text-left glass-button">
                <div className="max-w-6xl mx-auto flex flex-col items-center gap-8">
                    <button className="flex flex-col gap-2 items-center" onClick={topFunction}>
                        <ChevronsUp className="animate-bounce" />
                        <p className="text-3xl">Back to Top</p>
                    </button>
                    <div className="flex gap-3 flex-col items-center">
                        <p className="font-jakarta-sans text-sm font-light">You may also find on these platform</p>
                        <div className="flex gap-3 [&_svg]:size-5">
                            {links.map((item) => (
                                <Link href={item.link} key={item.link} target="_blank" className="transition-all duration-150 hover:-translate-y-0.75">
                                    <item.icon />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="bg-header text-xs flex gap-1 items-center justify-center h-12 font-jakarta-sans font-light">
                    <p className="pr-1 border-r border-white/20">© 2026</p>
                    <div className="flex items-center gap-0.75 w-fit">
                        <span className="border-b border-white/20">Built</span>
                        with <Heart className="mt-px" /> by Satpal Singh
                    </div>
                </div>
            </div>
            <div className="h-[20%] w-full max-w-screen rounded-full -z-10 blur-3xl absolute bg-primary bottom-0 left-1/2 -translate-x-1/2" />
        </footer>
    )
}

export default Footer
