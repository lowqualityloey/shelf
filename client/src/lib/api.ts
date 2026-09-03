import { supabase } from './supabase';

interface ApiFetchOptions extends RequestInit {
  headers?: Record<string, string>;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000';

export async function apiFetch<T>(endpoint: string, options: ApiFetchOptions = {}): Promise<T> {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (session?.access_token) {
    headers['Authorization'] = `Bearer ${session.access_token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 204) {
    return null as unknown as T; // No Content
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'An error occurred while fetching data.');
  }

  return data as T;
}
