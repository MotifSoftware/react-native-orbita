import * as tslib_1 from "tslib";
import React, { Component } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import Voice from 'react-native-voice';
import icon from './assets/microphone.png';
import activeIcon from './assets/microphone-active.png';
;
;
var styles = StyleSheet.create({
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
                Voice.stop();
            }
        };
        _this.record = function () {
            _this.stopRecording();
            Voice.removeAllListeners();
            Voice.onSpeechStart = _this.handleSpeechStart.bind(_this);
            Voice.onSpeechEnd = _this.handleSpeechEnd.bind(_this);
            Voice.onSpeechPartialResults = _this.handleSpeechPartialResults.bind(_this);
            Voice.start();
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
        return (React.createElement(TouchableOpacity, { onPress: this.record },
            React.createElement(Image, { style: styles.button, source: isRecording ? activeIcon : icon })));
    };
    MicButton.defaultProps = {
        silenceTimeout: defaultSilenceTimeout,
    };
    return MicButton;
}(Component));
export default MicButton;
//# sourceMappingURL=MicButton.js.map