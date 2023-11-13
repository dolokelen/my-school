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
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { blue, red } from "../../cacheKeysAndRoutes";
import { useDepartments } from "../../hooks/useDepartments";
import { useMajors } from "../../hooks/useMajors";
import { Student, useEditStudent } from "../../hooks/useStudents";
import { useTeachers } from "../../hooks/useTeachers";
import { genders, levels, religions } from "../data";

const userSchema = z.object({
  username: z.string().min(1, { message: "Username is required." }),
  email: z
    .string()
    .min(3, { message: "Email is required." })
    .email("This is not a valid email address."),
  first_name: z.string().min(2, { message: "First name is required." }),
  last_name: z.string().min(2, { message: "Last name is required." }),
  is_active: z.boolean(),
});

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

export type StudentEditFormData = z.infer<typeof schema>;

interface Props {
  student?: Student;
}
const StudentEditForm = ({ student }: Props) => {
  const { data: departments } = useDepartments();
  const { data: majors } = useMajors();
  const { data: teachers } = useTeachers();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<StudentEditFormData>({
    resolver: zodResolver(schema),
  });

  const [imageFile, setImageFile] = useState<File | undefined>();
  const onUpdate = () => toast.success("Record Updated Successfully!");
  const mutation = useEditStudent(onUpdate, student?.user.id!);

  function handleImageChange(e: React.FormEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };
    const selectedFile = target.files[0];

    if (selectedFile) setImageFile(selectedFile);
  }

  const onSubmit = (data: StudentEditFormData) => {
    const formData = new FormData();
    const user = data.user;

    formData.append("user.username", user.username);
    formData.append("user.email", user.email);
    formData.append("user.first_name", user.first_name);
    formData.append("user.last_name", user.last_name);
    formData.append("user.is_active", user.is_active.toString());

    const address = data.studentaddress;
    formData.append("studentaddress.country", address.country);
    formData.append("studentaddress.county", address.county);
    formData.append("studentaddress.city", address.city);
    formData.append("studentaddress.district", address.district);
    formData.append("studentaddress.community", address.community);

    formData.append("gender", data.gender);
    formData.append("major", data.major.toString());
    formData.append("level", data.level);
    formData.append("is_transfer", data.is_transfer.toString())
    formData.append("birth_date", data.birth_date);
    formData.append("religion", data.religion);
    formData.append("phone", data.phone);
    formData.append("registration_fee", data.registration_fee.toString());
    formData.append("department", data.department.toString());
    formData.append("supervisor", data.supervisor.toString());
    imageFile && formData.append("image", imageFile);

    mutation.mutate(formData);
  };

  const marginButton = 3;

  useEffect(() => {
    if (student) {
      setValue("user.username", student.user.username);
      setValue("user.email", student.user.email);
      setValue("user.first_name", student.user.first_name);
      setValue("user.last_name", student.user.last_name);
      setValue("user.is_active", student.user.is_active);

      setValue("studentaddress.country", student.studentaddress?.country);
      setValue("studentaddress.county", student.studentaddress?.county);
      setValue("studentaddress.city", student.studentaddress?.city);
      setValue("studentaddress.district", student.studentaddress?.district);
      setValue("studentaddress.community", student.studentaddress?.community);

      setValue("gender", student.gender);
      setValue("is_transfer", student.is_transfer);
      setValue("birth_date", student.birth_date);
      setValue("religion", student.religion);
      setValue("phone", student.phone);
      setValue("registration_fee", student.registration_fee);
      setValue("department", student.department.id);
      setValue("supervisor", student.supervisor.id);
    }
  }, [setValue, student]);

  const handleMutationError = () => {
    if (mutation.isError) toast.error(mutation.error.message);
  };
  return (
    <>
      <Heading size="lg" my={5}>
        Student Record Edit Form
      </Heading>
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
            <option value={student?.gender}>{student?.gender}</option>
            {genders?.map((gen) =>
              gen.name !== student?.gender ? (
                <option key={gen.name} value={gen.name}>
                  {gen.name}
                </option>
              ) : (
                gen.name
              )
            )}
          </Select>
          {errors?.gender && <Text color={red}>{errors.gender.message}</Text>}
        </Box>

        <Box mb={marginButton}>
          <FormLabel htmlFor="major">Major</FormLabel>
          <Select {...register("major", { valueAsNumber: true })}>
            <option value={student?.major.id}>{student?.major.name}</option>
            {majors?.map((major) =>
              major.id !== student?.major.id ? (
                <option key={major.id} value={major.id}>
                  {major.name}
                </option>
              ) : (
                major.id
              )
            )}
          </Select>
          {errors?.major && <Text color={red}>{errors.major.message}</Text>}
        </Box>

        <Box mb={marginButton}>
          <FormLabel htmlFor="major">Status</FormLabel>
          <Select {...register("level")}>
            <option value={student?.level}>{student?.level}</option>
            {levels?.map((level) =>
              level.name !== student?.level ? (
                <option key={level.name} value={level.name}>
                  {level.name}
                </option>
              ) : (
                level.name
              )
            )}
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
            <option value={student?.religion}>{student?.religion}</option>
            {religions?.map((reli) =>
              reli.name !== student?.religion ? (
                <option key={reli.name} value={reli.name}>
                  {reli.name}
                </option>
              ) : (
                reli.name
              )
            )}
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
            <option value={student?.department.id}>
              {student?.department.name}
            </option>
            {departments?.map((dep) =>
              dep.id !== student?.department.id ? (
                <option key={dep.id} value={dep.id}>
                  {dep.name}
                </option>
              ) : (
                dep.id
              )
            )}
          </Select>
          {errors?.department && (
            <Text color={red}>{errors.department.message}</Text>
          )}
        </Box>

        <Box mb={marginButton}>
          <FormLabel htmlFor="supervisor">Supervisor</FormLabel>
          <Select {...register("supervisor", { valueAsNumber: true })}>
            <option value={student?.supervisor.id}>
              {student?.supervisor.full_name}
            </option>
            {teachers?.map((teacher) =>
              teacher.user.id !== student?.supervisor.id ? (
                <option key={teacher.user.id} value={teacher.user.id}>
                  {teacher.user.full_name}
                </option>
              ) : (
                teacher.user.id
              )
            )}
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

        <Button type="submit" colorScheme={blue} onClick={handleMutationError}>
          Register Student
        </Button>
      </form>
    </>
  );
};

export default StudentEditForm;
