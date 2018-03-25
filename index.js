const DODGER = document.getElementById('dodger');
const GAME = document.getElementById('game');
const GAME_HEIGHT = 400;
const GAME_WIDTH = 400;
const LEFT_ARROW = 37; // use e.which!
const RIGHT_ARROW = 39; // use e.which!
const DODGER_SPEED = 4;
const ROCK_SPEED = 2;
const ROCKS = [];
const START = document.getElementById('start');

var gameInterval = null;

function checkCollision(rock) {
  // implement me!
  // use the comments below to guide you!
  const top = positionToInteger(rock.style.top);

  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left);

    const dodgerRightEdge = dodgerLeftEdge + 40;

    const rockLeftEdge = positionToInteger(rock.style.left);

    const rockRightEdge = rockLeftEdge + 20;

    if ((rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) ||
        (rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) ||
        (rockRightEdge >= dodgerRightEdge && rockLeftEdge <= dodgerRightEdge)){
      console.log("Game Over!");
      return true;
    }
  }
}

function createRock(x) {
  const rock = document.createElement('div');

  rock.className = 'rock';
  rock.style.left = IntegerToPosition(x);

  // Hmmm, why would we have used `var` here?
  var top = 0, myRq;

  rock.style.top = "0px";

  /**
   * Now that we have a rock, we'll need to append
   * it to GAME and move it downwards.
   */
  GAME.append(rock);

  /**
   * This function moves the rock. (2 pixels at a time
   * seems like a good pace.)
   */
  function moveRock() {
    // implement me!
    // (use the comments below to guide you!)
    /**
     * If a rock collides with the DODGER,
     * we should call endGame()
     */
    if (checkCollision(rock)){
      window.cancelAnimationFrame(myRq);
      endGame();
    }
    /**
     * Otherwise, if the rock hasn't reached the bottom of
     * the GAME, we want to move it again.
     */
    else if (positionToInteger(rock.style.top) < GAME_HEIGHT + 20){
      let top = positionToInteger(rock.style.top);
      
      top += ROCK_SPEED;
      
      rock.style.top = IntegerToPosition(top);
      
      myRq = window.requestAnimationFrame(moveRock);
    }
    /**
     * But if the rock *has* reached the bottom of the GAME,
     * we should remove the rock from the DOM
     */
     else{
       window.cancelAnimationFrame(myRq);
       if (rock.parentNode && rock.parentNode.id === 'game'){
        GAME.removeChild(rock);
       }
     }
  }

  // We should kick of the animation of the rock around here
  myRq = window.requestAnimationFrame(moveRock);
  // Add the rock to ROCKS so that we can remove all rocks
  // when there's a collision
  ROCKS.push(rock);

  // Finally, return the rock element you've created
  return rock;
}

function endGame() {
  clearInterval(gameInterval);
  console.log(`num rocks: ${ROCKS.length}`);
  for(var i = 0; i < ROCKS.length; i++){
    ROCKS[i].remove();
  }
  window.removeEventListener('keydown', moveDodger);
  alert("YOU LOSE!");
}

function moveDodger(e) {
   let key = e.which;
   //console.log(`Key: ${key}`);
  
   
   if (key === LEFT_ARROW){
     e.stopPropagation();
     e.preventDefault();
     moveDodgerLeft();
   }
   else if (key === RIGHT_ARROW){
     e.stopPropagation();
     e.preventDefault();
     moveDodgerRight();
   }
   else{
    return;
   }
}

function moveDodgerLeft() {
      window.requestAnimationFrame(function(){
       step(-DODGER_SPEED);
     });
}

function moveDodgerRight() {
     window.requestAnimationFrame(function(){
       step(DODGER_SPEED);
     });
}

function step(vector){    
  let left = positionToInteger(DODGER.style.left);
  
  //Moving right
  if (vector > 0){
    //Not touching right boundary
    if (left + 40 < GAME_WIDTH){
      left += vector;
    }
  }
  
  //Moving left
  else{
    //Not touching left boundary
    if (left > 0){
      left += vector;
    }
  }
  
  DODGER.style.left = IntegerToPosition(left);
}

function IntegerToPosition(i){
  return `${i}px`;
}

/**
 * @param {string} p The position property
 * @returns {number} The position as an integer (without 'px')
 */
function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0;
}

function start() {
  window.addEventListener('keydown', moveDodger);

  START.style.display = 'none';

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)));
  }, 1000);
}