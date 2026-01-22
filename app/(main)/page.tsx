import { Hero, WorkExperience } from "@/features/landing";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen items-center max-w-6xl mx-auto">
      <Hero />
      <WorkExperience />
      <div className='flex flex-col gap-8 w-full sm:mt-40 mt-20 font-preahvihear-sans'>
        <div className='flex flex-col w-full  items-center px-6 sm:px-10 xl:px-0'>
          <p className='xl:text-[26px] sm:text-2xl text-xl text-center w-fit'>
            {"I'm currently looking to join a"} <span className='text-primary'>cross-functional</span> team
          </p>
          <p className="mt-1 xl:text-lg text-sm text-center">{"that values improving people's lives through accessible design"} </p>
        </div>
        <Image src="/tech.svg" height={1200} width={1200} alt='work Experience' className='xl:h-[656px] sm:h-[504px] sm:w-auto w-full h-auto px-4' />
      </div>
    </main>
  );
}
