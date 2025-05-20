import {StyleSheet, View} from 'react-native';

// Components
import {Button, Text} from 'src/components/common';

// Icons
import {EditIcon, MasterCardIcon} from 'src/components/icons';

// Themes
import {borderRadius, colors} from 'src/themes';

export interface PaymentCardProps {
  number: string;
}
const PaymentCard = ({number}: PaymentCardProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.label}>
        <Text font="NunitoSansSemiBold" size="base" textVariant="alternative">
          Payment
        </Text>
        <Button style={styles.edit} bgVariant="none" IconLeft={<EditIcon />} />
      </View>

      <View style={styles.payment}>
        <Button
          style={styles.card}
          rounded="md"
          IconLeft={<MasterCardIcon />}
        />

        <Text font="NunitoSansSemiBold" size="xs" textVariant="secondary">
          {number}
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

  payment: {
    gap: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: borderRadius.md,
    shadowColor: colors.shadow.primary,
    elevation: 40,
    zIndex: 99,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  card: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    shadowColor: colors.shadow.primary,
    elevation: 40,
    zIndex: 99,
    backgroundColor: colors.white,
  },
});
export default PaymentCard;
