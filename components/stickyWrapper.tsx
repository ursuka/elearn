import { FC, ReactNode } from 'react'

interface StickyWrapperProps {
    children: ReactNode; 
}

const StickyWrapper: FC<StickyWrapperProps>  = ({ children }) => {
    return (
        <div className='hidden lg:block w-92 sticky self-end bottom-6'>
            <div className='min-h-[calc(100vh-48px)] sticky top-6 flex flex-col gap-y-4'>
                {children}
            </div>
        </div>
    )
}

export default StickyWrapper