`learn test` doesn't accurately test checkCollision(rock) for the case of the rock centered over the dodger.


To improve your test, I suggest changing your "180px" test case in the checkCollision(rock) function.

If the student's program fails to check for case 2 in the instructions ((rockLeftEdge >= dodgerLeftEdge) && (rockRightEdge <= dodgerRightEdge)), dropping a rock with a left edge of between 181 and 199, inclusive, will pass the tests and the rock will pass right through the dodger in the game. 

To reproduce:
1. Remove  `|| ((rockLeftEdge >= dodgerLeftEdge) && (rockRightEdge <= dodgerRightEdge))` from your checkCollision(rock) function.
2. Run the test and play the game.
Result: The tests will pass and the rock will pass right through the dodger in the game.

I realized this because I originally misread the instructions and thought the rock had a width of 40, the same as the dodger. So case 2 in the instructions was redundant and I left it out. The game worked and I passed all the tests. 

Before submitting, I went back through the original instructions - which I had been deleting as I implemented pieces - and realized that the rock was only supposed to be 20 wide. I changed that and observed the behavior above (I still passed the tests and the game doesn't stop). 

If you change your "180px" check to something between 181-199, you'll catch the cases where the rock is wholly over the dodger with neither edge outside of the dodger's edges.