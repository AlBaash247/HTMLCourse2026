

import {
    METHOD_GET, METHOD_POST, API_URL_AUTH_PING, API_URL_AUTH_REGISTER
    , fetchApiData, API_URL_AUTH_LOGIN
} from '../constants/api.js'



let test = document.getElementById('test')
let btnLogin = document.getElementById('btnLogin')
let btnRegister = document.getElementById('btnRegister')

btnLogin.onclick = function () { login() }


btnRegister.onclick = function () {

    let inputName = document.getElementById('inputName')
    let inputEmail = document.getElementById('inputEmail')
    let inputPassword = document.getElementById('inputPassword')

    let data = {
        name: inputName.value,
        email: inputEmail.value,
        password: inputPassword.value,
        c_password: inputPassword.value,
    }

    apiRegister(response_area, data)
}


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
