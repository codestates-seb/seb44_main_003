const useIsLoggedIn = () => {
  const token = localStorage.getItem('token');
  return !!token;
};

export default useIsLoggedIn;
