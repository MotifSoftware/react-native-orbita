import * as tslib_1 from "tslib";
import React, { Component } from 'react';
import { TextInput } from 'react-native';
import { OrbitaContext } from './OrbitaProvider';
import { APIClient } from 'orbita-api-client';
;
;
var OrbitaTextInput = /** @class */ (function (_super) {
    tslib_1.__extends(OrbitaTextInput, _super);
    function OrbitaTextInput() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            text: _this.props.defaultValue || '',
        };
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
                        this.setState({ text: '' });
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
                                onError('Request failed', message);
                        }
                        _b.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); };
        _this.handleSubmitEditing = function (_a) {
            var text = _a.nativeEvent.text;
            return tslib_1.__awaiter(_this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.sendMessage(text)];
                        case 1:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        return _this;
    }
    OrbitaTextInput.prototype.render = function () {
        var _this = this;
        var text = this.state.text;
        return (React.createElement(TextInput, tslib_1.__assign({}, this.props, { onChangeText: function (text) { return _this.setState({ text: text }); }, value: text, multiline: false, onSubmitEditing: this.handleSubmitEditing })));
    };
    OrbitaTextInput.contextType = OrbitaContext;
    return OrbitaTextInput;
}(Component));
export default OrbitaTextInput;
//# sourceMappingURL=OrbitaTextInput.js.map