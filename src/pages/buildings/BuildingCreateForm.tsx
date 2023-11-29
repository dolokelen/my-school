import { Box, Button, Input, Stack, Text } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { http_400_BAD_REQUEST_CUSTOM_MESSAGE } from "../../Utilities/httpErrorStatus";
import { blue, red } from "../../cacheKeysAndRoutes";
import { useCreateBuilding } from "../../hooks/useBuildings";
import { hasPermission } from "../../Utilities/hasPermissions";
import AccessDenyPage from "../AccessDenyPage";

const address = z.object({
  country: z.string().min(4, {
    message: "Building counrty is required and must be at least 4 words.",
  }),
  county: z.string().min(4, {
    message: "Building county is required and must be at least 4 words.",
  }),
  city: z.string().min(4, {
    message: "Building city is required and must be at least 4 words.",
  }),
  district: z.string().min(1, {
    message: "Building district is required and must be at least a number.",
  }),
  community: z.string().min(2, {
    message: "Building community is required and must be at least 2 letters.",
  }),
});

const schema = z.object({
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
  buildingaddress: address,
});

export type BuildingCreateFormData = z.infer<typeof schema>;

const BuildingCreateForm = () => {
  
  const onCreate = () => toast.success("Building Added Successfully!");
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BuildingCreateFormData>({ resolver: zodResolver(schema) });
  
  const mutation = useCreateBuilding(onCreate, () => reset());
  const onSubmit = (data: BuildingCreateFormData) => {
    mutation.mutate(data);
  };
  
  const customErrorMessage = http_400_BAD_REQUEST_CUSTOM_MESSAGE(mutation);
  if (!hasPermission("Can add building")) return <AccessDenyPage />;
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

          <Box mx="15rem" fontSize="1.6rem" w="auto" mt="2rem">
            Building Address Section
          </Box>

              <Box my={my}>
                <Text fontSize={fontSize}>Country</Text>
                <Input {...register(`buildingaddress.country`)} size="md" />
                {errors?.buildingaddress?.country && (
                  <Text color={red}>
                    {errors.buildingaddress.country.message}
                  </Text>
                )}
              </Box>

              <Box my={my}>
                <Text fontSize={fontSize}>County</Text>
                <Input {...register(`buildingaddress.county`)} size="md" />
                {errors?.buildingaddress?.county && (
                  <Text color={red}>
                    {errors.buildingaddress?.county.message}
                  </Text>
                )}
              </Box>

              <Box my={my}>
                <Text fontSize={fontSize}>City</Text>
                <Input {...register(`buildingaddress.city`)} size="md" />
                {errors.buildingaddress?.city && (
                  <Text color={red}>
                    {errors.buildingaddress.city?.message}
                  </Text>
                )}
              </Box>

              <Box my={my}>
                <Text fontSize={fontSize}>District</Text>
                <Input {...register(`buildingaddress.district`)} size="md" />
                {errors.buildingaddress?.district && (
                  <Text color={red}>
                    {errors.buildingaddress.district?.message}
                  </Text>
                )}
              </Box>

              <Box my={my}>
                <Text fontSize={fontSize}>Community</Text>
                <Input {...register(`buildingaddress.community`)} size="md" />
                {errors.buildingaddress?.community && (
                  <Text color={red}>
                    {errors.buildingaddress.community?.message}
                  </Text>
                )}
              </Box>

        </Stack>
        <Button type="submit" colorScheme={blue}>
          Add Building
        </Button>
      </form>
    </>
  );
};

export default BuildingCreateForm;
