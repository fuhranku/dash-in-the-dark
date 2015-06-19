# Dash in the Dark
A two player HTML5 and Javascript game involving racing, mazes, and a fight to the death. Play the game at fuhranku.github.io/dash-in-the-dark

##Details
The game uses three overlapping canvases during gameplay
* The first canvas is where the maze is drawn on. It does not change after intially being drawn at the start of each game, and thus does not need to update.
* The second canvas has a transparent background and only consists of the players and their projectiles.
* The third canvas puts everything in the dark and controls the spotlight following each of the players.

The mazes are randomly generated each time the game is played using Prim's algorithm.

##Futher plans
The game is currently for two players on the same computer sharing a keyboard. I intend on expanding it to be played with friends over the internet.
