import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react"
import SideBarItem from "./sideBarItem";
import { ClerkLoading, ClerkLoaded, UserButton } from "@clerk/nextjs";
import { Loader } from 'lucide-react'

interface SideBarProps {
    className?: string;
}

const SideBar: FC<SideBarProps> = ({ className }) => {
    return (
        <div className={cn(
            "h-full lg:w-64 lg:fixed flex left-0 top-0 px-4 border-r-2 flex-col",
            className
        )}>
            <Link href={'/learn'} >
                <div className='pt-8 pl-4 pb-7 flex items-center gap-x-3'>
                    <Image src={'/logo.svg'} alt={'Elearn Logo'} height={40} width={40} />
                    <h1 className='text-2xl font-extrabold text-green-500 tracking-wide'>
                        ELearn
                    </h1>
                </div>
            </Link>
            <div className="flex flex-col gap-y-2 flex-1">
                <SideBarItem label="Learn" iconSrc="/learn.svg" href="/learn" />
                <SideBarItem label="LeaderBoard" iconSrc="/leaderboard-medal.svg" href="/leaderboard" />
                <SideBarItem label="Quests" iconSrc="/quests-target.svg" href="/quests" />
                <SideBarItem label="Shop" iconSrc="/shop-bags.svg" href="/shop" />
            </div>
            <div className="p-4">
                <ClerkLoading>
                    <Loader className="h-5 w-5 text-muted-foreground" />
                </ClerkLoading>
                <ClerkLoaded>
                    <UserButton />
                </ClerkLoaded>
            </div>
        </div>
    )
}

export default SideBar
