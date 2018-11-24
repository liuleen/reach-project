# reach-project

_A mobile app for the classic hangman game._

###### Problem:

Implement a word guessing game, which can be played by a user "against" the computer. This is a game where the secret-keeper (in this case, the computer) thinks of a word, and the guesser (the user) tries to guess it one letter at a time. The guesser has six guesses. If the guesser guesses a letter which is part of the word, the secret-keeper will reveal all occurrences of that letter in the word. If the guesser guesses a correct letter such that all letters are now revealed, the game is over and player 2 has won. Instead if player 2 runs out of guesses before the whole word is discovered, the game is over and player 1 has won. Check out https://en.wikipedia.org/wiki/Hangman_(game) for more details.

###### Rules:

- At the start of the game the computer/secret-keeper will choose a dictionary word
- The guesser loses the game if they guess 6 letters that are not in the secret word
- The guesser wins the game if they guess all letters in the secret word correctly and have not already lost the game per the conditions above

###### Features: 

We also encourage you to think of these requirements as a starting point, and just use your creativity/imagination to expand the game in any way that you want to showcase your talents and passion for programming. Sample extension ideas include:

- [] Track users/scores over time and show a leaderboard
- [] Add support for guessing full words instead of just letters one at a time, and count those against the guesses total
- [] Add support for phrases instead of just words, and numbers in addition to letters
- [] Create a diagram (that can be drawn with 6 attempt) that gets filled in as the user guesses incorrectly
- []Add a configurable “difficulty level” and adjust the words that are used based on the user’s preference
- []Anything else that you come up with to make the game more fun/interesting!

###### My Features
- user prompt level difficulty page
- image upload for hangme face
- themes? if i have time
- persistent data for leaderboard scores
- alerts for lives left
- sound (cheering/booing)
- useless hints
- letters displayed in green or red to show if used
- challenge level -> how many levels you can get in 3 min (length of word gets longer, difficulty gets harder)

###### Users:
- User1
- Computer

###### TimeLine
- Nov 22
    - [x]design UI
    - [x]write out needed data
    - [x]finish welcome screen UI
    - [x]user prompt difficulty screen
    - [x]route to game screen wit PLAY button
    - []finish image upload screen
    - []persistant data?
- Nov 23-24
    - []pass variables from welcome screen to game screen
    - []input field filled in for both required
    - []function for API call to GET /words 
    - []design/setup game screen UI
    - []fill in word function
    - []support of full words guesses
    - []animated keyboard w/ {red/green} functionality
- Nov 25-26
    - []give up button that routes to welcome screen
    - []hangman animation
    - []useless hint
    - []sound for start button, image taking, cheering, booing, give up
    - []# of wins
    - []alert how many lives left
- Nov 27-28
    - []timer
    - []challenge level with increasing difficulty and timer
- Nov 29-30 
    - []maybe implement leaderboard?
    - []finishing touches and cool components
- Dec 1-2
    - user test
    - check for bugs
    - finish whatever was left unfinished
- Dec 3-4 
    - practice
    - breathe
    - you can do this :) 

###### Data
- API - word bank GET /words
- API - difficulty words
- max number of tries; == 6
- guessedChars = []; //array of unique chars, stores letters user already guessed
- hiddenWord = ""; //stores the word user has to guess
- remainingGuesses = 0; //start with val of tries and decrement for wrong guesses, stores how many guesses a user has left
- startedGame = false; //state --> sound? 
- finishedGame = false; //state (try again button, give up button)
- wins = 0; //number of wins, how many words guessed successfully
- image uplaod 
- leaderboard scores
- sound
- if key letter is pressed? : false
- uselessHint: ""

