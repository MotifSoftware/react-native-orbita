import React, { Component, createRef } from 'react';
import { OrbitaContext } from './OrbitaProvider';
import MicButton from './MicButton';
import { APIClient } from 'orbita-api-client';
import { OrbitaResponse } from './types';

export interface Props {
  sessionId: string;
  customData?: any,
  onResults?: (response:OrbitaResponse, requestText: string) => any;
  onSend?: (text: string) => any;
  onError?: (error: Error | string, requestText: string) => any;
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

  render() {
    return (
      <MicButton
        ref={this.mic}
        onResults={this.handleResults}
      />
    );
  }
}