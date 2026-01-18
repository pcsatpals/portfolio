import Logo from "@/public/logo.svg"
import Link from 'next/link'

const links = [
    {
        label: "Home",
        link: "/",
    },
    {
        label: "About",
        link: "#about",
    }
    , {
        label: "Projects",
        link: "#projects",
    }
    , {
        label: "Contact Me",
        link: "#contact",
    }
]

const Header = () => {
    return (
        <header className=" body-font sm:h-28.25 bg-header lg:sticky top-0 z-[999]">
            <div className="mx-auto max-w-[1130px] flex flex-wrap  flex-col h-full md:flex-row items-center gap-[60%]">
                <Link href="/" className="flex title-font font-medium items-center md:mb-0 [&_svg]:size-10 h-full">
                    <Logo />
                </Link>
                <nav className="md:ml-auto grow flex flex-wrap items-center text-base justify-between font-jakarta-sans">
                    {links.map((item, ix) => (
                        <Link
                            href={item.link}
                            key={ix}
                            className=" hover:text-foreground/80 group relative"
                        >
                            {item.label}
                            <span className='w-0 absolute transition-all left-0 h-0.5 group-hover:w-full delay-200 group-hover:delay-0 bg-card bottom-0'></span>
                            <span className='w-0 delay-0 absolute transition-all left-0 h-px group-hover:w-[80%] group-hover:delay-200 bg-card -bottom-0.5'></span>

                        </Link>
                    ))}
                </nav>
            </div>
        </header >
    )
}

export default Header
