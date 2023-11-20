import { Box, Button, Input, Select, Stack, Text } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { hasPermission } from "../../Utilities/hasPermissions";
import { http_400_BAD_REQUEST_CUSTOM_MESSAGE } from "../../Utilities/httpErrorStatus";
import { blue, red, teal } from "../../cacheKeysAndRoutes";
import { useClassrooms } from "../../hooks/useClassrooms";
import { useClasstimes } from "../../hooks/useClasstimes";
import { Section, useEditSection } from "../../hooks/useSections";
import { useCurrentSemesterCourses } from "../../hooks/useSemesters";
import AccessDenyPage from "../AccessDenyPage";
import { useEffect } from "react";

const schema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, {
    message:
      "Section name is required and must be at least a letter or a number.",
  }),
  course: z.number({ invalid_type_error: "Course is required" }),
  classroom: z.number({ invalid_type_error: "Classroom is required" }),
  classtime: z.number({ invalid_type_error: "Class time is required" }),
});

export type SectionEditFormData = z.infer<typeof schema>;

interface Props {
  section?: Section;
}

const SectionEditForm = ({ section }: Props) => {
  const { data: currSemCourses } = useCurrentSemesterCourses();
  const { data: classtimes } = useClasstimes();
  const { data: classrooms } = useClassrooms();

  const onUpdate = () => toast.success("Section Updated Successfully!");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SectionEditFormData>({ resolver: zodResolver(schema) });

  const mutation = useEditSection(onUpdate);
  const onSubmit = (data: SectionEditFormData) => {
    mutation.mutate({ ...data, id: section?.id });
  };

  useEffect(() => {
    if (section) {
      setValue("name", section.name);
      setValue("course", section.course.id);
      setValue("classtime", section.classtime.id);
      setValue("classroom", section.classroom.id);
    }
  }, [setValue, section]);

  const customErrorMessage = http_400_BAD_REQUEST_CUSTOM_MESSAGE(mutation);
  const my = 2;
  const fontSize = "1rem";

  if (!hasPermission("Can change section")) return <AccessDenyPage />;

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
                <option value={course.id} key={course.id}>
                  {course.code}
                </option>
              ))}
            </Select>
            {errors?.course && <Text color={red}>{errors.course.message}</Text>}
          </Box>

          <Box my={my}>
            <Text fontSize={fontSize}>Class Time</Text>
            <Select {...register("classtime", { valueAsNumber: true })}>
              {classtimes?.map((classtime) => (
                <option value={classtime.id} key={classtime.id}>
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
                <option value={classroom.id} key={classroom.id}>{classroom.name}</option>
              ))}
            </Select>
            {errors?.classroom && (
              <Text color={red}>{errors.classroom.message}</Text>
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

export default SectionEditForm;
