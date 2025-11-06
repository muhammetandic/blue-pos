export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  details?: ValidationError[];
}

export type ValidationError = {
  field: string;
  message: string;
};

export const ApiResult = {
  success<T>(data: T, message?: string): ApiResponse<T> {
    return {
      success: true,
      message,
      data,
    };
  },

  error(error: string, details?: ValidationError[]): ApiResponse {
    return {
      success: false,
      error,
      details,
    };
  },

  validationError(details: ValidationError[]): ApiResponse {
    return {
      success: false,
      error: 'validation error',
      details,
    };
  },
};
