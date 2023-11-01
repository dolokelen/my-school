import { Box, Button, Input, Stack, Text } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { red, teal } from "../../cacheKeysAndRoutes";
import { Address } from "../../hooks/useAddress";
import { useEditBuildingAddress } from "../../hooks/useBuildings";

const schema = z.object({
  id: z.number().optional(),
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

export type BuildingAddressEditFormData = z.infer<typeof schema>;

interface Props {
  buildingAddress?: Address;
  buildingId: number;
}
const DepartmentAddressEditForm = ({ buildingAddress, buildingId }: Props) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<BuildingAddressEditFormData>({ resolver: zodResolver(schema) });

  const mutation = useEditBuildingAddress(() =>
    toast.success("Building Address Updated Successfully!")
  );

  const onSubmit = (FormData: BuildingAddressEditFormData) => {
    mutation.mutate({ ...FormData, id: buildingId });
  };

  useEffect(() => {
    if (buildingAddress) {
      setValue("country", buildingAddress?.country);
      setValue("county", buildingAddress?.county);
      setValue("city", buildingAddress?.city);
      setValue("district", buildingAddress?.district);
      setValue("community", buildingAddress?.community);
    }
  }, [buildingAddress, setValue]);

  const my = 2;
  const fontSize = "1rem";
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack marginBottom={2} width="90%">
          <Box fontSize="1.6rem" mt="3rem">
            Department Address Update Form
          </Box>
          <Box my={my}>
            <Text fontSize={fontSize}>Country</Text>
            <Input {...register("country")} size="md" />
            {errors?.country && (
              <Text color={red}>{errors.country.message}</Text>
            )}
          </Box>

          <Box my={my}>
            <Text fontSize={fontSize}>County</Text>
            <Input {...register("county")} size="md" />
            {errors?.county && <Text color={red}>{errors.county.message}</Text>}
          </Box>

          <Box my={my}>
            <Text fontSize={fontSize}>City</Text>
            <Input {...register("city")} size="md" />
            {errors?.city && <Text color={red}>{errors.city.message}</Text>}
          </Box>

          <Box my={my}>
            <Text fontSize={fontSize}>District</Text>
            <Input {...register("district")} size="md" />
            {errors?.district && (
              <Text color={red}>{errors.district.message}</Text>
            )}
          </Box>

          <Box my={my}>
            <Text fontSize={fontSize}>Community</Text>
            <Input {...register("community")} size="md" />
            {errors?.community && (
              <Text color={red}>{errors.community.message}</Text>
            )}
          </Box>
        </Stack>
        <Button isActive type="submit" colorScheme={teal}>
          Update Department Address
        </Button>
      </form>
    </>
  );
};

export default DepartmentAddressEditForm;
