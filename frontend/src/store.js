const tokenKey = "NEO_TOKEN";
export const getToken = () => {
  const token = localStorage.getItem(tokenKey);
  if (!token) {
    return "";
  }
  return token;
};

export const storeToken = (token) => {
  localStorage.setItem(tokenKey, token);
};

export const removeToken = () => {
  localStorage.removeItem(tokenKey);
};
