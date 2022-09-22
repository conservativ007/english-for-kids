addEventToDropdownMenuInTheStatistic();
export function addEventToDropdownMenuInTheStatistic() {
  let dropDown = document.querySelector(".modal .dropdown");

  dropDown.addEventListener("click", () => {
    dropDown.classList.toggle("dropdown-active");
  });

  let options = document.querySelectorAll(".modal .option div");

  options.forEach(i => i.addEventListener("click", func));

  function func(e) {
    document.querySelector(".modal .text-box").value = e.target.innerHTML;
  }
}

addEventToDropdownMenuInTheMain();
export function addEventToDropdownMenuInTheMain() {
  let dropDown = document.querySelector(".main .dropdown");

  dropDown.addEventListener("click", () => {
    dropDown.classList.toggle("dropdown-active");
  });

  let options = document.querySelectorAll(".main .option div");

  options.forEach(i => i.addEventListener("click", func));

  function func(e) {
    document.querySelector(".main .text-box").value = e.target.innerHTML;
  }
}


