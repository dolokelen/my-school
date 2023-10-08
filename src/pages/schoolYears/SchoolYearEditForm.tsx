import { Box, Button, Input, Stack, Text } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { z } from "zod";
import { useEditSchoolYear, useSchoolYear } from "../../hooks/useSchoolYears";
import SchoolYearDeletePage from "./SchoolYearDeletePage";

const schema = z.object({
  id: z.number().optional(),
  year: z
    .number({ invalid_type_error: "The school year is required." })
    .min(2000, { message: "School year must be 4 digits." }),
});

export type SchoolYearEditFormData = z.infer<typeof schema>;

const SchoolYearEditForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SchoolYearEditFormData>({ resolver: zodResolver(schema) });

  const { id } = useParams();
  const { data } = useSchoolYear(parseInt(id!));

  const editSchoolYear = useEditSchoolYear();
  const onSubmit = (year: SchoolYearEditFormData) => {
    editSchoolYear.mutate({ ...year, id: data?.id });
  };

  useEffect(() => {
    if (data) {
      setValue("year", data.year);
    }
  }, [data, setValue]);

  if (editSchoolYear.isError)
    return <Text color="red">{editSchoolYear.error.message}</Text>;
  
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
      <SchoolYearDeletePage schoolYearId={data?.id!} schoolYear={data?.year!} />
    </>
  );
};

export default SchoolYearEditForm;
