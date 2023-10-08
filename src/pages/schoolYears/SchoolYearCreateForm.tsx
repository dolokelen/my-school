import { Box, Button, Input, Stack, Text } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { useCreateSchoolYear } from "../../hooks/useSchoolYears";

const schema = z.object({
  year: z
    .number({ invalid_type_error: "The school year is required." })
    .min(2000, { message: "School year must be 4 digits." }),
});

export type SchoolYearCreateFormData = z.infer<typeof schema>;

const SchoolYearCreateForm = () => {
  const onCreate = () => toast.success("Created!");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SchoolYearCreateFormData>({ resolver: zodResolver(schema) });

  const createSchoolYear = useCreateSchoolYear(onCreate, () => reset());
  const onSubmit = (data: SchoolYearCreateFormData) => {
    createSchoolYear.mutate(data);
  };

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
          Create School Year
        </Button>
      </form>
    </>
  );
};

export default SchoolYearCreateForm;
