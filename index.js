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
          const dodgerLeftEdge = positionToInteger(DODGER.style.left)

          // FIXME: The DODGER is 40 pixels wide -- how do we get the right edge?
          const dodgerRightEdge = dodgerLeftEdge + 40;

          const rockLeftEdge = positionToInteger(rock.style.left)

          // FIXME: The rock is 20 pixel's wide -- how do we get the right edge?
          const rockRightEdge = rockLeftEdge + 20;

          if (rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) {

            //collsion occurs
            return true;
          }

          else if (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) {

            //collision occurs
            return true;
          }

          else if (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge) {

            //collision occurs
            return true;
          }

          
          else {

            //collision doesn't occur — only above statements are true if there's a collision
            return false;
          }

  } //end if top is < 360 if statements
  
  
else if (top <= 360){
    return false;
  }
}

function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`

            // Hmmm, why would we have used `var` here?
  var top = 0
            
              /**
               * Now that we have a rock, we'll need to append
               * it to GAME and move it downwards.
               */
              
              //append rock to Game here.
              
              //figure out recursion issue
  
  GAME.appendChild(rock);
  
  //step as shown in read.me was unncessary because that's essentially what moveRock(in the default lab) was doing (i.e. top < GAME_HEIGHT)
  
  //scope issue. Because it was moverock and test wanted it to be called in create rock.
  window.requestAnimationFrame(moveRock)   

  
  function moveRock() {
              /**
               * This function moves the rock. (2 pixels at a time
               * seems like a good pace.)
               */  
               
               //this moves the rock
      rock.style.top = `${top += 2}px`          
                
                
                // implement me!
                // (use the comments below to guide you!)
              
     
     if (checkCollision(rock)) {
                     /**
                 * If a rock collides with the DODGER,
                 * we should call endGame()
                 */
       
       endGame();
     }

    if (top < GAME_HEIGHT) {
                /**
                 * Otherwise, if the rock hasn't reached the bottom of
                 * the GAME, we want to move it again.
                 */
      window.requestAnimationFrame(moveRock)
     
    } else {
      rock.remove();
    }
  
          // window.requestAnimationFrame(moveRock)       
                /**
                 * But if the rock *has* reached the bottom of the GAME,
                 * we should remove the rock from the DOM
                 */
                 
                 
              }//closes moverock function
            
              // We should kick of the animation of the rock around here
              
            
              // Add the rock to ROCKS so that we can remove all rocks
              // when there's a collision
  ROCKS.push(rock)

              // Finally, return the rock element you've created
  return rock
}




 
function endGame() {
  
  /**
 * End the game by clearing `gameInterval`,
 * removing all ROCKS from the DOM,
 * and removing the `moveDodger` event listener.
 * Finally, alert "YOU LOSE!" to the player.
 */
  
  //clear gameInterval
  clearInterval(gameInterval);
  
  //remove all ROCKS from the DOM
  for (let r = 0; r < ROCKS.length; r++) {
    ROCKS[r].remove();
  }
  
  //remove the 'moveDodger' event listener
  window.removeEventListener('keydown', moveDodger );
    
  //alert player "YOU LOSE!"
  return alert ("YOU LOSE!");
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
   
    //const LEFT_ARROW = 37 // use e.which!
    //const RIGHT_ARROW = 39 // use e.which!
    
    //call functions here:
    
    //why don't you use "e.which || e.details"  in if statements below?
    
    if (e.which == LEFT_ARROW) {
        moveDodgerLeft();
        e.stopPropagation();
        e.preventDefault();
    }
    
    if (e.which == RIGHT_ARROW) {
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
   
   
   //see previous labs/lessons for how to move things
   
  var left = 0;
 
  function step() {
    //why is "left += 0" instead of "left += 4"
    DODGER.style.left = `${left += 0}px`
 
    if (left < 0) {
      window.requestAnimationFrame(step)
    }
  }
 
  window.requestAnimationFrame(step)
}//end function

function moveDodgerRight() {
  // implement me!
  /**
   * This function should move DODGER to the right
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
  var left = 0;
  
  function step() {
    DODGER.style.left = `${left += 4}px`
    
    if (left < 360) {
      window.requestAnimationFrame(step)
    }
  }
  window.requestAnimationFrame(step)
}

/**
 * @param {string} p The position property
 * @returns {number} The position as an integer (without 'px')
 */
 
function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0
}

function start() {
  window.addEventListener('keydown', moveDodger)

  START.style.display = 'none'

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000)
}
