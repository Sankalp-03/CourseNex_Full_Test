import { db } from "@/lib/db";
import { redirect } from "next/navigation";

const CourseIdPage = async ({
  params
}: {
  params: { courseId: string; }
}) => {
  // Fetching course data from database based on courseId
  const course = await db.course.findUnique({
    where: {
      id: params.courseId, // Filtering course data based on courseId
    },
    include: {
      chapters: { // Including chapters associated with the course.
        where: {
          isPublished: true, // Filtering published chapters.
        },
        orderBy: {
          position: "asc"
        }
      }
    }
  });

  if (!course) { // Redirecting to home page if course data is not available.
    return redirect("/");
  }

  return redirect(`/courses/${course.id}/chapters/${course.chapters[0].id}`);
}
 
export default CourseIdPage;