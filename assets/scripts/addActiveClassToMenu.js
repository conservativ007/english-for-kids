import { path } from "./script.js";

let menu = document.querySelector(".hamburger");
let overlay = document.querySelector(".overlay");

menu.addEventListener("click", toggleMenu);

function toggleMenu() {
  menu.classList.toggle("hamburger-active");
  overlay.classList.toggle("add-width");
}

function removeActiveClasses() {
  menu.classList.remove("hamburger-active");
  overlay.classList.remove("add-width");
}

// add active class to overlay
addActive();
export function addActive() {
  // removed class to all the elements to menu
  let elems = document.querySelectorAll('.menu__item');
  elems.forEach(i => i.classList.remove('active'));

  // add class active to menu element
  let el = document.querySelector(`[data-category="${path}"]`);
  el.classList.add('active');
}

document.addEventListener("click", (e) => {
  isOpenMenu(e);
})

function isOpenMenu(e) {
  let listOfElements = "menu, hamburger, hamburger-child__one, hamburger-child__two, hamburger-child__three";
  if (listOfElements.includes(e.target.classList[0]) === false) removeActiveClasses();
}









