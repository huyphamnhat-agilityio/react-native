// BoardingContent.tsx
import { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'src/components/common';

const BoardingContent = memo(() => {
  return (
    <View style={styles.content}>
      <View>
        <View style={styles.title}>
          <Text font="GelasioSemiBold" size="lg" textVariant="tertiary">
            MAKE YOUR
          </Text>
          <Text font="GelasioBold" size="xl" textVariant="secondary">
            HOME BEAUTIFUL
          </Text>
        </View>

        <Text
          style={styles.description}
          font="NunitoSansNormal"
          size="base"
          textVariant="quaternary"
        >
          The best simple place where you discover most wonderful furnitures and
          make your home beautiful
        </Text>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    alignSelf: 'center',
  },
  title: {
    paddingLeft: 30,
    marginBottom: 35,
    gap: 16,
  },
  description: {
    paddingLeft: 60,
    paddingRight: 30,
    textAlign: 'justify',
    lineHeight: 35,
  },
});

BoardingContent.displayName = 'BoardingContent';

export default BoardingContent;
