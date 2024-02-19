// The setup:
// Making a grid for main game and next piece

const playGrid = document.querySelector(".play-grid");
const playWidth = 10;
const playHeight = 20;
const playCellCount = playWidth * playHeight;
const playCells = [];

const nextGrid = document.querySelectorAll(".grid-4x4");
const nextWidth = 4;
const nextHeight = 4;
const nextCellCount = nextWidth * nextHeight;
const nextCells = [];

// Creating the shapes: I O T S Z J L
// define the shapes
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
