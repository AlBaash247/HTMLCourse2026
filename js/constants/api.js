export const API_URL_BASE = "http://127.0.0.1:8000/api"
export const API_URL_AUTH = API_URL_BASE + "/auth/"

export const API_URL_AUTH_PING = API_URL_BASE + "/auth/ping"
export const API_URL_AUTH_LOGIN = API_URL_BASE + "/auth/login"
export const API_URL_AUTH_REGISTER = API_URL_BASE + "/auth/register"


export const API_URL_QUICK_TASK_PING = API_URL_BASE + "/quick_tasks/ping"
export const API_URL_QUICK_TASK_INDEX = API_URL_BASE + "/quick_tasks/"
export const API_URL_QUICK_TASK_CREATE = API_URL_BASE + "/quick_tasks/"
export const API_URL_QUICK_TASK_SHOW = API_URL_BASE + "/quick_tasks/"
export const API_URL_QUICK_TASK_UPDATE = API_URL_BASE + "/quick_tasks/"
export const API_URL_QUICK_TASK_DELETE = API_URL_BASE + "/quick_tasks/"


export const METHOD_GET = "GET"
export const METHOD_POST = "POST"
export const METHOD_PUT = "PUT"
export const METHOD_UPDATE = "UPDATE"
export const METHOD_DELETE = "DELETE"

const HEADER_CONTENT_TYPE_API_URL_ENCODED = "application/x-www-form-urlencoded"
const HEADER_AUTHORIZATION = "application/x-www-form-urlencoded"


export function fetchHeader(method, encodedData) {

    let headerObj = {
        method: method,
        headers: {
            'Content-Type': HEADER_CONTENT_TYPE_API_URL_ENCODED,
            'Authorization': 'Bearer ' + getToken()
        }
    }

    if (method != METHOD_GET) {
        headerObj.body = new URLSearchParams(encodedData)
    }

    return headerObj

}




export async function fetchApiData(method, url, data) {

    try {
        const response = await fetch(url, fetchHeader(method, data));
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        console.log('>>> ' + url, result.data.token);

        if(result.data.token){
            storeToken(result.data.token)
        }

        return result

    } catch (error) {
        console.error(data);
        console.error(error.message);
        return null;
    }
}


function storeToken(token) {
    localStorage.setItem("STORE_KEY_TOKEN", token);
}

export function getToken() {
    // return '2|TFWTG71L9dZFjvNBW55kFwl147RK0LborGJDXSG8a28fdc06'
    let token = localStorage.getItem("STORE_KEY_TOKEN");

    if (token == null || token == '') {
        console.log('No token availble, try to login or register! ')
    }

    return token
}