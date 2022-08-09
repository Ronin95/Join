let allTasks = [
    {
        title: 'Aufgabe Nr1',
        date: '2022-10-03',
        category: 'IT',
        urgency: 'Medium',
        description: 'This will be the description text.',
        user: 'Lukas Erdmanski',
        state: 'toDo',
    },
    {
        title: 'Aufgabe Nr2',
        date: '2022-07-08',
        category: 'Management',
        urgency: 'Low',
        description: 'This will be the description text.',
        user: ['Nikola Badjevic', 'Phil Schmucker', 'Maik Lange'],
        state: 'inProgress'
    },
    {
        title: 'Aufgabe Nr3',
        date: '2022-05-25',
        category: 'Sales',
        urgency: 'High',
        description: 'This will be the description text.',
        user: ['Lukas Erdmanski', 'Nikola Badjevic', 'Phil Schmucker', 'Maik Lange'],
        state: 'testing'
    },
    {
        title: 'Aufgabe Nr4',
        date: '2022-01-03',
        category: 'Design',
        urgency: 'Low',
        description: 'This will be the description text.',
        user: ['Lukas Erdmanski', 'Nikola Badjevic'],
        state: 'done'
    }
];

/**
 * The function is executed immediately after loading the web page.
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
 * This is also the id of the kanban column on the board, where the filtered task are placed as a task HTML-element.
 */
function renderColumn(columnName) {
    let filteredWithSameState = allTasks.filter(a => a['state'] == columnName);
    document.getElementById(`${columnName}Column`).innerHTML = '';
    for (let index = 0; index < filteredWithSameState.length; index++) {
        const el = filteredWithSameState[index];
        document.getElementById(`${columnName}Column`).innerHTML += genHTML(el);
    }
}


/**
 * Generate a single task item in the kanban column on board.
 * 
 * @param {JSON} el - This is a task from allTasks array with a certain filtered category. 
 * @returns - This returns the HTML code for the task item defined with the el paramter for a specific kanban column on board.
 */
function genHTML(el) {
    let categoryClass = setCategoryStyleForTaskItem(el['category']);

    return /* html */ `
    <!-- a red column task item -->
    <div class="card red border-dark my-2 w-100">
        <div class="card-header p-1 fs-6">
            <span class="badge p-1 fw-semibold text-bg-${categoryClass}">${el['category']}</span>
        </div>

        <div class="card-body text-dark p-1">
            <p class="card-title fw-bold m-0">
                ${el['title']}
            </p>
            <p class="card-text d-none">
                ${el['description']}
            </p>
        </div>

        <div
            class="card-footer bg-transparent border-success p-1 d-flex flex-grow-1 justify-content-between align-items-center gap-1">
            <span class="fw-semibold">${el['date']}</span>
            <div class="BCTIassignedTo d-flex flex-wrap justify-content-sm-end">
                <img src="img/lukas.png" class="border border-1 rounded-circle" />
                <img src="img/maik.png" class="border border-1 rounded-circle" />
                <img src="img/nikola.png" class="border border-1 rounded-circle" />
                <img src="img/Phil.jpg" class="border border-1 rounded-circle" />
            </div>
        </div>
    </div>
    `;
}


/**
 * Set the bootstrap class of a badge for a specific category of a task item.
 * 
 * @param {string} category - This is the assigned category to a task item according to which the badge style should be set as a return value.
 * @returns - The bootstrap class as a string selected for a specific task item category.
 */
function setCategoryStyleForTaskItem(category) {
    let categories = ['IT', 'Sales', 'Management', 'Production', 'Marketing', 'Marketing']
    let bsClassesForCategory = ['secondary', 'primary', 'danger', 'success', 'warning', 'info',]
    let indexInCategories = categories.indexOf(category)
    let classToSet = bsClassesForCategory[indexInCategories];
    return classToSet
}


/* function set(params) {
    let usersForAvatar = ['Lukas Erdmanski', 'Nikola Badjevic', 'Phil Schmucker', 'Maik Lange'],
    let imgageForAvatar = []
} */







