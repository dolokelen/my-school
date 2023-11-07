import {
  Box,
  Button,
  Checkbox,
  FormLabel,
  Heading,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { blue } from "../../cacheKeysAndRoutes";
import { useDepartments } from "../../hooks/useDepartments";
import { useEmployees, useRegisterEmployee } from "../../hooks/useEmployees";
import { useOffices } from "../../hooks/useOffices";
import {
  employmentStatuses,
  genders,
  maritalStatuses,
  religions,
} from "./employeeData";

const userSchema = z
  .object({
    username: z.string().min(1, { message: "Username is required." }),
    email: z
      .string()
      .min(3, { message: "Email is required." })
      .email("This is not a valid email address."),
    first_name: z.string().min(2, { message: "First name is required." }),
    last_name: z.string().min(2, { message: "Last name is required." }),
    is_active: z.boolean(),
    password: z
      .string()
      .min(8, { message: "Password cannot be less than 8 characters." }),
    confirm_password: z
      .string()
      .min(8, { message: "Password cannot be less than 8 charachers." }),
  })
  .refine(
    (values) => {
      return values.password === values.confirm_password;
    },
    {
      message: "Passwords must match!",
      path: ["confirm_password"],
    }
  );

const schema = z.object({
  user: userSchema,
  gender: z.string().min(1, { message: "Gender is required" }),
  marital_status: z.string().min(1, { message: "Marital status is required" }),
  employment_status: z
    .string()
    .min(1, { message: "Employment status is required" }),
  religion: z.string().min(1, { message: "Religion is required" }),
  birth_date: z.string({
    required_error: "Birth date is required.",
  }),
  salary: z
    .number({ invalid_type_error: "Salary is required" })
    .min(2, { message: "Salary is required" }),
  supervisor: z.any(),
  department: z.number({ invalid_type_error: "Department is required" }),
  office: z.number({ invalid_type_error: "Office is required" }),
});

export type EmployeeRegistrationFormData = z.infer<typeof schema>;

const EmployeeRegistrationForm = () => {
  const { data: departments } = useDepartments();
  const { data: employees } = useEmployees();
  const { data: offices } = useOffices();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EmployeeRegistrationFormData>({
    resolver: zodResolver(schema),
  });

  const [imageFile, setImageFile] = useState<File | undefined>();
  const [pdfFile, setPdfFile] = useState<File | undefined>();

  const onCreate = () => toast.success("Registration Done Successfully!");
  const registration = useRegisterEmployee(onCreate, () => reset());

  function handleImageChange(e: React.FormEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };
    const selectedFile = target.files[0];

    if (selectedFile) setImageFile(selectedFile);
  }

  function handlePdfChange(e: React.FormEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };
    const selectedFile = target.files[0];

    if (selectedFile) setPdfFile(selectedFile);
  }

  const onSubmit = (data: EmployeeRegistrationFormData) => {
    const formData = new FormData();
    const user = data.user;

    formData.append("user.username", user.username);
    formData.append("user.email", user.email);
    formData.append("user.first_name", user.first_name);
    formData.append("user.last_name", user.last_name);
    formData.append("user.is_active", user.is_active.toString());
    formData.append("user.password", user.password);
    formData.append("user.confirm_password", user.confirm_password);

    formData.append("gender", data.gender);
    formData.append("marital_status", data.marital_status);
    formData.append("employment_status", data.employment_status);
    formData.append("birth_date", data.birth_date);
    formData.append("religion", data.religion);
    formData.append("salary", data.salary.toString());
    formData.append("office", data.office.toString());
    formData.append("department", data.department.toString());
    formData.append("supervisor", data.supervisor.toString());

    imageFile && formData.append("image", imageFile);
    pdfFile && formData.append("term_of_reference", pdfFile);

    if (!formData.get("image") && !formData.get("term_of_reference"))
      return toast.error("Employee image and TOR are required!");

    registration.mutate(formData);
  };

  const marginButton = 3;
  const errMessageColor = "red";

  return (
    <>
      <Heading mb={5}>Employee Registration Form</Heading>
      {registration.isError && (
        <Text color="red">{registration.error.message}</Text>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box mb={marginButton}>
          <FormLabel htmlFor="username">Username</FormLabel>
          <Input
            {...register("user.username")}
            name="user.username"
            type="text"
            id="username"
          />
          {errors.user?.username && (
            <Text color={errMessageColor}>{errors.user.username.message}</Text>
          )}
        </Box>
        <Box mb={marginButton}>
          <FormLabel htmlFor="email">Email address</FormLabel>
          <Input
            {...register("user.email")}
            name="user.email"
            type="email"
            id="email"
          />
          {errors.user?.email && (
            <Text color={errMessageColor}>{errors.user.email.message}</Text>
          )}
        </Box>
        <Box mb={marginButton}>
          <FormLabel htmlFor="first_name">First Name</FormLabel>
          <Input
            {...register("user.first_name")}
            name="user.first_name"
            type="text"
            id="first_name"
          />
          {errors.user?.first_name && (
            <Text color={errMessageColor}>
              {errors.user.first_name.message}
            </Text>
          )}
        </Box>
        <Box mb={marginButton}>
          <FormLabel htmlFor="last_name">Last Name</FormLabel>
          <Input
            {...register("user.last_name")}
            name="user.last_name"
            type="text"
            id="last_name"
          />
          {errors.user?.last_name && (
            <Text color={errMessageColor}>{errors.user.last_name.message}</Text>
          )}
        </Box>

        <Box mb={marginButton}>
          <FormLabel htmlFor="gender">Gender</FormLabel>
          <Select {...register("gender")}>
            {genders?.map((gender) => (
              <option key={gender.value} value={gender.value}>
                {gender.name}
              </option>
            ))}
          </Select>
          {errors?.gender && (
            <Text color={errMessageColor}>{errors.gender.message}</Text>
          )}
        </Box>

        <Box mb={marginButton}>
          <FormLabel htmlFor="marital_status">Marital Status</FormLabel>
          <Select {...register("marital_status")}>
            {maritalStatuses?.map((status) => (
              <option key={status.value} value={status.value}>
                {status.name}
              </option>
            ))}
          </Select>
          {errors?.marital_status && (
            <Text color={errMessageColor}>{errors.marital_status.message}</Text>
          )}
        </Box>

        <Box mb={marginButton}>
          <FormLabel htmlFor="birth_date">Birth Date</FormLabel>
          <Input
            {...register("birth_date")}
            name="birth_date"
            type="text"
            id="birth_date"
          />
          {errors?.birth_date && (
            <Text color={errMessageColor}>{errors.birth_date.message}</Text>
          )}
        </Box>

        <Box mb={marginButton}>
          <FormLabel htmlFor="religion">Religion</FormLabel>
          <Select {...register("religion")}>
            {religions?.map((religion) => (
              <option key={religion.value} value={religion.value}>
                {religion.name}
              </option>
            ))}
          </Select>
          {errors?.religion && (
            <Text color={errMessageColor}>{errors.religion.message}</Text>
          )}
        </Box>

        <Box mb={marginButton}>
          <FormLabel htmlFor="status">Religion</FormLabel>
          <Select {...register("employment_status")}>
            {employmentStatuses?.map((status) => (
              <option key={status.value} value={status.value}>
                {status.name}
              </option>
            ))}
          </Select>
          {errors?.employment_status && (
            <Text color={errMessageColor}>
              {errors.employment_status.message}
            </Text>
          )}
        </Box>

        <Box mb={marginButton}>
          <FormLabel htmlFor="salary">Salary</FormLabel>
          <Input
            {...register("salary", { valueAsNumber: true })}
            name="salary"
            type="number"
            id="salary"
          />
          {errors?.salary && (
            <Text color={errMessageColor}>{errors.salary.message}</Text>
          )}
        </Box>

        <Box mb={marginButton}>
          <FormLabel htmlFor="image">Image</FormLabel>
          <Input
            onChange={handleImageChange}
            name="image"
            type="file"
            id="image"
          />
        </Box>

        <Box mb={marginButton}>
          <FormLabel htmlFor="term_of_reference">Term of Reference</FormLabel>
          <Input
            onChange={handlePdfChange}
            name="term_of_reference"
            type="file"
            id="term_of_reference"
          />
        </Box>

        <Box mb={marginButton}>
          <FormLabel htmlFor="department">Department</FormLabel>
          <Select {...register("department", { valueAsNumber: true })}>
            {departments?.map((department) => (
              <option key={department.id} value={department.id}>
                {department.name}
              </option>
            ))}
          </Select>
          {errors?.department && (
            <Text color={errMessageColor}>{errors.department.message}</Text>
          )}
        </Box>

        <Box mb={marginButton}>
          <FormLabel htmlFor="supervisor">Supervisor</FormLabel>
          <Select {...register("supervisor", { valueAsNumber: true })}>
            <option value={0}>---</option>
            {employees?.map((employee) => (
              <option key={employee.user.id} value={employee.user.id}>
                {employee.user.full_name}
              </option>
            ))}
          </Select>
        </Box>

        <Box mb={marginButton}>
          <FormLabel htmlFor="office">Office</FormLabel>
          <Select {...register("office", { valueAsNumber: true })}>
            {offices?.map((office) => (
              <option key={office.id} value={office.id}>
                {office.building.name}, office {office.id}
              </option>
            ))}
          </Select>
          {errors?.office && (
            <Text color={errMessageColor}>{errors.office.message}</Text>
          )}
        </Box>

        <Box mb={marginButton}>
          <Checkbox {...register("user.is_active")} name="user.is_active">
            Employee can login?
          </Checkbox>
        </Box>
        <Box mb={marginButton}>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            {...register("user.password")}
            name="user.password"
            type="password"
            id="password"
          />
          {errors.user?.password && (
            <Text color={errMessageColor}>{errors.user.password.message}</Text>
          )}
        </Box>
        <Box mb={marginButton}>
          <FormLabel htmlFor="confirm_password">Confirm Password</FormLabel>
          <Input
            {...register("user.confirm_password")}
            name="user.confirm_password"
            type="password"
            id="confirm_password"
          />
          {errors.user?.confirm_password && (
            <Text color={errMessageColor}>
              {errors.user.confirm_password.message}
            </Text>
          )}
        </Box>
        <Button type="submit" colorScheme={blue}>
          Register Employee
        </Button>
      </form>
    </>
  );
};

export default EmployeeRegistrationForm;
