import {useCallback, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import uuid from 'react-native-uuid';

// Components
import {Button, TextInput} from '../common';

//Themes
import {borderRadius, colors} from 'src/themes';

// Interfaces
import {ShippingAddress} from 'src/interfaces';

// Utils
import {clearErrorOnChange, isEnableSubmit} from 'src/utils';
import {FORM_VALIDATION_MESSAGE} from 'src/constants';

export type RegisterFormProps = {
  onSubmit: (data: ShippingAddress) => Promise<void>;
  data?: ShippingAddress;
};

const REQUIRED_FIELDS: Array<keyof ShippingAddress> = ['name', 'address'];

export const SHIPPING_FORM_VALIDATION = {
  NAME: {
    required: FORM_VALIDATION_MESSAGE.REQUIRED('Name'),
  },
  ADDRESS: {
    required: FORM_VALIDATION_MESSAGE.REQUIRED('Address'),
  },
};

const ShippingAddressForm = ({onSubmit, data}: RegisterFormProps) => {
  const {
    control,
    handleSubmit,
    formState: {errors, dirtyFields, isSubmitting},
    clearErrors,
  } = useForm<ShippingAddress>({
    defaultValues: {
      id: data?.id ?? uuid.v4(),
      name: data?.name ?? '',
      address: data?.address ?? '',
    },
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });

  const handleInputChange = useCallback(
    (name: keyof ShippingAddress, onChange: (value: string) => void) => {
      return (value: string) => {
        onChange(value);

        clearErrorOnChange(name, errors, clearErrors);
      };
    },
    [clearErrors, errors],
  );

  const dirtyFieldList = Object.keys(dirtyFields);

  const isDisabled = useMemo(() => {
    return !isEnableSubmit(REQUIRED_FIELDS, dirtyFieldList, errors);
  }, [dirtyFieldList, errors]);

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="name"
        render={({field: {onChange, ...rest}, fieldState: {error}}) => (
          <TextInput
            containerStyle={styles.input}
            innerBorderBottomWidth={0}
            labelDistance={4}
            labelSize="tiny"
            labelVariant="quaternary"
            label="Full name"
            placeholder="Ex: Bruno Pham"
            errorPosition="outer"
            isDisabled={isSubmitting}
            errorStyle={styles.error}
            isError={!!error?.message}
            errorMessage={error?.message}
            onChangeText={handleInputChange('name', onChange)}
            {...rest}
          />
        )}
        rules={SHIPPING_FORM_VALIDATION.NAME}
      />
      <Controller
        control={control}
        name="address"
        render={({field: {onChange, ...rest}, fieldState: {error}}) => (
          <TextInput
            containerStyle={styles.input}
            innerBorderBottomWidth={0}
            labelDistance={4}
            labelSize="tiny"
            labelVariant="quaternary"
            label="Address"
            placeholder="Ex: 25 Robert Latouche Street"
            errorPosition="outer"
            isDisabled={isSubmitting}
            errorStyle={styles.error}
            isError={!!error?.message}
            errorMessage={error?.message}
            onChangeText={handleInputChange('address', onChange)}
            {...rest}
          />
        )}
        rules={SHIPPING_FORM_VALIDATION.ADDRESS}
      />

      <Button
        width="100%"
        title="SAVE ADDRESS"
        titleFont="NunitoSansSemiBold"
        titleSize="md"
        rounded="md"
        disabled={isDisabled || isSubmitting}
        style={styles.button}
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    gap: 20,
    paddingBottom: 12,
  },
  input: {
    borderColor: colors.border.alternative,
    borderWidth: 1,
    borderRadius: borderRadius.xs,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  error: {
    paddingLeft: 12,
  },
  button: {
    paddingVertical: 16,
    marginTop: 'auto',
  },
});

export default ShippingAddressForm;
