import {METHOD_GET, API_URL_AUTH_PING, myFetch} from '../constants/api.js'



 export async function pingAuth() {
  let response =  await myFetch(METHOD_GET, API_URL_AUTH_PING, null)
  response_area.innerText = JSON.stringify(response.data)
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

