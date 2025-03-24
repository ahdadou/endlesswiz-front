import { TOKEN } from "@/middleware";
import getBaseUrl from "@/utils/getBaseUrl";
import axios from "axios";
import { error } from "console";
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

    console.error("### Logout res:", res);

    cookieStore.delete(TOKEN, { domain: ".example.com", path: "/" });

    return NextResponse.json({ success: true, error: null });
  } catch (error) {
    console.error("### Logout failed:", error);
    return NextResponse.json(
      { success: false, error: error || "Logout failed" },
      { status: 500 }
    );
  }
}
