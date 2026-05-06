

import {
    METHOD_GET, METHOD_POST, API_URL_AUTH_PING, API_URL_AUTH_REGISTER
    , fetchApiData, API_URL_AUTH_LOGIN
} from '../constants/api.js'



let test = document.getElementById('test')
let btnRegister = document.getElementById('btnRegister')




btnRegister.onclick = function () {register()}


async function register() {

    let inputName = document.getElementById('inputName')
    let inputEmail = document.getElementById('inputEmail')
    let inputPassword = document.getElementById('inputPassword')

    let data = {
        name: inputName.value,
        email: inputEmail.value,
        password: inputPassword.value,
        c_password: inputPassword.value,
    }

    let response = await fetchApiData(METHOD_POST, API_URL_AUTH_REGISTER, data)
    if (response.success) {
        window.open("../../index.html", "_self");
    }
}


