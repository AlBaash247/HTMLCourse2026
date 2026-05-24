
import {
    METHOD_GET, METHOD_POST, METHOD_PUT, API_URL_TASK_PING,
    API_URL_TASK_CREATE, API_URL_TASK_INDEX, API_URL_TASK_SHOW,
    API_URL_TASK_UPDATE, API_URL_TASK_DELETE,
    fetchApiData,
    METHOD_DELETE
} from '../constants/api.js'



let response_area = document.getElementById('response_area')

let btnIndex = document.getElementById('btnIndex')
btnIndex.onclick = function () { apiTasksIndex() }

let btnCreate = document.getElementById('btnCreate')
btnCreate.onclick = function () {apiTasksCreate()}

let btnShow = document.getElementById('btnShow')
btnShow.onclick = function () {apiTasksShow()}

let btnUpdate = document.getElementById('btnUpdate')
btnUpdate.onclick = function () {apiTasksUpdate()}

let btnDelete = document.getElementById('btnDelete')
btnDelete.onclick = function () { apiTasksDelete() }

let inputId = document.getElementById('inputId')
let inputName = document.getElementById('inputName')



async function pingTasks() {
    let response = await fetchApiData(METHOD_GET, API_URL_TASK_PING, null)
    response_area.innerText = JSON.stringify(response.data)
}



async function apiTasksIndex() {
    let response = await fetchApiData(METHOD_GET, API_URL_TASK_INDEX)
    response_area.innerText = JSON.stringify(response.data)
}


async function apiTasksCreate() {
    let data = {
        name: inputName.value,
    }

    let response = await fetchApiData(METHOD_POST, API_URL_TASK_CREATE, data)
    response_area.innerText = JSON.stringify(response.data)
}


async function apiTasksShow() {
    let data = {
        id: inputId.value,
    }
    let response = await fetchApiData(METHOD_GET, API_URL_TASK_SHOW + data.id, null)
    response_area.innerText = JSON.stringify(response.data)
}

async function apiTasksUpdate() {
      
    let data = {
        id: inputId.value,
        name: inputName.value,
    }
    let response = await fetchApiData(METHOD_PUT, API_URL_TASK_UPDATE + data.id, data)
    response_area.innerText = JSON.stringify(response.data)
}


async function apiTasksDelete() {
    let inputId = document.getElementById('inputId')

    let data = {
        id: inputId.value,
    }

    let response = await fetchApiData(METHOD_DELETE, API_URL_TASK_DELETE + data.id, null)
    response_area.innerText = JSON.stringify(response.data)
}