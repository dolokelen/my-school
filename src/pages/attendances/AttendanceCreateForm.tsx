import { Box, Button, Input, Select, Stack, Text } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { http_400_BAD_REQUEST_CUSTOM_MESSAGE } from "../../Utilities/httpErrorStatus";
import { blue, red } from "../../cacheKeysAndRoutes";
import { hasPermission } from "../../Utilities/hasPermissions";
import AccessDenyPage from "../AccessDenyPage";
import { useCurrentSemesterCourses } from "../../hooks/useSemesters";
import { useClasstimes } from "../../hooks/useClasstimes";
import { useClassrooms } from "../../hooks/useClassrooms";

const schema = z.object({
  student: z.number({ invalid_type_error: "Select a student" }),
  course: z.number({ invalid_type_error: "Course is required" }),
  section: z.number({ invalid_type_error: "Section is required" }),
  semester: z.number({ invalid_type_error: "Semester is required" }),
  school_year: z.number({ invalid_type_error: "School year is required" }),
  mark: z.string().min(1, {message: "Attendance letter is required"}),
  comment: z.string().nullable(),
});

export type SectionCreateFormData = z.infer<typeof schema>;

const SectionCreateForm = () => {
  const { data: currSemCourses } = useCurrentSemesterCourses();
  const { data: classtimes } = useClasstimes();
  const { data: classrooms } = useClassrooms();

  const onCreate = () => toast.success("Section Created Successfully!");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SectionCreateFormData>({ resolver: zodResolver(schema) });

  const mutation = useCreateSection(onCreate, () => reset());
  const onSubmit = (data: SectionCreateFormData) => {
    mutation.mutate(data);
  };

  if (!hasPermission("Can add section")) return <AccessDenyPage />;

  const customErrorMessage = http_400_BAD_REQUEST_CUSTOM_MESSAGE(mutation);
  const my = 2;
  const fontSize = "1rem";

  const hanldeCurrSemesterCourses = () => {
    if (currSemCourses) {
      const semesterObj = currSemCourses[0];
      const courses = semesterObj.courses;
      return courses;
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack marginBottom={2}>
          <Box my={my}>
            <Text fontSize={fontSize}>Section Name</Text>
            <Input {...register("name")} type="text" size="md" />
            {errors?.name && <Text color={red}>{errors.name.message}</Text>}
          </Box>

          <Box my={my}>
            <Text fontSize={fontSize}>Course</Text>
            <Select {...register("course", { valueAsNumber: true })}>
              {hanldeCurrSemesterCourses()?.map((course) => (
                <option value={course.id}>{course.code}</option>
              ))}
            </Select>
            {errors?.course && <Text color={red}>{errors.course.message}</Text>}
          </Box>

          <Box my={my}>
            <Text fontSize={fontSize}>Class Time</Text>
            <Select {...register("classtime", { valueAsNumber: true })}>
              {classtimes?.map((classtime) => (
                <option value={classtime.id}>
                  {classtime.start_time} - {classtime.end_time},{" "}
                  {classtime.week_days}
                </option>
              ))}
            </Select>
            {errors?.classtime && (
              <Text color={red}>{errors.classtime.message}</Text>
            )}
          </Box>

          <Box my={my}>
            <Text fontSize={fontSize}>Class Room</Text>
            <Select {...register("classroom", { valueAsNumber: true })}>
              {classrooms?.map((classroom) => (
                <option value={classroom.id}>{classroom.name}</option>
              ))}
            </Select>
            {errors?.classroom && (
              <Text color={red}>{errors.classroom.message}</Text>
            )}
          </Box>
        </Stack>

        <Button
          type="submit"
          colorScheme={blue}
          onClick={() => mutation.isError && toast.error(customErrorMessage)}
        >
          Create Section
        </Button>
      </form>
    </>
  );
};

export default SectionCreateForm;
