"use client";

import { motion } from "motion/react"
import TechSVG from "@/public/tech.svg"

const CTA = () => (
    <div className='flex flex-col gap-8 w-full sm:mt-40 mt-20 font-preahvihear-sans'>
        <motion.div
            initial={{ y: "10%", opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.93, ease: "easeIn" }}
            className='flex flex-col w-full  items-center px-6 sm:px-10 xl:px-0'>
            <p className='xl:text-[26px] sm:text-2xl text-xl text-center w-fit px-5 sm:px-0'>
                {"I'm currently looking to join a"} <span className='text-primary'>cross-functional team </span>
            </p>
            <p className="mt-1 xl:text-lg text-sm text-center">{"that builds meaningful software, with a strong focus on accessibility"} </p>
        </motion.div>
        <motion.div
            initial={{ y: "10%", opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.93, ease: "easeIn" }}
            className='sm:[&_svg]:h-126 [&_svg]:w-full px-4 xl:[&_svg]:h-164'>
            <TechSVG />
        </motion.div>
    </div>
)

export default CTA
