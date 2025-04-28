import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../components/Button";
import { useNavigate } from "react-router";
import FormInput from "../components/FormInput";

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  const [isRegistering, setIsRegistering] = useState(false);
  const [signupError, setSignupError] = useState(null);

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (isRegistering) return;
    setIsRegistering(true);

    try {
      const response = await fetch(
        "http://moivebookingsystem.xyz/api/account/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...data,
            ConfirmPassword: undefined,
          }),
        }
      );

      const result = await response.json();
      if (response.ok) {
        navigate("/login");
      } else {
        setSignupError(Object.values(result)[0][0]);
      }
    } catch (error) {
      console.error("Registration error", error);
      setSignupError("Something went wrong. Try again.");
    }

    setIsRegistering(false);
  };

  const password = watch("Password");

  return (
    <>
      <title>Sign Up | MBS</title>
      <div className="flex flex-col items-center justify-center px-6">
        <div className="max-w-lg w-full p-6 bg-[#ffe6e6] rounded-xl shadow-md my-32">
          <h1 className="text-xl md:text-2xl font-bold text-black mb-1 text-center">
            Sign Up
          </h1>
          <div className="text-md md:text-lg font-medium text-black mb-1 text-center">
            Watch Movies with MBS
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
            <div className="flex gap-4">
              <FormInput
                id="FirstName"
                label="First Name"
                disabled={isRegistering}
                error={errors.FirstName?.message}
                {...register("FirstName", {
                  required: "First name is required",
                })}
              />
              <FormInput
                id="LastName"
                label="Last Name"
                disabled={isRegistering}
                error={errors.LastName?.message}
                {...register("LastName", { required: "Last name is required" })}
              />
            </div>

            <FormInput
              id="Email"
              type="email"
              label="Email Address"
              disabled={isRegistering}
              error={errors.Email?.message}
              {...register("Email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            <FormInput
              id="PhoneNumber"
              type="tel"
              label="Phone Number"
              disabled={isRegistering}
              error={errors.PhoneNumber?.message}
              {...register("PhoneNumber", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Please enter a valid 10-digit phone number",
                },
              })}
            />
            <FormInput
              id="Address"
              type="text"
              label="Home Address"
              disabled={isRegistering}
              error={errors.Address?.message}
              {...register("Address", { required: "Address is required" })}
            />
            <FormInput
              id="Password"
              type="password"
              label="Password"
              disabled={isRegistering}
              error={errors.Password?.message}
              {...register("Password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
            />
            <FormInput
              id="ConfirmPassword"
              type="password"
              label="Confirm Password"
              disabled={isRegistering}
              error={errors.ConfirmPassword?.message}
              {...register("ConfirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
            />

            <Button
              type="submit"
              loading={isRegistering}
              width="full"
              variant="primary"
            >
              Sign Up
            </Button>
            {signupError && (
              <p className="mt-1 text-sm text-red-600">{signupError}</p>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
