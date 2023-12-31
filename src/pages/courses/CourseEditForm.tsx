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
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";
import { http_400_BAD_REQUEST_CUSTOM_MESSAGE } from "../../Utilities/httpErrorStatus";
import { teal } from "../../cacheKeysAndRoutes";
import { useCourse, useCourses, useEditCourse } from "../../hooks/useCourses";
import { useDepartments } from "../../hooks/useDepartments";
import { levels } from "../../accounts/data";
import AccessDenyPage from "../AccessDenyPage";
import { hasPermission } from "../../Utilities/hasPermissions";

const justToSatisfyTypescript = z.object({});

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
  prerequisite: z.string(),
  level: z.string(),
  departments: z.array(justToSatisfyTypescript).optional(),
});

export type CourseEditFormData = z.infer<typeof schema>;

const CourseEditForm = () => {
  const [selectedDepsIds, setSelectedDepsIds] = useState<number[]>([]);
  const { data: departments } = useDepartments();
  const { data: courses } = useCourses();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CourseEditFormData>({ resolver: zodResolver(schema) });

  const { pk } = useParams();
  const { data: course, isLoading } = useCourse(parseInt(pk!));
  const mutation = useEditCourse(() => toast.success("Updated successfully."));
  const onSubmit = (data: CourseEditFormData) => {
    mutation.mutate({
      ...data,
      departments: handleCourseDepartments(),
      id: course?.id,
    });
  };

  useEffect(() => {
    if (course) {
      setValue("code", course?.code);
      setValue("title", course?.title);
      setValue("credit", course?.credit);
      setValue("price_per_credit", course?.price_per_credit);
      setValue("additional_fee", course?.additional_fee);
      setValue("prerequisite", course?.prerequisite?.id.toString());
      setValue("level", course?.level);
    }
  }, [course, setValue]);

  const customErrorMessage = http_400_BAD_REQUEST_CUSTOM_MESSAGE(mutation);
  if (!hasPermission("Can change course")) return <AccessDenyPage />;

  function handleCourseDepartments() {
    return selectedDepsIds.length
      ? selectedDepsIds
      : course?.departments.map((d) => d.id);
  }

  const my = 2;
  const fontSize = "1rem";

  if (isLoading) return <Spinner />;

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack marginBottom={2}>
          <Box my={my}>
            <Text fontSize={fontSize}>Course code</Text>
            <Input {...register("code")} type="text" size="md" />
            {errors?.code && <Text color="red">{errors.code.message}</Text>}
          </Box>

          <Box my={my}>
            <Text fontSize={fontSize}>Title</Text>
            <Input {...register("title")} type="text" size="md" />
            {errors?.title && <Text color="red">{errors.title.message}</Text>}
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
            <Text fontSize={fontSize}>Course prerequisite</Text>
            <Select {...register("prerequisite")}>
              <option value={course?.prerequisite?.id}>
                {course?.prerequisite?.code}
              </option>
              <option value="">----</option>
              {courses?.map((cos) =>
                cos.prerequisite?.id !== course?.prerequisite?.id ? (
                  <option key={cos.id} value={cos.id}>
                    {cos.code}
                  </option>
                ) : (
                  cos.prerequisite?.id
                )
              )}
            </Select>
          </Box>

          <Box my={my}>
            <Text fontSize={fontSize}>Course level</Text>
            <Select {...register("level")}>
              <option value={course?.level}>{course?.level}</option>
              {levels?.map((level) =>
                level.name !== course?.level ? (
                  <option key={level.name} value={level.name}>
                    {level.name}
                  </option>
                ) : (
                  level.name
                )
              )}
            </Select>
            {errors?.level && <Text color="red">{errors.level.message}</Text>}
          </Box>

          <Box my={my}>
            <Text fontSize={fontSize}>Course departments</Text>
            <Select
              onChange={(e) => {
                const selectedOptions = Array.from(
                  e.target.selectedOptions,
                  (option) => parseInt(option.value)
                );
                setSelectedDepsIds(selectedOptions);
              }}
              multiple
              h="30vh"
            >
              {departments?.map((depar) => (
                <option key={depar.id} value={depar.id}>
                  {depar.name}
                </option>
              ))}
            </Select>
          </Box>
        </Stack>
        <Button
          onClick={() => mutation.isError && toast.error(customErrorMessage)}
          type="submit"
          colorScheme={teal}
        >
          Update Course
        </Button>
      </form>
    </>
  );
};

export default CourseEditForm;
