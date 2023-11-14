import { Box, Button, Input, Select, Stack, Text } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { http_400_BAD_REQUEST_CUSTOM_MESSAGE } from "../../Utilities/httpErrorStatus";
import { blue, red } from "../../cacheKeysAndRoutes";
import { useCreateClassroom } from "./../../hooks/useClassrooms";
import { useBuildings } from "../../hooks/useBuildings";

const schema = z.object({
  name: z.string().min(1, {
    message: "Classroom name is required and must be at least a characters.",
  }),
  dimension: z.string().min(5, {
    message: "Classroom dimension is required, e.g: 20, 15",
  }),
  building: z.number({ invalid_type_error: "Building is required" }),
});

export type ClassroomCreateFormData = z.infer<typeof schema>;

const ClassroomCreateForm = () => {
  const { data: buildings } = useBuildings();
  const onCreate = () => toast.success("Classroom Created Successfully!");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ClassroomCreateFormData>({ resolver: zodResolver(schema) });

  const mutation = useCreateClassroom(onCreate, () => reset());
  const onSubmit = (data: ClassroomCreateFormData) => {
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
            <Text fontSize={fontSize}>Classroom Name</Text>
            <Input {...register("name")} type="text" size="md" />
            {errors?.name && <Text color={red}>{errors.name.message}</Text>}
          </Box>

          <Box my={my}>
            <Text fontSize={fontSize}>Dimension</Text>
            <Input {...register("dimension")} type="text" size="md" />
            {errors?.dimension && (
              <Text color={red}>{errors.dimension.message}</Text>
            )}
          </Box>

          <Box my={my}>
            <Text fontSize={fontSize}>Number of offices</Text>
            <Select {...register("building", { valueAsNumber: true })}>
              {buildings?.map((b) => (
                <option value={b.id}>{b.name}</option>
              ))}
            </Select>

            {errors?.building && (
              <Text color={red}>{errors.building.message}</Text>
            )}
          </Box>
        </Stack>
        <Button
          type="submit"
          colorScheme={blue}
          onClick={() => mutation.isError && toast.error(customErrorMessage)}
        >
          Create Classroom
        </Button>
      </form>
    </>
  );
};

export default ClassroomCreateForm;
