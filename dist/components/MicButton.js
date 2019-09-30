import * as tslib_1 from "tslib";
import React, { Component } from 'react';
import { Image, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { AudioRecorder, AudioUtils, AudioSource } from 'react-native-audio';
import icon from './assets/microphone.png';
import activeIcon from './assets/microphone-active.png';
;
var defaultSilenceTimeout = 1000;
;
var styles = StyleSheet.create({
    button: {
        width: 50,
        height: 50,
    },
});
var MicButton = /** @class */ (function (_super) {
    tslib_1.__extends(MicButton, _super);
    function MicButton(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            isRecording: false,
            meteringRecord: [],
            hasPermission: false,
            audioPath: AudioUtils.CachesDirectoryPath + '/audio-temp',
            recordingOptions: {
                SampleRate: 16000,
                Channels: 1,
                AudioQuality: "Low",
                AudioEncoding: "lpcm",
                IncludeBase64: true,
                MeteringEnabled: true
            }
        };
        _this.record = _this.record.bind(_this);
        _this.stopRecording = _this.stopRecording.bind(_this);
        _this.prepareToRecord = _this.prepareToRecord.bind(_this);
        return _this;
    }
    MicButton.prototype.componentDidMount = function () {
        var _this = this;
        if (Platform.OS === "android") {
            this.setState({
                recordingOptions: {
                    SampleRate: 16000,
                    Channels: 1,
                    AudioQuality: "Low",
                    AudioEncoding: "amr_wb",
                    OutputFormat: "amr_wb",
                    AudioSource: AudioSource.MIC,
                    AudioEncodingBitRate: 32000,
                    IncludeBase64: true
                }
            });
        }
        ;
        AudioRecorder.requestAuthorization().then(function (isAuthorised) {
            _this.setState({ hasPermission: isAuthorised });
        });
    };
    MicButton.prototype.prepareToRecord = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, onResults, onNoResults, _b, hasPermission, recordingOptions, initializeHandlers, wasRecording;
            var _this = this;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this.props, onResults = _a.onResults, onNoResults = _a.onNoResults;
                        _b = this.state, hasPermission = _b.hasPermission, recordingOptions = _b.recordingOptions;
                        if (!hasPermission) {
                            console.warn("App is not authorized to record.");
                            return [2 /*return*/, false];
                        }
                        initializeHandlers = function () {
                            AudioRecorder.onProgress = function (data) {
                                console.log(data);
                                var updatedMeteringRecord = _this.state.meteringRecord.concat(data.currentMetering);
                                _this.setState({ meteringRecord: updatedMeteringRecord });
                                var silenceTimeout = _this.props.silenceTimeout && _this.props.silenceTimeout > 0 ? _this.props.silenceTimeout : defaultSilenceTimeout;
                                var ticksBeforeSilence = Math.floor(silenceTimeout / 250);
                                // Check for silence
                                if (updatedMeteringRecord.length > ticksBeforeSilence) {
                                    var lastThreeMeterings = updatedMeteringRecord.slice(Math.max(updatedMeteringRecord.length - ticksBeforeSilence, 1)), threshold_1 = Platform.OS === "android" ? -40 : -25;
                                    if (lastThreeMeterings.every(function (metering) { return metering < threshold_1; })) {
                                        _this.stopRecording();
                                    }
                                }
                            };
                            AudioRecorder.onFinished = function (data) {
                                if (onResults) {
                                    var requestBody = {
                                        encoding: recordingOptions.AudioEncoding,
                                        sampleRate: recordingOptions.SampleRate,
                                        data: data.base64.replace(/\n/g, "")
                                    };
                                    fetch("https://ibtmaua43d.execute-api.us-east-2.amazonaws.com/prod", {
                                        method: 'POST',
                                        headers: {
                                            Accept: 'application/json',
                                            'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify(requestBody)
                                    }).then(function (response) { return response.json(); })
                                        .then(function (responseJSON) {
                                        if (responseJSON.result) {
                                            onResults(responseJSON.result);
                                        }
                                        else {
                                            console.log("No result from Google STT endpoint.");
                                            onNoResults();
                                        }
                                    })
                                        .catch(function (error) { return console.warn(error); });
                                }
                            };
                        };
                        if (!AudioRecorder.cleanup) return [3 /*break*/, 2];
                        AudioRecorder.onProgress = function () { };
                        AudioRecorder.onFinished = function () { initializeHandlers(); };
                        return [4 /*yield*/, AudioRecorder.cleanup()];
                    case 1:
                        wasRecording = _c.sent();
                        if (!wasRecording) {
                            initializeHandlers();
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        initializeHandlers();
                        _c.label = 3;
                    case 3:
                        AudioRecorder.cleanup = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            var wasRecording;
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        wasRecording = this.state.isRecording;
                                        if (!wasRecording) return [3 /*break*/, 2];
                                        return [4 /*yield*/, AudioRecorder.stopRecording()];
                                    case 1:
                                        _a.sent();
                                        this.setState({ isRecording: false });
                                        _a.label = 2;
                                    case 2: return [2 /*return*/, wasRecording];
                                }
                            });
                        }); };
                        this.setState({ meteringRecord: [] });
                        return [2 /*return*/, true];
                }
            });
        });
    };
    MicButton.prototype.prepareRecordingPath = function (audioPath) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, AudioRecorder.prepareRecordingAtPath(audioPath, this.state.recordingOptions)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MicButton.prototype.record = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var onStartRecording, preparedSuccessfully;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        onStartRecording = this.props.onStartRecording;
                        return [4 /*yield*/, this.prepareToRecord()];
                    case 1:
                        preparedSuccessfully = _a.sent();
                        if (!preparedSuccessfully) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.prepareRecordingPath(this.state.audioPath)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, AudioRecorder.startRecording()];
                    case 3:
                        _a.sent();
                        this.setState({ isRecording: true });
                        onStartRecording();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    MicButton.prototype.stopRecording = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var onStopRecording;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        onStopRecording = this.props.onStopRecording;
                        if (!this.state.isRecording) return [3 /*break*/, 2];
                        return [4 /*yield*/, AudioRecorder.stopRecording()];
                    case 1:
                        _a.sent();
                        this.setState({ isRecording: false });
                        onStopRecording();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
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