class GameScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      "answer":"",
      "hint":"",
      "correct":0,
      "wrong":0,
      "usedLetters":[],
      "lettersLeft":[],
      "input":"",
      "score":0
    }
    this.init = this.init.bind(this);
    this.puzzles = new Puzzles();
  } 
  componentDidMount(){
    this.init();
  }

  init(){
    let puzzle = this.puzzles.getRandom();
    let answer = puzzle.answer.replace(/[^a-zA-Z]/gmi, " ").trim();
    let hint = puzzle.hint;
    let lettersLeft = Array(answer.length);

    this.setState({
      answer:answer,
      hint:hint,
      correct:0,
      wrong:0,
      usedLetters:[],
      lettersLeft:lettersLeft,
      input:""
    });
  }
  validate(usedLetters,letter){
    usedLetters.push(letter);
    let correct = this.state.correct,
      wrong = this.state.wrong,
      answer = this.state.answer,
      lettersLeft = this.state.lettersLeft,
      score = this.state.score;
    if(answer.toUpperCase().indexOf(letter)==-1){
      wrong++;
      if(score>0){
        score --;
      }
    } else{
      answer.toUpperCase().split("").map((value,index)=>{
        if(value==letter){
          lettersLeft[index] = letter;
          correct ++;
          score++;
        }
      });
    }
    if(lettersLeft.join("").replace(/\*/g," ").toUpperCase() == answer.toUpperCase()){
      Alert.alert(
        'You win',
        'You have gussed the correct answer',
        [
          {text: 'OK', onPress: () => this.init()},
        ],
        { cancelable: false }
      )
    }
    if(wrong>4){
      Alert.alert(
        'You Lost',
        'Answer: '+answer.toUpperCase() +" "+this.state.hint,
        [
          {text: 'OK', onPress: () => this.init()},
        ],
        { cancelable: false }
      )
    }
    this.setState({
      usedLetters:usedLetters,
      correct:correct,
      wrong:wrong,
      lettersLeft:lettersLeft,
      score:score
    });
  }
  render(){
    let rope = <Line x1="250" y1 = "0" x2="250" y2 = "120" stroke="#895917" strokeWidth="5" id="rope"/>;
    let head = <Circle cx="250" cy="150" r="30" id="head" fill="#ecd2b7"/>;
    let bodyMain = <Rect width="10" height="100" x="245" y="150" id="bodyMain" fill="#ecd2b7"/>
    let hands = <G><Line x1="250" y1="200" x2="220" y2="230" stroke="#ecd2b7" stroke-Linecap="round" strokeWidth="10" id="handLeft" />
    <Line x1="250" y1="200" x2="280" y2="230" stroke="#ecd2b7" stroke-Linecap="round" strokeWidth="10" id="handRight"/></G>;
    let legs = <G><Line x1="250" y1="250" x2="230" y2="300" stroke="#ecd2b7" stroke-Linecap="round" strokeWidth="10" id="legLeft"/>
    <Line x1="250" y1="250" x2="270" y2="300" stroke="#ecd2b7" stroke-Linecap="round" strokeWidth="10" id="legRight"/></G>
    return(
      <View style={styles.container}>
        <Text style={styles.scoreText}>Score: {this.state.score}</Text>
        <Svg version="1.1" viewBox="0 0 500 500" preserveAspectRatio="xMinYMin meet" class="svg-content" width="200" height="250">
        <Rect fill="#053544" width="10" height="400" x="20" y="0" />
        <Rect fill="#053544" width="300" height="10" x="20" y="0" />
        <Rect fill="#053544" width="300" height="10" x="0" y="400" />
        {this.state.wrong>0?rope:null}
        {this.state.wrong>1?head:null}
        {this.state.wrong>2?bodyMain:null}
        {this.state.wrong>3?hands:null}
        {this.state.wrong>4?legs:null}
        </Svg>
        {this.renderDashes()}
        <View style={styles.hintContainer}><Text style={styles.hintText}>Hint : {this.state.hint}</Text></View>
        {this.renderKeyBoard()}
      </View>
    )
  }
  renderDashes(){
    return(
      <View style={styles.dashes}>
        {this.state.lettersLeft.map((letter,index)=>{
          if(letter=="*"){
            return (<View style={styles.dashItemContainer} key={index}><Text style={styles.dashBlankItem}>  </Text></View>)
          }else{
            return(<View style={styles.dashItemContainer} key={index}><Text style={styles.dashItem}>{letter}</Text></View>)
          }
        })}
      </View>
    )
  }
  onKeyPress(letter){
    let usedLetters = this.state.usedLetters;
    if(usedLetters.indexOf(letter)==-1){
      this.validate(usedLetters,letter);
    }else{
      return;
    }
  }
}



