import { Projects } from '@/features/landing'
import React from 'react'

const ProjectPage = () => {
    return (
        <main className="flex flex-col gap-6 min-h-screen items-center max-w-6xl mx-auto">
            <h1 className='text-3xl sm:text-5xl font-preahvihear-sans w-full pt-6'>All Projects</h1>
            <Projects showAll />
        </main>
    )
}

export default ProjectPage
