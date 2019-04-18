import { Component } from 'react';
import { SpeechResults } from 'react-native-voice';
export interface Props {
    onResults: (text: string) => any;
    silenceTimeout?: number;
}
export interface State {
    isRecording: boolean;
    lastMessage: string;
    results: string;
}
export default class MicButton extends Component<Props, State> {
    static defaultProps: {
        silenceTimeout: number;
    };
    state: State;
    timeoutHandle: number | null;
    constructor(props: Props);
    handleSpeechStart(): void;
    handleSpeechEnd(): void;
    handleSpeechPartialResults(response: SpeechResults): void;
    stopRecording: () => void;
    record: () => void;
    checkIfSilent: () => void;
    setTimeout: () => void;
    clearTimeout: () => void;
    render(): JSX.Element;
}
