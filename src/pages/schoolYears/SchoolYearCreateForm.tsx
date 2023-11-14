import { Box, Button, Input, Stack, Text } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { useCreateSchoolYear } from "../../hooks/useSchoolYears";
import { http_400_BAD_REQUEST_CUSTOM_MESSAGE } from "../../Utilities/httpErrorStatus";
import { blue } from "../../cacheKeysAndRoutes";
import AccessDenyPage from "../AccessDenyPage";
import { hasPermission } from "../../Utilities/hasPermissions";

const schema = z.object({
  year: z
    .number({ invalid_type_error: "School year is required." })
    .min(1847, { message: "School year must be greater than 1847." }),
});

export type SchoolYearCreateFormData = z.infer<typeof schema>;

const SchoolYearCreateForm = () => {
  if (!hasPermission("Can add school year")) return <AccessDenyPage />;
  const onCreate = () => toast.success("School year Created Successfully!");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SchoolYearCreateFormData>({ resolver: zodResolver(schema) });

  const mutation = useCreateSchoolYear(onCreate, () => reset());
  const onSubmit = (data: SchoolYearCreateFormData) => {
    mutation.mutate(data);
  };

  const customErrorMessage = http_400_BAD_REQUEST_CUSTOM_MESSAGE(mutation);

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
            {mutation.isError && <Text color="red">{customErrorMessage}</Text>}
          </Box>
        </Stack>
        <Button mt={6} type="submit" colorScheme={blue}>
          Create School Year
        </Button>
      </form>
    </>
  );
};

export default SchoolYearCreateForm;
