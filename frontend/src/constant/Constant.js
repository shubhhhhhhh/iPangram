export default function SetToken(login_data) {
    localStorage.setItem("customer-info", JSON.stringify(login_data))
}

export const getToken = () => {
    if (localStorage.getItem("customer-info")) {
        return JSON.parse(localStorage.getItem("customer-info")).token;
    }
    else return false
}

export const clearToken = ()=>{
    localStorage.clear()
    sessionStorage.clear()
}
