import { Hero, WorkExperience } from "@/features/landing"

const AboutMePage = () => {
    return (
        <main className="flex flex-col min-h-screen items-center max-w-6xl mx-auto">
            <Hero />
            <WorkExperience />
        </main>
    )
}

export default AboutMePage
