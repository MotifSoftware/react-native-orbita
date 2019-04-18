import React, { Component } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import Voice, { SpeechResults } from 'react-native-voice';

import icon from './assets/microphone.png';
import activeIcon from './assets/microphone-active.png';

export interface Props {
  onResults: (text: string) => any;
  silenceTimeout?: number;
};

export interface State {
  isRecording: boolean;
  lastMessage: string;
  results: string;
};

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
  },
});

const defaultSilenceTimeout = 1000;

const initialState: State = {
  isRecording: false,
  lastMessage: '',
  results: '',
};

export default class MicButton extends Component<Props, State> {
  static defaultProps = {
    silenceTimeout: defaultSilenceTimeout,
  };

  state = initialState;

  timeoutHandle: number | null;

  constructor(props: Props) {
    super(props);

    this.timeoutHandle = null;

    Voice.onSpeechStart = this.handleSpeechStart.bind(this);
    Voice.onSpeechEnd = this.handleSpeechEnd.bind(this);
    Voice.onSpeechPartialResults = this.handleSpeechPartialResults.bind(this);
  }

  handleSpeechStart() {
    this.setTimeout();
    this.setState((state) => ({
      ...initialState,
      isRecording: true,
    }));
  };

  handleSpeechEnd() {
    const { onResults } = this.props;
    const { results } = this.state;

    this.clearTimeout();
    this.setState((state) => ({
      ...state,
      isRecording: false,
    }), () => {
      if (onResults) onResults(results);
    });
  };

  handleSpeechPartialResults(response: SpeechResults) {
    if (response && response.value && response.value.length > 0) {
      const mostRecentText = response.value[response.value.length - 1];

      this.setTimeout();

      this.setState(({ results, ...rest }) => ({
        ...rest,
        lastMessage: results,
        results: mostRecentText,
      }));
    }
  };

  stopRecording = () => {
    const { onResults } = this.props;
    const { isRecording, results } = this.state;

    if (isRecording) {
      this.clearTimeout();
      Voice.stop();
    }
  };

  record = () => {
    this.stopRecording();

    Voice.start();
  };

  checkIfSilent = () => {
    const { lastMessage, results } = this.state;

    if (lastMessage && lastMessage === results) {
      this.stopRecording();
    } else {
      this.setTimeout();
      this.setState((state) => ({
        ...state,
        lastMessage: results,
      }));
    }
  };

  setTimeout = () => {
    const { silenceTimeout } = this.props;

    if (this.timeoutHandle) clearTimeout(this.timeoutHandle);

    this.timeoutHandle = setTimeout(() => {
      this.checkIfSilent();
    }, silenceTimeout || defaultSilenceTimeout);
  };

  clearTimeout = () => {
    if (this.timeoutHandle) clearTimeout(this.timeoutHandle);

    this.timeoutHandle = null;
  };

  render() {
    const { isRecording } = this.state;

    return (
      <TouchableOpacity onPress={this.record}>
        <Image
          style={styles.button}
          source={isRecording ? activeIcon : icon}
        />
      </TouchableOpacity>
    );
  }
}
