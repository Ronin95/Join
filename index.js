/* let allTasks = [
    {
        id: 0,
        title: 'Aufgabe Nr1',
        date: '2022-10-03',
        category: 'IT',
        urgency: 'Medium',
        description: 'This will be the description text.',
        selectedUser: users[0],
        state: 'toDo',
    },
    {
        id: 1,
        title: 'Aufgabe Nr2',
        date: '2022-07-08',
        category: 'Management',
        urgency: 'Low',
        description: 'This will be the description text.',
        selectedUser: users[1],
        state: 'inProgress'
    },
    {
        id: 2,
        title: 'Aufgabe Nr3',
        date: '2022-05-25',
        category: 'Sales',
        urgency: 'High',
        description: 'This will be the description text.',
        selectedUser: users[2],
        state: 'testing'
    },
    {
        id: 3,
        title: 'Aufgabe Nr4',
        date: '2022-01-03',
        category: 'Design',
        urgency: 'Low',
        description: 'This will be the description text.',
        selectedUser: users[3],
        state: 'done'
    }
]; */

/** The current dragged element (a task item of a board kanban columns) is globally saved here. */
let currentDraggedElement;

/**
 * The function is executed immediattasky after loading the web page.
 */
function initBoard() {
  loadAllTasks();
  render();
}

/**
 * Render the whole board content (site)
 */
function render() {
  renderAllColumns();
}

/**
 * Render all kanban columns (TO DO, IN PROGRESS etc.) on the board.
 */
function renderAllColumns() {
  renderColumn('toDo');
  renderColumn('inProgress');
  renderColumn('testing');
  renderColumn('done');
}

/**
 * Render a single specific Kanban column on board.
 *
 * @param {string} columnName - This is the value of the state property in allTask JSON (according ).
 * The tasks are filtered accordingly to this from allTasks array. /
 * This is also the id of the kanban column on the board, where the filtered task are placed as a task HTML-taskement.
 */
function renderColumn(columnName) {
  let filteredWithSameState = allTasks.filter((a) => a['state'] == columnName);
  document.getElementById(`${columnName}Column`).innerHTML = '';
  for (let index = 0; index < filteredWithSameState.length; index++) {
    const task = filteredWithSameState[index];
    document.getElementById(`${columnName}Column`).innerHTML +=
      genHTMLBoardTaskItem(task);
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
    <div class="card red border-dark my-2 w-100" draggable="true" ondragstart="startDragging(${task['id']})">
        <div id="categories${task['id']}" class="card-header p-1 fs-6"></div>

        <div class="card-body text-dark p-1">
            <p class="card-title fw-bold m-0">${task['title']}</p>
            <p class="card-text d-none">${task['description']} </p>
        </div>

        <div class="card-footer bg-transparent border-success p-1 d-flex flex-grow-1 justify-content-between align-items-center gap-1">
            <span class="fw-semibold">${task['date']}</span>
            <div class="BCTIassignedTo d-flex flex-wrap justify-content-sm-end">
                <img src="${task.userForTask.avatar}" class="border border-1 rounded-circle"/>
            </div>
        </div>
    </div>
    `;
}

/**
 * Set the bootstrap class of a badge for a specific category of a task item and generate the category badge in the board task item.
 *
 * @param {JSON} task - This is a task from allTasks array with a certain filtered category.
 */
function genHTMLcategory(task) {
  let categoryContainer = document.getElementById(`categories${task['id']}`);
  categoryContainer.innerHTML = /* html */ `
  <span class="badge p-1 fw-semibold" 
  style="background-color: ${colorsCategory[task['category']]}">
  ${task['category']}</span>`;
}

/**
 * Set the current dragged task item.
 *
 * @param {number} id - This is a unique id of the task item.
 */
function startDragging(id) {
  currentDraggedElement = id;
}

/**
 * Execute after a dragged element (here task item) is dropped
 * on the affected container (here board kanban column).
 * Change the state (to do / in progress / testing / done) for the affected task item.
 *
 * @param {string} state - This is the name of the board kanban column and the completion process of the affected task item.
 */
function moveTo(state) {
  allTasks[currentDraggedElement]['state'] = state;
  saveAllTasks();
  /* Hier muss eine Save Funktion ('Änderung des allTasks Standes) erfolgen, 
    damit die Änderung auch nach dem Reload der Seite funktioniert */
  render();
}

/**
 * A w3school function: Simply integrated here.
 * Change the default behavior of the affected container (here board kanban column)
 * and give the permission to drop another HTML element over the affected container.
 *
 * @param {Event} ev - This is an event, if the a dragged element (her task item) is over (hovering) the affected container (here board kanban column).
 */
function allowDrop(ev) {
  ev.preventDefault();
}

/**
 * Highlight the kanban column when you hover over it with the dragged task item
 * (a corresponding class for this effect will be added to the affected column.).
 *
 * @param {string} columnName - This is the name of the board kanban column, which should be highlighted
 */
function hightlight(columnName) {
  document.getElementById(columnName).classList.add('drag-area-highlight');
}

/**
 * Remove the highlight effect for the kanban column when the dragged task item stop to hover it or will be dropped on it
 * (a corresponding class for this effect will be removed from the affected colum).
 *
 * @param {string} columnName - This is the name of the board kanban column, for which the highlicht effect should be removed.
 */
function removeHightlight(columnName) {
  document.getElementById(columnName).classList.remove('drag-area-highlight');
}

let columns = [
  {
    id: 0,
    name: 'TO DO',
  },
  {
    id: 1,
    name: 'IN PROGRESS',
  },
  {
    id: 2,
    name: 'TESTING',
  },
  {
    id: 3,
    name: 'DONE',
  },
];

let currentColumn = 1;

function slideWhenTaskHoverArrow() {
  let evt = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: true,
    clientX: 20,
    /* whatever properties you want to give it */
  }),
    ele = document.getElementById('right-arrow');
  ele.dispatchEvent(evt);
}

// function changeNameOfArrowColumn(i) {
//   currentColumn = columns;
//   let currentColumn = document.getElementById;
// }

let columnsCarousel = document.getElementById('carousel');

columnsCarousel.addEventListener('slid.bs.carousel', (event) => {
  let leftArrow = document.getElementById('leftArrowText');
  let rightArrow = document.getElementById('rightArrowText');
  if (currentColumn == 0) {
    leftArrow.innerHTML = columns[3].name;
    rightArrow.innerHTML = columns[currentColumn + 1].name;
  } else if (currentColumn == 3) {
    leftArrow.innerHTML = columns[currentColumn - 1].name;
    rightArrow.innerHTML = columns[0].name;
    currentColumn = -1;
  } else {
    leftArrow.innerHTML = columns[currentColumn - 1].name;
    rightArrow.innerHTML = columns[currentColumn + 1].name;
  }
  currentColumn++;
});
