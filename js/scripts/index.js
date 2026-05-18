import {
    getToken, fetchApiData,
    METHOD_GET, METHOD_POST, METHOD_PUT, METHOD_UPDATE, METHOD_DELETE,
    API_URL_QUICK_TASK_PING, API_URL_QUICK_TASK_INDEX,
    API_URL_QUICK_TASK_CREATE, API_URL_QUICK_TASK_SHOW,
    API_URL_QUICK_TASK_UPDATE, API_URL_QUICK_TASK_DELETE,
    API_URL_TASK_CATEGORY_PING, API_URL_TASK_CATEGORY_INDEX
} from '../constants/api.js'


let taskCategories = []

const mainTasksColumnsContainer = document.getElementById('mainTasksColumnsContainer')
const showTaskModalHeader = document.getElementById("showTaskModalHeader")



// this template will go in -> mainTasksColumnsContainer
const taskColumnContainerTemplate = document.getElementById('taskColumnContainerTemplate')
// this template will go in -> taskColumnCardsContainer
const taskCardTemplate = document.getElementById('taskCardTemplate')

const showTaskModal = document.getElementById("showTaskModal");

// Get the show modal
const showTaskModalClose = document.getElementById("showTaskModalClose")
const showTaskModalTitle = document.getElementById("showTaskModalTitle");
const showTaskModalDesc = document.getElementById("showTaskModalDesc");


// Get the add modal
const createTaskModal = document.getElementById("createTaskModal");
const createTaskModalClose = document.getElementById("createTaskModalClose")
const createTaskModalHeader = document.getElementById("createTaskModalHeader")
const createTaskModalSubmit = document.getElementById('createTaskModalSubmit')

const createTaskModalTitle = document.getElementById("createTaskModalTitle");
const createTaskModalDesc = document.getElementById("createTaskModalDesc");
const closeShowModal = document.getElementsByClassName("close")[0];


// inputs add task modal
const createModalInputTaskName = document.getElementById('createModalInputTaskName')
const createModalInputTaskDesc = document.getElementById('createModalInputTaskDesc')
const createModalInputTaskCategory = document.getElementById('createModalInputTaskCategory')



// When the user clicks on <closeShowModal> (x), close the modal
showTaskModalClose.onclick = function () {
    showTaskModal.style.display = "none";
}


createTaskModalClose.onclick = function () {
    createTaskModal.style.display = "none";
}

// When the user clicks anywhere outside of either modal, close it
window.addEventListener('click', function (event) {
    if (event.target == showTaskModal) {
        showTaskModal.style.display = "none";
    }

    if (event.target == createTaskModal) {
        createTaskModal.style.display = "none";
    }
});


createTaskModalSubmit.onclick = function () {
    fetchAddQuickTask()
}

if (getToken()) {
    fetchTaskCategories()
}


async function fetchAddQuickTask(){
    const name = createModalInputTaskName.value.trim()
    if (!name) {
        alert('Task name is required.')
        createModalInputTaskName.focus()
        return
    }

    const data = {
        name,
        description: createModalInputTaskDesc.value.trim(),
        task_category_id: Number(createModalInputTaskCategory.value)
    }

    const response = await fetchApiData(METHOD_POST, API_URL_QUICK_TASK_CREATE, data)

    if (response.success) {
        createTaskModal.style.display = 'none'
        createModalInputTaskName.value = ''
        createModalInputTaskDesc.value = ''
        createModalInputTaskCategory.value = ''
        fetchQuickTasks()
    } else {
        alert(response.message || 'Could not add task.')
    }
}


async function fetchTaskCategories() {

    let response = await fetchApiData(METHOD_GET, API_URL_TASK_CATEGORY_INDEX, null)

    if (response.success) {
        // mainTasksColumnsContainer.innerText = JSON.stringify(response)
        taskCategories = response.data
        fetchQuickTasks()
    }

}


async function fetchQuickTasks() {

    let response = await fetchApiData(METHOD_GET, API_URL_QUICK_TASK_INDEX, null)

    if (response.success) {
        columnsAdapter(response.data)
    }

}

function columnsAdapter(tasks) {

    mainTasksColumnsContainer.innerHTML = ''

    taskCategories.forEach(category => {

        const columnContainerClone = taskColumnContainerTemplate.content.cloneNode(true)
        const taskColumn = columnContainerClone.getElementById("taskColumn")
        const taskColumnTitle = columnContainerClone.getElementById("taskColumnTitle")
        const taskColumnAddTask = columnContainerClone.getElementById("taskColumnAddTask")
        const taskColumnCardsContainer = columnContainerClone.getElementById("taskColumnCardsContainer")

        taskColumn.key = category.id
        taskColumn.dataset.category_id = category.id
        taskColumnTitle.innerText = category.name

        taskColumnAddTask.onclick = () => {
            createTaskModalTitle.innerText = `Add Task to ${category.name}`
            createTaskModalDesc.innerText = `Add a new task to ${category.name}. Task name is required; description is optional.`
            createModalInputTaskCategory.value = category.id
            createModalInputTaskName.value = ''
            createModalInputTaskDesc.value = ''

            createTaskModalHeader.classList.remove(...createTaskModalHeader.classList);
            createTaskModalTitle.classList.remove(...createTaskModalTitle.classList);
            createTaskModalClose.classList.remove(...createTaskModalClose.classList);

            switch (category.name) {
                case 'Log':
                    createTaskModalTitle.classList.add('text-accent-light')
                    createTaskModalClose.classList.add('text-accent-light', 'close')
                    createTaskModalHeader.classList.add('modal-header', 'bg-primary')
                    break
                case 'Todo':
                    createTaskModalTitle.classList.add('text-accent-light')
                    createTaskModalClose.classList.add('text-accent-light', 'close')
                    createTaskModalHeader.classList.add('modal-header', 'bg-tertiary')
                    break
                case 'In Progress':
                    createTaskModalTitle.classList.add('text-accent-light')
                    createTaskModalClose.classList.add('text-accent-light', 'close')
                    createTaskModalHeader.classList.add('modal-header', 'bg-secondary')
                    break

                case 'Review':

                    createTaskModalTitle.classList.add('text-accent-dark')
                    createTaskModalClose.classList.add('text-accent-dark', 'close')
                    createTaskModalHeader.classList.add('modal-header', 'bg-accent-light', 'border-bottom-accent-dark')
                    break

                case 'Done':
                    createTaskModalTitle.classList.add('text-accent-light')
                    createTaskModalClose.classList.add('text-accent-light', 'close')
                    createTaskModalHeader.classList.add('modal-header', 'bg-accent-dark')
                    break

                default:
                    createTaskModalHeader.classList.add('modal-header', 'bg-primary')
            }


            createTaskModal.style.display = "block";
        }

        cardsAdapter(category, tasks, taskColumnCardsContainer)

        if (category.name != 'Archive') {
            mainTasksColumnsContainer.appendChild(columnContainerClone);
        }

    });

}

function cardsAdapter(category, tasks, taskColumnCardsContainer) {  

    const filteredTasks = tasks.filter(task => task.task_category_id === category.id);

    filteredTasks.forEach(task => {
        const taskCardClone = taskCardTemplate.content.cloneNode(true)
        const taskCard = taskCardClone.getElementById("taskCard")
        const taskCardTitle = taskCardClone.getElementById("taskCardTitle")
        const taskCardDesc = taskCardClone.getElementById("taskCardDesc")

        taskCard.key = task.id
        taskCard.dataset.task_id = task.id
        taskCardTitle.innerText = task.name
        taskCardDesc.innerText = task.description
        console.log('task', task);
        


        taskCard.onclick = () => {
            // alert(`Task: ${task.name} \nCategory: ${category.name}`)
            showTaskModalTitle.innerText = task.name
            showTaskModalDesc.innerText = task.description

            showTaskModalHeader.classList.remove(...showTaskModalHeader.classList);
            showTaskModalTitle.classList.remove(...showTaskModalTitle.classList);
            showTaskModalClose.classList.remove(...showTaskModalClose.classList);

            switch (category.name) {
                case 'Log':
                    showTaskModalTitle.classList.add('text-accent-light')
                    showTaskModalClose.classList.add('text-accent-light', 'close')
                    showTaskModalHeader.classList.add('modal-header', 'bg-primary')
                    break
                case 'Todo':
                    showTaskModalTitle.classList.add('text-accent-light')
                    showTaskModalClose.classList.add('text-accent-light', 'close')
                    showTaskModalHeader.classList.add('modal-header', 'bg-tertiary')
                    break
                case 'In Progress':
                    showTaskModalTitle.classList.add('text-accent-light')
                    showTaskModalClose.classList.add('text-accent-light', 'close')
                    showTaskModalHeader.classList.add('modal-header', 'bg-secondary')
                    break

                case 'Review':

                    showTaskModalTitle.classList.add('text-accent-dark')
                    showTaskModalClose.classList.add('text-accent-dark', 'close')
                    showTaskModalHeader.classList.add('modal-header', 'bg-accent-light', 'border-bottom-accent-dark')
                    break

                case 'Done':
                    showTaskModalTitle.classList.add('text-accent-light')
                    showTaskModalClose.classList.add('text-accent-light', 'close')
                    showTaskModalHeader.classList.add('modal-header', 'bg-accent-dark')
                    break

                default:
                    showTaskModalHeader.classList.add('modal-header', 'bg-primary')
            }

            showTaskModal.style.display = "block";
        }


        taskColumnCardsContainer.appendChild(taskCardClone)

    });

}



/** ================ TaskCategories Response
 {
    "success":true,
    "data":[
            {
                "id":1,
                "name":"Log",
                "date_created":"2026-05-08 20:23:43",
                "date_updated":"2026-05-08 20:23:43"
                }
            ],
    "message":"Task categories retrieved successfully."
    }
 */



/** ================ QuickTasks Response
 
{ 
    "success": true, 
    "data": 
    [
        { 
            "id": 2,
             "user_id": 1,
             "name": "1 My First Task",
             "done": 1,
             "task_category_id": 2,
             "task_category_name": "Todo",
             "created_at": "2026-05-01T17:09:40.000000Z",
             "updated_at": "2026-05-15T20:27:53.000000Z" },
    ], 
    "message": "Quick Tasks retrieved successfully." 
}

*/