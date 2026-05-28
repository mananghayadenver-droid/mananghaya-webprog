export const AUTH_TOKEN_KEY = 'denver-client-token';
export const AUTH_FIRST_NAME_KEY = 'denver-client-first-name';
export const AUTH_TYPE_KEY = 'denver-client-type';

export function isAuthenticated() {
  return Boolean(localStorage.getItem(AUTH_TOKEN_KEY));
}

export function setAuthSession({ token, firstName, type }) {
  if (token) {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  }

  if (firstName) {
    localStorage.setItem(AUTH_FIRST_NAME_KEY, firstName);
  }

  if (type) {
    localStorage.setItem(AUTH_TYPE_KEY, type);
  }
}

export function getAuthToken() {
  return localStorage.getItem(AUTH_TOKEN_KEY) || '';
}

export function getAuthType() {
  return localStorage.getItem(AUTH_TYPE_KEY) || '';
}

export function getAuthFirstName() {
  return localStorage.getItem(AUTH_FIRST_NAME_KEY) || '';
}

export function signOut() {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_FIRST_NAME_KEY);
  localStorage.removeItem(AUTH_TYPE_KEY);
}
