import { Box, Button, Input, Select, Stack, Text } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { http_400_BAD_REQUEST_CUSTOM_MESSAGE } from "../../Utilities/httpErrorStatus";
import { blue } from "../../cacheKeysAndRoutes";
import { useDepartments } from "../../hooks/useDepartments";
import { Major, useEditMajor } from "../../hooks/useMajors";

const schema = z.object({
  id: z.number().optional(),
  name: z.string().min(2, {
    message: "Major name is required and must be at least 2 characters.",
  }),
  department: z.number().min(1, {
    message: "Major department is required.",
  }),
});

export type MajorEditFormData = z.infer<typeof schema>;

interface Props {
  major?: Major;
}
const MajorEditForm = ({ major }: Props) => {
  const { data: departments } = useDepartments();

  const onUpdate = () => toast.success("Major Updated Successfully!");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<MajorEditFormData>({ resolver: zodResolver(schema) });

  const mutation = useEditMajor(onUpdate);
  const onSubmit = (data: MajorEditFormData) => {
    mutation.mutate({ ...data, id: major?.id! });
  };

  useEffect(() => {
    if (major) {
      setValue("name", major.name);
      setValue("department", major.department.id);
    }
  }, [setValue, major]);

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
            <Select {...register("department", { valueAsNumber: true })}>
              <option value={major?.department.id}>
                {major?.department.name}
              </option>
              {departments?.map((depar) =>
                depar.id !== major?.department.id ? (
                  <option key={depar.id} value={depar.id}>
                    {depar.name}
                  </option>
                ) : (
                  depar.id
                )
              )}
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

export default MajorEditForm;
