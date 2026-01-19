import Image from 'next/image'
import Arrow from "@/public/Arrow.svg"
import SL_Logo from "@/public/sl-logo.svg"
import { TypingAnimation } from '@/components/ui/typing-animation'

const Hero = () => {
    return (
        <div className='flex flex-col gap-3 w-full font-preahvihear-sans'>
            <div className='flex sm:flex-row flex-col -mt-10 sm:mt-10 xl:mt-21.75 w-full'>
                <div className='w-75 xl:w-[30%] h-107.75 mx-auto sm:mx-0 inset-0 bg-transparent rounded-full overflow-visible relative'
                    style={{
                        background: 'radial-gradient(circle, #763CAC50 0%, rgb(50, 15, 133, 0) 65%)',
                    }}
                >
                    <Image src="/Me.png" height={1800} width={1800} className='size-[198px] absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2' alt='Me' />
                    <div className='absolute left-20  sm:left-[70%] top-[70%] sm:top-[10%] flex gap-2'>
                        <Arrow className="h-20.75 lg:h-26.75  scale-x-[-1] sm:scale-x-100 sm:rotate-0 -rotate-180 w-auto shrink-0" />
                        <p className='font-preahvihear-sans text-nowrap sm:mt-4 mt-12 -ml-4'>Hello I Am <span className='text-primary'>Satpal Singh</span></p>
                    </div>
                </div>
                <div className='flex flex-col justify-center sm:-ml-10 sm:mt-0 -mt-10 px-10 sm:px-0 '>
                    <p className='sm:text-[17px] text-sm underline decoration-gray-300'>A Developer who</p>
                    <div className='sm:w-100 w-full xl:w-120 text-wrap text-3xl sm:text-4xl xl:text-[48px]'>
                        <p>Judges a Product by its code...</p>
                    </div>
                    <p className='sm:text-sm text-xs mt-2'>Because if it doesn’t work properly, what else can?</p>
                </div>
            </div>
            <div className='px-10 xl:px-0 sm:mt-0 mt-10'>
                <div className='text-3xl sm:text-5xl xl:text-[50px] '>
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
                <div className='sm:text-sm text-xs flex items-center gap-2'>{"Currently, I'm working as a Software Developer at"} <br className='sm:hidden' /> <SL_Logo className="h-8 w-20 shrink-0" /></div>
            </div>
            <p className='sm:text-[22px] w-full mt-25 xl:max-w-[80%] px-10 xl:px-0'>
                A self-taught software developer, working in the industry for 3+ years.
                I build reliable and scalable digital solutions that strike the right balance
                between performance, maintainability, and business goals.
            </p>

        </div>
    )
}

export default Hero
