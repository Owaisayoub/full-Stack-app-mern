import { redirect } from "react-router-dom";

export const getTokenDuration = () => {
  const storedExpirationDate = localStorage.getItem("expiration");
  const expirationDate = new Date(storedExpirationDate);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();
  return duration;
};

export const getAuthToken = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }
  const duration = getTokenDuration();
  if (duration < 0) {
    return "EXPIRED";
  }

  return token;
};

export const tokenLoader = () => {
  return getAuthToken();
};
export const checkAuthToken = () => {
  const token = getAuthToken();
  if (!token) {
    return redirect("/auth");
  }
  return null;
};
