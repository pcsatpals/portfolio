import { Projects } from '@/features/landing'
import React from 'react'

const ProjectPage = () => {
    return (
        <main className="flex flex-col gap-6 min-h-screen items-center max-w-6xl mx-auto">
            <h1 className='text-2xl leading-tight sm:text-4xl lg:text-5xl font-jakarta-sans font-bold w-full pt-6 pl-6 sm:pl-10 lg:pl-12 xl:px-0'>All Projects</h1>
            <Projects showAll />
        </main>
    )
}

export default ProjectPage
