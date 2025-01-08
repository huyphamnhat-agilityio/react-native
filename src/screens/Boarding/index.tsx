import {SafeAreaView} from 'react-native';

// Icons
import EyeIcon from 'assets/images/EyeIcon.svg';

// Components
import {Button, TextInput} from 'src/components/common';

const BoardingScreen = () => {
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
};

export default BoardingScreen;
