import * as tslib_1 from "tslib";
import React, { Component, createRef } from 'react';
import { OrbitaContext } from './OrbitaProvider';
import MicButton from './MicButton';
import { APIClient } from 'orbita-api-client';
;
var OrbitaMicButton = /** @class */ (function (_super) {
    tslib_1.__extends(OrbitaMicButton, _super);
    function OrbitaMicButton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.mic = createRef();
        _this.sendMessage = function (message) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var settings, _a, customData, sessionId, onResults, onError, onSend, endpoint, client, response;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        settings = this.context;
                        _a = this.props, customData = _a.customData, sessionId = _a.sessionId, onResults = _a.onResults, onError = _a.onError, onSend = _a.onSend;
                        if (!settings) return [3 /*break*/, 2];
                        endpoint = settings.endpoint;
                        client = new APIClient({
                            chat: {
                                endpoint: endpoint,
                                orbitaNodeVersion: 2,
                            },
                        });
                        if (onSend)
                            onSend(message);
                        return [4 /*yield*/, client.Chat.send({
                                message: message,
                                sessionId: sessionId,
                                audio: true,
                                customData: customData,
                            })];
                    case 1:
                        response = _b.sent();
                        if (response.type === 'success') {
                            if (onResults)
                                onResults(response, message);
                        }
                        else {
                            if (onError)
                                onError('Request failed.', message);
                        }
                        _b.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); };
        _this.record = function () {
            if (_this.mic.current) {
                _this.mic.current.record();
            }
        };
        _this.stopRecording = function () {
            if (_this.mic.current) {
                _this.mic.current.stopRecording();
            }
        };
        _this.handleResults = function (message) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sendMessage(message)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        _this.handleNoResults = function () {
            var onNoResults = _this.props.onNoResults;
            if (onNoResults) {
                onNoResults();
            }
        };
        _this.handleStartRecording = function () {
            var onStartRecording = _this.props.onStartRecording;
            if (onStartRecording) {
                onStartRecording();
            }
        };
        _this.handleStopRecording = function () {
            var onStopRecording = _this.props.onStopRecording;
            if (onStopRecording) {
                onStopRecording();
            }
        };
        return _this;
    }
    OrbitaMicButton.prototype.render = function () {
        var silenceTimeout = this.props.silenceTimeout;
        return (React.createElement(MicButton, { ref: this.mic, silenceTimeout: silenceTimeout, onResults: this.handleResults, onNoResults: this.handleNoResults, onStartRecording: this.handleStartRecording, onStopRecording: this.handleStopRecording }));
    };
    OrbitaMicButton.contextType = OrbitaContext;
    return OrbitaMicButton;
}(Component));
export default OrbitaMicButton;
//# sourceMappingURL=OrbitaMicButton.js.map