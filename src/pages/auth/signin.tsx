import React, { useState } from "react";
import NextLink from "next/link";
import Router from "next/router";
import axios from "axios";
import { useForm } from "react-hook-form";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";

import { AuthContainer } from "@/Components";
import { AuthResponse } from "@/interfaces";
import { Message } from "@/Components/common/CustomSnackbar";
import { API } from "@/constants";

const Signin = () => {
  const [message, setMessage] = useState<Message | undefined>(undefined);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    if (Object.keys(errors).length > 0) {
      return;
    }

    try {
      const resp = await axios.post<AuthResponse>(`${API}/auth/signin`, data);
      const { token } = resp.data;

      localStorage.setItem("token", token);
      Router.push("/");
    } catch (err: any) {
      setMessage({ message: err.response.data.msg, severity: "error" });
    }
  };

  const submit = handleSubmit(onSubmit);

  return (
    <AuthContainer
      message={message}
      setMessage={setMessage}
      handleSubmit={submit}
      title="Sign In"
    >
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
          type="password"
          id="password"
          label="Password"
          autoComplete="password"
          autoFocus
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
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Sign In
      </Button>
      <Grid container>
        <Grid item>
          <NextLink className="next-link" href={"/auth/signup"}>
            {"Don't have an account? Sign Up"}
          </NextLink>
        </Grid>
      </Grid>
    </AuthContainer>
  );
};

export default Signin;
