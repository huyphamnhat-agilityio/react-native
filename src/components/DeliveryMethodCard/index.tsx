import {StyleSheet, View} from 'react-native';

// Components
import {Button, Text} from 'src/components/common';

// Icons
import {DHLIcon, EditIcon} from 'src/components/icons';

// Themes
import {borderRadius, colors} from 'src/themes';

const DeliveryMethodCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.label}>
        <Text font="NunitoSansSemiBold" size="base" textVariant="alternative">
          Delivery method
        </Text>
        <Button style={styles.edit} bgVariant="none" IconLeft={<EditIcon />} />
      </View>

      <View style={styles.delivery}>
        <Button style={styles.logo} bgVariant="none" IconLeft={<DHLIcon />} />

        <Text font="NunitoSansBold" size="xs" textVariant="secondary">
          Fast (2-3days)
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  label: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  edit: {
    padding: 0,
  },
  delivery: {
    gap: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: borderRadius.xs,
    shadowColor: colors.shadow.primary,
    elevation: 40,
    zIndex: 99,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  logo: {
    padding: 0,
  },
});

export default DeliveryMethodCard;
