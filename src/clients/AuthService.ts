"use server";

import { signIn } from "@/auth";
import {
  RegisterRequest,
  ResetlinkRequest,
  ResetpasswordRequest,
  SignInResponse,
} from "./types/apiTypes";
import { toast } from "@/hooks/use-toast";
import { getBaseUrl } from "@/utils/getBaseUrl";
import axiosClient from "./api/axiosClient";

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
    const response = await axiosClient.post(
      `${getBaseUrl()}/auth/register`,
      req,
    );
    return response;
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

  try {
    const response = await axiosClient.post<SignInResponse>(
      `${getBaseUrl()}/auth/authenticate`,
      {
        email: email,
        password: password,
      },
    );

    const { accessToken, refreshToken } = response;

    await signIn("credentials", {
      redirect: false,
      access_token: accessToken,
      refresh_token: refreshToken,
    });

    return response;
  } catch (error) {
    console.error("### Error signInRequest ", error);
    return Promise.reject(error);
  }
};

export const signInGoogleRequest = async (idToken: string) => {
  try {
    const response = await axiosClient.get<SignInResponse>(
      `${getBaseUrl()}/auth/google/authenticate`,
      {
        params: {
          id_token: idToken,
        },
      },
    );
    const { accessToken, refreshToken } = response;
    return {
      accessToken,
      refreshToken,
    };
  } catch (error) {
    console.error("### Error signInRequest ", error);
    return Promise.reject(error);
  }
};
export const signInFacebookRequest = async (idToken: string) => {
  try {
    const response = await axiosClient.get<SignInResponse>(
      `${getBaseUrl()}/auth/facebook/authenticate`,
      {
        params: {
          id_token: idToken,
        },
      },
    );
    const { accessToken, refreshToken } = response;
    return {
      accessToken,
      refreshToken,
    };
  } catch (error) {
    console.error("### Error signInRequest ", error);
    return Promise.reject(error);
  }
};
export const resetlinkRequest = async (req: ResetlinkRequest) => {
  if (!req.email) {
    toast({
      title: "Error",
      description: "Please fill in all fields",
      variant: "destructive",
    });
    return;
  }
  try {
    const response = await axiosClient.post(
      `${getBaseUrl()}/auth/password/resetlink`,
      req,
    );
    return response;
  } catch (error) {
    console.error("### Error password resetlink ", error);
    return Promise.reject(error);
  }
};

export const resetPasswordRequest = async (req: ResetpasswordRequest) => {
  try {
    const response = await axiosClient.post(
      `${getBaseUrl()}/auth/password/reset`,
      req,
    );
    return response;
  } catch (error) {
    console.error("### Error password reset ", error);
    return Promise.reject(error);
  }
};
