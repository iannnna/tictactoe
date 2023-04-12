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
      document.getElementById("myModal").classList.add("show");
      return;
    }
  }

  if (isBoardFull()) {
    document.getElementById("winnerText").innerText = "It's a draw!";
    document.getElementById("myModal").classList.add("show");
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
