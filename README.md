
# react-native-orbita

## Getting started

React Native Orbita depends on `react-native-voice` to listen for audio from the microphone. You'll have to install that first and [set it up](https://github.com/wenkesj/react-native-voice). 

Once you've setup `react-native-voice`, install Orbita's React Native framework:

`$ npm install react-native-orbita --save`

## Usage

The library exports three controls:

- `<OrbitaMicButton />` - Listens for input from the microphone, and retrieves the result to Orbita. 
- `<OrbitaTextInput />` - Listens for keyboard input, and sends the result to Orbita.
- `<OrbitaProvider />` - Establishes a context that tells the microphone and text input controls where and what data to send to Orbita. 

All `OrbitaTextInput` and `OrbitaMicButton` controls must be inside of an `OrbitaProvider` control. 

### A basic example

```
import React from 'react';
import {
  OrbitaProvider,
  OrbitaMicButton,
  OrbitaTextInput,
} from 'react-native-orbita';

const sessionId = 'a unique session id';
const customData = {
  questionId: 7,
};

export default function App() {
  function handleError(err) {
    alert(err.toString());
  }

  function handleResults(text, choices) {
    alert(`${text} - ${JSON.stringify(choices)}`);
  }

  return (
    <OrbitaProvider endpoint="https://your-ns.orbita.cloud:8443/oeapi/chat">
      <div id="buttons">
        <OrbitaMicButton
          customData={customData}
          sessionId={sessionId}
          onError={handleError}
          onResults={handleResults}
        />
        <OrbitaTextInput
          customData={customData}
          sessionId={sessionId}
          onError={handleError}
          onResults={handleResults}
        />
      </div>
    </OrbitaProvider>
  );
}
```
