import { Box, Button, Heading, Select, Stack, Text } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";
import getPersonIdFromURL from "../../Utilities/getPersonIdFromURL";
import { hasPermission } from "../../Utilities/hasPermissions";
import { http_400_BAD_REQUEST_CUSTOM_MESSAGE } from "../../Utilities/httpErrorStatus";
import { enrollmentStatus } from "../../accounts/data";
import { blue, red } from "../../cacheKeysAndRoutes";
import {
  useCreateEnrollment,
  useEnrollmentCourses,
} from "../../hooks/useEnrollments";
import { useSemesters } from "../../hooks/useSemesters";
import { useStudent } from "../../hooks/useStudents";
import AccessDenyPage from "../AccessDenyPage";

const schema = z.object({
  student: z.number().optional(),
  course: z.number({ invalid_type_error: "Course is required" }),
  section: z.number({ invalid_type_error: "Section is required" }),
  semester: z.number({ invalid_type_error: "Semester is required" }),
  school_year: z.number({ invalid_type_error: "School year is required" }),
  status: z.string().min(1, { message: "Status is required" }),
});

export type EnrollmentCreateFormData = z.infer<typeof schema>;

const EnrollmentCreateForm = () => {
  const [selectedCourseId, setSelectedCourseId] = useState<number[]>([]);
  const location = useLocation();
  const studentId = getPersonIdFromURL(location.pathname);

  const { data: courses } = useEnrollmentCourses(studentId);
  const { data: student } = useStudent(studentId);
  const { data: semesters } = useSemesters();

  const onCreate = () => toast.success("Student Enrolled Successfully!");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EnrollmentCreateFormData>({ resolver: zodResolver(schema) });

  const mutation = useCreateEnrollment(studentId!, onCreate, () => reset());
  const onSubmit = (data: EnrollmentCreateFormData) => {
    mutation.mutate({ ...data, student: studentId });
  };

  const customErrorMessage = http_400_BAD_REQUEST_CUSTOM_MESSAGE(mutation);
  if (!hasPermission("Can add enrollment")) return <AccessDenyPage />;
  const my = 2;
  const fontSize = "1rem";

  const handleSelectedCourseSections = () => {
    if (selectedCourseId) {
      const courseSections = courses?.find(
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
          <Heading size="md">
            {student && student.user.full_name} Enrollment Form
          </Heading>
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
              {courses?.map((cos) => (
                <option value={cos.id} key={cos?.id}>
                  {cos?.code}
                </option>
              ))}
            </Select>
            {errors?.course && <Text color={red}>{errors.course.message}</Text>}
          </Box>

          <Box my={my}>
            <Text fontSize={fontSize}>Section</Text>
            <Select {...register("section", { valueAsNumber: true })}>
              {handleSelectedCourseSections()?.map((sec) => (
                <option value={sec.id} key={sec.id}>
                  {sec.name}
                </option>
              ))}
            </Select>
            {errors?.section && (
              <Text color={red}>{errors.section.message}</Text>
            )}
          </Box>

          <Box my={my}>
            <Text fontSize={fontSize}>Semester</Text>
            <Select {...register("semester", { valueAsNumber: true })}>
              {semesters?.map((sem) =>
                sem.is_current ? (
                  <option value={sem.id} key={sem.id}>
                    {sem.name}
                  </option>
                ) : (
                  sem.id
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
          type="submit"
          colorScheme={blue}
          onClick={() => mutation.isError && toast.error(customErrorMessage)}
        >
          Enroll Student
        </Button>
      </form>
    </>
  );
};

export default EnrollmentCreateForm;
