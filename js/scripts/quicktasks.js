
import {
    METHOD_GET, METHOD_POST, METHOD_PUT, API_URL_QUICK_TASK_PING,
    API_URL_QUICK_TASK_CREATE, API_URL_QUICK_TASK_INDEX, API_URL_QUICK_TASK_SHOW,
    API_URL_QUICK_TASK_UPDATE, API_URL_QUICK_TASK_DELETE,
    fetchApiData,
    METHOD_DELETE
} from '../constants/api.js'



let response_area = document.getElementById('response_area')

let btnIndex = document.getElementById('btnIndex')
btnIndex.onclick = function () { apiQuickTasksIndex() }

let btnCreate = document.getElementById('btnCreate')
btnCreate.onclick = function () {apiQuickTasksCreate()}

let btnShow = document.getElementById('btnShow')
btnShow.onclick = function () {apiQuickTasksShow()}

let btnUpdate = document.getElementById('btnUpdate')
btnUpdate.onclick = function () {apiQuickTasksUpdate()}

let btnDelete = document.getElementById('btnDelete')
btnDelete.onclick = function () { apiQuickTasksDelete() }

let inputId = document.getElementById('inputId')
let inputName = document.getElementById('inputName')



async function pingQuickTasks() {
    let response = await fetchApiData(METHOD_GET, API_URL_QUICK_TASK_PING, null)
    response_area.innerText = JSON.stringify(response.data)
}



async function apiQuickTasksIndex() {
    let response = await fetchApiData(METHOD_GET, API_URL_QUICK_TASK_INDEX)
    response_area.innerText = JSON.stringify(response.data)
}


async function apiQuickTasksCreate() {
    let data = {
        name: inputName.value,
    }

    let response = await fetchApiData(METHOD_POST, API_URL_QUICK_TASK_CREATE, data)
    response_area.innerText = JSON.stringify(response.data)
}


async function apiQuickTasksShow() {
    let data = {
        id: inputId.value,
    }
    let response = await fetchApiData(METHOD_GET, API_URL_QUICK_TASK_SHOW + data.id, null)
    response_area.innerText = JSON.stringify(response.data)
}

async function apiQuickTasksUpdate() {
      
    let data = {
        id: inputId.value,
        name: inputName.value,
    }
    let response = await fetchApiData(METHOD_PUT, API_URL_QUICK_TASK_UPDATE + data.id, data)
    response_area.innerText = JSON.stringify(response.data)
}


async function apiQuickTasksDelete() {
    let inputId = document.getElementById('inputId')

    let data = {
        id: inputId.value,
    }

    let response = await fetchApiData(METHOD_DELETE, API_URL_QUICK_TASK_DELETE + data.id, null)
    response_area.innerText = JSON.stringify(response.data)
}