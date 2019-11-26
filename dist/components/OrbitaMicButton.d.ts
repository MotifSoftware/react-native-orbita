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
    onBeforeStartRecording?: () => Promise<any>;
    onAfterStartRecording?: () => Promise<any>;
    onBeforeStopRecording?: () => Promise<any>;
    onAfterStopRecording?: () => Promise<any>;
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
    handleBeforeStartRecording: () => Promise<void>;
    handleAfterStartRecording: () => Promise<void>;
    handleBeforeStopRecording: () => Promise<void>;
    handleAfterStopRecording: () => Promise<void>;
    render(): JSX.Element;
}
