"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_voice_1 = require("react-native-voice");
var microphone_png_1 = require("./assets/microphone.png");
var microphone_active_png_1 = require("./assets/microphone-active.png");
;
;
var styles = react_native_1.StyleSheet.create({
    button: {
        width: 50,
        height: 50,
    },
});
var defaultSilenceTimeout = 1000;
var initialState = {
    isRecording: false,
    lastMessage: '',
    results: '',
};
var MicButton = /** @class */ (function (_super) {
    tslib_1.__extends(MicButton, _super);
    function MicButton(props) {
        var _this = _super.call(this, props) || this;
        _this.state = initialState;
        _this.stopRecording = function () {
            var onResults = _this.props.onResults;
            var _a = _this.state, isRecording = _a.isRecording, results = _a.results;
            if (isRecording) {
                _this.clearTimeout();
                react_native_voice_1.default.stop();
            }
        };
        _this.record = function () {
            _this.stopRecording();
            react_native_voice_1.default.start();
        };
        _this.checkIfSilent = function () {
            var _a = _this.state, lastMessage = _a.lastMessage, results = _a.results;
            if (lastMessage && lastMessage === results) {
                _this.stopRecording();
            }
            else {
                _this.setTimeout();
                _this.setState(function (state) { return (tslib_1.__assign({}, state, { lastMessage: results })); });
            }
        };
        _this.setTimeout = function () {
            var silenceTimeout = _this.props.silenceTimeout;
            if (_this.timeoutHandle)
                clearTimeout(_this.timeoutHandle);
            _this.timeoutHandle = setTimeout(function () {
                _this.checkIfSilent();
            }, silenceTimeout || defaultSilenceTimeout);
        };
        _this.clearTimeout = function () {
            if (_this.timeoutHandle)
                clearTimeout(_this.timeoutHandle);
            _this.timeoutHandle = null;
        };
        _this.timeoutHandle = null;
        react_native_voice_1.default.onSpeechStart = _this.handleSpeechStart.bind(_this);
        react_native_voice_1.default.onSpeechEnd = _this.handleSpeechEnd.bind(_this);
        react_native_voice_1.default.onSpeechPartialResults = _this.handleSpeechPartialResults.bind(_this);
        return _this;
    }
    MicButton.prototype.handleSpeechStart = function () {
        this.setTimeout();
        this.setState(function (state) { return (tslib_1.__assign({}, initialState, { isRecording: true })); });
    };
    ;
    MicButton.prototype.handleSpeechEnd = function () {
        var onResults = this.props.onResults;
        var results = this.state.results;
        this.clearTimeout();
        this.setState(function (state) { return (tslib_1.__assign({}, state, { isRecording: false })); }, function () {
            if (onResults)
                onResults(results);
        });
    };
    ;
    MicButton.prototype.handleSpeechPartialResults = function (response) {
        if (response && response.value && response.value.length > 0) {
            var mostRecentText_1 = response.value[response.value.length - 1];
            this.setTimeout();
            this.setState(function (_a) {
                var results = _a.results, rest = tslib_1.__rest(_a, ["results"]);
                return (tslib_1.__assign({}, rest, { lastMessage: results, results: mostRecentText_1 }));
            });
        }
    };
    ;
    MicButton.prototype.render = function () {
        var isRecording = this.state.isRecording;
        return (<react_native_1.TouchableOpacity onPress={this.record}>
        <react_native_1.Image style={styles.button} source={isRecording ? microphone_active_png_1.default : microphone_png_1.default}/>
      </react_native_1.TouchableOpacity>);
    };
    MicButton.defaultProps = {
        silenceTimeout: defaultSilenceTimeout,
    };
    return MicButton;
}(react_1.Component));
exports.default = MicButton;
//# sourceMappingURL=MicButton.js.map