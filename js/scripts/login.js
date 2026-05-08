import {
    METHOD_GET, METHOD_POST, API_URL_AUTH_PING, API_URL_AUTH_REGISTER
    , fetchApiData, API_URL_AUTH_LOGIN
} from '../constants/api.js'


let btnLogin = document.getElementById('btnLogin')
btnLogin.onclick = function () { login() }


async function login() {

    let inputEmail = document.getElementById('inputEmail')
    let inputPassword = document.getElementById('inputPassword')

    let data = {
        email: inputEmail.value,
        password: inputPassword.value,
    }

    let response = await fetchApiData(METHOD_POST, API_URL_AUTH_LOGIN, data)
    if (response.success) {
       window.open("../../index.html", "_self");
    }

}
