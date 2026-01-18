import Image from 'next/image'
import React from 'react'

const WorkExperience = () => {
    return (
        <div className='flex flex-col gap-[44px] relative font-preahvihear-sans mt-30 w-full'>
            <div className='w-[625px] h-[700px] rounded-full opacity-40 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2'
                style={{
                    background: 'radial-gradient(circle, #763CAC 0%, rgb(50, 15, 133, 0) 68%)',
                }}
            />
            <p className='text-[50px]'>Work Experience</p>
            <div className='w-[570px] h-[192px] rounded-2xl px-[50px] py-[36px] bg-[linear-gradient(to_right,#130428_7%,#251043_34%,#38126D_57%,#261045_85%,#190634_100%)] border-t-4 border-primary flex gap-[25px]'>
                <Image src="/work-exp.svg" height={1200} width={1200} alt='work Experience' className='h-[115px] w-auto' />
                <div className='flex flex-col gap-3'>
                    <p className='font-jakarta-sans text-[26px] font-semibold'>Software Developer</p>
                    <p className='text-sm'>Designing and developing reliable software products.</p>
                </div>
            </div>
        </div>
    )
}

export default WorkExperience
