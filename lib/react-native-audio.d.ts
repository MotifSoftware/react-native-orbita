declare module 'react-native-audio' {
  export type AudioEncodingAndroidType = 'aac_eld' | 'amr_nb' | 'amr_wb' | 'he_aac' | 'vorbis';

  export type AudioEncodingIOSType = 'lpcm' | 'ima4' | 'MAC3' | 'MAC6' | 'ulaw' | 'alaw' | 'mp1' | 'mp2' | 'alac' | 'amr';
  
  export type AudioEncodingType = 'aac' | AudioEncodingAndroidType | AudioEncodingAndroidType;
  
  export interface RecordingOptions {
    SampleRate?: number;
    Channels?: number;
    AudioQuality?: 'Low' | 'Medium' | 'High';
    AudioEncoding?: AudioEncodingType;
    OutputFormat?: string;
    MeteringEnabled?: boolean;
    MeasurementMode?: boolean;
    AudioEncodingBitRate?: number;
    IncludeBase64?: boolean;
    AudioSource?: number;
  }
  
  export const AudioRecorder: {
    requestAuthorization(): Promise<boolean>;
    prepareRecordingAtPath(path: string, options: RecordingOptions): Promise<string>;
    startRecording(): Promise<string>;
    stopRecording(): Promise<string>;
    resumeRecording(): Promise<string>;
    pauseRecording(): Promise<string>;
    checkAuthorizationStatus(): Promise<boolean>;
    onProgress(res: { currentTime: number; currentMetering: number }): void;
    onFinished(res: { audioFileURL: string; base64: string; status: string; }): void;
    cleanup?(): Promise<boolean>;
  };
  
  export const AudioUtils: {
    CachesDirectoryPath: string;
    DocumentDirectoryPath: string;
    DownloadsDirectoryPath: string;
    LibraryDirectoryPath: string;
    MainBundlePath: string;
    MusicDirectoryPath: string;
    PicturesDirectoryPath: string;
  };
  
  export const AudioSource: {
    CAMCORDER: number;
    DEFAULT: number;
    MIC: number;
    REMOTE_SUBMIX: number;
    UNPROCESSED: number;
    VOICE_CALL: number;
    VOICE_COMMUNICATION: number;
    VOICE_DOWNLINK: number;
    VOICE_RECOGNITION: number;
    VOICE_UPLINK: number;
  };  
}