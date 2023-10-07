import { Box, Button, Input, Stack, Text } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCreateSchoolYear } from "../../hooks/useSchoolYears";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";

const schema = z.object({
  year: z
    .number({ invalid_type_error: "The school year is required." })
    .min(2000, { message: "School year must be 4 digits." }),
});

export type SchoolYearFormData = z.infer<typeof schema>;

const SchoolYearCreateForm = () => {
  const onCreate = () => toast.success("Created!");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SchoolYearFormData>({ resolver: zodResolver(schema) });
  const createSchoolYear = useCreateSchoolYear(onCreate);
  const onSubmit = (data: SchoolYearFormData) => {
    createSchoolYear.mutate(data);
    reset();
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
      <ToastContainer />
    </>
  );
};

export default SchoolYearCreateForm;
