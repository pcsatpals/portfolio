import { Button } from '@/components/ui/button';
import { connectDB } from '@/lib/mongodb';
import { Project } from '@/models/project.model';
import { Github, Globe } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

const ProjectDetailPage = async ({ params }: { params: Promise<{ id: string }> }) => {

    await connectDB();
    // Await params in Next.js 15+
    const { id } = await params;
    const project = await Project.findById(id).lean();

    if (!project) {
        redirect("/projects");
    }

    return (
        <main className="flex flex-col gap-6 min-h-screen items-center max-w-6xl mx-auto p-6 sm:p-10 lg:p-12 xl:px-0">
            <h1 className='text-2xl leading-tight sm:text-4xl lg:text-5xl font-jakarta-sans font-bold w-full pt-6 '>{project.title}</h1>
            {project.description != "empty" && <p className="text-sm lg:text-sm text-left w-full">{project.description}</p>}
            <Image
                src={project.project_image}
                className='w-full h-fit rounded-2xl'
                alt={project.title}
                height={1000}
                width={2000}
            />
            <div className="flex w-full gap-2">
                <Button className='rounded-full glass-button'>
                    <Link href={project.live_url} target="_blank" className='flex items-center gap-2 '>
                        <Globe /> Live Preview
                    </Link>
                </Button>
                {project.git_hub && <Button className='rounded-full'>
                    <Link href={project.git_hub} target="_blank" className='flex items-center gap-2'>
                        <Github /> Github
                    </Link>
                </Button>}
            </div>
            {project.long_description && <div className="text-sm lg:text-lg no-tailwind" dangerouslySetInnerHTML={{ __html: project.long_description }} />}
            {project.other_images.map((item, ix) => (
                <Image
                    key={ix}
                    src={item}
                    className='w-full h-fit rounded-2xl'
                    alt={project.title}
                    height={1000}
                    width={2000}
                />
            ))}
            {project.key_features && <div className="text-sm lg:text-lg" dangerouslySetInnerHTML={{ __html: project.key_features }} />}
        </main>
    )
}

export default ProjectDetailPage
