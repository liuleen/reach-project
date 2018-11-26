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

###### TimeLine
- Nov 22
    - [x]design UI
    - [x]data requirements
    - [x]welcome screen UI
    - [x]user prompt difficulty dialog
    - [x]route to game screen with PLAY button
    - []finish image upload screen [optional]
- Nov 23-24
    - [x]pass variables from welcome screen to game screen
    - [x]input field filled in for both required
    - [x]get word function from api
    - [x]keyboard
    - [x]validate letters
    - [x]dashes
    - [x]function check used letters
    - [x]function to fill in word with letters guessed
- Nov 25-26
    - [x]reset state when START button pressed for back button feature
    - []animation hangman
    - [x]keyboard press colors
    - [x]keyboard can't press faded colors
    - []function subtract lives (display heart with number of lives)
    - []give up button that 555555routes to welcome screen
    - []hint
    - []timer
    - []sound for start button, image taking, cheering, booing, give up
    - []you lose, try again button
    - [x]get word based on difficulty from api
    - []support of full words guesses
- Nov 27-28
    - []comment code
    - []speed
    - []write readme
    - []welcome screen UI
        - []ANIMATION
        - []TITLE ANIMATION
        - []DROP DOWN LEVEL SELECTION
        - []USER NAME
        - []BUTTONS START
        - []BUTTONS PLAY
    - []Game screen UI
        - []KEYBOARD
        - []LIVES LEFT
        - []HINT
        - []HANGMAN
        - []TIMER
        - []GAMEOVER
        - []YOU WIN
        - []GIVE UP
    - []challenge level with increasing difficulty and timer (guess word with letters given)
- Nov 29-30 
    - []maybe implement leaderboard?
    - []5star rate
- Dec 1-2
    - []user test
    - []check for bugs
    - []make sure everything is flawless
    - []error management
    - []finish whatever was left unfinished
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


Component State	Storing data in the state of your components is the simplest way to manage data throughout your app. Every time the user interacts with the app, update the state of a component, or use function props to update the state in parent components. It can be advantageous to maintain all state in the root component of the app, so that all state is managed in one place, making it easier to reason about the app and enabling you to easily switch to Redux if necessary.

#fix
- dialog input navigation is wrong
- implement jest
- points: depending on how many lives left

#questions
- how does it recognize that the key can't be pressed anymore
- what does the key represent in dialog, why do i need it (child props?)