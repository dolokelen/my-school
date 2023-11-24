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
import { blue, red } from "../../cacheKeysAndRoutes";
import { useSemesters } from "../../hooks/useSemesters";
import { useTeacher } from "../../hooks/useTeachers";
import {
  useCurrentCoursesWithSections,
  useSectionAssigment,
} from "../../hooks/useTeaches";
import AccessDenyPage from "../AccessDenyPage";

const schema = z.object({
  teacher: z.number().optional(),
  course: z.number({ invalid_type_error: "Course is required" }),
  section: z.number({ invalid_type_error: "Section is required" }),
  semester: z.number({ invalid_type_error: "Semester is required" }),
  school_year: z.number({ invalid_type_error: "School year is required" }),
});

export type SectionAssignmentFormData = z.infer<typeof schema>;

const SectionAssignmentForm = () => {
  const [selectedCourseId, setSelectedCourseId] = useState<number[]>([]);
  const { data: semesters } = useSemesters();
  const { data: courses } = useCurrentCoursesWithSections();

  const location = useLocation();
  const teacherId = getPersonIdFromURL(location.pathname);

  const onCreate = () => toast.success("Section Assigned Successfully!");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SectionAssignmentFormData>({ resolver: zodResolver(schema) });

  const { data: teacher } = useTeacher(teacherId);
  const mutation = useSectionAssigment(teacherId, onCreate, () => reset());
  const onSubmit = (data: SectionAssignmentFormData) => {
    mutation.mutate({ ...data, teacher: teacherId });
  };

  const customErrorMessage = http_400_BAD_REQUEST_CUSTOM_MESSAGE(mutation);
  if (!hasPermission("Can add teach")) return <AccessDenyPage />;
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
            Prof. {teacher && teacher.user.full_name} Section Assigment Form
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
              <option></option>
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
        </Stack>
        <Button
          type="submit"
          colorScheme={blue}
          onClick={() => mutation.isError && toast.error(customErrorMessage)}
        >
          Assign Section
        </Button>
      </form>
    </>
  );
};

export default SectionAssignmentForm;
