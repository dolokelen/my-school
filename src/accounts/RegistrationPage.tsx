import {
  Box,
  Button,
  FormLabel,
  Heading,
  Input,
  Text
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { useRegistration } from "../hooks/useRegistration";
// import jwtDecode from "jwt-decode";

interface jwtPlayLoad {
  user_id: string;
}

const schema = z
  .object({
    username: z.string().min(1, { message: "Username is required." }),
    email: z
      .string()
      .min(3, { message: "Email is required." })
      .email("This is not a valid email address."),
    first_name: z.string().min(2, { message: "First name is required." }),
    last_name: z.string().min(2, { message: "Last name is required." }),
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

export type RegistrationFormData = z.infer<typeof schema>;

const RegistrationPage = () => {
  // const token = localStorage.getItem("access_token");
  // if (token) {
  //   const decodeToken = jwtDecode(token) as jwtPlayLoad;
  //   console.log(decodeToken.user_id, "Executed.");
  // }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(schema),
  });

  const onCreate = () => toast.success("Registration Executed Successfully!");
  const registration = useRegistration(onCreate, () => reset());
  const onSubmit = (data: RegistrationFormData) => registration.mutate(data);

  if (registration.isError)
    return <Text colorScheme="red">{registration.error.message}</Text>;

  const marginButton = 3;
  const errMessageColor = "red";

  return (
    <>
      <Heading mb={5}>Registration Form</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box mb={marginButton}>
          <FormLabel htmlFor="username">Username</FormLabel>
          <Input
            {...register("username")}
            name="username"
            type="text"
            id="username"
          />
          {errors.username && (
            <Text color={errMessageColor}>{errors.username.message}</Text>
          )}
        </Box>
        <Box mb={marginButton}>
          <FormLabel htmlFor="email">Email address</FormLabel>
          <Input {...register("email")} name="email" type="email" id="email" />
          {errors.email && (
            <Text color={errMessageColor}>{errors.email.message}</Text>
          )}
        </Box>
        <Box mb={marginButton}>
          <FormLabel htmlFor="first_name">First Name</FormLabel>
          <Input
            {...register("first_name")}
            name="first_name"
            type="text"
            id="first_name"
          />
          {errors.first_name && (
            <Text color={errMessageColor}>{errors.first_name.message}</Text>
          )}
        </Box>
        <Box mb={marginButton}>
          <FormLabel htmlFor="last_name">Last Name</FormLabel>
          <Input
            {...register("last_name")}
            name="last_name"
            type="text"
            id="last_name"
          />
          {errors.last_name && (
            <Text color={errMessageColor}>{errors.last_name.message}</Text>
          )}
        </Box>
        <Box mb={marginButton}>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            {...register("password")}
            name="password"
            type="password"
            id="password"
          />
          {errors.password && (
            <Text color={errMessageColor}>{errors.password.message}</Text>
          )}
        </Box>
        <Box mb={marginButton}>
          <FormLabel htmlFor="confirm_password">Confirm Password</FormLabel>
          <Input
            {...register("confirm_password")}
            name="confirm_password"
            type="password"
            id="confirm_password"
          />
          {errors.confirm_password && (
            <Text color={errMessageColor}>
              {errors.confirm_password.message}
            </Text>
          )}
        </Box>
        <Button type="submit" colorScheme="blue">
          Register A User
        </Button>
      </form>
    </>
  );
};

export default RegistrationPage;
