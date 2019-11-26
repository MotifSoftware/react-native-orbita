import { Component } from 'react';
import { AudioEncodingType, RecordingOptions } from 'react-native-audio';
export interface Props {
    onBeforeStartRecording: () => Promise<any>;
    onAfterStartRecording: () => Promise<any>;
    onBeforeStopRecording: () => Promise<any>;
    onAfterStopRecording: () => Promise<any>;
    onResults: (text: string) => any;
    onNoResults: () => any;
    silenceTimeout?: number;
}
export interface State {
    isRecording: boolean;
    meteringRecord: Array<number>;
    hasPermission: boolean;
    audioPath: string;
    recordingOptions: RecordingOptions;
}
export default class MicButton extends Component<Props, State> {
    static defaultProps: {
        silenceTimeout: number;
    };
    state: {
        isRecording: boolean;
        meteringRecord: number[];
        hasPermission: boolean;
        audioPath: string;
        recordingOptions: {
            SampleRate: number;
            Channels: number;
            AudioQuality: "Low";
            AudioEncoding: AudioEncodingType;
            IncludeBase64: boolean;
            MeteringEnabled: boolean;
        };
    };
    constructor(props: Props);
    componentDidMount(): void;
    prepareToRecord(): Promise<boolean>;
    prepareRecordingPath(audioPath: string): Promise<void>;
    record(): Promise<void>;
    stopRecording(): Promise<void>;
    render(): JSX.Element;
}
