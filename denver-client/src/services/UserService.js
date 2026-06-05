import constants from '../constants';
import { getAuthToken } from '../utils/auth';

const HOST = String(constants.HOST || '').replace(/\/$/, '');
const BASE_URL = `${HOST}/users`;

const request = async (path, options = {}) => {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(getAuthToken()
        ? { Authorization: `Bearer ${getAuthToken()}` }
        : {}),
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(data.message || 'Request failed');
    error.response = { data, status: response.status };
    throw error;
  }

  return { data, status: response.status };
};

export const fetchUsers = () => request('/');
export const createUser = (user) =>
  request('/', { method: 'POST', body: JSON.stringify(user) });
export const updateUser = (id, user) =>
  request(`/${id}`, { method: 'PUT', body: JSON.stringify(user) });
export const deleteUser = (id) => request(`/${id}`, { method: 'DELETE' });
export const loginUser = (credentials) =>
  request('/login', { method: 'POST', body: JSON.stringify(credentials) });
