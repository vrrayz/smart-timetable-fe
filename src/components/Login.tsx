"use client";

import { login } from "@/actions";
import React, { useEffect, useState } from "react";
import {
  ErrorMessage,
  FormContainer,
  Input,
  Label,
  SideBackground,
} from "./Form";
import Image from "next/image";
import { Colors } from "@/styles";
import { SubmitHandler, useForm } from "react-hook-form";
import { redirect } from "next/navigation";

type LoginFormInputs = {
  email: string;
  password: string;
};

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const [extraError, setExtraError] = useState<string>();
  const [shouldRedirect, setShouldRedirect] = useState<boolean>();

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    login(data).then(async (res) => {
      setExtraError(res.statusCode !== 200 ? "Incorrect Credentials" : "");
      if (res.statusCode === 200) setShouldRedirect(true);
    });
  };

  useEffect(() => {
    if (shouldRedirect) {
      redirect("/")
    }
  }, [shouldRedirect]);

  return (
    <main style={{ padding: "16px" }}>
      <FormContainer>
        <div className="flex">
          <SideBackground className="w-1/2 hidden lg:block"></SideBackground>
          <div className="lg:w-1/2 px-6 py-16">
            <a href="#" className="logo">
              <Image
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
              <Label htmlFor="email">Email Address</Label>
              <Input
                type="email"
                {...register("email", { required: true })}
                className={`${errors.email ? "mb-0" : "mb-4"}`}
              />
              {errors.email && <ErrorMessage>Email is required</ErrorMessage>}

              <Label htmlFor="password">Enter password</Label>
              <Input
                type="password"
                {...register("password", { required: true })}
                className={`${errors.password ? "mb-0" : "mb-4"}`}
              />
              {errors.password && (
                <ErrorMessage>Password is required</ErrorMessage>
              )}

              <Input type="submit" value="Login" className="btn-primary mb-4" />
            </form>
            <div className="flex justify-between text-sm mt-2">
              <a href="#">Forgot your password?</a>
              <span>
                New User?{" "}
                <a href="/auth/register" style={{ color: `${Colors.red}` }}>
                  Create an account
                </a>
              </span>
            </div>
          </div>
        </div>
      </FormContainer>
    </main>
  );
};
