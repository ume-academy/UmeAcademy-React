import { useGetInfoCourseByIdQuery } from "@/redux/slices/course/courseApiSlice";

const useRedirectToPurchase = () => {
  const courseId = localStorage.getItem('courseId');

  const { data: course, isLoading, isError } = useGetInfoCourseByIdQuery(courseId);

  const isEnrolled = course?.is_enrolled;

  return { isEnrolled, id: courseId };
}

export default useRedirectToPurchase;
