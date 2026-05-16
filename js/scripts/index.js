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
const modalHeader = document.getElementById("modalHeader")
const modalClose = document.getElementById("modalClose")



// this template will go in -> mainTasksColumnsContainer
let taskColumnContainerTemplate = document.getElementById('taskColumnContainerTemplate')
// this template will go in -> taskColumnCardsContainer
let taskCardTemplate = document.getElementById('taskCardTemplate')


// Get the modal
var showTaskModal = document.getElementById("showTaskModal");
var modalTitle = document.getElementById("modalTitle");
var modalDesc = document.getElementById("modalDesc");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];


// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    showTaskModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        showTaskModal.style.display = "none";
    }
}


if (getToken()) {
    fetchTaskCategories()
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
        adapter(response.data)
    }

}

function adapter(tasks) {

    taskCategories.forEach(category => {

        const columnContainerClone = taskColumnContainerTemplate.content.cloneNode(true)
        const taskColumn = columnContainerClone.getElementById("taskColumn")
        const taskColumnTitle = columnContainerClone.getElementById("taskColumnTitle")
        const taskColumnCardsContainer = columnContainerClone.getElementById("taskColumnCardsContainer")
        const filteredTasks = tasks.filter(task => task.task_category_id === category.id);

        taskColumn.key = category.id
        taskColumn.dataset.category_id = category.id
        taskColumnTitle.innerText = category.name


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
                modalTitle.innerText = task.name.slice(0, 10)
                modalDesc.innerText = task.name
                showTaskModal.style.display = "block";

                modalHeader.classList.remove(...modalHeader.classList);
                modalTitle.classList.remove(...modalTitle.classList);
                modalClose.classList.remove(...modalClose.classList);

                switch (category.name) {
                    case 'Log':
                        modalTitle.classList.add('text-accent-light')
                        modalClose.classList.add('text-accent-light', 'close')
                        modalHeader.classList.add('modal-header', 'bg-primary')
                        break
                    case 'Todo':
                        modalTitle.classList.add('text-accent-light')
                        modalClose.classList.add('text-accent-light', 'close')
                        modalHeader.classList.add('modal-header', 'bg-tertiary')
                        break
                    case 'In Progress':
                        modalTitle.classList.add('text-accent-light')
                        modalClose.classList.add('text-accent-light', 'close')
                        modalHeader.classList.add('modal-header', 'bg-secondary')
                        break

                    case 'Review':

                        modalTitle.classList.add('text-accent-dark')
                        modalClose.classList.add('text-accent-dark', 'close')
                        modalHeader.classList.add('modal-header', 'bg-accent-light', 'border-bottom-accent-dark')
                        break

                    case 'Done':
                        modalTitle.classList.add('text-accent-light')
                        modalClose.classList.add('text-accent-light', 'close')
                        modalHeader.classList.add('modal-header', 'bg-accent-dark')
                        break

                    default:
                        modalHeader.classList.add('modal-header', 'bg-primary')
                }

            }


            taskColumnCardsContainer.appendChild(taskCardClone)

        });


        if (category.name != 'Archive') {
            mainTasksColumnsContainer.appendChild(columnContainerClone);
        }

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