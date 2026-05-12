import FeedWrapper from "@/components/feedWrapper"
import StickyWrapper from "@/components/stickyWrapper"
import { FC } from "react"
import Header from "./header"
import UserProgress from "@/components/userProgress"
import { getCourseProgress, getLessonPercentage, getUnits, getUserProgress, getUserSubscription } from "@/db/quaeries"
import { redirect } from "next/navigation"
import Unit from "./unit"
import Promo from "@/components/promo"
import Quests from "@/components/quests"

const LearnPage: FC = async () => {
    const [
        userProgress,
        unitsData,
        courseProgress,
        lessonProcentage,
        userSubscription

    ] = await Promise.all([
        getUserProgress(),
        getUnits(),
        getCourseProgress(),
        getLessonPercentage(),
        getUserSubscription()
    ]);

    if (!userProgress || !userProgress.activeCourse) {
        redirect('/courses');
    }

    if (!courseProgress) {
        redirect('/courses');
    }

    const hasSubscription = !!userSubscription?.isActive;

    return (
        <div className="flex flex-row-reverse gap-12 px-6">
            <StickyWrapper>
                <UserProgress
                    activeCourse={userProgress.activeCourse}
                    hearts={userProgress.hearts}
                    points={userProgress.points}
                    hasActiveSubscription={hasSubscription}
                />
                {!hasSubscription && <Promo />}
                <Quests points={userProgress.points} />
            </StickyWrapper>
            <FeedWrapper>
                <Header title={userProgress.activeCourse.title} />
                {unitsData.map((unit) => (
                    <div key={unit.id} className="mb-10">
                        <Unit
                            id={unit.id}
                            order={unit.order}
                            description={unit.description}
                            title={unit.title}
                            lessons={unit.lessons}
                            activeLesson={courseProgress.activeLesson}
                            activeLessonPercentage={lessonProcentage}
                        />
                    </div>
                ))}
            </FeedWrapper>
        </div>
    )
}

export default LearnPage
