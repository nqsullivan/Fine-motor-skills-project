Joshua Budd, Abdur Naveed, Ryan Keyser, Nathaniel Sullivan

# Fine Motor Skills Project

This project was started to aid adults who are recovering from strokes in regaining their fine motor skills. This was acomplished through the creation of an app in p5.js in which a user can play some simple games that facilitate growth of fine motor skills. We used object oriented JavaScript and designed a state engine to create a asthetic and effective user interface

## Table of Contents
1. [Brainstorming](https://github.com/nqsullivan/Fine-motor-skills-project/edit/main/README.md#brainstorming)
2. [Project Charter](https://github.com/nqsullivan/Fine-motor-skills-project/edit/main/README.md#project-charter)
3. [Milestone 1: Excercises](https://github.com/nqsullivan/Fine-motor-skills-project/edit/main/README.md#milestone-1-excercises)
4. [App Code](https://github.com/nqsullivan/Fine-motor-skills-project/edit/main/README.md#application-code)
5. [User Testing](https://github.com/nqsullivan/Fine-motor-skills-project/edit/main/README.md#user-testing)
6. [Progress Reports / Gantt Charts](https://github.com/nqsullivan/Fine-motor-skills-project/edit/main/README.md#progress-reports--gantt-charts)

## Brainstorming
In the [Brainstorming.md](https://github.com/nqsullivan/Fine-motor-skills-project/blob/main/Brianstorming.md) file we brainstorm different ways we could help those rescovering from strokes using our program. To do this we start with a list of 6 possible games we could code. We then rank these games 1-6 in catagories of effectivness in helping motor skills, difficulty, engagement, and uniqueness. By tallying up these rankings and taking in to account a weighting for how much these catagories matter, we are given a score we can use to determine the best way to help stroke victims. Using this score we determined that the best games were shooting practive, line drawing, and a homemade guitar hero game.

## Project Charter
After brainstorming we wrote a [Project Charter](https://github.com/nqsullivan/Fine-motor-skills-project/blob/main/Charter.md) to organize our project's content and deadlines, as well as to layout rules and roles for the members of the team.

## Milestone 1: Excercises
To start our project we layed out in [Milestone 1](https://github.com/nqsullivan/Fine-motor-skills-project/blob/main/Exercises%20Milestone%201.md) what we wanted to see in each of the excersises we were about to design and how they will help the user. For this reason we first explained the most needed daily functionality our users need to practice. We then looked at each of the three excercises and laid out the features included in the games to help these people regain part of their acute motor skills.

## Application Code
For the actual application the code can be broken up into four catagories CSS/HTML, Menu UI, Games, and master application but for this application the CSS/HTML is extreemly basic so we will only go into depth on the Menu UI, Games, and master application

### Master
1. In the [master file](https://github.com/nqsullivan/Fine-motor-skills-project/blob/main/Program/master.js) we first have a setup function which initiates our application canvas as well as running the setup function for all of the games/menus
2. We then have a draw function which is called throughout the life of the application. It is in this function that we have our main state functions
    - State 0: Main Menu
    - State 1: Target Practice Game
    - State 2: Guitar Hero Game
    - State 3: Line Draw Game
    - State 4: High Score Menu
    - State 5: Instruction Menu
3. Finally we have the function that handles the mouse input from the games using the P5.js function mouseRealeased(). Similar to the draw function here we have a switch case method for all of the states.

### Games
Inside the you will find the code specific to each of the individual games

### Target Practice Game

#### Guitar Hero Game
1. In the [Guitar Hero Game Code](https://github.com/nqsullivan/Fine-motor-skills-project/blob/main/Program/Guitar%20Hero%20Game/guitarHero.js) the first section of code is devoted to variable declaration and declaring the modifier constants.
2. The second section of the code is the setup function for the game. In this function the variables for the pause menu are created as well as some pieces of the UI
3. In the draw function there is once again another switch case function for the states of the game. These states include:
    -  **State 0: Normal Operation** -- In this state the balls are being formed and then fall down the screen towards the bottom line. From here the player is able to press the corrispoding button to the falling ball to increase the score. If the player is unable to press the correct button by the time the ball passes the bottom line the player will lose a life
    -  **State 1: Paused** -- This pause screen is labled paused and has three objects bouncing around the screen as well as two buttons, one for pausing and one for exiting. The user can enter the pause state only from state 0 by clicking the pause button or pressing 'P' on their keyboard. In this state there are two buttons presented to the user. A resume button which resumes the game by returning it to state 0 and an exit button which returns the user to the main menu by changing the Master State value to 0.
    -  **State 2: Game Over** -- This game over screen is labeled GAME OVER and also has three objects bouncing around the screen as well as two buttons, one for reseting the game and one for exiting. The exit button does the same as in the pause menu but the reset function calls gutiarHeroReset() to return the game to its inital state.
4. The next section is the class for the falling targets. There are 4 kinds of targets, 'A' 'S' 'D' and 'F'. Targets each have an individual column but a common vector to represent their fall velocity. Finally there is a method within the class to 'kill' the target if it reaches the bottom of the screen.
5. The final piece of this code is the playSynth function. This function is supposed to replicate the sounds that come from similar games by playing notes in the key of C Maj

### Line Draw Game

## User Testing
Inside the [User Testing Results](https://github.com/nqsullivan/Fine-motor-skills-project/blob/main/User%20Testing%20Results.md) file we go over our first round of user testing our app, the results we recived and how we will update our app to aid in the user experience.

## Progress Reports / Gantt Charts
For this project we had [progress reports](https://github.com/nqsullivan/Fine-motor-skills-project/tree/main/Progress%20Reports) due on the first, third, forth, and fith weeks and [Gantt Charts](https://github.com/nqsullivan/Fine-motor-skills-project/blob/main/Gantt%20Charts.pdf) throughout the whole project
