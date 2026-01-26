"use client";

import { fetchProjects } from '@/features/admin/projects/services/get-projects';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react'
import { useInView } from "react-intersection-observer";
import Wrapper from '../layout/wrapper';
import Loader from '@/components/common/loader';
import ProjectList from './project-list';

const Projects = () => {
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
    if (status === "pending" && !data) return <Wrapper><Loader className='mt-10 w-screen' /></Wrapper>;
    if (status === "error" || error) return <Wrapper>Error loading comments</Wrapper>;

    return (
        <Wrapper>
            <ProjectList data={data} />
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
        </Wrapper>
    )
}

export default Projects
