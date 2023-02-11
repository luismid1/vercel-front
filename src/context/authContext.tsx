import React, { createContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import Router, { useRouter } from "next/router";

import { User, AuthResponse } from "@/interfaces";
import { API } from "@/constants";

type authContextProps = {
  user: User | null;
};

export const AuthContext = createContext<authContextProps>({
  user: null,
});

export function AuthContextProvider(props: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const publicRoutes = useMemo(() => ["/auth/signin", "/auth/signup"], []);

  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      if (!publicRoutes.includes(router.pathname)) {
        const token = localStorage.getItem("token");

        try {
          const resp = await axios.get<Omit<AuthResponse, "token">>(
            `${API}/auth/me`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setUser(resp.data.data.user);
        } catch (err) {
          Router.push("/auth/signin");
        }
      }
    };

    getUser();
  }, [router.pathname, publicRoutes]);

  return (
    <AuthContext.Provider
      value={{
        user,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
