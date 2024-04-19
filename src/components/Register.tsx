/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import {
  ErrorMessage,
  FormContainer,
  Input,
  Label,
  SideBackground,
} from "./Form";
// import Image from "next/image";
import { Colors } from "@/styles";
import { SubmitHandler, useForm } from "react-hook-form";
import { registerUser } from "@/actions";
import { redirect } from "next/navigation";

type RegistrationFormInputs = {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
};

export const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormInputs>();
  const [extraError, setExtraError] = useState<string>();
  const [shouldRedirect, setShouldRedirect] = useState<boolean>();

  const onSubmit: SubmitHandler<RegistrationFormInputs> = (data) => {
    if (data.confirm_password !== data.password) {
      setExtraError("Password does not match");
    } else {
      setExtraError("");
      registerUser(data).then((res) => {
        setExtraError(res.statusCode !== 200 ? res.message : "");
        if (res.statusCode === 200) setShouldRedirect(true);
      });
    }
  };

  useEffect(() => {
    if (shouldRedirect) {
      redirect("/");
    }
  }, [shouldRedirect]);

  // use state for form validations
  return (
    <main style={{ padding: "16px" }}>
      <FormContainer>
        <div className="flex">
          <SideBackground className="w-1/2 hidden lg:block"></SideBackground>
          <div className="lg:w-1/2 px-6 py-16">
            <a href="/" className="logo">
              <img
                src="/images/logo_teal.png"
                width={361}
                height={69}
                alt="Logo"
                style={{
                  marginTop: "4px",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              />
            </a>
            {extraError && (
              <ErrorMessage className="mt-4 text-center">
                {extraError}
              </ErrorMessage>
            )}
            <form onSubmit={handleSubmit(onSubmit)}>
              <Label htmlFor="name">Full Name</Label>
              <Input
                {...register("name", { required: true })}
                className={`${errors.name ? "mb-0" : "mb-4"}`}
              />
              {errors.name && <ErrorMessage>Name is required</ErrorMessage>}

              <Label htmlFor="email">Email Address</Label>
              <Input
                type="email"
                {...register("email", { required: true })}
                className={`${errors.email ? "mb-0" : "mb-4"}`}
              />
              {errors.email && <ErrorMessage>Email is required</ErrorMessage>}
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                {...register("password", { required: true, minLength: 6 })}
                className={`${errors.password ? "mb-0" : "mb-4"}`}
              />
              {errors.password && (
                <ErrorMessage>Password is required</ErrorMessage>
              )}

              <Label htmlFor="confirm_password">Confirm Password</Label>
              <Input
                type="password"
                {...register("confirm_password", { required: true })}
                className={`${errors.confirm_password ? "mb-0" : "mb-4"}`}
              />
              {errors.confirm_password && (
                <ErrorMessage>Confirm password is required</ErrorMessage>
              )}
              <Input
                type="submit"
                value="Create Account"
                className="btn-primary mb-4"
              />
            </form>
            <div className="flex justify-between text-sm mt-2">
              <a href="#">Forgot your password?</a>
              <span>
                Have an account?{" "}
                <a href="/auth/login" style={{ color: `${Colors.red}` }}>
                  Log In
                </a>
              </span>
            </div>
          </div>
        </div>
      </FormContainer>
    </main>
  );
};
