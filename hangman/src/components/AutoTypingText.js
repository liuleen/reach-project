import React from 'react'
import AutoTypingText from 'react-native-auto-typing-text';

export default class AutoTypingText extends Component {
    render() {
        <AutoTypingText
            text={`HANGMAN`}
            charMovingTime={80}
            delay={0}
            style={{
                position: 'absolute',
                width: 300,
                fontSize: 100,
                fontWeight: "bold",
                color: 'rgba(0,0,0,0.7)',
                backgroundColor: 'rgba(0,0,0,0)',
                margin: 20,
                top: 240,
                left: 0,
            }}
            onComplete={() => { console.log('done'); }}
        />
    }
}
