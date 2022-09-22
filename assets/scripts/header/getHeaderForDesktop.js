import { getWidthOfElem } from "../functions.js";
import { addEventsToNavbar } from "./navbar.js";
import { path } from "../values.js";
import { arrOfInnerNavbar, desktop, mobile } from "./headerValues.js";
let elemOfWrapper = document.querySelector(".wrapper");

function setHeader() {
  let header = document.createElement("header");
  let ul = document.createElement("ul");

  arrOfInnerNavbar.forEach((item, index) => {
    let li = document.createElement("li");
    if (index === 0 && path.getPath() === "categories") li.className = "active-navigation";
    if (item === path.getPath()) li.className = "active-navigation";
    if (index === 9) li.className = "slide";

    li.innerHTML = item;
    li.setAttribute("data", item);
    ul.append(li);
  });

  header.prepend(ul);

  elemOfWrapper.removeChild(document.querySelector("header"));
  elemOfWrapper.prepend(header);
}

setInterval(() => {
  if (desktop.getDesktop() === false && getWidthOfElem() > 599) {
    desktop.setDesktop(true);
    mobile.setMobile(false);
    setHeader();
    addEventsToNavbar();
  }
}, 100);