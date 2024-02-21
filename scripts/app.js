// Current play section
const playGrid = document.querySelector(".grid");
const width = 10;
const height = 20;
const cellCount = width * height;
const playCells = [];

// Next piece section
const nextGrid = document.querySelector("#next-piece");
const nextWidth = 4;
const nextHeight = 4;
const nextCellCount = nextWidth * nextHeight;
const nextCells = [];

// Hold piece section
const holdGrid = document.querySelector("#hold-piece");
const holdWidth = 4;
const holdHeight = 4;
const holdCellCount = nextWidth * nextHeight;
const holdCells = [];

function createGrid(cellCount, cells, gridContainer, addInvisibleDivs = false) {
  for (let i = 0; i < cellCount; i++) {
    const cell = document.createElement("div");
    cell.dataset.index = i;
    cells.push(cell);
    gridContainer.appendChild(cell);
  }
  if (addInvisibleDivs) {
    for (let i = 0; i < 10; i++) {
      const cell = document.createElement("div");
      cell.classList.add("taken");
      cell.style.visibility = "hidden";
      cells.push(cell);
      gridContainer.appendChild(cell);
    }
  }
}

// create all three grids with cells.
createGrid(cellCount, playCells, playGrid, true);
createGrid(nextCellCount, nextCells, nextGrid);
createGrid(holdCellCount, holdCells, holdGrid);

const totalScore = document.querySelector("#total-score");
const highScore = document.querySelector("#highscore");
const startButton = document.querySelector("#start-button");
const restartButton = document.querySelector("#restart-button");
const time = document.querySelector("#time");
const lineCleared = document.querySelector("#lines");
const speedLvl = document.querySelector("#speed-level");
const squares = Array.from(playGrid.querySelectorAll("div"));
let nextRandom = 0;
let timerId = 0;
let score = 0;

// Tetromino arrays - being drawn based on the declared width of grid
const lTetro = [
  [1, width + 1, width * 2 + 1, 2],
  [width, width + 1, width + 2, width * 2 + 2],
  [1, width + 1, width * 2 + 1, width * 2],
  [width, width * 2, width * 2 + 1, width * 2 + 2],
];

const zTetro = [
  [0, width, width + 1, width * 2 + 1],
  [width + 1, width + 2, width * 2, width * 2 + 1],
  [0, width, width + 1, width * 2 + 1],
  [width + 1, width + 2, width * 2, width * 2 + 1],
];

const tTetro = [
  [1, width, width + 1, width + 2],
  [1, width + 1, width + 2, width * 2 + 1],
  [width, width + 1, width + 2, width * 2 + 1],
  [1, width, width + 1, width * 2 + 1],
];

const oTetro = [
  [0, 1, width, width + 1],
  [0, 1, width, width + 1],
  [0, 1, width, width + 1],
  [0, 1, width, width + 1],
];

const iTetro = [
  [1, width + 1, width * 2 + 1, width * 3 + 1],
  [width, width + 1, width + 2, width + 3],
  [1, width + 1, width * 2 + 1, width * 3 + 1],
  [width, width + 1, width + 2, width + 3],
];

const tetros = [lTetro, zTetro, tTetro, oTetro, iTetro];

let currentPosition = 4;
let currentRotation = 0;
let random = Math.floor(Math.random() * tetros.length);
let current = tetros[random][currentRotation];

function drawTetro() {
  current.forEach((index) => {
    squares[currentPosition + index].classList.add("tetromino");
  });
}

function unDraw() {
  current.forEach((index) => {
    squares[currentPosition + index].classList.remove("tetromino");
  });
}

// start game logic
startButton.addEventListener("click", function () {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  } else {
    drawTetro();
    timerId = setInterval(moveDown, 1000);
    nextRandom = Math.floor(Math.random() * tetros.length);
  }
});

// move down logic and collision
function moveDown() {
  unDraw();
  const isAtBottom = current.some(
    (index) => currentPosition + index + width >= cellCount
  );
  const isOnTaken = current.some((index) =>
    squares[currentPosition + index + width].classList.contains("taken")
  );
  if (!isAtBottom && !isOnTaken) {
    currentPosition += width;
  } else {
    // locks in the current Tetro by adding the 'taken' class to it
    current.forEach((index) =>
      squares[currentPosition + index].classList.add("taken")
    );
    // generate a new Tetro at the top
    random = nextRandom;
    nextRandom = Math.floor(Math.random() * tetros.length);
    current = tetros[random][currentRotation];
    currentPosition = 4;
  }
  drawTetro();
}

function handleKeyDown(e) {
  if (timerId) {
    if (e.keyCode === 37) {
      moveLeft();
    } else if (e.keyCode === 39) {
      moveRight();
    } else if (e.keyCode === 38) {
      rotate();
    } else if (e.keyCode === 40) {
      moveDown();
    }
  }
}

function moveLeft() {

}
function moveRight() {

}
function rotate() {

}

document.addEventListener("keydown", handleKeyDown);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

//////////////// CANVAS - MATRIX THEME /////////////////

// create canvas
const canvas = document.getElementById("tetris-matrix");
const ctx = canvas.getContext("2d");

// set height and width of the window.
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// create tetris shapes, font size and column size.
const tetrisShapes = ["I", "O", "T", "S", "Z", "J", "L"];
const fontSize = 12;
const columns = canvas.width / fontSize;

// create array equal to the number of columns
const drops = Array(Math.floor(columns)).fill(1);

function draw() {
  // trailing effect
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // styling and font
  ctx.fillStyle = "#0F0";
  ctx.font = fontSize + "px Matrix";

  // looping for each column
  for (let i = 0; i < drops.length; i++) {
    const text = tetrisShapes[Math.floor(Math.random() * tetrisShapes.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    // resetting
    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}

setInterval(draw, 85);
