// render(){
//     let rope = <Line x1="250" y1 = "0" x2="250" y2 = "120" stroke="#895917" strokeWidth="5" id="rope"/>;
//     let head = <Circle cx="250" cy="150" r="30" id="head" fill="#ecd2b7"/>;
//     let bodyMain = <Rect width="10" height="100" x="245" y="150" id="bodyMain" fill="#ecd2b7"/>
//     let hands = <G><Line x1="250" y1="200" x2="220" y2="230" stroke="#ecd2b7" stroke-Linecap="round" strokeWidth="10" id="handLeft" />
//     <Line x1="250" y1="200" x2="280" y2="230" stroke="#ecd2b7" stroke-Linecap="round" strokeWidth="10" id="handRight"/></G>;
//     let legs = <G><Line x1="250" y1="250" x2="230" y2="300" stroke="#ecd2b7" stroke-Linecap="round" strokeWidth="10" id="legLeft"/>
//     <Line x1="250" y1="250" x2="270" y2="300" stroke="#ecd2b7" stroke-Linecap="round" strokeWidth="10" id="legRight"/></G>
//     return(
//       <View style={styles.container}>
//         <Text style={styles.scoreText}>Score: {this.state.score}</Text>
//         <Svg version="1.1" viewBox="0 0 500 500" preserveAspectRatio="xMinYMin meet" class="svg-content" width="200" height="250">
//         <Rect fill="#053544" width="10" height="400" x="20" y="0" />
//         <Rect fill="#053544" width="300" height="10" x="20" y="0" />
//         <Rect fill="#053544" width="300" height="10" x="0" y="400" />
//         {this.state.wrong>0?rope:null}
//         {this.state.wrong>1?head:null}
//         {this.state.wrong>2?bodyMain:null}
//         {this.state.wrong>3?hands:null}
//         {this.state.wrong>4?legs:null}
//         </Svg>
//         {this.renderDashes()}
//         <View style={styles.hintContainer}><Text style={styles.hintText}>Hint : {this.state.hint}</Text></View>
//         {this.renderKeyBoard()}
//       </View>
//     )
//   }
// }



