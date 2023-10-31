import { Box, Button, Input, Stack, Text, Textarea } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { http_400_BAD_REQUEST_CUSTOM_MESSAGE } from "../../Utilities/httpErrorStatus";
import { blue, red } from "../../cacheKeysAndRoutes";
import { useCreateDepartment } from "../../hooks/useDepartments";

const departmentContact = z.object({
  phone: z.string().min(10, {
    message:
      "Department phone is required and must be at least 10 valid phone numbers.",
  }),
  email: z
    .string()
    .min(4, { message: "Email is required." })
    .email("This is not a valid email."),
});

const schema = z.object({
  name: z.string().min(2, {
    message: "Department name is required and must be at least 2 characters.",
  }),
  budget: z.number({ invalid_type_error: "Budget is required." }).min(5, {
    message: "Department budget must be at least $100.",
  }),
  duty: z.string().min(2, {
    message: "Department duty is required and must be at least 2 words.",
  }),
  departmentaddress: z.object({
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
      message:
        "Department community is required and must be at least 2 letters.",
    }),
  }),
  departmentcontact: z.array(departmentContact),
});

export type DepartmentCreateFormData = z.infer<typeof schema>;

const DepartmentCreateForm = () => {
  const onCreate = () => toast.success("Department Created Successfully!");

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<DepartmentCreateFormData>({ resolver: zodResolver(schema) });

  const { fields, append, remove } = useFieldArray({
    control, 
    name: "departmentcontact",
  });

  const mutation = useCreateDepartment(onCreate, () => reset());
  const onSubmit = (data: DepartmentCreateFormData) => {
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

          <Box mx="15rem" fontSize="1.6rem" w="auto" mt="2rem">
            Department Address Section
          </Box>
          <Box my={my}>
            <Text fontSize={fontSize}>Country</Text>
            <Input {...register("departmentaddress.country")} size="md" />
            {errors.departmentaddress?.country && (
              <Text color={red}>
                {errors.departmentaddress.country.message}
              </Text>
            )}
          </Box>

          <Box my={my}>
            <Text fontSize={fontSize}>County</Text>
            <Input {...register("departmentaddress.county")} size="md" />
            {errors.departmentaddress?.county && (
              <Text color={red}>{errors.departmentaddress.county.message}</Text>
            )}
          </Box>

          <Box my={my}>
            <Text fontSize={fontSize}>City</Text>
            <Input {...register("departmentaddress.city")} size="md" />
            {errors.departmentaddress?.city && (
              <Text color={red}>{errors.departmentaddress.city.message}</Text>
            )}
          </Box>

          <Box my={my}>
            <Text fontSize={fontSize}>District</Text>
            <Input {...register("departmentaddress.district")} size="md" />
            {errors.departmentaddress?.district && (
              <Text color={red}>
                {errors.departmentaddress.district.message}
              </Text>
            )}
          </Box>

          <Box my={my}>
            <Text fontSize={fontSize}>Community</Text>
            <Input {...register("departmentaddress.community")} size="md" />
            {errors.departmentaddress?.community && (
              <Text color={red}>
                {errors.departmentaddress.community.message}
              </Text>
            )}
          </Box>

          <Box mx="15rem" fontSize="1.6rem" w="auto" mt="2rem">
            Department Contact Section
          </Box>

          {fields.map((contact, index) => (
            <Box key={contact.id}>
              <Box my={my}>
                <Text fontSize={fontSize}>Phone</Text>
                <Input
                  {...register(`departmentcontact.${index}.phone`)}
                  size="md"
                />
                {errors?.departmentcontact?.[index]?.phone && (
                  <Text color={red}>
                    {errors.departmentcontact[index]?.phone?.message}
                  </Text>
                )}
              </Box>

              <Box my={my}>
                <Text fontSize={fontSize}>Email</Text>
                <Input
                  {...register(`departmentcontact.${index}.email`)}
                  size="md"
                />
                {errors?.departmentcontact?.[index]?.email && (
                  <Text color={red}>
                    {errors.departmentcontact[index]?.email?.message}
                  </Text>
                )}
              </Box>
            </Box>
          ))}
          <Button onClick={() => append({ phone: "", email: "" })}>
            Add Contact
          </Button>
        </Stack>
        <Button
          onClick={() =>
            fields.length === 0 && append({ phone: "", email: "" })
          }
          type="submit"
          colorScheme={blue}
        >
          Create Department
        </Button>
      </form>
    </>
  );
};

export default DepartmentCreateForm;
