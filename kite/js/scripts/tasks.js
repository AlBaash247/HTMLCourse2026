import {BASE_URL, get_header, METHOD_POST, METHOD_GET, STORAGE_KEY_TOKEN} from '../constants/api.js'


let inputTaskName = document.getElementById("inputTaskName");
let inputTaskDone = document.getElementById("inputTaskDone");
let inputTaskDesc = document.getElementById("inputTaskDesc");
let inputTaskCatId = document.getElementById("inputTaskCatId");



let textResult = document.getElementById("textResult");
let btnPing = document.getElementById("btnPing");
let btnCreate = document.getElementById("btnCreate");
let btnIndex = document.getElementById("btnIndex");


btnPing.onclick = ApiRequestTasksPing
btnCreate.onclick = ApiRequestTasksCreate
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



async function ApiRequestTasksCreate(){

    let isDone = inputTaskDone.checked? 1 : 0;

  let data = {
        name : inputTaskName.value,
        done: isDone,
        description: inputTaskDesc.value,
        task_category_id: inputTaskCatId.value,
    }


    let response = await fetch(`${BASE_URL}/tasks`, get_header(METHOD_POST, data));

       
    console.log("response", response);
        
        if(!response.ok){
            alert("what have you done!!!!!! "+response.status )
            return;
        }
       
        let jsonResponse = await response.json();
        console.log("jsonResponse", jsonResponse);

        textResult.innerHTML = JSON.stringify(jsonResponse)
}
