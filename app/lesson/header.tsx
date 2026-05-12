import { Progress } from '@/components/ui/progress';
import { useExitModal } from '@/store/use-exit-modal';
import { InfinityIcon, X } from 'lucide-react';
import Image from 'next/image';
import { FC } from 'react'

type HeaderProps = {
    hearts: number;
    percentage: number;
    hasActiveSubscription: boolean
}

const Header: FC<HeaderProps> = ({ hasActiveSubscription, hearts, percentage }) => {
    const { open } = useExitModal();

    return (
        <header className='lg:pt-12.5 pt-5 px-10 flex gx-7 items-center justify-center max-w-285 mx-auto w-full'>
            <X
                onClick={open}
                className='text-slate-500 hover:opacity-75 transition cursor-pointer mr-3'
            />
            <Progress value={percentage} />
            <div className='text-rose-500 flex items-center font-bold'>
                <Image
                    src='/heart.svg'
                    height={28}
                    width={28}
                    alt='Heart'
                    className='mx-3'
                />
                {hasActiveSubscription
                    ? <InfinityIcon className='h-6 w-6 stroke-3 shrink-0' />
                    : hearts
                }
            </div>
        </header>
    )
}

export default Header
