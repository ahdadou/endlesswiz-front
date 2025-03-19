import { TOKEN } from "@/middleware";
import getBaseUrl from "@/utils/getBaseUrl";
import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cookiesStore = await cookies();
    const jwtCookieValue = cookiesStore.get(TOKEN)?.value;

    if (!jwtCookieValue) {
      console.log("No JWT token found");
      return false;
    }

    const response = await axios.get(`${getBaseUrl()}/auth/logout`, {
      headers: { Authorization: `Bearer ${jwtCookieValue}` },
      withCredentials: true,
    });

    cookiesStore.delete(TOKEN);
    return NextResponse.json({ success: response.status === 200 });
  } catch (error) {
    console.error("### Logout failed:", error);
    return NextResponse.json({ error });
  }
}
