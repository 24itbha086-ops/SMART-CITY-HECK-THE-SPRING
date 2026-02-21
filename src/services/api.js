export const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "/api";

export const apiFetch = async (endpoint, options = {}) => {
  const response = await fetch(`${apiBaseUrl}${endpoint}`, options);

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  return response.json();
};
