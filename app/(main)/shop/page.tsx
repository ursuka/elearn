import FeedWrapper from "@/components/feedWrapper"
import StickyWrapper from "@/components/stickyWrapper"
import UserProgress from "@/components/userProgress"
import { getUserProgress, getUserSubscription } from "@/db/quaeries"
import Image from "next/image"
import { redirect } from "next/navigation"
import { FC } from "react"
import Items from "./items"
import Promo from "@/components/promo"
import Quests from "@/components/quests"

const ShopPage: FC = async () => {
    const [userProgress, userSubscription] = await Promise.all([
        getUserProgress(),
        getUserSubscription(),
    ])

    if (!userProgress || !userProgress.activeCourse) { redirect('/courses') };

    const hasSubscription = !!userSubscription?.isActive;

    return (
        <div className="flex flex-row-reverse gap-12 px-6">
            <StickyWrapper>
                <UserProgress
                    activeCourse={userProgress.activeCourse}
                    hasActiveSubscription={hasSubscription}
                    hearts={userProgress.hearts}
                    points={userProgress.points}
                />
                {!hasSubscription && <Promo />}
                <Quests points={userProgress.points} />
            </StickyWrapper>
            <FeedWrapper>
                <div className="w-full flex flex-col items-center">
                    <Image
                        src={'/shop-bags.svg'}
                        alt="Shop bags"
                        height={60}
                        width={60}
                    />
                    <h1 className="text-center font-bold text-neutral-800 text-xl my-6">
                        Shop
                    </h1>
                    <p className="text-muted-foreground text-center text-lg mb-6">
                        Spend your points on cool stuff.
                    </p>
                    <Items
                        hasActiveSubscription={hasSubscription}
                        hearts={userProgress.hearts}
                        points={userProgress.points}
                    />
                </div>
            </FeedWrapper>
        </div>
    )
}

export default ShopPage
