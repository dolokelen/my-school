import { Box, Button, Input, Stack, Text, Textarea } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";
import { http_400_BAD_REQUEST_CUSTOM_MESSAGE } from "../../Utilities/httpErrorStatus";
import { red, teal } from "../../cacheKeysAndRoutes";
import { useDepartment, useEditDepartment } from "../../hooks/useDepartments";

const schema = z.object({
  id: z.number().optional(),
  name: z.string().min(2, {
    message: "Department name is required and must be at least 2 characters.",
  }),
  budget: z.number({ invalid_type_error: "Budget is required." }).min(5, {
    message: "Department budget must be at least $100.",
  }),
  duty: z.string().min(2, {
    message: "Department duty is required and must be at least 2 words.",
  }),
});

export type DepartmentEditFormData = z.infer<typeof schema>;

const DepartmentEditForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<DepartmentEditFormData>({ resolver: zodResolver(schema) });

  const { pk } = useParams();
  const { data: department, isLoading } = useDepartment(parseInt(pk!));
  const mutation = useEditDepartment(() =>
    toast.success("Department Updated Successfully!")
  );
  const onSubmit = (FormData: DepartmentEditFormData) => {
    mutation.mutate({ ...FormData, id: department?.id });
  };

  useEffect(() => {
    if (department) {
      setValue("name", department?.name);
      setValue("budget", department?.budget);
      setValue("duty", department?.duty);
    }
  }, [department, setValue]);

  const customErrorMessage = http_400_BAD_REQUEST_CUSTOM_MESSAGE(mutation);
  const my = 2;
  const fontSize = "1rem";

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack marginBottom={2}>
          <Box my={my}>
            <Text fontSize={fontSize}>Department name</Text>
            <Input {...register("name")} type="text" size="md" />
            {errors?.name && <Text color={red}>{errors.name.message}</Text>}
            {mutation.isError && <Text color={red}>{customErrorMessage}</Text>}
          </Box>

          <Box my={my}>
            <Text fontSize={fontSize}>Budget</Text>
            <Input
              {...register("budget", { valueAsNumber: true })}
              type="number"
              size="md"
            />
            {errors?.budget && <Text color={red}>{errors.budget.message}</Text>}
          </Box>

          <Box my={my}>
            <Text fontSize={fontSize}>Duty</Text>
            <Textarea {...register("duty")} size="md" />
            {errors?.duty && <Text color={red}>{errors.duty.message}</Text>}
          </Box>
        </Stack>
        <Button type="submit" colorScheme={teal}>
          Update Department
        </Button>
      </form>
    </>
  );
};

export default DepartmentEditForm;
