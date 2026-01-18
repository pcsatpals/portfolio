import Link from "next/link"


const Footer = () => {
    return (
        <footer className=" body-font flex flex-col gap-[73px] mx-auto max-w-[1130px] font-preahvihear-sans py-[209px]">
            <p className="text-2xl ">Contact</p>
            <div className="flex flex-col gap-10 max-w-[703px]">
                <p>
                    I’m open to new job opportunities and freelance work, onsite or remote.
                    Let’s build accessible, meaningful digital experiences together.
                </p>
                <Link target="_blank" href="mailto:pcsatpals@gmail.com" className="underline">pcsatpals@gmail.com</Link>
            </div>
        </footer >
    )
}

export default Footer
