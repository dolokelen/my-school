import { Box, Button, Input, Select, Stack, Text } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { http_400_BAD_REQUEST_CUSTOM_MESSAGE } from "../../Utilities/httpErrorStatus";
import { blue, red } from "../../cacheKeysAndRoutes";
import { useSchoolYears } from "../../hooks/useSchoolYears";
import { useCreateSemester } from "../../hooks/useSemesters";
import { hasPermission } from "../../Utilities/hasPermissions";
import AccessDenyPage from "../AccessDenyPage";
import { semesterNames } from "../../accounts/data";

const schema = z.object({
  name: z.string().min(1, {
    message: "Semester name is required.",
  }),
  school_year: z.number({invalid_type_error: "Select a year explicitly."}).min(1, {
    message: "School year is required.",
  }),
  enrollment_start_date: z.string().min(10, {
    message: "Registration start date is required. E.g 2023-10-28.",
  }),
  enrollment_end_date: z.string().min(10, {
    message: "Registration closing date is required. E.g 2023-10-28.",
  }),
  start_date: z.string().min(10, {
    message: "Opening date is required. E.g 2023-10-28.",
  }),
  end_date: z.string().min(10, {
    message: "Closing date is required. E.g 2023-10-28.",
  }),
});

export type SemesterCreateFormData = z.infer<typeof schema>;

const SemesterCreateForm = () => {
  if (!hasPermission("Can add semester")) return <AccessDenyPage />;

  const { data: schoolYears } = useSchoolYears();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SemesterCreateFormData>({ resolver: zodResolver(schema) });

  const onCreate = () => toast.success("Semester Created Successfully!");
  const mutation = useCreateSemester(onCreate, () => reset());
  const onSubmit = (data: SemesterCreateFormData) => {
    mutation.mutate(data);
  };

  const errSmsForUniqueFields = http_400_BAD_REQUEST_CUSTOM_MESSAGE(mutation);
  const my = 2;
  const fontSize = "1rem";

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack marginBottom={2}>
          <Box my={my}>
            <Text fontSize={fontSize}>Semester name</Text>
            <Select {...register("name")}>
              {semesterNames?.map((choice) => (
                <option key={choice.id} value={choice.name}>
                  {choice.name}
                </option>
              ))}
            </Select>
            {errors?.name && <Text color={red}>{errors.name.message}</Text>}
            {mutation.isError && <Text color={red}>{errSmsForUniqueFields}</Text>}
          </Box>

          <Box my={my}>
            <Text fontSize={fontSize}>Semester year</Text>
            <Select {...register("school_year", {valueAsNumber: true})}>
              {schoolYears?.map((schYear) => (
                <option key={schYear.id} value={schYear.id}>
                  {schYear.year}
                </option>
              ))}
            </Select>
            {errors?.school_year && (
              <Text color={red}>{errors.school_year.message}</Text>
            )}
            {mutation.isError && <Text color={red}>{errSmsForUniqueFields}</Text>}
          </Box>

          <Box my={my}>
            <Text fontSize={fontSize}>Registration start date</Text>
            <Input
              {...register("enrollment_start_date")}
              type="text"
              size="md"
            />
            {errors?.enrollment_start_date && (
              <Text color={red}>{errors.enrollment_start_date.message}</Text>
            )}
          </Box>

          <Box my={my}>
            <Text fontSize={fontSize}>Registration end date</Text>
            <Input {...register("enrollment_end_date")} type="text" size="md" />
            {errors?.enrollment_end_date && (
              <Text color={red}>{errors.enrollment_end_date.message}</Text>
            )}
          </Box>

          <Box my={my}>
            <Text fontSize={fontSize}>Semester opening date</Text>
            <Input {...register("start_date")} type="text" size="md" />
            {errors?.start_date && (
              <Text color={red}>{errors.start_date.message}</Text>
            )}
          </Box>

          <Box my={my}>
            <Text fontSize={fontSize}>Semester opening date</Text>
            <Input {...register("end_date")} type="text" size="md" />
            {errors?.end_date && (
              <Text color={red}>{errors.end_date.message}</Text>
            )}
          </Box>
        </Stack>
        <Button type="submit" colorScheme={blue}>
          Create Semester
        </Button>
      </form>
    </>
  );
};

export default SemesterCreateForm;
