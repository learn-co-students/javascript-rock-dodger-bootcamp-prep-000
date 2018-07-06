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
    const dodgerRightEdge = dodgerLeftEdge + 40;
    const rockLeftEdge = positionToInteger(rock.style.left)
    const rockRightEdge = rockLeftEdge + 20;

      return (
        // If there is a collision, gotta let the world know
        (rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) ||
        (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) ||
        (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge)
        )
  }
}



function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`

  // Hmmm, why would we have used `var` here?
  // The people that need to know about DwayneJohnson
  // Can know about DwayneJohnson
  var top = rock.style.top = 0
  
  // Now that we have a rock, we'll need to append
  // it to GAME and move it downwards.
  GAME.appendChild(rock)






    // This function moves the rock. 
    // 2 pixels at a time seems like a good pace
    
  function moveRock() {
    // MAKE SURE THIS IS RIGHT
    rock.style.top = `${top += 2}px`

    // End the game if the dodger and rock collide
    if (checkCollision(rock)) {
      return endGame()
    }
    
    //Otherwise, if the rock hasn't reached the bottom of
    //the GAME, we want to move it again.
    if (top < GAME_HEIGHT) {
      window.requestAnimationFrame(moveRock)
    } else {
      rock.remove()
    }
  }
  
  window.requestAnimationFrame(moveRock)

  ROCKS.push(rock)

  // Return DwayneJohnson
  return rock
}





function endGame() {
  //End the game by clearing the gameInterval
  clearInterval(gameInterval)
  
  // Iterate over our collection of rocks and remove ALL of them
  ROCKS.forEach(function(rock) { rock.remove() })
  
  // Remove the moveDodger event listener
  document.removeEventListener('keydown', moveDodger)
  
  START.innerHTML = 'Play Again?'
  START.style.display = 'inline'
  
  return alert('You lost : (')
}





function moveDodger(e) {
  const key = e.which
  
  if ([LEFT_ARROW, RIGHT_ARROW].indexOf(key) > -1) {
    e.preventDefault()
    e.stopPropagation()
  }
  
  if (key === LEFT_ARROW) {
    moveDodgerLeft()
  } else if (key === RIGHT_ARROW) {
    moveDodgerRight()
  }
}







function moveDodgerLeft() {
  window.requestAnimationFrame(function() {
    const left = positionToInteger(DODGER.style.left)
    
    if (left > 0) {
      DODGER.style.left = `${left - 8}px`;
    }
  })
}







function moveDodgerRight() {
  window.requestAnimationFrame(function() {
    const left = positionToInteger(DODGER.style.left)

    if (left < 360) {
      DODGER.style.left = `${left + 8}px`;
    }
  })
}



 // Separate function to parse our px value
function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0
}







function start() {
  window.addEventListener('keydown', moveDodger)
  START.style.display = 'none'
  
  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 400)
}












