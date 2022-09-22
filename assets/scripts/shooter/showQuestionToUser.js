import { newCreateAudio, showMessageAfterGame, shuffle } from "../functions.js";
import { startGameOne } from "../reloadPage.js";
import { countForUserQuestions, startGame } from "../values.js";

export function showQuestionToUser(questions) {

  let elemOfGameContent = document.querySelector(".game-content");
  startGame.setStartGame(true);

  let arrOfAnswers = shuffle([
    questions[countForUserQuestions.getCount()]["false-answer"][0][0],
    questions[countForUserQuestions.getCount()]["false-answer"][0][1],
    questions[countForUserQuestions.getCount()]["false-answer"][0][2],
    questions[countForUserQuestions.getCount()].question.en
  ]);

  const createP = (i) => `<p>${i}</p>`;

  let question = `
    <div class="game-content__user-question">
      <div class="user-question__question">${questions[countForUserQuestions.getCount()].question.ru}</div>
      <div class="user-question__answers">
        ${arrOfAnswers.map(createP).join(" ")}
      </div>
    </div>
  `;

  elemOfGameContent.innerHTML = question;

  document.querySelectorAll(".user-question__answers p")
    .forEach(i => i.addEventListener("click", checkUserAnswer));

  function checkUserAnswer(e) {

    if (e.target.innerHTML !== questions[countForUserQuestions.getCount()].question.en) {
      console.log("show message after game after checkUserAnswer incorrect user answer");
      showMessageAfterGame(false, "You lose");
      newCreateAudio("", true);
      startGame.setStartGame(false);
      startGameOne();
    }

    if (countForUserQuestions.getCount() + 1 === 10) {
      showMessageAfterGame(true, "You win");
      newCreateAudio("", true);
      startGameOne();
    }
    if (countForUserQuestions.getCount() + 1 !== 10 && startGame.getStartGame() === true) {
      countForUserQuestions.increaseCount();
      showQuestionToUser(questions);
    }
  }
}

