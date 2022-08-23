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

let isDragged = false;
let draggedIsOver = false;

/**
 * Generate a single task item in the kanban column on board.
 *
 * @param {JSON} task - This is a task from allTasks array with a certain filtered category.
 * @returns - This returns the HTML code for the task item defined with the task paramter for a specific kanban column on board.
 */
function genHTMLBoardTaskItem(task) {
  return /* html */ `
    <!-- a column task item -->
    <div id="${task.id}" class="card red border-dark my-2 w-100 overflow-hidden" draggable="true"
    ondragstart="startDragging(${task['id']})"
        data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        <div class="card-header p-1 fs-6">
        <span class="badge p-1 fw-semibold overflow-hidden" style="background-color: ${colorsCategory[task['category']]
    }">
        ${task['category']}</span>
    </div>
        
        <div class="card-body text-dark p-1">
            <p class="card-title fw-bold m-0">${task['title']}</p>
            <p class="card-text d-none">${task['description']} </p>
        </div>

        <div class="card-footer bg-transparent border-success p-1 d-flex flex-grow-1 justify-content-between align-items-center gap-1">
            <span class="fw-semibold date overflow-hidden">${task['date']}</span>
            <div class="cardAssignedTo d-flex flex-wrap justify-content-sm-end">
                <img src="${task.userForTask.avatar}" class="rounded-circle overflow-hidden"/>
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
  console.log(isDragged)
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
function moveTo(state, columnNo) {
  changeTransistionAndSlideTo();
  myCarousel.to(columnNo);
  clearInterval(slideInterval);


  /*   change()
    for (let i = 0; i < 4; i++) {
      document.getElementById(`carousel-item${i}`).classList.remove('active')
    } */
  // renderColumn(state);
  let taskIndex = allTasks.find((n) => n.id == currentDraggedElement);
  taskIndex.state = state;
  saveInBackend(allTasks, 'allTasks');

  // myCarousel.to(columnNo)
  /* Hier muss eine Save Funktion ('Änderung des allTasks Standes) erfolgen, 
    damit die Änderung auch nach dem Reload der Seite funktioniert */
  renderAllColumns();
  myCarousel.to(columnNo);
  console.log('geschorben')
  // document.getElementById(`carousel-item${columnNo}`).classList.add('active')
  changeTransistionAndSlideTo();
}

function moveOnHoverWithoutSave() {

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

let currentColumn = 0;
let counter = 0
let check = true;




let columnsCarousel = document.getElementById('carousel');

columnsCarousel.addEventListener('slid.bs.carousel', (event) => {
  if (counter == 3) {
    counter = 0;
  } else {
    counter++;
  }

  console.log(counter)

  let leftArrow = document.getElementById('leftArrowText');
  let rightArrow = document.getElementById('rightArrowText');
  currentColumn++;

  if (currentColumn == 4) {
    leftArrow.innerHTML = columns[currentColumn - 1].name;
    currentColumn = 0
    rightArrow.innerHTML = columns[currentColumn + 1].name;
  }
  else if (currentColumn == 3) {
    leftArrow.innerHTML = columns[currentColumn - 1].name;
    rightArrow.innerHTML = columns[0].name;
  } else {
    leftArrow.innerHTML = columns[currentColumn - 1].name;
    rightArrow.innerHTML = columns[currentColumn + 1].name;
  }
});

function toggleClassOpenModalDropDownUserList() {
  document
    .getElementById('user')
    .classList.toggle('modal-avatar-container-open');
}

function highlightSlideColumn(side) {
  document.getElementById(side + '-slide-buttom').classList.add('highlightSlideBtn');
}

function removeHighlightSlideColumn(side) {
  document.getElementById(side + '-slide-buttom').classList.remove('highlightSlideBtn');
}

let timeOut;

function highlichtSlideColumnOnClick(side) {
  clearTimeout(timeOut);
  highlightSlideColumn(side);
  timeOut = setTimeout(() => {
    removeHighlightSlideColumn(side)
  }, 1000);
}

function log() {
  console.log('test')
}

const myCarousel = new bootstrap.Carousel(document.getElementById('carousel'), {
  interval: 1000,
  pause: false,
  wrap: true,
});

console.log(myCarousel)


function change() {
  let carousel = document.getElementById('carousel-inner');

  carousel.classList.add('change')
}



let slideInterval
let slideDone = true;
let isSliding = false;
let starty = false;

const myCarouselEl = document.getElementById('carousel')
const carousello = bootstrap.Carousel.getInstance(myCarouselEl)


function startSlide() {
  // Retrieve a Carousel instance

  myCarouselEl.addEventListener('slid.bs.carousel', event => {
    slideDone = true;
    isSliding = false;
    carousello.prev() // Will slide to the slide 2 as soon as the transition to slide 1 is finished
  })


  // carousel.to('prev') // Will start sliding to the slide 1 and returns to the caller

  /* 
    clearInterval(slideInterval);
    slideInterval = setInterval(function () {
   */
  if (isSliding == false && slideDone == true && starty == false) {
    starty = true;
    carousello.prev();
  }
}




function startSlide2() {

  /*   let evt = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
      clientX: 20,
    }),
      ele = document.getElementById(side + '-arrow');
    ele.dispatchEvent(evt);
    console.log('Mouse') */

  /*   if (!check) {
  
      stopSlide(); 
  
      check = true; */
  // if{myCarousel._isSliding == false} [
  /*   if (isSliding == false) {
      clearInterval(slideInterval);
      slideLeft();
      // console.log('in')
    } */

  // ]


  /* 
      console.log('cycle')
    } */



  console.log('in')
  if (isDragged == true && draggedIsOver == true && myCarousel._isSliding == false) {
    clearInterval(slideInterval)
    myCarousel.prev()
    console.log('previn')
  }
  else {
    stopSlide()
  }
}

let active


function saveColumn() {
  active = myCarousel._activeElement;
}

function stopSlide() {
  starty = false
  slideDone = false;
  isSliding = false;
  // isSliding = false;
  // console.log('out')


  /*   check = false
  
    console.log('pause') */
}

/* document.addEventListener("dragend", function(event) {
  clearInterval();
  renderAllColumns();
  let myCarousel._activeElement.classList.add('active');
  console.log('added')
}); */

let forActive;

let elements = document.getElementsByClassName('carousel-item');

function changeTransistionAndSlideTo() {

  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    element.classList.toggle('testo')
  }

  console.log('hier war ich')
  // myCarousel2.to(columnNo);
  // document.getElementsByClassName('carousel-item').style.transition = 'transition: all 400ms ease !important';
}


/* const myCarousel2 = document.getElementById('carousel')

myCarousel2.addEventListener('slid.bs.carousel', event => {
  slideDone = true;
  isSliding = false;
  console.log('Slider FERTIG!')
})

myCarousel2.addEventListener('slide.bs.carousel', event => {
  slideDone = false;
  isSliding = true;
  console.log('Slider BEGONNEN!')
}) */


$(document).ready(function () {
  $('.carousel').each(function () {
    $(this).carousel();

    var carousel = $(this).data('bs.carousel'); // or .data('carousel') in bootstrap 2
    carousel.pause();

    // At first, reverse the order of the items in the carousel because we're moving backwards
    $(this).find('> .carousel-inner > .item:not(:first-child)').each(function () {
      $(this).prependTo(this.parentNode);
    });

    // Override the bootstrap carousel prototype function, adding a different one won't work (it'll work only for the first slide)
    carousel.cycle = function (e) {
      if (!e) this.paused = false
      if (this.interval) clearInterval(this.interval);
      this.options.interval
        && !this.paused
        && (this.interval = setInterval($.proxy(this.prev, this), this.options.interval))
      return this;
    };

    carousel.cycle();
  });
});


/* this._interval = null;

_clearInterval() {
  if (this._interval) {
    clearInterval(this._interval);
    this._interval = null;
  }
}

_updateInterval() {
  const element = this._activeElement || this._getActive();

  if (!element) {
    return;
  }

  const elementInterval = Number.parseInt(element.getAttribute('data-bs-interval'), 10);
  this._config.interval = elementInterval || this._config.defaultInterval;
} */





/* function test() {
  // FIXME TODO use `document.visibilityState`
  // Don't call next when the page isn't visible
  // or the carousel or its parent isn't visible
  myCarousel.to('prev');
} */

_intervalPrev = null;

function clearIntervalPrev() {
  if (myCarousel._intervalPrev) {
    clearInterval(myCarousel._intervalPrev);
    myCarousel._intervalPrev = null;
  }
}


function pausePrev() {
  myCarousel._isSlidung = true;
  myCarousel.pause();
  clearIntervalPrev() 
}


function cyclePrevTest() {
  clearIntervalPrev();

  myCarousel._updateInterval();

  myCarousel._intervalPrev = setInterval(() => myCarousel.prev(), myCarousel._config.interval);
}


function cycleL() {
  myCarousel._clearInterval();

  myCarousel._updateInterval();

  myCarousel._interval = setInterval(() => {
    myCarousel._directionToOrder('right');
    myCarousel._slide();
  }, myCarousel._config.interval);
}

