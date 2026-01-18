import { Hero, WorkExperience } from "@/features/landing";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen items-center max-w-282.5 mx-auto">
      <Hero />
      <WorkExperience />
      <div className='flex flex-col gap-8 w-full mt-40 font-preahvihear-sans'>
        <div className='flex flex-col w-full  items-center'>
          <p className='text-[26px] text-center w-fit'>
            {"I'm currently looking to join a"} <span className='text-primary'>cross-functional</span> team
          </p>
          <p className="mt-1 text-lg">{"that values improving people's lives through accessible design"} </p>
        </div>
        <Image src="/tech.svg" height={1200} width={1200} alt='work Experience' className='h-[656px] w-auto' />
      </div>
    </main>
  );
}
