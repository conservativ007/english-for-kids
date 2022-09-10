import { init, setPath } from "./script.js";

let elems = document.querySelectorAll("header ul li");
elems.forEach(i => i.addEventListener("click", addActiveClassToNavbar));

function addActiveClassToNavbar(e) {
  elems.forEach(i => i.classList.remove("active-navigation"));
  e.target.classList.add("active-navigation");

  if (e.target.innerHTML === "main") {
    setPath("categories");
    changeStartGameButton(true);
  } else {
    setPath(e.target.innerHTML);
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






