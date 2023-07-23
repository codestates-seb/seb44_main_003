export const useTokens = (
  accessToken: string | null,
  refreshToken: string | null
) => {
  if (accessToken) {
    localStorage.setItem('token', accessToken);
    const expiration = new Date();
    expiration.setMinutes(expiration.getMinutes() + 30);
    localStorage.setItem('expiration', expiration.toISOString());
  }
  if (refreshToken) {
    localStorage.setItem('refresh', refreshToken);
  }
};
