import { TOKEN } from "@/middleware";
import getBaseUrl from "@/utils/getBaseUrl";
import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const jwtCookieValue = cookieStore.get(TOKEN)?.value;

    console.log("jwtCookieValue  found", jwtCookieValue);

    if (!jwtCookieValue) {
      console.log("No JWT token found");
      return NextResponse.json(
        { success: false, error: "No token found" },
        { status: 401 }
      );
    }

    const res = await axios.get(`${getBaseUrl()}/auth/logout`, {
      headers: { Authorization: `Bearer ${jwtCookieValue}` },
      withCredentials: true,
    });

    console.info("### Logout res:", res);

    cookieStore.set({
      name: TOKEN,
      value: "",
      domain: ".endlesswiz.com",
      path: "/",
      expires: new Date(0),
    });
    console.info("### Logout done:");


    return NextResponse.json({ success: true, error: null });
  } catch (error) {
    console.error("### Logout failed:", error);
    return NextResponse.json(
      { success: false, error: error || "Logout failed" },
      { status: 500 }
    );
  }
}
