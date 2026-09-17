import { connectDB } from '@/lib/mongodb';
import { Project } from '@/models/project.model';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Github, Globe } from "lucide-react";

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

            {/* Links */}
            <h2 className='text-base leading-tight sm:text-lg lg:text-xl font-jakarta-sans font-bold w-full mt-10 '>Links:</h2>
            <div className="flex gap-4 [&_svg]:size-5 w-full text-xs sm:text-sm">
                {project.live_url ? <Link
                    href={project.live_url}
                    target="_blank"
                    className="p-3 py-2 rounded-xl flex gap-2 items-center border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/15 transition-all duration-300 hover:-translate-y-1"
                >
                    <Globe /> Website
                </Link> : null
                }
                {project.git_hub ? <Link
                    href={project.git_hub}
                    target="_blank"
                    className="p-3 py-2 rounded-xl flex gap-2 items-center border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/15 transition-all duration-300 hover:-translate-y-1"          >
                    <Github />Git hub
                </Link> : null
                }
            </div>
        </main>
    )
}

export default ProjectDetailPage
