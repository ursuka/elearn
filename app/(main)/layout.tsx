import MobileHeader from '@/components/mobileHeader';
import SideBar from '@/components/sidebar';
import { FC, ReactNode } from 'react'

interface LayoutProps {
    children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <MobileHeader />
            <SideBar className={"hidden lg:flex"} />
            <main className='lg:pl-64 h-full pt-12.5 lg:pt-0'>
                <div className= 'max-w-264 mx-auto pt-6 h-full'>
                    {children}
                </div>
            </main>
        </>
    )
}

export default Layout
  