// obtem todas as células da tabela e adiciona um listener para o evento click
const cells = document.querySelectorAll("td");
const gameStatusElement = document.getElementById('gameStatus');
const restartButton = document.getElementById('reset');

// define as variáveis globais
let currentPlayer = "X";
let gameStatus = "Game On!";
let moves = 0; // controla a quantidade de jogadas, quando chegar a 9 = para o jogo

// Aplica listerner em cada celula para detectar eventos
for (let i = 0; i < cells.length; i++) {
  cells[i].addEventListener("click", cellClicked);
}

// função que é chamada quando uma célula é clicada
function cellClicked() {
  // verifica se a célula já foi preenchida
  if (this.textContent !== "") {
    return;
  }
  // atualiza o conteúdo da célula com o símbolo do jogador atual
  this.textContent = currentPlayer;
  moves++;
  // verifica se houve um vencedor ou empate
  checkGameStatus();
  // atualiza o jogador atual
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

// função que verifica se houve um vencedor ou empate
function checkGameStatus() {
  const winningCombos = [
    // verifica as combinações horizontais
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // verifica as combinações verticais
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // verifica as combinações diagonais
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < winningCombos.length; i++) {
    const combo = winningCombos[i];
    const a = cells[combo[0]].textContent;
    const b = cells[combo[1]].textContent;
    const c = cells[combo[2]].textContent;
    if (a === "" || b === "" || c === "") {
      continue;
    }
    if (a === b && b === c) {
      gameStatusElement.textContent = "Game Over! " + currentPlayer + " wins!";

      // adiciona a classe de estilo para as células vencedoras
      for (let j = 0; j < combo.length; j++) {
        cells[combo[j]].classList.add("winner");
      }
      // remove o listener de click das células
      for (let j = 0; j < cells.length; j++) {
        cells[j].removeEventListener("click", cellClicked);
      }
      return;
    }
  }
  if (moves === 9) {
   gameStatusElement.textContent = "Game Over! It's a Tie!";
  }
}

// adiciona um listener para o evento click do botão de reiniciar
const restartBtn = document.querySelector("#reset");
restartBtn.addEventListener("click", function() {
  for (let i = 0; i < cells.length; i++) {
    cells[i].textContent = "";
    cells[i].classList.remove("winner");
    cells[i].addEventListener("click", cellClicked);
  }
  gameStatus = "Game On!";
  moves = 0;
  currentPlayer = "X";
  document.querySelector("#gameStatus").textContent = gameStatus;
});

// inicializa o jogo
document.querySelector("#gameStatus").textContent = gameStatus;