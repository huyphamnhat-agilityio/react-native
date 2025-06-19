import { useCallback, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import uuid from 'react-native-uuid';

// Components
import { Button, Dropdown, TextInput } from '../common';

//Themes
import { borderRadius, colors } from 'src/themes';

// Interfaces
import { ShippingAddress } from 'src/interfaces';

// Utils
import { clearErrorOnChange, isEnableSubmit } from 'src/utils';

// Constants
import { FORM_VALIDATION_MESSAGE } from 'src/constants';

// Mocks
import { MOCK_CITIES, MOCK_COUNTRIES, MOCK_DISTRICTS } from 'src/mocks';

export type RegisterFormProps = {
  onSubmit: (data: ShippingAddress) => Promise<void>;
  data?: ShippingAddress;
};

const REQUIRED_FIELDS: Array<keyof ShippingAddress> = [
  'name',
  'address',
  'country',
  'city',
  'district',
  'postalCode',
];

export const SHIPPING_FORM_VALIDATION = {
  NAME: {
    required: FORM_VALIDATION_MESSAGE.REQUIRED('Name'),
  },
  ADDRESS: {
    required: FORM_VALIDATION_MESSAGE.REQUIRED('Address'),
  },
  CITY: {
    required: FORM_VALIDATION_MESSAGE.REQUIRED('City'),
  },
  DISTRICT: {
    required: FORM_VALIDATION_MESSAGE.REQUIRED('District'),
  },
  COUNTRY: {
    required: FORM_VALIDATION_MESSAGE.REQUIRED('Country'),
  },
  POSTAL_CODE: {
    required: FORM_VALIDATION_MESSAGE.REQUIRED('Postal Code'),
  },
};

const ShippingAddressForm = ({ onSubmit, data }: RegisterFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors, dirtyFields, isSubmitting },
    clearErrors,
  } = useForm<ShippingAddress>({
    defaultValues: {
      id: data?.id ?? uuid.v4(),
      name: data?.name ?? '',
      address: data?.address ?? '',
      country: data?.country ?? '',
      city: data?.city ?? '',
      district: data?.district ?? '',
      postalCode: data?.postalCode ?? '',
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

  const handleDropdownChange = useCallback(
    (name: keyof ShippingAddress, onChange: (value: string) => void) => {
      return ({
        label: _label,
        value,
        _index,
      }: {
        label: string;
        value: string;
        _index: number;
      }) => {
        onChange(value);

        clearErrorOnChange(name, errors, clearErrors);
      };
    },
    [clearErrors, errors],
  );
  const dirtyFieldList = Object.keys(dirtyFields);
  const isDisabled = useMemo(() => {
    return !isEnableSubmit({
      requiredFields: REQUIRED_FIELDS,
      dirtyFields: dirtyFieldList,
      errors,
      requirePartial: true,
    });
  }, [dirtyFieldList, errors]);

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, ...rest }, fieldState: { error } }) => (
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
            maxLength={50}
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
        render={({ field: { onChange, ...rest }, fieldState: { error } }) => (
          <TextInput
            containerStyle={styles.input}
            innerBorderBottomWidth={0}
            labelDistance={4}
            labelSize="tiny"
            labelVariant="quaternary"
            label="Address"
            placeholder="Ex: 25 Robert Latouche Street"
            errorPosition="outer"
            maxLength={255}
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

      <Controller
        control={control}
        name="postalCode"
        render={({ field: { onChange, ...rest }, fieldState: { error } }) => (
          <TextInput
            containerStyle={styles.input}
            innerBorderBottomWidth={0}
            labelDistance={4}
            labelSize="tiny"
            labelVariant="quaternary"
            label="Postal Code"
            placeholder="Ex: 12345"
            errorPosition="outer"
            maxLength={10}
            isDisabled={isSubmitting}
            errorStyle={styles.error}
            isError={!!error?.message}
            errorMessage={error?.message}
            onChangeText={handleInputChange('postalCode', onChange)}
            {...rest}
          />
        )}
        rules={SHIPPING_FORM_VALIDATION.POSTAL_CODE}
      />

      <Controller
        control={control}
        name="country"
        render={({ field: { onChange, ...rest }, fieldState: { error } }) => (
          <Dropdown
            data={MOCK_COUNTRIES}
            labelField="label"
            valueField="value"
            placeholder="Select Country"
            placeholderStyle={{
              color: colors.text.placeholder,
            }}
            labelSize="tiny"
            labelVariant="quaternary"
            search
            disable={isSubmitting}
            onChange={handleDropdownChange('country', onChange)}
            labelDistance={4}
            label="Country"
            isError={!!error?.message}
            errorStyle={styles.error}
            errorMessage={error?.message}
            mainContainerStyle={styles.input}
            {...rest}
          />
        )}
        rules={SHIPPING_FORM_VALIDATION.COUNTRY}
      />

      <Controller
        control={control}
        name="city"
        render={({ field: { onChange, ...rest }, fieldState: { error } }) => (
          <Dropdown
            data={MOCK_CITIES}
            labelField="label"
            valueField="value"
            placeholder="Select City"
            placeholderStyle={{
              color: colors.text.placeholder,
            }}
            labelSize="tiny"
            labelVariant="quaternary"
            search
            disable={isSubmitting}
            onChange={handleDropdownChange('city', onChange)}
            labelDistance={4}
            label="City"
            isError={!!error?.message}
            errorStyle={styles.error}
            errorMessage={error?.message}
            mainContainerStyle={styles.input}
            {...rest}
          />
        )}
        rules={SHIPPING_FORM_VALIDATION.CITY}
      />
      <Controller
        control={control}
        name="district"
        render={({ field: { onChange, ...rest }, fieldState: { error } }) => (
          <Dropdown
            data={MOCK_DISTRICTS}
            labelField="label"
            valueField="value"
            placeholder="Select District"
            placeholderStyle={{
              color: colors.text.placeholder,
            }}
            labelSize="tiny"
            labelVariant="quaternary"
            search
            disable={isSubmitting}
            onChange={handleDropdownChange('district', onChange)}
            labelDistance={4}
            label="District"
            isError={!!error?.message}
            errorStyle={styles.error}
            errorMessage={error?.message}
            mainContainerStyle={styles.input}
            {...rest}
          />
        )}
        rules={SHIPPING_FORM_VALIDATION.DISTRICT}
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
    </KeyboardAwareScrollView>
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
