import { CTA, Hero, Projects, WorkExperience } from "@/features/landing";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen items-center max-w-6xl mx-auto">
      <Hero />
      <WorkExperience />
      <CTA />
      <Projects />
    </main>
  );
}
