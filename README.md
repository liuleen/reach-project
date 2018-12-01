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

This game is a classic. As the user, it is your job to guess the "secret word" one letter at a time. The secret word is randomly generated depending on the difficulty you choose. You only get 6 lives and 1 hint per word. Warning though, these words are really difficult, even I couldn't solve them while I was building it! 

Here's a step by step on what to expect:
1. The first screen the user will see is the welcome screen with a big play button.
2. After the user clicks "PLAY", she/he will be prompted to enter a username and to select a level
3. There are three levels and a challenge level that a user can choose from. The regular game mode levels range from easy to hard. The extra game mode, the challenge level, is essentially a mini speed round of hangman. (I'll go into more detail later)
4. Once the user chooses the level and username, she/he will enter the game page. The goal of the game is guess 1 letter at a time to fill in the secret word randomly generated from an API. Instead of the animation being a classic hangman, it is a corgi who is "flying" (aka being floated up by 6 balloons) and each wrong guess will result in a balloon floating away. If you make 6 incorrect guesses, the corgi falls to her/his doom (a bed a cotton candy). SO DON'T KILL THE CORGI! 
5. If the letter pressed is incorrect, it'll turn red and if it's correct, it'll turn green. 
6. If the user does finish the word, the remaining lives from that session will be added to his/her score and a new word will render. (It's a play until you lose or give up type of game)
7. If the user loses all their lives, he/she will have the option to play again.
8. The challenge level, to me, is the most fun level (especially if you like fast paced games that seems easy but is actually very hard unless your some english language wizard).
9. In the challenge level, the user only has 60 seconds to get as many points as he/she can. To win points, you have to guess the remaining letter that is missing in the word shown above. Essentially, the whole secret word will be shown except for one letter missing, and it is the users job to find that letter as fast as he/she can. The catch is, however, that the user only gets 1 life per word. GOODLUCK!! 

### Added Features

I implemented features that I thought was necessary in order to make the user experience more fun and easy. 

Here is a list of features I added: 
- Support for guessing full words instead of just letters one at a time. Wrong guesses will count towards the users lives.
- A diagram animation to represent the users wrong guesses. The balloons represent his/her number of lives. The corgi being floated represents the "hangman".
- Color for the keyboard to represent correct guesses in green and incorrect guesses in red. 
- A configurable difficulty level adjust the secret words based on the difficulty chosen by the user
- A hint button that parses through the secret word string to find a letter that has not been guessed yet, and gives it to the User as a hint. 
- A give up button, in case the User wants to stop playing
- A score that adds up all the lives the User was able to accumulate over the course of one game session. 

- The last feature that I like the most and spent the most time on is the extra Challenge level feature. I basically got the chance to re-create a classic hangman game in my own way. I had to implement a timer feature and an algorithm to take out a random letter from the secret word and display all the letters except for all the occurrences of the chosen hidden letter. I wanted to create a version of the game that was fast paced, where a User can go into it thinking the game is a piece of cake but realizing very fast that it is actually very challenging and fun. It's one of those, I can't believe I can't guess one letter right..this is so easy games. It can definitely drive a very competitive user crazy. 

### If I had more time..

- I would implement a cool leaderboard 
- Two users? versus mode
- Add a database, to store user progress, words guessed already, highscores per level. 
- More animations in the front end. 
- better background / aka not a gif
- LEARN HOW TO INCORPORATE SOUND with onPress and scene changes, lose and win sounds, background sounds
- Learn about making my own animations
- AsyncStorage - to store leaderboard scores

# What I learned/What I want to learn

- Overall this project has been a huge step towards what I've always wanted to do since entering the tech field. The first language I learned was C so most of the projects I've worked on have been terminal based and algorithm heavy and no database or UI componenets in it. Since stepping into the software development role, I've been looking for that opportunity to learn mobile app development and this project has really helped me to start it. I could've done a project terminal based with a language I'm more familiar with but I knew that I had to use this opportunity to do something I've pushed back for too long. 
- In this week, I learned:
    - Javascript syntax, basic javascript programming
    - React Native framework syntax and project layout
    - Component lifecycles (i have more learning to do here)
    - How to pass props and states
    - User input
    - Styling
    - How to debug a mobile app built with JS and RN
    - Navigation between pages, builtin features such as onPress and setState
    - How to make use of packages

What I want to learn: 
- I want to learn how to integrate an actual DB into the app 
- I want to learn about async and await 
- I want to learn about asynchronage storage 
- I want to learn how to more effectively debug

# Challenges I faced

- Understanding how to use componenet lifecycle methods more powerfully. I think I used component lifecycles in a basic form but I want to be able to learn and use it more efficiently and powerfully.
- Between Nov 2017-March 2018 I primarily coded in C and after that between April 2018-July 2018 I started learning Ruby and some basic api scripting for automating tasks at work, then after that I started to run coding bootcamps so most of my time went towards project management. Switching gears towards mobile development with javascript and react native took a few days for me to get familiarized and comfortable. I didn't know any React Native or Javascript coming into this project and had to learn a ton about how a component works, how to use component lifecycles and setting the state, how to get api using fetch method, etc. 
- The hardest challenge I faced was understanding how to properly setState and pass props in order to make the project flow properly. This part caused a lot of bugs. 
- As for the logic part, rendering the dashes in order to switch it with the correct letters guessed was the toughest part since for this part I truly had to understand at which point each component was rendering. 
- Sometimes my app would run a little laggy so I'd love to learn more about how to optimize my code so that it can run more smoothly and faster overall. I'm guessing I have to make use of component lifecycles for this part. Or maybe I'm using it wrong?

###### Conclusion
Overall, I'm very proud of what I've done. Only a week ago, I didn't even know how to initialize a React Native project and run a simulator. I got to design and plan out my game logic and then an actual user interface! The projects I've worked on the past never had a visual so this part was really fun and a breathe of fresh air. Building the app definitely had it's moments of frustration, but without those frustrations there would be no feeling of complete satisfaction with the result. I'm super proud of it and have been showing all my friends the challenge round. I'm not sure if that version of the challenge round exists on the internet (maybe I should google it) , but creating that was really exciting for me. I hope this project was able to show my creativity, ambitions, and determination to continue expanding my knowledge and seek out answers to things I'm curious about. 

Thank you for this opportunity and I hope you have a lot of fun playing it. 

I'm looking forward to discussing this project with you during the interview! 

