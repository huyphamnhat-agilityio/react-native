export const fetchApi = async <T>(url: string, options?: RequestInit) => {
  let headerOption: HeadersInit_ = {
    'Content-Type': 'application/json',
    ...(options?.headers || {}),
  };

  const response = await fetch(url, {
    method: options?.method ?? 'GET',
    headers: headerOption,
    body: options?.body,
    ...options,
  });

  if (response.ok) {
    return (await response.json()) as T;
  }

  throw response.status;
};
