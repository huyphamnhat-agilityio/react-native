declare module 'react-native-config' {
  export interface NativeConfig {
    ENVIRONMENT?: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
