import React, { Component } from 'react';
import { TextInput, NativeSyntheticEvent, TextInputSubmitEditingEventData } from 'react-native';
import { OrbitaContext } from './OrbitaProvider';
import { APIClient } from 'orbita-api-client';
import { OrbitaResponse } from './types';

export interface Props {
  customData?: any,
  sessionId: string;
  defaultValue?: string;
  onResults?: (response:OrbitaResponse, requestText: string) => any;
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

      this.setState({ text: '' });
      
      const response = await client.Chat.send({
        message,
        sessionId,
        audio: true,
        customData,
      });

      if (response.type === 'success') {
        if (onResults) onResults(response, message);
      } else {
        if (onError) onError('Request failed', message);
      }
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
