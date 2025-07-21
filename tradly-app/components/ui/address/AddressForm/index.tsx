import { memo, useCallback, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { Controller, RegisterOptions, useForm } from "react-hook-form";

// Components
import { Button, Input } from "@/components/common";

// Themes
import { colors } from "@/themes";

// Types & Interfaces
import { UserAddress } from "@/interfaces";

// Constants
import { FORM_VALIDATION_MESSAGES, REGEX } from "@/constants";

// Utils
import { clearErrorOnChange, isEnableSubmit } from "@/utils";

export type AddressFormProps = {
  onSubmit: (data: UserAddress) => Promise<void>;
  data?: UserAddress;
};

const REQUIRED_FIELDS: (keyof UserAddress)[] = [
  "name",
  "city",
  "phone",
  "streetAddress",
  "state",
  "zipcode",
];

export const ADDRESS_FORM_VALIDATION: Record<
  string,
  Omit<
    RegisterOptions<UserAddress>,
    "disabled" | "setValueAs" | "valueAsNumber" | "valueAsDate"
  >
> = {
  NAME: {
    required: FORM_VALIDATION_MESSAGES.REQUIRED("Name"),
    pattern: {
      value: REGEX.NAME,
      message: FORM_VALIDATION_MESSAGES.INVALID("Name"),
    },
  },
  PHONE: {
    required: FORM_VALIDATION_MESSAGES.REQUIRED("Phone number"),
    pattern: {
      value: REGEX.PHONE,
      message: FORM_VALIDATION_MESSAGES.INVALID("Phone"),
    },
  },
  STREET_ADDRESS: {
    required: FORM_VALIDATION_MESSAGES.REQUIRED("Street address"),
  },
  CITY: {
    required: FORM_VALIDATION_MESSAGES.REQUIRED("City"),
  },
  STATE: {
    required: FORM_VALIDATION_MESSAGES.REQUIRED("State"),
  },
  COUNTRY: {
    required: FORM_VALIDATION_MESSAGES.REQUIRED("Country"),
  },
  ZIPCODE: {
    required: FORM_VALIDATION_MESSAGES.REQUIRED("Zipcode"),
  },
};

const AddressForm = memo(({ onSubmit, data }: AddressFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors, dirtyFields, isSubmitting },
    clearErrors,
  } = useForm<UserAddress>({
    defaultValues: {
      name: data?.name ?? "",
      streetAddress: data?.streetAddress ?? "",
      phone: data?.phone ?? "",
      state: data?.state ?? "",
      city: data?.city ?? "",
      zipcode: data?.zipcode ?? "",
    },
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  const handleInputChange = useCallback(
    (name: keyof UserAddress, onChange: (value: string) => void) => {
      return (value: string) => {
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
    <View style={styles.inner}>
      <View style={styles.formWrapper}>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, ...rest }, fieldState: { error } }) => (
            <Input
              label="Name"
              labelVariant="secondary"
              labelSize={3.5}
              labelFont="Montserrat_400Regular"
              labelDistance={8}
              inputSize={4}
              maxLength={50}
              inputVariant="quaternary"
              style={styles.textInput}
              isDisabled={isSubmitting}
              isError={!!error?.message}
              errorMessage={error?.message}
              onChangeText={handleInputChange("name", onChange)}
              {...rest}
            />
          )}
          rules={ADDRESS_FORM_VALIDATION.NAME}
        />

        <Controller
          control={control}
          name="phone"
          render={({ field: { onChange, ...rest }, fieldState: { error } }) => (
            <Input
              label="Phone"
              labelVariant="secondary"
              labelSize={3.5}
              labelFont="Montserrat_400Regular"
              labelDistance={8}
              inputSize={4}
              inputMode="tel"
              inputVariant="quaternary"
              maxLength={12}
              style={styles.textInput}
              isDisabled={isSubmitting}
              isError={!!error?.message}
              errorMessage={error?.message}
              onChangeText={handleInputChange("phone", onChange)}
              {...rest}
            />
          )}
          rules={ADDRESS_FORM_VALIDATION.PHONE}
        />

        <Controller
          control={control}
          name="streetAddress"
          render={({ field: { onChange, ...rest }, fieldState: { error } }) => (
            <Input
              label="Street address"
              labelVariant="secondary"
              labelSize={3.5}
              labelFont="Montserrat_400Regular"
              labelDistance={8}
              inputSize={4}
              maxLength={50}
              inputVariant="quaternary"
              style={styles.textInput}
              isDisabled={isSubmitting}
              isError={!!error?.message}
              errorMessage={error?.message}
              onChangeText={handleInputChange("streetAddress", onChange)}
              {...rest}
            />
          )}
          rules={ADDRESS_FORM_VALIDATION.STREET_ADDRESS}
        />

        <Controller
          control={control}
          name="city"
          render={({ field: { onChange, ...rest }, fieldState: { error } }) => (
            <Input
              label="City"
              labelVariant="secondary"
              labelSize={3.5}
              labelFont="Montserrat_400Regular"
              labelDistance={8}
              inputSize={4}
              maxLength={50}
              inputVariant="quaternary"
              style={styles.textInput}
              isDisabled={isSubmitting}
              isError={!!error?.message}
              errorMessage={error?.message}
              onChangeText={handleInputChange("city", onChange)}
              {...rest}
            />
          )}
          rules={ADDRESS_FORM_VALIDATION.CITY}
        />

        <Controller
          control={control}
          name="state"
          render={({ field: { onChange, ...rest }, fieldState: { error } }) => (
            <Input
              label="State"
              labelVariant="secondary"
              labelSize={3.5}
              labelFont="Montserrat_400Regular"
              labelDistance={8}
              inputSize={4}
              inputVariant="quaternary"
              maxLength={50}
              style={styles.textInput}
              isDisabled={isSubmitting}
              isError={!!error?.message}
              errorMessage={error?.message}
              onChangeText={handleInputChange("state", onChange)}
              {...rest}
            />
          )}
          rules={ADDRESS_FORM_VALIDATION.STATE}
        />

        <Controller
          control={control}
          name="zipcode"
          render={({ field: { onChange, ...rest }, fieldState: { error } }) => (
            <Input
              label="Zipcode"
              labelVariant="secondary"
              labelSize={3.5}
              labelFont="Montserrat_400Regular"
              labelDistance={8}
              inputSize={4}
              inputVariant="quaternary"
              inputMode="numeric"
              maxLength={5}
              style={styles.textInput}
              isDisabled={isSubmitting}
              isError={!!error?.message}
              errorMessage={error?.message}
              onChangeText={handleInputChange("zipcode", onChange)}
              onSubmitEditing={handleSubmit(onSubmit)}
              {...rest}
            />
          )}
          rules={ADDRESS_FORM_VALIDATION.ZIPCODE}
        />
      </View>

      <View style={styles.buttonWrapper}>
        <Button
          title="Save"
          titleFont="Montserrat_600SemiBold"
          titleSize={4.5}
          style={styles.button}
          rounded="full"
          disabled={isDisabled || isSubmitting}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  inner: {
    flex: 1,
    justifyContent: "space-between",
    padding: 20,
  },
  formWrapper: {
    gap: 16,
  },
  buttonWrapper: {
    paddingTop: 20,
  },
  textInput: {
    width: "100%",
    borderBottomColor: colors.gray_50,
    borderBottomWidth: 0.5,
  },
  button: {
    width: "100%",
    paddingVertical: 16,
  },
});
AddressForm.displayName = "AddressForm";
export default AddressForm;
