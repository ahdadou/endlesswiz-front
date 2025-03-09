import { getLoggingSessionId } from "@/utils/getLoggingSessionId";
import { HttpClientError } from "@/utils/HttpClientError";
import axios, {
  AxiosError,
  AxiosHeaders,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";
import applyCaseMiddleware from "axios-case-converter";
import axiosRetry from "axios-retry";

import http from "http";
import https from "https";
import { v4 as uuidv4 } from "uuid";
import { cookies } from "next/headers";

type CustomAxiosConfig = AxiosRequestConfig & {
  traceId?: string;
};

// const httpAgentParams = process.env.NODE_ENV == 'test' ? { keepAlive: false } : { keepAlive: true }

// const httpAgent = new http.Agent(httpAgentParams)
// const httpsAgent = new https.Agent(httpAgentParams)

export const axiosInstance = applyCaseMiddleware(
  axios.create({
    timeout: 60_000,
    withCredentials: true,
    // httpsAgent: httpsAgent,
    // httpAgent: httpAgent,
  }),
  {
    ignoreHeaders: true,
    ignoreParams: true,
  },
);

axiosRetry(axiosInstance, {
  retryDelay: axiosRetry.exponentialDelay,
  onRetry: async (retryCount, error, requestConfig) => {
    console.log(
      `Retry attempt ${retryCount}: ${requestConfig.method?.toUpperCase()} ${requestConfig.url}`,
      {
        error,
      },
    );
    // await logger.warn(`Retry attempt ${retryCount}: ${requestConfig.method?.toUpperCase()} ${requestConfig.url}`, {
    //   error,
    // })
  },
});

const axiosClient = {
  get: async <T>(url: string, config: CustomAxiosConfig = {}): Promise<T> => {
    try {
      const headers = await resolveHeaders(config);
      const requestConfig = { ...config, headers: headers };

      const resp: AxiosResponse<T> = await axiosInstance.get(
        url,
        requestConfig,
      );
      return resp.data;
    } catch (error) {
      throw new HttpClientError(error as Error, "GET", url, config.traceId);
    }
  },

  post: async <T, D = unknown>(
    url: string,
    data: D,
    config: CustomAxiosConfig = {},
  ): Promise<T> => {
    try {
      const headers = await resolveHeaders(config);
      const requestConfig = { ...config, headers };
      const resp: AxiosResponse<T> = await axiosInstance.post(
        url,
        data,
        requestConfig,
      );
      return resp.data;
    } catch (error) {
      throw new HttpClientError(error as Error, "POST", url, config.traceId);
    }
  },

  put: async <T, D = unknown>(
    url: string,
    data: D,
    config: CustomAxiosConfig = {},
  ): Promise<T> => {
    try {
      const headers = await resolveHeaders(config);
      const requestConfig = { ...config, headers };
      const resp: AxiosResponse<T> = await axiosInstance.put(
        url,
        data,
        requestConfig,
      );
      return resp.data;
    } catch (error) {
      throw new HttpClientError(error as Error, "POST", url, config.traceId);
    }
  },

  delete: async <T>(
    url: string,
    config: CustomAxiosConfig = {},
  ): Promise<T> => {
    try {
      const headers = await resolveHeaders(config);
      const requestConfig = { ...config, headers };
      const resp: AxiosResponse<T> = await axiosInstance.delete(
        url,
        requestConfig,
      );
      return resp.data;
    } catch (error) {
      throw new HttpClientError(error as Error, "DELETE", url, config.traceId);
    }
  },
};

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error: AxiosError) => {
//     const originalRequest = error.config as AxiosRequestConfig

//     if (originalRequest !== undefined) {
//       const response = error.response

//       if (!isServerSideInvocation() && response?.status === 401) {
//         try {
//           await refreshAccessToken() // Refresh the access token
//           return axiosInstance.request(originalRequest) // Retry the original request
//         } catch (refreshError) {
//           return Promise.reject(refreshError) // Reject if refresh fails
//         }
//       }
//     }

//     return Promise.reject(error)
//   },
// )

// async function refreshAccessToken() {
//   if (isServerSideInvocation()) {
//     throw new Error('Access token can only be refreshed on the client side')
//   }

//   try {
//     await axiosClient.post<any>(
//       `${getBaseUrl()}/dpl/cs/user/auth/refresh`,
//       {},
//       {
//         withCredentials: true,
//       },
//     )
//   } catch (error) {
//     throw new Error('Failed to refresh token', { cause: error })
//   }
// }

const resolveHeaders = async (config: CustomAxiosConfig) => {
  const headers = new AxiosHeaders();
  // const locale = await getLocaleHeader()
  // if (typeof locale === 'string') headers.set('locale', locale)
  const traceId = config.traceId ?? uuidv4();
  headers.set("X-CorrelationId", traceId);
  headers.set("x-client-id", "endlesswiz");
  const loggingSessionId = await getLoggingSessionId();
  if (loggingSessionId) {
    headers.set("X-SessionId", loggingSessionId);
  }

  return {
    ...config.headers,
    ...headers,
  };
};

export default axiosClient;
