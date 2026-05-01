export const API_URL_BASE = "http://127.0.0.1:8000/api"
export const API_URL_AUTH = API_URL_BASE + "/auth/"
export const API_URL_AUTH_PING = API_URL_BASE + "/auth/ping"
export const API_URL_QUICK_TASK_PING = API_URL_BASE + "/quick_tasks/ping"


export const METHOD_GET = "GET"
export const METHOD_POST = "POST"
export const METHOD_PUT = "PUT"
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
        headerObj.body =  new URLSearchParams(encodedData)
    }

    return headerObj

}

export async function myFetch(method, url, data) {

    try {
        const response = await fetch(url, fetchHeader(method, data));
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        console.log('>>> ' + url, result);
        return result

    } catch (error) {
        console.error(error.message);
        return null;
    }
}


function storeToken(){}

function getToken(){
    return '2|TFWTG71L9dZFjvNBW55kFwl147RK0LborGJDXSG8a28fdc06'
}