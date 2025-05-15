import jwtDecode from "jwt-decode";

export const getRedirectPathByRole = (token) => {
  try {
    const decoded = jwtDecode(token);
    const role = decoded?.role;
    if (role === "ADMIN") return "/admin";
    if (role === "USER") return "/user";
    return "/login";
  } catch (e) {
    return "/login";
  }
};
