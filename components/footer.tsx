import { FC } from 'react'
import { Button } from './ui/button'
import Image from 'next/image'

const Footer: FC = () => {
    return (
        <footer className='hidden lg:block h-22 w-full border-t-2 border-slate-200 p-2'>
            <div className='max-w-5xl mx-auto flex items-center justify-evenly h-full overflow-hidden pb-4 hover:pb-0  hover:overflow-x-scroll overflow-y-hidden'>
                <Button size={'lg'} variant={'ghost'}>
                    <Image
                        src={'/flags/kr.svg'}
                        alt='Korean'
                        height={32}
                        width={40}
                        className='mr-4 rounded-md'
                    />
                    Korea
                </Button>
                <Button size={'lg'} variant={'ghost'} >
                    <Image
                        src={'/flags/cn.svg'}
                        alt='China'
                        height={32}
                        width={40}
                        className='mr-4 rounded-md'
                    />
                    China
                </Button>
                <Button size={'lg'} variant={'ghost'} >
                    <Image
                        src={'/flags/de.svg'}
                        alt='German'
                        height={32}
                        width={40}
                        className='mr-4 rounded-md'
                    />
                    German
                </Button>
                <Button size={'lg'} variant={'ghost'} >
                    <Image
                        src={'/flags/es.svg'}
                        alt='Spain'
                        height={32}
                        width={40}
                        className='mr-4 rounded-md'
                    />
                    Spain
                </Button>
                <Button size={'lg'} variant={'ghost'} >
                    <Image
                        src={'/flags/gb.svg'}
                        alt='Greate Britain'
                        height={32}
                        width={40}
                        className='mr-4 rounded-md'
                    />
                    Greate Britain
                </Button>
                <Button size={'lg'} variant={'ghost'} >
                    <Image
                        src={'/flags/it.svg'}
                        alt='Italia'
                        height={32}
                        width={40}
                        className='mr-4 rounded-md'
                    />
                    Italia
                </Button>
                <Button size={'lg'} variant={'ghost'} >
                    <Image
                        src={'/flags/jp.svg'}
                        alt='Japan'
                        height={32}
                        width={40}
                        className='mr-4 rounded-md'
                    />
                    Japan
                </Button>
                <Button size={'lg'} variant={'ghost'} >
                    <Image
                        src={'/flags/ru.svg'}
                        alt='Russia'
                        height={32}
                        width={40}
                        className='mr-4 rounded-md'
                    />
                    Russian
                </Button>
                <Button size={'lg'} variant={'ghost'} >
                    <Image
                        src={'/flags/ro.png'}
                        alt='Romania'
                        height={32}
                        width={40}
                        className='mr-4 rounded-md'
                    />
                    Romania
                </Button>
            </div>
        </footer>
    )
}

export default Footer
