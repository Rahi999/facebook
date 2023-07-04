import Cookies from "js-cookie"

 export const removeCookies = (key) => {
    Cookies.remove(key)
}
