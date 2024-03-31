import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

const AuthVerify = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.accessToken) { // Check if user and accessToken exist
      const decodedJwt = parseJwt(user.accessToken);

      if (decodedJwt && decodedJwt.exp * 1000 < Date.now()) { // Check if decodedJwt exists
        localStorage.removeItem("user");
        navigate("/login");
      }
    }
  }, [navigate]);

  return null;
};

export default AuthVerify;
