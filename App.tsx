import React, {useEffect, useState} from 'react';
import {DevSettings, SafeAreaView, Text} from 'react-native';

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
      <Text>Hello World!</Text>
    </SafeAreaView>
  );
}

export default App;
