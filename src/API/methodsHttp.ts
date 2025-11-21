import { api, mainBase, altBase } from "./api";

type BaseOpt = "main" | "alt" | string;
type Method = "get" | "post" | "put" | "patch" | "delete";

export interface RequestOpts {
  /** 'main' (default), 'alt' o una URL completa */
  base?: BaseOpt;
  /** Si true, no usa Authorization y confía solo en la cookie HttpOnly */
  useCookiesOnly?: boolean;
  /** Headers extra por si los necesitas */
  headers?: Record<string, string>;
  /** Para DELETE con body */
  data?: any;
  /** Timeout por llamada */
  timeoutMs?: number;
}

function resolveBase(opt?: BaseOpt) {
  if (!opt || opt === "main") return mainBase;
  if (opt === "alt") return altBase;
  return opt;
}

function buildURL(endpoint: string, base: string) {
  if (/^https?:\/\//i.test(endpoint)) return endpoint; // absoluto
  const left = base.endsWith("/") ? base.slice(0, -1) : base;
  const right = endpoint.startsWith("/") ? endpoint.slice(1) : endpoint;
  return `${left}/${right}`;
}

async function request<T = any>(
  method: Method,
  endpoint: string,
  payload?: any,
  opts?: RequestOpts
): Promise<T> {
  const base = resolveBase(opts?.base);
  const url = buildURL(endpoint, base);
  const headers = { ...(opts?.headers || {}) };

  if (opts?.useCookiesOnly) {
    (headers as any)["X-Use-Cookies-Only"] = "1";
  }

  const hasBody = method === "post" || method === "put" || method === "patch";

  const config: any = {
    url,
    method,
    withCredentials: true,
    headers,
    timeout: opts?.timeoutMs ?? 20000,
  };

  if (hasBody) config.data = payload;
  if (method === "delete") config.data = opts?.data ?? payload;

  try {
    const res = await api.request<T>(config);
    return res.data as T;
  } catch (err: any) {
    // Normalización compatible con tus controladores
    const data =
      err?.response?.data ??
      ({
        ok: false,
        mensaje: "Request failed",
        message: err?.message ?? "Unknown error",
      } as T);
    return data;
  }
}

const http = {
  getApi<T = any>(endPoint: string, opts?: RequestOpts) {
    return request<T>("get", endPoint, undefined, opts);
  },
  postApi<T = any>(endPoint: string, data: object, opts?: RequestOpts) {
    return request<T>("post", endPoint, data, opts);
  },
  putApi<T = any>(endPoint: string, data: object, opts?: RequestOpts) {
    return request<T>("put", endPoint, data, opts);
  },
  patchApi<T = any>(endPoint: string, data: object, opts?: RequestOpts) {
    return request<T>("patch", endPoint, data, opts);
  },
  deleteApi<T = any>(endPoint: string, data?: object, opts?: RequestOpts) {
    return request<T>("delete", endPoint, data, opts);
  },
};

export default http;