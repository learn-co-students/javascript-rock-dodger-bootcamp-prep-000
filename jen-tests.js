/*
Simpler code needed to get stuff working before building up to the complex crap.
*/

/* 
add to the start function, so i have a visual that start() has actually started. 

DODGER.style.backgroundColor = 'yellow';
*/

/*
The console.logs below are for double checking the collision checking.

    if (((rockLeftEdge <= dodgerRightEdge) && (rockRightEdge >= dodgerRightEdge)) || 
      ((rockLeftEdge <= dodgerLeftEdge) && (rockRightEdge >= dodgerLeftEdge))) {
        console.log(`DL: ${dodgerLeftEdge}`);
        console.log(`DR: ${dodgerRightEdge}`);
        console.log(`RL: ${rockLeftEdge}`);
        console.log(`RR: ${rockRightEdge}`);
       return true;
    } else {
      return false;
    } // end else
*/

/* 
this works to move the rocks, without checking for collisions

function moveRock() {
    function step() {
      rock.style.top = `${top += 2}px`;
      if (top < GAME_HEIGHT) {
        window.requestAnimationFrame(step);
      }
    }
    window.requestAnimationFrame(step);
*/

/*
create and drop a rock.

const jen = document.createElement('div');
jen.className = 'rock';
jen.style.left = `${x}px`;
//jen.style.left = '4px';
jen.style.top = '2px';
GAME.appendChild(jen);

function move(jen) {
  var top = 0;
 
  function step() {
    jen.style.top = `${top += 2}px`;
 
    if (top < 400) {
      window.requestAnimationFrame(step);
    }
  }
  window.requestAnimationFrame(step);
} // end move(jen)

move(jen);
ROCKS.push(jen);
return jen;
*/

