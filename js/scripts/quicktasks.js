import {
    pingQuickTasks, apiQuickTasksCreate,
    apiQuickTasksIndex, apiQuickTasksShow, apiQuickTasksUpdate,
} from '../fetching/fetch-quicktasks.js'

let response_area = document.getElementById('response_area')
let btnIndex = document.getElementById('btnIndex')
let btnCreate = document.getElementById('btnCreate')
let btnShow = document.getElementById('btnShow')
let btnUpdate = document.getElementById('btnUpdate')

// TODO: implement delete button and function
let btnDelete = document.getElementById('btnDelete')



btnIndex.onclick = function () {
    apiQuickTasksIndex(response_area)
}


btnCreate.onclick = function () {
    let inputName = document.getElementById('inputName')
    let data = {
        name: inputName.value,
    }
    apiQuickTasksCreate(response_area, data)
}



btnShow.onclick = function () {
    let inputId = document.getElementById('inputId')
    let data = {
        id: inputId.value,
    }
    apiQuickTasksShow(response_area, data)
}



btnUpdate.onclick = function () {
    let inputId = document.getElementById('inputId')
    let inputName = document.getElementById('inputName')
    let data = {
        id: inputId.value,
        name: inputName.value,
    }
    apiQuickTasksUpdate(response_area, data)
}
