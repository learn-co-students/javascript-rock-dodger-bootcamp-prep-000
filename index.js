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
    //console.log(`Top = ${top}`);
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)

    // FIXME: The DODGER is 40 pixels wide -- how do we get the right edge?
    const dodgerRightEdge = dodgerLeftEdge + 40;// 0;

    const rockLeftEdge = positionToInteger(rock.style.left)

    // FIXME: The rock is 20 pixel's wide -- how do we get the right edge?
    const rockRightEdge = rockLeftEdge + 20; //0;

    //if (false 
    /**
               * Think about it -- what's happening here?
               * There's been a collision if one of three things is true:
               * 1. The rock's left edge is < the DODGER's left edge,
               *    and the rock's right edge is > the DODGER's left edge;
               * 2. The rock's left edge is > the DODGER's left edge,
               *    and the rock's right edge is < the DODGER's right edge;
               * 3. The rock's left edge is < the DODGER's right edge,
               *    and the rock's right edge is > the DODGER's right edge.
               ) 
               */
    
    const case1 = ((rockLeftEdge <= dodgerLeftEdge) && (rockRightEdge >= dodgerLeftEdge)) ? true : false;
    const case2 = ((rockLeftEdge >= dodgerLeftEdge) && (rockRightEdge <= dodgerRightEdge)) ? true : false;
    const case3 = ((rockLeftEdge <= dodgerRightEdge) && (rockRightEdge >= dodgerRightEdge)) ? true : false;

    if(case1 || case2 || case3)
    {
      return true
    }
  }
}

function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`
  
  // Hmmm, why would we have used `var` here?
  var top = 0

  rock.style.top = top

  /**
   * Now that we have a rock, we'll need to append
   * it to GAME and move it downwards.
   */
  GAME.appendChild(rock);

  /**
   * This function moves the rock. (2 pixels at a time
   * seems like a good pace.)
   */
  function moveRock() {
    // implement me!
    // (use the comments below to guide you!)
    /**
     * If a rock collides with the DODGER,
     * we should call endGame().
     */
     
     if(checkCollision(rock))
     {
       endGame();
     }

    /**
     * Otherwise, if the rock hasn't reached the bottom of
     * the GAME, we want to move it again.
     */
      top = top +2;
      rock.style.top = `${top}px`; 
    /**
     * But if the rock *has* reached the bottom of the GAME,
     * we should remove the rock from the DOM.
     */
      if(top < 400)
      {
        window.requestAnimationFrame(moveRock);
      }
      else
      {
        rock.remove();
      }
  }

  // We should kick off the animation of the rock around here.
  moveRock();
  
  // Add the rock to ROCKS so that we can remove all rocks
  // when there's a collision.
  //rock.id = `rock-${ROCKS.length+1}`;
  ROCKS.push(rock);

  // Finally, return the rock element you've created.
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
  for(let i = 0; i < ROCKS.length; i++)
  {
    //window.removeChild(ROCKS[i]);
    let tempRock = document.getElementById(`rock-${ROCKS.length}`);
    console.log(`Popping ${tempRock}`);
    ROCKS.pop();
    document.removeChild(tempRock);
  }
  window.removeEventListener('keydown', moveDodger);
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
   console.log("MoveDodger");
   if(e.which == LEFT_ARROW)
   {
     console.log("Left");
    window.requestAnimationFrame(moveDodgerLeft);
    //moveDodgerLeft();
   }
   else if (e.which == RIGHT_ARROW)
   {
     console.log("Right");
     window.requestAnimationFrame(moveDodgerRight);
     //moveDodgerRight();
   }
}

function moveDodgerLeft() {
  // implement me!
  /**
   * This function should move DODGER to the left
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
   Console.log("MoveLeft");
   const leftPosition = DODGER.style.left.replace('px', '');
   let leftNumber = positionToInteger(leftPosition);
   if(leftNumber > 0)
   {
     leftNumber = leftNumber - 4;
     DODGER.style.left = leftNumber;
   }
}

function moveDodgerRight() {
  // implement me!
  /**
   * This function should move DODGER to the right
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
   Console.log("MoveRight");
   const leftPosition = DODGER.style.left.replace('px', '');
   let leftNumber = positionToInteger(leftPosition);
   if(leftNumber < GAME_WIDTH)
   {
     leftNumber = leftNumber + 4;
     DODGER.style.left = leftNumber;
   }
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
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000);
}