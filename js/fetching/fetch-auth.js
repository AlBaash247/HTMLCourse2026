import {METHOD_GET, METHOD_POST, API_URL_AUTH_PING, API_URL_AUTH_REGISTER ,fetchApiData, API_URL_AUTH_LOGIN} from '../constants/api.js'


 export async function pingAuth(element) {
  let response =  await fetchApiData(METHOD_GET, API_URL_AUTH_PING, null)
  element.innerText = JSON.stringify(response.data)
}


 export async function apiLogin(element, data) {
  let response =  await fetchApiData(METHOD_POST, API_URL_AUTH_LOGIN, data)
  element.innerText = JSON.stringify(response.data)
}


 export async function apiRegister(element, data) {
  let response =  await fetchApiData(METHOD_POST, API_URL_AUTH_REGISTER, data)
  element.innerText = JSON.stringify(response.data)
}
