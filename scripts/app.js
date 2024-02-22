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
    // this adds the bottom collision
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
let squares = Array.from(playGrid.querySelectorAll("div"));
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

// start game
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

// move down and collision
function moveDown() {
  unDraw();
  currentPosition += width;
  drawTetro();

  const isAtBottom = current.some(
    (index) => currentPosition + index + width >= cellCount
  );
  const isOnTaken = current.some((index) =>
    squares[currentPosition + index + width].classList.contains("taken")
  );

  if (isAtBottom || isOnTaken) {
    unDraw();
    current.forEach((index) =>
      squares[currentPosition + index].classList.add("taken")
    );
    random = nextRandom;
    nextRandom = Math.floor(Math.random() * tetros.length);
    current = tetros[random][currentRotation];
    currentPosition = 4;

    if (
      current.some((index) =>
        squares[currentPosition + index].classList.contains("taken")
      )
    ) {
      alert("Game Over");
      clearInterval(timerId);
    }
    addScore();
    nextShape();
    drawTetro();
  }
}

function handleKeyDown(event) {
  event.preventDefault();
  if (timerId) {
    if (event.keyCode === 37) {
      moveLeft();
    } else if (event.keyCode === 39) {
      moveRight();
    } else if (event.keyCode === 38) {
      rotate();
    } else if (event.keyCode === 40) {
      moveDown();
    }
  }
}

function moveLeft() {
  unDraw();
  const isAtLeftEdge = current.some(
    (index) => (currentPosition + index) % width === 0
  );
  if (!isAtLeftEdge) currentPosition -= 1;
  if (
    current.some((index) =>
      squares[currentPosition + index].classList.contains("taken")
    )
  ) {
    currentPosition += 1;
  }
  drawTetro();
}

function moveRight() {
  unDraw();
  const isAtRightEdge = current.some(
    (index) => (currentPosition + index) % width === width - 1
  );
  if (!isAtRightEdge) currentPosition += 1;
  if (
    current.some((index) =>
      squares[currentPosition + index].classList.contains("taken")
    )
  ) {
    currentPosition -= 1;
  }

  drawTetro();
}

function rotate() {
  unDraw();
  const originalRotation = currentRotation;
  currentRotation = (currentRotation + 1) % current.length; 
  current = tetros[random][currentRotation];

  if (!isRotationValid()) {
    currentRotation = originalRotation; 
    current = tetros[random][currentRotation];
  }
  drawTetro();
}

function isRotationValid() {
  const newPositions = current.map((index) => currentPosition + index);
  const isLeftSideInvalid = newPositions.some(
    (position) =>
      position % width === 0 &&
      newPositions.some((newPos) => newPos % width === width - 1)
  );
  const isRightSideInvalid = newPositions.some(
    (position) =>
      position % width === width - 1 &&
      newPositions.some((newPos) => newPos % width === 0)
  );

  if (isLeftSideInvalid || isRightSideInvalid) {
    return false;
  }

  return current.every((index) => {
    const newPosition = currentPosition + index;
    return (
      !squares[newPosition].classList.contains("taken") &&
      newPosition >= 0 &&
      newPosition < width * height
    );
  });
}

document.addEventListener("keydown", handleKeyDown);

const nextDisplaySquares = Array.from(nextGrid.querySelectorAll("div"));
let nextDisplayIndex = 0;

// tetros shown in next grid (do not need rotations)
const nextTetro = [
  [1, nextWidth + 1, nextWidth * 2 + 1, 2],
  [0, nextWidth, nextWidth + 1, nextWidth * 2 + 1],
  [1, nextWidth, nextWidth + 1, nextWidth + 2],
  [0, 1, nextWidth, nextWidth + 1],
  [1, nextWidth + 1, nextWidth * 2 + 1, nextWidth * 3 + 1],
];

// function to display the next tetro
function nextShape() {
  console.log("nextRandom: ", nextRandom);
  nextDisplaySquares.forEach((square) => {
    square.classList.remove("tetromino");
  });
  nextTetro[nextRandom].forEach((index) => {
    nextDisplaySquares[nextDisplayIndex + index].classList.add("tetromino");
  });
}

// scoring logic
function addScore() {
  for (let i = 0; i < 199; i += width) {
    const row = [
      i,
      i + 1,
      i + 2,
      i + 3,
      i + 4,
      i + 5,
      i + 6,
      i + 7,
      i + 8,
      i + 9,
    ];
    if (
      row.every(
        (index) => squares[index] && squares[index].classList.contains("taken")
      )
    ) {
      score += 10;
      totalScore.innerHTML = score;
      row.forEach((index) => {
        squares[index].classList.remove("taken");
        squares[index].classList.remove("tetromino");
      });
      const lineRemoved = squares.splice(i, width);
      squares = lineRemoved.concat(squares);
      squares.forEach((cell) => playGrid.appendChild(cell));
    }
  }
}

function endGame() {
  if (
    current.some((index) =>
      squares[currentPosition + index].classList.contains("taken")
    )
  ) {
    totalScore.innerHTML = "Game Over";
    clearInterval(timerId);
    return true;
  }
  return false;
}

function startNewGame() {
  currentPosition = 4;
  currentRotation = 0;
  random = Math.floor(Math.random() * tetros.length);
  current = tetros[random][currentRotation];
  drawTetro();
  timerId = setInterval(moveDown, 1000);
}

function resetGame() {
  clearInterval(timerId);
  timerId = null;

  score = 0;
  totalScore.innerHTML = "0";
  lineCleared.innerHTML = "0";
  speedLvl.innerHTML = "1";

  squares.forEach((square) => {
    square.classList.remove("tetromino", "taken");
  });
  nextCells.forEach((cell) => cell.classList.remove("tetromino"));
  holdCells.forEach((cell) => cell.classList.remove("tetromino"));
  startNewGame();
}

document.querySelector("#reset-button").addEventListener("click", resetGame);

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
