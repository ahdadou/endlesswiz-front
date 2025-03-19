import { jwtVerify, errors as joseErrors } from 'jose';

export type TokenValidationResult = {
  isValid: boolean;
  isExpired?: boolean;
  error?: string;
  payload?: Record<string, unknown>;
};

export const validateToken = async (
  token?: string,
  secret?: string
): Promise<TokenValidationResult> => {
  if (!secret) {
    return {
      isValid: false,
      error: 'JWT_SECRET is not defined',
    };
  }

  if (!token) {
    return {
      isValid: false,
      error: 'Token is missing',
    };
  }

  try {
    const secretBytes = Buffer.from(secret, 'base64');
    const { payload } = await jwtVerify(token, secretBytes);

    // Explicit expiration check (even though jwtVerify does this)
    const currentTime = Math.floor(Date.now() / 1000);
    
    if (!payload.exp) {
      return {
        isValid: false,
        error: 'Token does not contain expiration claim',
      };
    }

    if (payload.exp <= currentTime) {
      return {
        isValid: false,
        isExpired: true,
        error: 'Token has expired',
        payload,
      };
    }

    return {
      isValid: true,
      payload,
    };

  } catch (error) {
    if (error instanceof joseErrors.JWTExpired) {
      return {
        isValid: false,
        isExpired: true,
        error: 'Token expired',
      };
    }

    if (error instanceof joseErrors.JWTInvalid) {
      return {
        isValid: false,
        error: 'Invalid token',
      };
    }

    return {
      isValid: false,
      error: error instanceof Error ? error.message : 'Unknown token validation error',
    };
  }
};