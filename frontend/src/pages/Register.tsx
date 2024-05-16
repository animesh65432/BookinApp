import { useForm } from "react-hook-form";
import { registerthseuser } from "../api-client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type RegisterFormData = {
  UserName: string;
  Email: string;
  Password: string;
  ConfirmPassword: string;
};

const Register = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();
  const onsubmit = handleSubmit(async (data) => {
    try {
      let result = await registerthseuser(data);
      console.log(result);
      if (result) {
        toast.success("Sucessfully create the user");
      } else {
        toast.error("please try again later");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  });
  return (
    <form className="flex flex-col gap-5" onSubmit={onsubmit}>
      <h2 className="text-3xl font-bold">Create an Account</h2>

      <label className="text-gray-700 text-sm font-bold">
        UserName
        <input
          className="border rounded w-full py-1 px-1 font-normal"
          {...register("UserName", { required: "This field is required" })}
        />
        {errors.UserName && (
          <span className="text-red-500">{errors.UserName.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold">
        Email
        <input
          className="border rounded w-full py-1 px-1 font-normal"
          {...register("Email", { required: "This email is required" })}
        />
        {errors.Email && (
          <span className="text-red-500">{errors.Email.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold">
        Password
        <input
          className="border rounded w-full py-1 px-1 font-normal"
          {...register("Password", {
            required: "This password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          type="password"
        />
        {errors.Password && (
          <span className="text-red-500"> {errors.Password.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold">
        Confirm Password
        <input
          className="border rounded w-full py-1 px-1 font-normal"
          {...register("ConfirmPassword", {
            required: "Please confirm your password",
            validate: (value) =>
              value === watch("Password") || "Passwords do not match",
          })}
          type="password"
        />
        {errors.ConfirmPassword && (
          <span className="text-red-500">{errors.ConfirmPassword.message}</span>
        )}
      </label>
      <button
        className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl"
        type="submit"
      >
        Create Account
      </button>
      <ToastContainer />
    </form>
  );
};

export default Register;
