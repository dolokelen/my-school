import { Avatar, Box, Button, Input, Spinner, Text } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";
import { http_400_BAD_REQUEST_CUSTOM_MESSAGE } from "../../Utilities/httpErrorStatus";
import { teal } from "../../cacheKeysAndRoutes";
import { useEditUser, useUser } from "../../hooks/useUsers";

const schema = z.object({
  id: z.number().optional(),
  first_name: z
    .string()
    .min(2, {
      message: "First name is required and must be at least two letters.",
    }),
  last_name: z
    .string()
    .min(2, {
      message: "Last name is required and must be at least two letters.",
    }),
  email: z
    .string()
    .min(2, { message: "Email is required." })
    .email("This is not a valid email."),
});

export type UserEditFormData = z.infer<typeof schema>;

const UserEditForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UserEditFormData>({ resolver: zodResolver(schema) });
  const { pk } = useParams();
  const { data, error, isLoading } = useUser(parseInt(pk!));
  const mutation = useEditUser(() => toast.success("Updated successfully."));
  const onSubmit = (FormData: UserEditFormData) => {
    mutation.mutate({ ...FormData, id: data?.id });
  };

  useEffect(() => {
    if (data) {
      setValue("first_name", data?.first_name);
      setValue("last_name", data?.last_name);
      setValue("email", data?.email);
    }
  }, [data, setValue]);

  const customerErrMessage = http_400_BAD_REQUEST_CUSTOM_MESSAGE(mutation);
  if (error) throw error;
  if (isLoading) return <Spinner />

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
      <Box my={8} fontSize={50}>
        <Avatar /> {data?.first_name} {data.last_name}
      </Box>
        <Box marginBottom={2}>
          <Input
            {...register("first_name")}
            type="text"
            size="md"
            placeholder="Enter your first name"
          />
          {errors.first_name && (
            <Text color="red">{errors.first_name.message}</Text>
          )}
          {mutation.isError && <Text color="red">{customerErrMessage}</Text>}
        </Box>
        <Box marginBottom={2}>
          <Input
            {...register("last_name")}
            type="text"
            size="md"
            placeholder="Enter your last name"
          />
          {errors.last_name && (
            <Text color="red">{errors.last_name.message}</Text>
          )}
          {mutation.isError && <Text color="red">{customerErrMessage}</Text>}
        </Box>
        <Box marginBottom={2}>
          <Input
            {...register("email")}
            type="email"
            size="md"
            placeholder="Enter your email address"
          />
          {errors.email && <Text color="red">{errors.email.message}</Text>}
          {mutation.isError && <Text color="red">{customerErrMessage}</Text>}
        </Box>
        <Button mt={4} marginRight={6} type="submit" colorScheme={teal}>
          Update User
        </Button>
      </form>
    </>
  );
};

export default UserEditForm;
