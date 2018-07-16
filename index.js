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
    const dodgerRightEdge = positionToInteger(DODGER.style.left) + 40;

    const rockLeftEdge = positionToInteger(rock.style.left)

    // FIXME: The rock is 20 pixel's wide -- how do we get the right edge?
    const rockRightEdge = positionToInteger(rock.style.left) + 20;

//     if (false /**
//                * Think about it -- what's happening here?
//                * There's been a collision if one of three things is true:
//                * 1. The rockleftedge < DODGERleftedge,
//                *    and the rockrightedge > DODGERleftedge; rockLeftEdge < dodgerLeftEdge and rockRightEdge > dodgerLeftEdge 
//                * 2. The rockleftedge > DODGERleftedge, 
//                *    and the rockrightedge < DODGERrightedge; rockLeftEdge > dodgerLeftEdge and rockRightEdge < dodgerRightEdge
//                * 3. The rockleftedge < DODGERrightedge,
//                *    and the rockrightedge > DODGERrightedge  rockLeftEdge < dodgerRightEdge && rockRightEdge > dodgerRightEdge
//                */) {
//       return true
//     }
//   }
// }

  if((rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) || (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge)
   ||(rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge)){
    return true;
  }
}
}
//l/et index = 0;

function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`
  
  var top = 0

  rock.style.top = top
  
  GAME.appendChild(rock);

 
  function moveRock() {  
        if(!checkCollision(rock)){
        top = positionToInteger(rock.style.top)
        if(top < GAME_HEIGHT - 20){
          rock.style.top = `${top + 5}px`
          window.requestAnimationFrame(moveRock)
        }else{
       rock.remove();
      }
    }else{
      return endGame();
    }
  }
   window.requestAnimationFrame(moveRock)
  // We should kick of the animation of the rock around here

  // Add the rock to ROCKS so that we can remove all rocks
  // when there's a collision
  ROCKS.push(rock)

  // Finally, return the rock element you've created
  return rock
  
}
///let rocks = document.querySelectorAll('.rock')
  // for(let i = 0 ;i<rocks.length;i++){
  //   rock[i].remove();
  // }
/**
 * End the game by clearing `gameInterval`,
 * removing all ROCKS from the DOM,
 * and removing the `moveDodger` event listener.
 * Finally, alert "YOU LOSE!" to the player.
 */
function endGame() {
  clearInterval(gameInterval)
  ROCKS.forEach(function(rock){
    rock.remove();
  })
document.removeEventListener('keydown',moveDodger)

}

function moveDodger(e) {
  const code = e.which

  if ([LEFT_ARROW, RIGHT_ARROW].indexOf(code) > -1) {
    e.preventDefault()
    e.stopPropagation()
  }

  if (code === LEFT_ARROW) {
    moveDodgerLeft()
  } else if (code === RIGHT_ARROW) {
    moveDodgerRight()
  }
}

function moveDodgerLeft() {
 window.requestAnimationFrame(function(){
  const left = positionToInteger(DODGER.style.left)
  if(left > 0){
    DODGER.style.left = `${left - 4}px`
  }
})
}

 function moveDodgerRight() {
  window.requestAnimationFrame(function(){
  const left = positionToInteger(DODGER.style.left)
  if(left < 360){
    DODGER.style.left = `${left + 4}px`
  }
})
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
