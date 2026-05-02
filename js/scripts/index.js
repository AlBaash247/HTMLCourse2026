import {pingAuth, apiLogin, apiRegister} from '../fetching/fetch-auth.js'
import {pingQuickTasks} from '../fetching/fetch-quicktasks.js'

let response_area = document.getElementById('response_area')
let response_area2 = document.getElementById('response_area2')
let btnPingAuth = document.getElementById('btnPingAuth')
let btnPingQuickTasks = document.getElementById('btnPingQuickTasks')

let btnLogin = document.getElementById('btnLogin')
let btnRegister = document.getElementById('btnRegister')

btnPingAuth.onclick = function(){pingAuth(response_area)}
btnPingQuickTasks.onclick = function(){pingQuickTasks(response_area2)}

btnLogin.onclick = function(){


    let inputEmail = document.getElementById('inputEmail')
    let inputPassword = document.getElementById('inputPassword')

    let data = {
        email : inputEmail.value,
        password : inputPassword.value,
    }

    apiLogin(response_area, data)
}


btnRegister.onclick = function(){

    let inputName = document.getElementById('inputName')
    let inputEmail = document.getElementById('inputEmail')
    let inputPassword = document.getElementById('inputPassword')

    let data = {
        name : inputName.value,
        email : inputEmail.value,
        password : inputPassword.value,
        c_password : inputPassword.value,
    }

    apiRegister(response_area, data)
}

