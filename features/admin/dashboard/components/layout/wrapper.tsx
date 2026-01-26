import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Wrapper = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <div className={cn("space-y-6 pt-3  sm:overflow-y-auto no-scrollbar p-6 font-jakarta-sans", className)}>
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
            {children}
        </div>
    )
}

export default Wrapper
