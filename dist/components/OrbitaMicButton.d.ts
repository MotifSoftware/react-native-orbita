import React, { Component } from 'react';
import { OrbitaResponse } from './types';
export interface Props {
    sessionId: string;
    customData?: any;
    silenceTimeout?: number;
    onResults?: (response: OrbitaResponse, requestText: string) => any;
    onSend?: (text: string) => any;
    onError?: (error: Error | string, requestText: string) => any;
    onNoResults?: () => any;
    onStartRecording?: () => any;
    onStopRecording?: () => any;
}
export default class OrbitaMicButton extends Component<Props> {
    static contextType: React.Context<{
        endpoint: string;
    }>;
    private mic;
    sendMessage: (message: string) => Promise<void>;
    record: () => void;
    stopRecording: () => void;
    handleResults: (message: string) => Promise<void>;
    handleNoResults: () => void;
    handleStartRecording: () => void;
    handleStopRecording: () => void;
    render(): JSX.Element;
}
