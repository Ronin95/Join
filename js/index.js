/**
 * The current dragged element (a task item of a board kanban columns) is globally saved here.
 */
let currentDraggedElement;

/**
 * The function is executed immediattasky after loading the web page.
 */
function initBoard() {
  users = loadFromBackend('users');
  allTasks = loadFromBackend('allTasks');
  renderAllColumns();
  modalShowAllUser();
  isThereScrollBar();
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
    urgencyBoard(task.urgency, task.id);
  }
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
  let taskIndex = allTasks.find((n) => n.id == currentDraggedElement);
  taskIndex.state = state;
  saveInBackend(allTasks, 'allTasks');
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

/**
 * Create new bootstrap carousel object with its initial properties.
 */
const myCarousel = new bootstrap.Carousel(document.getElementById('carousel'), {
  /* The speed of carousel sliding */
  interval: 400,
  pause: false,
  wrap: true,
});

/**
 * Add the highlight effect to the carousel controll button.
 *
 * @param {string} side - This is the one of the carousel controll buttons
 * (left for the reverse sliding (direction from right to left) /
 * right for the default bootstrap sliding (direction form left to right)).
 */
function highlightCarouselControl(side) {
  document
    .getElementById(side + '-slide-button')
    .classList.add('highlight-carousel-control');
}

/**
 * Remove the highlight effect from the carousel controll button.
 *
 * @param {string} side - This is the one of the carousel controll buttons
 * (left for the reverse sliding (direction from right to left) /
 * right for the default bootstrap sliding (direction form left to right)).
 */
function removeHighlightCarouselControl(side) {
  document
    .getElementById(side + '-slide-button')
    .classList.remove('highlight-carousel-control');
}

/**
 * The variable, in which the intervall is saved after the click on one of the carousel controll buttons.
 */
let timeOut = null;

/**
 * Highlight the carousel controll button on click for the 600 miliseconds.
 *
 * @param {string} side - This is the one of the carousel controll buttons
 * (left for the reverse sliding (direction from right to left) /
 * right for the default bootstrap sliding (direction form left to right)).
 */
function highlightCarouselControlOnClick(side) {
  clearTimeout(timeOut);
  highlightCarouselControl(side);
  timeOut = setTimeout(() => {
    removeHighlightCarouselControl(side);
  }, 600);
}

/**
 * Start cycling of the carousel (direction: from left to right).
 */
function startSlideNext() {
  if (window.innerWidth < 576) {
    // myCarousel.pause();
    myCarousel.cycle();
  }
}

/**
 * Stop cycling of the carousel (direction: from left to right).
 */
function stopSlideNext() {
  if (window.innerWidth < 576) {
    myCarousel.pause();
  }
}

/**
 * Start reverse cycling of the carousel (direction: from right to left).
 */
function startSlidePrev() {
  if (window.innerWidth < 576) {
    // myCarousel.pause();
    myCarousel.cycle();
  }
}

/**
 * Stop reverse sliding of the carousel (direction: from right to left).
 */
function stopSlidePrev() {
  myCarousel.pause();
}

/** Stop sliding of the carousel, remove the 'change direction' css class (if the carousel was currently reverse sliding)
 * and the highlight css class of the carousel control buttons.
 */
function stopSlideJustOnDrop() {
  myCarousel.pause();
  if (reversed) {
    removedChangeDirectionClassReverseBackChildren();
  }
  removeHighlightCarouselControl('right');
  removeHighlightCarouselControl('left');
}

/**
 * The variable, in which the state is saved, if the carousel items (kanban columns)
 * and slide indicators have been already reversed in the DOM.
 */
let reversed = false;

/* Add the class 'change direction' changing the directon of the bootstrap default function cycling to from right to left. */
function addChangeDirectionClassReverseChildren() {
  document.getElementById('carousel-inner').classList.add('changeDirection');
  reverseChildren();
  reversed = true;
}

/* Remove the css class 'change direction' changing the directon of the bootstrap default function cycling to from right to left. */
function removedChangeDirectionClassReverseBackChildren() {
  document.getElementById('carousel-inner').classList.remove('changeDirection');
  reverseChildren();
  reversed = false;
  correctActiveIndicator();
}

/**
 * Correct the false active slide indicator to the right one
 * (after execution of carousel reverse sliding with help of default bootstrap fuctions
 * and prevous reversing the order of the carousel items (kanban columns) and slide indicatos in the DOM).
 */
function correctActiveIndicator() {
  let foundedIndex;
  /* Find the false active slide indicator */
  for (let i = 0; i < 4; i++) {
    let value = document.getElementById(`ind${i}`).className;
    if (value == 'active') {
      foundedIndex = i;
    }
  }
  /* Remove the css class 'active' and the value 'true'of the bootstrap aria-current attribute of the false slide indicator and add them to the right one. */
  let wrongInd = document.getElementById(`ind${foundedIndex}`);
  wrongInd.classList.remove('active');
  wrongInd.removeAttribute('aria-current');
  let rightInd = document.getElementById(`ind${myCarousel._activeElement.id}`);
  rightInd.classList.add('active');
  rightInd.setAttribute('aria-current', 'true');
}

/**
 * Reverse the order of the carousel items (kanban columns) and slide indicators for the reverse cyclling.
 */
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

/**
 * Change the value of the boostrap data attribute of the carousel according to the bs-sm-break point. Turn on / off the carousel swipping.
 */
window.addEventListener("resize", function () {
  if (window.innerWidth < 576) {
    document.getElementById('carousel').setAttribute('data-bs-touch', 'true');
  } else {
    document.getElementById('carousel').setAttribute('data-bs-touch', 'false');
  }
});

/**
 * Open the selected board task item in the modal.
 *
 * @param {number} idValue - This is the value of the id of the selected board task item.
 */
function openModal(idValue) {
  let task = allTasks.find((n) => n.id == idValue);
  let indexTask = allTasks.findIndex((obj) => obj.id == idValue);
  modalGenAllUser(task, idValue);
  document.getElementById('modalTitle').value = task.title;
  document.getElementById('modalDate').value = task.date;
  document.getElementById('modalCategory').value = task.category;
  document.getElementById('modalUrgency').value = task.urgency;
  document.getElementById('modalDescription').value = task.description;
  document.getElementById('modalSelectedUser').src = task.userForTask.avatar;
  renderButtons(indexTask);
  urgencyCol(task.urgency);
  modalHideAllUsers();
}

/**
 * Saves all changes in the open modal
 * @param {number} indexTask the location of the task in alltasks
 * @param {string} fct function name
 */
function adaptTask(indexTask, fct) {
  allTasks[indexTask].title = document.getElementById('modalTitle').value || '';
  allTasks[indexTask].date = document.getElementById('modalDate').value;
  allTasks[indexTask].category = document.getElementById('modalCategory').value;
  allTasks[indexTask].urgency = document.getElementById('modalUrgency').value;
  allTasks[indexTask].description =
    document.getElementById('modalDescription').value;
  allTasks[indexTask].userForTask.avatar = getRightSrcOfImg();
  saveInBackend(allTasks, 'allTasks');
  fct();
}

/**
 * changes a relative link to an absolute link
 * @returns gives an absolute link
 */
function getRightSrcOfImg() {
  let imgSrc = document.getElementById('modalSelectedUser').src;
  let indexSrc = imgSrc.indexOf('img');
  return './' + imgSrc.substring(indexSrc, imgSrc.length);
}

/**
 * Changes the assigned user in the task
 * @param {number} i selected user
 * @param {number} id id of the selected task
 */
function changeSelectedUser(i, id) {
  let indexTask = allTasks.findIndex((obj) => obj.id == id);
  let userTask = allTasks[indexTask].userForTask;
  let user = users[i];
  let imgSrc = getRightSrcOfImg();
  imgSrc = user.avatar;
  userTask.avatar = user.avatar;
  userTask.email = user.email;
  userTask.name = user.name;
  userTask.password = user.password;
  saveInBackend(allTasks, 'allTasks');
  changeModalAvatarAfterSelect(user);
}

/**
 * Change the user avatar in the modal after selection of one of the user avatars from the drop down menu.
 *
 * @param {JSON} user - This is the selected user from the drop dowm menu in the modal.
 */
function changeModalAvatarAfterSelect(user) {
  document.getElementById('modalSelectedUser').src = user.avatar;
}

/**
 * Switch the view in the modal between the selected user of the task and the scrollable container with all users to select.
 */
function modalShowAllUsers() {
  document.getElementById('modalSelectedUser').classList.toggle('d-none');
  document.getElementById('modalUserCollection').classList.toggle('d-none');
}

/**
 * Hide the open drop down menu of all user avatars in the modal.
 */
function modalHideAllUsers() {
  document.getElementById('modalSelectedUser').classList.remove('d-none');
  document.getElementById('modalUserCollection').classList.add('d-none');
}


/**
 * Generate all user avatars for the scrollable container: all users collection,
 * set the blue border for avatar of the assigned user to the task,
 * set the white border for the rest of user avatars.
 *
 * @param {JSON} task - This is the selected task with all its properties (saved in allTasks JSON).
 * @param {number} id - This is the value of id of the selected board task item.
 */
function modalGenAllUser(task, id) {
  let modalUserCollection = document.getElementById('modalUserCollection');
  modalUserCollection.innerHTML = '';
  for (let i = 1; i < users.length; i++) {
    const user = users[i];
    if (task.userForTask.avatar == user.avatar) {
      modalUserCollection.innerHTML += blueBorderImg(user, i, id);
    } else {
      modalUserCollection.innerHTML += whiteBorderImg(user, i, id);
    }
  }
}

let myModal = new bootstrap.Modal(document.getElementById('staticBackdrop'));
let formBoard = document.getElementById('boardSubmit');
const boardToast = document.getElementById('boardToast');
/**
 * when the form is submitted, the function is executed. It shows the toast and closes the modal after 2 seconds.
 * @param {event} event returns the event
 */
function handleForm(event) {
  event.preventDefault();
  const toast = new bootstrap.Toast(boardToast);
  toast.show();
  setTimeout(function () {
    myModal.hide();
  }, 2000);
}

formBoard.addEventListener('submit', handleForm);

/**
 * Set the property of the drag drop touch javascript add-on,
 * that the dragging should firstly start after a little stronger press and hold of the finger
 * and not on a short and weak one,
 * which would produce touch intepratations errors
 * with the default scroll funcionality on touch events on mobile devices.
 */
window.addEventListener("resize", configDragDropPressHoldMode);

function configDragDropPressHoldMode() {
  if (window.innerWidth < 576) {
    DragDropTouch.DragDropTouch._ISPRESSHOLDMODE = true;
  } else {
    DragDropTouch.DragDropTouch._ISPRESSHOLDMODE = false;
  }
  console.log(DragDropTouch.DragDropTouch._ISPRESSHOLDMODE)
};
