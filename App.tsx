import React, {useEffect, useState} from 'react';
import {DevSettings, SafeAreaView} from 'react-native';
import CustomButton from 'src/components/common/CustomButton';

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
      <CustomButton title="ALO" />
    </SafeAreaView>
  );
}

export default App;
