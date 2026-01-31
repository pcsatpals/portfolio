import AddEditProjectForm from '@/features/admin/projects/components'
import { connectDB } from '@/lib/mongodb'
import { Project } from '@/models/project.model';
import { redirect } from 'next/navigation';
import React from 'react'

const EditProjectPage = async ({ params }: { params: Promise<{ id: string }> }) => {

    await connectDB();
    // Await params in Next.js 15+
    const { id } = await params;
    const project = await Project.findById(id).lean();

    if (!project) {
        redirect("/admin/dashboard");
    }
    const serializedProject = JSON.parse(JSON.stringify(project));

    return (
        <AddEditProjectForm editProject={serializedProject} />
    )
}

export default EditProjectPage
