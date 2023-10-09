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

  if (registration.isError) return <p className="text-danger">{registration.error.message}</p>

  return (
    <>
      <h1>Registration Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="userName" className="form-label">
            Username
          </label>
          <input
            {...register("username")}
            name="username"
            type="text"
            className="form-control"
            id="userName"
          />
          {errors.username && (
            <p className="text-danger">{errors.username.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            {...register("email")}
            name="email"
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          {errors.email && (
            <p className="text-danger">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">
            First Name
          </label>
          <input
            {...register("first_name")}
            name="first_name"
            type="text"
            className="form-control"
            id="firstName"
          />
          {errors.first_name && (
            <p className="text-danger">{errors.first_name.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">
            Last Name
          </label>
          <input
            {...register("last_name")}
            name="last_name"
            type="text"
            className="form-control"
            id="lastName"
          />
          {errors.last_name && (
            <p className="text-danger">{errors.last_name.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            {...register("password")}
            name="password"
            type="password"
            className="form-control"
            id="exampleInputPassword1"
          />
          {errors.password && (
            <p className="text-danger">{errors.password.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword2" className="form-label">
            Confirm Password
          </label>
          <input
            {...register("confirm_password")}
            name="confirm_password"
            type="password"
            className="form-control"
            id="exampleInputPassword2"
          />
          {errors.confirm_password && (
            <p className="text-danger">{errors.confirm_password.message}</p>
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          Register A User
        </button>
      </form>
    </>
  );
};

export default RegistrationPage;
