export const LOGGING_SESSION_ID_COOKIE_NAME = "endlesswiz-session-id";

export const getLoggingSessionId = async (): Promise<string | undefined> => {
  let sessionId: string | undefined;

  if (typeof window === "undefined") {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    sessionId = cookieStore.get(LOGGING_SESSION_ID_COOKIE_NAME)?.value;
  } else {
    const cookies = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${LOGGING_SESSION_ID_COOKIE_NAME}=`));
    sessionId = cookies?.split("=")[1];
  }

  return sessionId;
};
