const checkLogin = () => {
  const token = localStorage.getItem('token');
  return !!token;
};

export default checkLogin;
