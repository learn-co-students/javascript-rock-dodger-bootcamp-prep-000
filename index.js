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
  const top = positionToInteger(rock.style.top)
  // rocks are 20px high
  // rocks are 20px wide
  // DODGER is 20px high
  // DODGER is 40px wide  
  // GAME_HEIGHT - 20 - 20 = 360px;
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)
    const dodgerRightEdge = positionToInteger(DODGER.style.left) + 40;
    const rockLeftEdge = positionToInteger(rock.style.left)
    const rockRightEdge = positionToInteger(rock.style.left) + 20;

    if (rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) {
      return true;
    } else if (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) {
      return true;
    } else if (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge) {
      return true;
    }
  }
}

function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`
  
  var top = 0

  rock.style.top = `${top}px`
  
  GAME.appendChild(rock)

  function moveRock() {
    rock.style.top = `${top += 2}px`

    if (checkCollision(rock)) {
      endGame()
    }

    if (top < 380) {
      window.requestAnimationFrame(moveRock)
    }  else {
      rock.remove()
    }
  }

  window.requestAnimationFrame(moveRock)
  ROCKS.push(rock) //to enable easy removal at end of game
  // directions say return rock but there is really no need and MDN docs say none expected
  //return rock 
}

/**
 * End the game by clearing `gameInterval`,
 * removing all ROCKS from the DOM,
 * and removing the `moveDodger` event listener.
 * Finally, alert "YOU LOSE!" to the player.
 */

// ******** HAVE TO FIND OUT WHY ALERT RUNS 10X ARRRRRGHHHHH!!!!!!! *************

function endGame() {
  //window.clearInterval(gameInterval)
  
  for (let i = 0; i < ROCKS.length; i++) {
    ROCKS[i].remove();
  }
  window.removeEventListener('keydown', moveDodger);
  START.style.display = '';
  alert("YOU LOSE!");
}


// function endGameAnotherWay() {

//   function doFirst() {
//     window.clearInterval(gameInterval)
//     clearRocksAndReset();
//     window.removeEventListener('keydown', moveDodger);
//     return true
//   }

//   if (doFirst()) {
//     alert("YOU LOSE!");
//     console.log("I'm alerting again -- who knows why!!")
//     return
//   }
// }

// function clearRocksAndReset() {
//   for (let i = 0; i < ROCKS.length; i++) {
//     ROCKS[i].remove();
//   }
//   START.style.display = '';
//   return true
// }

// async function endGameASYNC() {

//   let interval = await clearInterval(gameInterval);
//   let events = await function() {
//     window.removeEventListener('keydown', moveDodger)
//   };
//   let reset = await clearRocksAndReset();
//   let done = await function() {
//     return alert("YOU LOSE!");
//   }

//doIHaveToWrapEverythingInJavaScript()
//return alert("YOU LOSE!");
//  }


function moveDodger(e) {

  if(e.which === 37) {
    moveDodgerLeft()
  } else if (e.which === 39) {
    moveDodgerRight()
  } else if (e.which === 81 || e.which === 113) {
    endGame();
  }
}

function moveDodgerLeft() {
  var left = positionToInteger(DODGER.style.left)
  
  function step() {
    if (left > 0)
    DODGER.style.left = `${left -= 4}px`
  }
  window.requestAnimationFrame(step)
}

function moveDodgerRight() {
  var left = positionToInteger(DODGER.style.left)
  
  function step() {
    if (left < 360){
      DODGER.style.left = `${left += 4}px`  
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

  createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))

  // gameInterval = window.setInterval(function() {
  //   createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  // }, 1000)
}
