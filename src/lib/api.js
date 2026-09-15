export async function api(path, options = {}) {
  const isServer = typeof window === "undefined";
  const base = isServer
    ? process.env.API_PROXY_TARGET || "http://localhost:8080"
    : "/api";
  const url = isServer ? `${base}${path}` : `/api${path}`;

  const response = await fetch(url, {
    ...options,
    credentials: options.credentials ?? "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    cache: options.cache ?? "no-store",
  });

  const data = await response.json().catch(() => null);
  if (!response.ok) {
    const message = data?.error?.message || "İstek başarısız";
    const error = new Error(message);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}
