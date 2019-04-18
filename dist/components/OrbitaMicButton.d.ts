import React, { Component } from 'react';
import { Choice } from './types';
export interface Props {
    sessionId: string;
    onResults?: (responseText: string, choices: Array<Choice>, requestText: string) => any;
    onSend?: (text: string) => any;
    onError?: (error: Error | string, requestText: string) => any;
}
export default class OrbitaMicButton extends Component<Props> {
    static contextType: React.Context<{
        endpoint: string;
    }>;
    sendMessage: (message: string) => Promise<void>;
    handleResults: (message: string) => Promise<void>;
    render(): JSX.Element;
}
