"use client";

import { Button, buttonVariants } from '@/components/ui/button';
import { fetchProjects } from '@/features/admin/projects/services/get-projects';
import { cn } from '@/lib/utils';
import { Project } from '@/types/portfolio.types';
import { useInfiniteQuery } from '@tanstack/react-query';
import { PencilLine, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react'
import { useInView } from "react-intersection-observer";

const ProjectsPage = () => {
    const { ref, inView } = useInView();

    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
    } = useInfiniteQuery({
        queryKey: ["projects"],
        queryFn: fetchProjects,
        initialPageParam: 1,
        // 3. Mapping the response from mongoose-paginate-v2
        getNextPageParam: (lastPage) => {
            // mongoose-paginate-v2 returns hasNextPage (boolean) and nextPage (number)
            return lastPage.hasNextPage ? lastPage.nextPage : undefined;
        },
    });

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

    if (status === "pending" && !data) return <p>Loading Projects...</p>;
    if (status === "error" || error) return <p>Error loading comments</p>;
    return (
        <div className="space-y-6 pt-3 grow sm:overflow-y-auto no-scrollbar p-6 font-jakarta-sans">
            <div className='flex justify-between items-center'>
                <h1 className='text-4xl sm:text-5xl tracking-tight lg:text-7xl font-semibold text-white leading-tight'>Projects</h1>
                <Link
                    className={cn(buttonVariants())}
                    href={"/admin/dashboard/projects/add"}
                >
                    <Plus />
                    Add
                </Link>
            </div>
            <div className="space-y-4">
                {data.pages.map((page, i) => (
                    <div key={i} className="space-y-4">
                        {page.docs.map((project: Project) => (
                            <div key={project._id} className="flex items-center border p-4 gap-4 border-white/30 w-full rounded-xl">
                                {project.project_image ?
                                    <Image
                                        height={1600}
                                        width={1600}
                                        className='h-20 w-20 rounded-xl'
                                        alt='Project Image'
                                        src={project.project_image}
                                    /> :
                                    <video
                                        src={project.project_video}
                                        className='h-20 w-20 rounded-xl'
                                    />
                                }
                                <div className='flex flex-col gap-4 grow'>
                                    <p className="text-base sm:text-xl tracking-tight lg:text-2xl font-preahvihear-sans">
                                        {project.title}
                                    </p>
                                    <p className="text-sm sm:text-base tracking-tight lg:text-xl font-preahvihear-sans">
                                        {project.description}
                                    </p>
                                </div>
                                <div className='flex gap-2'>
                                    <Button variant='link' className='cursor-pointer'>
                                        <PencilLine /> Edit
                                    </Button>
                                    <Button className='cursor-pointer'>
                                        <Trash2 />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            {/* Invisible div to trigger infinite scroll */}
            <div ref={ref} className="h-10 flex justify-center items-center">
                {isFetchingNextPage ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-primary"></div>
                ) : hasNextPage ? (
                    "Scroll for more"
                ) : (
                    <p className="text-sm text-muted-foreground">No more projects.</p>
                )}
            </div>
        </div>
    )
}

export default ProjectsPage
