import { lessons, units } from "@/db/schema"
import { FC } from "react"
import UnitBanner from "./unit-banner";
import LessonButton from "./lesson-button";

type UnitProps = {
    id: number,
    order: number,
    title: string,
    description: string,
    lessons: (typeof lessons.$inferSelect & {
        completed: boolean
    })[],
    activeLesson: typeof lessons.$inferSelect & {
        unit: typeof units.$inferSelect;
    } | undefined,
    activeLessonPercentage: number
}

const Unit: FC<UnitProps> = ({
    activeLesson,
    activeLessonPercentage,
    description,
    id,
    lessons,
    order,
    title
}) => {
    return (
        <>
            <UnitBanner title={title} description={description} />
            <div className="flex items-center flex-col relative">
                {lessons.map((lesson, index) => {
                    const isCurrent = lesson.id === activeLesson?.id;
                    const isLocked = !lesson.completed && !isCurrent;

                    return (
                        <LessonButton
                            key={lesson.id}
                            id={lesson.id}
                            index={index}
                            percentage={activeLessonPercentage}
                            totalCount={lessons.length - 1}
                            current={isCurrent}
                            locked={isLocked}
                        />
                    )
                })}
            </div>
        </>
    )
}

export default Unit
