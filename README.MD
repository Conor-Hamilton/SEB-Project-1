# Tetris Reloaded

Tetris Reloaded blends the classic gameplay of Tetris with the iconic Matrix movie, challenging players to navigate and arrange falling tetrominoes against a backdrop inspired by the digital rain of the Matrix. As players clear lines and score points, they immerse themselves in a Matrix-themed environment, complete with themed visuals and tetris sound effects.

## Link to game:

https://conor-hamilton.github.io/SEB-Project-1/

## Overview and Concept:

Given one week to develop, I created a grid-based tetris game using JavaScript, HTML and CSS with a Matrix themed visual backdrop. The game becomes progressively more challenging as players navigate higher levels.

## Technologies Used

### HTML:

- Dynamic grid layout for the main game.
- Modal pop-ups for game over, and victory notifications.
- Background music and sound effect elements.
- Custom Matrix font

### CSS:

- Flexbox for responsive grid layout.
- Transitions and animations for engaging gameplay and UI effects.
- Matrix theme styling, including fonts and color schemes.

### JavaScript: 
- Implemented 'setInterval' for automated tetromino movement and game speed adjustments as the game gets harder.
- Boundry collision logic with rotation to ensure pieces move and rotate as per the classic game functions.
- Score and level system incorporating factors such as single lines cleared or multiple alongside a level up mechanism that increases difficulty


## Approach Taken:

### Day 1:
Deciding a theme for the game didn't take very long. I instantly thought of a Matrix theme and wanted to implement the matrix rain that is seen in the movies. I spent time reading the rules and understanding the game logic of Tetris as I hadn't played it many times.

### Day 2:
I implemented the dynamic grid and drawings of the tetrominos.

### Day 3:
I added Movement and rotation logic for the Tetrominos alongside collision checks. This was a interesting day as it added the most content to the project given that things were now moving on the screen and essentially playable to a certain extent.

### Day 4:
further collision logics and implemented score, difficulty that scales with levels. I decided to add a modal for game over sequence.

### Day 5:
Final adjustments to styling, implementing sounds and finishing touches.


## Key Learnings:
- Consolidating all that I had learnt in a short two week period specifically JavaScript as I had no prior experience. 
- Learnt how to use Canvas to draw the Matrix backdrop
- Really flexed my problem solving skills and googling skills.


## Challenges:
- The collision logic was a very difficult task, I feel I tackled it in a creative way.
- I had clipping issues for a while and it took alot of time and resources to get my head around what I needed to do but using KISS I got to break it down and keep things stupid simple(ish).
- The Matric backdrop

## Future Enhancements:
- Given more time I would have liked to add more styling to seperate the game a bit more from the backdrop. I also wanted to add a modal for instructions prior to the game starting as currently there aren't any.
- I would of liked the challenge of adding a 2 player mode given more time.
- Ghost piece
- Add a hard drop button that instantly drops and locks the current tetromino 

## Known Bugs:
- The game is free of significant bugs but there is one isolated collision bug with last minute rotation and movement that causes pieces to sometimes clip into a set piece.