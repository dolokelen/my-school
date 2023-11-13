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
import { useMajors } from "../../hooks/useMajors";
import { useRegisterStudent } from "../../hooks/useStudents";
import { useTeachers } from "../../hooks/useTeachers";
import { genders, levels, religions } from "../data";

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
    message: "Student counrty is required and must be at least 4 words.",
  }),
  county: z.string().min(4, {
    message: "Student county is required and must be at least 4 words.",
  }),
  city: z.string().min(4, {
    message: "Student city is required and must be at least 4 words.",
  }),
  district: z.string().min(1, {
    message: "Student district is required and must be at least a number.",
  }),
  community: z.string().min(2, {
    message: "Student community is required and must be at least 2 letters.",
  }),
});

const schema = z.object({
  user: userSchema,
  studentaddress: address,
  gender: z.string().min(1, { message: "Gender is required" }),
  religion: z.string().min(1, { message: "Religion is required" }),
  phone: z.string().min(10, { message: "Phone is required" }),
  birth_date: z.string().min(10, { message: "Birth date is required." }),
  level: z.string().min(1, { message: "Status is required." }),
  is_transfer: z.boolean(),
  supervisor: z.number({ required_error: "Student supervisor is required" }),
  department: z.number({ required_error: "Student department is required" }),
  major: z.number({ required_error: "Student major is required" }),
  registration_fee: z
    .number({
      required_error: "Amount must be greater than 0",
    })
    .positive(),
});

export type StudentRegistrationFormData = z.infer<typeof schema>;

const StudentRegistrationForm = () => {
  const { data: departments } = useDepartments();
  const { data: majors } = useMajors();
  const { data: teachers } = useTeachers();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<StudentRegistrationFormData>({
    resolver: zodResolver(schema),
  });

  const [imageFile, setImageFile] = useState<File | undefined>();

  const onCreate = () => toast.success("Registration Done Successfully!");
  const registration = useRegisterStudent(onCreate, () => reset());

  function handleImageChange(e: React.FormEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };
    const selectedFile = target.files[0];

    if (selectedFile) setImageFile(selectedFile);
  }

  const onSubmit = (data: StudentRegistrationFormData) => {
    const formData = new FormData();
    const user = data.user;

    formData.append("user.username", user.username);
    formData.append("user.email", user.email);
    formData.append("user.first_name", user.first_name);
    formData.append("user.last_name", user.last_name);
    formData.append("user.is_active", user.is_active.toString());
    formData.append("user.password", user.password);
    formData.append("user.confirm_password", user.confirm_password);

    const address = data.studentaddress;
    formData.append("studentaddress.country", address.country);
    formData.append("studentaddress.county", address.county);
    formData.append("studentaddress.city", address.city);
    formData.append("studentaddress.district", address.district);
    formData.append("studentaddress.community", address.community);

    formData.append("gender", data.gender);
    formData.append("major", data.major.toString());
    formData.append("level", data.level);
    formData.append("is_transfer", data.is_transfer.toString());
    formData.append("birth_date", data.birth_date);
    formData.append("religion", data.religion);
    formData.append("phone", data.phone);
    formData.append("registration_fee", data.registration_fee.toString());
    formData.append("department", data.department.toString());
    formData.append("supervisor", data.supervisor.toString());

    imageFile && formData.append("image", imageFile);

    if (!formData.get("image"))
      return toast.error("Student photo is required!");

    registration.mutate(formData);
  };

  const marginButton = 3;
  const handleMutationError = () => {
    if (registration.isError) toast.error(registration.error.message);
  };
  return (
    <>
      <Heading mb={5}>Student Registration Form</Heading>
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
          <FormLabel htmlFor="major">Major</FormLabel>
          <Select {...register("major", { valueAsNumber: true })}>
            {majors?.map((major) => (
              <option key={major.id} value={major.id}>
                {major.name}
              </option>
            ))}
          </Select>
          {errors?.major && <Text color={red}>{errors.major.message}</Text>}
        </Box>

        <Box mb={marginButton}>
          <FormLabel htmlFor="major">Status</FormLabel>
          <Select {...register("level")}>
            {levels?.map((level) => (
              <option key={level.name} value={level.name}>
                {level.name}
              </option>
            ))}
          </Select>
          {errors?.major && <Text color={red}>{errors.major.message}</Text>}
        </Box>

        <Box mb={marginButton}>
          <Checkbox {...register("is_transfer")} name="is_transfer">
            Transfer Student?
          </Checkbox>
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
          <FormLabel htmlFor="status">Registration Fee</FormLabel>
          <Input
            {...register("registration_fee", { valueAsNumber: true })}
            id="status"
            name="registration_fee"
            type="number"
          />

          {errors?.registration_fee && (
            <Text color={red}>{errors.registration_fee.message}</Text>
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
            {teachers?.map((teacher) => (
              <option key={teacher.user.id} value={teacher.user.id}>
                {teacher.user.full_name}
              </option>
            ))}
          </Select>
        </Box>

        <Box mx="15rem" fontSize="1.6rem" w="auto" mt="2rem">
          Student Address Section
        </Box>

        <Box my={marginButton}>
          <FormLabel htmlFor="country">Country</FormLabel>
          <Input {...register("studentaddress.country")} size="md" />
          {errors?.studentaddress?.country && (
            <Text color={red}>{errors.studentaddress.country.message}</Text>
          )}
        </Box>

        <Box my={marginButton}>
          <FormLabel htmlFor="county">County</FormLabel>
          <Input {...register("studentaddress.county")} size="md" />
          {errors?.studentaddress?.county && (
            <Text color={red}>{errors.studentaddress?.county.message}</Text>
          )}
        </Box>

        <Box my={marginButton}>
          <FormLabel htmlFor="city">City</FormLabel>
          <Input {...register("studentaddress.city")} size="md" />
          {errors.studentaddress?.city && (
            <Text color={red}>{errors.studentaddress.city?.message}</Text>
          )}
        </Box>

        <Box my={marginButton}>
          <FormLabel htmlFor="district">District</FormLabel>
          <Input {...register("studentaddress.district")} size="md" />
          {errors.studentaddress?.district && (
            <Text color={red}>{errors.studentaddress.district?.message}</Text>
          )}
        </Box>

        <Box my={marginButton}>
          <FormLabel htmlFor="community">Community</FormLabel>
          <Input {...register("studentaddress.community")} size="md" />
          {errors.studentaddress?.community && (
            <Text color={red}>{errors.studentaddress.community?.message}</Text>
          )}
        </Box>

        <Box mb={marginButton}>
          <Checkbox {...register("user.is_active")} name="user.is_active">
            Student can login?
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
        <Button type="submit" colorScheme={blue} onClick={handleMutationError}>
          Register Student
        </Button>
      </form>
    </>
  );
};

export default StudentRegistrationForm;
