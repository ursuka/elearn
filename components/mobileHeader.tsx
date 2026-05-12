import { FC } from 'react'
import MobileSideBar from './mobileSideBar'

const MobileHeader: FC = () => {
  return (
    <nav className='lg:hidden px-6 h-12.5 flex items-center border-b bg-green-500 fixed top-0 w-full z-50'>
      <MobileSideBar />
    </nav>
  )
}

export default MobileHeader
