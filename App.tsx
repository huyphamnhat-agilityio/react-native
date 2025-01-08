import EyeIcon from 'assets/images/EyeIcon.svg';
import {useEffect, useState} from 'react';
import {DevSettings, SafeAreaView} from 'react-native';
import {Button, TextInput} from 'src/components/common';
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
        RightContent={<EyeIcon />}
      />

      <Button title="test" />
    </SafeAreaView>
  );
}

export default App;
