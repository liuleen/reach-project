export const checkFullWord = () =>{
    if(this.state.secretWord == this.state.fullWord.toLowerCase().trim()){
        this.newGame();
    }else if(this.state.fullWord.trim() === ""){
        return ;
    }else{
        this.setState({
            "lives": this.state.lives - 1
        })
    }
}