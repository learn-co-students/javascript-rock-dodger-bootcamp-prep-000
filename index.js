/**
 * Don't change these constants!
 */
const DODGER = document.getElementById('dodger')
const GAME = document.getElementById('game')
const GAME_HEIGHT = 400
const GAME_WIDTH = 400
const LEFT_ARROW = 37 // use e.which!
const RIGHT_ARROW = 39 // use e.which!
const ROCKS = []
const START = document.getElementById('start')

var gameInterval = null
var gameEnded = false;

/**
 * Be aware of what's above this line,
 * but all of your work should happen below.
 */

function checkCollision(rock) {
  // implement me!
  // use the comments below to guide you!
  const top = positionToInteger(rock.style.top)

  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)

    // FIXME: The DODGER is 40 pixels wide -- how do we get the right edge?
    //const dodgerRightEdge = 0;
    const dodgerRightEdge = dodgerLeftEdge + 40;

    const rockLeftEdge = positionToInteger(rock.style.left)

    // FIXME: The rock is 20 pixel's wide -- how do we get the right edge?
    //const rockRightEdge = 0;
    const rockRightEdge = rockLeftEdge + 20;

    if (false /**
               * Think about it -- what's happening here?
               * There's been a collision if one of three things is true:
               * 1. The rock's left edge is < the DODGER's left edge,
               *    and the rock's right edge is > the DODGER's left edge;
               * 2. The rock's left edge is > the DODGER's left edge,
               *    and the rock's right edge is < the DODGER's right edge;
               * 3. The rock's left edge is < the DODGER's right edge,
               *    and the rock's right edge is > the DODGER's right edge
               */) {
      return true
    }
    if((rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) ||
        (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) ||
        (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge)){
          return true;
        }
    else{
      return false
    }
  }
  return false;
}

function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock'
  //rock.style.left = `${x}px`
  rock.style.left = `2px`

  // Hmmm, why would we have used `var` here?
  var top = 40

  rock.style.top = top
  rock.style.top = `0px`

  /**
   * Now that we have a rock, we'll need to append
   * it to GAME and move it downwards.
   */
   //$('#game').append(rock);
   var game = document.getElementById('dodger');
   game.appendChild(rock);

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
     if(checkCollision(rock) === true || gameEnded == false){
       endGame();
     }

    /**
     * Otherwise, if the rock hasn't reached the bottom of
     * the GAME, we want to move it again.
     */

     if(positionToInteger(rock.style.top) <= GAME_HEIGHT){
       rock.style.top = `${positionToInteger(rock.style.top) + 2}px`;
       window.requestAnimationFrame(moveRock);
       //setInterval(function(){moveRock(rock)}, 500);
     }
     else {
       //ROCKS.remove(rock);
       ROCKS.shift();
       rock.remove();
     }


    /**
     * But if the rock *has* reached the bottom of the GAME,
     * we should remove the rock from the DOM
     */
  }

  // We should kick of the animation of the rock around here
  moveRock();

  // Add the rock to ROCKS so that we can remove all rocks
  // when there's a collision
  ROCKS.push(rock)

  // Finally, return the rock element you've created
  return rock;
}

/**
 * End the game by clearing `gameInterval`,
 * removing all ROCKS from the DOM,
 * and removing the `moveDodger` event listener.
 * Finally, alert "YOU LOSE!" to the player.
 */
function endGame() {
  clearInterval(gameInterval);

  /*var rock = document.getElementsByClassName('rock');
  for(var i=0; i<rock.length; i++){
    rock[i].remove();
  }*/
  while(ROCKS.length > 0){
    ROCKS.pop();
  }

  var game = document.getElementById('dodger');
  while(game.children.length > 0){
    game.firstChild.remove();
  }
  //rock.remove();
  //$('.rock').remove();
  //$('#game div.rock').remove();
  gameEnded = true;
  window.removeEventListener('keydown', moveDodger);
  document.removeEventListener('keydown', function(e){moveDodger;});
  //document.removeEventListener('keydown', handler);
  //document.removeEventListener('keydown',  {function: moveDodger});
  alert("YOU LOSE!");
}

function moveDodger(e) {
  // implement me!
  /**
   * This function should call `moveDodgerLeft()`
   * if the left arrow is pressed and `moveDodgerRight()`
   * if the right arrow is pressed. (Check the constants
   * we've declared for you above.)
   * And be sure to use the functions declared below!
   */
   if(e.which == LEFT_ARROW){
     moveDodgerLeft();
     e.stopPropagation();
     e.preventDefault();
   }
   else if (e.which == RIGHT_ARROW) {
     moveDodgerRight();
     e.stopPropagation();
     e.preventDefault();
   }
}

function moveDodgerLeft() {
  // implement me!
  /**
   * This function should move DODGER to the left
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
   if(positionToInteger(dodger.style.left) >= 4){
     var left = 0;

     function step(){
       DODGER.style.left = `${positionToInteger(dodger.style.left) - 2}px`;
       //left += 2;
       //if(positionToInteger(dodger.style.left) > 4){
         //window.requestAnimationFrame(step());
       //}
     }
     window.requestAnimationFrame(step)
   }
}

function moveDodgerRight() {
  // implement me!
  /**
   * This function should move DODGER to the right
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
   if(positionToInteger(dodger.style.left) < GAME_WIDTH - 40){

     function step(){
       DODGER.style.left = `${positionToInteger(dodger.style.left) + 2}px`;
       //if(positionToInteger(dodger.style.left) < GAME_WIDTH - 40){
        // window.requestAnimationFrame(step());
       //}
     }
     window.requestAnimationFrame(step);
   }
}

/**
 * @param {string} p The position property
 * @returns {number} The position as an integer (without 'px')
 */
function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0
}

var handler = function(e){
  //moveDodger(e);
}
function start() {

  document.addEventListener('keydown', function(e){moveDodger});
  //document.addEventListener('keydown', {Function: moveDodger});

  START.style.display = 'none'

//createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)));
  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000)
}
