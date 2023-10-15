import { Box, Button, Input, Text } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";
import { teal } from "../cacheKeysAndRoutes";
import { useEditGroup, useGroup } from "../hooks/useGroups";
import { http_400_BAD_REQUEST_CUSTOM_MESSAGE } from "../Utilities/httpErrorStatus";

const schema = z.object({
  id: z.number().optional(),
  name: z.string().min(2, {
    message: "Group name is required and must be at least two letters.",
  }),
});

export type GroupEditFormData = z.infer<typeof schema>;

const GroupEditForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<GroupEditFormData>({ resolver: zodResolver(schema) });

  const { id } = useParams();
  const { data } = useGroup(parseInt(id!));

  const mutation = useEditGroup(() => toast.success("Updated successfully."));
  const onSubmit = (name: GroupEditFormData) => {
    mutation.mutate({ ...name, id: data?.id });
  };

  useEffect(() => {
    if (data) {
      setValue("name", data.name);
    }
  }, [data, setValue]);

  const customerErrMessage = http_400_BAD_REQUEST_CUSTOM_MESSAGE(mutation);

  return (
    <>
      <Box my={8} fontSize={50}>
        {data?.name} Update Form
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box marginBottom={2}>
          <Input
            {...register("name")}
            type="text"
            size="md"
            placeholder="Enter school year"
          />
          {errors.name && <Text color="red">{errors.name.message}</Text>}
          {mutation.isError && <Text color="red">{customerErrMessage}</Text>}
        </Box>
        <Button mt={4} marginRight={6} type="submit" colorScheme={teal}>
          Update Group Name
        </Button>
      </form>
    </>
  );
};

export default GroupEditForm;
