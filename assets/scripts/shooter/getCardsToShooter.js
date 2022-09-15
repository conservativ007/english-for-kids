import { statistics } from "../data.js";
import { getAllTheQuestionsWords, shuffle } from "../functions.js";


export function getCardsToShooter() {
  let arrOfObjquestion = [];

  // get all the answers
  let testArr = getAllTheQuestionsWords();

  let copyStatistic = [...statistics];
  let shuffleCopyStatistic = shuffle(copyStatistic);

  shuffleCopyStatistic.forEach((item, index) => {
    if (index > 9) return;

    let question = {
      "question": item,
      "false-answer": [testArr.splice(0, 3)]
    }

    arrOfObjquestion.push(question);
  });
  return arrOfObjquestion;
}
