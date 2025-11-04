export interface ApiResponse<T = any> {
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

export class ApiResult {
  static success<T>(data: T, message?: string): ApiResponse<T> {
    return {
      success: true,
      message,
      data,
    };
  }

  static error(error: string, details?: ValidationError[]): ApiResponse {
    return {
      success: false,
      error,
      details,
    };
  }

  static validationError(details: ValidationError[]): ApiResponse {
    return {
      success: false,
      error: "validation error",
      details,
    };
  }
}
