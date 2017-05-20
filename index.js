/**
 * JS Rock Dodger
 */
const DODGER = document.getElementById('dodger')
const GAME = document.getElementById('game')
const GAME_HEIGHT = 400
const GAME_WIDTH = 400
const LEFT_ARROW = 37
const RIGHT_ARROW = 39
const ROCKS = []
const START = document.getElementById('start')

var gameInterval = null

function checkCollision(rock) {
  const top = positionToInteger(rock.style.top)

  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)

    const dodgerRightEdge = dodgerLeftEdge + 40;

    const rockLeftEdge = positionToInteger(rock.style.left)

    const rockRightEdge = rockLeftEdge + 20;

    return (rockLeftEdge<=dodgerLeftEdge && rockRightEdge>=dodgerLeftEdge)|| (rockLeftEdge>=dodgerLeftEdge && rockRightEdge<=dodgerRightEdge) || (rockLeftEdge<=dodgerRightEdge && rockRightEdge>=dodgerRightEdge)
  }
}

function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`

  var top = 0

  rock.style.top = top

  GAME.appendChild(rock)

  function moveRock() {
    var top = positionToInteger(rock.style.top)

    if (checkCollision(rock)) {
      DODGER.style.backgroundColor = '#C80032';
      endGame()
    }
    else if (top < 400) {
      rock.style.top = `${top += 2}px`
      window.requestAnimationFrame(moveRock)
    }
    else {
      rock.remove()
    }
  }

  window.requestAnimationFrame(moveRock)

  ROCKS.push(rock)

  return rock
}

function endGame() {
  clearInterval(gameInterval)

  for (var i = 0; i < ROCKS.length; i++) {
    ROCKS[i].remove()
  }

  document.removeEventListener('keydown', moveDodger)

  alert('YOU LOSE!')
}

function moveDodger(e) {
  if (e.which === LEFT_ARROW){
    e.preventDefault()
    e.stopPropagation()
    moveDodgerLeft()
  }

  if (e.which === RIGHT_ARROW) {
    e.preventDefault()
    e.stopPropagation()
    moveDodgerRight()
  }
}

function moveDodgerLeft() {
  var left = positionToInteger(DODGER.style.left)

  function step() {
    if(left > 4) {
      DODGER.style.left = `${left -= 4}px`
      window.requestAnimationFrame(step)
    }
  }
  window.requestAnimationFrame(step)
}

function moveDodgerRight() {
  var right = positionToInteger(DODGER.style.left)

  function step() {
    if(right < 360) {
      DODGER.style.left = `${right += 4}px`
      window.requestAnimationFrame(step)
    }
  }
  window.requestAnimationFrame(step)
}

function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0
}

function start() {
  window.addEventListener('keydown', moveDodger)

  START.style.display = 'none'
  DODGER.style.backgroundColor = '#4EC0FF'

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000)
}
