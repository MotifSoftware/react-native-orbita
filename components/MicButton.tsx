import React, { Component } from 'react';
import { Image, StyleSheet, TouchableOpacity, Platform } from 'react-native';

import { AudioRecorder, AudioUtils, AudioSource, AudioEncodingType, RecordingOptions } from 'react-native-audio';

import icon from './assets/microphone.png';
import activeIcon from './assets/microphone-active.png';

export interface Props {
  onBeforeStartRecording: () => Promise<any>;
  onAfterStartRecording: () => Promise<any>;
  onBeforeStopRecording: () => Promise<any>;
  onAfterStopRecording: () => Promise<any>;
  onResults: (text: string) => any;
  onNoResults: () => any;
  silenceTimeout?: number;
};

const defaultSilenceTimeout = 1000;

export interface State {
  isRecording: boolean;
  meteringRecord: Array<number>;
  hasPermission: boolean;
  audioPath: string;
  recordingOptions: RecordingOptions;
};

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
  },
});

export default class MicButton extends Component<Props, State> {
  static defaultProps = {
    silenceTimeout: defaultSilenceTimeout,
  };

  state = {
    isRecording: false,
    meteringRecord: [] as number[],
    hasPermission: false,
    audioPath: AudioUtils.CachesDirectoryPath + '/audio-temp',
    recordingOptions: {
      SampleRate: 16000,
      Channels: 1,
      AudioQuality: "Low" as "Low",
      AudioEncoding: "lpcm" as AudioEncodingType,
      IncludeBase64: true,
      MeteringEnabled: true
    }
  };

  constructor(props: Props) {
    super(props);

    this.record = this.record.bind(this);
    this.stopRecording = this.stopRecording.bind(this);
    this.prepareToRecord = this.prepareToRecord.bind(this);
  }

  componentDidMount() {
    if (Platform.OS === "android") {
      this.setState({
        recordingOptions: {
          SampleRate: 16000,
          Channels: 1,
          AudioQuality: "Low" as "Low",
          AudioEncoding: "amr_wb" as AudioEncodingType,
          OutputFormat: "amr_wb" as AudioEncodingType,
          AudioSource: AudioSource.MIC,
          AudioEncodingBitRate: 32000,
          IncludeBase64: true
        }
      });
    };

    AudioRecorder.requestAuthorization().then((isAuthorised) => {
      this.setState({ hasPermission: isAuthorised });
    });
  }

  async prepareToRecord() {
    const { onResults, onNoResults } = this.props;
    const { hasPermission, recordingOptions } = this.state;

    if (!hasPermission) {
      console.warn("App is not authorized to record.");
      return false;
    }

    const initializeHandlers = () => {
      AudioRecorder.onProgress = (data) => {
        console.log(data);
        
        const updatedMeteringRecord = this.state.meteringRecord.concat(data.currentMetering);
        this.setState({ meteringRecord: updatedMeteringRecord });

        const silenceTimeout = this.props.silenceTimeout && this.props.silenceTimeout > 0 ? this.props.silenceTimeout : defaultSilenceTimeout;
        const ticksBeforeSilence = Math.floor(silenceTimeout / 250);

        // Check for silence
        if (updatedMeteringRecord.length > ticksBeforeSilence ) {
          const lastThreeMeterings = updatedMeteringRecord.slice(Math.max(updatedMeteringRecord.length - ticksBeforeSilence, 1)),
            threshold = Platform.OS === "android" ? -40 : -25;
          if (lastThreeMeterings.every(metering => metering < threshold)) {
            this.stopRecording();
          }
        }
      };
  
      AudioRecorder.onFinished = (data) => {
        if (onResults) {
          const requestBody = {
            encoding: recordingOptions.AudioEncoding,
            sampleRate: recordingOptions.SampleRate,
            data: data.base64.replace(/\n/g, "")
          };

          fetch("https://ibtmaua43d.execute-api.us-east-2.amazonaws.com/prod", {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
          }).then(response => response.json())
            .then(responseJSON => {
              if (responseJSON.result) {
                onResults(responseJSON.result);
              } else {
                console.log("No result from Google STT endpoint.");
                onNoResults();
              }
            })
            .catch(error => console.warn(error));
        }
      };
    };

    if (AudioRecorder.cleanup) {
      AudioRecorder.onProgress = () => {};
      AudioRecorder.onFinished = () => { initializeHandlers(); };

      const wasRecording = await AudioRecorder.cleanup();

      if (!wasRecording) {
        initializeHandlers();
      }
    } else {
      initializeHandlers();
    }

    AudioRecorder.cleanup = async () => {
      const wasRecording = this.state.isRecording;

      if (wasRecording) {
        await AudioRecorder.stopRecording();
        this.setState({ isRecording: false });
      }

      return wasRecording;
    };

    this.setState({ meteringRecord: [] as number[] });

    return true;
  }

  async prepareRecordingPath(audioPath: string) {
    await AudioRecorder.prepareRecordingAtPath(audioPath, this.state.recordingOptions);
  }

  async record() {
    const { onBeforeStartRecording, onAfterStartRecording } = this.props;

    const preparedSuccessfully = await this.prepareToRecord();

    if (preparedSuccessfully) {  
      if (onBeforeStartRecording) {
        console.log("MicButton -> before onBeforeStartRecording");
        await onBeforeStartRecording();
        console.log("MicButton -> after onBeforeStartRecording");
      }

      await this.prepareRecordingPath(this.state.audioPath);  
      await AudioRecorder.startRecording();
      this.setState({ isRecording: true });
      
      if (onAfterStartRecording) {
        await onAfterStartRecording();
      }
    }
  }

  async stopRecording() {
    const { onBeforeStopRecording, onAfterStopRecording } = this.props;

    if (this.state.isRecording) {
      if (onBeforeStopRecording) {
        await onBeforeStopRecording();
      }

      await AudioRecorder.stopRecording();
      this.setState({ isRecording: false });

      if (onAfterStopRecording) {
        await onAfterStopRecording();
      }
    }
  }

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
