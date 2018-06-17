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
    if ((rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) ||
    (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) ||
    (rockLeftEdge <= dodgerRighttEdge && rockRightEdge >= dodgerRightEdge)) {
      return true
    }
  }
}

function createRock(x) {
  const rock = document.createElement('div')
  rock.className = 'rock'
  rock.style.left = `${x}px`
  var top = 0
  rock.style.top = top
  function moveRock() {
    if (checkCollision(rock)) {
      endGame()
    } else if(top < 360) {
      top += 2
    } else {
      div.remove(rock)
    }
  } ROCKS.push(rock)
  return rock
}

function endGame() {
  clearInterval(gameInterval)
  document.remove(ROCKS)
  window.removeEventListener('keydown', moveDodger)
  alert("YOU LOSE!")
 }

function moveDodger(e) {
  document.addEventListener('keydown', function(e) {
    if (e.which === 39) {
      moveDodgerRight()
    } if (e.which === 37) {
      moveDodgerLeft()
    }
  })
}

function moveDodgerLeft() {
  var leftNumbers = DODGER.style.left.replace('px','')
  var left = parseInt(leftNumbers, 10)
  function l() {
    DODGER.style.left = `${left - 4}px`
    if (left > 0) {
      window.requestAnimationFrame(l)
    }} window.requestAnimationFrame(l)
}

function moveDodgerRight() {
  var right = 0
  function r() {
  DODGER.style.right = `${right += 4}px`
  if (right < 360) {
    window.requestAnimationFrame(r)
  }} window.requestAnimationFrame(r)
}

function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0
}

function start() {
  window.addEventListener('keydown', moveDodger)
  START.style.display = 'none'
  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))}, 1000)
}
