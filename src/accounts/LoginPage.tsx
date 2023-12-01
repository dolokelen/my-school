import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormLabel,
  Heading,
  Input,
  Text,
  Link
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useLogin } from "./../hooks/useLogin";
import { blue } from "../cacheKeysAndRoutes";

const schema = z.object({
  username: z.string().min(1, { message: "Username is required." }),
  password: z
    .string()
    .min(8, { message: "Password cannot be less than 8 characters." }),
});

export type LoginFormData = z.infer<typeof schema>;

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(schema),
  });

  const { handleLogin, error } = useLogin();
  const onSubmit = (data: LoginFormData) => handleLogin(data);

  const marginButton = 5;
  const errMessageColor = "red";
  const HTTP_401_UNAUTHORIZED = "Request failed with status code 401";
  const HTTP_401_RESPONSE =
    "No active account found with the given credentials";
  return (
    <Box w={500} mx={300}>
      <Heading mb={5}>Login Form</Heading>
      {error === HTTP_401_UNAUTHORIZED ? (
        <Heading mb={5} color="red">
          {HTTP_401_RESPONSE}
        </Heading>
      ) : (
        <Heading mb={5} color="red">
          {error}
        </Heading>
      )}

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
          <Checkbox>Remeber me</Checkbox>
        </Box>
          <Flex>
        <Button type="submit" colorScheme={blue}>
          Login
        </Button>
       <Link ml={3} mt={2}>Reset Password?</Link> 
        </Flex>
      </form>
    </Box>
  );
};

export default LoginPage;
