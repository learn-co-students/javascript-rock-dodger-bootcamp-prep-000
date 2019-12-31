
const DODGER = document.getElementById('dodger')
const GAME = document.getElementById('game')
const GAME_HEIGHT = 400
const GAME_WIDTH = 400
const LEFT_ARROW = 37 // use e.which!
const RIGHT_ARROW = 39 // use e.which!
const ROCKS = []
const START = document.getElementById('start')

var gameInterval = null



function checkCollision(rock) {
  const top = positionToInteger(rock.style.top)
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)
    const dodgerRightEdge = dodgerLeftEdge+40;
    const rockLeftEdge = positionToInteger(rock.style.left)
    const rockRightEdge = rockLeftEdge+20;
    
    return  ((rockLeftEdge<=dodgerLeftEdge)  && (rockRightEdge>=dodgerLeftEdge))   ||
        ((rockLeftEdge>=dodgerLeftEdge) && (rockRightEdge<=dodgerRightEdge)) ||
        ((rockLeftEdge<=dodgerRightEdge) && (rockRightEdge>=dodgerRightEdge)) 
    }}

function createRock(x) {
  const rock = document.createElement('div')
  rock.className = 'rock'
  rock.style.left = `${x}px`
  var top = 0
  rock.style.top = top
  GAME.appendChild(rock)

  function moveRock() {
    
     rock.style.top = `${top += 2}px`
     if (checkCollision(rock)) { return endGame() }
     
     if (top < 400) {
        window.requestAnimationFrame(moveRock)
      }else { 
        rock.remove()
      }}

   window.requestAnimationFrame(moveRock);
   ROCKS.push(rock)

  return rock
}

function endGame() {
  clearInterval(gameInterval);
  ROCKS.forEach(rock => rock.remove())
  document.removeEventListener('keydown',moveDodger)
  alert("YOU LOSE!")
}

function moveDodger(e) 
{

  if (e.which === LEFT_ARROW) {
    moveDodgerLeft();
    e.stopPropagation();
    e.preventDefault(); 
  } else if (e.which === RIGHT_ARROW) {
   moveDodgerRight();
   e.stopPropagation();
   e.preventDefault(); 
  }}

   e.stopPropagation();
  document.addEventListener('keydown', function(e) {
  if (e.which === 37) {
    moveDodgerLeft();
  }else if (e.which === 39) {
   moveDodgerRight();
  }
});


function moveDodgerLeft() {
   var dodgerLeftEdge = positionToInteger(DODGER.style.left)
    if (dodgerLeftEdge > 0) {
      DODGER.style.left = `${dodgerLeftEdge - 4}px`
      window.requestAnimationFrame(moveDodgerLeft)
    }}

function moveDodgerRight() {
    var dodgerLeftEdge = positionToInteger(DODGER.style.left)
    var dodgerRightEdge = dodgerLeftEdge+4;
    if (dodgerRightEdge < 360) {
      DODGER.style.left = `${dodgerRightEdge + 4}px`
      window.requestAnimationFrame(moveDodgerRight)
    }}


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
