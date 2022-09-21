import { init } from "./getCards.js";
import { path } from "./values.js";


let elems = document.querySelectorAll("header ul li");

addEventsToNavbar();
export function addEventsToNavbar() {
  document.querySelectorAll("header ul li").forEach(i => i.addEventListener("click", addActiveClassToNavbar));
}


function addActiveClassToNavbar(e) {
  document.querySelectorAll("header ul li").forEach(i => i.classList.remove("active-navigation"));
  e.target.classList.add("active-navigation");

  if (e.target.innerHTML === "main") {
    path.setPath("categories");
    changeStartGameButton(true);
  } else {
    path.setPath(e.target.innerHTML);
    changeStartGameButton(false);
  }
  init();
}

export function setNavbarToDefaultCategory() {
  Array.from(document.querySelectorAll("header ul li")).forEach((item, index) => {
    if (index === 0) {
      item.classList.add("active-navigation");
    } else {
      item.classList.remove("active-navigation");
    }
  })
}

export function changeStartGameButton(bool) {
  document.querySelector(".main button").disabled = bool;
}

export function setActiveClassToNavbar(nameCategory) {
  elems.forEach((item) => {
    if (item.innerHTML === nameCategory) {
      item.classList.add("active-navigation");
    } else {
      item.classList.remove("active-navigation");
    }
  });
}






