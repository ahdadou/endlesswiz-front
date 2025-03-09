// import api from '@/clients/api/api'
// import { getLoggingSessionId } from '@/utils/logger/getLoggingSessionId'
// import { getReferer } from '@/utils/logger/getReferer'
// import { getRequestHeader } from '@/utils/logger/getRequestHeader'
// import { getUserAgent } from '@/utils/logger/getUserAgent'

export enum FailureType {
  PRODUCTS_FETCH_FAILED = "PRODUCTS_FETCH_FAILED",
  STOCK_FETCH_FAILED = "STOCK_FETCH_FAILED",
  POSTS_FETCH_FAILED = "POSTS_FETCH_FAILED",
  CREATORS_FETCH_FAILED = "CREATORS_FETCH_FAILED",
  FELLOWSHIP_FAILURE = "FELLOWSHIP_FAILURE",
  GENERAL = "GENERAL",
}

enum _LogLevel {
  WARN = "WARN",
  ERROR = "ERROR",
  INFO = "INFO",
}

// export interface _Logger {
//   info: (message: string, context?: Record<string, unknown>) => Promise<void>
//   warn: (message: string, context?: Record<string, unknown>) => Promise<void>
//   error: (message: string, context?: Record<string, unknown>, failureType?: FailureType) => Promise<void>
// }

// function isServer() {
//   return typeof window === 'undefined'
// }

// function isLocalHost() {
//   return process.env.NODE_ENV === 'development'
// }

// async function getEnhancedContext(context?: Record<string, unknown>): Promise<Record<string, unknown>> {
//   return {
//     ...context,
//     sessionId: await getLoggingSessionId(),
//     userAgent: await getUserAgent(),
//     referer: await getReferer(),
//     xForwardedHost: await getRequestHeader('x-forwarded-host'),
//     clientIp: await getRequestHeader('True-Client-IP'),
//     xAmznTraceId: await getRequestHeader('x-amzn-trace-id'),
//   }
// }

// function isServerOrLocalhostExecution() {
//   return isServer() || isLocalHost()
// }

// const clientLogger = {
//   info: async (message: string, context?: Record<string, unknown>) => {
//     await api.createClientLogEntry({
//       ...sanitizeErrors(context),
//       level: _LogLevel.INFO,
//       message,
//     })
//   },
//   warn: async (message: string, context?: Record<string, unknown>) => {
//     await api.createClientLogEntry({
//       ...sanitizeErrors(context),
//       level: _LogLevel.WARN,
//       message,
//     })
//   },
//   error: async (message: string, context?: Record<string, unknown>, failureType?: FailureType) => {
//     await api.createClientLogEntry({
//       ...sanitizeErrors(context),
//       level: _LogLevel.ERROR,
//       failure_type: failureType ?? FailureType.GENERAL,
//       message,
//     })
//   },
// }

// const identityReplacer = (_key: string, value: unknown) => value

// const isObject = (value: unknown): value is object => typeof value === 'object' && value !== null

// function stringify(value: unknown, replacer?: (key: string, value: unknown) => unknown, space?: string | number) {
//   const cache = new WeakSet()
//   const replace = replacer ?? identityReplacer

//   return JSON.stringify(
//     value,
//     (key, value: unknown) => {
//       if (isObject(value))
//         if (cache.has(value)) return '[Circular]'
//         else cache.add(value)

//       return replace(key, value)
//     },
//     space,
//   )
// }

// function sanitizeErrors(obj?: Record<string, unknown>) {
//   if (typeof obj !== 'object' || obj === null) return obj

//   const sanitized = { ...obj }

//   for (const [key, value] of Object.entries(obj)) {
//     if (value instanceof Error) {
//       sanitized[key] = Object.fromEntries(
//         Reflect.ownKeys(value).map((errorKey) => [errorKey, (value as any)[errorKey]]),
//       )
//     }
//   }

//   return sanitized
// }

// const serverLogger = {
//   info(message: string, context?: Record<string, unknown>) {
//     console.log(
//       stringify({
//         ...sanitizeErrors(context),
//         level: _LogLevel.INFO,
//         message,
//         commitHash: process.env.APP_RELEASE,
//       }),
//     )
//   },
//   warn(message: string, context?: Record<string, unknown>) {
//     console.log(
//       stringify({
//         ...sanitizeErrors(context),
//         level: _LogLevel.WARN,
//         message,
//         commitHash: process.env.APP_RELEASE,
//       }),
//     )
//   },
//   error(message: string, context?: Record<string, unknown>) {
//     console.log(
//       stringify({
//         ...sanitizeErrors(context),
//         level: _LogLevel.ERROR,
//         message,
//         commitHash: process.env.APP_RELEASE,
//       }),
//     )
//   },
// }

// const logger: _Logger = {
//   info: async (message: string, context?: Record<string, unknown>) => {
//     const enhancedContext = await getEnhancedContext(context)
//     isServerOrLocalhostExecution()
//       ? serverLogger.info(message, enhancedContext)
//       : await clientLogger.info(message, enhancedContext)
//   },
//   warn: async (message: string, context?: Record<string, unknown>) => {
//     const enhancedContext = await getEnhancedContext(context)
//     isServerOrLocalhostExecution()
//       ? serverLogger.warn(message, enhancedContext)
//       : await clientLogger.warn(message, enhancedContext)
//   },
//   error: async (message: string, context?: Record<string, unknown>, logFailureEvent?: FailureType) => {
//     const enhancedContext = await getEnhancedContext(context)
//     isServerOrLocalhostExecution()
//       ? serverLogger.error(message, enhancedContext)
//       : await clientLogger.error(message, enhancedContext, logFailureEvent)
//   },
// }

// export default logger
