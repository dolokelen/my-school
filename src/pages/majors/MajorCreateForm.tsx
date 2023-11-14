import { Box, Button, Input, Select, Stack, Text } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { http_400_BAD_REQUEST_CUSTOM_MESSAGE } from "../../Utilities/httpErrorStatus";
import { blue } from "../../cacheKeysAndRoutes";
import { useDepartments } from "../../hooks/useDepartments";
import { useCreateMajor } from "../../hooks/useMajors";
import { hasPermission } from "../../Utilities/hasPermissions";
import AccessDenyPage from "../AccessDenyPage";

const schema = z.object({
  name: z.string().min(2, {
    message: "Major name is required and must be at least 2 characters.",
  }),
  department: z.string().min(1, {
    message: "Major department is required.",
  }),
});

export type MajorCreateFormData = z.infer<typeof schema>;

const MajorCreateForm = () => {
  if (!hasPermission("Can add major")) return <AccessDenyPage />;

  const { data: departments } = useDepartments();
  const onCreate = () => toast.success("Major Created Successfully!");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MajorCreateFormData>({ resolver: zodResolver(schema) });

  const mutation = useCreateMajor(onCreate, () => reset());
  const onSubmit = (data: MajorCreateFormData) => {
    mutation.mutate(data);
  };

  const customErrorMessage = http_400_BAD_REQUEST_CUSTOM_MESSAGE(mutation);
  const my = 2;
  const fontSize = "1rem";

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack marginBottom={2}>
          <Box my={my}>
            <Text fontSize={fontSize}>Major Name</Text>
            <Input {...register("name")} type="text" size="md" />
            {errors?.name && <Text color="red">{errors.name.message}</Text>}
            {mutation.isError && <Text color="red">{customErrorMessage}</Text>}
          </Box>

          <Box my={my}>
            <Text fontSize={fontSize}>Major Department</Text>
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
 
        </Stack>
        <Button type="submit" colorScheme={blue}>
          Create Major
        </Button>
      </form>
    </>
  );
};

export default MajorCreateForm;
