const DODGER = document.getElementById('dodger'),
      GAME = document.getElementById('game'),
      GAME_HEIGHT = 400,
      GAME_WIDTH = 400,
      LEFT_ARROW = 37,
      RIGHT_ARROW = 39,
      ROCKS = [],
      START = document.getElementById('start');

var gameInterval = null;

var checkCollision = function(rock) {
    const top = positionToInteger(rock.style.top);

    if (top > 360) {
        const dodgerLeftEdge = positionToInteger(DODGER.style.left),
              dodgerRightEdge = dodgerLeftEdge + 40,
              rockLeftEdge = positionToInteger(rock.style.left),
              rockRightEdge = rockLeftEdge + 20;

        return (
            (rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) ||
            (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) ||
            (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge)
        );
    }
}

var createRock = function(x) {
    const rock = document.createElement('div');

    rock.className = 'rock';
    rock.style.left = `${x}px`;

    var top = 0;

    top = rock.style.top;

    GAME.appendChild(rock);

    var moveRock = function() {
        rock.style.top = `${top += 2}px`;

        if (checkCollision(rock)) {
            return endGame();
        }

        if (top < GAME_HEIGHT) {
            window.requestAnimationFrame(moveRock);
        } else {
            rock.remove();
        }
    };

    window.requestAnimationFrame(moveRock);

    ROCKS.push(rock);

    return rock;
};

var endGame = function() {
    clearInterval(gameInterval);

    ROCKS.forEach(function(rock) {
        rock.remove();
    });

    document.removeEventListener('keydown', moveDodger);

    return alert("YOU LOSE!");
};

var moveDodger = function(e) {
    const code = e.which;

    if ([LEFT_ARROW, RIGHT_ARROW].indexOf(code) > -1) {
        e.preventDefault();
        e.stopPropagation();
    }

    if (code === LEFT_ARROW) {
        moveDodgerLeft();
    } else if (code === RIGHT_ARROW) {
        moveDodgerRight();
    }
};

var moveDodgerLeft = function() {
    window.requestAnimationFrame(function() {
        const left = positionToInteger(DODGER.style.left);

        if (left > 0) {
            DODGER.style.left = `${left - 4}px`;
        }
    });
};

var moveDodgerRight = function() {
    window.requestAnimationFrame(function() {
        const left = positionToInteger(DODGER.style.left);

        if (left < 360) {
            DODGER.style.left = `${left + 4}px`;
        }
    });
};

var positionToInteger = function(p) {
    return parseInt(p.split('px')[0]) || 0;
};

var start = function() {
    window.addEventListener('keydown', moveDodger);

    START.style.display = 'none';

    gameInterval = setInterval(function() {
        createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)));
    }, 1000);
};
