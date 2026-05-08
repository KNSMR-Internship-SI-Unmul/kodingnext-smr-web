const BASE_URL = "http://127.0.0.1:8000/api";

export const apiClient = async (endpoint, options = {}) => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`Server Error: ${response.status}`);
  }

  return response.json();
};
