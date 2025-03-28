const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const exclusionList = require('metro-config/src/defaults/exclusionList');

const config = {
  resolver: {
    blacklistRE: exclusionList([
      /node_modules\/.*\/node_modules\/react-native\/.*/,
    ]),
  },
  watchFolders: ['./src'], // Watch the root folder instead of 'src'
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
