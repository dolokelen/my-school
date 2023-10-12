import { Box, Button, Input, Stack, Text } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { useCreateGroup } from "../hooks/useGroups";

const schema = z.object({
  name: z
    .string()
    .min(2, { message: "Group name must be at least two letters" }),
});

export type GroupCreateFormData = z.infer<typeof schema>;

const GroupCreateForm = () => {
  const onCreate = () => toast.success("Group Created Successfully!");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<GroupCreateFormData>({ resolver: zodResolver(schema) });

  const createGroup = useCreateGroup(onCreate, () => reset());
  const onSubmit = (data: GroupCreateFormData) => {
    createGroup.mutate(data);
  };

  if (createGroup.isError)
    return <Text color="red">{createGroup.error.message}</Text>;

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
          </Box>
        </Stack>
        <Button type="submit" colorScheme="blue">
          Create Group
        </Button>
      </form>
    </>
  );
};

export default GroupCreateForm;
