import React, { useState } from "react";
import axios from "axios";
import NextLink from "next/link";
import Router from "next/router";
import { useForm } from "react-hook-form";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";

import { AuthResponse } from "@/interfaces";
import { AuthContainer } from "@/Components";
import { Message } from "@/Components/common/CustomSnackbar";
import { API } from "@/constants";

const Signup = () => {
  const [message, setMessage] = useState<Message | undefined>(undefined);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = async (data: any) => {
    if (Object.keys(errors).length > 0) {
      return;
    }

    try {
      const resp = await axios.post<AuthResponse>(`${API}/auth/signup`, data);
      const { token } = resp.data;
      localStorage.setItem("token", token);
      Router.push("/");
    } catch (err: any) {
      setMessage({ message: err.response.data.msg, severity: "error" });
    }
  };

  return (
    <AuthContainer
      message={message}
      setMessage={setMessage}
      handleSubmit={handleSubmit(onSubmit)}
      title="Sign Up"
    >
      <FormControl fullWidth margin="normal">
        <TextField
          error={!!errors?.email}
          required
          id="name"
          label="Nombre"
          autoComplete="name"
          autoFocus
          {...register("name", {
            minLength: {
              value: 2,
              message: "El nombre debe contener al menos 2 caracteres.",
            },
          })}
        />
        {errors.name && (
          <FormHelperText style={{ color: "red" }}>
            {errors?.name?.message as string}
          </FormHelperText>
        )}
      </FormControl>
      <FormControl fullWidth margin="normal">
        <TextField
          error={!!errors?.email}
          required
          id="email"
          label="Email Address"
          autoComplete="email"
          autoFocus
          {...register("email", {
            pattern: {
              value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
              message: "El formato del email no es valido.",
            },
          })}
        />
        {errors.email && (
          <FormHelperText style={{ color: "red" }}>
            {errors?.email?.message as string}
          </FormHelperText>
        )}
      </FormControl>
      <FormControl fullWidth margin="normal">
        <TextField
          error={!!errors?.password}
          required
          id="password"
          label="Password"
          autoComplete="password"
          autoFocus
          type="password"
          {...register("password", {
            minLength: {
              value: 4,
              message: "La contrasenia debe ser de al menos 4 caracteres.",
            },
          })}
        />
        {errors.password && (
          <FormHelperText style={{ color: "red" }}>
            {errors?.password?.message as string}
          </FormHelperText>
        )}
      </FormControl>
      <FormControl fullWidth margin="normal">
        <TextField
          error={!!errors?.passwordConfirm}
          required
          id="passwordConfirm"
          label="Confirmar Password"
          autoFocus
          type="password"
          {...register("passwordConfirm", {
            validate: (val: string) => {
              if (watch("password") !== val) {
                return "Your passwords do no match";
              }
            },
          })}
        />
      </FormControl>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Sign Up
      </Button>
      <Grid container>
        <Grid item>
          <NextLink className="next-link" href={"/auth/signin"}>
            {"Already have an account? Sign In"}
          </NextLink>
        </Grid>
      </Grid>
    </AuthContainer>
  );
};

export default Signup;
