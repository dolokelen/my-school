import jwt_decode from "jwt-decode";

interface jwtPlayLoad {
  user_id: string;
}

const getUserId = () => {
  const token = localStorage.getItem("access_token");
  if (token) {
    const decodeToken = jwt_decode(token) as jwtPlayLoad;

    return parseInt(decodeToken.user_id);
  }
};

export default getUserId;