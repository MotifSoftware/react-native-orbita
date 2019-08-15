/// <reference types="react" />
/// <reference types="react-native" />

declare module 'react-native-voice' {
  import { Component } from 'react';

  export interface IVoice {
    onSpeechStart: () => any;
    onSpeechEnd: () => any;
    onSpeechPartialResults: (results: SpeechResults) => any;
    removeAllListeners: () => any;
    stop: () => void;
    start: () => void;
  }

  export interface SpeechResults {
    value?: Array<string>;
  }

  const Voice: IVoice;

  export default Voice;
}
