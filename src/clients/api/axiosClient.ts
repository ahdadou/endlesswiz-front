import { getLoggingSessionId } from "@/utils/getLoggingSessionId";
import axios, {
  AxiosHeaders,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";
import applyCaseMiddleware from "axios-case-converter";
import http from "http";
import https from "https";
import { v4 as uuidv4 } from "uuid";

type CustomAxiosConfig = AxiosRequestConfig & {
  traceId?: string;
};

const httpAgentParams =
  process.env.NODE_ENV == "test" ? { keepAlive: false } : { keepAlive: true };

// const httpAgent = new http.Agent(httpAgentParams)
// const httpsAgent = new https.Agent(httpAgentParams)

export const axiosInstance = applyCaseMiddleware(
  axios.create({
    timeout: 60_000,
    // httpsAgent: httpsAgent,
    // httpAgent: httpAgent,
    withCredentials: true,
  }),
  {
    ignoreHeaders: true,
    ignoreParams: true,
  },
);

const axiosClient = {
  get: async <T>(url: string, config: CustomAxiosConfig = {}): Promise<T> => {
    const headers = await resolveHeaders(config);
    const requestConfig = { ...config, headers: headers };
    const resp: AxiosResponse<T> = await axiosInstance.get(url, requestConfig);
    return resp.data;
  },

  post: async <T, D = unknown>(
    url: string,
    data: D,
    config: CustomAxiosConfig = {},
  ): Promise<T> => {
    const headers = await resolveHeaders(config);
    const requestConfig = { ...config, headers };
    const resp: AxiosResponse<T> = await axiosInstance.post(
      url,
      data,
      requestConfig,
    );
    return resp.data;
  },

  put: async <T, D = unknown>(
    url: string,
    data: D,
    config: CustomAxiosConfig = {},
  ): Promise<T> => {
    const headers = await resolveHeaders(config);
    const requestConfig = { ...config, headers };
    const resp: AxiosResponse<T> = await axiosInstance.put(
      url,
      data,
      requestConfig,
    );
    return resp.data;
  },

  delete: async <T>(
    url: string,
    config: CustomAxiosConfig = {},
  ): Promise<T> => {
    const headers = await resolveHeaders(config);
    const requestConfig = { ...config, headers };
    const resp: AxiosResponse<T> = await axiosInstance.delete(
      url,
      requestConfig,
    );
    return resp.data;
  },
};

const resolveHeaders = async (config: CustomAxiosConfig) => {
  const headers = new AxiosHeaders();
  // const locale = await getLocaleHeader()
  // if (typeof locale === 'string') headers.set('locale', locale)
  const traceId = config.traceId ?? uuidv4();
  headers.set("X-CorrelationId", traceId);
  headers.set("x-client-id", "webshop-social-view");
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
