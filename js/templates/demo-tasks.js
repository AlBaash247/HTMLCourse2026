import { getToken } from '../constants/api.js'

let demoTasks = `    
        <div class="column task-card-container">
                <div class="task-card-header">
                    <h2>Log</h2>
                </div>

                <div class="task-card-content-container">
                    <div class="task-card">
                        <h4 class="task-card-title">Task 1</h4>
                        <p class="task-card-content">Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                            Asperiores vel, at dignissimos odit enim distinctio quasi.</p>
                    </div>
                </div>

            </div>

            <div class="column task-card-container">
                <div class="task-card-header">
                    <h2>Todo</h2>
                </div>

                <div class="task-card-content-container">
                    <div class="task-card">
                        <h4 class="task-card-title">Task 2</h4>
                        <p class="task-card-content">Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                            Asperiores vel, at dignissimos odit enim distinctio quasi cupiditate dolorum necessitatibus,
                            accusantium ipsum eaque quo officiis. Asperiores unde iure illo distinctio cum?</p>
                    </div>
                </div>

            </div>

            <div class="column task-card-container">
                <div class="task-card-header">
                    <h2>In Progress </h2>
                </div>

                <div class="task-card-content-container">
                    <div class="task-card">
                        <h4 class="task-card-title">Task 3</h4>
                        <p class="task-card-content">Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                            Asperiores vel, at dignissimos odit enim distinctio quasi cupiditate dolorum necessitatibus,
                            accusantium ipsum eaque quo officiis. </p>
                    </div>
                </div>

            </div>


            <div class="column task-card-container">
                <div class="task-card-header">
                    <h2>Review</h2>
                </div>

                <div class="task-card-content-container">
                    <div class="task-card">
                        <h4 class="task-card-title">Task 4</h4>
                        <p class="task-card-content">Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                            Asperiores vel, at dignissimos odit enim distinctio quasi cupiditate dolorum necessitatibus,
                            accusantium ipsum eaque quo officiis. Asperiores unde iure illo distinctio cum?</p>
                    </div>
                </div>

            </div>


            <div class="column task-card-container">
                <div class="task-card-header">
                    <h2>Done</h2>
                </div>

                <div class="task-card-content-container">
                    <div class="task-card">
                        <h4 class="task-card-title">Task 5</h4>
                        <p class="task-card-content">Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                            Asperiores vel, at dignissimos odit enim distinctio quasi cupiditate dolorum necessitatibus,
                            accusantium ipsum eaque quo officiis. Asperiores unde iure illo distinctio cum?</p>
                    </div>
                </div>

            </div>
`


let mainColumnTasksContainer = document.getElementById("mainColumnTasksContainer");

if (getToken() === null) {
    mainColumnTasksContainer.innerHTML = demoTasks;
}
