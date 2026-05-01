import {pingAuth} from '../fetching/fetch-auth.js'
import {pingQuickTasks} from '../fetching/fetch-quicktasks.js'

let response_area = document.getElementById('response_area')
let response_area2 = document.getElementById('response_area2')
let btnPingAuth = document.getElementById('btnPingAuth')
let btnPingQuickTasks = document.getElementById('btnPingQuickTasks')

btnPingAuth.onclick = function(){pingAuth()}
btnPingQuickTasks.onclick = function(){pingQuickTasks()}
