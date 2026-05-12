import { getLesson, getUserProgress, getUserSubscription } from "@/db/quaeries"
import { redirect } from "next/navigation"
import { FC } from "react"
import Quiz from "./quiz"


const LessonPage: FC = async () => {
    const [
        lesson,
        userProgress,
        userSubscription
    ] = await Promise.all([
        getLesson(),
        getUserProgress(),
        getUserSubscription()
    ])

    if (!lesson || !userProgress) { redirect('/learn') }

    const initialPercentage = lesson.challenges
        .filter((challenge) => challenge.completed)
        .length / lesson.challenges.length * 100;

    return (
        <Quiz
            initialLessonId={lesson.id}
            initialLessonChallenges={lesson.challenges}
            initialHearts={userProgress.hearts}
            initialPercentage={initialPercentage}
            userSubscription={userSubscription}
        />
    )
}

export default LessonPage
