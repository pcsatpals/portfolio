import { Project } from '@/types/portfolio.types'
import { InfiniteData } from '@tanstack/react-query'
import ProjectItem from './project-item';
import { useEffect, useState } from 'react';
import { closestCenter, DndContext, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { toast } from 'react-toastify';
import axios from 'axios';

const ProjectList = ({ data }: { data: InfiniteData<{ docs: Project[] }, unknown> }) => {
    const [orderedItems, setOrderedItems] = useState<Project[]>([]);

    useEffect(() => {
        if (data) {
            const flattened = data.pages.flatMap((page) => page.docs);
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setOrderedItems(flattened);
        }
    }, [data]);

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const oldIndex = orderedItems.findIndex((item) => item._id === active.id);
            const newIndex = orderedItems.findIndex((item) => item._id === over.id);

            // Update local state immediately for UI responsiveness
            const newOrder = arrayMove(orderedItems, oldIndex, newIndex);
            setOrderedItems(newOrder);

            // Prepare the payload for the backend bulkWrite
            const orderPayload = newOrder.map((item, index) => ({
                id: item._id,
                position: index + 1, // Or whatever logic your position field uses
            }));
            // Use toast.promise for the update
            toast.promise(axios.put("/api/projects/reorder", { order: orderPayload }), {
                pending: "Updating order...",
                success: "Order saved! 🚀",
                error: "Failed to save order 🤯",
            });
        }
    };

    return (
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext
                items={orderedItems.map(p => p._id)}
                strategy={verticalListSortingStrategy}
            >
                <div className="space-y-4">
                    {orderedItems.map((project) => (
                        <ProjectItem key={project._id} project={project} />
                    ))}
                </div>
            </SortableContext>
        </DndContext>
    )
}

export default ProjectList
