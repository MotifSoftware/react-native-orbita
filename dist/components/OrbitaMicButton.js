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
        _this.handleBeforeStartRecording = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var onBeforeStartRecording;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        onBeforeStartRecording = this.props.onBeforeStartRecording;
                        if (!onBeforeStartRecording) return [3 /*break*/, 2];
                        console.log("OrbitaMicButton -> before onBeforeStartRecording");
                        return [4 /*yield*/, onBeforeStartRecording()];
                    case 1:
                        _a.sent();
                        console.log("OrbitaMicButton -> after onBeforeStartRecording");
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); };
        _this.handleAfterStartRecording = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var onAfterStartRecording;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        onAfterStartRecording = this.props.onAfterStartRecording;
                        if (!onAfterStartRecording) return [3 /*break*/, 2];
                        return [4 /*yield*/, onAfterStartRecording()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); };
        _this.handleBeforeStopRecording = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var onBeforeStopRecording;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        onBeforeStopRecording = this.props.onBeforeStopRecording;
                        if (!onBeforeStopRecording) return [3 /*break*/, 2];
                        return [4 /*yield*/, onBeforeStopRecording()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); };
        _this.handleAfterStopRecording = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var onAfterStopRecording;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        onAfterStopRecording = this.props.onAfterStopRecording;
                        if (!onAfterStopRecording) return [3 /*break*/, 2];
                        return [4 /*yield*/, onAfterStopRecording()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); };
        return _this;
    }
    OrbitaMicButton.prototype.render = function () {
        var silenceTimeout = this.props.silenceTimeout;
        return (React.createElement(MicButton, { ref: this.mic, silenceTimeout: silenceTimeout, onResults: this.handleResults, onNoResults: this.handleNoResults, onBeforeStartRecording: this.handleBeforeStartRecording, onAfterStartRecording: this.handleAfterStartRecording, onBeforeStopRecording: this.handleBeforeStopRecording, onAfterStopRecording: this.handleAfterStopRecording }));
    };
    OrbitaMicButton.contextType = OrbitaContext;
    return OrbitaMicButton;
}(Component));
export default OrbitaMicButton;
//# sourceMappingURL=OrbitaMicButton.js.map