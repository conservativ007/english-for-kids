import { isGameStat, newCreateAudio, showMessageAfterGame, shuffle } from "../functions.js";
import { startGameOne } from "./shoter.js";

let count = 0;
// let gameStarted = true;
isGameStat.letsStartGame();

export function showQuestionToUser(questions) {

  let elemOfGameContent = document.querySelector(".game-content");

  let arrOfAnswers = shuffle([
    questions[count]["false-answer"][0][0],
    questions[count]["false-answer"][0][1],
    questions[count]["false-answer"][0][2],
    questions[count].question.en
  ]);

  const createP = (i) => `<p>${i}</p>`;

  let question = `
    <div class="game-content__user-question">
      <div class="user-question__question">${questions[count].question.ru}</div>
      <div class="user-question__answers">
        ${arrOfAnswers.map(createP).join(" ")}
      </div>
    </div>
  `;

  elemOfGameContent.innerHTML = question;

  document.querySelectorAll(".user-question__answers p")
    .forEach(i => i.addEventListener("click", checkUserAnswer));

  function checkUserAnswer(e) {
    if (e.target.innerHTML !== questions[count].question.en) {
      showMessageAfterGame(false, "You lose");
      newCreateAudio("", true);
      // gameStarted = false;
      isGameStat.letsStopGame();
      startGameOne();
      // gameStarted = false;
    }

    if (count + 1 === 10) {
      // console.log("end game");
      showMessageAfterGame(false, "You win");
      newCreateAudio("", true);
      startGameOne();
    }
    if (count + 1 !== 10 && isGameStat.getStartGameCondition() === true) {
      count++;
      showQuestionToUser(questions);
    }
  }
}

