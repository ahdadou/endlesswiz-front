import { TOKEN } from "@/middleware";
import getBaseUrl from "@/utils/getBaseUrl";
import axios from "axios";
import { cookies } from "next/headers";

export async function GET(request: Request) {
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
    return response.status === 200;
  } catch (error) {
    console.error("Logout failed:", error);
    return false;
  }
}
