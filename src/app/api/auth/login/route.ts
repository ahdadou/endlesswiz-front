import { REFRESH_TOKEN, TOKEN } from "@/middleware";
import getBaseUrl from "@/utils/getBaseUrl";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    console.log('### LOGIN url ------>  ',`${getBaseUrl()}/auth/authenticate` )
    const response = await axios.post(
      `https://www.api.endlesswiz.com/api/v1/auth/authenticate`,
      { email, password }, // Send as a JavaScript object (no need to stringify)
    );

    console.log('### LOGIN res   ---> ', response)

    if (response.status !== 200) {
      return NextResponse.json(
        { error: "Invalid credentials ya tb" },
        { status: 401 },
      );
    }

    const { access_token, refresh_token } = response.data; // Access the token from the response data

    // Set JWT in HttpOnly cookie
    const res = NextResponse.json({ success: true });
    res.cookies.set(TOKEN, access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600 * 24 * 7, // 1 hour
    });

    res.cookies.set(REFRESH_TOKEN, refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600 * 24 * 30, // 1 hour
    });

    return res;
  } catch (error) {
    console.error("Error during authentication:", error);
    // Handling errors from Axios
    const errorMessage =
      axios.isAxiosError(error) && error.response?.data?.message
        ? error.response.data.message
        : "Authentication failed";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
