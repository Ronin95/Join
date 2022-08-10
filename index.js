let allTasks = [
    {
        id: '1',
        title: 'Aufgabe Nr1',
        date: '2022-10-03',
        category: 'IT',
        urgency: 'Medium',
        description: 'This will be the description text.',
        selectedUser: users[0],
        state: 'toDo',
    },
    {
        id: '2',
        title: 'Aufgabe Nr2',
        date: '2022-07-08',
        category: 'Management',
        urgency: 'Low',
        description: 'This will be the description text.',
        selectedUser: users[1],
        state: 'inProgress'
    },
    {
        id: '3',
        title: 'Aufgabe Nr3',
        date: '2022-05-25',
        category: 'Sales',
        urgency: 'High',
        description: 'This will be the description text.',
        selectedUser: users[2],
        state: 'testing'
    },
    {
        id: '4',
        title: 'Aufgabe Nr4',
        date: '2022-01-03',
        category: 'Design',
        urgency: 'Low',
        description: 'This will be the description text.',
        selectedUser: users[3],
        state: 'done'
    }
];

/**
 * The function is executed immediattasky after loading the web page.
 */
function initBoard() {
    render();
}


/**
 * Render the whole board content (site)
 */
function render() {
    renderAllColumns()
}


/**
 * Render all kanban columns (TO DO, IN PROGRESS etc.) on the board.
 */
function renderAllColumns() {
    renderColumn('toDo');
    renderColumn('inProgress');
    renderColumn('testing');
}


/**
 * Render a single specific Kanban column on board.
 * 
 * @param {string} columnName - This is the value of the state property in allTask JSON (according ). 
 * The tasks are filtered accordingly to this from allTasks array. /
 * This is also the id of the kanban column on the board, where the filtered task are placed as a task HTML-taskement.
 */
function renderColumn(columnName) {
    let filteredWithSameState = allTasks.filter(a => a['state'] == columnName);
    document.getElementById(`${columnName}Column`).innerHTML = '';
    for (let index = 0; index < filteredWithSameState.length; index++) {
        const task = filteredWithSameState[index];
        document.getElementById(`${columnName}Column`).innerHTML += genHTMLBoardTaskItem(task);
        genHTMLcategory(task);
    }
}


/**
 * Generate a single task item in the kanban column on board.
 * 
 * @param {JSON} task - This is a task from allTasks array with a certain filtered category. 
 * @returns - This returns the HTML code for the task item defined with the task paramter for a specific kanban column on board.
 */
function genHTMLBoardTaskItem(task) {
    return /* html */ `
    <!-- a column task item -->
    <div class="card red border-dark my-2 w-100">
        <div id="categories${task['id']}" class="card-header p-1 fs-6"></div>

        <div class="card-body text-dark p-1">
            <p class="card-title fw-bold m-0">${task['title']}</p>
            <p class="card-text d-none">${task['description']} </p>
        </div>

        <div class="card-footer bg-transparent border-success p-1 d-flex flex-grow-1 justify-content-between align-items-center gap-1">
            <span class="fw-semibold">${task['date']}</span>
            <div class="BCTIassignedTo d-flex flex-wrap justify-content-sm-end">
                <img src="${task['selectedUser']['avatar']}" class="border border-1 rounded-circle"/>
            </div>
        </div>
    </div>
    `;
}


/**
 * Set the bootstrap class of a badge for a specific category of a task item.
 * 
 * @param {string} category - This is the assigned category to a task item according to which the badge style should be set as a return value.
 * @returns - The bootstrap class as a string staskected for a specific task item category.
 */
function setCategoryStyleForTaskItem(category) {
    /* Maybe to dtaskete here if bsClassesForCategory will be declared generally in script.js. Temporary as as a local array.  */
    let bsClassesForCategory = ['secondary', 'primary', 'danger', 'success', 'warning', 'info',]
    let indexInAllCategories = allCategories.indexOf(category)
    let classToSet = bsClassesForCategory[indexInAllCategories];
    return classToSet
}


/**
 * Set the bootstrap class of a badge for a specific category of a task item and generate the category badge in the board task item. 
 * 
 * @param {JSON} task - This is a task from allTasks array with a certain filtered category. 
 */
function genHTMLcategory(task) {
    let bsClassesForCategory = ['secondary', 'primary', 'danger', 'success', 'warning', 'info',]
    let indexInAllCategories = allCategories.indexOf(task['category']);
    let categoryClass = bsClassesForCategory[indexInAllCategories];

    let categoriesContainer = document.getElementById(`categories${task['id']}`);
    categoriesContainer.innerHTML = /* html */ `<span class="badge p-1 fw-semibold text-bg-${categoryClass}">${task['category']}</span>`;
}