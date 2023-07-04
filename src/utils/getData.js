import Cookies from "js-cookie"


export const getCookies = (key) => {
    return Cookies.get(key)
}

