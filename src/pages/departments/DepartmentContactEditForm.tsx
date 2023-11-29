import { Box, Button, Input, Stack, Text } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { red, teal } from "../../cacheKeysAndRoutes";
import {
    DepartmentContact, useEditDepartmentContact
} from "../../hooks/useDepartments";

const schema = z.object({
  id: z.number().optional(),
  phone: z.string().min(10, {
    message:
      "Department phone is required and must be at least 10 valid phone numbers.",
  }),
  email: z
    .string()
    .min(4, { message: "Email is required." })
    .email("This is not a valid email."),
});

export type DepartmentContactEditFormData = z.infer<typeof schema>;

interface Props {
  selectedDepartmentContact?: DepartmentContact;
  departmentId: number;
}
const DepartmentContactEditForm = ({
  selectedDepartmentContact,
  departmentId,
}: Props) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<DepartmentContactEditFormData>({ resolver: zodResolver(schema) });

  const mutation = useEditDepartmentContact(() =>
    toast.success("Department Contact Updated Successfully!"),
    departmentId
  );
  const onSubmit = (FormData: DepartmentContactEditFormData) => {
    mutation.mutate({ ...FormData, id: departmentId });
  };

  useEffect(() => {
    if (selectedDepartmentContact) {
      setValue("phone", selectedDepartmentContact?.phone);
      setValue("email", selectedDepartmentContact?.email);
    }
  }, [selectedDepartmentContact, setValue]);

  const my = 2;
  const fontSize = "1rem";
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack marginBottom={2}>
          <Box mx="1rem" fontSize="1.6rem" w="auto" mt="3rem">
            Department Contact Update Form
          </Box>
          <Box my={my}>
            <Text fontSize={fontSize}>Phone</Text>
            <Input {...register("phone")} size="md" />
            {errors?.phone && <Text color={red}>{errors.phone.message}</Text>}
          </Box>

          <Box my={my}>
            <Text fontSize={fontSize}>Email</Text>
            <Input {...register("email")} size="md" />
            {errors?.email && <Text color={red}>{errors.email.message}</Text>}
          </Box>
        </Stack>
        <Button isActive type="submit" colorScheme={teal}>
          Update Department Contact
        </Button>
      </form>
    </>
  );
};

export default DepartmentContactEditForm;
