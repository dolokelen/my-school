import { Box, Button, HStack, Input, Text } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { z } from "zod";
import DeletionConfirmation from "../../components/DeletionConfirmation";
import {
  useDeleteSchoolYear,
  useEditSchoolYear,
  useSchoolYear,
} from "../../hooks/useSchoolYears";

const schema = z.object({
  id: z.number().optional(),
  year: z
    .number({ invalid_type_error: "The school year is required." })
    .min(2000, { message: "School year must be 4 digits." }),
});

export type SchoolYearEditFormData = z.infer<typeof schema>;

const SchoolYearEditForm = () => {
  const mutation = useDeleteSchoolYear();
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
        <Box marginBottom={2}>
          <Input
            {...register("year", { valueAsNumber: true })}
            type="number"
            size="md"
            placeholder="Enter school year"
          />
          {errors.year && <Text color="red">{errors.year.message}</Text>}
        </Box>
        <HStack marginTop={8}>
          <Button marginRight={6} type="submit" colorScheme="blue">
            Update School Year
          </Button>
          <DeletionConfirmation
            entityId={data?.id!}
            entityName={data?.year!}
            label="Delete School Year"
            onMutate={() => mutation.mutate(data?.id!)}
          />
        </HStack>
      </form>
    </>
  );
};

export default SchoolYearEditForm;
