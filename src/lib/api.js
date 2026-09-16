export async function api(path, options = {}) {
  const isServer = typeof window === "undefined";
  const base = isServer
    ? process.env.API_PROXY_TARGET || "http://localhost:8080"
    : "/api";
  const url = isServer ? `${base}${path}` : `/api${path}`;

  let response;
  try {
    response = await fetch(url, {
      ...options,
      credentials: options.credentials ?? "include",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      cache: options.cache ?? "no-store",
    });
  } catch {
    const error = new Error("Sunucuya bağlanılamadı. API çalışıyor mu?");
    error.status = 0;
    throw error;
  }

  const data = await response.json().catch(() => null);
  if (!response.ok) {
    const message =
      data?.error?.message ||
      (response.status >= 500 ? "Sunucuya bağlanılamadı. API çalışıyor mu?" : "İstek başarısız");
    const error = new Error(message);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}
