import React, { Component } from 'react';
import { TextInput, NativeSyntheticEvent, TextInputSubmitEditingEventData } from 'react-native';
import { OrbitaContext } from './OrbitaProvider';
import { APIClient } from 'orbita-api-client';
import { Choice } from './types';

export interface Props {
  sessionId: string;
  defaultValue?: string;
  onResults?: (responseText: string, choices: Array<Choice>, requestText: string) => any;
  onSend?: (text: string) => any;
  onError?: (error: Error | string, requestText: string) => any;
};

export interface State {
  text: string;
};

export default class OrbitaTextInput extends Component<Props, State> {
  static contextType = OrbitaContext;

  state = {
    text: this.props.defaultValue || '',
  };

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

      this.setState({ text: '' }, async () => {
        const response = await client.Chat.send({
          message,
          sessionId,
          audio: true,
        });

        if (response.type === 'success') {
          if (onResults) onResults(response.chat.chatText, response.buttons.choices, message);
        } else {
          if (onError) onError('Request failed', message);
        }
      });
    }
  };

  handleSubmitEditing = async ({ nativeEvent: { text }}: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
    await this.sendMessage(text)
  };

  render() {
    const { text } = this.state;

    return (
      <TextInput
        {...this.props}
        onChangeText={(text) => this.setState({ text })}
        value={text}
        multiline={false}
        onSubmitEditing={this.handleSubmitEditing}
      />
    );
  }
}
