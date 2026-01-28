"use client"

import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchProjects } from '@/features/admin/projects/services/get-projects';
import { useEffect } from "react";
import { Project } from "@/types/portfolio.types";
import Image from "next/image";
import Link from "next/link";
import { Github, Globe } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "motion/react"

const MotionImage = motion(Image)

const Projects = ({ showAll = false }: { showAll?: boolean }) => {
    const { ref, inView } = useInView();
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
    } = useInfiniteQuery({
        queryKey: ["projects"],
        queryFn: fetchProjects,
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            return lastPage.hasNextPage ? lastPage.nextPage : undefined;
        },
    });

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

    if (status == "pending") {
        return <div className="flex flex-col gap-10 mt-8 justify-start w-full px-6 sm:px-10 xl:px-0">
            <ProjectSkeleton />
            <ProjectSkeleton isEven />

        </div>
    }

    return (
        <div className="flex flex-col gap-4 mt-8 justify-start w-full px-6 sm:px-10 xl:px-0">
            <div className="w-full">
                {data?.pages.map((page, ix) => (
                    <div className="flex flex-col gap-10" key={ix}>
                        {page.docs.map((item: Project, ix: number) => {
                            const isEven = (ix + 1) % 2 == 0
                            const showFeatureHeading = ix == 0 && !showAll
                            return (
                                <ProjectCard
                                    project={item}
                                    isEven={isEven}
                                    showFeatureHeading={showFeatureHeading}
                                    key={item._id}
                                />
                            )
                        })

                        }
                    </div>
                ))}
            </div>
            {/* Invisible div to trigger infinite scroll */}
            {showAll ? <div ref={ref} className="h-10 flex justify-center items-center">
                {isFetchingNextPage ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-primary"></div>
                ) : hasNextPage ? (
                    "Scroll for more"
                ) : (
                    <p className="text-sm text-muted-foreground">No more projects.</p>
                )}
            </div> :
                <Link
                    href="/projects"
                    className="text-center bg-header border border-white/10 w-fit text-sm mx-auto px-4 sm:px-8 py-2 sm:py-3 rounded-full backdrop-blur-3xl hover:opacity-90 hover:text-white/80 font-preahvihear-sans"
                >
                    See All
                </Link>
            }
        </div>
    )
}

type ProjectCardProps = {
    project: Project,
    isEven: boolean,
    showFeatureHeading: boolean
}

const ProjectCard = ({ project, isEven, showFeatureHeading }: ProjectCardProps) => (
    <div
        className={`flex items-center ${isEven ? "lg:flex-row-reverse" : "lg:flex-row"} flex-col border-b border-white/15 py-6 lg:py-0 lg:border-none`}
        key={project._id}>
        <motion.div
            initial={{ x: isEven ? "10%" : "-10%", opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`relative z-10 flex flex-col ${isEven ? "items-end" : ""} overflow-visible gap-3 sm:gap-5 lg:w-1/2 shrink-0 lg:p-6`}>
            <span>
                {showFeatureHeading &&
                    <p className="text-lg sm:text-2xl mb-2 font-jakarta-sans text-primary font-semibold">
                        Feature Projects
                    </p>
                }
                <p className="text-2xl leading-tight sm:text-3xl lg:text-4xl font-jakarta-sans font-bold">
                    {project.title}
                </p>
            </span>
            <div
                className="bg-linear-to-br from-white/5 to-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6  border border-white/10 shadow-lg  w-full lg:w-[calc(100%+15%)] ">
                <p className="line-clamp-5">
                    {project.description}
                </p>
            </div>
            <div className="flex gap-4 sm:p-3 sm:py-1">
                <Link
                    href={project.live_url}
                    target="_blank"
                    className="[&_svg]:size-5 sm:[&_svg]:size-6">
                    <Globe />
                </Link>
                {project.git_hub && <Link
                    href={project.git_hub}
                    target="_blank"
                    className="[&_svg]:size-5 sm:[&_svg]:size-6"
                >
                    <Github />
                </Link>}
            </div>
            <div className={`h-full absolute w-full top-0 rounded-full ${isEven ? "right-0" : "left-0"}`}
                style={{
                    background: 'radial-gradient(circle, #763CAC50 0%, rgba(50, 15, 133, 0) 65%)',
                }} />
        </motion.div>
        <MotionImage
            initial={{ x: isEven ? "-10%" : "10%", opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.3, ease: "easeOut", delay: 0.4 }}
            src={project.project_image || ""}
            height={1600}
            width={1600}
            className="w-full lg:w-1/2 shrink-0 aspect-4/3 h-full object-contain"
            alt={project.title}
        />
    </div>
)

const ProjectSkeleton = ({ isEven = false }: { isEven?: boolean }) => (
    <div
        className={`flex items-center ${isEven ? "sm:flex-row-reverse" : "sm:flex-row"} flex-col `}
    >
        <div className={`relative flex flex-col ${isEven ? "items-end" : ""} overflow-visible gap-3 sm:gap-5 sm:w-1/2 shrink-0 p-6`}>
            {!isEven &&
                <Skeleton className=" w-75 h-10 -mb-3" />
            }
            <Skeleton className="mb-2 w-[80%] ml-0 h-12" />
            <Skeleton className="w-full h-20 lg:w-[calc(100%+15%)] " />
            <div className="flex gap-4 sm:p-3 sm:py-1">
                <Skeleton className="h-8 w-8" />
            </div>
        </div>
        <Skeleton className=" w-full grow sm:w-1/2  min-h-75" />
    </div>
)

export default Projects
