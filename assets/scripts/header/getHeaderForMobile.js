import { getWidthOfElem } from "../functions.js";
import { path } from "../values.js";
import { arrOfInnerNavbar, desktop, mobile } from "./headerValues.js";
import { addEventsToNavbar } from "./navbar.js";
let elemOfWrapper = document.querySelector(".wrapper");

function setHeader() {
  let header = document.createElement("header");
  let ul = document.createElement("ul");

  arrOfInnerNavbar.forEach((item, index) => {
    let li = document.createElement("li");
    if (index === 0 && path.getPath() === "categories") li.className = "active-navigation";
    if (item === path.getPath()) li.className = "active-navigation";
    if (index < 9) {
      let img = document.createElement("img");
      img.src = `./assets/images/icons_for_mobile/${item}.png`;
      img.className = "header-mobile__icon";
      li.setAttribute("data", item);
      li.append(img);
    } else {
      li.className = "slide"
    }

    ul.append(li);
  });

  header.prepend(ul);

  elemOfWrapper.removeChild(document.querySelector("header"));
  elemOfWrapper.prepend(header);
}

setInterval(() => {
  if (mobile.getMobile() === false && getWidthOfElem() <= 599) {
    mobile.setMobile(true);
    desktop.setDesktop(false);
    setHeader();
    addEventsToNavbar();
  }
}, 100);
