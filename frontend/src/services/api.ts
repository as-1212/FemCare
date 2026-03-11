export async function apiPost<TResponse>(
  path: string,
  body: unknown,
  init?: RequestInit,
): Promise<TResponse> {
  const res = await fetch(path, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
    body: JSON.stringify(body),
    ...init,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Request failed (${res.status})`);
  }

  return (await res.json()) as TResponse;
}

