import { setDifficultyGame } from "./values.js";

setDifficulty();
export function setDifficulty() {
  document.querySelector(".main .dropdown").addEventListener("click", (e) => {
    // console.log(e.target.innerHTML)
    setDifficultyGame.setDifficulty(e.target.innerHTML);
  });
}



