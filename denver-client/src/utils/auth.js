export const DEFAULT_LOGIN = {
  email: 'mananghaya@admin.com',
  password: 'mananghaya123',
};

export const AUTH_STORAGE_KEY = 'denver-client-auth';

export function isAuthenticated() {
  return localStorage.getItem(AUTH_STORAGE_KEY) === 'true';
}

export function signIn(email, password) {
  const matches =
    email === DEFAULT_LOGIN.email && password === DEFAULT_LOGIN.password;

  if (matches) {
    localStorage.setItem(AUTH_STORAGE_KEY, 'true');
  }

  return matches;
}

export function signOut() {
  localStorage.removeItem(AUTH_STORAGE_KEY);
}
