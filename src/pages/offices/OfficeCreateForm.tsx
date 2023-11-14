import { Box, Button, Input, Select, Stack, Text } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { blue, red } from "../../cacheKeysAndRoutes";
import { useBuildings } from "../../hooks/useBuildings";
import { useCreateOffice } from "../../hooks/useOffices";
import { hasPermission } from "../../Utilities/hasPermissions";
import AccessDenyPage from "../AccessDenyPage";

const schema = z.object({
  dimension: z.string().min(3, {
    message: "Office dimension is required e.g.: 8,8",
  }),
  building: z.string().min(1, {
    message: "Office building is required.",
  }),
});


export type OfficeCreateFormData = z.infer<typeof schema>;

const OfficeCreateForm = () => {
  if (!hasPermission("Can add office")) return <AccessDenyPage />;

    const { data: buildings } = useBuildings();
  const onCreate = () => toast.success("Office created Successfully!");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<OfficeCreateFormData>({ resolver: zodResolver(schema) });

  const mutation = useCreateOffice(onCreate, () => reset());
  const onSubmit = (data: OfficeCreateFormData) => {
    mutation.mutate(data);
  };

  const my = 2;
  const fontSize = "1rem";

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack marginBottom={2}>
          <Box my={my}>
            <Text fontSize={fontSize}>Office dimension</Text>
            <Input {...register("dimension")} type="text" size="md" />
            {errors?.dimension && <Text color={red}>{errors.dimension.message}</Text>}
          </Box>

          <Box my={my}>
            <Text fontSize={fontSize}>Building</Text>

            <Select {...register("building")}>
              {buildings?.map((building) => (
                <option key={building.id} value={building.id}>
                  {building.name}
                </option>
              ))}
            </Select>
            {errors?.building && (
              <Text color="red">{errors.building.message}</Text>
            )}
          </Box>

        </Stack>
        <Button type="submit" colorScheme={blue}>
          Create Office
        </Button>
      </form>
    </>
  );
};

export default OfficeCreateForm;
