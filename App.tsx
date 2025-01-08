import React, {useEffect, useState} from 'react';
import {DevSettings, SafeAreaView} from 'react-native';
import {Button, Text} from 'src/components/common';
import {fontFamilies} from 'src/themes';

function App(): React.JSX.Element {
  const [showStorybook, setShowStorybook] = useState(false);

  useEffect(() => {
    if (__DEV__) {
      // Toggle Storybook
      DevSettings.addMenuItem('Toggle Storybook', () => {
        setShowStorybook(prev => !prev);
      });
    }
  }, []);

  if (showStorybook) {
    const StorybookUI = require('./.storybook').default;
    return <StorybookUI />;
  }
  return (
    <SafeAreaView>
      <Button title="ALO" />
      <Text size="xs">Primary extra small</Text>

      <Text>Primary small</Text>
      <Text textVariant="secondary" size="base">
        Secondary base
      </Text>
      <Text textVariant="tertiary" size="md">
        Tertiary medium
      </Text>
      <Text textVariant="quaternary" size="lg">
        Quaternany large
      </Text>
      <Text textVariant="alternative" size="xl">
        Alternative extra large
      </Text>
      <Text size="xxl" font="MerriweatherNormal">
        Primary 2 extra large
      </Text>
      <Text
        style={{
          fontFamily: fontFamilies.MerriweatherNormal,
        }}>
        Custom font
      </Text>
    </SafeAreaView>
  );
}

export default App;
