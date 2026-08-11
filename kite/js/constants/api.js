export const BASE_URL = "https://www.albaash247.cloud/api";

export const STORAGE_KEY_TOKEN = "TOKEN";

export const METHOD_GET = "GET";
export const METHOD_POST = "POST";


export function get_header(method, data){

    let headerObject = {
        method:method,
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + localStorage.getItem(STORAGE_KEY_TOKEN)
        }
    }
   
    if(method !== METHOD_GET){
        headerObject.body = new URLSearchParams(data);
    }

    return headerObject;
}

