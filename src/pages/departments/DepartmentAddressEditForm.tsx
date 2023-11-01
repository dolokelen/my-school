import { Box, Button, Input, Stack, Text } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { red, teal } from "../../cacheKeysAndRoutes";
import {
    DepartmentAddress,
    useEditDepartmentAddress
} from "../../hooks/useDepartments";

const schema = z.object({
  id: z.number().optional(),
  country: z.string().min(4, {
    message: "Department counrty is required and must be at least 4 words.",
  }),
  county: z.string().min(4, {
    message: "Department county is required and must be at least 4 words.",
  }),
  city: z.string().min(4, {
    message: "Department city is required and must be at least 4 words.",
  }),
  district: z.string().min(1, {
    message: "Department district is required and must be at least a number.",
  }),
  community: z.string().min(2, {
    message: "Department community is required and must be at least 2 letters.",
  }),
});

export type DepartmentAddressEditFormData = z.infer<typeof schema>;

interface Props {
  departmentAddress?: DepartmentAddress;
  departmentId: number;
}
const DepartmentAddressEditForm = ({ departmentAddress, departmentId }: Props) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<DepartmentAddressEditFormData>({ resolver: zodResolver(schema) });

  const mutation = useEditDepartmentAddress(() =>
    toast.success("Department Address Updated Successfully!")
  );

  const onSubmit = (FormData: DepartmentAddressEditFormData) => {
    mutation.mutate({ ...FormData, id: departmentId });
  };

  useEffect(() => {
    if (departmentAddress) {
      setValue("country", departmentAddress?.country);
      setValue("county", departmentAddress?.county);
      setValue("city", departmentAddress?.city);
      setValue("district", departmentAddress?.district);
      setValue("community", departmentAddress?.community);
    }
  }, [departmentAddress, setValue]);

  const my = 2;
  const fontSize = "1rem";
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack marginBottom={2}>
          <Box mx="1rem" fontSize="1.6rem" w="auto" mt="3rem">
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
