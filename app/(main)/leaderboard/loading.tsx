import { Loader } from 'lucide-react'
import { FC } from 'react'

const Loading:FC = () => {
  return (
    <div className='w-full h-full flex items-center justify-center'>
      <Loader className='h-6 w-6 text-muted-foreground animated-spin' />
    </div>
  )
}

export default Loading
