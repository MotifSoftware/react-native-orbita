"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = require("react");
var OrbitaProvider_1 = require("./OrbitaProvider");
var MicButton_1 = require("./MicButton");
var orbita_api_client_1 = require("orbita-api-client");
;
var OrbitaMicButton = /** @class */ (function (_super) {
    tslib_1.__extends(OrbitaMicButton, _super);
    function OrbitaMicButton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.sendMessage = function (message) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var settings, _a, sessionId, onResults, onError, onSend, endpoint, client, response;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        settings = this.context;
                        _a = this.props, sessionId = _a.sessionId, onResults = _a.onResults, onError = _a.onError, onSend = _a.onSend;
                        if (!settings) return [3 /*break*/, 2];
                        endpoint = settings.endpoint;
                        client = new orbita_api_client_1.APIClient({
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
                            })];
                    case 1:
                        response = _b.sent();
                        if (response.type === 'success') {
                            if (onResults)
                                onResults(response.chat.chatText, response.buttons.choices, message);
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
        return _this;
    }
    OrbitaMicButton.prototype.render = function () {
        return (react_1.default.createElement(MicButton_1.default, { onResults: this.handleResults }));
    };
    OrbitaMicButton.contextType = OrbitaProvider_1.OrbitaContext;
    return OrbitaMicButton;
}(react_1.Component));
exports.default = OrbitaMicButton;
//# sourceMappingURL=OrbitaMicButton.js.map