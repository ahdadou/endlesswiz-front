import { REFRESH_TOKEN, TOKEN } from "@/middleware";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Forward credentials to your external backend
    const response = await axios.post(
      "http://localhost:8099/api/v1/auth/authenticate",
      { email, password }, // Send as a JavaScript object (no need to stringify)
    );

    if (response.status !== 200) {
      console.log("### invalid teriri");
      return NextResponse.json(
        { error: "Invalid credentials" },
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
