import { init } from "../getCards.js";
import { path } from "../values.js";


addEventsToNavbar();
export function addEventsToNavbar() {
  document.querySelectorAll("header ul li").forEach(i => i.addEventListener("click", addActiveClassToNavbar));
}

function addActiveClassToNavbar(e) {
  document.querySelectorAll("header ul li").forEach(i => i.classList.remove("active-navigation"));
  e.target.closest("li").classList.add("active-navigation");

  if (e.target.closest("li").getAttribute("data") === "main") {
    path.setPath("categories");
    changeStartGameButton(true);
  } else {
    path.setPath(e.target.closest("li").getAttribute("data"));
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
  document.querySelectorAll("header ul li").forEach((item) => {
    if (item.getAttribute("data") === nameCategory) {
      item.classList.add("active-navigation");
    } else {
      item.classList.remove("active-navigation");
    }
  });
}






