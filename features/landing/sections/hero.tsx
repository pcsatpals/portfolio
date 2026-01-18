import Image from 'next/image'
import Arrow from "@/public/Arrow.svg"
import SL_Logo from "@/public/sl-logo.svg"

const Hero = () => {
    return (
        <div className='flex flex-col gap-3 w-full font-preahvihear-sans'>
            <div className='flex mt-21.75 w-full'>
                <div className='w-[40%] h-107.75 lg:h-125 inset-0 bg-transparent rounded-full overflow-visible relative'
                    style={{
                        background: 'radial-gradient(circle, #763CAC 0%, rgb(50, 15, 133, 0) 65%)',
                    }}
                >
                    <Image src="/Me.png" height={1800} width={1800} className='size-[258px] absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2' alt='Me' />
                    <div className='absolute  left-[70%] flex'>
                        <Arrow className="h-20.75 lg:h-25.75  w-22.75 lg:w-30.25 " />
                        <p className='font-preahvihear-sans text-nowrap mt-4 -ml-4'>Hello I Am <span className='text-primary'>Satpal Singh</span></p>
                    </div>
                </div>
                <div className='flex flex-col justify-center  -ml-10 '>
                    <p className='text-[17px] underline decoration-gray-300'>A Developer who</p>
                    <div className='w-120 text-wrap text-[48px]'>
                        <p>Judges a Product by its code...</p>
                    </div>
                    <p className='text-sm'>Because if it doesn’t work properly, what else can?</p>
                </div>
            </div>
            <div>
                <p className='text-[50px]'>{"I'm a Software Developer"}.</p>
                <div className='text-sm flex items-center gap-2'>{"Currently, I'm working as a Software Developer at "}<SL_Logo className="h-8 w-20 shrink-0" /></div>
            </div>
            <p className='text-[22px] mt-25 sm:max-w-[80%]'>
                A self-taught software developer, working in the industry for 3+ years.
                I build reliable and scalable digital solutions that strike the right balance
                between performance, maintainability, and business goals.
            </p>

        </div>
    )
}

export default Hero
