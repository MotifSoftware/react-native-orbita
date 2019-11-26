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
  onBeforeStartRecording? : () => Promise<any>;
  onAfterStartRecording? : () => Promise<any>;
  onBeforeStopRecording? : () => Promise<any>;
  onAfterStopRecording? : () => Promise<any>;
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

  handleBeforeStartRecording = async () => {
    const { onBeforeStartRecording } = this.props;

    if (onBeforeStartRecording) {
      onBeforeStartRecording();
    }
  };

  handleAfterStartRecording = async () => {
    const { onAfterStartRecording } = this.props;

    if (onAfterStartRecording) {
      await onAfterStartRecording();
    }
  };

  handleBeforeStopRecording = async () => {
    const { onBeforeStopRecording } = this.props;

    if (onBeforeStopRecording) {
      await onBeforeStopRecording();
    }
  };

  handleAfterStopRecording = async () => {
    const { onAfterStopRecording } = this.props;

    if (onAfterStopRecording) {
      await onAfterStopRecording();
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
        onBeforeStartRecording={this.handleBeforeStartRecording}
        onAfterStartRecording={this.handleAfterStartRecording}
        onBeforeStopRecording={this.handleBeforeStopRecording}
        onAfterStopRecording={this.handleAfterStopRecording}
      />
    );
  }
}