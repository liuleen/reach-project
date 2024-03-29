# reach-project

_A mobile app for the classic hangman game._

###### Problem:

Implement a word guessing game, which can be played by a user "against" the computer. This is a game where the secret-keeper (in this case, the computer) thinks of a word, and the guesser (the user) tries to guess it one letter at a time. The guesser has six guesses. If the guesser guesses a letter which is part of the word, the secret-keeper will reveal all occurrences of that letter in the word. If the guesser guesses a correct letter such that all letters are now revealed, the game is over and player 2 has won. Instead if player 2 runs out of guesses before the whole word is discovered, the game is over and player 1 has won. Check out https://en.wikipedia.org/wiki/Hangman_(game) for more details.

###### Rules:

- At the start of the game the computer/secret-keeper will choose a dictionary word
- The guesser loses the game if they guess 6 letters that are not in the secret word
- The guesser wins the game if they guess all letters in the secret word correctly and have not already lost the game per the conditions above

###### My Features
- user prompt level difficulty page
- persistent data for leaderboard scores
- alerts for lives left
- sound (cheering/booing)
- useless hints
- useful hints
- give up option
- full word guesses
- letters displayed in green or red to show if used
- challenge level -> how many levels you can get in 3 min (length of word gets longer, difficulty gets harder)

###### TimeLine
- Nov 23
    - [x] design UI
    - [x] write out logic if possible
    - [x] data requirements
    - [x] welcome screen UI sketch
    - [x] game screen UI sketch
    - [x] user prompt difficulty dialog
    - [x] route to game screen with PLAY button (how do i route)
- Nov 24-25
    - [x] pass variables from welcome screen to game screen (THEY'RE CALLED PROPS!!)
    - [x] input field filled in for both required
    - [x] get word function from api
    - [x] keyboard
    - [x] validate letters
    - [x] dashes
    - [x] function check used letters
    - [x] function to fill in word with letters guessed
- Nov 26-27
    - [x] reset state when START button pressed for back button feature
    - [x] animation hangman
    - [x] keyboard press colors
    - [x] keyboard can't press faded colors
    - [x] function subtract lives (display heart with number of lives)
    - [x] give up button that routes to welcome screen
    - [x] hint
    - [x] timer
    - [x] you lose, try again 
    - [x] you win, play again 
    - [x] get word based on difficulty from api
    - [x] support of full words guesses
- Nov 28-29
    - [x] Welcome screen UI
        - [x] ANIMATION
        - [x] TITLE ANIMATION
        - [x] DROP DOWN LEVEL SELECTION
        - [x] USER NAME
        - [x] BUTTONS START
        - [x] BUTTONS PLAY
    - [x] Game screen UI
        - [x] KEYBOARD
        - [x] LIVES LEFT
        - [x] HINT
        - [x] HANGMAN
        - [x] TIMER
        - [x] GAMEOVER
        - [x] YOU WIN
        - [x] GIVE UP
    - [x] Challenge level with increasing difficulty and timer (guess word with letters given)
- Nov 30-Dec1 
    - [x] refactor the code
    - [x] comment code
    - [x] write readme
    - [x] user test
    - [x] check for bugs
- Dec 1
    - YOU GOT THIS!!! :]
    - DON'T BE NERVOUS OR STRESSED, OK MAYBE A LITTLE STRESSED, AND A LITTLE NERVOUS

###### Data
- API - word bank GET /words
- API - difficulty words
- max number of tries; == 6
- guessedChars = []; //array of unique chars, stores letters user already guessed
- hiddenWord = ""; //stores the word user has to guess
- lives = 6; //start with val of tries and decrement for wrong guesses, stores how many guesses a user has left
- correctChars : array of corretly guess chars
- startedGame = false; //state --> sound? 
- finishedGame = false; //state (try again button, give up button)
- tmpScore: to add scores total
- score = 0; //number of lives left after each roud, how many words guessed successfully
- level: which level of difficulty did user choose
- fullWord: user to input fullWord feature
- leaderboard scores?
- if key letter is pressed? : false
- hint: to store the char in secret word that hasn't been guessed yet by the user

###### bug fixes
- dialog input navigation is wrong
- lets user continue without username or level selection
- back button needs to be disabled
- timer is going crazy, when game over timer continues, when new game starts timer stops and doesnt restart
- keys are still pressable after game is over
- full word guessed wrong at the last life doesnt invoke game over alert...do a component did update?
- don't let timer stop on give up button bc of them hackers
- trim full word inputs for the extra spaces
- disable the autocomplete on keyboard?? gives answers away lol
- full word dialog can submit empty string, makes user lose a life...
- score accumulation is not resetting
- balloons are way too messy
- HOW DO I OVERLAP BALLOONS
- slow down the alert box for game over so the user can see corgi fall
- points: depending on how many lives left
- timer bug!!!
- how can i make it faster?

###### questions
- how does it recognize that the key can't be pressed anymore
- difference between component didmount and willmount
- what does binding this in state do
- what does the key represent in dialog, why do i need it (child props?)
- await/async
- try catch
- lifecycle of component

###### logic
 1. onKeyPress - to see if char has been used, if yes do action->
 2. push letter in guessed chars ->
 3. validateLetter() ->
        - -->check if letter exists in secretWordString
 5. isInSecretWord() 
    - -->if secretWord returns true: update correctChars pop out of correctChars, update dash--> render if in secretWord
        - -->if answer == secret: winner
            - --> start new game
            - --> add old remaining number of lives to score
            - --> reset everything except score
    - -->if secretWord returns false: numberofTries--,
        - --> subract lives: lives = lives - 1
        - --> check number of lives isnt 0 (aka game over) (corgi falls)
            --> alert game over (restart and leave options
        - --> make balloon float away

###### notes
- Why not use component will mount for fetch API: componentDidMount is the best place to put calls to fetch data, for two reasons:
1) Using componentDidMount makes it clear that data won’t be loaded until after the initial render. You need to setup initial state properly, so you don’t get undefined state that causes errors.

2) If we instead use componentDidMount, then it's clear that the component will render at least once before you get back any data (because the component already did mount). So, by extension, it's also clear that we have to handle the initial state in a way so that the component doesn't break on the first ("empty") render.

- The render() method is the only required method in a class component.

- The constructor for a React component is called before it is mounted. When implementing the constructor for a React.Component subclass, you should call super(props) before any other statement. Otherwise, this.props will be undefined in the constructor, which can lead to bugs.

- Typically, in React constructors are only used for two purposes:

    - Initializing local state by assigning an object to this.state.
    - Binding event handler methods to an instance.

Component State	Storing data in the state of your components is the simplest way to manage data throughout your app. Every time the user interacts with the app, update the state of a component, or use function props to update the state in parent components. It can be advantageous to maintain all state in the root component of the app, so that all state is managed in one place, making it easier to reason about the app and enabling you to easily switch to Redux if necessary.