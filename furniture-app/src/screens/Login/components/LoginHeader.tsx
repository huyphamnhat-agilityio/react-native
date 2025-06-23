import { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { LogoIcon } from 'src/components/icons';
import { Text } from 'src/components/common';

// Themes
import { borderRadius, colors } from 'src/themes';

const LoginHeader = memo(() => {
  return (
    <>
      <View style={styles.logo}>
        <View style={styles.stroke} />
        <LogoIcon />
        <View style={styles.stroke} />
      </View>
      <Text
        font="MerriweatherNormal"
        size="xl"
        textVariant="alternative"
        style={styles.title}
      >
        Hello ! {'\n'}
        <Text font="MerriweatherBold" size="lg" textVariant="secondary">
          WELCOME BACK
        </Text>
      </Text>
    </>
  );
});

const styles = StyleSheet.create({
  logo: {
    marginTop: 20,
    paddingHorizontal: 30,
    height: 64,
    gap: 20,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  stroke: {
    flex: 1,
    height: 1,
    backgroundColor: colors.divider,
    borderRadius: borderRadius.tiny,
  },
  title: {
    lineHeight: 45,
    paddingLeft: 30,
  },
});

LoginHeader.displayName = 'LoginHeader';

export default LoginHeader;
