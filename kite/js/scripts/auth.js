import {BASE_URL, get_header, METHOD_POST, METHOD_GET, STORAGE_KEY_TOKEN} from '../constants/api.js'

let textResult = document.getElementById("textResult")
let btnPing = document.getElementById("btnPing")
let btnRegister = document.getElementById("btnRegister")
let btnLogin = document.getElementById("btnLogin")
let btnDisplayToken = document.getElementById("btnDisplayToken")
let btnUser= document.getElementById("btnUser")
let btnLogout= document.getElementById("btnLogout")

let inputName = document.getElementById("inputName")
let inputEmail = document.getElementById("inputEmail")
let inputPassword = document.getElementById("inputPassword")


btnPing.onclick = ApiRequestAuthPing
btnRegister.onclick = ApiRequestAuthRegister
btnLogin.onclick = ApiRequestAuthLogin
btnDisplayToken.onclick = displayToken
btnUser.onclick = ApiRequestAuthUser
btnLogout.onclick = ApiRequestAuthLogout


async function ApiRequestAuthPing(){
    let response = await fetch(`${BASE_URL}/auth/ping`);
       
    console.log("response", response);
        
        if(!response.ok){
            alert("what have you done!!!!!! "+response.status )
            return;
        }
       
        let jsonResponse = await response.json();
        console.log("jsonResponse", jsonResponse);

        textResult.innerHTML = jsonResponse.data.pong
}

async function ApiRequestAuthRegister(){
// TODO : 1. form validation
// TODO : 2. validate the email "test@domain.com" -> validate email using regex
// TODO : 3. validate the password 6 characters in length + 1 capital + 1 special
//  + 1 number + 1 small characters "Pass@123" -> validate password using regex

  let data = {
        name : inputName.value,
        email: inputEmail.value,
        password: inputPassword.value,
        c_password: inputPassword.value,
    }

    let response = await fetch(`${BASE_URL}/auth/register`, get_header(METHOD_POST, data));

  
       
    console.log("response", response);
        
        if(!response.ok){
            alert("what have you done!!!!!! "+response.status )
            return;
        }
       
        let jsonResponse = await response.json();
        console.log("jsonResponse", jsonResponse);

        textResult.innerHTML = JSON.stringify(jsonResponse)
}

async function ApiRequestAuthLogin(){
// TODO : 1. form validation
// TODO : 2. validate the email "test@domain.com" -> validate email using regex
// TODO : 3. validate the password 6 characters in length + 1 capital + 1 special
//  + 1 number + 1 small characters "Pass@123" -> validate password using regex

  let data = {
        email: inputEmail.value,
        password: inputPassword.value,
    }

    let response = await fetch(`${BASE_URL}/auth/login`, get_header(METHOD_POST, data));

  
       
    console.log("response", response);
        
        if(!response.ok){
            alert("what have you done!!!!!! "+response.status )
            return;
        }
       
        let jsonResponse = await response.json();
        console.log("jsonResponse", jsonResponse.data.token);
        // store the token
       localStorage.setItem(STORAGE_KEY_TOKEN , jsonResponse.data.token);

        textResult.innerHTML = JSON.stringify(jsonResponse.data.token)
}


async function ApiRequestAuthUser(){


    let response = await fetch(`${BASE_URL}/auth/user`, get_header(METHOD_GET, null));


    console.log("response", response);
        
        if(!response.ok){
            alert("what have you done!!!!!! "+response.status )
            return;
        }
       
        let jsonResponse = await response.json();
        console.log("jsonResponse", jsonResponse);

        textResult.innerHTML = JSON.stringify(jsonResponse)
}


async function ApiRequestAuthLogout(){


    let response = await fetch(`${BASE_URL}/auth/logout`, get_header(METHOD_GET, null));


    console.log("response", response);
        
        if(!response.ok){
            alert("what have you done!!!!!! "+response.status )
            return;
        }
       
        let jsonResponse = await response.json();
        console.log("jsonResponse", jsonResponse);

        textResult.innerHTML = JSON.stringify(jsonResponse)
}


function displayToken() {
   alert (localStorage.getItem(STORAGE_KEY_TOKEN)) ;
}

//localStorage.setItem()



