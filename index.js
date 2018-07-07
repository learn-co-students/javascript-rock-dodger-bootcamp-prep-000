const DODGER = document.getElementById('dodger')
const GAME = document.getElementById('game')
const GAME_HEIGHT = 400
const GAME_WIDTH = 400
const LEFT_ARROW = 37 // use e.which!
const RIGHT_ARROW = 39 // use e.which!
const ROCKS = []
const START = document.getElementById('start')

var gameInterval = null

function testWorking() {
  console.log('working')
}

function checkCollision(rock) {
  const top = positionToInteger(rock.style.top)

  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)
    const dodgerRightEdge = positionToInteger(DODGER.style.left) + 40;
    const rockLeftEdge = positionToInteger(rock.style.left)
    const rockRightEdge = positionToInteger(rock.style.left) + 20;
    
    if (rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) {
      return true
    } 
    else if (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) {
      return true
    } 
    else if (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge) {
      return true
    }
    return false
  }
}

function createRock(x) {
  const rock = document.createElement('div')
  rock.className = 'rock'
  rock.style.left = `${x}px`

  // Hmmm, why would we have used `var` here?
  var top = 0
  rock.style.top = `${top}px`
  
  document.getElementById('game').appendChild(rock)
  
  function moveRock() {
    var topValue = rock.style.top.replace('px','')
    var topValueInteger = parseInt(topValue, 10)
    rock.style.top = `${topValueInteger + 2}px`
    
    if (checkCollision(rock)) {
      endGame()
    }

    if (topValueInteger < 380) {
      window.requestAnimationFrame(moveRock)
    } else {
        rock.remove()
    }
  }
  window.requestAnimationFrame(moveRock)

  ROCKS.push(rock)

  return rock
}

function endGame() {
  clearInterval(gameInterval)
   
  ROCKS.forEach(function(rock) {
    rock.remove()
  })
  
  window.removeEventListener('keydown', moveDodger)
    
  alert('You Lose!')
}

function moveDodger(e) {
  if (e.which === LEFT_ARROW) {
    e.preventDefault()
    moveDodgerLeft()
    e.stopPropagation()
  } else if (e.which === RIGHT_ARROW) {
    e.preventDefault()
    moveDodgerRight()
    e.stopPropagation()
  }
}

function moveDodgerLeft() {
  var leftValue = DODGER.style.left.replace('px', '')
  var leftValueInteger = parseInt(leftValue, 10)
  
  function moveLeft() {
    if (leftValueInteger > 0) {
      DODGER.style.left = `${leftValueInteger - 4}px`
    }
  }
  window.requestAnimationFrame(moveLeft)
}

function moveDodgerRight() {
  var leftValue = DODGER.style.left.replace('px', '')
  var leftValueInteger = parseInt(leftValue, 10)
  
  function moveRight() {
    if (leftValueInteger < 360) {
      DODGER.style.left = `${leftValueInteger + 4}px`
    }
  }
  window.requestAnimationFrame(moveRight)
}

function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0
}

function start() {
  window.addEventListener('keydown', moveDodger)

  START.style.display = 'none'

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 5000)
}
