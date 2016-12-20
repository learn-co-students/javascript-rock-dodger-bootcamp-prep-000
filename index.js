const DODGER = document.getElementById( 'dodger' )
const GAME = document.getElementById( 'game' )
const GAME_HEIGHT = 400
const GAME_WIDTH = 400
const LEFT_ARROW = 37
const RIGHT_ARROW = 39
const ROCKS = []
const START = document.getElementById( 'start' )
const ROCKSPEED = 50
var gameInterval = null

function checkCollision( rock ) {
	const top = positionToInteger( rock.style.top )
	if ( top > 360 ) {
		const dodgerLeftEdge = positionToInteger( DODGER.style.left )
		const dodgerRightEdge = dodgerLeftEdge + 40;
		const rockLeftEdge = positionToInteger( rock.style.left )
		const rockRightEdge = rockLeftEdge + 20;
		if ( rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge ) {
			return true
		}
		if ( rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge ) {
			return true
		}
		if ( rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge ) {
			return true
		}
		return false
	}
	return false
}

function createRock( x ) {
	const rock = document.createElement( 'div' )
	rock.className = 'rock'
	rock.style.left = `${x}px`
	var top = 0
	rock.style.top = top
	GAME.appendChild( rock )
	window.requestAnimationFrame( moveRock )

	function moveRock() {
		for ( var i = 0; i < ROCKS.length; i++ ) {
			var tmpRock = ROCKS[ i ]
			var topNumbers = tmpRock.style.top.replace( 'px', '' )
			var top = parseInt( topNumbers, 10 )
			if ( top >= 0 ) {
				tmpRock.style.top = `${top + ROCKSPEED}px`
			}
			if ( checkCollision( tmpRock ) ) {
				endGame()
			}
			if ( top >= ( GAME_HEIGHT )){//- ROCKSPEED ) ) {
				//Remove from DOM
				ROCKS.shift()
				tmpRock.remove()
			}
		}
	}
	ROCKS.push( rock )
	return rock
}

function endGame() {
	gameInterval = null
	window.clearInterval()
	for ( var i = 0; i < ROCKS.length; i++ ) {
		var rock = ROCKS[ i ]
		rock.remove()
	}
	DODGER.remove()
	document.removeEventListener( 'keydown', moveDodger )
	alert( 'You Lost!' )
}

function moveDodger( e ) {
	var key = ( e.which )
	if ( e.which === LEFT_ARROW ) {
		moveDodgerLeft()
		e.stopPropagation()
		e.preventDefault()
	} else if ( e.which === RIGHT_ARROW ) {
		moveDodgerRight()
		e.stopPropagation()
		e.preventDefault()
	}
}

function moveDodgerLeft() {
	window.requestAnimationFrame( () => {
		var leftNumbers = DODGER.style.left.replace( 'px', '' )
		var left = parseInt( leftNumbers, 10 )
		if ( left > 0 ) {
			DODGER.style.left = `${left - 4}px`
		}
	} )
}

function moveDodgerRight() {
	window.requestAnimationFrame( () => {
		var leftNumbers = DODGER.style.left.replace( 'px', '' )
		var left = parseInt( leftNumbers, 10 )
		if ( left <= 360 - 4 ) {
			DODGER.style.left = `${left + 4}px`
		}
	} )
}
/**
 * @param {string} p The position property
 * @returns {number} The position as an integer (without 'px')
 */
function positionToInteger( p ) {
	return parseInt( p.split( 'px' )[ 0 ] ) || 0
}

function start() {
	window.addEventListener( 'keydown', moveDodger )
	START.style.display = 'none'
	gameInterval = setInterval( function() {
		createRock( Math.floor( Math.random() * ( GAME_WIDTH - 20 ) ) )
	}, 1000 )
}
