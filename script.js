const song = document.getElementById("backgroundAudio");
const music = document.getElementById("music");
const moveAudio = document.getElementById("moveAudio");
const winAudio = document.getElementById("winAudio");
const gameOver = document.getElementById("gameOver");
const clickAudio = document.getElementById("clickAudio");

if (music) {
  music.onclick = function () {
    if (backgroundAudio.paused) {
      backgroundAudio.play();
      music.src = "./media/music-on.png";
    } else {
      backgroundAudio.pause();
      music.src = "./media/music-off.png";
    }
    clickAudio.play();
  };
}

const intro = document.getElementById("intro");
const game = document.getElementById("game");
const playButton = document.getElementById("play");

playButton.addEventListener("click", startGame);

function startGame() {
  intro.style.display = "none";
  game.removeAttribute("hidden");
  document.getElementById(
    "playerTurn"
  ).innerText = `Player ${currentPlayer}'s Turn`;
  clickAudio.play();
  moveAudio.play();
}

let board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];
let currentPlayer = "X";
let reviewingGame = false;
let gameMoves = [];
let undoneMoves = [];

function makeMove(row, col) {
  if (reviewingGame) {
    return;
  }
  if (!reviewingGame && board[row][col] === "") {
    board[row][col] = currentPlayer;
    document.getElementById("tic-tac-toe-board").children[row].children[
      col
    ].innerText = currentPlayer;
    checkWin();
    gameMoves.push({ row, col, player: currentPlayer });
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    document.getElementById(
      "playerTurn"
    ).innerText = `Player ${currentPlayer}'s Turn`;
    moveAudio.play();
  }
}

function checkWin() {
  const winningCombinations = [
    [
      [0, 0],
      [0, 1],
      [0, 2],
    ],
    [
      [1, 0],
      [1, 1],
      [1, 2],
    ],
    [
      [2, 0],
      [2, 1],
      [2, 2],
    ],
    [
      [0, 0],
      [1, 0],
      [2, 0],
    ],
    [
      [0, 1],
      [1, 1],
      [2, 1],
    ],
    [
      [0, 2],
      [1, 2],
      [2, 2],
    ],
    [
      [0, 0],
      [1, 1],
      [2, 2],
    ],
    [
      [0, 2],
      [1, 1],
      [2, 0],
    ],
  ];
  for (let combination of winningCombinations) {
    let [a, b, c] = combination;
    if (
      board[a[0]][a[1]] !== "" &&
      board[a[0]][a[1]] === board[b[0]][b[1]] &&
      board[a[0]][a[1]] === board[c[0]][c[1]]
    ) {
      document.getElementById("winnerText").innerText = `Player ${
        board[a[0]][a[1]]
      } wins!`;
      winAudio.play();
      document.getElementById("myModal").style.display = "flex";
      document.getElementById("myModal").style.justifyContent = "center";
      document.getElementById("myModal").style.alignItems = "center";
      document.getElementById("playerTurn").style.display = "none";
      return;
    }
  }
  if (isBoardFull()) {
    gameOver.play();
    document.getElementById("winnerText").innerText = "It's a draw!";
    document.getElementById("myModal").style.display = "flex";
    document.getElementById("myModal").style.justifyContent = "center";
    document.getElementById("myModal").style.alignItems = "center";
    document.getElementById("playerTurn").style.display = "none";
  }
}

function isBoardFull() {
  for (let row of board) {
    if (row.includes("")) {
      return false;
    }
  }
  return true;
}

function resetGame() {
  reviewingGame = false;
  board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  currentPlayer = "X";
  let cells = document.getElementsByClassName("cell");
  for (let i = 0; i < cells.length; i++) {
    cells[i].innerText = "";
  }
  document.getElementById("reviewButtons").style.display = "none";
  gameMoves = [];
  undoneMoves = [];
  document.getElementById(
    "playerTurn"
  ).innerText = `Player ${currentPlayer}'s turn`;
  document.getElementById("playerTurn").style.display = "block";
  document.getElementById("resetButton").addEventListener("click", function () {
    clickAudio.play();
  });
}

function restartGame() {
  reviewingGame = false;
  document.getElementById("myModal").style.display = "none";
  resetGame();
}

function reviewGame() {
  reviewingGame = true;
  document.getElementById("myModal").style.display = "none";
  document.getElementById("reviewButtons").style.display = "block";
  document.getElementById("previousMoveButton").disabled = false;
  clickAudio.play();
}

function previousMove() {
  if (gameMoves.length > 0) {
    let lastMove = gameMoves.pop();
    let row = lastMove.row;
    let col = lastMove.col;
    currentPlayer = lastMove.player === "X" ? "O" : "X";
    board[row][col] = "";
    document.getElementById("tic-tac-toe-board").children[row].children[
      col
    ].innerText = "";
    undoneMoves.push(lastMove);
    document.getElementById("nextMoveButton").disabled = false;
    clickAudio.play();
  }
  if (gameMoves.length <= 0) {
    document.getElementById("previousMoveButton").disabled = true;
  }
}

function nextMove() {
  if (undoneMoves.length > 0) {
    let nextMove = undoneMoves.pop();
    let row = nextMove.row;
    let col = nextMove.col;
    currentPlayer = nextMove.player;
    board[row][col] = currentPlayer;
    document.getElementById("tic-tac-toe-board").children[row].children[
      col
    ].innerText = currentPlayer;
    gameMoves.push(nextMove);
    document.getElementById("previousMoveButton").disabled = false;
    clickAudio.play();
  }
  if (undoneMoves.length <= 0) {
    document.getElementById("nextMoveButton").disabled = true;
  }
}

window.onload = function () {
  const resetFlag = localStorage.getItem("resetFlag");
  if (resetFlag === "true") {
    resetGame();
    localStorage.setItem("resetFlag", "false");
  }
};
window.onbeforeunload = function () {
  localStorage.setItem("resetFlag", "true");
};
