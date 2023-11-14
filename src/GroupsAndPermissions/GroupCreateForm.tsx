import { Box, Button, Input, Stack, Text } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { useCreateGroup } from "../hooks/useGroups";
import { http_400_BAD_REQUEST_CUSTOM_MESSAGE } from "../Utilities/httpErrorStatus";
import { blue } from "../cacheKeysAndRoutes";
import { hasPermission } from "../Utilities/hasPermissions";
import AccessDenyPage from "../pages/AccessDenyPage";

const schema = z.object({
  name: z.string().min(2, {
    message: "Group name is required and must be at least two letters",
  }),
});

export type GroupCreateFormData = z.infer<typeof schema>;
const GroupCreateForm = () => {
  if (!hasPermission("Can add group")) return <AccessDenyPage />;
  
  const onCreate = () => toast.success("Group Created Successfully!");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<GroupCreateFormData>({ resolver: zodResolver(schema) });

  const mutation = useCreateGroup(onCreate, () => reset());
  const onSubmit = (data: GroupCreateFormData) => {
    mutation.mutate(data);
  };

  const customErrorMessage = http_400_BAD_REQUEST_CUSTOM_MESSAGE(mutation);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack marginBottom={2}>
          <Box>
            <Input
              {...register("name")}
              type="text"
              size="md"
              placeholder="Enter Group Name"
            />
            {errors.name && <Text color="red">{errors.name.message}</Text>}
            {mutation.isError && <Text color="red">{customErrorMessage}</Text>}
          </Box>
        </Stack>
        <Button mt={3} type="submit" colorScheme={blue}>
          Create Group
        </Button>
      </form>
    </>
  );
};

export default GroupCreateForm;
