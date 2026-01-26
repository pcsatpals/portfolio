import { cn } from '@/lib/utils'
import { LoaderCircle } from 'lucide-react'

const Loader = ({ className }: { className?: string }) => {
    return (
        <div className={cn('flex items-center w-full justify-center', className)}>
            <LoaderCircle className='animate-spin' />
        </div>
    )
}

export default Loader
