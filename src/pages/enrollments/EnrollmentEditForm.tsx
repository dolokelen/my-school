import { Box, Button, Select, Stack, Text } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";
import { hasPermission } from "../../Utilities/hasPermissions";
import { http_400_BAD_REQUEST_CUSTOM_MESSAGE } from "../../Utilities/httpErrorStatus";
import { enrollmentStatus } from "../../accounts/data";
import { red, teal } from "../../cacheKeysAndRoutes";
import { useCourses } from "../../hooks/useCourses";
import {
  useEditEnrollment,
  useEnrollment,
  useEnrollmentCourses,
} from "../../hooks/useEnrollments";
import { useSemesters } from "../../hooks/useSemesters";
import AccessDenyPage from "../AccessDenyPage";

const schema = z.object({
  id: z.number().optional(),
  student: z.number().optional(),
  course: z.number({ invalid_type_error: "Course is required" }),
  section: z.number({ invalid_type_error: "Section is required" }),
  semester: z.number({ invalid_type_error: "Semester is required" }),
  school_year: z.number({ invalid_type_error: "School year is required" }),
  status: z.string().min(1, { message: "Status is required" }),
});

export type EnrollmentEditFormData = z.infer<typeof schema>;

interface Props {
  enrollmentId: number;
}
const EnrollmentEditForm = ({ enrollmentId }: Props) => {
  const [selectedCourseId, setSelectedCourseId] = useState<number[]>([]);
  const location = useLocation();
  const studentId = parseInt(location.pathname.substring(25, 27));

  const { data: enrollment } = useEnrollment(studentId, enrollmentId);
  const { data: eligibleCourses } = useEnrollmentCourses(studentId!);
  const { data: courses } = useCourses();
  const { data: semesters } = useSemesters();

  const onCreate = () => toast.success("Enrollment Updated Successfully!");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EnrollmentEditFormData>({ resolver: zodResolver(schema) });

  const mutation = useEditEnrollment(studentId!, onCreate);
  const onSubmit = (data: EnrollmentEditFormData) => {
    mutation.mutate({ ...data, id: enrollmentId, student: studentId });
  };

  useEffect(() => {
    if (enrollment) {
      setValue("course", enrollment.course.id);
      setValue("section", enrollment.section.id);
      setValue("semester", enrollment.semester.id);
      setValue("school_year", enrollment.school_year.id);
      setValue("status", enrollment.status);
    }
  }, [setValue, enrollment]);

  const customErrorMessage = http_400_BAD_REQUEST_CUSTOM_MESSAGE(mutation);
  if (!hasPermission("Can add enrollment")) return <AccessDenyPage />;
  const my = 2;
  const fontSize = "1rem";

  const handleSelectedCourseSections = () => {
    const enrollmentCourseId = enrollment?.course.id;
    if (enrollmentCourseId === selectedCourseId[0])
      return courses?.find((cos) => cos.id === enrollmentCourseId)?.sections;

    if (selectedCourseId) {
      const courseSections = eligibleCourses?.find(
        (cos) => cos.id === selectedCourseId[0]
      )?.sections;

      return courseSections;
    }
    return [{ id: 0, name: "" }];
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack marginBottom={2}>
          <Box my={my}>
            <Text fontSize={fontSize}>Course Code</Text>
            <Select
              {...register("course", { valueAsNumber: true })}
              onChange={(e) => {
                const id = Array.from(e.target.selectedOptions, (opt) =>
                  parseInt(opt.value)
                );
                setSelectedCourseId(id);
              }}
            >
              <option value={enrollment?.course.id}>
                {enrollment?.course.code}
              </option>
              {eligibleCourses?.map((cos) => ( cos.id !== enrollment?.course.id ?
                <option value={cos.id} key={cos?.id}>
                  {cos?.code}
                </option>
              : cos.id))}
            </Select>
            {errors?.course && <Text color={red}>{errors.course.message}</Text>}
          </Box>

          <Box my={my}>
            <Text fontSize={fontSize}>Section</Text>
            <Select {...register("section", { valueAsNumber: true })}>
              <option value={enrollment?.section.id}>
                {enrollment?.section.name}
              </option>
              {handleSelectedCourseSections()?.map((sec) => (sec.id !== enrollment?.section.id ?
                <option value={sec.id} key={sec.id}>
                  {sec.name}
                </option>
              : sec.id))}
            </Select>
            {errors?.section && (
              <Text color={red}>{errors.section.message}</Text>
            )}
          </Box>

          <Box my={my}>
            <Text fontSize={fontSize}>Semester</Text>
            <Select {...register("semester", { valueAsNumber: true })}>
              {semesters?.map((sem) =>
                !sem.is_current ? (
                  sem.id
                ) : (
                  <option value={sem.id} key={sem.id}>
                    {sem.name}
                  </option>
                )
              )}
            </Select>
            {errors?.semester && (
              <Text color={red}>{errors.semester.message}</Text>
            )}
          </Box>

          <Box my={my}>
            <Text fontSize={fontSize}>School Year</Text>
            <Select {...register("school_year", { valueAsNumber: true })}>
              {semesters?.map((sem) =>
                !sem.is_current ? (
                  sem.id
                ) : (
                  <option value={sem.school_year.id} key={sem.id}>
                    {sem.school_year.year}
                  </option>
                )
              )}
            </Select>
            {errors?.school_year && (
              <Text color={red}>{errors.school_year.message}</Text>
            )}
          </Box>

          <Box my={my}>
            <Text fontSize={fontSize}>Status</Text>
            <Select {...register("status")}>
              {enrollmentStatus?.map((status) => (
                <option value={status.name} key={status.id}>
                  {status.name}
                </option>
              ))}
            </Select>
            {errors?.status && <Text color={red}>{errors.status.message}</Text>}
          </Box>
        </Stack>
        <Button
          isActive
          type="submit"
          colorScheme={teal}
          onClick={() => mutation.isError && toast.error(customErrorMessage)}
        >
          Update Now
        </Button>
      </form>
    </>
  );
};

export default EnrollmentEditForm;
