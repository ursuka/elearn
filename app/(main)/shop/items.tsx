"use client"

import { refillHearts } from '@/actions/user-progress';
import { createStripeUrl } from '@/actions/user-subscription';
import { Button } from '@/components/ui/button';
import { POINTS_TO_REFILL } from '@/constants';
import Image from 'next/image';
import { FC, useTransition } from 'react'
import { toast } from 'sonner';

type ItemsProps = {
    hearts: number;
    points: number;
    hasActiveSubscription: boolean;
}

const Items: FC<ItemsProps> = ({
    hasActiveSubscription,
    hearts,
    points
}) => {
    const [pending, startTransition] = useTransition();

    const handleHeartRefill = () => {
        if (pending || hearts === 5 || points < POINTS_TO_REFILL) return;
        startTransition(() => {
            refillHearts()
                .catch(() => toast.error('Something went wrong, Please try again.'))
        })
    }

    const handleUpgrade = () => {
        startTransition(() => {
            createStripeUrl()
                .then((response) => {
                    if (response.data) {
                        window.location.href = response.data
                    }
                })
                .catch(() => toast.error("Something went wrong. Please try again."))
        })
    }

    return (
        <ul className='w-full'>
            <div className='flex items-center w-full p-4 gap-x-4 border-t-2'>
                <Image
                    src={'/heart.svg'}
                    alt={'Heart'}
                    height={60}
                    width={60}
                />
                <div className='flex-1'>
                    <p className='text-neutral-700 text-base lg:text-xl font-bold'>
                        Refill hearts
                    </p>
                </div>
                <Button
                    disabled={
                        hearts === 5
                        || points < POINTS_TO_REFILL
                        || pending
                    }
                    onClick={handleHeartRefill}
                >
                    {hearts === 5
                        ? "Full"
                        : (
                            <div className='flex items-center'>
                                <Image
                                    src={'/points.svg'}
                                    alt='points'
                                    height={20}
                                    width={20}
                                    className='mr-1'
                                />
                                <p>{POINTS_TO_REFILL}</p>
                            </div>
                        )
                    }
                </Button>
            </div>
            <div className='flex items-center w-full p-4 pt-8 gap-x-4 border-t-2'>
                <Image
                    src={'/unlimited.svg'}
                    alt="Unlimited"
                    height={60}
                    width={60}
                />
                <div className='flex-1'>
                    <p className='text-neutral-700 text-base lg:text-xl font-bold'>
                        Unlimited hearts
                    </p>
                </div>
                <Button
                    onClick={handleUpgrade}
                    disabled={pending }
                >
                    {hasActiveSubscription ? "settings" : "Upgrade"}
                </Button>
            </div>
        </ul>
    )
}

export default Items
