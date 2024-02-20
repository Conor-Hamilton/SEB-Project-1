// Making a grid for main game, next piece and hold piece (hold piece tbc if im doing this)

// Current play section
const CurrentPlayGrid = document.querySelector(".grid");
const CurrentPlayWidth = 10;
const CurrentPlayHeight = 20;
const CurrentPlayCellCount = CurrentPlayWidth * CurrentPlayHeight;
const CurrentPlayCells = [];

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

function createGrid(cellCount, cells, gridContainer) {
  for (let i = 0; i < cellCount; i++) {
    const cell = document.createElement("div");
    cell.dataset.index = i;
    cells.push(cell);
    gridContainer.appendChild(cell);
  }
}

// create all three grids with cells.
createGrid(CurrentPlayCellCount, CurrentPlayCells, CurrentPlayGrid);
createGrid(nextCellCount, nextCells, nextGrid);
createGrid(holdCellCount, holdCells, holdGrid);

// Creating the shapes: I O T S Z J L
// Creating shapes 'factory'
class Shapes {
  constructor(shape) {
    this.shape = shape;
    this.position = { x: 4, y: 0 }; // Starting position for each shape.
    this.currentRotation = 0; // Initial rotation state.
  }

  getCurrentShape() {
    return this.shape[this.currentRotation]; // Return the current rotation of the shape
  }

  rotate() {
    this.currentRotation = (this.currentRotation + 1) % this.shape.length; // Rotate the shape to the next state
  }
}

// Shape definitions:
const shapes = {
  I: [
    // default
    [[1, 1, 1, 1]],
    [
      // rotation 1
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
    ],
  ],
  O: [
    // default
    [
      [1, 1],
      [1, 1],
    ],
  ],
  T: [
    [
      // default
      [0, 1, 0],
      [1, 1, 1],
    ],

    [
      // rotation 1
      [0, 1, 0],
      [0, 1, 1],
      [0, 1, 0],
    ],
    [
      // rotation 2
      [1, 1, 1],
      [0, 1, 0],
    ],
    [
      // rotation 3
      [0, 1, 0],
      [1, 1, 0],
      [0, 1, 0],
    ],
  ],
  S: [
    [
      // default
      [0, 1, 1],
      [1, 1, 0],
    ],
    [
      // rotation 1
      [0, 1, 0],
      [0, 1, 1],
      [0, 0, 1],
    ],
  ],
  Z: [
    [
      // default
      [1, 1, 0],
      [0, 1, 1],
    ],
    [
      // rotation 1
      [0, 1, 0],
      [1, 1, 0],
      [1, 0, 0],
    ],
  ],
  J: [
    [
      // default
      [0, 1, 0],
      [0, 1, 0],
      [1, 1, 0],
    ],
    [
      // rotation 1
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    [
      // rotation 2
      [0, 1, 1],
      [0, 1, 0],
      [0, 1, 0],
    ],
    [
      // rotation 3
      [0, 0, 0],
      [1, 1, 1],
      [0, 0, 1],
    ],
  ],
  L: [
    [
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 1],
    ],
    [
      [0, 0, 0],
      [1, 1, 1],
      [1, 0, 0],
    ],
    [
      [1, 1, 0],
      [0, 1, 0],
      [0, 1, 0],
    ],
    [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0],
    ],
  ],
};

// function to create Tetriminos
function createTetrimino(type) {
  currentTetrimino = new Shapes(shapes[type]);
  return currentTetrimino;
}

// Creating shapes functions
const i = createTetrimino("I");
const o = createTetrimino("O");
const t = createTetrimino("T");
const s = createTetrimino("S");
const z = createTetrimino("Z");
const j = createTetrimino("J");
const l = createTetrimino("L");

// Function to add a Tetrimino to the grid
function addShape(shapeType) {
  const tetrimino = createTetrimino(shapeType);
  const shape = tetrimino.getCurrentShape();
  let positionX = 4;
  let positionY = 0;
  let position = positionY * CurrentPlayWidth + positionX;

  shape.forEach((row, rowIndex) => {
    row.forEach((value, colIndex) => {
      if (value === 1) {
        let cellIndex = position + rowIndex * CurrentPlayWidth + colIndex;
        if (cellIndex < CurrentPlayCells.length) {
          CurrentPlayCells[cellIndex].classList.add("tetrimino");
        }
      }
    });
  });
}

addShape("O");

function clearCurrentTetrimino() {}

// event listener for rotations
function handleKeyDown(event) {
  if (event.keyCode === 38) {
    console.log("Up arrow was pressed");

    currentTetrimino.rotate();
    clearCurrentTetrimino();
    addShape(currentTetrimino.type);
  }
}
document.addEventListener("keydown", handleKeyDown);

// function to draw the shapes randomly
//
// core game mechanics / logic:
// // start the game
// creates variables such as score, level, lines cleared highscore etc.
// create functions for moving and rotating the shapes
// collision detection for the borders + placement
// function to update the board and clear complete lines
//
//
// game loop:
// track time - remember setInterval & clearInterval when game is over.
// update score
// store / update highscore
//
//
// controls
// event listeners for keyboard inputs (left, right, rotation, dropping down)
//
//
//

//////////////// CANVAS - MATRIX THEME /////////////////

// Create canvas
const canvas = document.getElementById("tetris-matrix");
const ctx = canvas.getContext("2d");

// Set height and width of the window.
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Create tetris shapes, font size and column size.
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
