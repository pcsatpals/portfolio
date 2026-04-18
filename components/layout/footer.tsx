"use client";

import { Button } from "@/components/ui/button";
import Heart from '@/public/heart.svg'
import Link from "next/link";
import { ChevronsUp, Github, Instagram, Linkedin, Heart as HeartIcon } from "lucide-react"
import Whatsapp from "@/public/whatsapp-icon.svg"
import Image from "next/image";

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
        document.documentElement.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    return (
        <footer className="relative w-full bg-black overflow-hidden h-[600px] pt-20 flex items-end">
            {/* CTA Hero Section */}

            {/* Background Image with Gradient Overlay */}
            <Image
                src="/astronaut-footer.png"
                alt=""
                width={1920}
                height={1080}
                className="absolute top-[0px] animate-star-movement-top-2 left-1/2 -translate-x-1/2  w-[400px] object-cover  bg-no-repeat"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#11071f] via-[#11071f]/60 to-[#11071f]" />

            {/* Bottom Footer Area */}
            <div className="relative z-10 flex flex-col w-full gap-10 font-preahvihear-sans py-12 px-6">
                <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row justify-between items-center gap-10">
                    <button
                        className="flex flex-col gap-2 items-center group transition-all"
                        onClick={topFunction}
                    >
                        <div className="p-3 rounded-full border border-white/10 group-hover:bg-white/5 transition-colors">
                            <ChevronsUp className="animate-bounce size-6" />
                        </div>
                        <p className="text-2xl font-jakarta-sans tracking-tight">Back to Top</p>
                    </button>

                    <div className="flex flex-col items-center md:items-end gap-4">
                        <p className="font-jakarta-sans text-sm font-light text-white/40 uppercase tracking-widest">Connect with me</p>
                        <div className="flex gap-4 [&_svg]:size-5">
                            {links.map((item) => (
                                <Link
                                    href={item.link}
                                    key={item.link}
                                    target="_blank"
                                    className="p-3 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/15 transition-all duration-300 hover:-translate-y-1"
                                >
                                    <item.icon />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-center md:justify-between gap-4 max-w-6xl mx-auto w-full text-[13px] font-jakarta-sans text-white/30">
                    <div className="flex items-center gap-4">
                        <p>© 2026 Satpal Singh</p>
                        <span className="w-1 h-1 rounded-full bg-white/10" />
                        <p>All Rights Reserved</p>
                    </div>

                    <div className="flex items-center gap-1">
                        <span>Built with</span>
                        <Heart className="size-3 text-red-500 animate-pulse mx-0.5" />
                        <span>by</span>
                        <span className="text-white/60 font-medium">Satpal Singh</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer
