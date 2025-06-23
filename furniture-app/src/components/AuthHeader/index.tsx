import { memo, PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';
import { LogoIcon } from 'src/components/icons';

// Themes
import { borderRadius, colors } from 'src/themes';

const AuthHeader = memo(({ children }: PropsWithChildren) => {
  return (
    <>
      <View style={styles.logo}>
        <View style={styles.stroke} />
        <LogoIcon />
        <View style={styles.stroke} />
      </View>
      {children}
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
});

AuthHeader.displayName = 'AuthHeader';

export default AuthHeader;
