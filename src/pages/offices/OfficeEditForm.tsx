import { Box, Button, Input, Select, Stack, Text } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { red, teal } from "../../cacheKeysAndRoutes";
import { useBuildings } from "../../hooks/useBuildings";
import { Office, useEditOffice } from "../../hooks/useOffices";
import { hasPermission } from "../../Utilities/hasPermissions";
import AccessDenyPage from "../AccessDenyPage";

const schema = z.object({
  id: z.number().optional(),
  dimension: z.string().min(3, {
    message: "Office dimension is required e.g.: 8,8",
  }),
  building: z.number().min(1, {
    message: "Office building is required.",
  }),
});

export type OfficeEditFormData = z.infer<typeof schema>;

interface Props {
  office?: Office;
}

const OfficeEditForm = ({ office }: Props) => {
  if (!hasPermission("Can change office")) return <AccessDenyPage />;
  
  const { data: buildings } = useBuildings();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<OfficeEditFormData>({ resolver: zodResolver(schema) });

  const mutation = useEditOffice(() =>
    toast.success("Office Updated Successfully!")
  );
  const onSubmit = (data: OfficeEditFormData) => {
    mutation.mutate({ ...data, id: office?.id });
  };

  useEffect(() => {
    if (office) {
      setValue("dimension", office?.dimension);
      setValue("building", office?.building.id);
    }
  }, [office, setValue]);

  const my = 2;
  const fontSize = "1rem";

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack marginBottom={2}>
          <Box my={my}>
            <Text fontSize={fontSize}>Office dimension</Text>
            <Input {...register("dimension")} type="text" size="md" />
            {errors?.dimension && (
              <Text color={red}>{errors.dimension.message}</Text>
            )}
          </Box>

          <Box my={my}>
            <Text fontSize={fontSize}>Building</Text>

            <Select {...register("building", { valueAsNumber: true })}>
              <option value={office?.building.id}>
                {office?.building.name}
              </option>
              {buildings?.map((building) =>
                building.id !== office?.building.id ? (
                  <option key={building.id} value={building.id}>
                    {building.name}
                  </option>
                ) : (
                  building.id
                )
              )}
            </Select>
            {errors?.building && (
              <Text color="red">{errors.building.message}</Text>
            )}
          </Box>
        </Stack>
        <Button isActive type="submit" colorScheme={teal}>
          Update Office
        </Button>
      </form>
    </>
  );
};

export default OfficeEditForm;
