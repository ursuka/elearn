import { getCourses, getUserProgress } from "@/db/quaeries";
import List from "./list";

const CoursesPage = async () => {
    const [courses, userProgress] = await Promise.all([getCourses(), getUserProgress()]);

    return (
        <div className="h-full max-w-228 px-3 mx-auto">
            <h1 className="text-2xl font-bold text-neitral-700">
                Lang Courses
            </h1>
            <List courses={courses}
                activeCourseId={userProgress?.activeCourse?.id}
            />
        </div>
    )
}

export default CoursesPage