let board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

let currentPlayer = "X";
let reviewingGame = false;
let gameMoves = [];

function makeMove(row, col) {
  if (!reviewingGame && board[row][col] === "") {
    board[row][col] = currentPlayer;
    document.getElementById("tic-tac-toe-board").children[row].children[
      col
    ].innerText = currentPlayer;
    checkWin();
    gameMoves.push({ row, col, player: currentPlayer });
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
  console.log(gameMoves);
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
      document.getElementById("myModal").style.display = "block";
      return;
    }
  }

  if (isBoardFull()) {
    document.getElementById("winnerText").innerText = "It's a draw!";
    document.getElementById("myModal").style.display = "block";
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
}

function restartGame() {
  reviewingGame = false;
  document.getElementById("myModal").style.display = "none";
  resetGame();
}

function reviewGame() {
  reviewingGame = true;
  document.getElementById("myModal").style.display = "none";
}
