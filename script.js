let board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];
let currentPlayer = "X";

function makeMove(row, col) {
  if (board[row][col] === "") {
    board[row][col] = currentPlayer;
    document.getElementById("tic-tac-toe-board").children[row].children[
      col
    ].innerText = currentPlayer;
    checkWin();
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
      alert(`Player ${board[a[0]][a[1]]} wins!`);
      resetGame();
      return;
    }
  }

  if (isBoardFull()) {
    alert("It's a draw!");
    resetGame();
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
