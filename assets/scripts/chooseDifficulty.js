import { setDifficultyGame } from "./functions.js";

let select = document.querySelector(".difficulty-mode");

select.addEventListener("click", (e) => {
  setDifficultyGame.setDifficulty(e.target.value);
  console.log(setDifficultyGame.getDifficulty());
})


