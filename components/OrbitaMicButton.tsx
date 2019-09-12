import React, { Component, createRef } from 'react';
import { OrbitaContext } from './OrbitaProvider';
import MicButton from './MicButton';
import { APIClient } from 'orbita-api-client';
import { OrbitaResponse } from './types';

export interface Props {
  sessionId: string;
  customData?: any;
  silenceTimeout?: number;
  onResults?: (response:OrbitaResponse, requestText: string) => any;
  onSend?: (text: string) => any;
  onError?: (error: Error | string, requestText: string) => any;
  onNoResults? : () => any;
  onStartRecording? : () => any;
  onStopRecording? : () => any;
};

export default class OrbitaMicButton extends Component<Props> {
  static contextType = OrbitaContext;

  private mic = createRef<MicButton>();

  sendMessage = async (message: string) => {
    const settings = this.context;
    const { customData, sessionId, onResults, onError, onSend } = this.props;

    if (settings) {
      const { endpoint } = settings;
      const client = new APIClient({
        chat: {
          endpoint,
          orbitaNodeVersion: 2,
        },
      });

      if (onSend) onSend(message);

      const response = await client.Chat.send({
        message,
        sessionId,
        audio: true,
        customData,
      });

      if (response.type === 'success') {
        if (onResults) onResults(response, message);
      } else {
        if (onError) onError('Request failed.', message);
      }
    }
  };

  record = () => {
    if (this.mic.current) {
      this.mic.current.record();
    }
  }

  stopRecording = () => {
    if (this.mic.current) {
      this.mic.current.stopRecording();
    }
  }

  handleResults = async (message: string) => {
    await this.sendMessage(message);
  };

  handleNoResults = () => {
    const { onNoResults } = this.props;

    if (onNoResults) {
      onNoResults();
    }
  };

  handleStartRecording = () => {
    const { onStartRecording } = this.props;

    if (onStartRecording) {
      onStartRecording();
    }
  };

  handleStopRecording = () => {
    const { onStopRecording } = this.props;

    if (onStopRecording) {
      onStopRecording();
    }
  };

  render() {
    const { silenceTimeout } = this.props;
    
    return (
      <MicButton
        ref={this.mic}
        silenceTimeout={silenceTimeout}
        onResults={this.handleResults}
        onNoResults={this.handleNoResults}
        onStartRecording={this.handleStartRecording}
        onStopRecording={this.handleStopRecording}
      />
    );
  }
}