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
    // DODGER is 20px high
    // GAME_HEIGHT - 20 - 20 = 360px;

    const dodgerLeftEdge = positionToInteger(DODGER.style.left)
    // FIXME: The DODGER is 40 pixels wide -- how do we get the right edge?
    const dodgerRightEdge = dodgerLeftEdge + 40;
    const rockLeftEdge = positionToInteger(rock.style.left)
    // FIXME: The rock is 20 pixel's wide -- how do we get the right edge?
    const rockRightEdge = rockLeftEdge + 20;

    /**
     * Think about it -- what's happening here?
     * There's been a collision if one of three things is true:
     * 1. The rock's left edge is < the DODGER's left edge,
     *    and the rock's right edge is > the DODGER's left edge;
     * 2. The rock's left edge is > the DODGER's left edge,
     *    and the rock's right edge is < the DODGER's right edge;
     * 3. The rock's left edge is < the DODGER's right edge,
     *    and the rock's right edge is > the DODGER's right edge
     */
    if(top>360){
        if (
            (rockLeftEdge < dodgerLeftEdge && rockRightEdge > dodgerLeftEdge)||
            (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge)||
            (rockLeftEdge < dodgerRightEdge && rockRightEdge > dodgerRightEdge) ){
            return true
        } //end if
        else{
            return false
        } //end else
    } //end if
} // end function checkCollision


function createRock(x) {
    const rock = document.createElement('div')
    rock.className = 'rock'
    rock.style.left = `${x}px`;

    GAME.appendChild(rock)

    var top = 0     // Hmmm, why would we have used `var` here?
    rock.style.top = top
    //  Now that we have a rock, we'll need to append
    //  * it to GAME and move it downwards.


    function moveRock() {

        rock.style.top = `${top += 2}px`

        if (checkCollision(rock)) {
            endGame()
        }//end if

        if (top < GAME_HEIGHT) {
            window.requestAnimationFrame(moveRock)
        } else {
            rock.remove()
        }//end else
    } //end function moveRocl()

    window.requestAnimationFrame(moveRock)

    ROCKS.push(rock)

    return rock
}// end function createRock



/**
 * End the game by clearing `gameInterval`,
 * removing all ROCKS from the DOM,
 * and removing the `moveDodger` event listener.
 * Finally, alert "YOU LOSE!" to the player.
 */
function endGame() {
    window.clearInterval(gameInterval)
    var rock = document.getElementsByClassName('rock')
    for(var i=0; i<rock.length; i++){
        rock[i].remove()

    }
    window.removeEventListener('keydown', moveDodger)
    alert("YOU LOSE!")


} //end function endGame

function moveDodger(e) {

    if(e.which === 37){
        e.preventDefault()
        e.stopPropagation()
        moveDodgerLeft()

    }

    if(e.which === 39){
        e.preventDefault()
        moveDodgerRight()
    }


}  //end function moveDodger

function moveDodgerLeft() {
    var left = positionToInteger((DODGER.style.left))
    if(left > 0 && left <= 360) {

        DODGER.style.left = `${left - 4}px`
        window.requestAnimationFrame(moveDodgerLeft)

    } //end if


} //end function moveDodgerLeft


function moveDodgerRight() {
    var left = positionToInteger((DODGER.style.left))
    if(left < 360 && left >= 0 ){
        DODGER.style.left =`${left + 4}px`
        window.requestAnimationFrame(moveDodgerRight)
    }

} //end function moveDodgerRight

/**
 * @param {string} p The position property
 * @returns {number} The position as an integer (without 'px')
 */
function positionToInteger(p) {
    return parseInt(p.split('px')[0]) || 0
}  //end function positionToInteger

function start() {
    window.addEventListener('keydown', moveDodger)

    START.style.display = 'none'

    gameInterval = setInterval(function() {
        createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
    }, 1000)
} //end function start
