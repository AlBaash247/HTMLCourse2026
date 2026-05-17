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
const addTaskModal = document.getElementById("addTaskModal");
const addTaskModalClose = document.getElementById("addTaskModalClose")
const addTaskModalHeader = document.getElementById("addTaskModalHeader")
const addTaskSubmit = document.getElementById('addTaskSubmit')

const addTaskModalTitle = document.getElementById("addTaskModalTitle");
const addTaskModalDesc = document.getElementById("addTaskModalDesc");
const closeShowModal = document.getElementsByClassName("close")[0];


// inputs add task modal
const inputTaskNameShowModal = document.getElementById('inputTaskNameShowModal')
const inputTaskDescShowModal = document.getElementById('inputTaskDescShowModal')
const inputTaskCategoryShowModal = document.getElementById('inputTaskCategoryShowModal')



// When the user clicks on <closeShowModal> (x), close the modal
showTaskModalClose.onclick = function () {
    showTaskModal.style.display = "none";
}


// When the user clicks anywhere outside of either modal, close it
window.addEventListener('click', function (event) {
    if (event.target == showTaskModal) {
        showTaskModal.style.display = "none";
    }

    if (event.target == addTaskModal) {
        addTaskModal.style.display = "none";
    }
});

addTaskModalClose.onclick = function () {
    addTaskModal.style.display = "none";
}

addTaskSubmit.onclick = function () {
    fetchAddQuickTask()
}

if (getToken()) {
    fetchTaskCategories()
}


async function fetchAddQuickTask(){
    const name = inputTaskNameShowModal.value.trim()
    if (!name) {
        alert('Task name is required.')
        inputTaskNameShowModal.focus()
        return
    }

    const data = {
        name,
        description: inputTaskDescShowModal.value.trim(),
        task_category_id: Number(inputTaskCategoryShowModal.value)
    }

    const response = await fetchApiData(METHOD_POST, API_URL_QUICK_TASK_CREATE, data)

    if (response.success) {
        addTaskModal.style.display = 'none'
        inputTaskNameShowModal.value = ''
        inputTaskDescShowModal.value = ''
        inputTaskCategoryShowModal.value = ''
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
            addTaskModalTitle.innerText = `Add Task to ${category.name}`
            addTaskModalDesc.innerText = `Add a new task to ${category.name}. Task name is required; description is optional.`
            inputTaskCategoryShowModal.value = category.id
            inputTaskNameShowModal.value = ''
            inputTaskDescShowModal.value = ''

            addTaskModalHeader.classList.remove(...addTaskModalHeader.classList);
            addTaskModalTitle.classList.remove(...addTaskModalTitle.classList);
            addTaskModalClose.classList.remove(...addTaskModalClose.classList);

            switch (category.name) {
                case 'Log':
                    addTaskModalTitle.classList.add('text-accent-light')
                    addTaskModalClose.classList.add('text-accent-light', 'close')
                    addTaskModalHeader.classList.add('modal-header', 'bg-primary')
                    break
                case 'Todo':
                    addTaskModalTitle.classList.add('text-accent-light')
                    addTaskModalClose.classList.add('text-accent-light', 'close')
                    addTaskModalHeader.classList.add('modal-header', 'bg-tertiary')
                    break
                case 'In Progress':
                    addTaskModalTitle.classList.add('text-accent-light')
                    addTaskModalClose.classList.add('text-accent-light', 'close')
                    addTaskModalHeader.classList.add('modal-header', 'bg-secondary')
                    break

                case 'Review':

                    addTaskModalTitle.classList.add('text-accent-dark')
                    addTaskModalClose.classList.add('text-accent-dark', 'close')
                    addTaskModalHeader.classList.add('modal-header', 'bg-accent-light', 'border-bottom-accent-dark')
                    break

                case 'Done':
                    addTaskModalTitle.classList.add('text-accent-light')
                    addTaskModalClose.classList.add('text-accent-light', 'close')
                    addTaskModalHeader.classList.add('modal-header', 'bg-accent-dark')
                    break

                default:
                    addTaskModalHeader.classList.add('modal-header', 'bg-primary')
            }


            addTaskModal.style.display = "block";
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
        taskCardTitle.innerText = task.name.slice(0, 10)
        taskCardDesc.innerText = task.name


        taskCard.onclick = () => {
            // alert(`Task: ${task.name} \nCategory: ${category.name}`)
            showTaskModalTitle.innerText = task.name.slice(0, 10)
            showTaskModalDesc.innerText = task.name

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