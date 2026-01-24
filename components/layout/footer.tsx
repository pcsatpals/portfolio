import Link from "next/link"


const Footer = () => {
    return (
        <footer className=" body-font flex flex-col xl:gap-18.25 gap-10 mx-auto max-w-6xl font-preahvihear-sans xl:py-42.25 py-20 px-6 sm:px-10 xl:px-0  text-center sm:text-left ">
            <p className="text-3xl sm:text-4xl">Contact</p>
            <div className="flex flex-col sm:gap-10 gap-6 max-w-175.75 sm:text-lg text-sm">
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
