/** The current dragged element (a task item of a board kanban columns) is globally saved here. */
let currentDraggedElement;

/**
 * The function is executed immediattasky after loading the web page.
 */
function initBoard() {
  users = loadFromBackend('users');
  allTasks = loadFromBackend('allTasks');
  renderAllColumns();
  showAllUser();
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
    <div id="${task.id}" class="card red board-border my-2" 
    draggable="true" 
    ondragend="stopSlideJustOnDrop()"
    ondragstart="startDragging(${task['id']})" 
    data-bs-toggle="modal" 
    data-bs-target="#staticBackdrop"
    onclick="openModal(${task['id']})">
        <div class="card-header p-1 fs-6">
        <span class="badge p-1 fw-semibold" style="background-color: ${
          colorsCategory[task['category']]
        }">
        ${task['category']}</span>
    </div>
        
        <div class="card-body text-dark p-1">
            <p class="card-title fw-bold m-0">${task['title']}</p>
            <p class="card-text d-none">${task['description']} </p>
        </div>

        <div class="card-footer bg-transparent p-1 d-flex justify-content-between align-items-center gap-1">
            <span class="fw-semibold text-dark">${task['date']}</span>
            <div class="cardAssignedTo">
                <img 
                  src="${task.userForTask.avatar}" 
                  class="rounded-circle"
                />
            </div>
        </div>
    </div>
    `;
}

/**
 * Set the current dragged task item.
 *
 * @param {number} id - This is a unique id of the task item.
 */
function startDragging(id) {
  currentDraggedElement = id;
  /*   document.getElementById('1660819882175').style.position = 'absolute';
    mobileDragDrop(); */
}

/**
 * Execute after a dragged element (here task item) is dropped
 * on the affected container (here board kanban column).
 * Change the state (to do / in progress / testing / done) for the affected task item.
 *
 * @param {string} state - This is the name of the board kanban column and the completion process of the affected task item.
 */
function moveTo(state) {
  let taskIndex = allTasks.find((n) => n.id == currentDraggedElement);
  taskIndex.state = state;
  saveInBackend(allTasks, 'allTasks');
  /* Hier muss eine Save Funktion ('Änderung des allTasks Standes) erfolgen, 
    damit die Änderung auch nach dem Reload der Seite funktioniert */
  renderAllColumns();
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

const myCarousel = new bootstrap.Carousel(document.getElementById('carousel'), {
  /* The speed of carousel sliding */
  interval: 400,
  pause: false,
  wrap: true,
});

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

let currentColumn;
let carousel = document.getElementById('carousel');

carousel.addEventListener('slid.bs.carousel', (event) => {
  let leftArrow = document.getElementById('leftArrowText');
  let rightArrow = document.getElementById('rightArrowText');

  currentColumn = myCarousel._activeElement.id;
  console.log(myCarousel._activeElement.id);

  if (currentColumn == 0) {
    leftArrow.innerHTML = columns[3].name;
    rightArrow.innerHTML = columns[1].name;
  }
  if (currentColumn == 1) {
    leftArrow.innerHTML = columns[0].name;
    rightArrow.innerHTML = columns[2].name;
  }
  if (currentColumn == 2) {
    leftArrow.innerHTML = columns[1].name;
    rightArrow.innerHTML = columns[3].name;
  }
  if (currentColumn == 3) {
    leftArrow.innerHTML = columns[2].name;
    rightArrow.innerHTML = columns[0].name;
  }
});

function toggleClassOpenModalDropDownUserList() {
  document
    .getElementById('user')
    .classList.toggle('modal-avatar-container-open');
}

function highlightCarouselControl(side) {
  document
    .getElementById(side + '-slide-buttom')
    .classList.add('highlight-carousel-control');
}

function removeHighlightCarouselControl(side) {
  document
    .getElementById(side + '-slide-buttom')
    .classList.remove('highlight-carousel-control');
}

let timeOut = null;

function highlightCarouselControlOnClick(side) {
  clearTimeout(timeOut);
  highlightCarouselControl(side);
  timeOut = setTimeout(() => {
    removeHighlightCarouselControl(side);
  }, 600);
}

function startSlideNext() {
  if (window.innerWidth < 576) {
    myCarousel.pause();
    myCarousel.cycle();
    console.log('test');
  }
}

function stopSlideNext() {
  if (window.innerWidth < 576) {
    myCarousel.pause();
  }
}

function startSlidePrev() {
  if (window.innerWidth < 576) {
    myCarousel.pause();
    myCarousel.cycle();
    console.log('started cycling');
    console.log('test');
  }
}

function stopSlidePrev() {
  myCarousel.pause();
  console.log('paused cycling');
}

function stopSlideJustOnDrop() {
  myCarousel.pause();
  if (reversed) {
    removedChangeDirectionClassReverseBackChildren();
  }
  removeHighlightCarouselControl('right');
  removeHighlightCarouselControl('left');
}

let reversed = false;

function addChangeDirectionClassReverseChildren() {
  document.getElementById('carousel-inner').classList.add('changeDirection');
  console.log('ADDED class');
  reverseChildren();
  reversed = true;
  console.log('children reversed to order: 4--3--2--1');
}

function removedChangeDirectionClassReverseBackChildren() {
  document.getElementById('carousel-inner').classList.remove('changeDirection');
  console.log('REMOVED class');
  reverseChildren();
  reversed = false;
  console.log('children reversed BACK to ORIGINAL order: 1--2--3--4');

  correctActiveIndicator();
}

function correctActiveIndicator() {
  let foundedIndex;
  for (let i = 0; i < 4; i++) {
    let value = document.getElementById(`ind${i}`).className;
    if (value == 'active') {
      foundedIndex = i;
    }
  }

  let wrongInd = document.getElementById(`ind${foundedIndex}`);
  wrongInd.classList.remove('active');
  wrongInd.removeAttribute('aria-current');

  let rightInd = document.getElementById(`ind${myCarousel._activeElement.id}`);
  rightInd.classList.add('active');
  rightInd.setAttribute('aria-current', 'true');
}

function reverseChildren() {
  myCarousel.pause();
  let parentItems = document.getElementById('carousel-inner');
  let parentIndicators = document.getElementById('carousel-indicators');

  for (var i = 1; i < parentItems.childNodes.length; i++) {
    parentItems.insertBefore(parentItems.childNodes[i], parentItems.firstChild);
    parentIndicators.insertBefore(
      parentIndicators.childNodes[i],
      parentIndicators.firstChild
    );
  }
}

window.onresize = function () {
  if (window.innerWidth < 576) {
    document.getElementById('carousel').setAttribute('data-bs-touch', 'true');
  } else {
    document.getElementById('carousel').setAttribute('data-bs-touch', 'false');
  }
};

function openModal(idValue) {
  let task = allTasks.find((n) => n.id == idValue);
  console.log('open');
  modalGenAllUser(task);

  document.getElementById('modalTitle').value = task.title;
  document.getElementById('modalDate').value = task.date;
  document.getElementById('modalCategory').value = task.category;
  document.getElementById('modalUrgency').value = task.urgency;
  document.getElementById('modalDescription').value = task.description;
  document.getElementById('modalSelectedUser').src = task.userForTask.avatar;
  document.getElementById('modalDeleteBtn').onclick = deleteTask(
    idValue,
    renderAllColumns
  );
}

function modalShowAllUsers() {
  document.getElementById('modalSelectedUser').classList.toggle('d-none');
  document.getElementById('modalUserCollection').classList.toggle('d-none');
}

function modalGenAllUser(task) {
  let modalUserCollection = document.getElementById('modalUserCollection');
  modalUserCollection.innerHTML = '';
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    if (task.userForTask.avatar == user.avatar) {
      modalUserCollection.innerHTML += /* html */ `
       <img class="assigendToImg rounded-circle border border-4 border-primary m-1" src="${user.avatar}">
    `;
    } else {
      modalUserCollection.innerHTML += /* html */ `
       <img class="assigendToImg rounded-circle border border-4 border-white m-1" src="${user.avatar}">
    `;
    }
  }
}
