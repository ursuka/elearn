import { cn } from "@/lib/utils";
import Image from "next/image";
import { FC } from "react"

type ResultCardProps = {
    variant: 'points' | 'hearts';
    value: number
}

const ResultCard: FC<ResultCardProps> = ({
    value,
    variant
}) => {

    const imageSrc = variant === "hearts" ? "/heart.svg" : "/points.svg";

    return (
        <div className={cn(
            "rounded-2xl border-3 w-full",
            variant === 'points' && "bg-orange-400 border-orange-400",
            variant === 'hearts' && "bg-rose-500 border-rose-500"
        )}>
            <div className={cn(
                "p-1.5 text-white rounded-t-xl font-bold text-center uppercase text-xs",
                variant === 'points' && "bg-orange-400",
                variant === 'hearts' && "bg-rose-500"
            )}>
                {variant === "hearts" ? "Hearts Left" : "Total XP"}
            </div>
            <div className={cn(
                "rounded-2xl bg-white items-center flex justify-center p-3 font-bold text-lg",
                variant === 'points' && "text-orange-400",
                variant === 'hearts' && "text-rose-500"
            )}>
                <Image 
                    alt="Icon"
                    src={imageSrc}
                    height={30}
                    width={30}
                    className="mr-1.5"
                />
                {value}
            </div>
        </div>
    )
}

export default ResultCard
