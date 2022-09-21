import { setDifficultyGame } from "./values.js";

setDifficulty();
export function setDifficulty() {
  document.querySelector(".difficulty-mode").addEventListener("click", (e) => {
    setDifficultyGame.setDifficulty(e.target.value);
  });
}



