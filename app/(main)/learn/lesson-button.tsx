'use client'

import { Check, Crown, Star } from "lucide-react";
import { CircularProgressbarWithChildren } from "react-circular-progressbar"
import { FC } from "react"
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type LessonButtonProps = {
    id: number;
    index: number;
    totalCount: number;
    locked?: boolean;
    current?: boolean;
    percentage: number;
}

const LessonButton: FC<LessonButtonProps> = ({
    id,
    index,
    percentage,
    totalCount,
    current,
    locked
}) => {
    // Calculating the position for the buttons
    const cycleLength = 8;
    const cycleIndex = index % cycleLength;
    const distance = 40;

    let indentationLevel;

    if (cycleIndex <= 2) {
        indentationLevel = cycleIndex;
    } else if (cycleIndex <= 4) {
        indentationLevel = 4 - cycleIndex;
    } else if (cycleIndex <= 6) {
        indentationLevel = 4 - cycleIndex;
    } else {
        indentationLevel = cycleIndex - 8;
    }

    const rightPosition = indentationLevel * distance;

    // state for special effect
    const isFirst = index === 0;
    const isLast = index === totalCount;
    const isCompleted = !current && !locked;

    // special effect icon
    const Icon = isCompleted ? Check : isLast ? Crown : Star;

    // special effect link
    const href = isCompleted ? `/lesson/${id}` : '/lesson';

    return (
        <Link
            href={href}
            aria-disabled={locked}
            style={{ pointerEvents: locked ? 'none' : 'auto' }}
        >
            <div
                className="relative"
                style={{
                    right: `${rightPosition}px`,
                    marginTop: isFirst && !isCompleted ? 60 : 24
                }}
            >
                {current ? (
                    <div className="h-25.5 w-25.5 relative">
                        <div className="absolute -top-6 left-2.5 px-3 py-2.5 border-2 font-bold uppercase text-green-500 bg-white rounded-xl animate-bounce tracking-wide z-10">
                            Start
                            <div
                                className="absolute left-1/2 -bottom-2 w-0 h-0 border-x-8 border-x-transparent border-t-8 transform -translate-x-1/2" />
                        </div>
                        <CircularProgressbarWithChildren
                            value={Number.isNaN(percentage) ? 0 : percentage}
                            styles={{
                                path: {
                                    stroke: "#4ade80"
                                },
                                trail: {
                                    stroke: "#e5e7eb"
                                }
                            }}
                        >
                            <Button
                                size={"rounded"}
                                variant={locked ? "locked" : "secondary"}
                                className="h-17.5 w-17.5 border-b-8"
                            >
                                <Icon
                                    className={cn(
                                        "h-10! w-10!",
                                        locked
                                            ? 'fill-neutral-400 text-neutral-400 stroke-neutral-400'
                                            : 'fill-primary-foreground text-primary-foreground',
                                        isCompleted && " fill-none storke-4!"
                                    )}
                                />
                            </Button>
                        </CircularProgressbarWithChildren>
                    </div>
                ) :
                    <div>
                        <Button
                            size={"rounded"}
                            variant={locked ? "locked" : "secondary"}
                            className="h-17.5 w-17.5 border-b-8"
                        >
                            <Icon
                                className={cn(
                                    "h-10! w-10!",
                                    locked
                                        ? 'fill-neutral-400 text-neutral-400 stroke-neutral-400'
                                        : 'fill-primary-foreground text-primary-foreground',
                                    isCompleted && " fill-none storke-4!"
                                )}
                            />
                        </Button>
                    </div>
                }
            </div>
        </Link>
    )
}

export default LessonButton
