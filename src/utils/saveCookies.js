import Cookies from "js-cookie";

export const saveCookies = (key, value) => {
  Cookies.set(key, value, { expires: 7 });
};