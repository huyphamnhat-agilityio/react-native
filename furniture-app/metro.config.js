const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const path = require('path');
const withStorybook = require('@storybook/react-native/metro/withStorybook');
const defaultConfig = getDefaultConfig(__dirname);
const {
  wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config');
/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {};

const finalConfig = mergeConfig(defaultConfig, config);

module.exports = wrapWithReanimatedMetroConfig(
  withStorybook(finalConfig, {
    enabled: true,
    configPath: path.resolve(__dirname, './.storybook'),
  }),
);
