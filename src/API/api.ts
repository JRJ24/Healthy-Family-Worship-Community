import axios, {
  AxiosError,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
} from "axios";

export const mainBase = window.location.hostname.includes("localhost")
  ? import.meta.env.VITE_URL_API_DEV
  : import.meta.env.VITE_URL_API;

export const altBase = window.location.hostname.includes("localhost")
  ? import.meta.env.VITE_URL_API_DEV
  : import.meta.env.VITE_URL_API;

const tokenKey = "token";

export const tokenManager = {
  get(): string | null {
    return sessionStorage.getItem(tokenKey) || localStorage.getItem(tokenKey);
  },
  set(token: string, persist: "session" | "local" = "session") {
    if (persist === "local") localStorage.setItem(tokenKey, token);
    else sessionStorage.setItem(tokenKey, token);
  },
  clear() {
    sessionStorage.removeItem(tokenKey);
    localStorage.removeItem(tokenKey);
    localStorage.removeItem("user");
  },
};

const baseAxios = axios.create({
  withCredentials: true,
  timeout: 20000,
});

export const api = axios.create({
  baseURL: mainBase,
  withCredentials: true,
  timeout: 20000,
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const useCookiesOnly = config.headers?.["X-Use-Cookies-Only"] === "1";
  
  if (!useCookiesOnly) {
    const token = tokenManager.get();
    if (token) {
      config.headers = config.headers ?? {};
      (config.headers as any)["x-access-token"] = token;
    }
  }
  return config;
});

let isRefreshing = false;
type QueueItem = (token?: string) => void;
let pendingQueue: QueueItem[] = [];

function processQueue(token?: string) {
  pendingQueue.forEach((cb) => cb(token));
  pendingQueue = [];
}

async function doRefresh(): Promise<string> {
  // Asegúrate de que la ruta sea correcta (ej: /auth/refresh)
  const { data } = await baseAxios.post(`${mainBase}/auth/refresh-token`, {});
  
  // Revisa si tu backend devuelve 'accessToken' o 'token'
  const newToken = data?.accessToken || data?.token;
  
  if (!newToken) throw new Error("No token in refresh response");
  tokenManager.set(newToken);
  return newToken;
}

api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const original = error.config as AxiosRequestConfig & {
      _retry?: boolean;
      _transientTried?: boolean;
    };

    const status = error.response?.status;

    const transientStatuses = [429, 502, 503, 504];
    const isTimeout = error.code === "ECONNABORTED";
    if (
      (isTimeout || transientStatuses.includes(status ?? 0)) &&
      !original?._transientTried
    ) {
      original._transientTried = true;
      await new Promise((r) => setTimeout(r, 800));
      return api(original!);
    }

    if (status === 401 && !original?._retry) {
      original._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const newToken = await doRefresh();
          processQueue(newToken);
          
          const useCookiesOnly =
            original.headers &&
            (original.headers as any)["X-Use-Cookies-Only"] === "1";
            
          if (!useCookiesOnly) {
            original.headers = original.headers ?? {};
            (original.headers as any)["x-access-token"] = newToken;
          }
          
          return api(original);
        } catch (e) {
          processQueue(undefined);
          tokenManager.clear();
          return Promise.reject(e);
        } finally {
          isRefreshing = false;
        }
      }

      return new Promise((resolve, reject) => {
        pendingQueue.push((token) => {
          if (!token) {
            reject(error);
            return;
          }
          const useCookiesOnly =
            original.headers &&
            (original.headers as any)["X-Use-Cookies-Only"] === "1";
            
          if (!useCookiesOnly) {
            original.headers = original.headers ?? {};
            (original.headers as any)["x-access-token"] = token;
          }
          resolve(api(original));
        });
      });
    }

    return Promise.reject(error);
  }
);