/* TODO: Frage 1: Ein Event als Parameter in eine üblich JS Funktion, s. Bsp */
/**
 * When the form is submitted, the function is executed. It shows the toast and reset the add task formular.
 * @param {Event} event - The returned event, which will be prevented.
 */
function handleForm(event) {
  const successToast = document.getElementById("success_task");
  event.preventDefault();
  const toast = new bootstrap.Toast(successToast);
  toast.show();
  formAddTask.reset();
  showAllUser();
  loadCurrentDate();
}




/* TODO: Frage 2: addEventListener von einem window Objekt und einer Funktion ohne Klammern (definiert woanders) */
/**
 * Sets the property of the drag drop touch javascript add-on,
 * that the dragging should firstly start after a little stronger press and hold of the finger
 * and not on a short and weak one,
 * which would produce touch intepratations errors
 * with the default scroll funcionality on touch events on mobile devices.
 * @listens event:resize - ABCFJALKFJLKDAFJLDSJFSKL
 */
window.addEventListener("resize", configDragDropPressHoldMode);




/* TODO: Frage 2: addEventListener von einem window Objekt und einer Funktion direkt an dieser Stelle definiert */
/**
 * Sets dynamically the height of the scrollbar content of the sub pages (Backlog, Add Task, Help) on resize of the window.
 *
 * @listens resize - The resize event of the application window.
 */
window.addEventListener("resize", function () {
  setHeight("freshTask");

  if (window.innerWidth < 503) {
    setHeight("addTaskSubmit");
  } else {
    removeHeight("addTaskSubmit");
  }

  setHeight("helpScrollbarContent1");
  setHeight("helpScrollbarContent2");
});




/* TODO:Frage 2: addEventListener bei einer gloablen Variable */
/**
 * Listener of the HTML form validation element of the add task formular,
 * which 'listens' to the submit event of it and executes the function handleForm().
 *
 * @listens submit - The submit event of the HTML form validation element of the add task formular.
 *
 */
formAddTask.addEventListener("submit", handleForm);




/* TODO: Frage 3:  Instanz von einem Objekt / Klasse / JS Model (ich kenn nocht nicht die richtige Begrifflichkeit) */
/**
 * The bootstrap modal object used on the the login page.
 * @type {Object}
 */
 let myModal = new bootstrap.Modal(document.getElementById("staticBackdrop"));




 /* TODO: Frage 4: Instanz von einem Objekt / Klasse / JS Model aber mit direkt eine Funktion hinterm dem Punkt */
 /* TODO: Frage 16: max. Länge JSDoc */
 /**
  * The bootstrap carousel object with its initial properties.
  * @type {Object}
  * @property {number} interval - The amount of time to delay between automatically cycling an item.
  * @property {string|boolean} pause - If set to "hover", pauses the cycling of the carousel on mouseenter and resumes the cycling of the carousel on mouseleave. If set to false, hovering over the carousel won’t pause it. On touch-enabled devices, when set to "hover", cycling will pause on touchend (once the user finished interacting with the carousel) for two intervals, before automatically resuming. This is in addition to the mouse behavior.
  * @property {boolean} wrap - Whether the carousel should cycle continuously or have hard stops.
  */
 const myCarousel = new bootstrap.Carousel(document.getElementById("carousel"), {
   /* The speed of carousel sliding */
   interval: 400,
   pause: false,
   wrap: true,
 });
 



 /* TODO: Frage 6: globale / lokale Variablen*/
 /**
  * Memory for the current logged in user..
  * @type {Array}
  * @default
  */
 let currentUser = [];
 



 /* TODO: Frage 7 */
 // BACKUP of 'users' JSON in case it will be deleted from brackend server.
 /* users = [
   {
     name: 'Guest',
     password: '000',
     avatar: './img/guest.png',
     email: 'guest@join.org',
   },
   {
     name: 'Lukas Erdmanski',
     password: '123',
     avatar: './img/lukas.png',
     email: 'lukas@join.org',
   },
   {
     name: 'Nikola Badjevic',
     password: '123',
     avatar: './img/nikola.png',
     email: 'nikola@join.org',
   },
   {
     name: 'Phil Schmucker',
     password: '123',
     avatar: './img/phil.png',
     email: 'phil@join.org',
   },
   {
     name: 'Maik Langer',
     password: '123',
     avatar: './img/maik.png',
     email: 'maik@join.org',
   },
 ]; */




/* TODO: Frage 11: returns */
/**
 * Checks which HTML element was chosen as avatar.
 * @returns {HTMLElement} The chosen HTML element as avatar.
 */
function checkSelectedAvatar() {
  for (let i = 1; i < 5; i++) {
    let worker = document.getElementById(`worker${i}`);
    if (worker.classList.contains("border-danger")) {
      return worker;
    }
  }
}




/* TODO: Frage 17: date.js mit $ */
$(document).ready(function () {
  $(".input-daterange").datepicker({
    format: "dd/mm/yyyy",
    autoclose: true,
    calendarWeeks: true,
    clearBtn: true,
    disableTouchKeyboard: true,
  });
});




/* TODO: Frage 18: Direkte Ausführung in js Datei */
/**
 * The toast output after the input has been checked after the click on the trigger (here: sign in button).
 */
const toastTrigger1 = document.getElementById("signInBtn");
const toastLiveExample1 = document.getElementById("signInToast");
if (toastTrigger1) {
  toastTrigger1.addEventListener("click", () => {
    verifyNull();
    const toast = new bootstrap.Toast(toastLiveExample1);
    toast.show();
  });
}




/* TODO: Frage 19: Format bei Multi-Zeilenblock vom @param */
/**
 * Highlights the carousel controll button on click for the 600 miliseconds.
 * @param {string} side - The one of the carousel controll buttons
 * (left for the reverse sliding (direction from right to left) /
 * right for the default bootstrap sliding (direction from left to right)).
 */
function highlightCarouselControlOnClick(side) {
  clearTimeout(timeOut);
  highlightCarouselControl(side);
  timeOut = setTimeout(() => {
    removeHighlightCarouselControl(side);
  }, 600);
}