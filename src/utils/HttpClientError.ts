import axios from "axios";
import axiosRetry from "axios-retry";
import { FailureType } from "./logger";

// import logger from '@/utils/logger'
// import { FailureType } from '@/utils/logger/logger'

export class HttpClientError extends Error {
  public statusCode?: number;
  public isNetworkError: boolean;
  public isTimeout: boolean;
  public url: string;
  public method: "GET" | "POST" | "DELETE";
  public traceId?: string;

  constructor(
    error: Error | null,
    method: "GET" | "POST" | "DELETE",
    url: string,
    traceId?: string,
  ) {
    const isAxiosError = axios.isAxiosError(error);
    const message = isAxiosError
      ? `${method} ${url} failed: ${error.message}`
      : error?.message;

    super(message);

    this.name = "HttpClientError";
    this.cause = error;
    this.url = url;
    this.method = method;
    this.traceId = traceId;

    if (isAxiosError) {
      this.statusCode = error.response?.status;
      this.isNetworkError = axiosRetry.isNetworkError(error);
      this.isTimeout = error.code === "ECONNABORTED";
    } else {
      this.isNetworkError = false;
      this.isTimeout = false;
    }
  }
}

interface HttpClientErrorHandlerOptions {
  /**
   * Custom failure type to be logged
   */
  failureType?: FailureType;

  /**
   * Custom prefix for the error message
   * If not provided, a generic message will be used
   */
  messagePrefix?: string;
}

/**
 * Handles logging for HTTP client errors with customizable options
 * @param error The HttpClientError to be logged
 * @param options Configuration options for error handling
 * @returns The original error
 */
export const handleHttpClientError = async (
  error: unknown,
  options: HttpClientErrorHandlerOptions = {},
): Promise<unknown> => {
  const {
    failureType = FailureType.GENERAL,
    messagePrefix = "Request failed",
  } = options;

  if (error instanceof HttpClientError) {
    if (error.isTimeout) {
      await console.error(
        `${messagePrefix} - Request timed out:`,
        { error },
        failureType,
      );
    } else if (error.isNetworkError) {
      await console.error(
        `${messagePrefix} - Network error:`,
        { error },
        failureType,
      );
    } else {
      await console.error(
        `${messagePrefix} - Failed with status ${error.statusCode}:`,
        { error },
        failureType,
      );
    }
  }

  return error;
};
