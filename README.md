# reach-project

_A mobile app for the classic hangman game._
Built with Javascript and React Native. 

## React Native Build instructions:

If you do not have [npm](https://www.npmjs.com/get-npm) installed, follow the guide [here](https://www.npmjs.com/get-npm)

Install React Native CLI
```
> npm install -g react-native-cli
```

### Run instructions
Clone repo
```
>git clone https://github.com/liuleen/reach-project.git
>cd reach-project
>cd hangman
```
Install necessary packages
```
>npm i
```
Run the ios simulator
```
>react-native run-ios
```
A terminal should open up and a simulator should also open up at this point loading the app. Have fun playing! :) 

### How to play

This game is a classic. As the user, it is your job to guess the "secret word" that is randomly generated depending on the difficulty you chose one letter at a time. You only get 6 lives and 1 hint per word. Warning though, these words are really difficult, even I couldn't solve them while I was building it! 

Here's a step by step on what to expect:
1. The first screen the user will see is the welcome screen with a big play button.
2. After the user clicks "PLAY", she/he will be prompted to enter a username and to select a level
3. There are three levels and a challenge level that a user can choose from. The regular game mode levels rangom from easy to hard. The extra game mode, the challenge level, is essentially a mini speed round of hangman. (I'll go into more detail later)
4. Once the user chooses the level and username, she/he will enter the game page. The goal of the game is guess 1 letter at a time to fill in the secret word randomly generated from an API. Instead of the animation being a classic hangman, it is a corgi who is "flying" (aka being floated up by 6 balloons) and each wrong guess will result in a balloon floating away. If you make 6 incorrect guesses, the corgi falls to his doom. SO DON'T KILL THE CORGI! 
5. If the letter key is incorrect, it'll turn red and it's correct, it'll turn green. 
6. If the user does finish the word, the remaining lives from that session will be added to his/her score and a new word will render. (It's a play until you lose or give up type of game)
7. If the user loses all their lives, he/she will have the option to play again.
8. The challenge level, to me, is the most fun level (especially if you like fast paced games that seems easy but is actually very hard unless your some english language wizar).
9. In the challenge level, the user only has 60 seconds to get as many points as he/she can. To win points, you have to guess the remaining letter that is missing in the word shown above. Essentially, the whole secret word will be shown except for one letter missing, and it is the users job to find that letter as fast as he/she can. The catch is, however, that the user only get's 1 life per word. GOODLUCK!! 

### Added Features

I implements features that I thought was necessary in order to make the user experience more fun and easy. 

Here is a list of features I added: 
- Support for guessing full words instead of just letters one at a time. Wrong guesses will count towards the users lives.
- A diagram animation to represent the users wrong guesses. The balloons represent his/her number of lives. The corgi being floated represents the "hangman".
- Color for the keyboard to represent correct guesses in green and incorrect guesses in red. 
- A configurable difficulty level adjust the secret words based on the difficulty chosen by the user
- A hint button that parses through the secret word string to find a letter that has not been guessed yet, and gives it to the User as a hint. 
- A give up button, in case the User wants to stop playing
- A score that adds up all the lives the User was able to accumulate over the course of one game session. 

- The last feature that I like the most and spent the most time on is the extra Challenge level feature. I basically got the chance to re-create a classic hangman game in my own way. I had to implement a timer feature and an algorithm to take out a random letter from the secret word and display all the letters except for all the occurrences of the chosen hidden letter. I wanted to create a version of the game that was fast paced, where a User can go into it thinking the game is a piece of cake but realizing very fast that it is actually very challenging and fun. It's one of those, I can't believe I can't guess one letter right..this is so easy games. It'll definitely make a User crave more rounds. 

### If I had more time..

- I would implement a cool leaderboard
- Two users? versus mode
- Add a database, to store user progress, words guessed already, highscores per level. 
- Sound! I have no idea how to do that. But I'm sure google would be helpful with this. 
- More animations in the front end. 
- better background

# What I learned/What I want to learn

- 
# Challenges I faced

