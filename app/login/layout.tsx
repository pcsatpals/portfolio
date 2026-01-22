import LightRaysWrapper from '@/components/ui/light-rays-wrapper'
import { ReactNode } from 'react'

const AuthLayout = ({ children }: { children: ReactNode }) => (
    <LightRaysWrapper>
        <section className='w-full min-h-full bg-black overflow-auto absolute top-0 left-0 flex items-center justify-center sm:py-6 py-2 px-3'>
            {children}
        </section>
    </LightRaysWrapper>
)

export default AuthLayout
