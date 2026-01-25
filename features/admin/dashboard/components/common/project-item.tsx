import { Button } from '@/components/ui/button'
import { Project } from '@/types/portfolio.types'
import { GripVertical, PencilLine } from 'lucide-react'
import Image from 'next/image'
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities'
import DeleteDialog from './delete-dialog';
import { DraggableAttributes } from '@dnd-kit/core';
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';

const DraggableWrapper = ({ project }: { project: Project }) => {
    const { attributes,
        transform,
        transition,
        isDragging,
        setNodeRef,
        listeners
    } = useSortable({ id: project._id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 10 : 1,
        opacity: isDragging ? 0.5 : 1,
    }

    return (
        <div ref={setNodeRef} style={style} className='touch-none'>
            <div className="cursor-grab active:cursor-grabbing">
                <ProjectCard project={project} dragHandleProps={{ attributes, listeners }} />
            </div>
        </div>

    )
}


const ProjectCard = ({ project, dragHandleProps }: {
    project: Project, dragHandleProps: {
        attributes: DraggableAttributes,
        listeners?: SyntheticListenerMap
    }
}) => {
    return (
        <div key={project._id} className="flex items-center border p-4 gap-4 border-white/30 w-full rounded-xl">
            <div
                {...dragHandleProps.attributes}
                {...dragHandleProps?.listeners}
                className="cursor-grab active:cursor-grabbing p-2 hover:bg-white/10 rounded-md transition-colors"
                aria-label="Drag to reorder"
            >
                <GripVertical className="text-muted-foreground w-5 h-5" />
            </div>
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
                <DeleteDialog project={project} />
            </div>
        </div>
    )
}

export default DraggableWrapper
