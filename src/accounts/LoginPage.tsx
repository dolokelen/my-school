import {
  Box,
  Button,
  FormLabel,
  HStack,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { useRegistration } from "../hooks/useRegistration";
import { LOGIN_ROUTE, REGISTER_ROUTE } from "../data/constants";
import { Link } from "react-router-dom";
// import jwtDecode from "jwt-decode";

interface jwtPlayLoad {
  user_id: string;
}

const schema = z.object({
  username: z.string().min(1, { message: "Username is required." }),
  password: z
    .string()
    .min(8, { message: "Password cannot be less than 8 characters." }),
});

export type RegistrationFormData = z.infer<typeof schema>;

const LoginPage = () => {
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

  //   const onCreate = () => toast.success("Registration Executed Successfully!");
  //   const registration = useRegistration(onCreate, () => reset());
  //   const onSubmit = (data: RegistrationFormData) => registration.mutate(data);

  //   if (registration.isError)
  //     return <Text colorScheme="red">{registration.error.message}</Text>;

  const marginButton = 5;
  const errMessageColor = "red";

  return (
    <>
      <Heading mb={5}>Registration Form</Heading>
      <form>
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

        <HStack>
          <Button type="submit" colorScheme="blue">
            Login
          </Button>
          <Link to={REGISTER_ROUTE}>Need an account?</Link>
        </HStack>
      </form>
    </>
  );
};

export default LoginPage;
