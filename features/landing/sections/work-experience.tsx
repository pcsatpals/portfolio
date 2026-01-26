"use client";

import Image from 'next/image'
import { motion } from "motion/react"

const WorkExperience = () => {
    return (
        <motion.div
            initial={{ y: "10%", opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.93, ease: "easeIn" }}
            className='flex flex-col gap-11 relative font-preahvihear-sans mt-30 w-full px-6 sm:px-10 xl:px-0'>
            <div className='xl:w-156.25 sm:w-60 w-[50%] xl:h-175 sm:h-80 h-50 rounded-full opacity-40 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2'
                style={{
                    background: 'radial-gradient(circle, #763CAC 0%, rgb(50, 15, 133, 0) 68%)',
                }}
            />
            <p className='text-3xl sm:text-5xl xl:text-[50px]  text-center sm:text-left '>Work Experience</p>
            <motion.div
                initial={{ y: "10%", opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.93, ease: "easeIn", delay: 0.2 }}
                className='w-full grid sm:grid-cols-2 grid-cols-1'>
                <div className='w-full  h-fit xl:h-48 rounded-2xl xl:px-12.5 px-6 py-5 xl:py-9 bg-[linear-gradient(to_right,#130428_7%,#251043_34%,#38126D_57%,#261045_85%,#190634_100%)] border-t-4 border-primary flex items-center gap-6.25 hover:shadow-2xl hover:shadow-purple-800 transition-all'>
                    <Image src="/work-exp.svg" height={1200} width={1200} alt='work Experience' className='xl:h-28.75 h-20 w-auto' />
                    <div className='flex flex-col gap-3'>
                        <p className='font-jakarta-sans text-xl xl:text-[26px] font-semibold'>Software Developer</p>
                        <p className='xl:text-sm text-xs'>Designing and developing reliable software products.</p>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}

export default WorkExperience
