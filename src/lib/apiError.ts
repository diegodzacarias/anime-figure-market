export type ApiErrorResponse = {
  timestamp?: string;
  status: number;
  error?: string;
  message: string;
  path?: string;
  requestId?: string;
  details?: Record<string, string>;
};

export async function readApiErrorResponse(
  response: Response,
  fallbackMessage: string
): Promise<ApiErrorResponse> {
  const text = await response.text();

  if (text) {
    try {
      const data = JSON.parse(text);

      return {
        status: data.status ?? response.status,
        error: data.error ?? response.statusText,
        message: data.message ?? fallbackMessage,
        path: data.path,
        requestId: data.requestId,
        details: data.details,
        timestamp: data.timestamp,
      };
    } catch {
      return {
        status: response.status,
        error: response.statusText,
        message: text,
      };
    }
  }

  return {
    status: response.status,
    error: response.statusText,
    message: fallbackMessage,
  };
}

export function toClientApiError(error: unknown, fallbackMessage: string): ApiErrorResponse {
  return {
    status: 0,
    error: "Client Error",
    message: error instanceof Error ? error.message : fallbackMessage,
  };
}

export function normalizeApiError(error: unknown, fallbackMessage: string): ApiErrorResponse {
  if (
    error &&
    typeof error === "object" &&
    "status" in error &&
    "message" in error
  ) {
    return error as ApiErrorResponse;
  }

  return toClientApiError(error, fallbackMessage);
}
