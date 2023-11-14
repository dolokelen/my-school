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
import { red, teal } from "../../cacheKeysAndRoutes";
import { useSchoolYears } from "../../hooks/useSchoolYears";
import {
  useEditSemester,
  useSemester
} from "../../hooks/useSemesters";
import { semesterNames } from "./data";
import { hasPermission } from "../../Utilities/hasPermissions";
import AccessDenyPage from "../AccessDenyPage";

const schema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, {
    message: "Semester name is required.",
  }),
  school_year: z.number().min(1, {
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

export type SemesterEditFormData = z.infer<typeof schema>;

const SemesterEditForm = () => {
  if (!hasPermission("Can change semester")) return <AccessDenyPage />;

  const { data: schoolYears } = useSchoolYears();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SemesterEditFormData>({ resolver: zodResolver(schema) });

  const { id } = useParams();
  const { data: semester, isLoading } = useSemester(parseInt(id!));
  const mutation = useEditSemester(() =>
    toast.success("Semester updated successfully.")
  );
  const onSubmit = (FormData: SemesterEditFormData) => {
    mutation.mutate({ ...FormData, id: semester?.id });
  };

  useEffect(() => {
    if (semester) {
      setValue("name", semester?.name);
      setValue("school_year", semester?.school_year.id);
      setValue("enrollment_start_date", semester?.enrollment_start_date);
      setValue("enrollment_end_date", semester?.enrollment_start_date);
      setValue("start_date", semester?.start_date);
      setValue("end_date", semester?.end_date);
    }
  }, [semester, setValue]);

  const errSmsForUniqueFields = http_400_BAD_REQUEST_CUSTOM_MESSAGE(mutation);
  const my = 2;
  const fontSize = "1rem";
  if (isLoading) return <Spinner />;
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
            {mutation.isError && (
              <Text color={red}>{errSmsForUniqueFields}</Text>
            )}
          </Box>

          <Box my={my}>
            <Text fontSize={fontSize}>Semester year</Text>
            <Select {...register("school_year", {valueAsNumber: true})}>
              <option value={semester?.school_year.id}>{semester?.school_year.year}</option>
              {schoolYears?.map((schYear) => schYear.id !== semester?.school_year.id ? (
                <option key={schYear.id} value={schYear.id}>
                  {schYear.year}
                </option>
              ) : schYear.id)}
            </Select>
            {errors?.school_year && (
              <Text color={red}>{errors.school_year.message}</Text>
            )}
            {mutation.isError && (
              <Text color={red}>{errSmsForUniqueFields}</Text>
            )}
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
        <Button type="submit" isActive colorScheme={teal}>
          Update Semester
        </Button>
      </form>
    </>
  );
};

export default SemesterEditForm;
