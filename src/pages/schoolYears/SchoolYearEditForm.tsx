import { Box, Button, HStack, Input, Stack, Text } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { z } from "zod";
import { useEditSchoolYear, useSchoolYear } from "../../hooks/useSchoolYears";
import { useEffect } from "react";
import SchoolYearDeletePage from "./SchoolYearDeletePage";

const schema = z.object({
  id: z.number().optional(),
  year: z
    .number({ invalid_type_error: "The school year is required." })
    .min(2000, { message: "School year must be 4 digits." })
});

export type SchoolYearEditFormData = z.infer<typeof schema>;

const SchoolYearEditForm = () => {
  const onCreate = () => toast.success("Edited!");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<SchoolYearEditFormData>({ resolver: zodResolver(schema) });

  const { id } = useParams();
  const { data } = useSchoolYear(parseInt(id!));
  console.log(data);

  const editSchoolYear = useEditSchoolYear(onCreate, () => reset());
  const onSubmit = (year: SchoolYearEditFormData) => {
    editSchoolYear.mutate({ ...year, id: data?.id });
  };

  useEffect(() => {
    if (data) {
      setValue("year", data.year); // Set the 'year' field with the existing data
    }
  }, [data, setValue]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack marginBottom={2}>
          <Box>
            <Input
              {...register("year", { valueAsNumber: true })}
              type="number"
              size="md"
              placeholder="Enter school year"
            />
            {errors.year && <Text color="red">{errors.year.message}</Text>}
          </Box>
        </Stack>
        <Button type="submit" colorScheme="blue">
          Update School Year
        </Button>
      </form>
      <SchoolYearDeletePage schoolYearId={data?.id!} />
      <ToastContainer />
    </>
  );
};

export default SchoolYearEditForm;
