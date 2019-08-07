import React, { Component } from 'react';
import { NativeSyntheticEvent, TextInputSubmitEditingEventData } from 'react-native';
import { OrbitaResponse } from './types';
export interface Props {
    customData?: any;
    sessionId: string;
    defaultValue?: string;
    onResults?: (response: OrbitaResponse, requestText: string) => any;
    onSend?: (text: string) => any;
    onError?: (error: Error | string, requestText: string) => any;
}
export interface State {
    text: string;
}
export default class OrbitaTextInput extends Component<Props, State> {
    static contextType: React.Context<{
        endpoint: string;
    }>;
    state: {
        text: string;
    };
    sendMessage: (message: string) => Promise<void>;
    handleSubmitEditing: ({ nativeEvent: { text } }: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => Promise<void>;
    render(): JSX.Element;
}
