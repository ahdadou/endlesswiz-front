// import { camelizeKeys } from 'humps'
// import { v4 as uuidv4 } from 'uuid'

// import { ELoginState } from '@/types'
// import { isInternalServerSideInvocation, isServerSideInvocation } from '@/utils/environmentUtils'
// import getBaseUrl from '@/utils/getBaseUrl'
// import logger from '@/utils/logger'
// import { getLoggingSessionId } from '@/utils/logger/getLoggingSessionId'
// import withQuery from '@/utils/withQuery'

// import { getLocaleHeader } from './logger/getLocaleHeader'

// export type CustomFetchParams = {
//   options?: RequestInit
//   query?: Parameters<typeof withQuery>[1]
//   traceId?: string
//   url: string
//   withClientId?: boolean
//   method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
//   body?: string
//   includeCredentials?: boolean
//   camelizeResponseKeys?: boolean
//   retryCount?: number
//   retryDelay?: number
// }

// const customFetch = async <T = any>(params: CustomFetchParams): Promise<T> => {
//   const {
//     query,
//     options = {},
//     withClientId = true,
//     traceId = uuidv4(),
//     method = 'GET',
//     body,
//     includeCredentials,
//     camelizeResponseKeys,
//     retryCount = 3,
//     retryDelay = 100, // exponential back off delay - x, 2x, 3x, 4x ms between retries if retryCount is 3
//   } = params

//   const headers = new Headers(options.headers)
//   const signal = AbortSignal.timeout(60_000) // 60 seconds timeout

//   if (isInternalServerSideInvocation()) {
//     const locale = await getLocaleHeader()
//     if (typeof locale === 'string') headers.set('locale', locale)
//   }

//   if (withClientId) headers.set('x-client-id', 'webshop-social-view')
//   if (traceId) headers.set('X-CorrelationId', traceId)
//   if (['POST', 'PUT', 'PATCH'].includes(method) && body) {
//     headers.set('Content-Type', 'application/json')
//   }
//   const loggingSessionId = await getLoggingSessionId()
//   if (loggingSessionId) {
//     headers.set('X-SessionId', loggingSessionId)
//   }
//   const url = withQuery(params.url, query)

//   const fetchOptions: RequestInit = {
//     ...options,
//     method,
//     body,
//     headers,
//     credentials: includeCredentials ? 'include' : 'same-origin',
//     signal,
//   }

//   const fetchRequestFn = async () => fetchRequest<T>(url, fetchOptions, camelizeResponseKeys)

//   return await withRetry(fetchRequestFn, retryCount, retryDelay, url, traceId)
// }

// function isNotLoggedInLoginStateResponse(url: string, rawResponse: string, status: number): boolean {
//   return url.includes('login-state') && status === 200 && rawResponse.includes(ELoginState.NOT_LOGGED_IN)
// }

// const fetchRequest = async <T>(url: string, fetchOptions: RequestInit, camelizeResponseKeys?: boolean): Promise<T> => {
//   let response = await fetch(url, fetchOptions)

//   let responseBodyRaw = await response.text()

//   // Refresh token if the call is originated on the client-side and the response is 401 or NOT_LOGGED_IN login state response
//   if (
//     !isServerSideInvocation() &&
//     (response.status === 401 || isNotLoggedInLoginStateResponse(url, responseBodyRaw, response.status))
//   ) {
//     await refreshAccessToken()
//     response = await fetch(url, fetchOptions) // Retry after refreshing the token
//     responseBodyRaw = await response.text()
//   }

//   if (!response.ok) {
//     throw new CustomFetchError(`Request to ${url} failed`, responseBodyRaw, response.status)
//   }

//   try {
//     const data = responseBodyRaw ? JSON.parse(responseBodyRaw) : {}
//     return camelizeResponseKeys ? camelizeKeys(data) : data
//   } catch (error) {
//     if (error instanceof SyntaxError) {
//       throw new CustomFetchError(`Failed to parse JSON from ${url}: ${error.message}`, responseBodyRaw, response.status)
//     } else {
//       throw error // Re-throw unexpected errors
//     }
//   }
// }

// export const withRetry = async <T>(
//   fetchRequestCallback: () => Promise<T>,
//   retryCount: number,
//   retryDelay: number,
//   url: string,
//   traceId: string,
// ): Promise<T> => {
//   const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

//   for (let attempt = 0; attempt <= retryCount; attempt++) {
//     try {
//       return await fetchRequestCallback()
//     } catch (error: any) {
//       // Handle specific network errors for retry
//       if (['UND_ERR_CONNECT_TIMEOUT', 'ECONNRESET', 'UND_ERR_SOCKET'].includes(error.cause?.code)) {
//         logger.warn(`Network/timeout error for url '${url}'`)
//         if (attempt < retryCount) {
//           logger.warn(`Retrying attempt ${attempt + 1}/${retryCount}`)
//           await delay((attempt + 1) * retryDelay)
//           continue
//         }
//       }

//       if (error.name === 'AbortError') {
//         logger.warn(`Request timed out for url '${url}'`, { error, traceId })
//         throw new Error(`Request timed out for url '${url}'`)
//       }

//       if (attempt === retryCount) {
//         logger.warn(`All retry attempts failed for url '${url}'`, { error, traceId })
//       }
//       throw error // handle rejection of Promise from fetchRequestCallback
//     }
//   }

//   throw new Error(`Failed to execute function after ${retryCount} retries.`)
// }

// async function refreshAccessToken() {
//   if (isServerSideInvocation()) {
//     throw new Error('Access token can only be refreshed on the client side')
//   }

//   const res = await fetch(`${getBaseUrl()}/dpl/cs/user/auth/refresh`, {
//     method: 'POST',
//     credentials: 'include',
//   })

//   if (!res.ok) throw new Error('Failed to refresh token')
// }

// export class CustomFetchError extends Error {
//   response: any
//   status: number

//   constructor(message: string, response: any, status: number) {
//     super(message)
//     this.response = response
//     this.status = status
//     Object.setPrototypeOf(this, CustomFetchError.prototype)
//   }
// }

// export default customFetch
