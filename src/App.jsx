import "./App.css";
import {
  Card,
  Typography,
  Input,
  Select,
  Option,
  Button,
} from "@material-tailwind/react";
import { useEffect } from "react";

import { Controller, useForm } from "react-hook-form";

function App() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
    unregister,
    reset
  } = useForm({
    mode:'onTouched'
  });

  const domain = watch("Domain");
  const onSubmit = (data) => console.log(data);

  // * Remove from Form
  useEffect(() => {
    if (domain !== "other") {
      unregister("otherdomainname");
    }
  }, [domain, unregister]);

  return (
    <div className="h-screen grid place-items-center bg-gray-50">
      <Card color="transparent" shadow={true} className="p-7 bg-white">
        <Typography variant="h4" color="blue-gray">
          Sign Up
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Nice to meet you! Enter your details to register.
        </Typography>
        <br />
        <form
          className="mb-4 w-[500px] grid grid-cols-2 gap-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <Controller
              name="Username"
              rules={{
                required: "Username is required!",
                minLength: {
                  value: 3,
                  message: "Minimum 3 characters required!",
                },
              }}
              control={control}
              render={({ field }) => (
                <Input
                  type="text"
                  size="lg"
                  {...field}
                  label="Username"
                  error={Boolean(errors?.Username?.message)}
                />
              )}
            />
            {errors?.Username?.message && (
              <span className="error-text">{errors?.Username?.message}</span>
            )}
          </div>
          <div>
            <Controller
              name="email"
              rules={{
                required: "Email Id is required!",
                pattern: {
                  value: /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
                  message: "Email Id is invalid!",
                },
              }}
              control={control}
              render={({ field }) => (
                <Input
                  type="email"
                  size="lg"
                  {...field}
                  label="Email ID"
                  error={Boolean(errors?.email?.message)}
                />
              )}
            />
            {errors?.email?.message && (
              <span className="error-text">{errors?.email?.message}</span>
            )}
          </div>
          <div>
            <Controller
              name="Domain"
              rules={{
                required: "Domain is required!",
              }}
              control={control}
              render={({ field }) => (
                <Select
                  label="Select Domain"
                  {...field}
                  error={Boolean(errors?.Domain?.message)}
                >
                  <Option value="designer">Designer</Option>
                  <Option value="dev">Developer</Option>
                  <Option value="tester">Tester</Option>
                  <Option value="other">Others</Option>
                </Select>
              )}
            />
            {errors?.Domain?.message && (
              <span className="error-text">{errors?.Domain?.message}</span>
            )}
          </div>
          {domain === "other" && (
            <div>
              <Controller
                name="otherdomainname"
                rules={{
                  required: "Other Domain Name is required!",
                }}
                control={control}
                render={({ field }) => (
                  <Input
                    size="lg"
                    {...field}
                    label="Type Here"
                    error={Boolean(errors?.otherdomainname?.message)}
                  />
                )}
              />
              {errors?.otherdomainname?.message && (
                <span className="error-text">
                  {errors?.otherdomainname?.message}
                </span>
              )}
            </div>
          )}
          <div>
            <Controller
              name="Password"
              rules={{
                required: "Password is required!",
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/,
                  message: "Password not strong enough!",
                },
              }}
              control={control}
              render={({ field }) => (
                <Input
                  type="password"
                  size="lg"
                  {...field}
                  label="Password"
                  error={Boolean(errors?.Password?.message)}
                />
              )}
            />
            {errors?.Password?.message && (
              <span className="error-text">{errors?.Password?.message}</span>
            )}
          </div>
          <div>
            <Controller
              name="ConfirmPassword"
              rules={{
                required: "Confirm Your Password!",
                validate: (value) =>
                  getValues("Password") === value || "Password do not match",
              }}
              control={control}
              render={({ field }) => (
                <Input
                  type="password"
                  size="lg"
                  {...field}
                  label="Confirm Password"
                  error={Boolean(errors?.ConfirmPassword?.message)}
                />
              )}
            />
            {errors?.ConfirmPassword?.message && (
              <span className="error-text">
                {errors?.ConfirmPassword?.message}
              </span>
            )}
          </div>
          <div className="col-span-2 grid grid-cols-2 gap-3">
            <Button type="reset" variant="outlined" onClick={()=> reset()}>
              Reset
            </Button>
            <Button type="submit">Create Account</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default App;
