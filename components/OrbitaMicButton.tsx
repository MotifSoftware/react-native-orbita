import React, { Component } from 'react';
import { OrbitaContext } from './OrbitaProvider';
import MicButton from './MicButton';
import { APIClient } from 'orbita-api-client';

export interface Props {
  sessionId: string;
  onResults?: (responseText: string, choices: Array<Choice>, requestText: string) => any;
  onSend?: (text: string) => any;
  onError?: (error: Error | string, requestText: string) => any;
};

export default class OrbitaMicButton extends Component<Props> {
  static contextType = OrbitaContext;

  sendMessage = async (message: string) => {
    const settings = this.context;
    const { sessionId, onResults, onError, onSend } = this.props;

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
      });

      if (response.type === 'success') {
        if (onResults) onResults(response.chat.chatText, response.buttons.choices, message);
      } else {
        if (onError) onError('Request failed.', message);
      }
    }
  };

  handleResults = async (message: string) => {
    await this.sendMessage(message);
  };

  render() {
    return (
      <MicButton onResults={this.handleResults} />
    );
  }
}