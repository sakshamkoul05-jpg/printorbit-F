const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const url = `${API_URL}${endpoint}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error?.message || 'API request failed');
  }

  return data;
}

// Auth
export const authAPI = {
  login: (email: string, password: string) =>
    fetchAPI('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  register: (data: { email: string; password: string; name: string; phone?: string }) =>
    fetchAPI('/auth/register', { method: 'POST', body: JSON.stringify(data) }),
  logout: () => fetchAPI('/auth/logout', { method: 'POST' }),
  me: (token: string) =>
    fetchAPI('/auth/me', { headers: { Authorization: `Bearer ${token}` } }),
};

// Products
export const productsAPI = {
  list: (params?: Record<string, string>) => {
    const query = params ? '?' + new URLSearchParams(params).toString() : '';
    return fetchAPI(`/products${query}`);
  },
  get: (slug: string) => fetchAPI(`/products/${slug}`),
  templates: (slug: string) => fetchAPI(`/products/${slug}/templates`),
};

// Categories
export const categoriesAPI = {
  list: () => fetchAPI('/categories'),
  get: (slug: string) => fetchAPI(`/categories/${slug}`),
};

// Quotes
export const quotesAPI = {
  create: (data: { items: unknown[]; design_files?: string[]; notes?: string }) =>
    fetchAPI('/quotes', { method: 'POST', body: JSON.stringify(data) }),
  list: (token: string) =>
    fetchAPI('/quotes', { headers: { Authorization: `Bearer ${token}` } }),
  get: (token: string, id: string) =>
    fetchAPI(`/quotes/${id}`, { headers: { Authorization: `Bearer ${token}` } }),
};

// Orders
export const ordersAPI = {
  list: (token: string) =>
    fetchAPI('/orders', { headers: { Authorization: `Bearer ${token}` } }),
  get: (token: string, id: string) =>
    fetchAPI(`/orders/${id}`, { headers: { Authorization: `Bearer ${token}` } }),
};

// Projects (saved designs)
export const projectsAPI = {
  list: (token: string) =>
    fetchAPI('/projects', { headers: { Authorization: `Bearer ${token}` } }),
  create: (token: string, data: { product_id?: string; name: string; design_data?: unknown; thumbnail_url?: string }) =>
    fetchAPI('/projects', { method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: JSON.stringify(data) }),
  update: (token: string, id: string, data: { name?: string; design_data?: unknown; thumbnail_url?: string }) =>
    fetchAPI(`/projects/${id}`, { method: 'PUT', headers: { Authorization: `Bearer ${token}` }, body: JSON.stringify(data) }),
  delete: (token: string, id: string) =>
    fetchAPI(`/projects/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } }),
};

// Contact
export const contactAPI = {
  submit: (data: { name: string; email: string; phone?: string; subject?: string; message: string }) =>
    fetchAPI('/contact', { method: 'POST', body: JSON.stringify(data) }),
};
