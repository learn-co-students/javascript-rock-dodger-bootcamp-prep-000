 const DODGER = document.getElementById('dodger');
 const GAME = document.getElementById('game');
 const GAME_HEIGHT = 400;
 const GAME_WIDTH = 400;
 const LEFT_ARROW = 37;
 const RIGHT_ARROW = 39;
 const ROCKS = [];
 const START = document.getElementById('start');

 var gameInterval = null
 var gameInterval = null;


    if (top > 360) {
      const dodgerLeftEdge = positionToInteger(DODGER.style.left)
    const dodgerRightEdge = dodgerLeftEdge + 40;
     const rockLeftEdge = positionToInteger(rock.style.left)
     const rockRightEdge = rockLeftEdge + 20;


     const dodgerRightEdge = 0;
     return (
          (rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) ||
          (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) ||
          (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge)
        );

     const rockLeftEdge = positionToInteger(rock.style.left)
   }
 }

     ) {
       return true
     }
   }
 }

  function createRock(x) {
   const rock = document.createElement('div')
   const rock = document.createElement('div');

   rock.className = 'rock'
   rock.style.left = `${x}px`
   rock.className = 'rock';
   rock.style.left = `${x}px`;


   var top = 0
   var top = rock.style.top = 0;

   rock.style.top = top



    GAME.appendChild(rock);


    function moveRock() {

      rock.style.top = `${top += 2}px`;

     if (checkCollision(rock)) {
       endGame();
     }

      if (rock < GAME_HEIGHT){

        window.requestAnimationFrame(moveRock);
      }
      else {
        rock.remove();
      }
    }


   window.requestAnimationFrame(moveRock);
    ROCKS.push(rock)


    return rock
  }

 @@ -108,8 +98,18 @@ function createRock(x) {

  function endGame() {
   clearInterval(gameInterval)

     ROCKS.forEach(function(rock) { rock.remove() })

     document.removeEventListener('keydown', moveDodger)

    START.innerHTML = 'Play again?'
     START.style.display = 'inline'
   return alert("You Lose!");
  }


  function moveDodger(e) {

    const Code = e.which;
    if ([LEFT_ARROW, RIGHT_ARROW].indexOf(Code) > -1)  {
    e.preventDefault();
    e.stopPropagation();}


    if (Code===LEFT_ARROW) moveDodgerLeft();
    else if (Code==RIGHT_ARROW) moveDodgerRight();
  }

  function moveDodgerLeft() {
 @@ -127,14 +135,23 @@ function moveDodgerLeft() {

    window.requestAnimationFrame(function() {
    const left = positionToInteger(DODGER.style.left)

    if (left > 0) {
      DODGER.style.left = `${left - 4}px`;
    }
  })
  }

  function moveDodgerRight() {

   window.requestAnimationFrame(function() {
     const left = positionToInteger(DODGER.style.left)

     if (left < 360) {
       DODGER.style.left = `${left + 4}px`;
     }
   })
  }
