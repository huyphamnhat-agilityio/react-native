import {StyleSheet, View} from 'react-native';

// Components
import {Text} from 'src/components/common';

// Themes
import {borderRadius, colors} from 'src/themes';

export interface TotalCardProps {
  order: number;
  delivery: number;
}
const TotalCard = ({order, delivery}: TotalCardProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.stat}>
        <Text font="NunitoSansNormal" size="base" textVariant="quaternary">
          Order:
        </Text>
        <Text font="NunitoSansSemiBold" size="base" textVariant="primary">
          $ {order.toFixed(2)}
        </Text>
      </View>
      <View style={styles.stat}>
        <Text font="NunitoSansNormal" size="base" textVariant="quaternary">
          Delivery:
        </Text>
        <Text font="NunitoSansSemiBold" size="base" textVariant="primary">
          $ {delivery.toFixed(2)}
        </Text>
      </View>
      <View style={styles.stat}>
        <Text font="NunitoSansNormal" size="base" textVariant="quaternary">
          Total:
        </Text>
        <Text font="NunitoSansSemiBold" size="base" textVariant="primary">
          $ {(order + delivery).toFixed(2)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 15,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: borderRadius.md,
    shadowColor: colors.shadow.primary,
    elevation: 40,
    zIndex: 99,
    backgroundColor: colors.white,
  },
  label: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stat: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default TotalCard;
