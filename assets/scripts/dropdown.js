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
  // console.log(e.target.innerHTML)
}
// dropDown.addEventListener("click", e => {
//   let values = "a-z, looked-answer, guessed, did-not-guessed";
//   if (values.includes(e.target.innerHTML)) {
//     console.log(e.target.innerHTML)
//   }
//   // console.log(e.target.innerHTML)
// })