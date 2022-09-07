function showInner(someText) {
  document.querySelector(".text-box").value = someText;
}

let dropDown = document.querySelector(".dropdown");

dropDown.addEventListener("click", () => {
  dropDown.classList.toggle("dropdown-active");
});

let options = document.querySelectorAll(".option div");
options.forEach(i => i.addEventListener("click", func));

function func(e) {
  document.querySelector(".text-box").value = e.target.innerHTML;
}
