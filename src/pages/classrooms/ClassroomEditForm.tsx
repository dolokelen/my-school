import { Box, Button, Input, Select, Stack, Text } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { number, z } from "zod";
import { http_400_BAD_REQUEST_CUSTOM_MESSAGE } from "../../Utilities/httpErrorStatus";
import { red, teal } from "../../cacheKeysAndRoutes";
import { useBuildings } from "../../hooks/useBuildings";
import { Classroom, useEditClassroom } from "./../../hooks/useClassrooms";
import AccessDenyPage from "../AccessDenyPage";
import { hasPermission } from "../../Utilities/hasPermissions";

const schema = z.object({
  id: number().optional(),
  name: z.string().min(1, {
    message: "Classroom name is required and must be at least a characters.",
  }),
  dimension: z.string().min(5, {
    message: "Classroom dimension is required, e.g: 20, 15",
  }),
  building: z.number({ invalid_type_error: "Building is required" }),
});

export type ClassroomEditFormData = z.infer<typeof schema>;

interface Props {
  classroom?: Classroom;
}
const ClassroomEidtForm = ({ classroom }: Props) => {
  if (!hasPermission("Can change class room")) return <AccessDenyPage />;
  
  const { data: buildings } = useBuildings();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ClassroomEditFormData>({ resolver: zodResolver(schema) });

  const mutation = useEditClassroom(() =>
    toast.success("Classroom Updated successfully!")
  );
  const onSubmit = (data: ClassroomEditFormData) => {
    mutation.mutate({ ...data, id: classroom?.id });
  };

  useEffect(() => {
    if (classroom) {
      setValue("name", classroom?.name);
      setValue("dimension", classroom?.dimension);
      setValue("building", classroom?.building.id);
    }
  }, [setValue, classroom]);

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
            <Text fontSize={fontSize}>Building</Text>
            <Select {...register("building", { valueAsNumber: true })}>
              <option value={classroom?.building.id}>
                {classroom?.building.name}
              </option>
              {buildings?.map((b) =>
                b.id !== classroom?.building.id ? (
                  <option value={b.id}>{b.name}</option>
                ) : (
                  b.id
                )
              )}
            </Select>

            {errors?.building && (
              <Text color={red}>{errors.building.message}</Text>
            )}
          </Box>
        </Stack>
        <Button
          isActive
          type="submit"
          colorScheme={teal}
          onClick={() => mutation.isError && toast.error(customErrorMessage)}
        >
          Update Classroom
        </Button>
      </form>
    </>
  );
};

export default ClassroomEidtForm;
