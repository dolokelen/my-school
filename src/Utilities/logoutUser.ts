
const logoutUser = () => {
    const accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");

  if (accessToken) localStorage.removeItem("access_token");
  if (refreshToken) localStorage.removeItem("refresh_token");
}

export default logoutUser;