function pronunciation(e) {
  let parent = e.parentNode;
  let description = parent.querySelector(".card__description-en").innerHTML.trim();
  speechEnglish(description);
}


function speechEnglish(text) {

  let synth = window.speechSynthesis;
  let message = new SpeechSynthesisUtterance();
  message.lang = 'en-US';
  message.text = text;
  synth.speak(message);
}