import { FC, ReactNode } from 'react'

interface FeedWrapperProps {
    children: ReactNode
}

const FeedWrapper: FC<FeedWrapperProps> = ({ children }) => {
    return (
        <div className='flex-1 relative top-0 pb-10'>
            {children}
        </div>
    )
}

export default FeedWrapper