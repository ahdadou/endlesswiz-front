import { TOKEN } from "@/middleware";
import getBaseUrl from "@/utils/getBaseUrl";
import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const jwtCookieValue = cookieStore.get(TOKEN)?.value;

    if (!jwtCookieValue) {
      console.warn("No JWT token found");
      return NextResponse.json(
        { success: false, error: "No token found" },
        { status: 401 }
      );
    }

    await axios.get(`${getBaseUrl()}/auth/logout`, {
      headers: { Authorization: `Bearer ${jwtCookieValue}` },
      withCredentials: true,
    });

    cookieStore.set({
      name: TOKEN,
      value: "",
      domain: ".endlesswiz.com",
      path: "/",
      expires: new Date(0),
    });

    return NextResponse.json({ success: true, error: null });
  } catch (error) {
    console.error("### Logout failed:", error);
    return NextResponse.json(
      { success: false, error: error || "Logout failed" },
      { status: 500 }
    );
  }
}
