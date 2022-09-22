import { setDifficultyGame } from "./values.js";

addEventToSetDifficulty();
export function addEventToSetDifficulty() {
  document.querySelector(".main .dropdown").addEventListener("click", (e) => {
    setDifficultyGame.setDifficulty(e.target.innerHTML);
  });
}



