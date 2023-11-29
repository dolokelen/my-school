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
import { blue, red } from "../../cacheKeysAndRoutes";
import { useDepartments } from "../../hooks/useDepartments";
import { useEmployees, useRegisterEmployee } from "../../hooks/useEmployees";
import { useOffices } from "../../hooks/useOffices";
import {
  employmentStatuses,
  genders,
  highestEducations,
  maritalStatuses,
  religions,
} from "../data";
import { hasPermission } from "../../Utilities/hasPermissions";
import AccessDenyPage from "../../pages/AccessDenyPage";
import { userRegistraErrMessage } from "../../Utilities/httpErrorStatus";

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

const address = z.object({
  country: z.string().min(4, {
    message: "Employee counrty is required and must be at least 4 words.",
  }),
  county: z.string().min(4, {
    message: "Employee county is required and must be at least 4 words.",
  }),
  city: z.string().min(4, {
    message: "Employee city is required and must be at least 4 words.",
  }),
  district: z.string().min(1, {
    message: "Employee district is required and must be at least a number.",
  }),
  community: z.string().min(2, {
    message: "Employee community is required and must be at least 2 letters.",
  }),
});

const schema = z.object({
  user: userSchema,
  employeeaddress: address,
  gender: z.string().min(1, { message: "Gender is required" }),
  marital_status: z.string().min(1, { message: "Marital status is required" }),
  employment_status: z
    .string()
    .min(1, { message: "Employment status is required" }),
  religion: z.string().min(1, { message: "Religion is required" }),
  phone: z.string().min(10, { message: "Phone is required" }),
  birth_date: z
    .string()
    .min(10, { message: "Birth date is required. e.g:. 1847-01-22" }),
  level_of_education: z
    .string()
    .min(1, { message: "Highest edcation obtained is required." }),
  salary: z
    .number({ invalid_type_error: "Salary is required" })
    .min(2, { message: "Salary is required" })
    .max(9999, { message: "Salary cannot exceed $ 9999" })
    .positive(),
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

    const address = data.employeeaddress;
    formData.append("employeeaddress.country", address.country);
    formData.append("employeeaddress.county", address.county);
    formData.append("employeeaddress.city", address.city);
    formData.append("employeeaddress.district", address.district);
    formData.append("employeeaddress.community", address.community);

    formData.append("gender", data.gender);
    formData.append("marital_status", data.marital_status);
    formData.append("employment_status", data.employment_status);
    formData.append("birth_date", data.birth_date);
    formData.append("religion", data.religion);
    formData.append("phone", data.phone);
    formData.append("salary", data.salary.toString());
    formData.append("level_of_education", data.level_of_education);
    formData.append("office", data.office.toString());
    formData.append("department", data.department.toString());
    formData.append("supervisor", data.supervisor.toString());

    imageFile && formData.append("image", imageFile);
    pdfFile && formData.append("term_of_reference", pdfFile);

    if (!formData.get("image") && !formData.get("term_of_reference"))
      return toast.error("Employee image and TOR are required!");

    registration.mutate(formData);
  };

  if (!hasPermission("Can add employee")) return <AccessDenyPage />;
  const marginButton = 3;

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
            <Text color={red}>{errors.user.username.message}</Text>
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
            <Text color={red}>{errors.user.email.message}</Text>
          )}
        </Box>
        <Box mb={marginButton}>
          <FormLabel htmlFor="phone">Phone Number</FormLabel>
          <Input {...register("phone")} name="phone" type="text" id="phone" />
          {errors?.phone && <Text color={red}>{errors.phone.message}</Text>}
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
            <Text color={red}>{errors.user.first_name.message}</Text>
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
            <Text color={red}>{errors.user.last_name.message}</Text>
          )}
        </Box>

        <Box mb={marginButton}>
          <FormLabel htmlFor="gender">Gender</FormLabel>
          <Select {...register("gender")}>
            {genders?.map((gender) => (
              <option key={gender.name} value={gender.name}>
                {gender.name}
              </option>
            ))}
          </Select>
          {errors?.gender && <Text color={red}>{errors.gender.message}</Text>}
        </Box>

        <Box mb={marginButton}>
          <FormLabel htmlFor="marital_status">Marital Status</FormLabel>
          <Select {...register("marital_status")}>
            {maritalStatuses?.map((status) => (
              <option key={status.name} value={status.name}>
                {status.name}
              </option>
            ))}
          </Select>
          {errors?.marital_status && (
            <Text color={red}>{errors.marital_status.message}</Text>
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
            <Text color={red}>{errors.birth_date.message}</Text>
          )}
        </Box>

        <Box mb={marginButton}>
          <FormLabel htmlFor="religion">Religion</FormLabel>
          <Select {...register("religion")}>
            {religions?.map((religion) => (
              <option key={religion.name} value={religion.name}>
                {religion.name}
              </option>
            ))}
          </Select>
          {errors?.religion && (
            <Text color={red}>{errors.religion.message}</Text>
          )}
        </Box>

        <Box mb={marginButton}>
          <FormLabel htmlFor="status">Emploment Status</FormLabel>
          <Select {...register("employment_status")}>
            {employmentStatuses?.map((status) => (
              <option key={status.name} value={status.name}>
                {status.name}
              </option>
            ))}
          </Select>
          {errors?.employment_status && (
            <Text color={red}>{errors.employment_status.message}</Text>
          )}
        </Box>

        <Box mb={marginButton}>
          <FormLabel htmlFor="level">Highest education level</FormLabel>
          <Select {...register("level_of_education")}>
            {highestEducations?.map((education) => (
              <option key={education.name} value={education.name}>
                {education.name}
              </option>
            ))}
          </Select>
          {errors?.level_of_education && (
            <Text color={red}>{errors.level_of_education.message}</Text>
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
          {errors?.salary && <Text color={red}>{errors.salary.message}</Text>}
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
            <Text color={red}>{errors.department.message}</Text>
          )}
        </Box>

        <Box mb={marginButton}>
          <FormLabel htmlFor="supervisor">Supervisor</FormLabel>
          <Select {...register("supervisor", { valueAsNumber: true })}>
            <option value={0}>---No Supervisor---</option>
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
          {errors?.office && <Text color={red}>{errors.office.message}</Text>}
        </Box>

        <Box mx="15rem" fontSize="1.6rem" w="auto" mt="2rem">
          Employee Address Section
        </Box>

        <Box my={marginButton}>
          <FormLabel htmlFor="country">Country</FormLabel>
          <Input {...register(`employeeaddress.country`)} size="md" />
          {errors?.employeeaddress?.country && (
            <Text color={red}>{errors.employeeaddress.country.message}</Text>
          )}
        </Box>

        <Box my={marginButton}>
          <FormLabel htmlFor="county">County</FormLabel>
          <Input {...register(`employeeaddress.county`)} size="md" />
          {errors?.employeeaddress?.county && (
            <Text color={red}>{errors.employeeaddress?.county.message}</Text>
          )}
        </Box>

        <Box my={marginButton}>
          <FormLabel htmlFor="city">City</FormLabel>
          <Input {...register(`employeeaddress.city`)} size="md" />
          {errors.employeeaddress?.city && (
            <Text color={red}>{errors.employeeaddress.city?.message}</Text>
          )}
        </Box>

        <Box my={marginButton}>
          <FormLabel htmlFor="district">District</FormLabel>
          <Input {...register(`employeeaddress.district`)} size="md" />
          {errors.employeeaddress?.district && (
            <Text color={red}>{errors.employeeaddress.district?.message}</Text>
          )}
        </Box>

        <Box my={marginButton}>
          <FormLabel htmlFor="community">Community</FormLabel>
          <Input {...register(`employeeaddress.community`)} size="md" />
          {errors.employeeaddress?.community && (
            <Text color={red}>{errors.employeeaddress.community?.message}</Text>
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
            <Text color={red}>{errors.user.password.message}</Text>
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
            <Text color={red}>{errors.user.confirm_password.message}</Text>
          )}
        </Box>
        <Button
          onClick={() =>
            registration.isError && toast.error(userRegistraErrMessage())
          }
          type="submit"
          colorScheme={blue}
        >
          Register Employee
        </Button>
      </form>
    </>
  );
};

export default EmployeeRegistrationForm;
