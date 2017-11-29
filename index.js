// const DODGER = document.getElementById('dodger')
// const GAME = document.getElementById('game')
// const GAME_HEIGHT = 400
// const GAME_WIDTH = 400
// const LEFT_ARROW = 37 // use e.which!
// const RIGHT_ARROW = 39 // use e.which!
// const ROCKS = []
// const START = document.getElementById('start')
//
// var gameInterval = null
//
// function checkCollision(rock) {
//   const top = positionToInteger(rock.style.top)
//   // rocks and DODGER are 20px high
//   // GAME_HEIGHT - 20 - 20 = 360px;
//   if (top > 360) {
//     const dodgerLeftEdge = positionToInteger(DODGER.style.left)
//     // DODGER is 40 px wide -- get the right edge?
//     const dodgerRightEdge = 40;
//     const rockLeftEdge = positionToInteger(rock.style.left)
//     // rock is 20 px wide -- get the right edge?
//     const rockRightEdge = 20;
//     if (rockLeftEdge < dodgerLeftEdge && dodgerLeftEdge < rockRightEdge ||
//         rockLeftEdge > dodgerLeftEdge && rockRightEdge < dodgerRightEdge ||
//         rockLeftEdge < dodgerRightEdge && dodgerRightEdge < rockRightEdge) {
//       return true
//     }
//   }
// }
//
// function createRock(x) {
//   const rock = document.createElement('div')
//   rock.className = 'rock'
//   rock.style.left = `${x}px`
//   var top = 0   //
//   rock.style.top = top
//   GAME.append(rock)
// }
//
// function moveRock(el) {
//
//    function step() {
//      el.style.top = `${top += 2}px`
//      if (top < 200) {
//        window.requestAnimationFrame(step)
//      }
//    }
//
//    window.requestAnimationFrame(step)
//
//    if (checkCollision) {
//       endGame();
//    } elseif (rock.top != 0) {
//       window.requestAnimationFrame(step)
//    } elseif (rock.top == 0) {
//       remove rock
//    }
//   // animation of the rock
// requestAnimationFrame(step);
//   // remove all rocks when collision
//   ROCKS.push(rock)
//   //
//   return rock
// }
//
// function endGame() {
//   clear(gameInterval);
//   delete ROCKS;
//   delete moveDodger;
//   alert("YOU LOSE!");
// }
//
// function moveDodger(e) {
//    if (e.which == 37) {
//     moveDodgerLeft();
//    }
//    if (e.which == 39) {
//     moveDodgerRight();
//    }
// }
//
// function moveDodgerLeft() {
//   function move(el) {
//      var left = 400;
//      function step() {
//        el.style.left = '$(left -= 4)px';
//        if (left > 200) {
//          window.requestAnimationFrame(step);
//        }
//      }
//      window.requestAnimationFrame(step);
//    }
// }
//
// function moveDodgerRight() {
//     function move(el) {
//        var left = 0;
//        function step() {
//          el.style.left = '$(left += 4)px';
//          if (left < 180) {
//            window.requestAnimationFrame(step);
//          }
//        }
//        window.requestAnimationFrame(step);
//      }
// }
// /**
//  * @param {string} p  position property
//  * @returns {number}  position as an integer (w/o 'px')
//  */
// function positionToInteger(p) {
//   return parseInt(p.split('px')[0]) || 0
// }
//
// function start() {
//   window.addEventListener('keydown', moveDodger)
//   START.style.display = 'none'
//
//   gameInterval = setInterval(function() {
//     createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
//   }, 1000)
// }
