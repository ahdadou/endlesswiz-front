"use server";

import { signIn } from "@/auth";
import axios from "axios";
import { RegisterRequest } from "./types/apiTypes";
import { toast } from "@/hooks/use-toast";
const USER_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const register = async (req: RegisterRequest) => {
  try {
    const response = await axios.post(`${USER_API_BASE_URL}/auth/register`, req);
    return response.data;
  } catch (error) {
    console.error("### Error register ", error);
    return Promise.reject(error);
  }
};

export const signInRequest = async (email:string, password: string) => {
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    toast({
      title: "Error",
      description: "Invalid email format",
      variant: "destructive",
    });
    return;
  }

  if (!email || !password) {
    toast({
      title: "Error",
      description: "Please fill in all fields",
      variant: "destructive",
    });
    return;
  }

  try {
    const response = await axios.post(`${USER_API_BASE_URL}/auth/authenticate`,{
        email: email,
        password: password,
      }
    );

    const { access_token, refresh_token } = response.data;

    await signIn("credentials", {
      redirect: false,
      access_token: access_token,
      refresh_token: refresh_token,
    });

    return response.data;
  } catch (error) {
    console.error("### Error signInRequest ", error);
    return Promise.reject(error);
  }
};
