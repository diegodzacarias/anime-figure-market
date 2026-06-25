export type PageResponse<T> = {
  content?: T[];
  totalElements?: number;
  totalPages?: number;
  page?: number;
  size?: number;
};

export type PageMeta = {
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
};

export const defaultPageMeta: PageMeta = {
  totalElements: 0,
  totalPages: 0,
  page: 0,
  size: 20,
};

export function getPageContent<T>(data: T[] | PageResponse<T> | null | undefined): T[] {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.content)) return data.content;
  return [];
}

export function getPageMeta<T>(data: T[] | PageResponse<T> | null | undefined, fallbackSize = 20): PageMeta {
  if (Array.isArray(data)) {
    return {
      totalElements: data.length,
      totalPages: data.length > 0 ? 1 : 0,
      page: 0,
      size: data.length || fallbackSize,
    };
  }

  return {
    totalElements: data?.totalElements ?? 0,
    totalPages: data?.totalPages ?? 0,
    page: data?.page ?? 0,
    size: data?.size ?? fallbackSize,
  };
}

export function withPageSize(endpoint: string, size = 1000) {
  const separator = endpoint.includes("?") ? "&" : "?";
  return `${endpoint}${separator}size=${size}`;
}

export function withPagination(endpoint: string, page: number, size: number, sort = "id,asc") {
  const separator = endpoint.includes("?") ? "&" : "?";
  return `${endpoint}${separator}page=${page}&size=${size}&sort=${encodeURIComponent(sort)}`;
}
