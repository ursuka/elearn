"use client";

import { courses } from "@/db/schema";
import { FC, useTransition } from 'react'
import Card from "./card";
import { useRouter } from "next/navigation";
import { upsertUserProgress } from "@/actions/user-progress";
import { toast } from "sonner";

type ListProps = {
    courses: typeof courses.$inferSelect[];
    activeCourseId?: typeof courses.$inferSelect['id'];
}

const List: FC<ListProps> = ({ courses, activeCourseId }) => {
    const router = useRouter();
    const [pending, startTransition] = useTransition();

    const onClick = (id: number) => {
        if (pending) return;
        if (id === activeCourseId) return router.push('/learn');
        startTransition(() => {
            upsertUserProgress(id).catch((err) => {
                console.log(err);
                toast.error('Something went wrong');
            })
        });
    }

    return (
        <div className="pt-6 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4">
            {courses.map(course =>
                <Card key={course.id}
                    id={course.id}
                    title={course.title}
                    imageSrc={course.imageSrc}
                    onClick={onClick}
                    disabled={pending}
                    active={course.id === activeCourseId}
                />
            )}
        </div >
    )
}

export default List


