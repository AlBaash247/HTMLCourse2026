import {BASE_URL, get_header, METHOD_POST, METHOD_GET, STORAGE_KEY_TOKEN} from '../constants/api.js'


let textResult = document.getElementById("textResult");
let btnPing = document.getElementById("btnPing");
let btnIndex = document.getElementById("btnIndex");


btnPing.onclick = ApiRequestTasksPing
btnIndex.onclick = ApiRequestTasksIndex


async function ApiRequestTasksPing() {
    
    let response = await fetch(`${BASE_URL}/tasks/ping`, get_header(METHOD_GET, null));

    if(!response.ok){
        alert("What have done ! ");
        console.log("Error ", response.status, response.statusText);
        return;
    }

    let jsonResponse = await response.json();

    textResult.innerText = JSON.stringify(jsonResponse);
}

async function ApiRequestTasksIndex() {
    
    let response = await fetch(`${BASE_URL}/tasks/`, get_header(METHOD_GET, null));

    if(!response.ok){
        alert("What have done ! ");
        console.log("Error ", response.status, response.statusText);
        return;
    }

    let jsonResponse = await response.json();

    textResult.innerText = JSON.stringify(jsonResponse);
}