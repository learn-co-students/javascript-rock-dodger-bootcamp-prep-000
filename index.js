const DODGER = document.getElementById('dodger');
const GAME = document.getElementById('game');
const GAME_HEIGHT = 400;
const GAME_WIDTH = 400;
const LEFT_ARROW = 37; // use e.which!
const RIGHT_ARROW = 39; // use e.which!
const ROCKS = [];
const START = document.getElementById('start');
var gameInterval = null;
var gamestate = 0;

/**----------------------------------------------------------*/

function checkCollision(rock) {
  console.log('f>checkCollision');
  /**
   * TODO
   * Roll up empty rocks after game end
   * ^^^BUT^^^ unit test on rock with bad gamestate should still execute!!!!!!!!!!!
  console.log('f>checkCollision')
  //if(gamestate===0){rock.remove(); return true;} //?????????????????? 
  */
  
  const top = positionToInteger(rock.style.top);
  
  /**
   * rocks are 20px high
   * DODGER is 20px high (& 40px wide)
   * GAME_HEIGHT - 20 - 20 = 360px;
   */
  
  if (top > 360) {
    
    const dodgerLeftEdge = positionToInteger(DODGER.style.left);
    const dodgerRightEdge = dodgerLeftEdge+40;
    const rockLeftEdge = positionToInteger(rock.style.left)
    const rockRightEdge = rockLeftEdge+20;
    
    if(
      (rockLeftEdge>=(dodgerLeftEdge-20)&&rockLeftEdge<=(dodgerLeftEdge+40))
      ){
        return true; 
      }else{
        return false;
      }
    
}}//endfunc checkCollision

function createRock(x) {
  
  console.log('f>createRock');
  const rock = document.createElement('div');
  rock.className = 'rock';
  rock.style.left = `${x}px`;
  var top = 0;
  rock.style.top = top+'px';
  rock.style.top.val= top;
  //console.log('rock.style.top='+rock.style.top);
  //console.log('rock.style.top.val='+rock.style.top.val);
  
  GAME.appendChild(rock);


  function moveRock(rock) {
    console.log('f>moveRock');

    function step(){
          top+=2;
          rock.style.top = top+'px';
          //window.requestAnimationFrame(step);

    
     /**
     * If a rock collides with the DODGER,
     * we should call endGame()
     * Otherwise, if the rock hasn't reached the bottom of
     * the GAME, we want to move it again.
     * But if the rock *has* reached the bottom of the GAME,
     * we should remove the rock from the DOM
     */
    
    if(checkCollision(rock)){
      endGame('case1');
    }else{
        if(top>=380){
          console.log('rockremoved')
          rock.remove();
        }else{
          window.requestAnimationFrame(step);
        }
        
    }
    }//endstep
    window.requestAnimationFrame(step);
    
  }//endfunc moverock
  moveRock(rock);
  
  ROCKS.push(rock);
  return rock;
  
}//endfunc createrock

function moveDodger(e) {

  console.log('f>moveDodger');
  //console.log(e+'->'+e.key+'->'+e.which);
  //var pos = parseInt(DODGER.style.left.substring(0,DODGER.style.left.length-2));
	switch(e.which){
	  //case 'LEFT_ARROW':
		//case 'ArrowLeft':
		case 37:
		  e.preventDefault();
      e.stopPropagation();
			moveDodgerLeft();
			break;
		//case 'RIGHT_ARROW':
		//case 'ArrowRight':
		case 39:
		  e.preventDefault();
      e.stopPropagation();
			moveDodgerRight();
			break;  
	}//endswitch
   
}//endfunc movedodger

function moveDodgerLeft() {
  console.log('f>moveDodgerLeft');
  
  function step(){
    DODGER.style.left = 
     (positionToInteger(DODGER.style.left)-1)+'px';
  }
  if(positionToInteger(DODGER.style.left)>0){
    console.log('debugg1');
    window.requestAnimationFrame(step);
  }
   
}//end moveleft

function moveDodgerRight() {
  console.log('f>moveDodgerRight');
  
    function step(){
    DODGER.style.left = 
     (positionToInteger(DODGER.style.left)+1)+'px';
  }
  if(positionToInteger(DODGER.style.left)<(400-40)){
    window.requestAnimationFrame(step);
  }
   
}//end moveright

/**
function move(pos, x){
  console.log('f>move');
	DODGER.style.left = (pos-(x*3))+'px';
}//end move
*/

function positionToInteger(p) {
  
  return parseInt(p.split('px')[0]) || 0;
  
}//end positionToInteger

function start() {
  
  console.log('----------f>START------------');
  gamestate=1;
  window.addEventListener('keydown', moveDodger);
  START.style.display = 'none';
  gameInterval = setInterval(
    function(){createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))}
    , 1000);
    
}//end start


function endGame(x) {
  console.log('--------------f>ENDGAME: '+x+'-----------');
  gamestate=0;
  //ROCKS.forEach(function(element){element.remove()});
  clearInterval(gameInterval);
  document.querySelectorAll('.rock').forEach(function(x){x.remove()});
  window.removeEventListener('keydown', moveDodger);
  if(x!='silent'){alert('YOU LOSE!');}
  START.style.display = 'block';
  DODGER.style.left = 180+'px';
  /**
 * End the game by clearing `gameInterval`,
 * removing all ROCKS from the DOM,
 * and removing the `moveDodger` event listener.
 * Finally, alert "YOU LOSE!" to the player.
 */
}//end endGame

//document.getElementById('startbutton').addEventListener('click',endGame('silent'));