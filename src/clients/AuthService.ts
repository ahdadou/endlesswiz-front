"use server";

import { signIn } from "@/auth";
import axios from "axios";
import {
  RegisterRequest,
  ResetlinkRequest,
  ResetpasswordRequest,
} from "./types/apiTypes";
import { toast } from "@/hooks/use-toast";
const USER_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const registerRequest = async (req: RegisterRequest) => {
  if (!req.firstname || !req.lastname || !req.email || !req.password) {
    toast({
      title: "Error",
      description: "Please fill in all fields",
      variant: "destructive",
    });
    return;
  }
  if (req.password.length < 8) {
    toast({
      title: "Error",
      description: "Password must be at least 8 characters long",
      variant: "destructive",
    });
    return;
  }
  try {
    const response = await axios.post(
      `${USER_API_BASE_URL}/auth/register`,
      req,
    );
    return response.data;
  } catch (error) {
    console.error("### Error register ", error);
    return Promise.reject(error);
  }
};

export const signInRequest = async (email: string, password: string) => {
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

  console.log('REMOVE  signInRequest ', email)
  
  try {
    const response = await axios.post(
      `${USER_API_BASE_URL}/auth/authenticate`,
      {
        email: email,
        password: password,
      },
    );
    console.log('REMOVE  signInRequest response ', response)

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

export const signInGoogleRequest = async (idToken: string) => {
  try {
    const response = await axios.get(
      `${USER_API_BASE_URL}/auth/google/authenticate`,
      {
        params: {
          idToken: idToken,
        },
      },
    );
    const { access_token, refresh_token } = response.data;
    return {
      access_token,
      refresh_token,
    };
  } catch (error) {
    console.error("### Error signInRequest ", error);
    return Promise.reject(error);
  }
};

export const resetlinkRequest = async (req: ResetlinkRequest) => {
  console.log(
    "### handle submite -->",
    `${USER_API_BASE_URL}/password/resetlink`,
  );

  if (!req.email) {
    toast({
      title: "Error",
      description: "Please fill in all fields",
      variant: "destructive",
    });
    return;
  }
  try {
    const response = await axios.post(
      `${USER_API_BASE_URL}/auth/password/resetlink`,
      req,
    );
    return response.data;
  } catch (error) {
    console.error("### Error password resetlink ", error);
    return Promise.reject(error);
  }
};

export const resetPasswordRequest = async (req: ResetpasswordRequest) => {
  try {
    const response = await axios.post(
      `${USER_API_BASE_URL}/auth/password/reset`,
      req,
    );
    return response.data;
  } catch (error) {
    console.error("### Error password reset ", error);
    return Promise.reject(error);
  }
};
