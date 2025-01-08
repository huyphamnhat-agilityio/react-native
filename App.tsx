import React, {useEffect, useState} from 'react';
import {ActivityIndicator, DevSettings, SafeAreaView} from 'react-native';
import {TextInput} from 'src/components/common';

function App(): React.JSX.Element {
  const [showStorybook, setShowStorybook] = useState(false);

  useEffect(() => {
    if (__DEV__) {
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
      <TextInput
        label="Email"
        labelSize="xs"
        labelVariant="quaternary"
        font="NuniToSansNormal"
        inputVariant="secondary"
        placeholder="Enter your email address..."
        isError
        errorMessage="Something went wrong"
        RightContent={<ActivityIndicator />}
      />
    </SafeAreaView>
  );
}

export default App;
