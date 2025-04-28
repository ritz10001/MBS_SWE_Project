export function getJWTToken() {
  if (typeof window === 'undefined') {
    return null;
  }

  return localStorage.getItem('token');
}

export async function apiFetch(url, options) {
  if (typeof window === 'undefined') {
    return null;
  }

  const API_URL = import.meta.env.VITE_API_URL;
  const token = getJWTToken();

  const response = await fetch(`${API_URL}${url}`, {
    ...options,
    headers: {
      ...(token && { authorization: `Bearer ${token}` }),
      ...(options?.body && { 'content-type': 'application/json' }),
      ...options?.headers,
    }
  });

  return response;
}
