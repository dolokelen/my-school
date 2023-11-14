import { Box, Button, Input, Stack, Text } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { http_400_BAD_REQUEST_CUSTOM_MESSAGE } from "../../Utilities/httpErrorStatus";
import { red, teal } from "../../cacheKeysAndRoutes";
import { Building, useEditBuilding } from "../../hooks/useBuildings";
import AccessDenyPage from "../AccessDenyPage";
import { hasPermission } from "../../Utilities/hasPermissions";

const schema = z.object({
  id: z.number().optional(),
  name: z.string().min(2, {
    message: "Building name is required and must be at least 2 characters.",
  }),
  dimension: z.string().min(5, {
    message: "Building dimension is required, e.g: 20, 15",
  }),
  office_counts: z
    .number({ invalid_type_error: "The number of offices" })
    .min(1, { message: "Enter 0 if not available" }),
  classroom_counts: z
    .number({ invalid_type_error: "The number of classrooms" })
    .min(1, { message: "Enter 0 if not available" }),
  toilet_counts: z
    .number({ invalid_type_error: "The number of toilet" })
    .min(1, { message: "Enter 0 if not available" }),
  date_constructed: z.string().min(10, {
    message:
      "Building constructed data is required and must be like: 2023-11-22",
  }),
});

export type BuildingEditFormData = z.infer<typeof schema>;

interface Props {
  building?: Building;
}
const BuildingEditForm = ({ building }: Props) => {
  if (!hasPermission("Can change building")) return <AccessDenyPage />;

  const onCreate = () => toast.success("Building Updated Successfully!");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<BuildingEditFormData>({ resolver: zodResolver(schema) });

  const mutation = useEditBuilding(onCreate);
  const onSubmit = (data: BuildingEditFormData) => {
    mutation.mutate({ ...data, id: building?.id });
  };

  useEffect(() => {
    if (building) {
      setValue("name", building?.name);
      setValue("dimension", building?.dimension);
      setValue("office_counts", building?.office_counts);
      setValue("classroom_counts", building?.classroom_counts);
      setValue("toilet_counts", building?.toilet_counts);
      setValue("date_constructed", building?.date_constructed);
    }
  }, [building, setValue]);

  const customErrorMessage = http_400_BAD_REQUEST_CUSTOM_MESSAGE(mutation);
  const my = 2;
  const fontSize = "1rem";

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack marginBottom={2}>
          <Box my={my}>
            <Text fontSize={fontSize}>Building name</Text>
            <Input {...register("name")} type="text" size="md" />
            {errors?.name && <Text color={red}>{errors.name.message}</Text>}
            {mutation.isError && <Text color={red}>{customErrorMessage}</Text>}
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
            <Input
              {...register("office_counts", { valueAsNumber: true })}
              type="number"
              size="md"
            />
            {errors?.office_counts && (
              <Text color={red}>{errors.office_counts.message}</Text>
            )}
          </Box>
          <Box my={my}>
            <Text fontSize={fontSize}>Number of Classrooms</Text>
            <Input
              {...register("classroom_counts", { valueAsNumber: true })}
              type="number"
              size="md"
            />
            {errors?.classroom_counts && (
              <Text color={red}>{errors.classroom_counts.message}</Text>
            )}
          </Box>

          <Box my={my}>
            <Text fontSize={fontSize}>Number of toilets</Text>
            <Input
              {...register("toilet_counts", { valueAsNumber: true })}
              type="number"
              size="md"
            />
            {errors?.toilet_counts && (
              <Text color={red}>{errors.toilet_counts.message}</Text>
            )}
          </Box>

          <Box my={my}>
            <Text fontSize={fontSize}>Date constructed</Text>
            <Input {...register("date_constructed")} type="text" size="md" />
            {errors?.date_constructed && (
              <Text color={red}>{errors.date_constructed.message}</Text>
            )}
          </Box>
          
        </Stack>
        <Button isActive type="submit" colorScheme={teal}>
          Update Building
        </Button>
      </form>
    </>
  );
};

export default BuildingEditForm;
