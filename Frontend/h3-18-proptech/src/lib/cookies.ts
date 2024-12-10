export const setCookie = (name: string, value: string, exp: number) => {
  const expirationDate = new Date(exp * 1000);
  document.cookie = `${name}=${value}; expires=${expirationDate.toUTCString()}; path=/`;
};

export const getCookie = (name: string) => {
  const cookies = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));

  return cookies ? JSON.parse(cookies.split("=")[1]) : null;
};

export const deleteCookie = (name: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
};
