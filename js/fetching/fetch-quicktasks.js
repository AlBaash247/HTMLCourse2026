import {
    METHOD_GET, METHOD_POST,METHOD_PUT, API_URL_QUICK_TASK_PING,
    API_URL_QUICK_TASK_CREATE, API_URL_QUICK_TASK_INDEX,API_URL_QUICK_TASK_SHOW,
    API_URL_QUICK_TASK_UPDATE,
    fetchApiData
} from '../constants/api.js'



export async function pingQuickTasks(element) {
    let response = await fetchApiData(METHOD_GET, API_URL_QUICK_TASK_PING, null)
    element.innerText = JSON.stringify(response.data)
}




export async function apiQuickTasksIndex(element) {
    let response = await fetchApiData(METHOD_GET, API_URL_QUICK_TASK_INDEX)
    element.innerText = JSON.stringify(response.data)
}



export async function apiQuickTasksCreate(element, data) {
    let response = await fetchApiData(METHOD_POST, API_URL_QUICK_TASK_CREATE, data)
    element.innerText = JSON.stringify(response.data)
}


export async function apiQuickTasksShow(element, data) {
    let response = await fetchApiData(METHOD_GET, API_URL_QUICK_TASK_SHOW+data.id, null)
    element.innerText = JSON.stringify(response.data)
}

export async function apiQuickTasksUpdate(element, data) {
    let response = await fetchApiData(METHOD_PUT, API_URL_QUICK_TASK_UPDATE+data.id, data)
    element.innerText = JSON.stringify(response.data)
}

export async function apiQuickTasksDelete(element, data) {
    let response = await fetchApiData(METHOD_POST, API_URL_QUICK_TASK_CREATE, data)
    element.innerText = JSON.stringify(response.data)
}