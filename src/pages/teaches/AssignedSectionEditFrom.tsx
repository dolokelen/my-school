import { Box, Button, Heading, Select, Stack, Text } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { hasPermission } from "../../Utilities/hasPermissions";
import { http_400_BAD_REQUEST_CUSTOM_MESSAGE } from "../../Utilities/httpErrorStatus";
import { red, teal } from "../../cacheKeysAndRoutes";
import { useSemesters } from "../../hooks/useSemesters";
import { useTeacher, useTeachers } from "../../hooks/useTeachers";
import {
  useCurrentCoursesWithSections,
  useEditAssignSection,
  useEnrollment,
} from "../../hooks/useTeaches";
import AccessDenyPage from "../AccessDenyPage";

const schema = z.object({
  id: z.number().optional(),
  teacher: z.number({ invalid_type_error: "Teacher is required" }),
  course: z.number({ invalid_type_error: "Course is required" }),
  section: z.number({ invalid_type_error: "Section is required" }),
  semester: z.number({ invalid_type_error: "Semester is required" }),
  school_year: z.number({ invalid_type_error: "School year is required" }),
});

export type AssignSectionEditFormData = z.infer<typeof schema>;

interface Props {
  enrollmentId: number;
  teacherId: number;
}
const AssignedSectionEditForm = ({ enrollmentId, teacherId }: Props) => {
  const [selectedCourseId, setSelectedCourseId] = useState<number[]>([]);
  const { data: teachers } = useTeachers();
  const { data: semesters } = useSemesters();
  const { data: courses } = useCurrentCoursesWithSections();
  const { data: enrollment } = useEnrollment(enrollmentId);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AssignSectionEditFormData>({ resolver: zodResolver(schema) });

  const { data: teacher } = useTeacher(teacherId);
  const onUpdate = () => toast.success("Section Updated Successfully!");
  const mutation = useEditAssignSection(onUpdate);

  useEffect(() => {
    if (enrollment) {
      setValue("teacher", enrollment.teacher.id);
      setValue("course", enrollment.course.id);
      setValue("section", enrollment.section.id);
      setValue("semester", enrollment.semester.id);
      setValue("school_year", enrollment.school_year.id);
    }
  }, [enrollment]);

  const onSubmit = (data: AssignSectionEditFormData) => {
    mutation.mutate({ ...data, id: enrollmentId });
  };
  const customErrorMessage = http_400_BAD_REQUEST_CUSTOM_MESSAGE(mutation);
  if (!hasPermission("Can change teach")) return <AccessDenyPage />;
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
          <Heading size="md" mt={8}>
            Prof. {teacher && teacher.user.full_name} Assigned Section Update
            Form
          </Heading>
          <Box my={my}>
            <Text fontSize={fontSize}>Teacher</Text>
            <Select {...register("teacher", { valueAsNumber: true })}>
              <option value={enrollment?.teacher.id}>
                {enrollment?.teacher.full_name}
              </option>
              {teachers?.map((teacher) =>
                teacher.user.id !== enrollment?.teacher.id ? (
                  <option value={teacher.user.id} key={teacher.user.id}>
                    {teacher.user.full_name}
                  </option>
                ) : (
                  teacher.user.id
                )
              )}
            </Select>
            {errors?.teacher && (
              <Text color={red}>{errors.teacher.message}</Text>
            )}
          </Box>

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
              <option value={enrollment?.section.id}>
                {enrollment?.section.name}
              </option>
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
          isActive
          type="submit"
          colorScheme={teal}
          onClick={() => mutation.isError && toast.error(customErrorMessage)}
        >
          Update Section
        </Button>
      </form>
    </>
  );
};

export default AssignedSectionEditForm;
