import {METHOD_GET, API_URL_QUICK_TASK_PING, myFetch} from '../constants/api.js'



 export async function pingQuickTasks() {
  let response =  await myFetch(METHOD_GET, API_URL_QUICK_TASK_PING, null)
  response_area2.innerText = JSON.stringify(response.data)
}

/*
{
    "success": true,
    "data": {
        "pong": "PONG with Auth!"
    },
    "message": "Ping retrieved successfully."
}

*/

