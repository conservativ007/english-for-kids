export function getContent() {
  document.body.innerHTML += createContent();
}

function createContent() {
  return `
    <div class="game">
      <div class="game-inner">
        <div class="game-inner__front">
          <div class="game-content"></div>
        </div>
        <div class="game-inner__back">
          <p></p>
        </div>
      </div>
    </div>
  `
}

