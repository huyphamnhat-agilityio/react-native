// BoardingScreen.tsx
import { memo, useCallback } from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';

// Constants
import { SCREENS } from 'src/constants';

// Interfaces
import { AuthStacksScreenProps } from 'src/interfaces';

// Components
import { BoardingButton, BoardingContent } from './components';

// Components

const BoardingScreen = memo(
  ({ navigation: { navigate } }: AuthStacksScreenProps<'Boarding'>) => {
    const handlePress = useCallback(() => {
      navigate(SCREENS.AUTH.LOGIN);
    }, [navigate]);

    return (
      <View style={styles.container}>
        <ImageBackground
          source={require('assets/images/boarding-background.png')}
          resizeMode="cover"
          style={styles.image}
        >
          <BoardingContent />
          <BoardingButton onPress={handlePress} />
        </ImageBackground>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
});

BoardingScreen.displayName = 'BoardingScreen';

export default BoardingScreen;
