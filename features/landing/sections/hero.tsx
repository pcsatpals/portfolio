"use client";

import Image from 'next/image'
import Arrow from "@/public/Arrow.svg"
import SL_Logo from "@/public/sl-logo.svg"
import { TypingAnimation } from '@/components/ui/typing-animation'
import { motion } from "motion/react"
import Circle from '@/public/circle.svg'

const Hero = () => (
    <div className='flex flex-col gap-3 w-full font-preahvihear-sans'>
        <div className='flex sm:flex-row flex-col items-center sm:items-auto -mt-10 sm:mt-10 xl:mt-21.75 w-full'>
            <motion.div
                initial={{ x: "-10%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className=' w-67 sm:w-85 xl:w-[30%] h-85 sm:h-107.75 sm:ml-8 mt-16 sm:mt-0 sm:mx-0 inset-0 bg-transparent rounded-full overflow-visible relative'
                style={{
                    background: 'radial-gradient(circle, #763CAC50 0%, rgba(50, 15, 133, 0) 65%)',
                }}
            >
                <Image
                    src="/Me.png"
                    width={1800}
                    height={1800}
                    alt="Me"
                    className="size-42 sm:size-49.5 z-10 absolute top-[60%] sm:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                />
                <div className='absolute left-6  sm:left-[70%]  flex flex-col sm:flex-row gap-2'>
                    <Arrow className="hidden sm:block h-20.75 lg:h-26.75 w-auto shrink-0" />
                    <p className='font-preahvihear-sans text-nowrap mt-4 -ml-4'>Hello I Am <span className='text-primary'>Satpal Singh</span></p>
                    <Arrow className="h-16 scale-x-[-1] ml-auto translate-x-[60%] rotate-60 sm:hidden -mt-1 lg:h-26.75 w-auto shrink-0" />
                </div>
            </motion.div>
            <motion.div
                initial={{ x: "10%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className='flex flex-col  text-center sm:text-left justify-center sm:-ml-10 sm:mt-0 -mt-10 px-6 sm:px-0 '>
                <p className='sm:text-[17px] text-sm underline decoration-gray-300'>A Developer who</p>
                <h1 className='text-3xl sm:text-4xl tracking-tight lg:text-6xl font-semibold text-white leading-tight'>
                    Judges a Product
                    <br />
                    by its <span className='relative inline-block text-primary [&_svg]:size-[calc(100%+16px)]'>
                        code
                        <Circle className=" -ml-2 absolute -top-2 rotate-12" />
                    </span>...</h1>
                <p className='sm:text-sm text-xs mt-2'>Because if it doesn’t work properly, what else can?</p>
            </motion.div>
        </div>
        <motion.div
            initial={{ y: "10%", opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: "easeIn" }}
            className='px-6 sm:px-10 xl:px-0 sm:mt-0 mt-10  text-center sm:text-left flex flex-col gap-4'>
            <div className='text-3xl sm:text-5xl xl:text-[50px]'>
                {"I'm a "}
                <TypingAnimation
                    words={["Software Developer", "Software Engineer", "Full Stack Developer", "MERN Stack Developer", "Frontend Developer", "ReactJS Developer", "NextJS Developer", "Backend Developer"]}
                    blinkCursor={true}
                    pauseDelay={1000}
                    loop
                    className="text-3xl sm:text-5xl xl:text-[50px] font-bold"
                >
                    Blinking cursor
                </TypingAnimation>
            </div>
            <div className='sm:text-sm text-xs flex flex-col items-center sm:flex-row w-full sm:justify-start gap-1'>
                {"Currently, I'm working as a Software Developer at "}
                <SL_Logo className="h-8 w-20 shrink-0" />
            </div>
        </motion.div>
        <motion.p
            initial={{ y: "10%", opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.93, ease: "easeIn" }}
            className='text-center sm:text-left sm:text-[22px] w-full mt-25 xl:max-w-[80%] px-6 sm:px-10 xl:px-0'>
            A self-taught software developer, working in the industry for 3+ years.
            I build reliable and scalable digital solutions that strike the right balance
            between performance, maintainability, and business goals.
        </motion.p>

    </div>
)

export default Hero
