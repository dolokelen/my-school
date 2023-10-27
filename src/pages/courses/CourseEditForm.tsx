import {
  Box,
  Button,
  Input,
  Select,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";
import { http_400_BAD_REQUEST_CUSTOM_MESSAGE } from "../../Utilities/httpErrorStatus";
import { teal } from "../../cacheKeysAndRoutes";
import { useCourse, useCourses, useEditCourse } from "../../hooks/useCourses";
import { useDepartments } from "../../hooks/useDepartments";
import { levels } from "./courseData";

const schema = z.object({
  id: z.number().optional(),
  code: z
    .string()
    .min(2, {
      message: "Course code is required and must be at least 2 characters.",
    })
    .max(50, { message: "Course code cannot be more than 50 characters." }),
  title: z.string().min(5, {
    message: "Course title is required and must be at least 5 characters.",
  }),
  price_per_credit: z
    .number({ invalid_type_error: "Price is required." })
    .max(999, { message: "Course price cannot exceed $999" }),
  credit: z.number({ invalid_type_error: "Credit hour is required." }),
  additional_fee: z
    .number({
      invalid_type_error: "Enter 0 if no additional fee for this course",
    })
    .optional(),
  department: z.string(),
  prerequisite: z.string(),
  level: z.string(),
});

export type CourseEditFormData = z.infer<typeof schema>;

const CourseEditForm = () => {
  const { data: departments } = useDepartments();
  const { data: courses } = useCourses();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CourseEditFormData>({ resolver: zodResolver(schema) });

  const { pk } = useParams();
  const { data, isLoading } = useCourse(parseInt(pk!));
  const mutation = useEditCourse(() => toast.success("Updated successfully."));
  const onSubmit = (FormData: CourseEditFormData) => {
    mutation.mutate({ ...FormData, id: data?.id });
  };

  useEffect(() => {
    if (data) {
      setValue("code", data?.code);
      setValue("title", data?.title);
      setValue("credit", data?.credit);
      setValue("price_per_credit", data?.price_per_credit);
      setValue("additional_fee", data?.additional_fee);
      setValue("department", data?.department);
      setValue("prerequisite", data?.prerequisite);
      setValue("level", data?.level);
    }
  }, [data, setValue]);

  const customErrorMessage = http_400_BAD_REQUEST_CUSTOM_MESSAGE(mutation);
  const my = 2;
  const fontSize = "1.3rem";

  if (isLoading) return <Spinner />;

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack marginBottom={2}>
          <Box my={my}>
            <Text fontSize={fontSize}>Course code</Text>
            <Input {...register("code")} type="text" size="md" />
            {errors?.code && <Text color="red">{errors.code.message}</Text>}
            {mutation.isError && <Text color="red">{customErrorMessage}</Text>}
          </Box>

          <Box my={my}>
            <Text fontSize={fontSize}>Title</Text>
            <Input {...register("title")} type="text" size="md" />
            {errors?.title && <Text color="red">{errors.title.message}</Text>}
            {mutation.isError && <Text color="red">{customErrorMessage}</Text>}
          </Box>

          <Box my={my}>
            <Text fontSize={fontSize}>Credit</Text>
            <Input
              {...register("credit", { valueAsNumber: true })}
              type="number"
              size="md"
            />
            {errors?.credit && <Text color="red">{errors.credit.message}</Text>}
          </Box>

          <Box my={my}>
            <Text fontSize={fontSize}>Price per credit</Text>
            <Input
              {...register("price_per_credit", { valueAsNumber: true })}
              type="number"
              size="md"
            />
            {errors?.price_per_credit && (
              <Text color="red">{errors.price_per_credit.message}</Text>
            )}
          </Box>

          <Box my={my}>
            <Text fontSize={fontSize}>Additional fee</Text>
            <Input
              {...register("additional_fee", { valueAsNumber: true })}
              type="number"
              size="md"
            />
            {errors?.additional_fee && (
              <Text color="red">{errors.additional_fee.message}</Text>
            )}
          </Box>

          <Box my={my}>
            <Text fontSize={fontSize}>Course department</Text>
            <Select {...register("department")}>
              {departments?.map((depar) => (
                <option key={depar.id} value={depar.id}>
                  {depar.name}
                </option>
              ))}
            </Select>
            {errors?.department && (
              <Text color="red">{errors.department.message}</Text>
            )}
          </Box>

          <Box my={my}>
            <Text fontSize={fontSize}>Course prerequisite</Text>
            <Select {...register("prerequisite")}>
              <option value="">----</option>
              {courses?.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.code}
                </option>
              ))}
            </Select>
          </Box>

          <Box my={my}>
            <Text fontSize={fontSize}>Course level</Text>
            <Select {...register("level")}>
              {levels?.map((level) => (
                <option key={level.id} value={level.codename}>
                  {level.name}
                </option>
              ))}
            </Select>
            {errors?.level && <Text color="red">{errors.level.message}</Text>}
          </Box>
        </Stack>
        <Button type="submit" colorScheme={teal}>
          Update Course
        </Button>
      </form>
    </>
  );
};

export default CourseEditForm;
